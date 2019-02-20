"use strict";
var app_key="360065b5abadcaca47ca254f8f5d3f8a";
var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};exports.pushSdk=function(){var Version="4.1.0";var url="plog";var env="pro";var onlineURL=env==="pro"?"https://openapi.xiaoshentui.com":"http://118.89.150.105:3535";var onlineTier=false;var onlineData={};var pageArg=[];var InitData={userInfo:{avatarUrl:"",country:"",city:"",gender:"",language:"",nickName:"",province:""}};wx.request({url:"https://"+url+".xiaoshentui.com/config/app.json",header:{AldStat:"MiniApp-Stat"},method:"GET",success:function success(res){if(res.statusCode===200){if(res.data["push_v"]!=Version){console.warn("小神推sdk已更新,为不影响正常使用,请去官网(http://www.xiaoshentui.com/)下载最新版本")}}}});function sentOpenId(){if(!InitData.openid){return}wx.getSetting({success:function success(res){if(res.authSetting["scope.userInfo"]){wx.getUserInfo({success:function success(res){InitData.userInfo=res.userInfo;push_log(InitData,"setopenid","setopenid")}})}else{push_log(InitData,"setopenid","setopenid")}}})}var pubicFunc={setOpenId:function setOpenId(openid){if(openid.length!==28){console.error("openId位数不对");return}InitData.openid=openid;if(typeof openid!=="string"||openid.length!==28){console.error("openid格式或位数错误");return}sentOpenId()},sentEvent:function sentEvent(obj){if(obj.eventId.length!=32){console.error("eventId位数不对");return}if(obj.arg===undefined||obj.arg===""){delete obj.arg}else{if(checkType(obj.arg)!=="Object"){console.error("arg属性应为空字符串或对象");return}}for(var key in obj.arg){if(_typeof(obj.arg[key])==="object"){console.error("value只能是字符串");return}}InitData.eventId=obj.eventId;InitData.arg=obj.arg;push_log(InitData,"tagEvent")},sendJsCode:function sendJsCode(jscode){if(typeof jscode==="string"){InitData.jscode=jscode}wx.getSetting({success:function success(res){if(res.authSetting["scope.userInfo"]){wx.getUserInfo({success:function success(res){InitData.userInfo=res;push_log(InitData,"user_info","userinfo")}})}else{push_log(InitData,"user_info","userinfo")}}})}};function HookIt1(obj,method,callback){if(obj[method]){var oldMethod=obj[method];obj[method]=function(arg){callback.call(this,arg,method);return oldMethod.call.apply(oldMethod,[this].concat(Array.prototype.slice.call(arguments)))}}else{obj[method]=function(arg){callback.call(this,arg,method)}}}function get_uuid(){var uuid=wx.getStorageSync("t_uuid");if(!uuid){uuid=""+Date.now()+Math.floor(Math.random()*1e7);wx.setStorageSync("t_uuid",uuid);wx.setStorageSync("ifo",1);InitData.ifo=1}else{InitData.ifo=0}return uuid}var wx_request=function wx_request(data,method,uri){if(typeof arguments[1]==="undefined")method="GET";if(typeof arguments[2]==="undefined")uri="d.html";if(JSON.stringify(data).length>=4e3){return}var retryTimes=0;var sendLog=function sendLog(){wx.request({url:"https://"+url+".xiaoshentui.com/"+uri,data:data,header:{},method:method,success:function success(){},fail:function fail(){if(retryTimes<2){retryTimes++;data["retryTimes"]=retryTimes;sendLog()}}})};sendLog()};function push_log(InitData,ev,life){var uuid=get_uuid();var copy_ifo=void 0;if(ev=="app"&&life=="hide"){copy_ifo=wx.getStorageSync("ifo");wx.setStorageSync("ifo",0)}var data={v:Version,uu:uuid,ev:ev,life:life,ak:app_key.replace(/(^\s*)|(\s*$)/g,""),pm:InitData.pm?InitData.pm:0,wvv:InitData.wvv?InitData.wvv:0,wsdk:InitData.wsdk?InitData.wsdk:0,sv:InitData.sv?InitData.sv:0,wv:InitData.wv?InitData.wv:0,nt:InitData.nt?InitData.nt:0,ww:InitData.ww?InitData.ww:0,wh:InitData.wh?InitData.wh:0,pr:InitData.pr?InitData.pr:0,pp:InitData.pp?InitData.pp:0,lat:InitData.lat?InitData.lat:0,lng:InitData.lng?InitData.lng:0,st:InitData.st||0,et:ev=="app"&&life=="hide"?Date.now():0,ppx:InitData.ppx?InitData.ppx:0,ppy:InitData.ppy?InitData.ppy:0,data:ev=="user_info"?InitData.userInfo:0,fid:ev=="fpage"?InitData.fid:0,lang:InitData.lang?InitData.lang:0,wsr:ev=="app"?InitData.appOptions:{},ifo:copy_ifo?copy_ifo:0,jscode:ev!=="user_info"?0:InitData.jscode,ust:Date.now(),openid:InitData.openid?InitData.openid:0,user_info:InitData.userInfo?InitData.userInfo:0,eventid:InitData.eventId,arg:InitData.arg,ele:InitData.ele?InitData.ele:0};wx_request(data,"GET","d.html")}function pushFormSubmit(e){InitData.ppx=e.detail.target.offsetLeft;InitData.ppy=e.detail.target.offsetTop;InitData.fid=e.detail.formId;push_log(InitData,"fpage","clickform")}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement){if(this==null){throw new TypeError}var t=Object(this);var len=t.length>>>0;if(len===0){return-1}var n=0;if(arguments.length>1){n=Number(arguments[1]);if(n!=n){n=0}else if(n!=0&&n!=Infinity&&n!=-Infinity){n=(n>0||-1)*Math.floor(Math.abs(n))}}if(n>=len){return-1}var k=n>=0?n:Math.max(len-Math.abs(n),0);for(;k<len;k++){if(k in t&&t[k]===searchElement){return k}}return-1}}function checkType(arg){return Object.prototype.toString.call(arg).slice(8,-1)}if(wx.xst){console.error("wx.xst can't be defined twice!")}else{Object.defineProperty(wx,"xst",{configurable:false,set:function set(){console.error("cant't rewrite wx.xst")},get:function get(){return pubicFunc}})}function weaOnlinePushLayer(){var resSystem=wx.getSystemInfoSync();var data={app_key:app_key,uuid:wx.getStorageSync("t_uuid"),openid:InitData.openid?InitData.openid:"",os:resSystem.model,device:resSystem.brand};console.log('debug', InitData, InitData.openid, data);wx.request({url:onlineURL+"/inapp_push",method:"GET",header:{"content-type":"application/json"},data:data,success:function success(res){if(res.data.code==200){onlineTier=true;onlineData=res.data.data;onlineData["isShow"]=true}}})}function atDetails(e){var _this=this;var elData=e.currentTarget.dataset;var isShow=onlineData;var resSystem=wx.getSystemInfoSync();var data={app_key:app_key,uuid:wx.getStorageSync("t_uuid"),os:resSystem.model,device:resSystem.brand,msg_key:elData["msgkey"]?elData["msgkey"]:""};if(elData["msgkey"]){wx.request({url:onlineURL+"/inapp_click_count",method:"GET",header:{"content-type":"application/json"},data:data,success:function success(res){}})}if(elData.type==1){wx.navigateTo({url:"/"+elData["acdetail"],success:function success(){isShow["isShow"]=false;_this.setData({onlineData:isShow})},fail:function fail(res){wx.switchTab({url:"/"+elData["acdetail"],success:function success(){isShow["isShow"]=false;_this.setData({onlineData:isShow})}})}})}else if(elData.type==3){wx.navigateToMiniProgram({appId:elData["apd"],path:"/"+elData["acdetail"],success:function success(res){isShow["isShow"]=false;_this.setData({onlineData:isShow})}})}else if(elData.type==4){isShow["isShow"]=false;_this.setData({onlineData:isShow})}}function colseOneBox(){var isShow=onlineData;isShow["isShow"]=false;this.setData({onlineData:isShow})}try{var res=wx.getSystemInfoSync();InitData.pm=res.model;InitData.pr=res.pixelRatio;InitData.ww=res.screenWidth;InitData.wh=res.screenHeight;InitData.lang=res.language;InitData.wv=res.version;InitData.wvv=res.platform;InitData.wsdk=typeof res["SDKVersion"]==="undefined"?"1.0.0":res["SDKVersion"];InitData.sv=res.system}catch(e){}wx.getNetworkType({success:function success(res){InitData.nt=res.networkType}});return function(miniProLife,at){try{var ohterApp,ohterPage;at==="App"?ohterApp=miniProLife:ohterPage=miniProLife}catch(e){}function pushAppOnLaunch(options){get_uuid();if(typeof options!="undefined"){InitData.appOptions=options;InitData.pp=options["path"]}else{InitData.appOptions={}}if(app_key){if(!wx.getStorageSync("t_appkey")){wx.setStorageSync("t_appkey",app_key)}}}function pushAppOnShow(options){if(typeof options!="undefined"){InitData.appOptions=options}else{InitData.appOptions={}}weaOnlinePushLayer()}function pushAppOnHide(){sentOpenId();push_log(InitData,"app","hide")}function pushPageOnShow(options){var _t=this;InitData.st=Date.now();InitData.pp=this["__route__"];if(_t.onShareAppMessage){var oldShare=_t.onShareAppMessage;var element;_t.onShareAppMessage=function(res){if(res.from==="button"){element="button"}else{element="menu"}InitData.ele=element;push_log(InitData,"share");return oldShare(res)}}setTimeout(function(){if(onlineData["isShow"]&&onlineTier){_t.setData({onlineTier:onlineTier,onlineData:onlineData});if(!_t.colseOneBox){HookIt1(_t,"atDetails",atDetails);HookIt1(_t,"colseOneBox",colseOneBox)}}},2e3)}function pushPageOnHide(options){var app=this;if(typeof options!="undefined"){app.options=options}InitData.pp=app["__route__"];if(onlineData["isShow"]){onlineTier=false;onlineData={};this.setData({onlineTier:onlineTier,onlineData:onlineData})}}var pushApp=function pushApp(arg){HookIt1(arg,"onLaunch",pushAppOnLaunch);HookIt1(arg,"onShow",pushAppOnShow);HookIt1(arg,"onHide",pushAppOnHide);ohterApp?ohterApp(arg):App(arg)};var pushPage=function pushPage(arg){HookIt1(arg,"onShow",pushPageOnShow);HookIt1(arg,"onHide",pushPageOnHide);HookIt1(arg,"pushFormSubmit",pushFormSubmit);ohterPage?ohterPage(arg):Page(arg)};return{App:pushApp,Page:pushPage}}}();
