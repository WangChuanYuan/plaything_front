<template>
  <div class="reply">
    <div class="commentBox">
      <h4>评论</h4>
      <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
      <div v-else>
        <div class="comment" v-for="(item,index) in comment" v-bind:index="index">
          <b>{{item.replier}}<span>{{item.time}}</span></b>
          <p>{{item.content}}</p>
          <hr/>
        </div>
      </div>
    </div>
    <div class="commentBox">
      <h4>发表评论</h4>
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="commentText"></el-input>
      <el-button icon="el-icon-delete" circle @click="cancelComment"
                 style="margin: 5px 0px 0px 5px; float: right"></el-button>
      <el-button icon="el-icon-check" circle @click="addComment"
                 style="margin: 5px 0px 0px 5px; float: right"></el-button>
    </div>
  </div>
</template>

<script>
  import ajaxHelper from '../assets/ajaxHelper';

  export default {
    name: "Comment",
    props: {
      postId: Number,
      type: String
    },
    data() {
      return {
        commentText: '',
        comment: [
          {
            postId: '123',
            replier: "W",
            time: "2016-08-17",
            content: "好,讲得非常好",
          },
          {
            postId: '123',
            replier: "M",
            time: "2016-08-17",
            content: "对,讲得非常对",
          },
        ]
      }
    },
    mounted: function () {
      this.getComment();
    },
    methods: {
      getComment(){
        ajaxHelper.getCommentOf({"postId": this.postId, "type": this.type}).then((data) => {
          this.comment = data;
        });
      },
      addComment() {
        var comment = {"postId": this.postId, "content": this.commentText, "type": this.type};
        ajaxHelper.shareComment(comment).then((data) => {
          if(data == 'SUCCESS'){
            this.commentText = '';
            this.getComment();
          }
        });
      },
      cancelComment() {
        this.commentText = '';
      }
    }
  }
</script>

<style scoped>
  .reply {
    margin-top: 25px;
  }

  .commentBox h4 {
    background-color: #e2ddda;
    color: #aa7700;
  }

  .comment b {
    color: #008855;
    font-size: medium;
  }

  .comment span {
    color: #000000;
    font-size: small;
    margin-left: 5px;
  }

</style>
