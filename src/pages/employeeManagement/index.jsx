import React from 'react';
import { Page, View } from '@disscode/react';
import { Page as FDPage, Row as FDRow, Cell as FDCell, P as FDP, Section as FDSection, Block as FDBlock } from '@alifd/layout/lib/index.js';
import { PageHeader, Space, Button, Icon, Form, Input, InputNumber, Select, Slider, Switch, TimePicker, Rate } from '@alilc/antd-lowcode-materials';
import { ProTable, ProDrawer } from '@seada/antd-materials';
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
      },
      end: 1
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
            <FDBlock span={12} mode='transparent' className='employeeManagement__block'>
              <FDCell>
                <PageHeader title='员工' subTitle='' ghost={false} extra={<Space align='start' direction='horizontal'>
                      <Button htmlType='button' type='primary' size='middle' shape='default' icon={<Icon type='PlusOutlined' size={16} rotate={0} spin={false} />} block={false} danger={false} ghost={false} loading={false} disabled={false} onClick={event => {
                  this.$('pro_drawer_ksynv1gdua')?.show();
                }}>
                        新增
                      </Button>
                    </Space>} style={{}} />
              </FDCell>
            </FDBlock>
          </FDSection>
          <FDSection gap={12} ref={this._refsManager.linkRef('fdsection-96d15fb1')} title='' className='employeeManagement__region_1'>
            <FDBlock span={12} mode='transparent' className='employeeManagement__region_1__FDBlock'>
              <FDRow width='' gap={10} className='employeeManagement__row_container_2'>
                <FDCell align='left' verAlign='top' width='' className='employeeManagement__row_container_2__FDCell'>
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
        <ProDrawer title='高级抽屉' placement='right' destroyOnClose={true} width={760} operations={[{
        action: 'cancel',
        type: 'normal',
        content: '取消',
        id: 'operation_51dkrogs6wt'
      }, {
        action: 'submit',
        type: 'primary',
        content: '确认',
        id: 'operation_s43tp88ofsl'
      }]} ref={this._refsManager.linkRef('pro_drawer_ksynv1gdua')} mask={true} maskClosable={true} autoFocus={true} keyboard={true} closable={true} forceRender={false} closeIcon={<Icon type='CloseOutlined' size={16} />}>
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
        }} name='basic' ref={this._refsManager.linkRef('form_cnsa')} colon={true} hideRequiredMark={false} preserve={true} scrollToFirstError={true} validateMessages={{
          required: "'${name}' 不能为空"
        }}>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='a' requiredobj={{
            required: true,
            message: '必填'
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <Input placeholder='请输入' bordered={true} disabled={false} size='middle' />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='b'>
              <InputNumber placeholder='请输入' autoFocus={false} disabled={false} controls={true} bordered={true} size='middle' />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='c'>
              <Input.Password bordered={true} disabled={false} visibilityToggle={true} placeholder='请输入' size='middle' />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='d'>
              <Input.TextArea autoSize={{
              minRows: 3,
              maxRows: 3
            }} placeholder='请输入' bordered={true} disabled={false} showCount={false} size='middle' />
            </Form.Item>
            <Form.Item label='表单项' name='e' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }}>
              <Select options={[{
              label: 'A',
              value: 'A'
            }, {
              label: 'B',
              value: 'B'
            }, {
              label: 'C',
              value: 'C'
            }]} allowClear={false} autoFocus={false} defaultActiveFirstOption={true} disabled={false} labelInValue={false} showSearch={false} size='middle' loading={false} bordered={true} filterOption={true} optionFilterProp='value' tokenSeparators={[]} className='employeeManagement__Select' />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='f'>
              <Slider defaultValue={30} range={false} disabled={false} dots={false} reverse={false} vertical={false} />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='checked' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='i'>
              <Switch defaultChecked={false} autoFocus={false} disabled={false} loading={false} size='default' />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='j'>
              <TimePicker allowClear={true} autoFocus={false} bordered={true} disabled={false} hideDisabledOptions={false} inputReadOnly={false} use12Hours={false} />
            </Form.Item>
            <Form.Item label='表单项' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' requiredobj={{
            required: '',
            message: ''
          }} typeobj={{
            type: '',
            message: ''
          }} lenobj={{
            max: '',
            min: '',
            message: ''
          }} patternobj={{
            pattern: '',
            message: ''
          }} name='k'>
              <Rate defaultValue={3} allowClear={true} allowHalf={false} autoFocus={false} count={5} disabled={false} tooltips={[]} />
            </Form.Item>
            <Form.Item wrapperCol={{
            offset: 6
          }}>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button className='employeeManagement__Button1'>取消</Button>
            </Form.Item>
          </Form>
        </ProDrawer>
      </Page>;
  }

}

export default EmployeeManagement$Page;