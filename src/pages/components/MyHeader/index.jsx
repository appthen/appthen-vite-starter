import ICONS from "./icons";
import React from 'react';
import { View, AtIcon, Text } from '@disscode/react';
import { Badge } from '@alilc/antd-lowcode-materials';
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

class MyHeader$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  utils = Object.assign({
    getRoute: utils.createRoute('MyHeader')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];

  componentDidMount() {}

  render() {
    const _this = this;

    return <React.Fragment>
        <View className='MyHeader__vw'>
          <View className='MyHeader__vw__vw'>
            <AtIcon color='#fffdfd' size={30} svg={ICONS["svg_9i8aw8"]} />
          </View>
          <View className='MyHeader__vw__vw1 M-flex-item'>
            <Text className='MyHeader__vw__vw1__tx'>管理后台</Text>
          </View>
          <View className='MyHeader__vw__vw2'>
            <Badge count={25} color='' dot={false} overflowCount={0} showZero={false} status='success' title='' text='' offset={[]} className='MyHeader__vw__vw2__Badge' />
            <AtIcon color='#d6d6d6' size={27} svg={ICONS["svg_j1b0md"]} />
          </View>
          <View className='MyHeader__vw__vw3' />
        </View>
      </React.Fragment>;
  }

}

export default MyHeader$Page;