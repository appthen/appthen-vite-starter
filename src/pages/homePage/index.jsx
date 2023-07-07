import static_image from "./images/image.png";
import ICONS from "./icons";
import React from 'react';
import { Page, View, Text, AtIcon, Image, Modal, Video } from '@disscode/react';
import SiteTopBar from "@/pages/components/SiteTopBar";
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

class HomePage$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  utils = Object.assign({
    getRoute: utils.createRoute('homePage')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentDidMount() {}

  render() {
    const _this = this;

    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FmV6MakP1HZ8GVeC_2YybgHYSE72' className='homePage__home_page'>
        <View style={{}}>
          <SiteTopBar title='' />
        </View>
        <View className='homePage__main_body'>
          <View className='homePage__content_area'>
            <View className='homePage__card'>
              <View className='homePage__card__vw'>
                <Text className='homePage__card__vw__tx'>代码</Text>
                <Text className='homePage__card__vw__tx1'>.</Text>
                <Text className='homePage__card__vw__tx2'>可有可无</Text>
              </View>
              <View className='homePage__card__vw1'>
                <Text className='homePage__card__vw1__tx' />
                <Text className='homePage__card__vw1__tx1'>生成式</Text>
                <View className='homePage__card__vw1__vw2'>
                  <Text className='homePage__card__vw1__vw2__tx'>无捆绑</Text>
                  <Text className='homePage__card__vw1__vw2__tx1'>无限制</Text>
                </View>
                <Text className='homePage__card__vw1__tx3'>
                  应用可视化开发工具
                </Text>
              </View>
              <View className='homePage__card__vw2'>
                <Text className='homePage__card__vw2__tx'>
                  Disscode是一个接近「常规开发」的低/无代码应用程序可视化开发工具，使用Taro、React
                  Native、Nextjs框架构建和设计应用程序，帮助开发者、企业脱离低阶的开发工作，将更多的资源投入产品的建设、企业数字化转型及学习成长
                </Text>
              </View>
              <View className='homePage__card__vw3'>
                <View onClick={e => {
                this.$('modal-ad5c55ea')?.open();
              }} ref={this._refsManager.linkRef('view-04d71741')} className='homePage__card__vw3__vw M-gb-click'>
                  <View className='homePage__card__vw3__vw__vw'>
                    <AtIcon color='#cbcbcb' size={20} svg={ICONS["svg_02q931"]} />
                  </View>
                  <Text ref={this._refsManager.linkRef('text-bd2f6c27')} className='homePage__card__vw3__vw__tx1'>
                    3分钟速览开发
                  </Text>
                </View>
                <View className='homePage__card__vw3__vw1 M-gb-click'>
                  <Text className='homePage__card__vw3__vw1__tx'>开始使用</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='homePage__main_body_1'>
          <View className='homePage__content_area_2'>
            <View className='homePage__card_3'>
              <View className='homePage__card_3__vw'>
                <Text className='homePage__card_3__vw__tx'>特性</Text>
              </View>
              <View className='homePage__card_3__vw1'>
                <View className='homePage__card_3__vw1__vw M-flex-item'>
                  <Text className='homePage__card_3__vw1__vw__tx'>
                    前端开发可视化&#38;标准化
                  </Text>
                  <View className='homePage__card_3__vw1__vw__vw1'>
                    <Text className='homePage__card_3__vw1__vw__vw1__tx'>
                      降低前端开发上手门槛，效率提升事半功倍
                    </Text>
                  </View>
                  <View className='homePage__card_3__vw1__vw__vw2'>
                    <Text className='homePage__card_3__vw1__vw__vw2__tx'>
                      轻量的数据驱动，实现类似TS的静态类型检查，便于多人开发
                    </Text>
                  </View>
                  <View className='homePage__card_3__vw1__vw__vw3 M-flex-item'>
                    <Text className='homePage__card_3__vw1__vw__vw3__tx'>
                      代码资产可视化管理
                    </Text>
                    <View className='homePage__card_3__vw1__vw__vw3__vw1' />
                    <View className='homePage__card_3__vw1__vw__vw3__vw2'>
                      <Text className='homePage__card_3__vw1__vw__vw3__vw2__tx'>
                        组件沉淀
                      </Text>
                    </View>
                    <View className='homePage__card_3__vw1__vw__vw3__vw3'>
                      <Text className='homePage__card_3__vw1__vw__vw3__vw3__tx'>
                        模块积累
                      </Text>
                    </View>
                  </View>
                </View>
                <View className='homePage__card_3__vw1__vw1 M-flex-item'>
                  <View className='homePage__card_3__vw1__vw1__vw M-flex-item'>
                    <Text className='homePage__card_3__vw1__vw1__vw__tx'>
                      无捆绑
                    </Text>
                    <View className='homePage__card_3__vw1__vw1__vw__vw1'>
                      <Text className='homePage__card_3__vw1__vw1__vw__vw1__tx'>
                        代码导出与Disscode没有任何关联，可自由部署，代码可读性较高
                      </Text>
                      <Text className='homePage__card_3__vw1__vw1__vw__vw1__tx1'>
                        通过API对接一切系统
                      </Text>
                    </View>
                  </View>
                  <View className='homePage__card_3__vw1__vw1__vw1 M-flex-item'>
                    <Text className='homePage__card_3__vw1__vw1__vw1__tx'>
                      无限制
                    </Text>
                    <View className='homePage__card_3__vw1__vw1__vw1__vw1'>
                      <Text className='homePage__card_3__vw1__vw1__vw1__vw1__tx'>
                        低代码实现不了的，可在导出的本地项目中，通过写代码替换disscode生成的代码，粒度可精细到某个div
                      </Text>
                    </View>
                    <View className='homePage__card_3__vw1__vw1__vw1__vw2'>
                      <Text className='homePage__card_3__vw1__vw1__vw1__vw2__tx'>
                        可以开发私有组件库、Utils库，通过NPM扩展引入到Disscode
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className='homePage__card_3__vw2'>
                <Image src={static_image} remote={false} fit={false} className='homePage__card_3__vw2__Image' />
              </View>
            </View>
          </View>
        </View>
        <Modal style={{}} animate='pop' renderView={props => <View className='homePage__vw'>
              <Video src='https://cdn.disscode.com/editor/media/disscodedemo.mp4' autoplay={true} controls={true} showFullscreenBtn={true} showCenterPlayBtn={true} className='homePage__vw__Video' />
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('modal-ad5c55ea')} />
      </Page>;
  }

}

export default HomePage$Page;