(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e5c2c1c0"],{"0aea":function(t,e,i){},"1e53":function(t,e,i){},4690:function(t,e,i){"use strict";var s=i("e671"),n=i.n(s);n.a},"5b9e":function(t,e,i){"use strict";var s=i("1e53"),n=i.n(s);n.a},7415:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"detail"},[i("el-breadcrumb",{staticClass:"postnav",attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[i("i",{staticClass:"el-icon-map-location"}),t._v("\n      首页\n    ")]),2==t.navList.length?i("span",[i("el-breadcrumb-item",{attrs:{to:{path:t.navList[0].url}}},[t._v(t._s(t.navList[0].name))]),i("el-breadcrumb-item",{attrs:{to:{path:t.navList[1].url}}},[t._v(t._s(t.navList[1].name))])],1):i("span",[i("el-breadcrumb-item",{attrs:{to:{path:t.navList[0].url}}},[t._v(t._s(t.navList[0].name))])],1)],1),i("el-popover",{attrs:{placement:"left",trigger:"hover"}},[i("ul",{staticClass:"sectionList"},t._l(t.section,function(e,s){return i("li",{key:s,staticClass:"listLi"},[i("label",{staticClass:"fl"},[t._v(t._s(e.name))]),e.childList.length>0?i("div",{staticClass:"childUL"},t._l(e.childList,function(e,s){return i("router-link",{key:s,attrs:{to:{path:"/disList/"+e.id},tag:"a",target:"_blank"}},[t._v(t._s(e.name))])}),1):t._e()])}),0),i("el-button",{staticClass:"sectionBtn fr",attrs:{slot:"reference",size:"small"},slot:"reference"},[t._v("版块切换")])],1),i("keep-alive",[i("content-list")],1)],1)},n=[],a=(i("96cf"),i("3b8d")),r=i("24a3"),o=i("3191"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"content board-box"},[s("div",{staticClass:"ov commit"},[s("div",{ref:"detailLeft",staticClass:"detailLeft fl"},[s("div",{staticClass:"detailLeft_top"},[s("span",[t._v("查看："),s("span",{staticClass:"highlight-color"},[t._v(t._s(t.detail.viewcount))])]),s("span",{staticClass:"pipe"},[t._v("|")]),s("span",[t._v("回复："),s("span",{staticClass:"highlight-color"},[t._v(t._s(t.detail.replycount))])])]),s("div",{staticClass:"detailLeft_content"},[s("h3",{staticClass:"author"},[t._v(t._s(t.detail.nickName))]),s("div",{staticClass:"avatar"},[s("a",{attrs:{href:"javascript:;"}},[s("el-image",{staticStyle:{width:"130px",height:"130px"},attrs:{src:t.$IMG_URL+t.detail.userImgUrl,fit:"contain"}},[s("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline"})])])],1)]),s("ul",{staticClass:"otherinfo"},[s("li",[s("label",{staticClass:"fl"},[t._v("组别")]),s("span",{staticClass:"admin"},[t._v(t._s(t.detail.vip?"管理员":"用户"))])]),s("li",[s("label",{staticClass:"fl"},[t._v("用户等级")]),s("span",[t._v(t._s(t.detail.userLvl))])]),s("li",[s("label",{staticClass:"fl"},[t._v("用户积分")]),s("span",[t._v(t._s(t.detail.userPoints))])]),s("li",[s("label",{staticClass:"fl"},[t._v("经验值")]),s("span",{staticClass:"progress"},[s("el-progress",{attrs:{"text-inside":!0,"stroke-width":15,percentage:parseInt(this.detail.userPoints/this.detail.nextLvlPoints*100)||0}})],1)])])])]),s("div",{staticClass:"detailRight fr"},[s("div",{staticClass:"detailRight_info"},[s("div",{staticClass:"detailRight_info_title"},[t._v(t._s(t.detail.title))]),s("div",{ref:"detailRight_info_content",staticClass:"detailRight_info_content ov"},[s("div",{staticClass:"pi"},[s("img",{staticClass:"authincn vm",attrs:{src:i("983b")}}),s("em",[t._v("楼主 | 发表于 "),s("span",{staticClass:"highlight-color"},[t._v(t._s(t._f("dateNewComment")(t.detail.ctime)))])]),s("strong",[t._v("楼主")])]),s("div",{staticClass:"contentDetail"},[s("p",{ref:"contentDetail",domProps:{innerHTML:t._s(t.detail.content)}})])])]),s("div",{staticClass:"detailRight_site"},[s("a",{staticClass:"replayBtn",on:{click:function(e){return t.addReplay(t.detail.id)}}},[t._v("回复")]),s("p",{staticClass:"fr"})])])]),t._l(t.replyList,function(e,n){return s("div",{key:n.id,staticClass:"ov commit replay"},[s("div",{staticClass:"detailLeft fl"},[s("div",{staticClass:"detailLeft_content"},[s("h3",{staticClass:"author"},[t._v(t._s(e.nickname))]),s("div",{staticClass:"avatar"},[s("a",{attrs:{href:""}},[s("el-image",{staticStyle:{width:"130px",height:"130px"},attrs:{src:t.$IMG_URL+e.userImgUrl,fit:"contain"}},[s("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline"})])])],1)]),s("ul",{staticClass:"otherinfo"},[s("li",[s("label",{staticClass:"fl"},[t._v("组别")]),s("span",{staticClass:"admin"},[t._v(t._s(e.vip?"管理员":"用户"))])]),s("li",[s("label",{staticClass:"fl"},[t._v("用户等级")]),s("span",[t._v(t._s(e.userLvl))])]),s("li",[s("label",{staticClass:"fl"},[t._v("用户积分")]),s("span",[t._v(t._s(e.userPoints))])]),s("li",[s("label",{staticClass:"fl"},[t._v("经验值")]),s("span",{staticClass:"progress"},[s("el-progress",{attrs:{"text-inside":!0,"stroke-width":15,percentage:parseInt(e.userPoints/e.nextLvlPoints*100)||0}})],1)])])])]),s("div",{staticClass:"detailRight fr"},[s("div",{staticClass:"detailRight_info"},[s("div",{staticClass:"detailRight_info_content"},[s("div",{staticClass:"pi"},[s("img",{staticClass:"authincn vm",attrs:{src:i("983b")}}),s("em",[t._v(t._s(e.nickname)+" | 发表于 "),s("span",{staticClass:"highlight-color"},[t._v(t._s(t._f("dateTime")(e.ctime)))])]),s("strong",[t._v(t._s((t.page-1)*t.limit+n+2)+"楼")])]),s("div",{staticClass:"contentDetail"},[null!=e.replyModel?s("div",{staticClass:"quote"},[s("blockquote",[t._v("\r\n                               "+t._s(e.replyModel.nickname)+" 表示于 "+t._s(t._f("dateNewComment")(t.detail.ctime))+"\r\n                                "),s("strong",[t._v("楼层"+t._s(e.buildingno))]),s("br"),s("p",{domProps:{innerHTML:t._s(e.content)}})]),s("p",{staticClass:"replyContent",domProps:{innerHTML:t._s(e.replyModel.content)}})]):s("p",{domProps:{innerHTML:t._s(e.content)}})])])]),s("div",{staticClass:"detailRight_site"},[s("a",{staticClass:"replayBtn",on:{click:function(i){return t.addReplayIndex(t.detail.id,e.cid,e.nickname,e.id,n+2,e.content,e.ctime)}}},[t._v("回复")]),t.loginStatus&&1==e.isavailable?s("p",{staticClass:"fr"},[s("i",{staticClass:"el-icon-delete",on:{click:function(i){return t.delDis(e.id)}}},[t._v("删除")])]):t._e()])])])})],2),s("div",{staticClass:"page"},[s("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev,pager,next,jumper","page-size":10,total:t.count},on:{"current-change":t.handleCurrentChange}})],1),s("editortwo",{ref:"ue",attrs:{defaultMsg:t.defaultMsg,config:t.config}}),s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:4}},[s("el-button",{staticClass:"add",attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.reply(t.detail.id)}}},[t._v("发表回复")])],1)],1),s("show-reply",{attrs:{replyDialog:t.replyDialog,topicid:t.topicid,replyContent:t.replyContent,noShow:t.noShow,sectionid:t.sectionid},on:{cancel:t.cancel,getNewList:t.getNewList}})],1)},c=[],u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("script",{attrs:{id:"editorTwo",type:"text/plain"}})},d=[],p=(i("8068"),i("4dda"),i("b7c8"),{name:"UETwo",data:function(){return{editor:null}},props:{defaultMsg:{type:String},config:{type:Object}},mounted:function(){this.initEditor()},watch:{defaultMsg:function(t,e){this.editor.setContent(t)}},methods:{initEditor:function(){var t=this;this.$nextTick(function(){var e=t;t.editor=UE.getEditor("editorTwo",t.config),t.editor.addListener("ready",function(){e.editor.setHeight(300),e.$emit("ready",e.editor)})})},getUEContent:function(){return this.editor.getContent()},clearContent:function(){return this.editor.execCommand("cleardoc")}},destroyed:function(){this.editor.destroy()}}),h=p,f=i("2877"),g=Object(f["a"])(h,u,d,!1,null,null,null),A=g.exports,m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{visible:t.replyDialog,title:"回复贴子",center:"","before-close":t.cancel}},[i("div",{staticClass:"editor-container"},[t.noShow?i("div",{staticClass:"reply"},[i("div",{staticClass:"replyname"},[i("em",[t._v(t._s(t.replyContent.replyusername))]),i("em",[t._v("发表于:")]),t._v("\n                    "+t._s(t._f("dateTime")(t.replyContent.ctime))+"\n\n                    ")]),i("p",{staticClass:"content",domProps:{innerHTML:t._s(t.replyContent.content)}})]):t._e(),i("ueditor",{ref:"ueditor",attrs:{defaultMsg:t.defaultMsg,config:t.config}}),i("el-button",{staticClass:"add",attrs:{type:"primary",size:"medium"},on:{click:t.replay}},[t._v("发表回复")])],1)])],1)},v=[],C=i("b676"),y={name:"replay",props:["replyDialog","topicid","replyContent","noShow","sectionid"],components:{ueditor:C["a"]},data:function(){return{defaultMsg:"",config:{toolbars:[["undo","redo","removeformat","formatmatch","|","paragraph","fontsize","|","bold","italic","underline","|","insertorderedlist","insertunorderedlist","|","indent","justifyleft","justifycenter","justifyright","justifyjustify","|","simpleupload","horizontal","|"]],insertorderedlist:{decimal:"1,2,3...","lower-alpha":"a,b,c...","lower-roman":"i,ii,iii...","upper-alpha":"A,B,C...","upper-roman":"I,II,III..."},insertunorderedlist:{circle:"○ 大圓圈",disc:"● 小黑點",square:"■ 小方塊 ",dash:"— 破折號"},paragraph:{h2:"标题 1",h3:"标题 2",h4:"标题 3"},fontsize:[14,16,18,20,24]},data:{}}},methods:{cancel:function(){this.$emit("cancel",!1)},replay:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$refs.ueditor.getUEContent(),this.noShow?this.data={sectionid:this.sectionid,topicid:this.replyContent.topicid,content:e,replyuserid:this.replyContent.replyuserid,replyusername:this.replyContent.replyusername,replyid:this.replyContent.replyid,buildingno:this.replyContent.buildingno}:this.data={sectionid:this.sectionid,topicid:this.topicid,content:e},t.next=4,r["b"](this.data).then(function(t){0==t.code&&(i.$message({message:"回复成功",type:"success"}),i.$refs.ueditor.clearContent(),i.$emit("getNewList"))});case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},_=y,w=(i("4690"),Object(f["a"])(_,m,v,!1,null,"4c163fcd",null)),R=w.exports,b={name:"detail",data:function(){return{detail:[],defaultMsg:"",replyList:[],wrapperHeight:"",count:0,page:1,replyDialog:!1,topicid:"",loginStatus:!1,noShow:!1,limit:10,sectionid:0,replyContent:{},config:{toolbars:[["undo","redo","removeformat","formatmatch","|","paragraph","fontsize","|","bold","italic","underline","|","insertorderedlist","insertunorderedlist","|","indent","justifyleft","justifycenter","justifyright","justifyjustify","|","simpleupload","horizontal","|"]],insertorderedlist:{decimal:"1,2,3...","lower-alpha":"a,b,c...","lower-roman":"i,ii,iii...","upper-alpha":"A,B,C...","upper-roman":"I,II,III..."},insertunorderedlist:{circle:"○ 大圓圈",disc:"● 小黑點",square:"■ 小方塊 ",dash:"— 破折號"},paragraph:{h2:"标题 1",h3:"标题 2",h4:"标题 3"},fontsize:[14,16,18,20,24]}}},components:{showReply:R,editortwo:A},methods:{getNewList:function(){this.replyDialog=!1,console.log(this.$route.params.id),this.getDetailReply(this.$route.params.id)},cancel:function(t){this.replyDialog=t},reply:function(t){if(this.loginStatus){var e={topicid:t,content:this.$refs.ue.getUEContent()};this.commonReply(e)}else this.$router.push({path:"/login"})},commonReply:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this,console.log(this.$refs.ue.editor),t.next=4,r["b"](e).then(function(t){console.log(t),0==t.code&&(i.$message({message:"回复成功",type:"success"}),i.getDetailReply(i.$route.params.id),i.$refs.ue.clearContent())});case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),goBack:function(){window.history.back(-1)},handleCurrentChange:function(t){this.page=t,document.body.scrollTop=document.documentElement.scrollTop=0,this.getDetailReply(this.$route.params.id)},delDis:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$confirm("确定要删除该楼层的回复么？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r["c"]({id:e}).then(function(t){0==t.code&&(i.$message({type:"success",message:"删除成功!"}),i.getDetailReply(i.$route.params.id))})}).catch(function(){i.$message({type:"info",message:"已取消删除"})});case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),addReplay:function(t){this.loginStatus?(this.noShow=!1,this.topicid=t,this.replyDialog=!0):this.$router.push({path:"/login"})},addReplayIndex:function(t,e,i,s,n,a,r){this.replyContent={topicid:t,replyuserid:e,replyusername:i,replyid:s,buildingno:n,content:a,ctime:r},this.loginStatus?(this.replyDialog=!0,this.noShow=!0):this.$router.push({path:"/login"})},getDetail:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["d"](e).then(function(t){var e=t.data;0==t.code&&(i.detail=e)});case 2:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),getDetailReply:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["e"]({topicid:e,page:this.page,limit:this.limit}).then(function(t){var e=t.data;console.log(t),0==t.code&&(i.replyList=e,i.count=t.count)});case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),init:function(){var t=this.$getCookie("uInfo"),e=JSON.parse(t);console.log(e),e&&e.token?this.loginStatus=!0:this.loginStatus=!1},updateCount:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["f"](e).then(function(t){console.log(t)});case 2:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()},mounted:function(){var t=this;this.$nextTick(function(){t.wrapperHeight=t.$refs.detailLeft.clientHeight})},created:function(){this.updateCount(this.$route.params.id),this.init(),this.getDetail(this.$route.params.id),this.getDetailReply(this.$route.params.id),this.sectionid=this.$route.query.sectionid,console.log(JSON.parse(sessionStorage.getItem("navList")))}},L=b,k=(i("5b9e"),Object(f["a"])(L,l,c,!1,null,"f38aa720",null)),x=k.exports,S={name:"detail",components:{contentList:x},data:function(){return{navList:[],detail:{},section:{}}},methods:{sitDiscuzz:function(){},getDetail:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["d"](e).then(function(t){var e=t.data;0==t.code&&(i.detail=e,i.navList.push({url:i.$route.path,name:i.detail.title}))});case 2:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),getSection:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["b"]().then(function(t){var i=t.data;0==t.code&&(e.section=i)});case 2:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}()},created:function(){this.getSection(),sessionStorage.getItem("navList")&&(this.navList=JSON.parse(sessionStorage.getItem("navList"))),this.getDetail(this.$route.params.id)}},M=S,T=(i("efce"),Object(f["a"])(M,s,n,!1,null,"9398e552",null));e["default"]=T.exports},"983b":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAZCAMAAADpC5XfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAb9QTFRF/5sA/50A/3cA/4gA/4EA/64A/4sA/4YA/5AA/4MA/7UA/6wA/7wA/44A+6xl/3gA/65GRBEA/9qT/+Gk/60APREA/9yZ+rNz/5Qk/7RQJw8A+cic+65o/8Vr+cid/9OE/6E1/5os/9aM/8pzQxEA/6g9/ZU4KRIA/3oE/4EP/4cV/7pYKw4ALRIA/7MA/3YAJREA/40c/3UA/3sJ/898/9+fShgA/70A/8BiPhUAMA4A/7EANAwAPBgAQA4AORYAOQ8ALw8A/78ASg0AUAoAOxAANhEARRYARRIATRgASRkARAsAQxgAMQ8ASRIAOg0AUxMAQxIAPRIAVBEATBYALgsAVBIAURMARBAALBIAShkA/7cAUxAAPxEARBgATgsALQsAQA0AVhIATQwAPhQAOhgARBYALRMANBEARQ4ATgwAOA8AVhcARRMALBAAKw8APBEA+cGONQ0AOBYANw4AUBoAShcAUBQANwwA/68A/8AAPQsATwsAQBEASQ8ATA0AQg4AMBEAQRMASQwALxAAVxEAPA8A/6AA/5MA/5gA/5YA/6IA/3oA/6kA/6UA/3wA/6cA/34A/+Ko/3kA////yCXP9AAAAJV0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wA2ZBs4AAABT0lEQVR42mTRZVcCQRiGYXR1A10WUJBuECSkwe7u7u7u7gTFHn6w7+56jucs94eZZ66vI5KgzCQi9JMZAn0XxmrBl7AC0MiHsAioMsXlL/Z6+ZVSgsoTbP4VT1dVDTcTclBLFluxp7l/avqc2xZQo4htbEnRehSt57YRNPzCddA5Ho3FuBkGtb7y5UP8soLqk8mkZvsOzuTG4T576UHjJKl5nC1bbKpdblG0P5MkGQd10/TOUE/13MVWn1g82jZB025QNY7XVd5eNzyciMU4fuzDcTWoFMNWT9du1mfmfRiGySowTApqJ4jy+46Fy8anXoK4sp0RhB3URFHUbvfI8MDk5qDMVlhIUSZQcw6Uy5UHwcMMqvoWpgINfAoLgJa88cEv/q0SUFc2xCCddk+rQwz7cIGGgqUMKkrzFSGmNBhCIokTOQzp/wwO5JT8CjAAojTCdojZuDEAAAAASUVORK5CYII="},e671:function(t,e,i){},efce:function(t,e,i){"use strict";var s=i("0aea"),n=i.n(s);n.a}}]);