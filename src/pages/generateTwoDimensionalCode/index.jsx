import React from 'react';
import { Page, View } from '@disscode/react';
import { PageHeader } from '@alilc/antd-lowcode-materials';
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

class GenerateTwoDimensionalCode$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  utils = Object.assign({
    getRoute: utils.createRoute('generateTwoDimensionalCode')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  draw() {
    console.log('window.QRCode', window.QRCode);
    const qr = window.QRCode;
    const text = 'https://manufosela.es';
    qr.addData(text);
    qr.make();
    qrcodeHTML = qr.createImgTag();
    document.querySelector('.qrcode')[0].innerHTML = qrcodeHTML; // var qrcode = new window.QRCode(document.getElementsByClassName('qrcode')[0], {
    //   text: "http://jindo.dev.naver.com/collie",
    //   width: 160,
    //   height: 160,
    //   colorDark: "#000000",
    //   colorLight: "#ffffff",
    //   correctLevel: QRCode.CorrectLevel.H
    // });
  }

  componentDidMount() {}

  render() {
    const _this = this;

    return <Page>
        <PageHeader title='Title' subTitle='This is a subtitle' ghost={false} />
        <View className='generateTwoDimensionalCode__vw1'>
          <View className='generateTwoDimensionalCode__vw1__vw qrcode' ref={this._refsManager.linkRef('view-33b4e383')} onClick={function () {
          return this.draw.apply(this, Array.prototype.slice.call(arguments).concat([]));
        }.bind(this)} />
        </View>
      </Page>;
  }

}

export default GenerateTwoDimensionalCode$Page;