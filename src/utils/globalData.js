import { dataSource } from "@appthen/utils";
import { requestHandle } from "./dataSource";
import constants from "./constants";

// 组件实例接口定义
class ComponentInstance {
  constructor(id, instance, forceUpdate) {
    this.id = id;
    this.instance = instance;
    this.forceUpdate = forceUpdate;
    this.isAlive = true;
  }
}

// 响应式 globalData 代理对象
class ReactiveGlobalData {
  constructor(dataSourceStore, componentId) {
    this.dataSourceStore = dataSourceStore;
    this.componentId = componentId;

    // 创建代理对象，自动收集依赖
    this.state = new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop === 'string' && prop !== 'toJSON' && prop !== 'toString') {
          // 自动订阅
          this.dataSourceStore.subscribe(this.componentId, prop);
          return this.dataSourceStore.get(prop);
        }
        return undefined;
      },
      set: (target, prop, value) => {
        if (typeof prop === 'string') {
          this.dataSourceStore.setAndNotify(prop, value);
        }
        return true;
      }
    });
  }

  // 获取数据并自动订阅
  get = (key) => {
    if (key === undefined) {
      // 获取全部状态但不订阅
      return this.dataSourceStore.get();
    }
    // 注册组件对该 key 的订阅
    this.dataSourceStore.subscribe(this.componentId, key);
    return this.dataSourceStore.get(key);
  };

  // 设置数据并通知订阅者
  set = (key, value) => {
    return this.dataSourceStore.setAndNotify(key, value);
  };

  // 加载数据源并自动订阅
  load = async (key, params) => {
    // 先注册订阅，确保请求完成后能收到更新
    this.dataSourceStore.subscribe(this.componentId, key);
    // 调用数据源加载并等待完成
    return await this.dataSourceStore.loadDataSource(key, params);
  };

  // 批量加载多个数据源
  loadAll = async (keyParams) => {
    // 先订阅所有 key
    keyParams.forEach(({ key }) => {
      this.dataSourceStore.subscribe(this.componentId, key);
    });
    // 并行加载所有数据源
    return await Promise.all(
      keyParams.map(({ key, params }) => this.dataSourceStore.loadDataSource(key, params)),
    );
  };

  // 批量获取多个 key，一次性订阅
  getAll = (keys) => {
    const result = {};
    keys.forEach((key) => {
      this.dataSourceStore.subscribe(this.componentId, key);
      result[key] = this.dataSourceStore.get(key);
    });
    return result;
  };

  // 取消订阅特定 key
  unsubscribe = (key) => {
    this.dataSourceStore.unsubscribe(this.componentId, key);
  };
}

export class DataSourceStore {
  constructor(dataSourceConfig) {
    this.state = { ...constants };
    this.componentInstances = new Map();
    this.subscriptions = new Map();
    this.reverseSubscriptions = new Map();
    this.init(dataSourceConfig);
  }

  // 组件实例管理
  componentInstances = new Map();
  // key -> 订阅的组件ID列表
  subscriptions = new Map();
  // 组件ID -> 订阅的key列表 (用于快速清理)
  reverseSubscriptions = new Map();

  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
  }

  init(dataSourceConfig) {
    this.state = { ...constants };
    if (dataSourceConfig?.list?.length > 0) {
      this._dataSourceEngine = dataSource(dataSourceConfig, this, {
        runtimeConfig: true,
        requestHandlersMap: {
          fetch: requestHandle()
        }
      });

      setTimeout(() => {
        if (dataSourceConfig?.list && dataSourceConfig.list.length > 0) {
          // 自动执行
          this.reloadDataSource();
        }
      }, 300);
    }
  }

  get = (key) => {
    return key ? this.state[key] : this.state;
  };

  set = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  // 设置数据并通知订阅的组件
  setAndNotify = (key, value) => {
    const oldValue = this.state[key];
    this.set(key, value);

    // 只有值真正改变时才通知
    if (oldValue !== value) {
      this.notifySubscribers(key);
    }
  };

  get dataSourceMap() {
    return this._dataSourceEngine?.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    if (this._dataSourceEngine) {
      await this._dataSourceEngine?.reloadDataSource?.();
      // 重新加载后通知所有订阅者
      this.notifyAllSubscribers();
    }
  };

  // 加载特定数据源并通知订阅者
  loadDataSource = async (key, params) => {
    const dataSourceItem = this.dataSourceMap[key];
    if (dataSourceItem?.load) {
      try {
        // 执行数据源加载
        const result = await dataSourceItem.load(params);
        // 加载完成后通知订阅了该 key 的组件
        this.notifySubscribers(key);
        return result;
      } catch (error) {
        console.error(`Failed to load data source "${key}":`, error);
        throw error;
      }
    } else {
      console.warn(`Data source "${key}" not found or does not have load method`);
      return null;
    }
  };

  // 生成唯一的组件ID
  generateComponentId() {
    return `component_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  // 绑定组件到全局数据源
  bindGlobalData = (componentInstance) => {
    const componentId = this.generateComponentId();

    // 保存组件实例信息
    this.componentInstances.set(componentId, new ComponentInstance(
      componentId,
      componentInstance,
      componentInstance.forceUpdate?.bind(componentInstance) || (() => {})
    ));

    // 创建响应式 globalData 对象
    const reactiveGlobalData = new ReactiveGlobalData(this, componentId);

    // 挂载到组件实例
    componentInstance.globalData = reactiveGlobalData;
    componentInstance._globalDataComponentId = componentId;

    return reactiveGlobalData;
  };

  // 解绑组件
  unbindGlobalData = (componentInstance) => {
    const componentId = componentInstance._globalDataComponentId;
    if (componentId) {
      this.cleanupComponent(componentId);
      delete componentInstance.globalData;
      delete componentInstance._globalDataComponentId;
    } else {
      console.warn(`[GlobalData] 试图解绑未绑定的组件，可能重复调用了 unbindGlobalData`);
    }
  };

  // 订阅数据变化
  subscribe = (componentId, key) => {
    // 确保组件还存在且活着
    const component = this.componentInstances.get(componentId);
    if (!component || !component.isAlive) {
      console.warn(`[GlobalData] 无法订阅 ${key}: 组件 ${componentId} 不存在或已失活`);
      return;
    }

    // 检查是否已经订阅过
    const isAlreadySubscribed = this.reverseSubscriptions.get(componentId)?.has(key);
    if (isAlreadySubscribed) {
      return;
    }

    // 添加到订阅列表
    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, new Set());
    }
    this.subscriptions.get(key).add(componentId);

    // 添加到反向订阅列表
    if (!this.reverseSubscriptions.has(componentId)) {
      this.reverseSubscriptions.set(componentId, new Set());
    }
    this.reverseSubscriptions.get(componentId).add(key);
  };

  // 取消订阅
  unsubscribe = (componentId, key) => {
    // 从订阅列表中移除
    const subscribers = this.subscriptions.get(key);
    if (subscribers) {
      subscribers.delete(componentId);
      if (subscribers.size === 0) {
        this.subscriptions.delete(key);
      }
    }

    // 从反向订阅列表中移除
    const componentKeys = this.reverseSubscriptions.get(componentId);
    if (componentKeys) {
      componentKeys.delete(key);
      if (componentKeys.size === 0) {
        this.reverseSubscriptions.delete(componentId);
      }
    }
  };

  // 通知特定 key 的订阅者
  notifySubscribers = (key) => {
    const subscribers = this.subscriptions.get(key);
    if (!subscribers) return;

    subscribers.forEach((componentId) => {
      const component = this.componentInstances.get(componentId);
      if (component && component.isAlive) {
        try {
          component.forceUpdate();
        } catch (error) {
          // 如果更新失败，可能组件已经卸载了，标记为不活跃
          component.isAlive = false;
        }
      }
    });
  };

  // 通知所有订阅者（用于数据源重新加载）
  notifyAllSubscribers = () => {
    this.componentInstances.forEach((component) => {
      if (component.isAlive) {
        try {
          component.forceUpdate();
        } catch (error) {
          component.isAlive = false;
        }
      }
    });
  };

  // 清理组件相关的所有订阅
  cleanupComponent = (componentId) => {
    const component = this.componentInstances.get(componentId);
    if (component) {
      component.isAlive = false;
    }

    // 清理该组件的所有订阅
    const subscribedKeys = this.reverseSubscriptions.get(componentId);
    if (subscribedKeys && subscribedKeys.size > 0) {
      subscribedKeys.forEach((key) => {
        const subscribers = this.subscriptions.get(key);
        if (subscribers) {
          subscribers.delete(componentId);
          if (subscribers.size === 0) {
            this.subscriptions.delete(key);
          }
        }
      });
      this.reverseSubscriptions.delete(componentId);
    }

    // 移除组件实例
    this.componentInstances.delete(componentId);
  };

  // 获取订阅状态（调试用）
  getSubscriptionStats = () => {
    return {
      totalComponents: this.componentInstances.size,
      activeComponents: Array.from(this.componentInstances.values()).filter((c) => c.isAlive).length,
      totalSubscriptions: this.subscriptions.size,
      subscriptionDetails: Object.fromEntries(this.subscriptions),
    };
  };

  // 默认数据源配置
  _defineDataSourceConfig = () => {
    return {
      "list": []
    };
  };
}

// 创建全局实例（延迟初始化，等待 dataSourceConfig）
const globalDataStore = new DataSourceStore();

// 初始化全局数据源（从 utils.js 导入配置）
export const globalDataInit = () => {
  console.log('[GlobalData] 🚀 开始初始化全局数据源...');

  // 动态导入避免循环依赖
  import('./utils').then(({ dataSourceConfig }) => {
    console.log('[GlobalData] 📦 数据源配置:', dataSourceConfig);

    if (dataSourceConfig && !globalDataStore._dataSourceEngine) {
      globalDataStore.init(dataSourceConfig);
      console.log('[GlobalData] ✅ 全局数据源已初始化');
    } else if (globalDataStore._dataSourceEngine) {
      console.log('[GlobalData] ⚠️  全局数据源已存在，跳过初始化');
    } else {
      console.warn('[GlobalData] ⚠️  数据源配置为空');
    }
  }).catch(err => {
    console.error('[GlobalData] ❌ 初始化失败:', err);
  });
};

// 挂载全局数据源
export const mountGlobalDataSource = (dataSourceConfig, reset = false) => {
  // 防止重复挂载&加载
  if (globalDataStore._dataSourceEngine && !reset) {
    if (
      Object.keys(globalDataStore.state).length ===
      Object.keys(constants).length
    ) {
      return globalDataStore;
    }
  }

  globalDataStore.init(dataSourceConfig || globalDataStore._defineDataSourceConfig());
  return globalDataStore;
};

// 兼容原有 API
export const setGlobalData = (key, value) => {
  return globalDataStore.setAndNotify(key, value);
};

export const getGlobalData = (key) => {
  return globalDataStore.get(key);
};

export const reloadGlobalData = (key, options) => {
  if (key) {
    return globalDataStore.loadDataSource(key, options);
  }
  return globalDataStore.reloadDataSource();
};

export const globalDataSourceMap = globalDataStore.dataSourceMap;

// 新增 API
export const loadGlobalData = (key, params) => {
  return globalDataStore.loadDataSource(key, params);
};

export const loadGlobalDataBatch = (keyParams) => {
  return Promise.all(
    keyParams.map(({ key, params }) => globalDataStore.loadDataSource(key, params)),
  );
};

export const bindGlobalData = (componentInstance) => {
  return globalDataStore.bindGlobalData(componentInstance);
};

export const unbindGlobalData = (componentInstance) => {
  return globalDataStore.unbindGlobalData(componentInstance);
};

export const printGlobalDataStats = () => {
  const stats = globalDataStore.getSubscriptionStats();
  console.log(`[GlobalData] 当前内存状态:`, {
    总组件数: stats.totalComponents,
    活跃组件数: stats.activeComponents,
    非活跃组件数: stats.totalComponents - stats.activeComponents,
    总订阅数: stats.totalSubscriptions,
    详细订阅情况: stats.subscriptionDetails,
    时间戳: new Date().toLocaleString(),
  });

  // 检查潜在的内存问题
  if (stats.totalComponents - stats.activeComponents > 0) {
    console.warn(
      `[GlobalData] ⚠️  发现 ${
        stats.totalComponents - stats.activeComponents
      } 个非活跃组件，建议检查是否存在内存泄漏`,
    );
  }

  if (stats.totalSubscriptions === 0 && stats.totalComponents > 0) {
    console.warn(`[GlobalData] ⚠️  有组件实例但无订阅，可能存在未正确使用 globalData 的组件`);
  }

  return stats;
};

// 导出全局实例供高级用法
export { globalDataStore };