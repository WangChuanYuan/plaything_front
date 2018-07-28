<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-main>
        <el-form ref="postForm" :model="postForm" :rules="rules">
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
            <el-form-item prop="covers">
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
            <UE ref="editor" :config="editorConfig"></UE>
            <el-button @click="sharePost('postForm')" type="primary" icon="el-icon-share"
                       style="margin-top: 10px; position: absolute; left: 800px">
              分享
            </el-button>
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
        rules: {
          tags: [{required: true, message: "请至少选择一个标签", trigger: 'blur'}],
          title: [{required: true, message: "请输入标题", trigger: 'blur'}],
        },
        postForm: {
          title: '',
          covers: [],
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
        this.postForm.covers.push(file.raw);
      },
      removeCover(file, fileList) {
        for (var i = 0; i < this.postForm.covers.length; i++) {
          if (this.postForm.covers[i] == file.raw)
            this.postForm.covers.splice(i, 1);
        }
      },
      sharePost(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let model = this.postForm;
            let form = new FormData();
            model.content = this.$refs.editor.getUEContent();
            form.append("title", model.title);
            for (var i = 0; i < model.tags.length; i++)
              form.append("tags", model.tags[i]);
            for (var i = 0; i < model.covers.length; i++)
              form.append("covers", model.covers[i]);
            form.append("price", model.price);
            form.append("type", model.type);
            form.append("content", model.content);
            form.append("writer", model.writer);
            $.ajax({
              url: '/api/share_post',
              processData: false,
              cache: false,
              contentType: false,
              async: false,
              dataType: 'json',
              type: 'post',
              data: form,
              success: function (result) {
                if (result == 'SUCCESS') {
                  this.$message({
                    message: '分享成功，等待审核',
                    type: 'success'
                  });
                  window.location.href = './';
                }
                else {
                  this.$message.error('分享失败');
                }
              },
              error: function (error) {

              }
            });
          } else {
            this.$message.error('信息不全，请检查');
            return false;
          }
        })
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
