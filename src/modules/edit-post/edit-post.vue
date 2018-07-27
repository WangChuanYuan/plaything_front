<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-main>
        <el-form ref="postForm" :model="postForm">
          <!--类型 分享或是销售-->
          <div id="type">
            <el-form-item prop="type">
              <el-radio-group v-model="postForm.type">
                <el-radio label="share">分享</el-radio>
                <el-radio label="sell">销售</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!--封面图上传-->
          <div id="uploader">
            <h5>上传封面图</h5>
            <el-form-item prop="coverList">
              <el-upload action="mock" :on-preview="handlePictureCardPreview" :on-remove="removeCover"
                         :auto-upload="false" :limit="5" :accept="'image/*'" list-type="picture-card" required
                         :on-change="addCover" :on-exceed="handleExceed">
                <i class="el-icon-plus"></i>
                <div class="el-upload__tip" slot="tip">最多上传5张封面图片</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </div>
          <!--标签选择-->
          <div v-if="postForm.type == 'share'" class="tags">
            <h5>为笔记添加合适的标签</h5>
            <el-form-item prop="tags">
              <el-checkbox-group v-model="postForm.tags">
                <el-checkbox v-for="tag in tags" :label="tag.name"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div v-else class="tags">
            <h5>为商品添加合适的标签</h5>
            <el-form-item prop="tags">
              <el-checkbox-group v-model="postForm.tags">
                <el-checkbox v-for="good in goods" :label="good.name"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <!--标题 若为销售类 显示单价-->
          <div id="title">
            <el-row>
              <el-col :span="12">
                <div>
                  <h5>标题</h5>
                  <el-form-item prop="title">
                    <el-input v-model="postForm.title" placeholder="请输入标题"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8" :offset="4">
                <div v-show="postForm.type == 'sell'">
                  <h5>单价</h5>
                  <el-form-item prop="price">
                    <el-input v-model="postForm.price" placeholder="￥"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
          <!--正文内容-->
          <div id="content">
            <h5>正文</h5>
            <UE id="editor" :config="editorConfig"></UE>
            <el-button type="primary" icon="el-icon-share" style="margin-top: 10px; position: absolute; left: 800px">分享</el-button>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import util from '../../assets/util.js';
  import UE from "../../components/UE";
  import Footer from "../../components/Footer";

  export default {
    name: "editPost",
    components: {Footer, UE, Navigation},
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        tags: util.tags,
        goods: util.goods,
        editorConfig: {
          initialFrameWidth: 1000,
          initialFrameHeight: 600
        },
        postForm: {
          title: '',
          coverList: [],
          tags: [],
          price: 0,
          type: 'share',
          content: '',
          writer: ''
        }
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(file, fileList) {
        this.$message.warning('当前限制选择 5 个图片');
      },
      addCover(file, fileList) {
        this.postForm.coverList.push(file.raw);
      },
      removeCover(file, fileList) {
        for (var i = 0; i < this.postForm.coverList.length; i++) {
          if (this.postForm.coverList[i] == file.raw)
            this.postForm.coverList.splice(i, 1);
        }
      }
    }
  }
</script>

<style scoped>
  #type {
    position: absolute;
    left: 300px;
    top: 100px;
  }

  #uploader {
    position: absolute;
    left: 300px;
    top: 150px;
  }

  .tags {
    position: absolute;
    left: 300px;
    top: 410px;
  }

  #title {
    position: absolute;
    left: 300px;
    top: 530px;
  }

  #content {
    position: absolute;
    left: 300px;
    top: 640px;
  }

</style>
