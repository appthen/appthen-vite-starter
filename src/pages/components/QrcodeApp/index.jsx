import static_image from "./images/image.png";
import ICONS from "./icons";
import React from 'react';
import { Modal, View, Text, AtIcon, ImageBackground, ScrollView, Image, AtNoticebar, AutoList } from '@disscode/react';
import { Slider, Row, Col, Input, Upload, Spin } from '@alilc/antd-lowcode-materials';
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

class QrcodeApp$Page extends React.Component {
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
      tab: 0,
      mode: 'temp',
      request: {},
      prompt: '',
      qrcode_base64: '',
      start: 60,
      status: 'begin',
      check: {},
      lock: true,
      templates: [],
      history: [],
      codeText: '',
      requestGenCode: {},
      requestEditCode: {},
      initing: true
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('QrcodeApp')
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
        id: 'request',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_add-qrcode',
            contentType: 'JSON',
            method: 'POST',
            params: {
              start: ((100 - _this.state.start) * 0.01).toFixed(2) * 1,
              prompt: _this.state.mode === 'prompt' ? _this.state.engPrompt || _this.state.prompt : '',
              qrcode_base64: _this.state.qrcode_base64,
              appid: _this.constants.qrCodeAppId,
              templateId: _this.state.mode === 'temp' ? _this.state.templateId : ''
            },
            headers: {},
            timeout: 15000
          };
        }
      }, {
        id: 'check',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_get-qrcode' + `?requestId=${_this.state.request?.data?.requestId}`,
            contentType: 'JSON',
            method: 'GET',
            params: {},
            headers: {},
            timeout: 15000
          };
        }
      }, {
        id: 'templates',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_getTemplateList',
            contentType: 'JSON',
            method: 'POST',
            params: {
              appid: _this.constants.qrCodeAppId
            },
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data.data;
        }
      }, {
        id: 'translate',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_trans' + `?prompt=${_this.state.prompt}`,
            contentType: 'JSON',
            method: 'POST',
            params: {
              prompt: _this.state.prompt
            },
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data.data?.prompt;
        }
      }, {
        id: 'history',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_web-controllers',
            contentType: 'JSON',
            method: 'POST',
            params: {
              mode: 'getAiQRCodeRecordHistory',
              param: {
                appId: _this.constants.qrCodeAppId
              }
            },
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data.data?.content;
        }
      }, {
        id: 'requestGenCode',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_generateQrcode',
            contentType: 'JSON',
            method: 'POST',
            params: {
              mode: 'generate',
              param: {
                text: _this.state.codeText
              }
            },
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data.data?.new_qrcode;
        }
      }, {
        id: 'requestEditCode',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/ai-qrcode_generateQrcode',
            contentType: 'JSON',
            method: 'POST',
            params: {
              mode: 'redraw',
              param: {
                base64: 'data:image/png;base64,' + _this.state.qrcode_base64
              }
            },
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data.data?.new_qrcode;
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

    if ((field === 'prompt' || field === 'templateId') && this.state.status === 'finish') {
      state['status'] = 'begin';
    }

    if (field === 'prompt') {
      state['engPrompt'] = '';
      state['transSourceText'] = '';
    }

    this.setState(state, cb);
  }

  async uploadQrCode({
    file
  }) {
    const now = Date.now();
    if (now - this.debounceTime < 1000) return;
    this.debounceTime = now;
    const originFileObj = file?.originFileObj || file;

    if (originFileObj) {
      const fileSize = originFileObj.size;

      if (fileSize > 1024 * 1024) {
        return this.utils.message.error('图片文件大小不可大于1M');
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!allowedTypes.includes(originFileObj.type)) {
        return this.utils.message.error('请选择jpg、jpeg或png格式的图片');
      }

      try {
        const base64 = await this.utils.compressAndConvertToBase64(originFileObj);
        const qrcode_base64 = base64.split(';base64,')[1]; // const reader = new FileReader();
        // 设置回调函数，当读取完成后触发该函数
        // reader.onload = () => {
        // 将文件内容转换成base64编码
        // const qrcode_base64 = reader.result.replace(/^data:.+;base64,/, '');
        // 显示base64字符串

        this.setState({
          qrcode_base64,
          lock: true,
          start: 60
        }, async () => {
          // 优化二维码
          const requestEditCode = await this.dataSourceMap['requestEditCode']?.load();

          if (requestEditCode) {
            this.setState({
              qrcode_base64: requestEditCode.split(';base64,')[1]
            });
            this.utils.message.success('已对您的二维码进行优化');
          }
        }); // };
      } catch (e) {
        this.utils.message.success('二维码校验失败');
      } // 开始读取文件
      // reader.readAsDataURL(originFileObj);

    }
  }

  async generate(e, {
    lockStyle
  }) {
    const now = Date.now();

    if (now - this.lastClick < 1000) {
      return this.utils.message.info('知道你很急，但是请别急');
    }

    this.lastClick = now;
    const {
      templateId,
      prompt,
      engPrompt,
      mode,
      qrcode_base64,
      status
    } = this.state;

    if (mode === 'temp' && !templateId) {
      return this.utils.message.error('请选择内置样式模板');
    }

    if (mode === 'prompt' && !prompt) {
      return this.utils.message.error('请输入提示词');
    }

    if (status === 'working') {
      return this.utils.message.error('正在绘制中，请等待');
    }

    if (!qrcode_base64) {
      return this.utils.message.error('请上传/生成二维码');
    }

    if (mode === 'prompt' && !engPrompt && prompt && this.checkHasChinese(prompt)) {
      return this.utils.message.error('翻译中请稍等');
    }

    this.setState({
      status: 'working'
    }, async () => {
      const request = await this.dataSourceMap['request']?.load(this.state.lock && this.state.check?.data?.seed ? {
        seed: this.state.check?.data?.seed
      } : {});

      if (request?.data?.requestId) {
        this.utils.message.info('开始绘制，请稍等');
        setTimeout(() => {
          this.startTime = Date.now();
          this.checkGeneratedResults();
        }, 2000);
      } else {
        this.utils.message.error(request.msg || '绘制失败，稍后重试');
        this.setState({
          status: 'begin'
        });
      }
    });
  }

  downloadPicture(imageUrl) {
    if (this.props.isMobile) {
      this.utils.message.info('微信中请长按图片保存到手机');
    }

    fetch(imageUrl).then(response => response.blob()).then(blob => {
      this.utils.message.success('开始下载，请等候');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  async checkGeneratedResults() {
    try {
      const check = await this.dataSourceMap['check']?.load();

      if (check?.data?.fileUrl) {
        this.setState({
          status: 'finish'
        });
        this.$('autolist')?.refresh();
      } else {
        if (typeof this.startTime === 'number' && Date.now() - this.startTime > 180000) {
          this.startTime = null;
          this.setState({
            status: 'begin'
          });
          this.$('autolist')?.refresh();
          return this.utils.message.error('生成失败，请稍后重试');
        }

        setTimeout(() => {
          this.checkGeneratedResults();
        }, 10000);
      }
    } catch (e) {
      this.startTime = null;
      this.setState({
        status: 'begin'
      });
      this.$('autolist')?.refresh();
      return this.utils.message.error('生成失败，请稍后重试');
    }
  }

  checkHasChinese(text) {
    const res = text.match(/[^\x00-\x80]/g);
    return res && res.length > 0;
  }

  async detectionTranslation(event) {
    const prompt = event?.target?.value;
    if (!prompt) return;
    if (prompt === this.state.transSourceText) return;
    const hasZH = this.checkHasChinese(prompt);

    if (prompt && hasZH) {
      const hide = this.utils.message.loading('自动翻译中');
      const translate = await this.dataSourceMap['translate']?.load();
      hide?.();
      this.setState({
        lock: true,
        transSourceText: prompt,
        engPrompt: translate
      });
    }
  }

  async textToQrCode(e) {
    this.utils.checkForLogin().then(async () => {
      if (this.state.qrcode_base64) {
        return this.setState({
          qrcode_base64: ''
        });
      }

      try {
        const hide = this.utils.message.loading('请稍等');
        const requestGenCode = await this.dataSourceMap['requestGenCode']?.load();
        hide();
        const base64 = requestGenCode.split(';base64,')[1];
        this.setState({
          qrcode_base64: base64
        });
      } catch (e) {
        this.utils.message.error('生成失败，请稍后重试');
      }
    }).catch(e => {
      console.log('error: ', e);
      this.utils.redirectTo('login');
    });
  }

  queryHistory() {
    this.$('autolist')?.refresh();
    setTimeout(() => {
      const item = this.state.history?.find?.(item => {
        return !item?.url?.fileUrl;
      });

      if (item) {
        setTimeout(() => {
          this.queryHistory();
        }, 5000);
      }
    }, 500);
  }

  checkEntry() {
    this.utils.checkForLogin().then(() => {
      this.setState({
        initing: false,
        userInfo: this.utils.getGlobalData('userInfo')
      });
      this.queryHistory();
    }).catch(e => {
      this.setState({
        initing: false
      });

      if (this.retry < 2) {
        this.retry = (this.retry || 0) + 1;
        setTimeout(() => {
          this.checkEntry();
        }, 2000);
      }
    });
  }

  async async_componentDidMount() {
    // const cloud = await this.utils.getLaf();
    // const db = cloud.database();
    // const res = await db.collection("apps").get();
    // this.setState({
    //   apps: res.data
    // })
    this.checkEntry();
    this.dataSourceMap['templates']?.load().then(() => {
      if (this.state.templates[0]?._id) {
        this.setState({
          templateId: this.state.templates[0]._id
        }, () => {});
      }
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.async_componentDidMount();
  }

  render() {
    const _this = this;

    return <React.Fragment>
        <Modal style={{}} animate='pop' renderView={props => <View className='QrcodeApp__vw'>
              <View className='QrcodeApp__vw__vw'>
                <View className='QrcodeApp__vw__vw__vw'>
                  <Text className='QrcodeApp__vw__vw__vw__tx'>优化选项</Text>
                </View>
              </View>
              <View className='QrcodeApp__vw__vw1'>
                <View className='QrcodeApp__vw__vw1__vw'>
                  <View ref={this._refsManager.linkRef('view-f1dd3381')} className='QrcodeApp__vw__vw1__vw__vw'>
                    <View className='QrcodeApp__vw__vw1__vw__vw__vw'>
                      <AtIcon color='#573de7' size={22} svg={ICONS["svg_kazbhg"]} />
                      <Text className='QrcodeApp__vw__vw1__vw__vw__vw__tx1'>
                        二维码强调程度（推荐：60-80）
                      </Text>
                    </View>
                    <View ref={this._refsManager.linkRef('view-2d063363')} className='QrcodeApp__vw__vw1__vw__vw__vw1'>
                      <View className='QrcodeApp__vw__vw1__vw__vw__vw1__vw'>
                        <Text className='QrcodeApp__vw__vw1__vw__vw__vw1__vw__tx'>
                          更艺术
                        </Text>
                      </View>
                      <View className='QrcodeApp__vw__vw1__vw__vw__vw1__vw1 M-flex-item'>
                        <Slider defaultValue={30} range={false} disabled={false} dots={false} reverse={false} vertical={false} allowClear={false} max={100} min={1} value={$eval(() => _this.state.start)} onChange={function () {
                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                      field: 'start'
                    }]));
                  }.bind(_this)} />
                      </View>
                      <View className='QrcodeApp__vw__vw1__vw__vw__vw1__vw2'>
                        <Text className='QrcodeApp__vw__vw1__vw__vw__vw1__vw2__tx'>
                          {$eval(() => _this.state.start)}
                        </Text>
                      </View>
                      <View className='QrcodeApp__vw__vw1__vw__vw__vw1__vw3'>
                        <Text className='QrcodeApp__vw__vw1__vw__vw__vw1__vw3__tx'>
                          更易扫码
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View ref={this._refsManager.linkRef('view-7cf83899')} className='QrcodeApp__vw__vw2 M-flex-item'>
                <View className='QrcodeApp__vw__vw2__vw'>
                  <View className='QrcodeApp__vw__vw2__vw__vw'>
                    <Text className='QrcodeApp__vw__vw2__vw__vw__tx'>
                      锁定背景图
                    </Text>
                    <View inlineStyle={[{
                enable: $eval(() => !_this.state.lock),
                name: '动态样式1',
                style: {
                  backgroundColor: '#e4e4e4'
                }
              }]} onClick={e => {
                _this.setStateValue(!_this.state.lock, {
                  field: 'lock'
                });
              }} className='QrcodeApp__vw__vw2__vw__vw__vw1'>
                      <View className='QrcodeApp__vw__vw2__vw__vw__vw1__vw'>
                        <AtIcon color={$eval(() => _this.state.lock ? '#fff' : '#666')} size={15} svg={ICONS["svg_vmhfnu"]} className='QrcodeApp__vw__vw2__vw__vw__vw1__vw__AtIcon' />
                        <Text inlineStyle={[{
                    enable: $eval(() => !_this.state.lock),
                    name: '动态样式1',
                    style: {
                      color: '#666666'
                    }
                  }]} className='QrcodeApp__vw__vw2__vw__vw__vw1__vw__tx1'>
                          {$eval(() => _this.state.lock ? '锁定' : '未锁定')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View ref={this._refsManager.linkRef('view-8028cd47')} className='QrcodeApp__vw__vw2__vw1'>
                  <Text ref={this._refsManager.linkRef('text-779381e8')} className='QrcodeApp__vw__vw2__vw1__tx'>
                    喂！如果图片无法扫码，请调整上方的「二维码强调程度」滚动条，越往右越容易扫码！！！
                  </Text>
                </View>
              </View>
              <View ref={this._refsManager.linkRef('view-e0cf4fbf')} className='QrcodeApp__vw__vw3'>
                <View className='QrcodeApp__vw__vw3__vw M-gb-click' onClick={e => {
            _this.$('modal1')?.close();
          }}>
                  <Text className='QrcodeApp__vw__vw3__vw__tx'>取消</Text>
                </View>
                <View onClick={e => {
            _this.generate(e, {
              lockStyle: false
            });

            _this.$('modal1')?.close();
          }} className='QrcodeApp__vw__vw3__vw1 M-gb-click'>
                  <Text className='QrcodeApp__vw__vw3__vw1__tx'>重绘</Text>
                </View>
              </View>
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('modal1')} />
        <Modal style={{}} animate='slide-bottom' renderView={props => <View className='QrcodeApp__vw_1'>
              <View className='QrcodeApp__vw_1__vw'>
                <View className='QrcodeApp__vw_1__vw__vw'>
                  <Text className='QrcodeApp__vw_1__vw__vw__tx'>优化选项</Text>
                </View>
              </View>
              <View className='QrcodeApp__vw_1__vw1'>
                <View className='QrcodeApp__vw_1__vw1__vw'>
                  <View ref={this._refsManager.linkRef('view-f1dd3381')} className='QrcodeApp__vw_1__vw1__vw__vw'>
                    <View className='QrcodeApp__vw_1__vw1__vw__vw__vw'>
                      <AtIcon color='#573de7' size={22} svg={ICONS["svg_s23y3t"]} />
                      <Text className='QrcodeApp__vw_1__vw1__vw__vw__vw__tx1'>
                        二维码强调程度（推荐：60-80）
                      </Text>
                    </View>
                    <View ref={this._refsManager.linkRef('view-2d063363')} className='QrcodeApp__vw_1__vw1__vw__vw__vw1'>
                      <View className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw'>
                        <Text className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw__tx'>
                          更艺术
                        </Text>
                      </View>
                      <View className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw1 M-flex-item'>
                        <Slider defaultValue={30} range={false} disabled={false} dots={false} reverse={false} vertical={false} allowClear={false} max={100} min={1} value={$eval(() => _this.state.start)} onChange={function () {
                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                      field: 'start'
                    }]));
                  }.bind(_this)} />
                      </View>
                      <View className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw2'>
                        <Text className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw2__tx'>
                          {$eval(() => _this.state.start)}
                        </Text>
                      </View>
                      <View className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw3'>
                        <Text className='QrcodeApp__vw_1__vw1__vw__vw__vw1__vw3__tx'>
                          更易扫码
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View ref={this._refsManager.linkRef('view-7cf83899')} className='QrcodeApp__vw_1__vw2 M-flex-item'>
                <View className='QrcodeApp__vw_1__vw2__vw'>
                  <View className='QrcodeApp__vw_1__vw2__vw__vw'>
                    <Text className='QrcodeApp__vw_1__vw2__vw__vw__tx'>
                      锁定背景图
                    </Text>
                    <View inlineStyle={[{
                enable: $eval(() => !_this.state.lock),
                name: '动态样式1',
                style: {
                  backgroundColor: '#e4e4e4'
                }
              }]} onClick={e => {
                _this.setStateValue(!_this.state.lock, {
                  field: 'lock'
                });
              }} className='QrcodeApp__vw_1__vw2__vw__vw__vw1'>
                      <View className='QrcodeApp__vw_1__vw2__vw__vw__vw1__vw'>
                        <AtIcon color={$eval(() => _this.state.lock ? '#fff' : '#666')} size={15} svg={ICONS["svg_8jx84h"]} className='QrcodeApp__vw_1__vw2__vw__vw__vw1__vw__AtIcon' />
                        <Text inlineStyle={[{
                    enable: $eval(() => !_this.state.lock),
                    name: '动态样式1',
                    style: {
                      color: '#666666'
                    }
                  }]} className='QrcodeApp__vw_1__vw2__vw__vw__vw1__vw__tx1'>
                          {$eval(() => _this.state.lock ? '锁定' : '未锁定')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className='QrcodeApp__vw_1__vw3'>
                <View className='QrcodeApp__vw_1__vw3__vw M-gb-click' onClick={e => {
            _this.$('youhua_mobile')?.close();
          }} ref={this._refsManager.linkRef('view-5b268ffa')}>
                  <Text className='QrcodeApp__vw_1__vw3__vw__tx'>取消</Text>
                </View>
                <View onClick={e => {
            _this.generate(e, {
              lockStyle: false
            });

            _this.$('youhua_mobile')?.close();
          }} className='QrcodeApp__vw_1__vw3__vw1 M-gb-click'>
                  <Text className='QrcodeApp__vw_1__vw3__vw1__tx'>重绘</Text>
                </View>
              </View>
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('youhua_mobile')} />
        <View ref={this._refsManager.linkRef('view-91c1eb67')} className='QrcodeApp__two-dimensional_code__vw2'>
          <View ref={this._refsManager.linkRef('view-aeb47d89')} className='QrcodeApp__two-dimensional_code__vw2__vw M-flex-item'>
            <View ref={this._refsManager.linkRef('view-2f9901d0')} className='QrcodeApp__two-dimensional_code__vw2__vw__vw M-flex-item'>
              <View className='QrcodeApp__two-dimensional_code__vw2__vw__vw__vw'>
                <View ref={this._refsManager.linkRef('view-4572ad61')} className='QrcodeApp__two-dimensional_code__vw2__vw__vw__vw__vw M-flex-item'>
                  <ImageBackground src='https://file.mengti.cc/FpNeCSgcSyFfVj8PeqQiCjZJYpKf' className='QrcodeApp__two-dimensional_code__vw2__vw__vw__vw__vw__ibg' />
                  <Text className='QrcodeApp__two-dimensional_code__vw2__vw__vw__vw__vw__tx1'>
                    ArtQR 智绘二维码
                  </Text>
                </View>
              </View>
              <ScrollView ref={this._refsManager.linkRef('scrollview')} className='QrcodeApp__two-dimensional_code__vw2__vw__vw__sv1 M-flex-item'>
                <View ref={this._refsManager.linkRef('view-395bf5b5')} className='QrcodeApp__two-dimensional_code__vw2__vw__vw__sv1__vw'>
                  <Row align='top' justify='start' wrap={true} h-gutter={20} v-gutter={20} gutter={[20, 20]} ref={this._refsManager.linkRef('row-d8b2893d')}>
                    <Col span={12} order={0} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                      <View style={{}}>
                        <View className='QrcodeApp__vw_2'>
                          {!!$eval(() => !this.state.initing && !this.state.userInfo?.username) && <View onClick={e => {
                          if (this.state.initing) return;
                          this.utils.navigateTo('login');
                        }} ref={this._refsManager.linkRef('view-ec050aaa')} className='QrcodeApp__vw_2__vw'>
                              {!!$eval(() => this.state.status === 'begin') && <View className='QrcodeApp__vw_2__vw__vw M-gb-click' ref={this._refsManager.linkRef('view-6c2bb9f8')}>
                                  <View ref={this._refsManager.linkRef('view-5ff3e1bb')} className='QrcodeApp__vw_2__vw__vw__vw M-flex-item'>
                                    <AtIcon color='#f98425' size={30} svg={ICONS["svg_cbsn2x"]} />
                                  </View>
                                  <View ref={this._refsManager.linkRef('view-295df367')}>
                                    <Text ref={this._refsManager.linkRef('text-4ee23d1f')} className='QrcodeApp__tx'>
                                      点击登录
                                    </Text>
                                  </View>
                                </View>}
                            </View>}
                          <View className='QrcodeApp__vw_2__vw1'>
                            <Text className='QrcodeApp__vw_2__vw1__tx'>1.</Text>
                            <Text className='QrcodeApp__vw_2__vw1__tx1'>
                              原始二维码
                            </Text>
                          </View>
                          <View ref={this._refsManager.linkRef('view-8d7af1d4')}>
                            <View ref={this._refsManager.linkRef('view-d2f5b4de')}>
                              <View className='QrcodeApp__vw_3'>
                                <View className='QrcodeApp__vw_3__vw'>
                                  <View className='QrcodeApp__vw_3__vw__vw'>
                                    <View className='QrcodeApp__vw_3__vw__vw__vw'>
                                      {!!false && <View ref={this._refsManager.linkRef('view-b078e8e5')} className='QrcodeApp__vw_3__vw__vw__vw__vw'>
                                          <View ref={this._refsManager.linkRef('view-d901d310')} className='QrcodeApp__vw_3__vw__vw__vw__vw__vw M-flex-item'>
                                            <Text className='QrcodeApp__vw_3__vw__vw__vw__vw__vw__tx'>
                                              请上传二维码
                                            </Text>
                                          </View>
                                        </View>}
                                      {!!$eval(() => !this.state.qrcode_base64) && <View ref={this._refsManager.linkRef('view-b078e8e5')} className='QrcodeApp__vw_3__vw__vw__vw__vw1'>
                                          <View ref={this._refsManager.linkRef('view-d901d310')} className='QrcodeApp__vw_3__vw__vw__vw__vw1__vw M-flex-item'>
                                            <Input type='text' confirmType='done' value={$eval(() => this.state.codeText)} placeholder='可输入网址、文本' password={false} bordered={false} disabled={false} ref={this._refsManager.linkRef('input-44732fb9')} onChange={function () {
                                          return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                                            field: 'codeText',
                                            valueField: 'target.value'
                                          }]));
                                        }.bind(this)} className='QrcodeApp__vw_3__vw__vw__vw__vw1__vw__Input' />
                                          </View>
                                        </View>}
                                      {!!$eval(() => this.state.qrcode_base64) && <View ref={this._refsManager.linkRef('view-a1f34fc2')} className='QrcodeApp__vw_3__vw__vw__vw__vw2'>
                                          <View ref={this._refsManager.linkRef('view-bc336ca3')} className='QrcodeApp__vw_3__vw__vw__vw__vw2__vw M-flex-item'>
                                            <Image src={$eval(() => 'data:image/png;base64,' + this.state.qrcode_base64)} remote={false} fit={false} ref={this._refsManager.linkRef('image-a3743d54')} className='QrcodeApp__vw_3__vw__vw__vw__vw2__vw__Image' />
                                          </View>
                                        </View>}
                                    </View>
                                  </View>
                                  <View className='QrcodeApp__vw_3__vw__vw1'>
                                    <View ref={this._refsManager.linkRef('view-8e0eb5f6')} className='QrcodeApp__vw_3__vw__vw1__vw M-flex-item'>
                                      {!!$eval(() => !!this.state.codeText) && <View className='QrcodeApp__vw_3__vw__vw1__vw__vw M-gb-click' ref={this._refsManager.linkRef('view-75407b22')} onClick={function () {
                                      return this.textToQrCode.apply(this, Array.prototype.slice.call(arguments).concat([]));
                                    }.bind(this)}>
                                          <Text ref={this._refsManager.linkRef('text-be7e3b3c')} className='QrcodeApp__vw_3__vw__vw1__vw__vw__tx'>
                                            {$eval(() => this.state.qrcode_base64 ? '重新修改' : '立即生成')}
                                          </Text>
                                        </View>}
                                      {!!$eval(() => !this.state.codeText) && <Upload multiple={false} directory={false} disabled={false} openFileDialogOnClick={true} showUploadList={false} listType='text' method='post' withCredentials={false} defaultFileList={[]} maxCount={1} onChange={function ({}) {
                                      this.uploadQrCode(arguments[0]);
                                    }.bind(this)} accept='jpg,jpeg,png' ref={this._refsManager.linkRef('upload-dbecd671')} beforeUpload={(file, fileList) => {
                                      // 上传文件之前的钩子
                                      return false;
                                    }}>
                                          <View className='QrcodeApp__vw_4 M-gb-click' ref={this._refsManager.linkRef('view-915dfecf')}>
                                            <AtIcon color='#666' size={22} svg={ICONS["svg_93xm15"]} />
                                            <Text className='QrcodeApp__vw_4__tx1'>
                                              上传二维码
                                            </Text>
                                          </View>
                                        </Upload>}
                                      <View className='QrcodeApp__vw_3__vw__vw1__vw__vw2 M-gb-click' ref={this._refsManager.linkRef('view-dc3e0db4')} onClick={e => {
                                      this.setState({
                                        // codeText: this.state.qrcode_base64 ? this.state.codeText : '',
                                        codeText: '',
                                        qrcode_base64: ''
                                      });
                                    }}>
                                        <Text className='QrcodeApp__vw_3__vw__vw1__vw__vw2__tx'>
                                          清空
                                        </Text>
                                      </View>
                                    </View>
                                    <View className='QrcodeApp__vw_3__vw__vw1__vw1' />
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View className='QrcodeApp__vw1'>
                        <View ref={this._refsManager.linkRef('view-b94871a8')} className='QrcodeApp__vw1__vw'>
                          <View ref={this._refsManager.linkRef('view-8d728f6d')} className='QrcodeApp__vw1__vw__vw'>
                            <View ref={this._refsManager.linkRef('view-3c521404')} className='QrcodeApp__vw1__vw__vw__vw'>
                              <Text className='QrcodeApp__vw1__vw__vw__vw__tx'>
                                2.
                              </Text>
                              <Text className='QrcodeApp__vw1__vw__vw__vw__tx1'>
                                绘画
                              </Text>
                            </View>
                            <View ref={this._refsManager.linkRef('view-26f8695f')} className='QrcodeApp__vw1__vw__vw__vw1 M-flex-item'>
                              <View ref={this._refsManager.linkRef('view-cb4a638f')} className='QrcodeApp__vw1__vw__vw__vw1__vw'>
                                {$evalArray(() => [{
                                label: '内置样式',
                                value: 'temp'
                              }, {
                                label: '绘画模式',
                                value: 'prompt'
                              }]).map((item, index) => (_this => <View className='QrcodeApp__vw1__vw__vw__vw1__vw__vw M-gb-click' inlineStyle={[{
                                enable: $eval(() => _this.state.mode === item?.value),
                                name: '动态样式1',
                                style: {
                                  backgroundColor: '#5161fe'
                                }
                              }]} onClick={e => {
                                if (_this.state.status === 'working') return;

                                _this.setStateValue(item?.value, {
                                  field: 'mode'
                                });
                              }} ref={this._refsManager.linkRef('view-7d89758f')}>
                                      <Text inlineStyle={[{
                                  enable: $eval(() => _this.state.mode === item?.value),
                                  name: '动态样式1',
                                  style: {
                                    color: '#ffffff'
                                  }
                                }]} ref={this._refsManager.linkRef('text-92d069ed')} className='QrcodeApp__vw1__vw__vw__vw1__vw__vw__tx'>
                                        {$eval(() => item?.label)}
                                      </Text>
                                    </View>)($createChildContext(_this, {
                                item,
                                index
                              })))}
                              </View>
                            </View>
                          </View>
                          <View ref={this._refsManager.linkRef('view-8d7af1d4')}>
                            <View ref={this._refsManager.linkRef('view-d2f5b4de')}>
                              {!!$eval(() => this.state.mode === 'temp') && <View ref={this._refsManager.linkRef('view-b113fd26')} className='QrcodeApp__vw_5'>
                                  {!!$eval(() => this.state.templates?.length > 0) && <View ref={this._refsManager.linkRef('view-21ff31fa')} className='QrcodeApp__vw_5__vw'>
                                      {$evalArray(() => this.state.templates).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-4d763f44')} inlineStyle={[{
                                  enable: $eval(() => item?._id === _this.state.templateId),
                                  name: '动态样式1',
                                  style: {
                                    borderWidth: px(2),
                                    borderColor: '#300afe',
                                    borderStyle: 'solid'
                                  }
                                }]} onClick={e => {
                                  if (_this.state.status === 'working') return;

                                  _this.setState({
                                    templateId: item?._id,
                                    start: 60,
                                    lock: true
                                  });
                                }} className='QrcodeApp__vw_5__vw__vw M-gb-click'>
                                            <Image src={$eval(() => item?.url)} remote={false} fit={false} ref={this._refsManager.linkRef('image-dae3023e')} className='QrcodeApp__vw_5__vw__vw__Image' />
                                            <View className='QrcodeApp__vw_5__vw__vw__vw1'>
                                              <Text className='QrcodeApp__vw_5__vw__vw__vw1__tx'>
                                                {$eval(() => item?.desc)}
                                              </Text>
                                            </View>
                                          </View>)($createChildContext(_this, {
                                  item,
                                  index
                                })))}
                                    </View>}
                                </View>}
                              {!!$eval(() => this.state.mode === 'prompt') && <View ref={this._refsManager.linkRef('view-fb16809b')} className='QrcodeApp__vw1_6'>
                                  <View className='QrcodeApp__vw1_6__vw' />
                                  <View className='QrcodeApp__vw1_6__vw1'>
                                    <View style={{}}>
                                      <Text className='QrcodeApp__tx_7'>
                                        提示词
                                      </Text>
                                    </View>
                                    <View className='QrcodeApp__vw1_6__vw1__vw1 M-flex-item' />
                                  </View>
                                  <View className='QrcodeApp__vw1_6__vw2'>
                                    <View className='QrcodeApp__vw1_6__vw2__vw M-flex-item'>
                                      <Input.TextArea autoSize={{
                                    minRows: 4,
                                    maxRows: 3
                                  }} placeholder='写下您的创意，建议使用英文描述' bordered={false} disabled={$eval(() => this.state.status === 'working')} showCount={false} style={{}} value={$eval(() => this.state.prompt)} onChange={function () {
                                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                                      field: 'prompt',
                                      valueField: 'target.value'
                                    }]));
                                  }.bind(this)} ref={this._refsManager.linkRef('input.textarea-ea54464e')} onBlur={function () {
                                    return this.detectionTranslation.apply(this, Array.prototype.slice.call(arguments).concat([]));
                                  }.bind(this)} />
                                    </View>
                                  </View>
                                  {!!$eval(() => !!this.state.engPrompt) && <View ref={this._refsManager.linkRef('view-1aa98743')} className='QrcodeApp__vw1_6__vw3'>
                                      <View className='QrcodeApp__vw1_6__vw3__vw'>
                                        <Text className='QrcodeApp__vw1_6__vw3__vw__tx'>
                                          自动翻译
                                        </Text>
                                      </View>
                                      <View className='QrcodeApp__vw1_6__vw3__vw1'>
                                        <View className='QrcodeApp__vw1_6__vw3__vw1__vw M-flex-item'>
                                          <Input.TextArea autoSize={{
                                      minRows: 4,
                                      maxRows: 3
                                    }} placeholder='自动翻译中文' bordered={false} disabled={$eval(() => this.state.status === 'working')} showCount={false} style={{}} value={$eval(() => this.state.engPrompt)} onChange={function () {
                                      return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                                        field: 'engPrompt',
                                        valueField: 'target.value'
                                      }]));
                                    }.bind(this)} ref={this._refsManager.linkRef('input.textarea-cd325')} />
                                        </View>
                                      </View>
                                    </View>}
                                </View>}
                            </View>
                          </View>
                        </View>
                      </View>
                    </Col>
                    <Col span={12} order={0} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} ref={this._refsManager.linkRef('col-1bffee9b')} className='QrcodeApp__Col1'>
                      <View style={{}}>
                        <View className='QrcodeApp__vw_8'>
                          <View className='QrcodeApp__vw_8__vw'>
                            <View className='QrcodeApp__vw_8__vw__vw'>
                              <Text className='QrcodeApp__vw_8__vw__vw__tx'>
                                3.
                              </Text>
                              <Text className='QrcodeApp__vw_8__vw__vw__tx1'>
                                开始绘制
                              </Text>
                            </View>
                            <View className='QrcodeApp__vw_8__vw__vw1 M-flex-item' />
                          </View>
                          <View ref={this._refsManager.linkRef('view-8d7af1d4')}>
                            <View ref={this._refsManager.linkRef('view-d2f5b4de')}>
                              <View ref={this._refsManager.linkRef('view-4ef577fe')} className='QrcodeApp__vw_9'>
                                {!!$eval(() => this.state.status !== 'finish') && <View ref={this._refsManager.linkRef('view-7656d2b2')} className='QrcodeApp__vw_9__vw'>
                                    {!!$eval(() => this.state.status === 'working') && <View ref={this._refsManager.linkRef('view-49343f2d')}>
                                        <Spin size='large' tip='' delay={0} indicator='' spinning={true} wrapperClassName='' ref={this._refsManager.linkRef('spin-46744f46')} />
                                      </View>}
                                    {!!$eval(() => this.state.status === 'begin') && <View className='QrcodeApp__vw_9__vw__vw1 M-gb-click' ref={this._refsManager.linkRef('view-6c2bb9f8')} onClick={function () {
                                  return this.generate.apply(this, Array.prototype.slice.call(arguments).concat([{
                                    lockStyle: false
                                  }]));
                                }.bind(this)}>
                                        <View ref={this._refsManager.linkRef('view-5ff3e1bb')} className='QrcodeApp__vw_9__vw__vw1__vw M-flex-item'>
                                          <AtIcon color='#ffffff' size={30} svg={ICONS["svg_8h2tbq"]} ref={this._refsManager.linkRef('aticon-69c1ac27')} />
                                        </View>
                                        <View ref={this._refsManager.linkRef('view-295df367')}>
                                          <Text ref={this._refsManager.linkRef('text-4ee23d1f')} className='QrcodeApp__tx_10'>
                                            开始绘制
                                          </Text>
                                        </View>
                                      </View>}
                                  </View>}
                                <View ref={this._refsManager.linkRef('view-b02a5626')} onClick={e => {
                                if (this.props.isMobile) return;

                                if (this.state.status === 'finish') {
                                  this.setStateValue(this.state.check?.data?.fileUrl, {
                                    field: 'previewImgUrl'
                                  }, () => {
                                    this.$('modal')?.open();
                                  });
                                }
                              }} className='QrcodeApp__vw_9__vw1'>
                                  <Image src={static_image} remote={false} fit={false} ref={this._refsManager.linkRef('image-3fcbc46a')} className='QrcodeApp__vw_9__vw1__Image' />
                                  {!!$eval(() => !!this.state.check?.data?.fileUrl) && <Image src={$eval(() => this.state.check?.data?.fileUrl)} remote={false} fit={false} ref={this._refsManager.linkRef('image-3fcbc46a')} className='QrcodeApp__vw_9__vw1__Image1' />}
                                </View>
                              </View>
                              {!!false && <View ref={this._refsManager.linkRef('view-f1dd3381')} className='QrcodeApp__vw1_11'>
                                  <View className='QrcodeApp__vw1_11__vw'>
                                    <AtIcon color='#573de7' size={22} svg={ICONS["svg_yingdc"]} />
                                    <Text className='QrcodeApp__vw1_11__vw__tx1'>
                                      二维码强调程度（推荐：60-80）
                                    </Text>
                                  </View>
                                  <View ref={this._refsManager.linkRef('view-2d063363')} className='QrcodeApp__vw1_11__vw1'>
                                    <View className='QrcodeApp__vw1_11__vw1__vw'>
                                      <Text className='QrcodeApp__vw1_11__vw1__vw__tx'>
                                        更艺术
                                      </Text>
                                    </View>
                                    <View className='QrcodeApp__vw1_11__vw1__vw1 M-flex-item'>
                                      <Slider defaultValue={30} range={false} disabled={false} dots={false} reverse={false} vertical={false} allowClear={false} max={100} min={1} value={$eval(() => this.state.start)} onChange={function () {
                                    return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                                      field: 'start'
                                    }]));
                                  }.bind(this)} />
                                    </View>
                                    <View className='QrcodeApp__vw1_11__vw1__vw2'>
                                      <Text className='QrcodeApp__vw1_11__vw1__vw2__tx'>
                                        {$eval(() => this.state.start)}
                                      </Text>
                                    </View>
                                    <View className='QrcodeApp__vw1_11__vw1__vw3'>
                                      <Text className='QrcodeApp__vw1_11__vw1__vw3__tx'>
                                        更易扫码
                                      </Text>
                                    </View>
                                  </View>
                                </View>}
                              <View className='QrcodeApp__vw2'>
                                {!!$eval(() => this.state.status === 'finish' && 1 == 2) && <View ref={this._refsManager.linkRef('view-85d0302c')} className='QrcodeApp__vw2__vw'>
                                    <View className='QrcodeApp__vw2__vw__vw M-gb-click M-flex-item' ref={this._refsManager.linkRef('view-6c2bb')} onClick={function () {
                                  return this.generate.apply(this, Array.prototype.slice.call(arguments).concat([{
                                    lockStyle: true
                                  }]));
                                }.bind(this)}>
                                      <View className='QrcodeApp__vw2__vw__vw__vw M-flex-item'>
                                        <AtIcon color='#519c03' size={24} svg={ICONS["svg_wp6cfq"]} />
                                      </View>
                                      <View>
                                        <Text className='QrcodeApp__tx_12'>
                                          微调
                                        </Text>
                                      </View>
                                    </View>
                                    <View className='QrcodeApp__vw2__vw__vw1 M-gb-click M-flex-item' ref={this._refsManager.linkRef('view-6c2bb9f8')} onClick={function () {
                                  return this.generate.apply(this, Array.prototype.slice.call(arguments).concat([{
                                    lockStyle: false
                                  }]));
                                }.bind(this)}>
                                      <View className='QrcodeApp__vw2__vw__vw1__vw M-flex-item'>
                                        <AtIcon color='#5249ff' size={30} svg={ICONS["svg_skmi1k"]} />
                                      </View>
                                      <View>
                                        <Text className='QrcodeApp__tx_13'>
                                          重新绘制
                                        </Text>
                                      </View>
                                    </View>
                                    <View className='QrcodeApp__vw2__vw__vw2 M-gb-click' onClick={e => {
                                  this.downloadPicture(this.state.check?.data?.fileUrl);
                                }}>
                                      <View className='QrcodeApp__vw2__vw__vw2__vw M-flex-item'>
                                        <AtIcon color='#ff9b42' size={28} svg={ICONS["svg_6pck81"]} />
                                      </View>
                                      <View>
                                        <Text className='QrcodeApp__tx_14'>
                                          下载
                                        </Text>
                                      </View>
                                    </View>
                                  </View>}
                                {!!$eval(() => this.state.status === 'finish') && <View ref={this._refsManager.linkRef('view-85d0302c')} className='QrcodeApp__vw2__vw1'>
                                    <View className='QrcodeApp__vw2__vw1__vw M-gb-click M-flex-item' ref={this._refsManager.linkRef('view-6c2bb9f8')} onClick={e => {
                                  this.$(this.props.isMobile ? 'youhua_mobile' : 'modal1')?.open();
                                }}>
                                      <View className='QrcodeApp__vw2__vw1__vw__vw M-flex-item'>
                                        <AtIcon color='#5249ff' size={30} svg={ICONS["svg_mgnhag"]} />
                                      </View>
                                      <View>
                                        <Text className='QrcodeApp__tx_15'>
                                          重新绘制
                                        </Text>
                                      </View>
                                    </View>
                                    <View className='QrcodeApp__vw2__vw1__vw1 M-gb-click' onClick={e => {
                                  this.downloadPicture(this.state.check?.data?.fileUrl);
                                }}>
                                      <View className='QrcodeApp__vw2__vw1__vw1__vw M-flex-item'>
                                        <AtIcon color='#ff9b42' size={28} svg={ICONS["svg_jqzy9g"]} />
                                      </View>
                                      <View>
                                        <Text className='QrcodeApp__tx_16'>
                                          下载
                                        </Text>
                                      </View>
                                    </View>
                                  </View>}
                                {!!$eval(() => this.state.status === 'finish') && <View ref={this._refsManager.linkRef('view-e64e418e')} className='QrcodeApp__vw2__vw2'>
                                    <Text className='QrcodeApp__vw2__vw2__tx' />
                                    <AtNoticebar marquee={true} speed={80} customStyle={{
                                  borderRadius: px(10)
                                }} ref={this._refsManager.linkRef('atnoticebar-7c354b26')}>
                                      图片效果不理想或无法扫码，请点击重新绘制，并调节二维码强调程度
                                    </AtNoticebar>
                                  </View>}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Col>
                  </Row>
                </View>
              </ScrollView>
            </View>
          </View>
          {!!$eval(() => !this.props?.isMobile) && <View ref={this._refsManager.linkRef('view-2d027e0e')} className='QrcodeApp__two-dimensional_code__vw2__vw1'>
              <View className='QrcodeApp__two-dimensional_code__vw2__vw1__vw'>
                <View ref={this._refsManager.linkRef('view-4572ad61')} className='QrcodeApp__two-dimensional_code__vw2__vw1__vw__vw M-flex-item'>
                  <Text className='QrcodeApp__two-dimensional_code__vw2__vw1__vw__vw__tx'>
                    历史记录
                  </Text>
                  <View className='QrcodeApp__two-dimensional_code__vw2__vw1__vw__vw__vw1 M-gb-click' ref={this._refsManager.linkRef('view-e3ed6a0f')} onClick={e => {
                this.$('autolist')?.refresh();
              }}>
                    <AtIcon color='#666' size={24} svg={ICONS["svg_qlvagg"]} ref={this._refsManager.linkRef('aticon-d4e959d0')} />
                  </View>
                </View>
              </View>
              <AutoList dataSource={(page, pageSize) => {
            return this.dataSourceMap['history'].load({
              param: {
                appId: this.constants.qrCodeAppId,
                page,
                pageSize,
                sort: 'id,asc'
              }
            });
          }} autoFetch={false} mode='scroll' pageMode='auto' emptyText='' footerMarginTop={0} pageSize={10} renderItem={
          /* 插槽容器*/
          (item, index, currentPage) => <View>
                      <View ref={this._refsManager.linkRef('view-8d7af1d4')} className='QrcodeApp__vw_17'>
                        <View ref={this._refsManager.linkRef('view-d2f5b4de')}>
                          <View onClick={e => {
                  if (_this.props.isMobile) return;

                  _this.setStateValue(item?.url?.fileUrl, {
                    field: 'previewImgUrl'
                  }, () => {
                    _this.$('modal')?.open();
                  });
                }} className='QrcodeApp__vw_18'>
                            <View className='QrcodeApp__vw_18__vw'>
                              {!!$eval(() => !item?.url?.fileUrl) && <Spin size='default' tip='' delay={0} indicator='' spinning={true} wrapperClassName='' ref={this._refsManager.linkRef('spin-c0b8c832')} />}
                            </View>
                            <Image src={$eval(() => item?.url?.fileUrl)} remote={false} fit={false} className='QrcodeApp__vw_18__Image1' />
                          </View>
                        </View>
                      </View>
                    </View>} renderHeader='' renderFooter='' emptyHideHeader={false} ref={this._refsManager.linkRef('autolist')} />
            </View>}
        </View>
        <Modal style={{}} animate='pop' renderView={props => <View className='QrcodeApp__vw_19'>
              <Image src={$eval(() => _this.state.previewImgUrl)} remote={false} fit={false} className='QrcodeApp__vw_19__Image' />
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('modal')} />
      </React.Fragment>;
  }

}

export default QrcodeApp$Page;