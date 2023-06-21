import React from 'react';
import { Page, View } from '@disscode/react';
import { ProDrawer, ProTable, ProPopconfirm } from '@seada/antd-materials';
import { Icon, Button } from '@alilc/antd-lowcode-materials';
import { Page as FDPage, Row as FDRow, Cell as FDCell, P as FDP, Section as FDSection, Block as FDBlock } from '@alifd/layout/lib/index.js';
import { requestHandle } from '@/utils/dataSource';
import MyHeader from "../components/MyHeader";
import Sidebar from "../components/Sidebar";
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
      showDrawer: false
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
      }]} ref={this._refsManager.linkRef('pro_drawer_avn6y1ia8qa')} mask={true} maskClosable={true} autoFocus={true} keyboard={true} closable={true} forceRender={false} closeIcon={<Icon type='CloseOutlined' size={16} />} visible={$eval(() => this.state.showDrawer)} />
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
                  <ProTable cardBordered={true} dataSource={$eval(() => this.state.list)} columns={[{
                  title: 'appId',
                  dataIndex: 'appId',
                  valueType: 'tag'
                }, {
                  title: 'appSecret',
                  dataIndex: 'appSecret',
                  valueType: 'text',
                  align: 'left',
                  fixed: ''
                }, {
                  title: 'vender',
                  dataIndex: 'vender',
                  align: 'left',
                  fixed: ''
                }, {
                  title: '操作',
                  dataIndex: 'options',
                  valueType: 'option',
                  align: 'left',
                  fixed: '',
                  render: (text, record, index) => [<Button type='link' htmlType='button' size='small' shape='default' block={false} danger={false} ghost={false} disabled={false} icon='' onClick={event => {
                    _this.$('pro_drawer_avn6y1ia8qa')?.show();
                  }}>
                            编辑
                          </Button>, <ProPopconfirm title='确定删除?' okType='primary' okText='确定' cancelText='取消'>
                            <Button htmlType='button' type='link' size='small' shape='default' block={false} danger={true} ghost={false} disabled={false} icon=''>
                              删除
                            </Button>
                          </ProPopconfirm>]
                }]} rowKey='id' pagination={{
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
                      </Button>} intl='zhCNIntl' ref={this._refsManager.linkRef('pro_table_1ai7uq80asl')} manualRequest={false} showHeader={true} size='default' tableLayout='' scroll={{
                  scrollToFirstRowOnChange: true
                }} rowSelection={false} dateFormatter='string' className='aiConfiguration__row_container_1__FDCell__ProTable' />
                </FDCell>
              </FDRow>
            </FDBlock>
          </FDSection>
        </FDPage>
      </Page>;
  }

}

export default AiConfiguration$Page;