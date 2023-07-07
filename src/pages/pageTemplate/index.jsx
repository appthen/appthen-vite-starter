import React from 'react';
import { Page, View, Modal } from '@disscode/react';
import { ProDrawer } from '@seada/antd-materials';
import { FormilyForm, FormilyInput, FormilyPassword, FormilyNumberPicker, FormilySelect, FormilySwitch, FormilyCheckbox, FormilyTextArea, FormilyUploadDragger } from '@seada/formily-materials';
import { Icon } from '@alilc/antd-lowcode-materials';
import { Page as FDPage, Row as FDRow, Cell as FDCell, P as FDP, Section as FDSection, Block as FDBlock } from '@alifd/layout/lib/index.js';
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

class PageTemplate$Page extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  utils = Object.assign({
    getRoute: utils.createRoute('pageTemplate')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentDidMount() {}

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
          <FDPageHeader fullWidth={true} ref={this._refsManager.linkRef('fdpageheader-e35bfed2')} className='pageTemplate__page_header'>
            <FDRow width='' className='pageTemplate__row_container'>
              <FDCell align='left' verAlign='top' ref={this._refsManager.linkRef('fdcell-63f8f66e')} className='pageTemplate__container'>
                <FDP>
                  <MyHeader title='' />
                </FDP>
              </FDCell>
            </FDRow>
          </FDPageHeader>
          <FDSection gap={12} ref={this._refsManager.linkRef('fdsection-96d15fb1')} className='pageTemplate__region'>
            <FDBlock span={6} className='pageTemplate__region__FDBlock'>
              <FDRow width='' gap={10} className='pageTemplate__row_container_1'>
                <FDCell align='left' verAlign='top' width='' className='pageTemplate__row_container_1__FDCell' />
              </FDRow>
            </FDBlock>
            <FDBlock span={6} className='pageTemplate__block'>
              <FDCell />
            </FDBlock>
          </FDSection>
          <FDPageNav width={260}>
            <View>
              <Sidebar title='' />
            </View>
          </FDPageNav>
        </FDPage>
        <Modal style={{}} animate='pop' renderView={props => <View className='pageTemplate__vw' />} visible={false} maskClosable={true} />
      </Page>;
  }

}

export default PageTemplate$Page;