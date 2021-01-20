<template>
  <div>
    <div class="topTitle">
      <span>报修信息</span>
      <span style="font-size: 16px; margin-top: 5px"
        >2020/2021学年第一学期</span
      >
    </div>
    <div class="form">
      <van-cell-group>
        <van-field readonly label="报修时间:" :value="form.bxTime" />
        <van-field
          readonly
          clickable
          label="报修物品:"
          :value="form.maxCate + '-' + form.minCate + '-' + form.name"
          placeholder="选择报修物品"
          @click="showDl = true"
        />
        <van-field v-model="form.address" label="报修地点:" />
        <van-field
          v-model="form.explaion"
          rows="3"
          autosize
          label="情况说明:"
          type="textarea"
        />
        <div style="width: 100%">
          <van-uploader
            multiple
            style="margin-top: 15px; margin-left: 15px"
            v-model="form.bxImg"
            :after-read="uploadImg"
            :max-count="9"
            preview-size="80px"
            @delete="delImg"
          />
        </div>
        <van-field readonly v-model="userName" label="报修教师:" />
        <van-field label="处理状态:" value="待处理" readonly />
        <van-field readonly v-model="form.clTeaname" label="处理教师:" />
      </van-cell-group>
      <div class="topBtn">
        <van-button type="danger" style="width: 45%" @click="delItem"
          >删除</van-button
        >
        <van-button type="primary" style="width: 45%" @click="submit"
          >确定</van-button
        >
      </div>

      <!--报修大类弹出层 -->
      <van-popup v-model="showDl" round position="bottom">
        <van-picker
          value-key="name"
          show-toolbar
          :columns="bxOpt"
          @cancel="showDl = false"
          @confirm="confirmBxwp"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import main1 from "~/api/baoxiu";
import main from "~/api/baoxiuCs";
import axios from "axios";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      wp: "",
      showDl: false,
      bxOpt: [],
      postData: [],
      fileIds: [],
      form: {
        bxTime: "",
        maxCate: "",
        minCate: "",
        name: "",
        address: "",
        explaion: "",
        bxImg: [],
        bxTeaid: "",
        clTeaid: "",
        clTeaname: "",
        status: 0,
      },
      tableData_left: [],
      tableData_center: [],
      tableData_right: [],
    };
  },
  methods: {
    //!删除该报修
    delItem() {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main1
            .del({ id: this.form.id })
            .then((res) => {
              this.$message.success("删除成功!");
              this.$router.push("/Phone/bxPhone");
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    //!删除照片
    delImg(file, detail) {
      // 删除指定下标的图片对象
      if (isNaN(detail.index) || detail.index >= this.postData.length) {
        return false;
      }
      let tmp = [];
      for (let i = 0, len = this.postData.length; i < len; i++) {
        if (this.postData[i] !== this.postData[detail.index]) {
          tmp.push(this.postData[i]);
        }
      }
      this.postData = tmp;
      this.fileIds.splice(detail.index, 1);
      console.log(" this.fileIds", this.fileIds);
    },
    //!上传图片
    uploadImg(file) {
      this.postData.push(file); // postData是一个数组
      if (file instanceof Array) {
        file.map((item) => {
          let params = new FormData();
          params.append("imgFile", item.file);
          let config = {
            headers: {
              //添加请求头
              "Content-Type": "multipart/form-data",
            },
          };
          //把 uploadUrl 换成自己的 上传路径
          axios
            .post("http://103.219.33.112:10010/upload", params, config)
            .then((res) => {
              console.log("上传照片--res", res.data.data);
              this.fileIds.push({
                url: res.data.data,
              });
              console.log(this.fileIds, " this.fileIds");
            })
            .catch((err) => {});
        });
      } else {
        let params = new FormData();
        params.append("imgFile", file.file);
        let config = {
          headers: {
            //添加请求头
            "Content-Type": "multipart/form-data",
          },
        };
        //把 uploadUrl 换成自己的 上传路径
        axios
          .post("http://103.219.33.112:10010/upload", params, config)
          .then((res) => {
            console.log("上传照片--res", res.data.data);
            this.fileIds.push({
              url: res.data.data,
            });
            console.log(this.fileIds, " this.fileIds");
          })
          .catch((err) => {});
      }
    },
    //!提交
    submit() {
      let val = this.form;
      val.bxTeaid = this.unionid;
      val.bxImg = this.fileIds;
      console.log(val);
      main1
        .edit(val)
        .then((res) => {
          this.$message.success("修改成功!");
          this.$router.push("/Phone/bxPhone");
        })
        .catch((err) => {});
    },
    //!获取报修大类数据源
    getBxDl() {
      main
        .findCs({})
        .then((res) => {
          this.bxOpt = res.data.setRepcates.map((item) => {
            if (item.children.length == 0) {
              item.children.push({ name: "", children: [] });
              item.children[0].children.push({ name: "", children: [] });
            } else if (item.children.length > 0) {
              item.children.map((subItem) => {
                if (subItem.children.length == 0) {
                  subItem.children.push({ name: "", children: [] });
                }
              });
            }
            item.children.map((item1) => {
              item1.children.map((item2) => {
                delete item2.children;
              });
            });
            return item;
          });
          console.log(this.bxOpt, "11111111111");
          this.tableData_center = res.data.setRepapjs;
          this.tableData_right = res.data.setAddrs;
        })
        .catch((err) => {});
    },
    //!确定报修物品
    confirmBxwp(val) {
      console.log(val);
      this.showDl = false;
      this.form.maxCate = val[0];
      this.form.minCate = val[1];
      this.form.name = val[2];
      this.bxOpt.map((item) => {
        if (item.name == val[0]) {
          this.form.clTeaname = item.owner;
          this.form.clTeaid = item.ownerId;
        }
      });
    },
    //!获取当前时间
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.form.bxTime = yy + "-0" + mm + "-" + dd + " " + hh + ":" + mf;
    },
  },
  created() {
    this.getTime();
    this.getBxDl();
    console.log(this.$route.query.data, "路由信息");
    this.form = this.$route.query.data;
    this.fileIds = this.form.bxImg;
  },
};
</script>

<style lang="scss" scoped>
.topBtn {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.topTitle {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
