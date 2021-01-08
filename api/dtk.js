const request = require("../utils/request.js");
const Api = require("./apiUrl");

const del = query => {
  return request({
    url: Api.dtk.del,
    method: "post",
    data: query
  });
};
const selectTakeStanza = query => {
  return request({
    url: Api.dtk.selectTakeStanza,
    method: "post",
    data: query
  });
};
const selectSetTake = query => {
  return request({
    url: Api.dtk.selectSetTake,
    method: "post",
    data: query
  });
};
const deleteSetTake = query => {
  return request({
    url: Api.dtk.deleteSetTake,
    method: "post",
    data: query
  });
};
const add = query => {
  return request({
    url: Api.dtk.add,
    method: "post-json",
    data: query
  });
};
const edit = query => {
  return request({
    url: Api.dtk.edit,
    method: "post-json",
    data: query
  });
};
const find = query => {
  return request({
    url: Api.dtk.find,
    method: "post-json",
    data: query
  });
};
const saveSetTake = query => {
  return request({
    url: Api.dtk.saveSetTake,
    method: "post-json",
    data: query
  });
};

export default {
  find,
  del,
  edit,
  add,
  selectTakeStanza,
  saveSetTake,
  selectSetTake,
  deleteSetTake
};
