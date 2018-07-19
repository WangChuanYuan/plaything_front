<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
  // 富文本编辑器
  import '../../static/UE/ueditor.config'
  import '../../static/UE/ueditor.all.min'
  import '../../static/UE/lang/zh-cn/zh-cn'
  import '../../static/UE/ueditor.parse.min'

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
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
