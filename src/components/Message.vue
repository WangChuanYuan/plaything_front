<template>
  <div>
    <el-container>
      <el-aside width="30%" class="contacts">
        <el-scrollbar>
          <ul>
            <li class="clearfix contact" v-for="(item, key) in unsolvedContacts" style="margin-top: 8px"
                @click="startTalk(key)">
              <img :src="displayOf(key)" class="display">
              <span style="text-align: center; display: block">{{nameOf(key)}}</span>
              <el-badge :value="item" :max="99"></el-badge>
            </li>
          </ul>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <Talk v-if="receiverId" :receiver-id="receiverId"></Talk>
        <div v-else>暂时没有消息哦</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Talk from "./Talk";
  import ajaxHelper from '../assets/ajaxHelper';

  export default {
    name: "Message",
    components: {Talk},
    props: {
      usrId: Number
    },
    data() {
      return {
        unsolvedContacts: {
        },
        receiverId: null,
        timer: null
      }
    },
    mounted: function () {
      this.timer = setInterval(this.getUnsolvedContacts, 1000);
    },
    beforeDestroy: function () {
      clearInterval(this.timer);
    },
    methods: {
      getUnsolvedContacts(){
        // $.ajax({
        //   url: '/api/get_unsolved_contacts',
        //   dataType: 'json',
        //   type: 'get',
        //   scriptCharset: 'utf-8',
        //   success: function (data) {
        //     this.unsolvedContacts = data;
        //   },
        //   error: function (error) {
        //   }
        // });
        ajaxHelper.getUnsolvedContacts().then((data) => {
          this.unsolvedContacts = data;
        });
      },
      displayOf(usrId) {
        // $.ajax({
        //   url: '/api/get_user',
        //   dataType: 'json',
        //   type: 'get',
        //   scriptCharset: 'utf-8',
        //   contentType: "application/json",
        //   data: JSON.stringify({"user": usrId}),
        //   success: function (data) {
        //     let usr = data;
        //     return usr.display ? usr.display : require('../assets/defaultDisplay.jpg');
        //   },
        //   error: function (error) {
        //   }
        // });
        ajaxHelper.getUserById({"user": usrId}).then((data) => {
          let usr = data;
          return usr.display ? usr.display : require('../assets/defaultDisplay.jpg');
        });
      },
      nameOf(usrId) {
        // $.ajax({
        //   url: '/api/get_user',
        //   dataType: 'json',
        //   type: 'get',
        //   scriptCharset: 'utf-8',
        //   contentType: "application/json",
        //   data: JSON.stringify({"user": usrId}),
        //   success: function (data) {
        //     let usr = data;
        //     return usr.userName;
        //   },
        //   error: function (error) {
        //   }
        // });
        ajaxHelper.getUserById({"user": usrId}).then((data) => {
          let usr = data;
          return usr.userName;
        });
      },
      startTalk(receiverId) {
        this.receiverId = receiverId;
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

  .contact:hover {
    transform: scale(1.2, 1.2);
    box-shadow: 0 0 10px #0000ff;
    cursor: pointer;
  }

  .contacts {
    border-right: 1px solid #000000;
    height: 500px;
  }

  .display {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
  }
</style>
