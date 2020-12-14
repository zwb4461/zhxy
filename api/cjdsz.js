const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const find = query => {
  return request({
    url: Api.cjdsz.find,
    method: "post-json",
    data: query
  });
};

export default {
  find
};
