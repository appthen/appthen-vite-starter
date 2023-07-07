import React from 'react';
import { Page, View, Text } from '@disscode/react';
import { ProDrawer } from '@seada/antd-materials';
import { Icon, Form, Input, InputNumber, Button } from '@alilc/antd-lowcode-materials';
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

class ConfigurationForm$Page extends React.Component {
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
      showDrawer: false,
      form: {}
    };
  }

  utils = Object.assign({
    getRoute: utils.createRoute('configurationForm')
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
    console.log('setStateValue: ', e, field, valueField);
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
          <FDPageHeader fullWidth={true} ref={this._refsManager.linkRef('fdpageheader-e35bfed2')} className='configurationForm__page_header'>
            <FDRow width='' className='configurationForm__row_container'>
              <FDCell align='left' verAlign='top' ref={this._refsManager.linkRef('fdcell-63f8f66e')} className='configurationForm__container'>
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
          <FDSection gap={12} ref={this._refsManager.linkRef('fdsection-96d15fb1')} title='' className='configurationForm__region'>
            <FDBlock span={12} className='configurationForm__region__FDBlock'>
              <FDRow width='' gap={10} className='configurationForm__row_container_1'>
                <FDCell align='left' verAlign='top' width='' className='configurationForm__row_container_1__FDCell'>
                  <FDP>
                    <Form labelCol={{
                    span: 6
                  }} wrapperCol={{
                    span: 14
                  }} onValuesChange={(changedValues, allValues) => {
                    this.setStateValue(allValues, {
                      field: 'form'
                    });
                  }} name='basic' ref={this._refsManager.linkRef('form_e39v')} colon={true} hideRequiredMark={false} preserve={true} scrollToFirstError={true} validateMessages={{
                    required: "'${name}' 不能为空"
                  }} values={$eval(() => this.state.form)} className='configurationForm__user_form'>
                      <Form.Item label='用户名' labelAlign='right' colon={true} required={true} noStyle={false} valuePropName='value' name='username' requiredobj={{
                      required: true,
                      message: '必填'
                    }}>
                        <Input placeholder='请输入' />
                      </Form.Item>
                      <Form.Item label='邮箱' labelAlign='right' colon={true} required={false} noStyle={false} valuePropName='value' name='email' requiredobj={{
                      message: '必填'
                    }} typeobj={{
                      message: ''
                    }} lenobj={{
                      max: 0,
                      min: 0,
                      message: ''
                    }} patternobj={{
                      pattern: /^1[3456789]\d{9}$/,
                      message: '请输入正确的手机号'
                    }}>
                        <Input placeholder='请输入' />
                      </Form.Item>
                      <Form.Item label='头像' labelAlign='right' colon={true} noStyle={false} valuePropName='value' name='avatar' requiredobj={{
                      message: '必填'
                    }}>
                        <Input placeholder='请输入' />
                      </Form.Item>
                      <Form.Item label='创建时间' labelAlign='right' colon={true} noStyle={false} valuePropName='value' name='ctime' requiredobj={{
                      message: '必填'
                    }}>
                        <InputNumber placeholder='请输入' />
                      </Form.Item>
                      <Form.Item label='更新时间' labelAlign='right' colon={true} noStyle={false} valuePropName='value' name='utime' requiredobj={{
                      message: '必填'
                    }}>
                        <InputNumber placeholder='请输入' />
                      </Form.Item>
                      <Form.Item wrapperCol={{
                      offset: 6
                    }}>
                        <Button type='primary' htmlType='submit'>
                          提交
                        </Button>
                        <Button className='configurationForm__Button1'>
                          取消
                        </Button>
                      </Form.Item>
                    </Form>
                  </FDP>
                </FDCell>
              </FDRow>
            </FDBlock>
          </FDSection>
          <FDSection gap={12} ref={this._refsManager.linkRef('fdsection-96d15fb1')} title='' className='configurationForm__region_2'>
            <FDBlock span={12} className='configurationForm__block'>
              <FDCell align='left' verAlign='top' width='' className='configurationForm__container_3'>
                <FDP>
                  <Text className='configurationForm__tx'>
                    {$eval(() => JSON.stringify(this.state?.form))}
                  </Text>
                </FDP>
              </FDCell>
            </FDBlock>
          </FDSection>
        </FDPage>
      </Page>;
  }

}

export default ConfigurationForm$Page;