<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-steps :active="step" simple>
        <el-step icon="el-icon-edit" title="填写个人信息"></el-step>
        <el-step icon="el-icon-menu" title="选择适合你的个性标签"></el-step>
      </el-steps>
      <!--第一步-->
      <div v-show="step == 0">
        <el-steps class="verticalSteps" direction="vertical">
          <el-step icon="el-icon-upload" status="process" title="步骤一" description="上传用户头像，可选择默认"></el-step>
          <el-step icon="el-icon-document" status="process" title="步骤二" description="完善个人信息"></el-step>
          <el-step icon="el-icon-star-off" status="process" title="步骤三" description="输入密码"></el-step>
          <el-step icon="el-icon-star-on" status="process" title="步骤四" description="确认密码"></el-step>
        </el-steps>
        <div>
          <div id="uploader">
            <!--上传头像，此处只是添加，最后注册时上传至服务器 multiple 表示是否支持多选文件-->
            <el-upload class="avatar-uploader" action="mock" :multiple="false" :auto-upload="false" :on-change="addDisplay">
              <img v-if="displayURL" :src="displayURL" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-table"></i>
            </el-upload>
          </div>
        </div>
        <div>
          <el-button class="rightButton" circle icon="el-icon-arrow-right" @click="next">下一项</el-button>
        </div>
      </div>
      <!--第二步-->
      <div v-show="step == 1">
        <tag-cloud id="tagCloud" :config="option" :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
        <div class="tag">
          <p>您为自己选择的标签有：</p>
          <el-tag style="margin: 5px;" size="medium" :key="tag" v-for="tag in registerForm.tags" closable
                  :disable-transitions=false
                  @close="removeTag(tag)">
            {{tag}}
          </el-tag>
        </div>
        <div>
          <el-button class="leftButton" circle icon="el-icon-arrow-left" @click="last">上一项</el-button>
          <el-button class="rightButton" circle icon="el-icon-check" @click="register">确定</el-button>
        </div>
      </div>
      <Footer id="specialFooter"></Footer>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import Footer from "../../components/Footer";

  export default {
    name: "register",
    components: {Footer, Navigation},
    data: function () {
      return {
        registerForm: {
          userName: "",
          password: "",
          avatar: null,
          location: "",
          mail: "",
          phone: "",
          tags: []
        },
        displayURL: null,
        hotTag: [
          {"name": "美食"},
          {"name": "人文"},
          {"name": "风景"},
          {"name": "习俗"},
          {"name": "手工"},
          {"name": "文化"},
          {"name": "服饰"},
          {"name": "自然"},
          {"name": "科技"},
          {"name": "传统"},
          {"name": "地标"},
          {"name": "音乐"}
        ],
        option: {
          radius: 200,
          maxFont: 32
        },
        step: 0,
      }
    },
    methods: {
      addDisplay(file, fileList){
        this.displayURL = file.url;
        this.registerForm.avatar = file.raw;
      },
      clickTagItem: function (tag) {
        if (this.registerForm.tags.indexOf(tag.name) < 0)
          this.registerForm.tags.push(tag.name);
      },
      removeTag(tag) {
        this.registerForm.tags.splice(this.registerForm.tags.indexOf(tag), 1);
      },
      next() {
        if (this.step++ > 1)
          this.step = 1;
      },
      last() {
        if (this.step-- < 0)
          this.step = 0;
      }
    }
  }
</script>

<style scoped>
  #uploader {
    left: 40%;
    top: 150px;
    position: absolute;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-table {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 120px;
    display: block;
  }

  .verticalSteps {
    margin-left: 320px;
    margin-top: 40px;
  }

  #tagCloud {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }

  .tag {
    position: absolute;
    left: 400px;
    top: 600px;
    font-weight: bold;
    color: #565656;
    font-size: 18px;
  }

  .leftButton {
    position: absolute;
    left: 300px;
    top: 730px;
  }

  .rightButton {
    position: absolute;
    right: 300px;
    top: 730px;
  }

  /*标签云有上下浮动，未能找到解决办法，只能固定位置*/
  #specialFooter {
    position: absolute;
    width: 100%;
    top: 770px;
    bottom: 0px;
    text-align: center;
  }
</style>
