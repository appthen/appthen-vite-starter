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

class Register$Page extends React.Component {
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
      isMobile: false,
      req_1: {}
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('register')
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
            uri: _this.constants.HostDomain + '/system_user_register',
            contentType: 'JSON',
            method: 'POST',
            params: {
              username: _this.state.account,
              password: _this.state.password
            },
            headers: {}
          };
        }
      }, {
        id: 'req_1',
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

  async register(e) {
    const {
      account,
      password,
      code
    } = this.state;
    if (!account || !password) return this.utils.message.error('请填写用户名、密码'); // if (!code) return this.utils.message.error('请输入验证码');

    const hideLoading = this.utils.message.loading();
    const res = await this.dataSourceMap['req']?.load();
    hideLoading();

    if (res.code === 0) {
      // const accessTicket = res.data;
      // localStorage.setItem('accessTicket', JSON.stringify(accessTicket));
      // this.utils.setGlobalData('accessTicket', accessTicket)
      const loginRes = await this.dataSourceMap['req_1']?.load();

      if (loginRes.code === 0) {
        const accessToken = loginRes.data;
        localStorage.setItem('accessToken', accessToken);
        this.utils.setGlobalData('accessToken', accessToken);
        this.utils.navigateTo('projectManagement');
        this.utils.message.success('登录成功');
      } else {
        this.utils.message.error(res.msg || '登录失败');
        this.utils.navigateTo('login');
      }
    } else {
      this.utils.message.error(res.msg || '注册失败');
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
      }]} className='register__vw'>
          <View inlineStyle={[{
          enable: $eval(() => this.state.isMobile),
          name: '动态样式1',
          style: {
            flex: 0
          }
        }]} className='register__vw__vw M-flex-item'>
            <Image style={$eval(() => this.state.isMobile ? {
            width: 'auto',
            height: px(100)
          } : {
            width: '80%'
          })} src='https://file.mengti.cc/FqgZfRkiyyY6CjhQ3eY4i4Z49HFv' remote={false} fit={false} />
          </View>
          <View inlineStyle={[{
          enable: $eval(() => this.state.isMobile),
          name: '动态样式1',
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: px(30),
            paddingLeft: px(20),
            paddingRight: px(20),
            borderBottomLeftRadius: px(0)
          }
        }]} className='register__vw__vw1 M-flex-item'>
            <View inlineStyle={[{
            enable: $eval(() => this.state.isMobile),
            name: '动态样式1',
            style: {
              width: '100%'
            }
          }]} className='register__vw__vw1__vw'>
              <View>
                <Text className='register__tx'>新用户注册</Text>
              </View>
              <View className='register__vw__vw1__vw__vw1'>
                <Text ref={this._refsManager.linkRef('text-ac6a8287')} className='register__vw__vw1__vw__vw1__tx' />
              </View>
              <View className='register__vw__vw1__vw__vw2'>
                <View className='register__vw__vw1__vw__vw2__vw'>
                  <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_2jsaxq"]} />
                </View>
                <View className='register__vw__vw1__vw__vw2__vw1 M-flex-item'>
                  <Input placeholder='用户名' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.account)} onChange={function () {
                  return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                    field: 'account',
                    valueField: 'target.value'
                  }]));
                }.bind(this)} ref={this._refsManager.linkRef('input-3eae6345')} className='register__vw__vw1__vw__vw2__vw1__Input' />
                </View>
              </View>
              <View className='register__vw__vw1__vw__vw3'>
                <View className='register__vw__vw1__vw__vw3__vw'>
                  <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_v6w4jv"]} />
                </View>
                <View className='register__vw__vw1__vw__vw3__vw1 M-flex-item'>
                  <Input.Password bordered={false} disabled={false} visibilityToggle={true} placeholder='密码' value={$eval(() => this.state.password)} onChange={function () {
                  return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                    field: 'password',
                    valueField: 'target.value'
                  }]));
                }.bind(this)} onPressEnter={function () {
                  return this.register.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)} className='register__vw__vw1__vw__vw3__vw1__Input.Password' />
                </View>
              </View>
              {!!false && <View ref={this._refsManager.linkRef('view-4c3d5e36')} className='register__vw__vw1__vw__vw4'>
                  <View className='register__vw__vw1__vw__vw4__vw'>
                    <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_8wza2u"]} />
                  </View>
                  <View className='register__vw__vw1__vw__vw4__vw1 M-flex-item'>
                    <Input placeholder='验证码' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.code)} onChange={function () {
                  return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                    field: 'code',
                    valueField: 'target.value'
                  }]));
                }.bind(this)} className='register__vw__vw1__vw__vw4__vw1__Input' />
                  </View>
                  <View className='register__vw__vw1__vw__vw4__vw2'>
                    <View className='register__vw__vw1__vw__vw4__vw2__vw M-gb-click'>
                      <Text className='register__vw__vw1__vw__vw4__vw2__vw__tx'>
                        获取验证码
                      </Text>
                      <View className='register__vw__vw1__vw__vw4__vw2__vw__vw1' />
                    </View>
                  </View>
                </View>}
              <View className='register__vw__vw1__vw__vw5'>
                <View onClick={e => {
                this.utils.navigateTo('login');
              }} className='register__vw__vw1__vw__vw5__vw M-gb-click'>
                  <Text className='register__vw__vw1__vw__vw5__vw__tx'>
                    已有账号？去登录
                  </Text>
                </View>
                <View className='register__vw__vw1__vw__vw5__vw1 M-flex-item' />
              </View>
              <View onClick={function () {
              return this.register.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)} className='register__vw__vw1__vw__vw6 M-gb-click'>
                <Text className='register__vw__vw1__vw__vw6__tx'>确认注册</Text>
                <View className='register__vw__vw1__vw__vw6__vw1' />
              </View>
            </View>
          </View>
        </View>
      </Page>;
  }

}

export default Register$Page;