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
        defaultMsg:function(old,newold){
            this.editor.setContent(old);
        }
    },
    methods: {
      initEditor(){
          this.$nextTick(()=>{
              const _this = this;
              this.editor = UE.getEditor('editor',this.config); // 初始化UE
              this.editor.addListener("ready", ()=>{
                  _this.editor.setHeight(300);
                  //_this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
                  _this.$emit('ready',_this.editor)
                
              });
          })
      },
      getUEContent() { // 获取内容方法
          return this.editor.getContent()
      },   
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
