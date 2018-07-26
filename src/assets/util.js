var util = {};
util.getParameter = function (param) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  return r != null ? r[2] : null;
}
util.tags = [
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
]

export default util
