import ICONS from "./icons";
import React from 'react';
import { View, Text, AtIcon, AutoList, Image } from '@disscode/react';
import { Spin } from '@alilc/antd-lowcode-materials';
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

class OpenAMembership$Page extends React.Component {
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
      temps: [],
      submitBuy: {
        code: 0,
        msg: 'success',
        data: {
          orderId: '64a11ed6400c00f69734d35c',
          orderStatus: 0,
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAklEQVR4AewaftIAAA7kSURBVO3BwZEcSA4EsCRD/ructx6oHq3o4wyA6X8CAJy2AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvD/5oWYm/F3bfNrM5FXbvJqZvGibVzOTT2ubVzOTT2ubK2YmL9rm1czk09rmipkJf9c2P80GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4709+ubb5iWYmnzYzedE2r2Ymr9rmxczkVdvwdzOTV23zqm34jrb5iWYmv9UGADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnPcnPJuZfFPb/DRt82pm8qJt/oWZyYu2edU2nzYzuWJm8qJtfqKZyYu2+aaZyTe1DX+3AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOf9CXzRzOTTZiY/0czkRdt82szkm2Ym3zQz+RfaBj5lAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnPcn8MO0zTfNTF61zau2eTEzuaJtvmlm8mlt82pm8qJt4G82AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4Lw/4Vnb8Hczk1dt82pm8mJm8k1t801t89PMTP6Ftvmmtrmgbfj/twEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADn/ckvNzPhs9rm1czkVdu8mJm8aptXM5NPm5m8apsXM5NXbfNiZvKqbV7NTF60zauZyafNTF61zauZyYu2+bSZCT/LBgA4bwMAnLcBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOO9Pfqi24bPa5sXM5FXb/GZt85u1zYuZyau2+aaZyau2+bS24XfaAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPOm/wlPZiav2ubTZia/Wdu8mJn8C23zYmbyqm0+bWbyaW3zambyqm0+bWbyTW3zambyaW3zYmbyE7XNb7UBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO+5Mfambyom1etc2rmck3tc2nzUxetM2rmcmrmQl/1zavZiaf1javZiYv2uZV27yamVzQNp/WNv/CzORF27yambyambxom59mAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM77E57NTK6Ymbxom1dt82Jm8qptXs1MXrTNvzAz+bSZyau2+Wna5sXM5F9omwtmJq/a5sXM5FXbfNrM5FXbvJqZ/FYbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN70P/nFZiav2ubVzOSb2ubFzORV23zTzORF27yambxqmxczkyva5sXM5F9om0+bmbxqmxczk29qm2+amXxa27yambxqm99qAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnPcn/Egzk0+bmXxa21wxM3nRNv/CzOTTZibfNDP5tLb5prb5ppnJi7Z51TafNjN51TavZiYv2uan2QAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDz/uSXa5tvaptvmpm8apsLZia8aZsXM5NXbfNpM5NXM5NXbfOibV7NTF61zbfMTF61zauZyYu2eTUz4e82AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4Lzpf8LXzExetc2rmcm3tM2rmcmntc2rmcmrtnkxM/kX2uZbZiav2ubVzOQ3axs+a2byom1+mg0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDe9D/hhJnJq7Z5MTN51TYvZiav2ubVzOTT2uabZibf1DYXzExetc0VM5Pfqm34rA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4709+qJnJp7XNq5nJi7b5F2YmL9rm1czkRdu8mpl8Wtu8mpm8aptPa5tvmpm8aJtXM5NXbfObtc2nzUw+rW1ezUw+bWbyqm1+qw0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4709+ubZ5NTN51Taf1jYXzEz+hbb5ppkJ39E2r2Ymr9rm02Ymn9Y2n9Y2/0LbfNPM5EXb/DQbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvD/hWdt808zk09rm09rmX5iZfFrbfNPM5NPa5tXM5MXM5Iq2eTUz+aa2eTEz+aaZyTe1zauZyW+1AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOf9Cc9mJq/a5tPa5oKZCZ/XNp/WNp82M7mibV7MTF61zae1zU/TNq9mJq/a5rfaAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA503/k19sZvKqbV7NTH6atnkxM3nVNq9mJp/WNq9mJt/UNi9mJj9N27yambxqm59mZvKibf6FmcmLtvkXZiYv2uan2QAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzpv8JJ8xMXrXNi5nJq7Z5MTN51TavZiYv2uZfmJl8Wtv8NDOTV23zYmbyE7XNi5nJN7UN//82AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4Lw/+aFmJi/a5l+Ymbxom39hZvJpM5MXbfNNM5NXbfPTzEw+rW1etc03tc03zUxezUxetM03zUw+rW3+hZnJi7b5aTYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5f/JDtc2Lmcm/0Daf1jafNjO5om0uaJtXM5NXbfOibV7NTH6zmcmLtrliZvKiba6YmfB3GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDen/xQM5MXbfNqZnLFzORF27yamfxmbfNiZvJNM5NXbfNpM5NPa5tXM5NvaptvaptPa5tXM5NPa5tXM5PfagMAnLcBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDOm/4nv9jM5Iq2+bSZyau2+bSZyRVt82Jm8k1t85vNTD6tbX6amcmrtvm0mck3tc1PswEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM77kx9qZvJpbfNqZvKibV7NTD6tbT5tZvKqbV7NTF60zauZyae1zRUzk09rmyva5tNmJq/a5sXM5FXbfNPM5NPa5tXM5LfaAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPOm/wlPZibf1DbfNDP5prb5ppnJi7Z5NTN51TYvZia8aZsXM5NXbfNpM5NXbfNpM5NPa5tXM5NXbfNbbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5f/JDzUw+rW1ezUy+aWbyaW3zYmbyqm0+bWbyqm1etc2Lmck3tc2nzUz+hba5oG1ezUy+aWbyTW3Dd2wAgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzpv8JPJiZfFrbvJqZvGibn2hm8qJtfpqZyau2+bSZyTe1zTfNTD6tbV7NTD6tbX6aDQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADjvT36omQl/1zaf1javZiav2ubFzORV23zTzOSbZiaf1jbfNDP5prZ5NTP5tJnJi7b5F9rmxczkVdu8mpn8VhsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHkbAOC8P/nl2uYnmpl8y8zkm9rm1czkVdv8NG3zYmbyamZyRdu8mJlc0TbfNDN50TavZib83QYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCc9yc8m5l8U9t8U9t82szk1czk09rm1czk09rm02Ymr9rm09rm02Ymr9rm09rm1czk02Ymv1nbvJqZ/FYbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN6fwIfNTF61zauZyafNTK6Ymbxom09rm39hZvKibb5pZvKqbV7NTD6tbV7MTP6FtuE7NgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHl/Ao9mJi/a5tXM5Jva5tXM5Jva5qdpmxczk1dt82pm8mkzE/5uZsJnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB50//kB5qZvGibn2hm8qJtrpiZfFPb/DQzk09rm59mZvKqbV7NTF60zRUzkxdtw2dtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHl/8svNTPismcm/0DYvZibfNDN51TafNjP5tLb5ppnJq7b5aWYmr9rmm9rmm2YmL9rmp9kAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnTf8TAOC0DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO2wAA520AgPM2AMB5GwDgvA0AcN4GADhvAwCctwEAztsAAOdtAIDzNgDAeRsA4LwNAHDeBgA4bwMAnLcBAM7bAADnbQCA8zYAwHkbAOC8DQBw3gYAOG8DAJy3AQDO+x9rlNL4/s06/AAAAABJRU5ErkJggg=='
        }
      },
      status: 'waitpay',
      loading: true,
      pay_type: 'wepay',
      queryPayStatus: {},
      tab: 'buy',
      buy_list: [],
      deducting_record: []
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('OpenAMembership')
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
        id: 'temps',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_recharge-templates',
            contentType: 'JSON',
            method: 'POST',
            params: {
              type: 'querySystemRechargeTemplate',
              param: {
                tenantId: '9999',
                sort: 'recharge_points,desc'
              },
              tenantId: '9999'
            },
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data?.content?.sort((a, b) => a.recharge_points - b.recharge_points);
        }
      }, {
        id: 'submitBuy',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_orders',
            contentType: 'JSON',
            method: 'POST',
            params: {
              type: 'createRechargeOrder',
              param: {
                rechargeTemplateId: _this.state.btid,
                payInfo: [{
                  payMethod: _this.state.isInWeixin ? 11 : 10,
                  payAmount: _this.state.temps?.find(_ => _._id === _this.state.btid)?.sales_price
                }],
                openId: _this.state.openid
              }
            },
            headers: {},
            timeout: 15000
          };
        }
      }, {
        id: 'queryPayStatus',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_orders',
            contentType: 'JSON',
            method: 'POST',
            params: {
              type: 'queryOrderPayStatus',
              param: {
                orderId: _this.state.submitBuy?.data?.orderId
              }
            },
            headers: {},
            timeout: 15000
          };
        }
      }, {
        id: 'buy_list',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_recharge_record',
            contentType: 'JSON',
            method: 'POST',
            params: {
              type: 'querySystemRechargeRecord',
              param: {
                tenantId: '9999'
              }
            },
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data?.content || [];
        }
      }, {
        id: 'deducting_record',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_web-controllers',
            contentType: 'JSON',
            method: 'POST',
            params: {
              mode: 'deductingRecords',
              param: {
                page: 1,
                pageSize: 10
              }
            },
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data?.content || [];
        }
      }]
    };
  }

  componentWillUnmount() {
    this.cancelPayment();

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  async confirmPayment(event) {
    if (this.state.loading) return;
    this.setState({
      loading: true
    }, async () => {
      try {
        const submitBuy = await this.dataSourceMap['submitBuy']?.load();

        if (this.state.submitBuy?.code === 0) {
          if (this.state.isInWeixin) {
            const weixin = window.wx;
            const {
              appId,
              timeStamp,
              nonceStr,
              signType,
              paySign
            } = submitBuy.data?.jsapi || {};
            weixin.config({
              // debug: true,
              appId: this.constants.mpAppId,
              timestamp: timeStamp,
              nonceStr,
              signature: paySign,
              jsApiList: ['chooseWXPay']
            });
            weixin.ready(() => {
              weixin.chooseWXPay({
                timestamp: timeStamp,
                nonceStr,
                package: submitBuy.data?.jsapi?.package,
                signType,
                paySign,
                success: res => {
                  console.log('支付成功', res);
                  setTimeout(() => {
                    this.checkPaymentResults();
                  }, 1500);
                },
                fail: res => {
                  console.log('支付失败', res);
                }
              });
            });
          } else {
            this.setState({
              status: 'paying',
              loading: false
            });
            setTimeout(() => {
              this.checkPaymentResults();
            }, 4000);
          }
        } else {
          this.utils.message.error(submitBuy?.msg || '请求失败 稍后重试');
          this.setState({
            loading: false
          });
        }
      } catch (e) {
        console.log('e: ', e);
        this.utils.message.error('请求失败 稍后重试');
        this.setState({
          loading: false
        });
      }
    });
  }

  selectPackage(e, {
    item,
    index
  }) {
    if (this.state.status !== 'waitpay') return;
    this.setState({
      btid: item?._id,
      fee: item?.amount
    });
  }

  cancelPayment(e) {
    this.setState({
      status: 'waitpay'
    });
    if (this.timer) clearTimeout(this.timer);
  }

  async checkPaymentResults() {
    const queryPayStatus = await this.dataSourceMap['queryPayStatus']?.load();
    console.log('queryPayStatus: ', queryPayStatus);

    if (queryPayStatus.code === 0 && queryPayStatus.data?.orderStatus === 1) {
      this.utils.message.success('支付成功');
      this.setState({
        status: 'waitpay',
        loading: false,
        tab: 'list'
      });
      this.props?.onCharge?.();
      this.utils.event.$emit('REFRESH_USER_INFO');
      if (this.timer) clearTimeout(this.timer);
    } else {
      this.timer = setTimeout(() => {
        if (this.state.status === 'paying') {
          this.checkPaymentResults();
        }
      }, 3000);
    }
  }

  switchTab(e, {
    tab
  }) {
    this.setState({
      tab
    });
    this.cancelPayment();
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.dataSourceMap['temps']?.load().then(temps => {
      if (temps?.[0]) {
        this.setState({
          loading: false,
          btid: temps[0]?._id,
          fee: temps[0]?.amount,
          isInWeixin: this.utils.isWeChatBrowser(),
          openid: window.localStorage.getItem('MP_OPID')
        });
      }
    });
  }

  render() {
    const _this = this;

    return <React.Fragment>
        <View ref={this._refsManager.linkRef('view-41e7b381')} inlineStyle={[{
        enable: $eval(() => this.props?.isMobile),
        name: 'mobile',
        style: {
          borderBottomLeftRadius: px(0),
          borderBottomRightRadius: px(0)
        }
      }]} className='OpenAMembership__vw'>
          <View ref={this._refsManager.linkRef('view-7f7ddd27')} className='OpenAMembership__vw__vw'>
            <View ref={this._refsManager.linkRef('view-bdc4899f')} className='OpenAMembership__vw__vw__vw M-flex-item'>
              <View onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'buy'
              }]));
            }.bind(this)} className='OpenAMembership__vw__vw__vw__vw'>
                <Text ref={this._refsManager.linkRef('text-b0e7fc50')} inlineStyle={[{
                enable: $eval(() => this.state.tab !== 'buy'),
                name: '动态样式1',
                style: {
                  fontWeight: 400
                }
              }, {
                enable: $eval(() => this.props?.isMobile),
                name: 'mobile',
                style: {
                  fontSize: px(16)
                }
              }]} className='OpenAMembership__vw__vw__vw__vw__tx'>
                  账户充值
                </Text>
                <View inlineStyle={[{
                enable: $eval(() => this.state.tab === 'buy'),
                name: '动态样式1',
                style: {
                  backgroundColor: 'rgba(255,255,255,0.76)'
                }
              }]} className='OpenAMembership__vw__vw__vw__vw__vw1' />
              </View>
              <View onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'list'
              }]));
            }.bind(this)} ref={this._refsManager.linkRef('view-5ba13571')} className='OpenAMembership__vw__vw__vw__vw1'>
                <Text ref={this._refsManager.linkRef('text-b0e7fc50')} inlineStyle={[{
                enable: $eval(() => this.state.tab !== 'list'),
                name: '动态样式1',
                style: {
                  fontWeight: 400
                }
              }, {
                enable: $eval(() => this.props?.isMobile),
                name: 'mobile',
                style: {
                  fontSize: px(16)
                }
              }]} className='OpenAMembership__vw__vw__vw__vw1__tx'>
                  充值记录
                </Text>
                <View inlineStyle={[{
                enable: $eval(() => this.state.tab === 'list'),
                name: '动态样式1',
                style: {
                  backgroundColor: 'rgba(255,255,255,0.76)'
                }
              }]} className='OpenAMembership__vw__vw__vw__vw1__vw1' />
              </View>
              <View onClick={function () {
              return this.switchTab.apply(this, Array.prototype.slice.call(arguments).concat([{
                tab: 'use-list'
              }]));
            }.bind(this)} ref={this._refsManager.linkRef('view-5ba13571')} className='OpenAMembership__vw__vw__vw__vw2'>
                <Text ref={this._refsManager.linkRef('text-b0e7fc50')} inlineStyle={[{
                enable: $eval(() => this.state.tab !== 'use-list'),
                name: '动态样式1',
                style: {
                  fontWeight: 400
                }
              }, {
                enable: $eval(() => this.props?.isMobile),
                name: 'mobile',
                style: {
                  fontSize: px(16)
                }
              }]} className='OpenAMembership__vw__vw__vw__vw2__tx'>
                  扣费记录
                </Text>
                <View inlineStyle={[{
                enable: $eval(() => this.state.tab === 'use-list'),
                name: '动态样式1',
                style: {
                  backgroundColor: 'rgba(255,255,255,0.76)'
                }
              }]} className='OpenAMembership__vw__vw__vw__vw2__vw1' />
              </View>
            </View>
            <View onClick={e => {
            this.props?.onClose?.();
          }} className='OpenAMembership__vw__vw__vw1'>
              <AtIcon color='#ffffff' size={30} svg={ICONS["svg_ssl3xc"]} />
            </View>
          </View>
          {!!$eval(() => this.state.tab === 'list') && <View ref={this._refsManager.linkRef('view-fb2a99f6')} className='OpenAMembership__list'>
              <AutoList dataSource={(page, pageSize) => {
            return this.dataSourceMap['buy_list'].load({
              page,
              pageSize
            });
          }} autoFetch={true} mode='scroll' pageMode='auto' emptyText='' footerMarginTop={0} pageSize={10} renderItem={
          /* 插槽容器*/
          (item, index, currentPage) => <View>
                      <View ref={this._refsManager.linkRef('view-b8b5a849')} className='OpenAMembership__vw_1'>
                        {!!$eval(() => _this.state.loading) && <View ref={this._refsManager.linkRef('view-28a69698')} className='OpenAMembership__loading'>
                            <Spin size='large' tip='' delay={0} indicator='' spinning={true} wrapperClassName='' ref={this._refsManager.linkRef('spin-90e8103e')} />
                          </View>}
                        {!!$eval(() => _this.state.temps?.length > 0) && <View ref={this._refsManager.linkRef('view-86db9bc4')} className='OpenAMembership__vw_1__vw1' />}
                        <View ref={this._refsManager.linkRef('view-5e0bd4d8')} onClick={function () {
                return this.selectPackage.apply(this, Array.prototype.slice.call(arguments).concat([{
                  item: item,
                  index: index
                }]));
              }.bind(_this)} className='OpenAMembership__vw_1__vw2'>
                          <View className='OpenAMembership__vw_1__vw2__vw'>
                            <Text className='OpenAMembership__vw_1__vw2__vw__tx'>
                              充值点数:
                            </Text>
                            <Text className='OpenAMembership__vw_1__vw2__vw__tx1'>
                              {$eval(() => `${item?.recharge_points}`)}
                            </Text>
                            <Text className='OpenAMembership__vw_1__vw2__vw__tx2'>
                              赠送:
                            </Text>
                            <Text className='OpenAMembership__vw_1__vw2__vw__tx3'>
                              {$eval(() => `${item?.rechargeTemplate?.gift_points || 0}`)}
                            </Text>
                            <View className='OpenAMembership__vw_1__vw2__vw__vw4 M-flex-item'>
                              <Text className='OpenAMembership__vw_1__vw2__vw__vw4__tx'>
                                支付:
                              </Text>
                              <Text className='OpenAMembership__vw_1__vw2__vw__vw4__tx1'>
                                {$eval(() => `￥${((item?.rechargeTemplate?.sales_price || 0) / 100).toFixed(2) * 1}`)}
                              </Text>
                            </View>
                          </View>
                          <View className='OpenAMembership__vw_1__vw2__vw1'>
                            <Text className='OpenAMembership__vw_1__vw2__vw1__tx'>
                              {$eval(() => _this.utils.moment(item?.update_time)?.format('YYYY-MM-DD HH:mm'))}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist')} />
            </View>}
          {!!$eval(() => this.state.tab === 'use-list') && <View ref={this._refsManager.linkRef('view-fb2a99f6')} className='OpenAMembership__use-list'>
              <AutoList dataSource={(page, pageSize) => {
            // return new Promise((resolve) => {
            //   resolve([
            //     {
            //       "_id": "64a6e4cd2676303470333cc1",
            //       "userId": "64a5caabf0afa719291d1334",
            //       "appId": "6491b5ab4ed59e03b60ed274",
            //       "count": 10,
            //       "features": [
            //         "text2img"
            //       ],
            //       "tenantId": "9999",
            //       "createTime": 1688659149,
            //       "updateTime": 0
            //     }
            //   ])
            // })
            return this.dataSourceMap['deducting_record'].load({
              param: {
                page,
                pageSize
              }
            });
          }} autoFetch={true} mode='scroll' pageMode='auto' emptyText='' footerMarginTop={0} pageSize={10} renderItem={
          /* 插槽容器*/
          (item, index, currentPage) => <View>
                      <View ref={this._refsManager.linkRef('view-b8b5a849')} className='OpenAMembership__vw_2'>
                        {!!$eval(() => _this.state.loading) && <View ref={this._refsManager.linkRef('view-28a69698')} className='OpenAMembership__loading_3'>
                            <Spin size='large' tip='' delay={0} indicator='' spinning={true} wrapperClassName='' ref={this._refsManager.linkRef('spin-90e8103e')} />
                          </View>}
                        {!!$eval(() => _this.state.temps?.length > 0) && <View ref={this._refsManager.linkRef('view-86db9bc4')} className='OpenAMembership__vw_2__vw1' />}
                        <View ref={this._refsManager.linkRef('view-5e0bd4d8')} onClick={function () {
                return this.selectPackage.apply(this, Array.prototype.slice.call(arguments).concat([{
                  item: item,
                  index: index
                }]));
              }.bind(_this)} className='OpenAMembership__vw_2__vw2'>
                          <View className='OpenAMembership__vw_2__vw2__vw'>
                            <Text className='OpenAMembership__vw_2__vw2__vw__tx'>
                              消费点数:
                            </Text>
                            <Text className='OpenAMembership__vw_2__vw2__vw__tx1'>
                              {$eval(() => `${item?.count}`)}
                            </Text>
                          </View>
                          <View className='OpenAMembership__vw_2__vw2__vw1'>
                            <Text className='OpenAMembership__vw_2__vw2__vw1__tx'>
                              {$eval(() => _this.utils.moment(item?.createTime * 1000)?.format('YYYY-MM-DD HH:mm'))}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist')} />
            </View>}
          {!!$eval(() => this.state.tab === 'buy') && <View ref={this._refsManager.linkRef('view-6885443e')}>
              <View ref={this._refsManager.linkRef('view-b8b5a849')} inlineStyle={[{
            enable: $eval(() => this.props?.isMobile),
            name: '动态样式1',
            style: {
              paddingLeft: px(20)
            }
          }]} className='OpenAMembership__vw_4'>
                {!!$eval(() => this.state.loading) && <View ref={this._refsManager.linkRef('view-28a69698')} className='OpenAMembership__loading_5'>
                    <Spin size='large' tip='' delay={0} indicator='' spinning={true} wrapperClassName='' ref={this._refsManager.linkRef('spin-90e8103e')} />
                  </View>}
                {!!$eval(() => this.state.temps?.length > 0) && <View ref={this._refsManager.linkRef('view-86db9bc4')} className='OpenAMembership__vw_4__vw1'>
                    {$evalArray(() => this.state.temps).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-5e0bd4d8')} inlineStyle={[{
                enable: $eval(() => _this.state.btid === item?._id),
                name: '选中状态',
                style: {
                  backgroundColor: '#f4d8a8'
                }
              }]} onClick={function () {
                return this.selectPackage.apply(this, Array.prototype.slice.call(arguments).concat([{
                  item: item,
                  index: index
                }]));
              }.bind(_this)} className='OpenAMembership__vw_4__vw1__vw'>
                          <View className='OpenAMembership__vw_4__vw1__vw__vw'>
                            <Text inlineStyle={[{
                    enable: $eval(() => _this.state.btid === item?._id),
                    name: '动态样式1',
                    style: {
                      color: '#d0021b'
                    }
                  }]} className='OpenAMembership__vw_4__vw1__vw__vw__tx'>
                              {$eval(() => `￥${(item?.sales_price / 100).toFixed(2) * 1}`)}
                            </Text>
                            <Text inlineStyle={[{
                    enable: $eval(() => _this.state.btid === item?._id),
                    name: '动态样式1',
                    style: {
                      color: '#d0021b'
                    }
                  }]} className='OpenAMembership__vw_4__vw1__vw__vw__tx1'>
                              {$eval(() => `+${item?.recharge_points}点`)}
                            </Text>
                          </View>
                          {!!$eval(() => item?.gift_points > 0) && <View ref={this._refsManager.linkRef('view-51e6fc8e')} className='OpenAMembership__vw_4__vw1__vw__vw1'>
                              <Text className='OpenAMembership__vw_4__vw1__vw__vw1__tx'>
                                {$eval(() => `赠送 ${item?.gift_points}点`)}
                              </Text>
                            </View>}
                        </View>)($createChildContext(_this, {
                item,
                index
              })))}
                  </View>}
              </View>
              {!!$eval(() => !!this.state.submitBuy?.data?.image && this.state.status === 'paying') && <View ref={this._refsManager.linkRef('view-cae12cc1')} className='OpenAMembership__vw1'>
                  <View ref={this._refsManager.linkRef('view-88298ec0')} className='OpenAMembership__vw1__vw'>
                    <Image src={$eval(() => this.state.submitBuy?.data?.image)} remote={false} fit={false} className='OpenAMembership__vw1__vw__Image' />
                    <View className='OpenAMembership__vw1__vw__vw1'>
                      <View ref={this._refsManager.linkRef('view-78aae562')} className='OpenAMembership__vw1__vw__vw1__vw'>
                        <Text ref={this._refsManager.linkRef('text-3b474b1f')} className='OpenAMembership__vw1__vw__vw1__vw__tx'>
                          请扫描二维码完成支付
                        </Text>
                      </View>
                      <View ref={this._refsManager.linkRef('view-78aae562')} onClick={function () {
                  return this.cancelPayment.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)} className='OpenAMembership__vw1__vw__vw1__vw1'>
                        <Text ref={this._refsManager.linkRef('text-3b474b1f')} className='OpenAMembership__vw1__vw__vw1__vw1__tx'>
                          取消
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>}
              {!!$eval(() => this.state.status === 'waitpay') && <View ref={this._refsManager.linkRef('view-ccff88af')} className='OpenAMembership__vw2'>
                  <View ref={this._refsManager.linkRef('view-78aae562')} inlineStyle={[{
              enable: $eval(() => this.props?.isMobile),
              name: 'mobile',
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }
            }]} className='OpenAMembership__vw2__vw'>
                    <Text className='OpenAMembership__vw2__vw__tx'>
                      支付方式
                    </Text>
                    <View ref={this._refsManager.linkRef('view-deada35c')} className='OpenAMembership__vw2__vw__vw1 M-gb-click' inlineStyle={[{
                enable: $eval(() => this.props?.isMobile),
                name: 'mobile',
                style: {
                  marginLeft: px(5),
                  marginTop: px(15),
                  width: '92%'
                }
              }]}>
                      <View style={{}}>
                        <AtIcon color='#6cc901' size={23} svg={ICONS["svg_c9zskl"]} />
                      </View>
                      <View className='OpenAMembership__vw2__vw__vw1__vw1 M-flex-item'>
                        <Text className='OpenAMembership__vw2__vw__vw1__vw1__tx'>
                          微信支付
                        </Text>
                      </View>
                      <View inlineStyle={[{
                  enable: $eval(() => this.state.pay_type === 'wepay'),
                  name: '动态样式1',
                  style: {
                    backgroundColor: '#3060fd'
                  }
                }]} ref={this._refsManager.linkRef('view-c4bc351b')} className='OpenAMembership__vw2__vw__vw1__vw2'>
                        {!!$eval(() => this.state.pay_type === 'wepay') && <AtIcon color='#ffffff' size={12} svg={ICONS["svg_mxn88a"]} ref={this._refsManager.linkRef('aticon-2a0ef42f')} />}
                      </View>
                    </View>
                    {!!$eval(() => !this.state.isInWeixin) && <View ref={this._refsManager.linkRef('view-deada35c')} className='OpenAMembership__vw2__vw__vw2 M-gb-click' inlineStyle={[{
                enable: $eval(() => this.props?.isMobile),
                name: 'mobile',
                style: {
                  marginLeft: px(5),
                  marginTop: px(10),
                  width: '92%'
                }
              }]}>
                        <View className='OpenAMembership__vw2__vw__vw2__vw'>
                          <Text className='OpenAMembership__vw2__vw__vw2__vw__tx'>
                            暂不可用
                          </Text>
                        </View>
                        <View style={{}}>
                          <AtIcon color='#60abff' size={24} svg={ICONS["svg_25r3ut"]} ref={this._refsManager.linkRef('aticon-c4b78913')} />
                        </View>
                        <View ref={this._refsManager.linkRef('view-e07fb0a1')} className='OpenAMembership__vw2__vw__vw2__vw2 M-flex-item'>
                          <Text className='OpenAMembership__vw2__vw__vw2__vw2__tx'>
                            支付宝
                          </Text>
                        </View>
                        <View inlineStyle={[{
                  enable: $eval(() => this.state.pay_type === 'alipay'),
                  name: '动态样式1',
                  style: {
                    backgroundColor: '#3060fd'
                  }
                }]} ref={this._refsManager.linkRef('view-c4bc351b')} className='OpenAMembership__vw2__vw__vw2__vw3'>
                          {!!$eval(() => this.state.pay_type === 'wepay') && <AtIcon color='#ffffff' size={12} svg={ICONS["svg_pzt5xc"]} ref={this._refsManager.linkRef('aticon-2a0ef42f')} />}
                        </View>
                      </View>}
                  </View>
                  <View ref={this._refsManager.linkRef('view-78aae562')} className='OpenAMembership__vw2__vw1'>
                    <View ref={this._refsManager.linkRef('view-deada35c')} className='OpenAMembership__vw2__vw1__vw' onClick={function () {
                return this.confirmPayment.apply(this, Array.prototype.slice.call(arguments).concat([]));
              }.bind(this)}>
                      <Text className='OpenAMembership__vw2__vw1__vw__tx'>
                        确认支付
                      </Text>
                    </View>
                  </View>
                </View>}
            </View>}
        </View>
      </React.Fragment>;
  }

}

export default OpenAMembership$Page;