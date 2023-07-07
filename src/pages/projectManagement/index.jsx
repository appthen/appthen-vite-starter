import static_image from "./images/image.png";
import static_r1_image from "./images/r1_image.png";
import static_r2_image from "./images/r2_image.png";
import static_r3_image from "./images/r3_image.png";
import ICONS from "./icons";
import React from 'react';
import { Page, View, Text, Image, AtIcon } from '@disscode/react';
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

class ProjectManagement$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      currentTab: 'store'
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('projectManagement')
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
    }, () => {// this.dataSourceMap['projects'].load()
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

  async refreshPersonalInformation() {
    const userInfo = await this.utils.reloadGlobalData('userInfo');
    this.setState({
      userInfo
    });
  }

  componentDidMount() {
    if (this.utils.isWeChatBrowser()) {
      // console.log('url: ', this.constants.runSiteDomain + '/#/mobile');
      return window.location.href = this.constants.runSiteDomain + '/#/mobile';
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      return this.utils.navigateTo('mobile');
    }

    this.utils.checkForLogin().then(() => {
      this.setState({
        userInfo: this.utils.getGlobalData('userInfo')
      });
    }).catch(e => {
      console.log('error: ', e);
    });
    this.eid = this.utils.event.$on('REFRESH_USER_INFO', () => {
      this.refreshPersonalInformation();
    });
  }

  render() {
    const _this = this;

    return <Page keyboard={false} absolute={false} statusBarMode='light' backgroundImage='https://file.mengti.cc/FmV6MakP1HZ8GVeC_2YybgHYSE72' className='projectManagement__project_management'>
        <View className='projectManagement__project_management__vw'>
          <View ref={this._refsManager.linkRef('view-3c6ffa92')} className='projectManagement__main_body'>
            <View ref={this._refsManager.linkRef('view-c5ef6035')} className='projectManagement__main_body__vw'>
              <View className='projectManagement__main_body__vw__vw'>
                <View className='projectManagement__main_body__vw__vw__vw M-flex-item'>
                  <Text className='projectManagement__main_body__vw__vw__vw__tx'>
                    Hysli.io AI
                  </Text>
                </View>
              </View>
              <View inlineStyle={[{
              enable: $eval(() => this.state.currentTab === 'store'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'store'
              }]));
            }.bind(this)} className='projectManagement__main_body__vw__vw1 M-gb-click'>
                <Image src={static_image} remote={false} fit={false} className='projectManagement__main_body__vw__vw1__Image' />
                <Text className='projectManagement__main_body__vw__vw1__tx1'>
                  应用商店
                </Text>
              </View>
              <View className='projectManagement__parting_line'>
                <View className='projectManagement__parting_line__vw' />
              </View>
              <View inlineStyle={[{
              enable: $eval(() => this.state.currentTab === 'qrcode'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'qrcode'
              }]));
            }.bind(this)} className='projectManagement__main_body__vw__vw3 M-gb-click'>
                <AtIcon color='#fe935f' size={16} svg={ICONS["svg_vdqe2e"]} />
                <Text className='projectManagement__main_body__vw__vw3__tx1'>
                  ArtQR 智绘二维码
                </Text>
              </View>
              <View className='projectManagement__parting_line_1'>
                <View className='projectManagement__parting_line_1__vw' />
              </View>
              <View className='projectManagement__main_body__vw__vw5 M-flex-item' />
              <View className='projectManagement__main_body__vw__vw6'>
                <View className='projectManagement__main_body__vw__vw6__vw'>
                  <View className='projectManagement__main_body__vw__vw6__vw__vw M-flex-item'>
                    <View className='projectManagement__main_body__vw__vw6__vw__vw__vw M-gb-click' onClick={e => {}}>
                      <Image src={static_r1_image} remote={false} fit={false} className='projectManagement__main_body__vw__vw6__vw__vw__vw__Image' />
                    </View>
                    <View className='projectManagement__main_body__vw__vw6__vw__vw__vw1 M-gb-click' onClick={e => {}}>
                      <View className='projectManagement__main_body__vw__vw6__vw__vw__vw1__vw'>
                        <Text className='projectManagement__main_body__vw__vw6__vw__vw__vw1__vw__tx'>
                          限时免费中，扫码进群领会员👆
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className='projectManagement__main_body__vw__vw7'>
                <View className='projectManagement__main_body__vw__vw7__vw'>
                  <View className='projectManagement__main_body__vw__vw7__vw__vw M-flex-item'>
                    <View className='projectManagement__main_body__vw__vw7__vw__vw__vw M-flex-item'>
                      <Text className='projectManagement__main_body__vw__vw7__vw__vw__vw__tx'>
                        本应用由以下工具快速构建
                      </Text>
                    </View>
                    <View className='projectManagement__main_body__vw__vw7__vw__vw__vw1 M-gb-click' onClick={e => {
                    return this.jumpUrl(e, {
                      url: 'https://github.com/labring/laf'
                    });
                  }}>
                      <View style={{}}>
                        <View className='projectManagement__vw'>
                          <Image src={static_r2_image} remote={false} fit={false} className='projectManagement__vw__Image' />
                        </View>
                      </View>
                      <View className='projectManagement__main_body__vw__vw7__vw__vw__vw1__vw1 M-flex-item'>
                        <Text className='projectManagement__main_body__vw__vw7__vw__vw__vw1__vw1__tx'>
                          Laf 随时随地快速开发具有 AI 能力的分布式应用
                        </Text>
                      </View>
                    </View>
                    <View className='projectManagement__main_body__vw__vw7__vw__vw__vw2 M-gb-click' onClick={function () {
                    return this.jumpUrl.apply(this, Array.prototype.slice.call(arguments).concat([{
                      url: 'https://github.com/labring/sealos'
                    }]));
                  }.bind(this)}>
                      <View style={{}}>
                        <Image src={static_r3_image} remote={false} fit={false} className='projectManagement__Image' />
                      </View>
                      <View className='projectManagement__main_body__vw__vw7__vw__vw__vw2__vw1 M-flex-item'>
                        <Text className='projectManagement__main_body__vw__vw7__vw__vw__vw2__vw1__tx'>
                          Sealos
                          是一款云操作系统发行版，让你能够像使用个人电脑一样简单地使用云
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {!!$eval(() => this.state.userInfo?.username) && <View ref={this._refsManager.linkRef('view-2f0112e1')} className='projectManagement__main_body__vw__vw8'>
                  <View className='projectManagement__main_body__vw__vw8__vw M-flex-item'>
                    <Text className='projectManagement__main_body__vw__vw8__vw__tx'>
                      {$eval(() => `可用点数 ${this.state.userInfo?.totalAmount || 0}`)}
                    </Text>
                    <View className='projectManagement__main_body__vw__vw8__vw__vw1'>
                      <Text inlineStyle={[{
                    enable: true,
                    name: '动态样式1',
                    style: {
                      color: '#ffb43d'
                    }
                  }]} className='projectManagement__main_body__vw__vw8__vw__vw1__tx'>
                        {$eval(() => !this.state.userInfo?.vip ? '免费用户' : 'VIP')}
                      </Text>
                    </View>
                  </View>
                  <View className='projectManagement__main_body__vw__vw8__vw1 M-gb-click' onClick={function () {
                return this.logOut.apply(this, Array.prototype.slice.call(arguments).concat([]));
              }.bind(this)}>
                    <AtIcon color='#adadad' size={22} svg={ICONS["svg_ralvld"]} />
                  </View>
                </View>}
              <View className='projectManagement__main_body__vw__vw9' />
              {!!false && <View inlineStyle={[{
              enable: $eval(() => this.state.currentTab === 'manage'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'qrcode'
              }]));
            }.bind(this)} className='projectManagement__main_body__vw__vw10 M-gb-click'>
                  <AtIcon color='#fe935f' size={16} svg={ICONS["svg_we7erw"]} />
                  <Text className='projectManagement__main_body__vw__vw10__tx1'>
                    系统设置
                  </Text>
                </View>}
              {!!false && <View inlineStyle={[{
              enable: $eval(() => this.state.currentTab === 'manage'),
              name: '动态样式1',
              style: {
                backgroundColor: 'rgba(102,142,255,0.2)',
                borderRadius: px(8)
              }
            }]} ref={this._refsManager.linkRef('view-33b4c3b4')} onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'qrcode'
              }]));
            }.bind(this)} className='projectManagement__main_body__vw__vw11 M-gb-click'>
                  <AtIcon color='#fe935f' size={16} svg={ICONS["svg_ce6hnz"]} />
                  <Text className='projectManagement__main_body__vw__vw11__tx1'>
                    OEM 代理
                  </Text>
                </View>}
            </View>
            <View className='projectManagement__main_body__vw1 M-flex-item'>
              <View ref={this._refsManager.linkRef('view-26b80ba7')} className='projectManagement__item_list M-flex-item'>
                {!!$eval(() => this.state.currentTab === 'qrcode') && <QrcodeApp title='' ref={this._refsManager.linkRef('qrcodeapp-1238bca5')} />}
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

export default ProjectManagement$Page;