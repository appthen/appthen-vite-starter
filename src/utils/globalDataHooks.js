import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { globalDataStore } from './globalData';

// React Hook for functional components
export function useGlobalData(keys = []) {
  const [, forceUpdate] = useState({});
  const componentIdRef = useRef(null);
  const globalDataRef = useRef(null);

  // 强制更新函数
  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  // 初始化组件绑定
  useEffect(() => {
    // 创建一个虚拟组件实例用于绑定
    const virtualComponent = {
      forceUpdate: triggerUpdate,
    };

    // 绑定到全局数据
    const reactiveGlobalData = globalDataStore.bindGlobalData(virtualComponent);
    componentIdRef.current = virtualComponent._globalDataComponentId;
    globalDataRef.current = reactiveGlobalData;

    // 如果传入了 keys，预先订阅这些数据
    if (Array.isArray(keys) && keys.length > 0) {
      keys.forEach(key => {
        reactiveGlobalData.get(key); // 调用 get 会自动订阅
      });
    }

    // 清理函数
    return () => {
      if (virtualComponent._globalDataComponentId) {
        globalDataStore.unbindGlobalData(virtualComponent);
      }
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  // 返回 globalData 对象和一些便捷方法
  return useMemo(() => ({
    globalData: globalDataRef.current,
    get: (key) => globalDataRef.current?.get(key),
    set: (key, value) => globalDataRef.current?.set(key, value),
    load: (key, params) => globalDataRef.current?.load(key, params),
    loadAll: (keyParams) => globalDataRef.current?.loadAll(keyParams),
    getAll: (keys) => globalDataRef.current?.getAll(keys),
    unsubscribe: (key) => globalDataRef.current?.unsubscribe(key),
  }), [globalDataRef.current]);
}

// HOC for class components
export function withGlobalData(WrappedComponent) {
  class WithGlobalDataComponent extends React.Component {
    constructor(props) {
      super(props);
      // 在构造函数中立即绑定 globalData，确保 render 时可用
      globalDataStore.bindGlobalData(this);
    }

    componentWillUnmount() {
      // 自动解绑 globalData
      globalDataStore.unbindGlobalData(this);
    }

    render() {
      return React.createElement(WrappedComponent, {
        ...this.props,
        globalData: this.globalData,
      });
    }
  }

  // 设置显示名称以便调试
  WithGlobalDataComponent.displayName = `withGlobalData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithGlobalDataComponent;
}

// 装饰器函数（用于类组件的注解方式）
export function GlobalDataDecorator(target) {
  const originalComponentDidMount = target.prototype.componentDidMount;
  const originalComponentWillUnmount = target.prototype.componentWillUnmount;

  // 创建一个新的类，继承原始类
  class DecoratedComponent extends target {
    constructor(props) {
      super(props);
      // 在构造函数中立即绑定 globalData
      globalDataStore.bindGlobalData(this);
    }

    componentDidMount() {
      // 确保 globalData 已经绑定
      if (!this.globalData) {
        globalDataStore.bindGlobalData(this);
      }

      if (originalComponentDidMount) {
        originalComponentDidMount.call(this);
      }
    }

    componentWillUnmount() {
      // 自动解绑 globalData
      globalDataStore.unbindGlobalData(this);

      if (originalComponentWillUnmount) {
        originalComponentWillUnmount.call(this);
      }
    }
  }

  // 保持原始类的名称和其他属性
  Object.defineProperty(DecoratedComponent, 'name', { value: target.name });
  DecoratedComponent.displayName = target.displayName || target.name;

  return DecoratedComponent;
}

// 高级 Hook：支持选择性订阅和自动重新渲染
export function useGlobalDataSelector(selector, deps = []) {
  const [selectedData, setSelectedData] = useState(() => {
    try {
      return selector(globalDataStore.get());
    } catch (error) {
      console.warn('[useGlobalDataSelector] Selector error:', error);
      return undefined;
    }
  });

  const componentIdRef = useRef(null);
  const selectorRef = useRef(selector);
  const lastSelectedDataRef = useRef(selectedData);

  // 更新 selector 引用
  useEffect(() => {
    selectorRef.current = selector;
  }, deps);

  // 自定义更新函数，只有选择的数据变化时才重新渲染
  const triggerUpdate = useCallback(() => {
    try {
      const newSelectedData = selectorRef.current(globalDataStore.get());
      if (newSelectedData !== lastSelectedDataRef.current) {
        lastSelectedDataRef.current = newSelectedData;
        setSelectedData(newSelectedData);
      }
    } catch (error) {
      console.warn('[useGlobalDataSelector] Selector error:', error);
    }
  }, []);

  useEffect(() => {
    // 创建虚拟组件实例
    const virtualComponent = {
      forceUpdate: triggerUpdate,
    };

    // 绑定到全局数据
    globalDataStore.bindGlobalData(virtualComponent);
    componentIdRef.current = virtualComponent._globalDataComponentId;

    // 清理函数
    return () => {
      if (virtualComponent._globalDataComponentId) {
        globalDataStore.unbindGlobalData(virtualComponent);
      }
    };
  }, [triggerUpdate]);

  return selectedData;
}

// 批量数据加载 Hook
export function useGlobalDataLoader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (key, params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await globalDataStore.loadDataSource(key, params);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDataBatch = useCallback(async (keyParams) => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        keyParams.map(({ key, params }) => globalDataStore.loadDataSource(key, params))
      );
      return results;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    loadData,
    loadDataBatch,
  };
}

// 全局数据状态监控 Hook（开发调试用）
export function useGlobalDataStats() {
  const [stats, setStats] = useState(() => globalDataStore.getSubscriptionStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(globalDataStore.getSubscriptionStats());
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval);
  }, []);

  return stats;
}
