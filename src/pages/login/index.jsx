import ICONS from "./icons";
import React from 'react';
import { Page, View, Image, Text, AtIcon } from '@disscode/react';
import { Input } from '@alilc/antd-lowcode-materials';
import { requestHandle } from '@/utils/dataSource';
import utils from '@/utils';
import constants from '@/utils/constants';
import "./index.scss";
const {
  px,
  RefsManager,
  $eval,
  $evalArray,
  $createChildContext
} = utils;

class Login$Page extends React.Component {
  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = utils.dataSource(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: {
      fetch: requestHandle()
    }
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  constructor(props, context) {
    super(props);
    this.state = {
      req: {},
      isMobile: false
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('login')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;

    return {
      list: [{
        id: 'req',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_user_login',
            contentType: 'JSON',
            method: 'POST',
            params: {
              username: _this.state.account,
              password: _this.state.password
            },
            headers: {}
          };
        }
      }]
    };
  }

  setStateValue(e, {
    field,
    valueField,
    indexs
  }, cb) {
    const state = { ...this.state
    };
    let value = e;

    if (valueField) {
      value = valueField.split('.').reduce((obj, key) => obj && obj[key], e);
    }

    const _field = indexs?.length > 0 ? field.replace(/\.\[\]/g, match => `[${indexs.shift()}].`).replace('.[item]', '') : field;

    this.utils.setValue(state, _field, value);
    this.setState(state, cb);
  }

  async login(e) {
    const {
      account,
      password
    } = this.state;
    if (!account || !password) return this.utils.message.error('请输入用户名密码');
    const hideLoading = this.utils.message.loading();
    const res = await this.dataSourceMap['req']?.load();
    hideLoading();

    if (res.code === 0) {
      const accessToken = res.data;
      localStorage.setItem('accessToken', accessToken);
      this.utils.setGlobalData('accessToken', accessToken);
      this.utils.navigateTo('projectManagement');
      this.utils.message.success('登录成功');
    } else {
      this.utils.message.error(res.msg || '登录失败');
    }
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    if (this.utils.checkMobileTerminal()) {
      this.setState({
        isMobile: true
      });
    }
  }

  render() {
    const _this = this;

    return <Page statusBarMode='light'>
        <View inlineStyle={[{
        enable: $eval(() => this.state.isMobile),
        name: '动态样式1',
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }]} className='login__vw'>
          <View inlineStyle={[{
          enable: $eval(() => this.state.isMobile),
          name: '动态样式1',
          style: {
            flex: 0
          }
        }]} ref={this._refsManager.linkRef('view-adb65814')} className='login__vw__vw M-flex-item'>
            <Image style={$eval(() => this.state.isMobile ? {
            width: 'auto',
            height: px(100)
          } : {
            width: '80%'
          })} src='https://file.mengti.cc/FqgZfRkiyyY6CjhQ3eY4i4Z49HFv' remote={false} fit={false} ref={this._refsManager.linkRef('image-0d99267e')} />
          </View>
          <View ref={this._refsManager.linkRef('view-da5f1527')} inlineStyle={[{
          enable: $eval(() => this.state.isMobile),
          name: '动态样式1',
          style: {
            borderBottomLeftRadius: px(0)
          }
        }]} className='login__vw__vw1 M-flex-item'>
            <View inlineStyle={[{
            enable: $eval(() => this.state.isMobile),
            name: '动态样式1',
            style: {
              width: '100%',
              paddingLeft: px(15),
              paddingRight: px(15),
              flex: 1,
              paddingTop: px(40)
            }
          }]} ref={this._refsManager.linkRef('view-e808a761')} className='login__vw__vw1__vw'>
              <View ref={this._refsManager.linkRef('view-2115df3b')}>
                <Text className='login__tx'>账户登录</Text>
              </View>
              <View className='login__vw__vw1__vw__vw1'>
                <Text className='login__vw__vw1__vw__vw1__tx'>
                  欢迎回来！请输入账号密码登录吧
                </Text>
              </View>
              <View ref={this._refsManager.linkRef('view-6d99607f')} className='login__vw__vw1__vw__vw2'>
                <View className='login__vw__vw1__vw__vw2__vw'>
                  <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_eoxjqs"]} />
                </View>
                <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='login__vw__vw1__vw__vw2__vw1 M-flex-item'>
                  <Input placeholder='用户名' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.account)} onChange={function () {
                  return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                    field: 'account',
                    valueField: 'target.value'
                  }]));
                }.bind(this)} className='login__vw__vw1__vw__vw2__vw1__Input' />
                </View>
              </View>
              <View ref={this._refsManager.linkRef('view-8c39348d')} className='login__vw__vw1__vw__vw3'>
                <View className='login__vw__vw1__vw__vw3__vw'>
                  <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_9y51fz"]} />
                </View>
                <View ref={this._refsManager.linkRef('view-45020ec7')} className='login__vw__vw1__vw__vw3__vw1 M-flex-item'>
                  <Input.Password bordered={false} disabled={false} visibilityToggle={true} placeholder='密码' value={$eval(() => this.state.password)} onChange={function () {
                  return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                    field: 'password',
                    valueField: 'target.value'
                  }]));
                }.bind(this)} onPressEnter={function () {
                  return this.login.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)} className='login__vw__vw1__vw__vw3__vw1__Input.Password' />
                </View>
              </View>
              <View className='login__vw__vw1__vw__vw4'>
                <View onClick={e => {
                this.utils.navigateTo('register');
              }} className='login__vw__vw1__vw__vw4__vw M-gb-click' ref={this._refsManager.linkRef('view-3dcd2eb1')}>
                  <Text className='login__vw__vw1__vw__vw4__vw__tx'>
                    新用户注册
                  </Text>
                </View>
                <View ref={this._refsManager.linkRef('view-b472bd07')} className='login__vw__vw1__vw__vw4__vw1 M-flex-item' />
              </View>
              <View onClick={function () {
              return this.login.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)} className='login__vw__vw1__vw__vw5 M-gb-click' ref={this._refsManager.linkRef('view-7e4b67c5')}>
                <Text className='login__vw__vw1__vw__vw5__tx'>登录</Text>
                <View className='login__vw__vw1__vw__vw5__vw1' />
              </View>
            </View>
          </View>
        </View>
      </Page>;
  }

}

export default Login$Page;