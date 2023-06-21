import ICONS from "./icons";
import React from 'react';
import { View, Text, ScrollView, ImageBackground, AtIcon, AtActivityIndicator } from '@disscode/react';
import { Row, Col } from '@alilc/antd-lowcode-materials';
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

class ApplicationList$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      tab: 0,
      apps: [{
        _id: 'xxxx',
        alias: 'ai_qrcode',
        name: 'ArtQR 智绘二维码',
        desc: '可轻松把您的二维码变得创意十足，超级吸睛！'
      }]
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('ApplicationList')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

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

  async async_componentDidMount() {// const cloud = await this.utils.getLaf();
    // const db = cloud.database();
    // const res = await db.collection("apps").get();
    // this.setState({
    //   apps: res.data
    // })
  }

  componentDidMount() {
    this.async_componentDidMount();
  }

  render() {
    const _this = this;

    return <React.Fragment>
        <View className='ApplicationList__application_list__vw M-flex-item'>
          <View className='ApplicationList__application_list__vw__vw'>
            <View ref={this._refsManager.linkRef('view-4572ad61')} className='ApplicationList__application_list__vw__vw__vw M-flex-item'>
              <Text className='ApplicationList__application_list__vw__vw__vw__tx'>
                应用商店
              </Text>
            </View>
            <View ref={this._refsManager.linkRef('view-920742fa')} className='ApplicationList__application_list__vw__vw__vw1 M-flex-item' />
          </View>
          <ScrollView ref={this._refsManager.linkRef('scrollview')} className='ApplicationList__application_list__vw__sv1 M-flex-item'>
            <View className='ApplicationList__application_list__vw__sv1__vw' />
            <View ref={this._refsManager.linkRef('view-ee2507cc')}>
              <View className='ApplicationList__vw'>
                <ScrollView ref={this._refsManager.linkRef('scrollview1')}>
                  <View ref={this._refsManager.linkRef('view-635ba75c')} className='ApplicationList__vw_1'>
                    {$evalArray(() => ['全部', 'AI', '学习', '工具']).map((item, index) => (_this => <View onClick={e => {
                    _this.setStateValue(index, {
                      field: 'tab'
                    });
                  }} ref={this._refsManager.linkRef('view-b135e381')} inlineStyle={[{
                    enable: $eval(() => _this.state.tab === index),
                    name: '动态样式1',
                    style: {
                      backgroundColor: '#1004fe'
                    }
                  }]} className='ApplicationList__vw_1__vw'>
                            <Text ref={this._refsManager.linkRef('text-cc24e73b')} inlineStyle={[{
                      enable: $eval(() => _this.state.tab !== index),
                      name: '动态样式1',
                      style: {
                        color: '#9391fe'
                      }
                    }]} className='ApplicationList__vw_1__vw__tx'>
                              {$eval(() => item)}
                            </Text>
                          </View>)($createChildContext(_this, {
                    item,
                    index
                  })))}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View className='ApplicationList__application_list__vw__sv1__vw2'>
              <View className='ApplicationList__application_list__vw__sv1__vw2__vw'>
                <Row align='top' h-gutter={15} v-gutter={15} justify='start' wrap={true} gutter={[15, 15]}>
                  {$evalArray(() => this.state.apps).map((item, index) => (_this => <Col span={12} order={0} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} ref={this._refsManager.linkRef('col-7c1d7627')}>
                        <View ref={this._refsManager.linkRef('view-12fc590b')} onClick={e => {
                    _this.props?.onChangeApp?.({
                      alias: 'qrcode'
                    });
                  }} className='ApplicationList__vw_2 M-gb-click'>
                          <View className='ApplicationList__vw_2__vw'>
                            <View ref={this._refsManager.linkRef('view-b3a9b849')} className='ApplicationList__vw_2__vw__vw M-flex-item'>
                              <View className='ApplicationList__vw_2__vw__vw__vw'>
                                <ImageBackground src='https://file.mengti.cc/FpNeCSgcSyFfVj8PeqQiCjZJYpKf' className='ApplicationList__vw_2__vw__vw__vw__ibg' />
                              </View>
                              <View className='ApplicationList__vw_2__vw__vw__vw1 M-flex-item'>
                                <View ref={this._refsManager.linkRef('view-b3a9b849')} className='ApplicationList__vw_2__vw__vw__vw1__vw M-flex-item'>
                                  <Text ref={this._refsManager.linkRef('text-33e674a6')} className='ApplicationList__vw_2__vw__vw__vw1__vw__tx'>
                                    {$eval(() => item?.name)}
                                  </Text>
                                </View>
                                <View className='ApplicationList__vw_2__vw__vw__vw1__vw1 M-flex-item'>
                                  <Text numberOfLines={4} ref={this._refsManager.linkRef('text-329ba662')} className='ApplicationList__vw_2__vw__vw__vw1__vw1__tx'>
                                    {$eval(() => item?.desc)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View className='ApplicationList__vw_2__vw1' />
                          <View ref={this._refsManager.linkRef('view-475fd6cb')} className='ApplicationList__vw_2__vw2'>
                            <View className='ApplicationList__vw_2__vw2__vw M-flex-item' />
                            <View className='ApplicationList__vw_2__vw2__vw1' />
                            <View className='ApplicationList__vw_2__vw2__vw2'>
                              <AtIcon color='#333333' size={17} svg={ICONS["svg_h6s8tp"]} />
                            </View>
                          </View>
                        </View>
                      </Col>)($createChildContext(_this, {
                  item,
                  index
                })))}
                </Row>
                <View ref={this._refsManager.linkRef('view-8d7af1d4')}>
                  {!!$eval(() => this.state.apps.length === 0) && <View ref={this._refsManager.linkRef('view-405d3038')} className='ApplicationList__vw_3'>
                      <AtActivityIndicator size={28} color='#6190E8' isOpened={true} className='ApplicationList__vw_3__AtActivityIndicator' />
                    </View>}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </React.Fragment>;
  }

}

export default ApplicationList$Page;