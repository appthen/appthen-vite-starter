import React from 'react';
import { Page, View, Modal } from '@disscode/react';
import { ProDrawer, ProTable } from '@seada/antd-materials';
import { FormilyForm, FormilyInput, FormilyPassword, FormilyNumberPicker, FormilySelect, FormilySwitch, FormilyCheckbox, FormilyTextArea, FormilyUploadDragger } from '@seada/formily-materials';
import { Icon } from '@alilc/antd-lowcode-materials';
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

class EmployeeManagement$Page extends React.Component {
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
      list: [],
      searchParam: {
        page: 1,
        pageSize: 10,
        sort: '_id,desc'
      }
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('employeeManagement')
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
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: 'https://k5vwsz.laf.dev/lafLab' + `?module=lab_user&ops=3&searchParam=${encodeURIComponent(JSON.stringify(_this.state.searchParam))}`,
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
        id: 'operation_qo3otaipfi'
      }, {
        action: 'submit',
        type: 'primary',
        content: '确认',
        id: 'operation_odvkep700vg'
      }]} ref={this._refsManager.linkRef('pro_drawer_ivtjcdglvrf')} mask={true} maskClosable={true} autoFocus={true} keyboard={true} closable={true} forceRender={false} closeIcon={<Icon type='CloseOutlined' size={16} />}>
          <FormilyForm componentProps={{
          layout: 'horizontal'
        }} ref={this._refsManager.linkRef('formily_whocoddmvb9')}>
            <FormilyInput fieldProps={{
            name: 'username',
            title: 'Input',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilyPassword fieldProps={{
            name: 'password',
            title: 'Password',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilyNumberPicker fieldProps={{
            name: 'age',
            title: 'NumberPicker',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilySelect fieldProps={{
            name: 'habit',
            title: 'Select',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilySwitch fieldProps={{
            name: 'switch',
            title: 'Switch',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilyCheckbox fieldProps={{
            name: 'gender',
            title: 'Checkbox Group',
            enum: [{
              label: '选项1',
              value: 1
            }, {
              label: '选项2',
              value: 2
            }],
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilyTextArea fieldProps={{
            name: 'text',
            title: 'TextArea',
            'x-component': 'Input.TextArea',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {}
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
            <FormilyUploadDragger fieldProps={{
            name: 'files',
            title: 'Drag Upload',
            type: 'Array<object>',
            'x-validator': []
          }} componentProps={{
            'x-component-props': {
              textContent: 'Click or drag file to this area to upload'
            }
          }} decoratorProps={{
            'x-decorator-props': {}
          }} />
          </FormilyForm>
        </ProDrawer>
        <FDPage contentProps={{
        style: {
          background: '#f1f1f1'
        }
      }} breakPoints={[]} ref={this._refsManager.linkRef('fdpage-0779707f')}>
          <FDPageHeader fullWidth={true} ref={this._refsManager.linkRef('fdpageheader-e35bfed2')} className='employeeManagement__page_header'>
            <FDRow width='' className='employeeManagement__row_container'>
              <FDCell align='left' verAlign='top' ref={this._refsManager.linkRef('fdcell-63f8f66e')} className='employeeManagement__container'>
                <FDP>
                  <MyHeader title='' />
                </FDP>
              </FDCell>
            </FDRow>
          </FDPageHeader>
          <FDSection gap={12} ref={this._refsManager.linkRef('fdsection-96d15fb1')} title='' className='employeeManagement__region'>
            <FDBlock span={12} mode='transparent' className='employeeManagement__region__FDBlock'>
              <FDRow width='' gap={10} className='employeeManagement__row_container_1'>
                <FDCell align='left' verAlign='top' width='' className='employeeManagement__row_container_1__FDCell'>
                  <ProTable cardBordered={true} dataSource={$eval(() => this.state.list)} columns={[{
                  title: '用户名',
                  dataIndex: 'username',
                  valueType: 'text',
                  align: 'left',
                  fixed: ''
                }, {
                  title: '邮箱',
                  dataIndex: 'email'
                }, {
                  title: '头像',
                  dataIndex: 'avatar',
                  valueType: 'avatar'
                }, {
                  title: '状态',
                  dataIndex: 'status',
                  renderTag: true,
                  valueEnum: {
                    all: {
                      text: '全部',
                      status: 'Default'
                    },
                    close: {
                      text: '关闭',
                      status: 'Default'
                    },
                    running: {
                      text: '运行中',
                      status: 'Processing'
                    },
                    online: {
                      text: '已上线',
                      status: 'Success'
                    },
                    error: {
                      text: '异常',
                      status: 'Error'
                    }
                  }
                }, {
                  title: '地址',
                  dataIndex: 'address',
                  valueType: 'tag'
                }, {
                  title: '创建时间',
                  dataIndex: 'create_time',
                  valueType: 'dateTime'
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
                }} intl='zhCNIntl' ref={this._refsManager.linkRef('pro_table_odi3zvnmfg')} manualRequest={false} showHeader={true} size='default' tableLayout='' scroll={{
                  scrollToFirstRowOnChange: true
                }} rowSelection={false} dateFormatter='string' />
                </FDCell>
              </FDRow>
            </FDBlock>
          </FDSection>
          <FDPageNav width={260}>
            <View>
              <Sidebar title='' />
            </View>
          </FDPageNav>
        </FDPage>
        <Modal style={{}} animate='pop' renderView={props => <View className='employeeManagement__vw' />} visible={false} maskClosable={true} />
      </Page>;
  }

}

export default EmployeeManagement$Page;