<template>
  <script id="editor" type="text/plain"></script>
</template>
<script>
  /* eslint-disable */
  import '../../../public/editor/ueditor.config.js';
  import '../../../public/editor/ueditor.all.js';
  import '../../../public/editor/lang/zh-cn/zh-cn.js';
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
     
    },
    mounted() {
      this.initEditor() 
    },
    watch:{
        defaultMsg:function(newval,oldval){
          console.log(newval)
            this.editor.setContent(newval);
        }
    },
    methods: {
      initEditor(){
          this.$nextTick(()=>{
              const _this = this;
              this.editor = UE.getEditor('editor',this.config); // 初始化UE
              this.editor.addListener("ready", ()=>{
                  _this.editor.setHeight(300);
                  _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
                  _this.$emit('ready',_this.editor)
                
              });
              UE.getEditor('editor').commands['hide']={
                execCommand:function(){
                  var dfg = UE.getEditor('editor').selection.getRange().cloneContents();
                  var temp='';
                  console.log(dfg.childNodes);
                  var node=dfg.childNodes;
                  for(let i=0;i<node.length;i++){
                    console.log(node[i].nodeName)
                    if(node[i].nodeName.indexOf("#text") != -1){
                        temp=temp+node[i].nodeValue;
                    }else{
                        console.log(node[i].outerHTML)
                        temp=temp+node[i].outerHTML;
                    }
                  }
                  this.execCommand('insertHtml','&lt;回复可见&gt;'+temp+"&lt;/回复可见&gt;");
                  return true;
                },
                queryCommandState:function(){}
              };
          })
      },
      getUEContent() { // 获取内容方法
          return this.editor.getContent()
      },   
      clearContent() {
        return this.editor.execCommand('cleardoc');
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
