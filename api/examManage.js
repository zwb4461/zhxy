const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//列表
const find = query => {
  return request({
    url: Api.examManage.find,
    method: "post-json",
    data: query
  });
};

//添加
const add = query => {
  return request({
    url: Api.examManage.add,
    method: "post-json",
    data: query
  });
};
//修改
const edit = query => {
  return request({
    url: Api.examManage.edit,
    method: "post",
    data: query
  });
};

//删除
const del = query => {
  return request({
    url: Api.examManage.del,
    method: "post",
    data: query
  });
};
const findXk = query => {
  return request({
    url: Api.examManage.findXk,
    method: "post",
    data: query
  });
};
const editXk = query => {
  return request({
    url: Api.examManage.editXk,
    method: "post-json",
    data: query
  });
};
const addXk = query => {
  return request({
    url: Api.examManage.addXk,
    method: "post-json",
    data: query
  });
};

export default {
  add,
  edit,
  del,
  find,
  findXk,
  editXk,
  addXk
};
