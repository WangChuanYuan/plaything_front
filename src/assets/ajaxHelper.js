import $ from 'jquery';

var ajaxHelper = {};

/**
 * 得到当前登录用户
 */
ajaxHelper.getCurrentUser = function () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/current_user',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 通过Id得到用户
 * @param param {"user": usrId}
 * @returns {Promise<any>}
 */
ajaxHelper.getUserById = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_user',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 通过笔记Id和笔记类型得到一篇笔记
 * @param param {"postID": postID, "type": type}
 *  type 为 sell 和 share
 * @returns {Promise<any>}
 */
ajaxHelper.getPostByIdAndType = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_post',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 得到作者各种状态下的笔记
 * @param param {"writer": writerId,"state":state}
 * @returns {Promise<any>}
 */
ajaxHelper.getPosts = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_state_posts',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/*/!**
 * 得到作者全部未过审的笔记
 * @param param {"writer": writerId}
 * @returns {Promise<any>}
 *!/
ajaxHelper.getUnPassedPosts = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_unpassed_posts',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      contentType: "application/json",
      data: JSON.stringify(param),
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/!**
 * 得到作者全部已过审的笔记
 * @param param {"writer": writerId}
 * @returns {Promise<any>}
 *!/
ajaxHelper.getPassedPosts = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_passed_posts',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      contentType: "application/json",
      data: JSON.stringify(param),
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/!**
 * 得到作者全部加精的笔记
 * @param param {"writer": writerId}
 * @returns {Promise<any>}
 *!/
ajaxHelper.getHighLightPosts = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_highlight_posts',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      contentType: "application/json",
      data: JSON.stringify(param),
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 得到作者最近待审核的笔记
 * @param param {"writer": writerId}
 * @returns {Promise<any>}
 */
ajaxHelper.getRecentPostsByWriter = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_recent_posts',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 审核一篇笔记
 * @param param {"checkResult": checkResult, "postID": postId}
 * checkResult 为 fail pass recommend 不通过 通过 加精
 * @returns {Promise<any>}
 */
ajaxHelper.checkPost = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/check_post',
      dataType: 'json',
      type: 'post',
      scriptCharset: 'utf-8',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 得到当前登录用户是否已阅览过所有私信
 * 返回布尔型
 * @returns {Promise<any>}
 */
ajaxHelper.hasAllMessageChecked = function () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/hasAllMessageChecked',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 登录
 * @param param {"username": username, "password": password}
 * @returns {Promise<any>}
 */
ajaxHelper.login = function(param){
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/login',
      dataType: 'json',
      type: 'post',
      scriptCharset: 'utf-8',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 登出
 * @returns {Promise<any>}
 */
ajaxHelper.logout = function () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/logout',
      dataType: 'json',
      type: 'post',
      scriptCharset: 'utf-8',
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 得到两个用户间的私信记录
 * @param param {"chatterOne": userId, "chatterTwo": userId}
 * @returns {Promise<any>}
 */
ajaxHelper.getChatBetween = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_chat',
      dataType: 'json',
      type: 'get',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 发送私信
 * @param param {"receiverId": receiverId, "content": content}
 * 后端设置senderId 为当前登录用户，设置发送时间，设置为未读
 * @returns {Promise<any>}
 */
ajaxHelper.sendPrivateMessage = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/send_privateMessage',
      dataType: 'json',
      type: 'post',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 将某一用户发送给当前登录用户的所有私信设为已读
 * @param param {"senderId": userId}
 * @returns {Promise<any>}
 */
ajaxHelper.readPrivateMessage = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/read_private_message',
      dataType: 'json',
      type: 'post',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 得到当前登录用户所有未处理的私信的Map
 * Map {String : senderId, Integer: unreadAmount}
 * @returns {Promise<any>}
 */
ajaxHelper.getUnsolvedContacts = function () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_unsolved_contacts',
      dataType: 'json',
      type: 'get',
      scriptCharset: 'utf-8',
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 当前登录用户发表关于某篇笔记评论 后端记录时间和评论者
 * @param param {"postId": postId, "content": content}
 * @returns {Promise<any>}
 */
ajaxHelper.shareComment = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/share_comment',
      dataType: 'json',
      type: 'post',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

/**
 * 得到某篇笔记的评论
 * @param param {"postId": postId}
 * @returns {Promise<any>}
 */
ajaxHelper.getCommentOf = function (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/api/get_comment',
      dataType: 'json',
      type: 'get',
      data: param,
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    })
  })
}

export default ajaxHelper;
