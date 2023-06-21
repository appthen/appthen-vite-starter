import ICONS from "./icons";
import React from 'react';
import { View, AtIcon, Text } from '@disscode/react';
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

class Sidebar$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  utils = Object.assign({
    getRoute: utils.createRoute('Sidebar')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];

  componentDidMount() {
    const route = this.utils.getRoute();
    this.setState({
      pageName: route?.name
    });
  }

  render() {
    const _this = this;

    return <React.Fragment>
        <View>
          <View className='Sidebar__vw'>
            <View className='Sidebar__vw__vw M-gb-click'>
              <View inlineStyle={[{
              enable: $eval(() => this.state.pageName === 'homePage'),
              name: '动态样式1',
              style: {
                backgroundColor: '#e1e5fd',
                borderRightWidth: px(3),
                borderRightColor: '#2409a9',
                borderRightStyle: 'solid'
              }
            }]} onClick={e => {
              this.utils.navigateTo('homePage');
            }} className='Sidebar__vw__vw__vw'>
                <View className='Sidebar__vw__vw__vw__vw'>
                  <AtIcon color='#5b72ff' size={20} svg={ICONS["svg_ri9w50"]} />
                </View>
                <View className='Sidebar__vw__vw__vw__vw1 M-flex-item'>
                  <Text className='Sidebar__vw__vw__vw__vw1__tx'>工作平台</Text>
                </View>
              </View>
              <View inlineStyle={[{
              enable: $eval(() => this.state.pageName === 'employeeManagement'),
              name: '动态样式1',
              style: {
                backgroundColor: '#e1e5fd',
                borderRightWidth: px(3),
                borderRightColor: '#2409a9',
                borderRightStyle: 'solid'
              }
            }]} onClick={e => {
              this.utils.navigateTo('employeeManagement');
            }} className='Sidebar__vw__vw__vw1'>
                <View className='Sidebar__vw__vw__vw1__vw'>
                  <AtIcon color='#5b72ff' size={20} svg={ICONS["svg_j8ukbi"]} />
                </View>
                <View className='Sidebar__vw__vw__vw1__vw1 M-flex-item'>
                  <Text className='Sidebar__vw__vw__vw1__vw1__tx'>
                    员工管理
                  </Text>
                </View>
              </View>
              <View inlineStyle={[{
              enable: $eval(() => this.state.pageName === 'aiConfiguration'),
              name: '动态样式1',
              style: {
                backgroundColor: '#e1e5fd',
                borderRightWidth: px(3),
                borderRightColor: '#2409a9',
                borderRightStyle: 'solid'
              }
            }]} onClick={e => {
              this.utils.navigateTo('aiConfiguration');
            }} className='Sidebar__vw__vw__vw2'>
                <View className='Sidebar__vw__vw__vw2__vw'>
                  <AtIcon color='#5b72ff' size={20} svg={ICONS["svg_js95so"]} />
                </View>
                <View className='Sidebar__vw__vw__vw2__vw1 M-flex-item'>
                  <Text className='Sidebar__vw__vw__vw2__vw1__tx'>
                    配置中心
                  </Text>
                </View>
              </View>
              <View inlineStyle={[{
              enable: false,
              name: '动态样式1',
              style: {
                backgroundColor: '#e1e5fd',
                borderRightWidth: px(3),
                borderRightColor: '#2409a9',
                borderRightStyle: 'solid'
              }
            }]} className='Sidebar__vw__vw__vw3'>
                <View className='Sidebar__vw__vw__vw3__vw'>
                  <AtIcon color='#5b72ff' size={20} svg={ICONS["svg_oz0tdr"]} />
                </View>
                <View className='Sidebar__vw__vw__vw3__vw1 M-flex-item'>
                  <Text className='Sidebar__vw__vw__vw3__vw1__tx'>
                    资源中心
                  </Text>
                </View>
              </View>
              <View inlineStyle={[{
              enable: false,
              name: '动态样式1',
              style: {
                backgroundColor: '#e1e5fd',
                borderRightWidth: px(3),
                borderRightColor: '#2409a9',
                borderRightStyle: 'solid'
              }
            }]} className='Sidebar__vw__vw__vw4'>
                <View className='Sidebar__vw__vw__vw4__vw'>
                  <AtIcon color='#5b72ff' size={20} svg={ICONS["svg_wzx6bo"]} />
                </View>
                <View className='Sidebar__vw__vw__vw4__vw1 M-flex-item'>
                  <Text className='Sidebar__vw__vw__vw4__vw1__tx'>
                    档案管理
                  </Text>
                </View>
              </View>
              <View inlineStyle={[{
              enable: false,
              name: '动态样式1',
              style: {
                backgroundColor: '#e1e5fd',
                borderRightWidth: px(3),
                borderRightColor: '#2409a9',
                borderRightStyle: 'solid'
              }
            }]} className='Sidebar__vw__vw__vw5'>
                <View className='Sidebar__vw__vw__vw5__vw'>
                  <AtIcon color='#5b72ff' size={20} svg={ICONS["svg_4htdds"]} />
                </View>
                <View className='Sidebar__vw__vw__vw5__vw1 M-flex-item'>
                  <Text className='Sidebar__vw__vw__vw5__vw1__tx'>
                    方案管理
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>;
  }

}

export default Sidebar$Page;