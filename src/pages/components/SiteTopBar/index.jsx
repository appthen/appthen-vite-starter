import static_image from "./images/image.png";
import React from 'react';
import { View, Image, Text } from '@disscode/react';
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

class SiteTopBar$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  utils = Object.assign({
    getRoute: utils.createRoute('SiteTopBar')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];

  componentDidMount() {}

  render() {
    const _this = this;

    return <React.Fragment>
        <View className='SiteTopBar__vw'>
          <View className='SiteTopBar__vw__vw'>
            <View className='SiteTopBar__vw__vw__vw'>
              <Image src={static_image} remote={false} fit={false} className='SiteTopBar__vw__vw__vw__Image' />
            </View>
            <View className='SiteTopBar__vw__vw__vw1 M-flex-item' />
            <View className='SiteTopBar__vw__vw__vw2'>
              <View className='SiteTopBar__vw__vw__vw2__vw'>
                <Text className='SiteTopBar__vw__vw__vw2__vw__tx'>登陆</Text>
              </View>
            </View>
            <View className='SiteTopBar__vw__vw__vw3'>
              <View className='SiteTopBar__vw__vw__vw3__vw'>
                <Text className='SiteTopBar__vw__vw__vw3__vw__tx'>
                  免费使用
                </Text>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>;
  }

}

export default SiteTopBar$Page;