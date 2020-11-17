const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

//列表
const find = query => {
  return request({
    url: Api.termManage.find,
    method: "post",
    data: query
  });
};

export default {
  find
};
