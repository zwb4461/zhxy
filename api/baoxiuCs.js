const request = require("~/utils/request.js");
const Api = require("~/api/apiUrl/");

const saveRepairCanshu = query => {
  return request({
    url: Api.baoxiuCs.saveRepairCanshu,
    method: "post-json",
    data: query
  });
};
const findCs = query => {
  return request({
    url: Api.baoxiuCs.findCs,
    method: "post",
    data: query
  });
};
const getNjBj = query => {
  return request({
    url: Api.baoxiuCs.getNjBj,
    method: "post",
    data: query
  });
};
const selectDdUsers = query => {
  return request({
    url: Api.baoxiuCs.selectDdUsers,
    method: "get",
    params: query
  });
};

export default {
  findCs,
  saveRepairCanshu,
  selectDdUsers,
  getNjBj
};
