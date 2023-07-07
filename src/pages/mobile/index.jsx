import static_image from "./images/image.png";
import static_r1_image from "./images/r1_image.png";
import static_r2_image from "./images/r2_image.png";
import static_r3_image from "./images/r3_image.png";
import ICONS from "./icons";
import React from 'react';
import { Page, Modal, View, Text, ScrollView, Image, AtIcon } from '@disscode/react';
import QrcodeApp from "@/pages/components/QrcodeApp";
import ApplicationList from "@/pages/components/ApplicationList";
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

class Mobile$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      currentTab: 'store',
      userInfo: {}
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('mobile')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  switchTab(e, {
    tab
  }) {
    this.setState({
      currentTab: tab
    }, () => {
      // this.dataSourceMap['projects'].load()
      this.$('modal')?.close();
    });
  }

  logOut(e) {
    localStorage.removeItem('accessToken');
    this.utils.setGlobalData('accessToken', '');
    this.utils.redirectTo('login');
  }

  jumpUrl(e, {
    url
  }) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  getCode() {
    let redirect_uri = window.location.href;
    redirect_uri = encodeURIComponent(redirect_uri);
    console.log('getCode: ', window.location.href);
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.constants.mpAppId + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
  }

  getUrlCode(name) {
    console.log('getUrlCode name: ', name);
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
  }

  componentDidMount() {
    this.utils.checkForLogin().then(() => {
      this.setState({
        userInfo: this.utils.getGlobalData('userInfo')
      });
      console.log('isWeChatBrowser: ', this.utils.isWeChatBrowser());

      if (this.utils.isWeChatBrowser()) {
        console.log('isWeChatBrowser: ', true);
        this.code = this.getUrlCode('code');

        if (this.code) {
          // 获取OPENID
          this.utils.reloadGlobalData('getOpenId', {
            code: this.code
          }).then(res => {
            console.log('res: ', res);

            if (res.code === 0) {
              window.localStorage.setItem('MP_OPID', res.data.openid);
            } else {// @TODO: 错误的情况
            }
          });
        } else {
          this.getCode();
        }
      }
    }).catch(e => {
      console.log('error: ', e);
    });
  }

  render() {
    const _this = this;

    return <Page keyboard={false} absolute={false} statusBarMode='light' backgroundImage='https://file.mengti.cc/FmV6MakP1HZ8GVeC_2YybgHYSE72' className='mobile__move'>
        <Modal style={{
        height: '100%'
      }} animate='slide-left' renderView={props => <View className='mobile__vw M-flex-item'>
              <View ref={this._refsManager.linkRef('view-83d9c761')} className='mobile__vw__vw'>
                <View className='mobile__vw__vw__vw M-flex-item'>
                  <Text className='mobile__vw__vw__vw__tx'>Hysli.io AI</Text>
                </View>
              </View>
              <ScrollView>
                <View ref={this._refsManager.linkRef('view-c5ef6035')} className='mobile__vw_1'>
                  <View inlineStyle={[{
              enable: $eval(() => _this.state.currentTab === 'store'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'store'
              }]));
            }.bind(_this)} className='mobile__vw_1__vw M-gb-click'>
                    <Image src={static_image} remote={false} fit={false} className='mobile__vw_1__vw__Image' />
                    <Text className='mobile__vw_1__vw__tx1'>应用商店</Text>
                  </View>
                  <View className='mobile__parting_line'>
                    <View className='mobile__parting_line__vw' />
                  </View>
                  <View inlineStyle={[{
              enable: $eval(() => _this.state.currentTab === 'qrcode'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'qrcode'
              }]));
            }.bind(_this)} className='mobile__vw_1__vw2 M-gb-click'>
                    <AtIcon color='#fe935f' size={16} svg={ICONS["svg_u39c0z"]} />
                    <Text className='mobile__vw_1__vw2__tx1'>
                      ArtQR 智绘二维码
                    </Text>
                  </View>
                  <View className='mobile__parting_line_2'>
                    <View className='mobile__parting_line_2__vw' />
                  </View>
                  <View className='mobile__vw_1__vw4' />
                  <View className='mobile__vw_1__vw5'>
                    <View className='mobile__vw_1__vw5__vw'>
                      <View className='mobile__vw_1__vw5__vw__vw M-flex-item'>
                        <View className='mobile__vw_1__vw5__vw__vw__vw M-gb-click' onClick={e => {}}>
                          <Image src={static_r1_image} remote={false} fit={false} className='mobile__vw_1__vw5__vw__vw__vw__Image' />
                        </View>
                        <View className='mobile__vw_1__vw5__vw__vw__vw1 M-gb-click' onClick={e => {}}>
                          <View className='mobile__vw_1__vw5__vw__vw__vw1__vw'>
                            <Text className='mobile__vw_1__vw5__vw__vw__vw1__vw__tx'>
                              限时免费中，扫码进群领会员👆
                            </Text>
                            <Text className='mobile__vw_1__vw5__vw__vw__vw1__vw__tx1'>
                              长按识别二维码
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className='mobile__vw_1__vw6'>
                    <View className='mobile__vw_1__vw6__vw'>
                      <View className='mobile__vw_1__vw6__vw__vw M-flex-item'>
                        <View className='mobile__vw_1__vw6__vw__vw__vw M-flex-item'>
                          <Text className='mobile__vw_1__vw6__vw__vw__vw__tx'>
                            本应用由以下工具快速构建
                          </Text>
                        </View>
                        <View className='mobile__vw_1__vw6__vw__vw__vw1 M-gb-click' onClick={e => {
                    return _this.jumpUrl(e, {
                      url: 'https://github.com/labring/laf'
                    });
                  }}>
                          <View style={{}}>
                            <View className='mobile__vw_3'>
                              <Image src={static_r2_image} remote={false} fit={false} className='mobile__vw_3__Image' />
                            </View>
                          </View>
                          <View className='mobile__vw_1__vw6__vw__vw__vw1__vw1 M-flex-item'>
                            <Text className='mobile__vw_1__vw6__vw__vw__vw1__vw1__tx'>
                              Laf 随时随地快速开发具有 AI 能力的分布式应用
                            </Text>
                          </View>
                        </View>
                        <View className='mobile__vw_1__vw6__vw__vw__vw2 M-gb-click' onClick={function () {
                    return this.jumpUrl.apply(this, Array.prototype.slice.call(arguments).concat([{
                      url: 'https://github.com/labring/sealos'
                    }]));
                  }.bind(_this)}>
                          <View style={{}}>
                            <Image src={static_r3_image} remote={false} fit={false} className='mobile__Image' />
                          </View>
                          <View className='mobile__vw_1__vw6__vw__vw__vw2__vw1 M-flex-item'>
                            <Text className='mobile__vw_1__vw6__vw__vw__vw2__vw1__tx'>
                              Sealos
                              是一款云操作系统发行版，让你能够像使用个人电脑一样简单地使用云
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  {!!$eval(() => _this.state.userInfo?.username) && <View ref={this._refsManager.linkRef('view-d0186596')} className='mobile__vw_1__vw7'>
                      <View className='mobile__vw_1__vw7__vw M-flex-item'>
                        <Text className='mobile__vw_1__vw7__vw__tx'>
                          {$eval(() => _this.state.userInfo?.username)}
                        </Text>
                        <View className='mobile__vw_1__vw7__vw__vw1'>
                          <Text className='mobile__vw_1__vw7__vw__vw1__tx'>
                            限时免费
                          </Text>
                        </View>
                      </View>
                      <View className='mobile__vw_1__vw7__vw1 M-gb-click' onClick={function () {
                return this.logOut.apply(this, Array.prototype.slice.call(arguments).concat([]));
              }.bind(_this)}>
                        <AtIcon color='#adadad' size={22} svg={ICONS["svg_eilrrx"]} />
                      </View>
                    </View>}
                  <View className='mobile__vw_1__vw8' />
                  {!!false && <View inlineStyle={[{
              enable: $eval(() => _this.state.currentTab === 'manage'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'qrcode'
              }]));
            }.bind(_this)} className='mobile__vw_1__vw9 M-gb-click'>
                      <AtIcon color='#fe935f' size={16} svg={ICONS["svg_qyekyx"]} />
                      <Text className='mobile__vw_1__vw9__tx1'>系统设置</Text>
                    </View>}
                  {!!false && <View inlineStyle={[{
              enable: $eval(() => _this.state.currentTab === 'manage'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'qrcode'
              }]));
            }.bind(_this)} className='mobile__vw_1__vw10 M-gb-click'>
                      <AtIcon color='#fe935f' size={16} svg={ICONS["svg_p6vghq"]} />
                      <Text className='mobile__vw_1__vw10__tx1'>OEM 代理</Text>
                    </View>}
                </View>
              </ScrollView>
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('modal')} />
        <View className='mobile__move__vw1'>
          <View ref={this._refsManager.linkRef('view-3c6ffa92')} className='mobile__main_body'>
            <View className='mobile__main_body__vw M-flex-item'>
              <View onClick={e => {
              this.$('modal')?.open();
            }} className='mobile__main_body__vw__vw'>
                <View style={{}}>
                  <AtIcon color='#666' size={25} svg={ICONS["svg_i8txs1"]} />
                </View>
                <View className='mobile__main_body__vw__vw__vw1 M-flex-item'>
                  <Text className='mobile__main_body__vw__vw__vw1__tx'>
                    Hysli.io AI
                  </Text>
                  <Text className='mobile__main_body__vw__vw__vw1__tx1'>
                    限时免费中，扫码进群领会员👆
                  </Text>
                </View>
                <View ref={this._refsManager.linkRef('view-6ef0fbeb')} className='mobile__main_body__vw__vw__vw2'>
                  <AtIcon color='#c8c8c8' size={28} svg={ICONS["svg_qkp8as"]} />
                  <Text className='mobile__main_body__vw__vw__vw2__tx1'>
                    导航
                  </Text>
                </View>
              </View>
              <View ref={this._refsManager.linkRef('view-26b80ba7')} className='mobile__item_list M-flex-item'>
                {!!$eval(() => this.state.currentTab === 'qrcode') && <QrcodeApp title='' ref={this._refsManager.linkRef('qrcodeapp-1238bca5')} isMobile={true} />}
                {!!$eval(() => this.state.currentTab === 'store') && <ApplicationList title='' ref={this._refsManager.linkRef('applicationlist-b3f982db')} onChangeApp={app => {
                this.switchTab(undefined, {
                  tab: app.alias
                });
              }} />}
              </View>
            </View>
          </View>
        </View>
      </Page>;
  }

}

export default Mobile$Page;