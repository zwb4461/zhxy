const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//查看教师信息
const sel = query => {
  return request({
    url: Api.teacherInfo.sel,
    method: "post",
    data: query
  });
};
//删除教师信息
const del = query => {
  return request({
    url: Api.teacherInfo.del,
    method: "post",
    data: query
  });
};
//编辑教师信息
const edit = query => {
  return request({
    url: Api.teacherInfo.edit,
    method: "post-json",
    data: query
  });
};
//添加教师信息
const add = query => {
  return request({
    url: Api.teacherInfo.add,
    method: "post-json",
    data: query
  });
};
//导入表格
const imp = query => {
  return request({
    url: Api.teacherInfo.imp,
    method: "post-json",
    data: query
  });
};
//钉钉匹配
const pp = query => {
  return request({
    url: Api.teacherInfo.pp,
    method: "post",
    data: query
  });
};
//钉钉二次匹配
const ppTwo = query => {
  return request({
    url: Api.teacherInfo.ppTwo,
    method: "post",
    data: query
  });
};
//根据省市区获取地区代码
const code = query => {
  return request({
    url: Api.teacherInfo.code,
    method: "post",
    data: query
  });
};

export default {
  add,
  sel,
  del,
  edit,
  imp,
  pp,
  ppTwo,
  code
};
