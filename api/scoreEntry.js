const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const find = query => {
  return request({
    url: Api.scoreEntry.find,
    method: "post-json",
    data: query
  });
};
const del = query => {
  return request({
    url: Api.scoreEntry.del,
    method: "post",
    data: query
  });
};
const findPy = query => {
  return request({
    url: Api.scoreEntry.findPy,
    method: "post",
    data: query
  });
};
const edit = query => {
  return request({
    url: Api.scoreEntry.edit,
    method: "post-json",
    data: query
  });
};
const addEdit = query => {
  return request({
    url: Api.scoreEntry.addEdit,
    method: "post-json",
    data: query
  });
};

export default {
  find,
  del,
  edit,
  findPy,
  addEdit
};
