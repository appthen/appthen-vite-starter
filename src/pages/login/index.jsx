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
      isMobile: false,
      tab: 'smscode',
      countdown: 0,
      getCode: {}
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
              username: _this.state.tab === 'smscode' ? undefined : _this.state.account,
              password: _this.state.tab === 'smscode' ? undefined : _this.state.password,
              type: _this.state.tab === 'smscode' ? 'phone' : 'username',
              code: _this.state.tab === 'smscode' ? _this.state.code : undefined,
              phone: _this.state.tab === 'smscode' ? _this.state.account : undefined
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
      code
    } = this.state; // if (!account || !password) return this.utils.message.error('请输入用户名密码');

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
      if (this.state.tab === 'smscode' && res.code === 429) {
        this.utils.message.info('您是新用户，请输入密码完成注册');
        this.utils.preload('LOGIN_FORM', {
          account,
          code
        });
      }

      this.utils.message.error(res.msg || '登录失败');
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
                <View ref={this._refsManager.linkRef('view-bdc4899f')} className='login__vw_1 M-flex-item'>
                  <View onClick={e => {
                  this.setStateValue('smscode', {
                    field: 'tab'
                  });
                }} ref={this._refsManager.linkRef('view-fba7f25a')} className='login__vw_1__vw'>
                    <Text ref={this._refsManager.linkRef('text-b0e7fc50')} inlineStyle={[{
                    enable: $eval(() => this.state.tab !== 'smscode'),
                    name: 'nosel',
                    style: {
                      fontWeight: 400,
                      fontSize: px(24)
                    }
                  }]} className='login__vw_1__vw__tx'>
                      短信登录
                    </Text>
                    <View inlineStyle={[{
                    enable: $eval(() => this.state.tab === 'smscode'),
                    name: '动态样式1',
                    style: {
                      backgroundColor: 'rgba(19,115,252,0.76)'
                    }
                  }]} className='login__vw_1__vw__vw1' />
                  </View>
                  <View onClick={e => {
                  this.setStateValue('password', {
                    field: 'tab'
                  });
                }} ref={this._refsManager.linkRef('view-e835ef9d')} className='login__vw_1__vw1'>
                    <Text ref={this._refsManager.linkRef('text-b0e7fc50')} inlineStyle={[{
                    enable: $eval(() => this.state.tab !== 'password'),
                    name: 'nosql',
                    style: {
                      fontWeight: 400,
                      color: '#606060',
                      fontSize: px(24)
                    }
                  }]} className='login__vw_1__vw1__tx'>
                      账号密码
                    </Text>
                    <View inlineStyle={[{
                    enable: $eval(() => this.state.tab === 'password'),
                    name: '动态样式1',
                    style: {
                      backgroundColor: 'rgba(19,115,252,0.76)'
                    }
                  }]} ref={this._refsManager.linkRef('view-b7f6e0e1')} className='login__vw_1__vw1__vw1' />
                  </View>
                </View>
              </View>
              {!!$eval(() => this.state.tab === 'smscode') && <View ref={this._refsManager.linkRef('view-fe1bddac')}>
                  <View ref={this._refsManager.linkRef('view-fe1bddac')}>
                    <View ref={this._refsManager.linkRef('view-6d99607f')} className='login__vw_2'>
                      <View className='login__vw_2__vw'>
                        <AtIcon color='#98b0f5' size={22} svg={ICONS["svg_s3sqia"]} />
                      </View>
                      <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='login__vw_2__vw1 M-flex-item'>
                        <Input placeholder='手机号' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.account)} onChange={function () {
                      return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                        field: 'account',
                        valueField: 'target.value'
                      }]));
                    }.bind(this)} className='login__vw_2__vw1__Input' />
                      </View>
                    </View>
                    <View ref={this._refsManager.linkRef('view-6d99607f')} className='login__vw1'>
                      <View className='login__vw1__vw'>
                        <AtIcon color='#98b0f5' size={22} svg={ICONS["svg_wd0w5s"]} />
                      </View>
                      <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='login__vw1__vw1 M-flex-item'>
                        <Input placeholder='验证码' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.code)} onChange={function () {
                      return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                        field: 'code',
                        valueField: 'target.value'
                      }]));
                    }.bind(this)} className='login__vw1__vw1__Input' />
                      </View>
                      <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='login__vw1__vw2'>
                        <View className='login__vw1__vw2__vw' ref={this._refsManager.linkRef('view-f7d71db3')} onClick={function () {
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
                      }]} className='login__vw1__vw2__vw__tx'>
                            {$eval(() => this.state.countdown > 0 ? `${this.state.countdown} 秒后重新获取` : '获取验证码')}
                          </Text>
                          <View className='login__vw1__vw2__vw__vw1' />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>}
              {!!$eval(() => this.state.tab === 'password') && <View ref={this._refsManager.linkRef('view-dc8d1bab')}>
                  <View ref={this._refsManager.linkRef('view-6d99607f')} className='login__vw_3'>
                    <View className='login__vw_3__vw'>
                      <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_vxqwb8"]} />
                    </View>
                    <View ref={this._refsManager.linkRef('view-6c65f6d1')} className='login__vw_3__vw1 M-flex-item'>
                      <Input placeholder='用户名' bordered={false} disabled={false} allowClear={true} value={$eval(() => this.state.account)} onChange={function () {
                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                      field: 'account',
                      valueField: 'target.value'
                    }]));
                  }.bind(this)} className='login__vw_3__vw1__Input' />
                    </View>
                  </View>
                  <View ref={this._refsManager.linkRef('view-8c39348d')} className='login__vw1_4'>
                    <View className='login__vw1_4__vw'>
                      <AtIcon color='#98b0f5' size={24} svg={ICONS["svg_yopqq6"]} />
                    </View>
                    <View ref={this._refsManager.linkRef('view-45020ec7')} className='login__vw1_4__vw1 M-flex-item'>
                      <Input.Password bordered={false} disabled={false} visibilityToggle={true} placeholder='密码' value={$eval(() => this.state.password)} onChange={function () {
                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                      field: 'password',
                      valueField: 'target.value'
                    }]));
                  }.bind(this)} onPressEnter={function () {
                    return this.login.apply(this, Array.prototype.slice.call(arguments).concat([]));
                  }.bind(this)} className='login__vw1_4__vw1__Input.Password' />
                    </View>
                  </View>
                </View>}
              <View className='login__vw__vw1__vw__vw3'>
                <View onClick={e => {
                this.utils.navigateTo('register');
              }} className='login__vw__vw1__vw__vw3__vw M-gb-click' ref={this._refsManager.linkRef('view-3dcd2eb1')}>
                  <Text className='login__vw__vw1__vw__vw3__vw__tx'>
                    新用户注册
                  </Text>
                </View>
                <View ref={this._refsManager.linkRef('view-b472bd07')} className='login__vw__vw1__vw__vw3__vw1 M-flex-item' />
              </View>
              <View onClick={function () {
              return this.login.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)} className='login__vw__vw1__vw__vw4 M-gb-click' ref={this._refsManager.linkRef('view-7e4b67c5')}>
                <Text className='login__vw__vw1__vw__vw4__tx'>登录</Text>
                <View className='login__vw__vw1__vw__vw4__vw1' />
              </View>
            </View>
          </View>
        </View>
      </Page>;
  }

}

export default Login$Page;