<template>
  <div class="content-talk">
    <ul>
      <li class="clearfix" v-for="(talk,index) in talks"
          v-bind:class="{'even':otherName!=talk.senderId,'odd':otherName==talk.senderId}">
        <span style="text-align: center; display: block">{{talk.time}}</span>
        <img v-bind:src="myDisplay" alt="" v-if="otherName!=talk.senderId">
        <img v-bind:src="otherDisplay" alt="" v-else>
        <div class="in_talk">
          <p>{{talk.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Talk",
    data() {
      return {
        //正与你进行聊天的用户
        otherName: 'M',
        myDisplay: require('../assets/defaultDisplay.jpg'),
        otherDisplay: require('../assets/banner2.jpg'),
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
    methods: {}
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
