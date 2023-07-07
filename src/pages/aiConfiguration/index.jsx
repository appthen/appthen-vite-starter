import React from 'react';
import { Page, View } from '@disscode/react';
import { ProDrawer, ProTable } from '@seada/antd-materials';
import { Form, Input, InputNumber, Button, Icon } from '@alilc/antd-lowcode-materials';
import { Page as FDPage, Row as FDRow, Cell as FDCell, P as FDP, Section as FDSection, Block as FDBlock } from '@alifd/layout/lib/index.js';
import { requestHandle } from '@/utils/dataSource';
import MyHeader from "@/pages/components/MyHeader";
import Sidebar from "@/pages/components/Sidebar";
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
const FDPageHeader = FDPage.Header;
const FDPageNav = FDPage.Nav;

class AiConfiguration$Page extends React.Component {
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
      list: [{
        _id: '647deea2aa5a5644310c3154',
        appId: '123',
        appSecret: 'xxxxx',
        token: 'fdsfsffd',
        vender: 3,
        ctime: 1685974690762,
        utime: 1685974690762
      }, {
        _id: '647dedbbaa5a5644310c3147',
        appId: '123',
        appSecret: 'xxxxx',
        token: 'fdsfsffd',
        vender: 3,
        ctime: 1685974459625,
        utime: 1685974459625
      }, {
        _id: '647dedb6aa5a5644310c3143',
        appId: '123',
        appSecret: 'xxxxx',
        token: 'fdsfsffd',
        vender: 2,
        ctime: 1685974454507,
        utime: 1685974454507
      }],
      searchParam: {
        page: 1,
        pageSize: 10,
        sort: '_id,desc'
      },
      templates: [{
        _id: '6491b61d7425d3bc8f115ffb',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '城市皇后',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/fb2acca4-f3ec-4038-ab90-12b7c628663f.jpeg',
        seed: '8584455275394150'
      }, {
        _id: '6491b6267425d3bc8f115ffc',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '闹市',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/f91a0787-c38c-451f-a649-58a5c088708b.jpeg',
        seed: '203099946'
      }, {
        _id: '6491b6307425d3bc8f115ffd',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '淹没之城',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/29c66731-0efb-4578-bc46-39849d166764.jpeg',
        seed: '2957364460'
      }, {
        _id: '6491b6387425d3bc8f115ffe',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '雪中别墅',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/2240e535-9aa1-43f8-9689-95ae55caa506.jpeg',
        seed: '2856623656'
      }, {
        _id: '6491b6417425d3bc8f115fff',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '未来少女',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/85a942ce-47e6-4565-a9c4-3cecba4cd240.jpeg',
        seed: '2902120305'
      }, {
        _id: '6491b64a7425d3bc8f116000',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '机械女孩',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/90e657fb-62bc-4d04-8594-58a3e34bd0a1.jpeg',
        seed: '3260759039'
      }, {
        _id: '6491b6547425d3bc8f116001',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '眼镜猫',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/260deae1-9567-47b2-a013-9d2404833db1.jpeg',
        seed: '1882064650'
      }, {
        _id: '6491b65b7425d3bc8f116002',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '狮子',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/e601d44d-0452-40f2-85a0-a9711fd8d24e.jpeg',
        seed: '1458820429'
      }, {
        _id: '6491b6647425d3bc8f116003',
        appid: '6491b5ab4ed59e03b60ed274',
        desc: '爱狗女郎',
        url: 'https://img.jhcrs.cn/hysliCloud/20230620/9add8000-14e4-4c46-8573-735150df060b.jpg',
        seed: '540925893'
      }]
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('aiConfiguration')
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
        id: 'list',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: 'https://k5vwsz.laf.dev/lafLab' + `?module=lab_aiconfig&ops=3&searchParam=${encodeURIComponent(JSON.stringify(_this.state.searchParam))}`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data?.page?.list;
        }
      }, {
        id: 'templates',
        isInit: function () {
          return true;
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
            headers: {},
            timeout: 15000
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data.data;
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
    this.setState(state, cb);
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }

  render() {
    const _this = this;

    return <Page statusBarMode='light'>
        <ProDrawer title='高级抽屉' placement='right' destroyOnClose={true} width={760} operations={[{
        action: 'cancel',
        type: 'normal',
        content: '取消',
        id: 'operation_w2n9lm3bqun'
      }, {
        action: 'submit',
        type: 'primary',
        content: '确认',
        id: 'operation_dugtptp7w57'
      }]} ref={this._refsManager.linkRef('pro_drawer_avn6y1ia8qa')} mask={true} maskClosable={true} autoFocus={true} keyboard={true} closable={true} forceRender={false} closeIcon={<Icon type='CloseOutlined' size={16} />} visible={$eval(() => this.state.showDrawer)}>
          <Form labelCol={{
          span: 6
        }} wrapperCol={{
          span: 14
        }} onValuesChange={function () {
          const self = this;

          try {
            return function onValuesChange(changedValues, allValues) {
              console.log('onValuesChange', changedValues, allValues);
            }.apply(self, arguments);
          } catch (e) {
            logger.warn('call function which parsed by lowcode failed: ', e);
            return e.message;
          }
        }} onFinish={function () {
          const self = this;

          try {
            return function onFinish(values) {
              console.log('onFinish', values);
            }.apply(self, arguments);
          } catch (e) {
            logger.warn('call function which parsed by lowcode failed: ', e);
            return e.message;
          }
        }} onFinishFailed={function () {
          const self = this;

          try {
            return function onFinishFailed({
              values,
              errorFields,
              outOfDate
            }) {
              console.log('onFinishFailed', values, errorFields, outOfDate);
            }.apply(self, arguments);
          } catch (e) {
            logger.warn('call function which parsed by lowcode failed: ', e);
            return e.message;
          }
        }} name='basic' ref={this._refsManager.linkRef('form_j1yg')} colon={true} hideRequiredMark={false} preserve={true} scrollToFirstError={true} validateMessages={{
          required: "'${name}' 不能为空"
        }}>
            <Form.Item label='用户名' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='username' requiredobj={{
            message: '必填'
          }} typeobj={{
            message: ''
          }} lenobj={{
            max: 0,
            min: 0,
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label='邮箱' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='email' requiredobj={{
            message: '必填'
          }} typeobj={{
            message: ''
          }} lenobj={{
            max: 0,
            min: 0,
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label='头像' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='avatar' requiredobj={{
            message: '必填'
          }} typeobj={{
            message: ''
          }} lenobj={{
            max: 0,
            min: 0,
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label='创建时间' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='ctime' requiredobj={{
            message: '必填'
          }} typeobj={{
            message: ''
          }} lenobj={{
            max: 0,
            min: 0,
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <InputNumber placeholder='请输入' autoFocus={false} disabled={false} controls={true} bordered={true} />
            </Form.Item>
            <Form.Item label='更新时间' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='utime' requiredobj={{
            message: '必填'
          }} typeobj={{
            message: ''
          }} lenobj={{
            max: 0,
            min: 0,
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <InputNumber placeholder='请输入' autoFocus={false} disabled={false} controls={true} bordered={true} />
            </Form.Item>
            <Form.Item wrapperCol={{
            offset: 6
          }} colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            message: ''
          }} lenobj={{
            max: 0,
            min: 0,
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button className='aiConfiguration__Button1'>取消</Button>
            </Form.Item>
          </Form>
        </ProDrawer>
        <FDPage contentProps={{
        style: {
          background: '#f1f1f1'
        }
      }} breakPoints={[]} ref={this._refsManager.linkRef('fdpage-0779707f')}>
          <FDPageHeader fullWidth={true} ref={this._refsManager.linkRef('fdpageheader-e35bfed2')} className='aiConfiguration__page_header'>
            <FDRow width='' className='aiConfiguration__row_container'>
              <FDCell align='left' verAlign='top' ref={this._refsManager.linkRef('fdcell-63f8f66e')} className='aiConfiguration__container'>
                <FDP>
                  <MyHeader title='' />
                </FDP>
              </FDCell>
            </FDRow>
          </FDPageHeader>
          <FDPageNav width={260}>
            <View>
              <Sidebar title='' />
            </View>
          </FDPageNav>
          <FDSection gap={12} ref={this._refsManager.linkRef('fdsection-96d15fb1')} title='' className='aiConfiguration__region'>
            <FDBlock span={12} mode='transparent' className='aiConfiguration__region__FDBlock'>
              <FDRow width='' gap={10} className='aiConfiguration__row_container_1'>
                <FDCell align='left' verAlign='top' width='' className='aiConfiguration__row_container_1__FDCell'>
                  <ProTable cardBordered={true} dataSource={[{
                  username: '黄磊',
                  email: '100103033@qq.com',
                  avatar: 'https://file.mengti.cc/FjG1VkujiUBgtBUl4n35W5Ew9ZJj',
                  ctime: 1688527881445,
                  utime: 1688527881445
                }, {
                  username: '汤赛',
                  email: '12312312323@qq.com',
                  avatar: 'https://file.mengti.cc/FjG1VkujiUBgtBUl4n35W5Ew9ZJj',
                  ctime: 1688527881445,
                  utime: 1688527881445
                }]} columns={[{
                  title: ' 关联用户表id',
                  dataIndex: 'uid',
                  hideInSearch: false,
                  valueType: 'text'
                }, {
                  title: ' 当前应用的 appid',
                  dataIndex: 'appId',
                  hideInSearch: false,
                  valueType: 'text'
                }, {
                  title: '用户填写的站点地址',
                  dataIndex: 'url',
                  hideInSearch: false,
                  valueType: 'text'
                }, {
                  title: '二维码图片的',
                  dataIndex: 'base64',
                  hideInSearch: false,
                  valueType: 'text'
                }, {
                  title: ' 创建时间',
                  dataIndex: 'createTime',
                  hideInSearch: false,
                  valueType: 'digit'
                }]} pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: false,
                  showQuickJumper: false,
                  simple: false,
                  size: 'default'
                }} search={{
                  defaultCollapsed: false,
                  resetText: '',
                  searchText: '',
                  labelWidth: 'auto'
                }} toolBarRender={currentPageData => <Button type='primary' htmlType='button' size='middle' shape='default' icon={<Icon type='PlusOutlined' size={16} rotate={0} spin={false} />} block={false} danger={false} ghost={false} disabled={false}>
                        新增
                      </Button>} intl='zhCNIntl' manualRequest={false} showHeader={true} size='default' tableLayout='' scroll={{
                  scrollToFirstRowOnChange: true
                }} rowSelection={false} dateFormatter='string' ref={this._refsManager.linkRef('pro_table_y9iudd1j3b')} rowKey='_id' className='aiConfiguration__row_container_1__FDCell__ProTable' />
                </FDCell>
              </FDRow>
            </FDBlock>
          </FDSection>
        </FDPage>
      </Page>;
  }

}

export default AiConfiguration$Page;