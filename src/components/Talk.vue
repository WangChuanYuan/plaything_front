<template>
  <div>
    <h4 style="text-align: center">正与{{otherName}}通讯中</h4>
    <hr/>
    <div class="content-talk" id="scrollArea" style="height: 300px; overflow-y: scroll; overflow-x: auto">
      <ul>
        <li class="clearfix" v-for="(talk,index) in talks"
            v-bind:class="{'even':otherId!=talk.senderId,'odd':otherId==talk.senderId}">
          <span v-show="showTime(index)" :id="index" style="text-align: center; display: block">{{talk.time}}</span>
          <img v-bind:src="myDisplay" alt="" v-if="otherId!=talk.senderId">
          <img v-bind:src="otherDisplay" alt="" v-else>
          <div class="in_talk">
            <p>{{talk.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <form onkeydown="if(event.keyCode == 13) return false;">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content" @keyup.native='sendMessage($event)'>
      </el-input>
    </form>
  </div>
</template>

<script>
  import $ from 'jquery';
  import ajaxHelper from '../assets/ajaxHelper';

  export default {
    name: "Talk",
    props: {
      receiverId: String,
    },
    data() {
      return {
        //正与你进行聊天的用户
        otherId: 'M',
        otherName: 'M',
        otherDisplay: require('../assets/defaultDisplay.jpg'),
        myId: 'W',
        myDisplay: require('../assets/defaultDisplay.jpg'),
        content: '',
        //轮询获取新的消息
        timer: null,
        talks: [
          {
            senderId: 'W',
            receiverId: 'M',
            content: '在吗?',
            time: '2018-07-30 11:20:12'
          },
          {
            senderId: 'W',
            receiverId: 'M',
            content: '在吗?',
            time: '2018-07-30 11:20:12'
          },
          {
            senderId: 'M',
            receiverId: 'W',
            content: '在!',
            time: '2018-07-30 11:20:12'
          }
        ]
      }
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    updated() {
      this.scrollToBottom();
    },
    methods: {
      init() {
        // $.ajax({
        //   url: '/api/current_user',
        //   dataType: 'json',
        //   type: 'get',
        //   scriptCharset: 'utf-8',
        //   success: function (data) {
        //     var user = data;
        //     this.myId = user.id;
        //     if (user.display)
        //       this.myDisplay = user.display;
        //   },
        //   error: function (error) {
        //   }
        // });
        ajaxHelper.getCurrentUser().then((data) => {
          var user = data;
          this.myId = user.id;
          if (user.display)
            this.myDisplay = user.display;
        });
        // $.ajax({
        //   url: '/api/get_user',
        //   dataType: 'json',
        //   type: 'get',
        //   scriptCharset: 'utf-8',
        //   contentType: "application/json",
        //   data: JSON.stringify({"user": this.receiverId}),
        //   success: function (data) {
        //     var user = data;
        //     this.otherId = user.id;
        //     this.otherName = user.userName;
        //     if (user.display)
        //       this.otherDisplay = user.display;
        //   },
        //   error: function (error) {
        //   }
        // });
        ajaxHelper.getUserById({"user": this.receiverId}).then((data) => {
          var user = data;
          this.otherId = user.id;
          this.otherName = user.userName;
          if (user.display)
            this.otherDisplay = user.display;
        });
        this.timer = setInterval(this.getNewMessage, 1000);
      },
      showTime(index) {
        //上一次发送时间1分钟以内的不再显示发送时间
        if (index > 0) {
          var sendTime = new Date(this.talks[index].time);
          sendTime.setMinutes(sendTime.getMinutes() + 1);
          var lastSendTime = new Date(this.talks[index - 1].time);
          return sendTime <= lastSendTime;
        }
        return true;
      },
      scrollToBottom() {
        $('#scrollArea').scrollTop($('#scrollArea')[0].scrollHeight);
      },
      getNewMessage() {
        // $.ajax({
        //   url: '/api/get_chat',
        //   dataType: 'json',
        //   type: 'get',
        //   contentType: "application/json",
        //   data: JSON.stringify({"chatterOne": this.myId, "chatterTwo": this.otherId}),
        //   success: function (data) {
        //     this.talks = data;
        //   },
        //   error: function () {
        //   }
        // });
        ajaxHelper.getChatBetween({"chatterOne": this.myId, "chatterTwo": this.otherId}).then((data) => {
          this.talks = data;
        });
      },
      sendMessage(ev) {
        if (ev.keyCode == 13) {
          if (this.content.length == 0)
            this.$message('说点什么吧');
          else {
            var receiverId = this.otherId;
            var content = this.content;
            // $.ajax({
            //   url: '/api/send_privateMessage',
            //   dataType: 'json',
            //   type: 'post',
            //   contentType: "application/json",
            //   data: JSON.stringify({"receiverId": receiverId, "content": content}),
            //   success: function (data) {
            //     if (data == 'SUCCESS') {
            //       this.content = '';
            //     }
            //   },
            //   error: function () {
            //   }
            // });
            ajaxHelper.sendPrivateMessage({"receiverId": receiverId, "content": content}).then((data) => {
              if (data == 'SUCCESS') {
                this.content = '';
              }
            })
            // $.ajax({
            //   url: '/api/read_private_message',
            //   dataType: 'json',
            //   type: 'post',
            //   contentType: "application/json",
            //   data: JSON.stringify({"senderId": this.otherId}),
            //   success: function (data) {
            //   },
            //   error: function () {
            //   }
            // });
            ajaxHelper.readPrivateMessage({"senderId": this.otherId}).then((data) => {
            });
          }
        }
      }
    }
  }
</script>

<style scoped>
  .clearfix {
    zoom: 1;
    display: table;
    width: 100%;
  }

  /*even 偶  odd 奇*/
  .content-talk ul li.odd img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    float: left;
    background-size: 45px 45px;
  }

  .content-talk ul li.even img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    float: right;
    background-size: 45px 45px;
  }

  .content-talk ul li.odd .in_talk p {
    background: #fff6d9;
    float: left;
    margin-left: 10px;
    max-width: 60%;
    font-size: 14px;
    padding: 10px;
    border-radius: 6px;
  }

  .content-talk ul li.even .in_talk p {
    background: #f6fff6;
    float: right;
    margin-right: 10px;
    max-width: 60%;
    border-radius: 6px;
    font-size: 14px;
    padding: 10px;
  }
</style>
