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
      countdown: 0,
      getCode: {},
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
              password: _this.state.password,
              phone: _this.state.account,
              code: _this.state.code
            },
            headers: {}
          };
        }
      }, {
        id: 'getCode',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_user_phone',
            contentType: 'JSON',
            method: 'POST',
            params: {
              phone: _this.state.account
            },
            headers: {},
            timeout: 15000
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
              type: 'phone',
              code: _this.state.code,
              phone: _this.state.account
            },
            headers: {}
          };
        }
      }]
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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

  async getVerificationCode(e) {
    if (this.state.account?.length !== 11) {
      return this.utils.message.error('请输入正确的手机号');
    }

    if (this.state.countdown > 0) {
      return this.utils.message.error('请稍等');
    }

    const hide = this.utils.message.loading();
    const getCode = await this.dataSourceMap['getCode']?.load();
    hide();

    if (getCode?.code !== 0) {
      return this.utils.message.error(this.state.getCode?.msg);
    }

    this.setState({
      countdown: 60
    });
    this.timer = setInterval(() => {
      this.decreaseCountdown();
    }, 1000);
  }

  decreaseCountdown() {
    this.setState(prevState => ({
      countdown: prevState.countdown - 1
    }), () => {
      if (this.state.countdown < 1) {
        clearInterval(this.timer);
        this.timer = null;
      }
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    if (this.utils.checkMobileTerminal()) {
      this.setState({
        isMobile: true
      });
    }

    const loginForm = this.utils.preload('LOGIN_FORM');

    if (loginForm) {
      this.setState(loginForm);
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
            borderBottomLeftRadius: px(0),
            borderColor: '#c1c1c1'
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
                <Text className='register__tx'>验证手机号注册</Text>
              </View>
              <View className='register__vw__vw1__vw__vw1'>
                <Text ref={this._refsManager.linkRef('text-ac6a8287')} className='register__vw__vw1__vw__vw1__tx' />
              </View>
              <View ref={this._refsManager.linkRef('view-fe1bddac')}>
                <View ref={this._refsManager.linkRef('view-6d99607f')} className='register__vw_1'>
                  <View className='register__vw_1__vw'>
                    <AtIcon color='#98b0f5' size={22} svg={ICONS["svg_fy94la"]} />
                  </View>
                  <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='register__vw_1__vw1 M-flex-item'>
                    <Input placeholder='手机号' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.account)} onChange={function () {
                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                      field: 'account',
                      valueField: 'target.value'
                    }]));
                  }.bind(this)} className='register__vw_1__vw1__Input' />
                  </View>
                </View>
                <View ref={this._refsManager.linkRef('view-6d99607f')} className='register__vw1'>
                  <View className='register__vw1__vw'>
                    <AtIcon color='#98b0f5' size={22} svg={ICONS["svg_p0oz6p"]} />
                  </View>
                  <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='register__vw1__vw1 M-flex-item'>
                    <Input placeholder='验证码' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.code)} onChange={function () {
                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                      field: 'code',
                      valueField: 'target.value'
                    }]));
                  }.bind(this)} className='register__vw1__vw1__Input' />
                  </View>
                  <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='register__vw1__vw2'>
                    <View className='register__vw1__vw2__vw' ref={this._refsManager.linkRef('view-f7d71db3')} onClick={function () {
                    return this.getVerificationCode.apply(this, Array.prototype.slice.call(arguments).concat([]));
                  }.bind(this)} inlineStyle={[{
                    enable: $eval(() => this.state.countdown > 0),
                    name: '动态样式1',
                    style: {
                      backgroundColor: '#eaeaea',
                      borderColor: '#d6d6d6',
                      borderWidth: px(1),
                      borderStyle: 'solid'
                    }
                  }]}>
                      <Text inlineStyle={[{
                      enable: $eval(() => this.state.countdown > 0),
                      name: '动态样式1',
                      style: {
                        color: '#767676'
                      }
                    }]} className='register__vw1__vw2__vw__tx'>
                        {$eval(() => this.state.countdown > 0 ? `${this.state.countdown} 秒后重新获取` : '获取验证码')}
                      </Text>
                      <View className='register__vw1__vw2__vw__vw1' />
                    </View>
                  </View>
                </View>
              </View>
              <View className='register__vw__vw1__vw__vw3'>
                <View className='register__vw__vw1__vw__vw3__vw'>
                  <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_0k3qtn"]} />
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
              <View className='register__vw__vw1__vw__vw4'>
                <View onClick={e => {
                this.utils.navigateTo('login');
              }} className='register__vw__vw1__vw__vw4__vw M-gb-click'>
                  <Text className='register__vw__vw1__vw__vw4__vw__tx'>
                    已有账号？去登录
                  </Text>
                </View>
                <View className='register__vw__vw1__vw__vw4__vw1 M-flex-item' />
              </View>
              <View onClick={function () {
              return this.register.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)} className='register__vw__vw1__vw__vw5 M-gb-click'>
                <Text className='register__vw__vw1__vw__vw5__tx'>确认注册</Text>
                <View className='register__vw__vw1__vw__vw5__vw1' />
              </View>
            </View>
          </View>
        </View>
      </Page>;
  }

}

export default Register$Page;