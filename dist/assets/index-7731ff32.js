var x=Object.defineProperty;var y=(_,n,s)=>n in _?x(_,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):_[n]=s;var r=(_,n,s)=>(y(_,typeof n!="symbol"?n+"":n,s),s);import{R as b,j as e}from"./index-0e900c2b.js";import{u as f,r as M,_ as S,l as t,I as m}from"./index-06395fc0.js";const j='<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"><path fill="#98b0f5" d="M7 23q-.825 0-1.413-.588T5 21V3q0-.825.588-1.413T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.588 1.413T17 23H7Zm5-2.5q.425 0 .713-.288T13 19.5q0-.425-.288-.713T12 18.5q-.425 0-.713.288T11 19.5q0 .425.288.713T12 20.5ZM7 16h10V6H7v10Z"/></svg>',V='<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"><g fill="none" stroke="#98b0f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m4 15l3 3l3-3M7 6v12m10-4a2 2 0 0 1 2 2v3a2 2 0 1 1-4 0v-3a2 2 0 0 1 2-2zm-2-9a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M19 5v3a2 2 0 0 1-2 2h-1.5"/></g></svg>',N='<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"><path fill="#98b0f5" fill-rule="evenodd" d="M3.172 5.172C2 6.343 2 8.229 2 12c0 3.771 0 5.657 1.172 6.828C4.343 20 6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172C22 17.657 22 15.771 22 12c0-3.771 0-5.657-1.172-6.828C19.657 4 17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172ZM12.75 10a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 0 0-.75 1.298l.607.35l-.607.351a.75.75 0 1 0 .75 1.3l.607-.351V14a.75.75 0 0 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3L13.5 12l.607-.35a.75.75 0 0 0-.75-1.3l-.607.35V10Zm-6.017-.75a.75.75 0 0 1 .75.75v.7l.606-.35a.75.75 0 0 1 .75 1.3l-.607.35l.607.35a.75.75 0 1 1-.75 1.3l-.606-.35v.7a.75.75 0 0 1-1.5 0v-.701l-.608.35a.75.75 0 0 1-.75-1.298L5.232 12l-.607-.35a.75.75 0 1 1 .75-1.3l.608.351V10a.75.75 0 0 1 .75-.75Zm11.285.75a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 0 0-.75 1.298l.607.35l-.608.351a.75.75 0 0 0 .75 1.3l.608-.351V14a.75.75 0 0 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3l-.607-.35l.607-.35a.75.75 0 0 0-.75-1.3l-.607.35V10Z" clip-rule="evenodd"/></svg>',p={svg_aila7c:j,svg_1fnveg:V,svg_uiu4w9:N};const{px:h,RefsManager:C,$eval:a,$evalArray:I,$createChildContext:q}=f;class D extends b.Component{constructor(s,c){super(s);r(this,"_dataSourceConfig",this._defineDataSourceConfig());r(this,"_dataSourceEngine",f.dataSource(this._dataSourceConfig,this,{runtimeConfig:!0,requestHandlersMap:{fetch:M()}}));r(this,"reloadDataSource",async()=>{await this._dataSourceEngine.reloadDataSource()});r(this,"utils",Object.assign({getRoute:f.createRoute("register")},f));r(this,"constants",S);r(this,"_refsManager",new C);r(this,"$",s=>this._refsManager.get(s));r(this,"$$",s=>this._refsManager.getAll(s));this.state={req:{},isMobile:!1,countdown:0,getCode:{},req_1:{}}}get dataSourceMap(){return this._dataSourceEngine.dataSourceMap||{}}_defineDataSourceConfig(){const s=this;return{list:[{id:"req",isInit:function(){return!1},isSync:!1,type:"fetch",options:function(){return{uri:s.constants.HostDomain+"/system_user_register",contentType:"JSON",method:"POST",params:{password:s.state.password,phone:s.state.account,code:s.state.code},headers:{}}}},{id:"getCode",isInit:function(){return!1},isSync:!1,type:"fetch",options:function(){return{uri:s.constants.HostDomain+"/system_user_phone",contentType:"JSON",method:"POST",params:{phone:s.state.account},headers:{},timeout:15e3}}},{id:"req_1",isInit:function(){return!1},isSync:!1,type:"fetch",options:function(){return{uri:s.constants.HostDomain+"/system_user_login",contentType:"JSON",method:"POST",params:{type:"phone",code:s.state.code,phone:s.state.account},headers:{}}}}]}}componentWillUnmount(){clearTimeout(this.timer)}setStateValue(s,{field:c,valueField:l,indexs:o},d){const i={...this.state};let v=s;l&&(v=l.split(".").reduce((w,g)=>w&&w[g],s));const u=(o==null?void 0:o.length)>0?c.replace(/\.\[\]/g,w=>`[${o.shift()}].`).replace(".[item]",""):c;this.utils.setValue(i,u,v),this.setState(i,d)}async register(s){var v,u;const{account:c,password:l,code:o}=this.state;if(!c||!l)return this.utils.message.error("请填写用户名、密码");const d=this.utils.message.loading(),i=await((v=this.dataSourceMap.req)==null?void 0:v.load());if(d(),i.code===0){const w=await((u=this.dataSourceMap.req_1)==null?void 0:u.load());if(w.code===0){const g=w.data;localStorage.setItem("accessToken",g),this.utils.setGlobalData("accessToken",g),this.utils.navigateTo("projectManagement"),this.utils.message.success("登录成功")}else this.utils.message.error(i.msg||"登录失败"),this.utils.navigateTo("login")}else this.utils.message.error(i.msg||"注册失败")}async getVerificationCode(s){var o,d,i;if(((o=this.state.account)==null?void 0:o.length)!==11)return this.utils.message.error("请输入正确的手机号");if(this.state.countdown>0)return this.utils.message.error("请稍等");const c=this.utils.message.loading(),l=await((d=this.dataSourceMap.getCode)==null?void 0:d.load());if(c(),(l==null?void 0:l.code)!==0)return this.utils.message.error((i=this.state.getCode)==null?void 0:i.msg);this.setState({countdown:60}),this.timer=setInterval(()=>{this.decreaseCountdown()},1e3)}decreaseCountdown(){this.setState(s=>({countdown:s.countdown-1}),()=>{this.state.countdown<1&&(clearInterval(this.timer),this.timer=null)})}componentDidMount(){this._dataSourceEngine.reloadDataSource(),this.utils.checkMobileTerminal()&&this.setState({isMobile:!0});const s=this.utils.preload("LOGIN_FORM");s&&this.setState(s)}render(){return e.jsx(t.Page,{statusBarMode:"light",children:e.jsxs(t.View,{inlineStyle:[{enable:a(()=>this.state.isMobile),name:"动态样式1",style:{display:"flex",flexDirection:"column"}}],className:"register__vw",children:[e.jsx(t.View,{inlineStyle:[{enable:a(()=>this.state.isMobile),name:"动态样式1",style:{flex:0}}],className:"register__vw__vw M-flex-item",children:e.jsx(t.Image,{style:a(()=>this.state.isMobile?{width:"auto",height:h(100)}:{width:"80%"}),src:"https://file.mengti.cc/FqgZfRkiyyY6CjhQ3eY4i4Z49HFv",remote:!1,fit:!1})}),e.jsx(t.View,{inlineStyle:[{enable:a(()=>this.state.isMobile),name:"动态样式1",style:{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start",paddingTop:h(30),paddingLeft:h(20),paddingRight:h(20),borderBottomLeftRadius:h(0),borderColor:"#c1c1c1"}}],className:"register__vw__vw1 M-flex-item",children:e.jsxs(t.View,{inlineStyle:[{enable:a(()=>this.state.isMobile),name:"动态样式1",style:{width:"100%"}}],className:"register__vw__vw1__vw",children:[e.jsx(t.View,{children:e.jsx(t.Text,{className:"register__tx",children:"验证手机号注册"})}),e.jsx(t.View,{className:"register__vw__vw1__vw__vw1",children:e.jsx(t.Text,{ref:this._refsManager.linkRef("text-ac6a8287"),className:"register__vw__vw1__vw__vw1__tx"})}),e.jsxs(t.View,{ref:this._refsManager.linkRef("view-fe1bddac"),children:[e.jsxs(t.View,{ref:this._refsManager.linkRef("view-6d99607f"),className:"register__vw_1",children:[e.jsx(t.View,{className:"register__vw_1__vw",children:e.jsx(t.AtIcon,{color:"#98b0f5",size:22,svg:p.svg_aila7c})}),e.jsx(t.View,{ref:this._refsManager.linkRef("view-6c65f6d1"),className:"register__vw_1__vw1 M-flex-item",children:e.jsx(m,{placeholder:"手机号",bordered:!1,disabled:!1,allowClear:!0,value:a(()=>this.state.account),onChange:function(){return this.setStateValue.apply(this,Array.prototype.slice.call(arguments).concat([{field:"account",valueField:"target.value"}]))}.bind(this),className:"register__vw_1__vw1__Input"})})]}),e.jsxs(t.View,{ref:this._refsManager.linkRef("view-6d99607f"),className:"register__vw1",children:[e.jsx(t.View,{className:"register__vw1__vw",children:e.jsx(t.AtIcon,{color:"#98b0f5",size:22,svg:p.svg_1fnveg})}),e.jsx(t.View,{ref:this._refsManager.linkRef("view-6c65f6d1"),className:"register__vw1__vw1 M-flex-item",children:e.jsx(m,{placeholder:"验证码",bordered:!1,disabled:!1,allowClear:!0,value:a(()=>this.state.code),onChange:function(){return this.setStateValue.apply(this,Array.prototype.slice.call(arguments).concat([{field:"code",valueField:"target.value"}]))}.bind(this),className:"register__vw1__vw1__Input"})}),e.jsx(t.View,{ref:this._refsManager.linkRef("view-6c65f6d1"),className:"register__vw1__vw2",children:e.jsxs(t.View,{className:"register__vw1__vw2__vw",ref:this._refsManager.linkRef("view-f7d71db3"),onClick:function(){return this.getVerificationCode.apply(this,Array.prototype.slice.call(arguments).concat([]))}.bind(this),inlineStyle:[{enable:a(()=>this.state.countdown>0),name:"动态样式1",style:{backgroundColor:"#eaeaea",borderColor:"#d6d6d6",borderWidth:h(1),borderStyle:"solid"}}],children:[e.jsx(t.Text,{inlineStyle:[{enable:a(()=>this.state.countdown>0),name:"动态样式1",style:{color:"#767676"}}],className:"register__vw1__vw2__vw__tx",children:a(()=>this.state.countdown>0?`${this.state.countdown} 秒后重新获取`:"获取验证码")}),e.jsx(t.View,{className:"register__vw1__vw2__vw__vw1"})]})})]})]}),e.jsxs(t.View,{className:"register__vw__vw1__vw__vw3",children:[e.jsx(t.View,{className:"register__vw__vw1__vw__vw3__vw",children:e.jsx(t.AtIcon,{color:"#98b0f5",size:24,svg:p.svg_uiu4w9})}),e.jsx(t.View,{className:"register__vw__vw1__vw__vw3__vw1 M-flex-item",children:e.jsx(m.Password,{bordered:!1,disabled:!1,visibilityToggle:!0,placeholder:"密码",value:a(()=>this.state.password),onChange:function(){return this.setStateValue.apply(this,Array.prototype.slice.call(arguments).concat([{field:"password",valueField:"target.value"}]))}.bind(this),onPressEnter:function(){return this.register.apply(this,Array.prototype.slice.call(arguments).concat([]))}.bind(this),className:"register__vw__vw1__vw__vw3__vw1__Input.Password"})})]}),e.jsxs(t.View,{className:"register__vw__vw1__vw__vw4",children:[e.jsx(t.View,{onClick:s=>{this.utils.navigateTo("login")},className:"register__vw__vw1__vw__vw4__vw M-gb-click",children:e.jsx(t.Text,{className:"register__vw__vw1__vw__vw4__vw__tx",children:"已有账号？去登录"})}),e.jsx(t.View,{className:"register__vw__vw1__vw__vw4__vw1 M-flex-item"})]}),e.jsxs(t.View,{onClick:function(){return this.register.apply(this,Array.prototype.slice.call(arguments).concat([]))}.bind(this),className:"register__vw__vw1__vw__vw5 M-gb-click",children:[e.jsx(t.Text,{className:"register__vw__vw1__vw__vw5__tx",children:"确认注册"}),e.jsx(t.View,{className:"register__vw__vw1__vw__vw5__vw1"})]})]})})]})})}}export{D as default};
