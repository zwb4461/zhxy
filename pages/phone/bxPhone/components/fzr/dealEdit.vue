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
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修时间:</span>
        </div>
        <van-field input-align="right" readonly :value="form.bxTime" />
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修物品:</span>
        </div>
        <van-field
          input-align="right"
          readonly
          :value="form.maxCate + '-' + form.minCate + '-' + form.name"
          placeholder="选择报修物品"
        />
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修地点:</span>
        </div>
        <van-field input-align="right" readonly v-model="form.address" />
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">情况说明:</span>
        </div>
        <van-field
          input-align="right"
          readonly
          v-model="form.explaion"
          rows="3"
          autosize
          type="textarea"
        />
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修图片:</span>
        </div>
        <div style="width: 100%; padding-left: 15px">
          <van-image
            v-for="(item, index) in form.bxImg"
            style="margin-right: 5px"
            :key="index"
            width="100"
            height="100"
            :src="item.url"
          />
        </div>
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">报修教师:</span>
        </div>
        <van-field input-align="right" readonly v-model="userName" />
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">处理状态:</span>
        </div>
        <van-field
          input-align="right"
          clickable
          :value="
            form.status == 0
              ? '待处理'
              : form.status == 1
              ? '处理中'
              : form.status == 2
              ? '已处理'
              : ''
          "
          readonly
          @click="showStatus = true"
        />
        <div class="font-bold">
          <span style="margin-left: 15px; font-size: 18px">处理教师:</span>
        </div>
        <van-field input-align="right" readonly v-model="form.clTeaname" />
      </van-cell-group>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">反馈信息:</span>
      </div>
      <van-field
        input-align="right"
        v-model="form.fkxx"
        rows="3"
        autosize
        type="textarea"
      />
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">反馈图片:</span>
      </div>
      <div style="width: 100%; padding-left: 15px">
        <van-uploader
          multiple
          style="margin-top: 15px; margin-left: 15px"
          v-model="form.fkImg"
          :after-read="uploadImg"
          :max-count="9"
          preview-size="80px"
          @delete="delImg"
        />
      </div>
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">修复时间:</span>
      </div>
      <van-field input-align="right" readonly v-model="form.xfTime" />
      <div class="font-bold">
        <span style="margin-left: 15px; font-size: 18px">故障历时:</span>
      </div>
      <van-field input-align="right" readonly v-model="form.history" />

      <div class="title">
        <span>配件清单</span>
      </div>
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="mini"
        :data="form.pjqd"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="数量">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dw" label="单位">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.dw"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="mini" style="width: 100%" @click="addRow">+</el-button>
      <div class="topBtn">
        <van-button style="width: 45%" @click="back">返回</van-button>
        <van-button type="primary" style="width: 45%" @click="submit"
          >确定</van-button
        >
      </div>

      <!--报修大类弹出层 -->
      <van-popup v-model="showStatus" round position="bottom">
        <van-picker
          value-key="name"
          show-toolbar
          :columns="StatusOpt"
          @cancel="showStatus = false"
          @confirm="confirmStatus"
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
      fileIds: [],
      wp: "",
      showDl: false,
      showStatus: false,
      bxOpt: [],
      StatusOpt: [
        {
          name: "待处理",
        },
        {
          name: "处理中",
        },
        {
          name: "已处理",
        },
      ],
      postData: [],
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
    back() {
      this.$router.push("/phone/bxPhone/components/fzr");
    },
    //!添加表格行
    addRow() {
      this.form.pjqd.push({});
    },
    //!确定状态
    confirmStatus(val) {
      this.showStatus = false;
      if (val.name == "待处理") {
        this.form.status = 0;
      } else if (val.name == "处理中") {
        this.form.status = 1;
      } else if (val.name == "已处理") {
        this.form.status = 2;
      }
      console.log(val.name, this.form.status);
    },
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

    //!提交
    submit() {
      let val = this.form;
      val.bxTeaid = this.unionid;
      val.fkImg = this.fileIds;
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
    this.fileIds = this.form.fkImg;
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
  font-weight: bold;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0064ff;
  font-size: 18px;
}
.font-bold {
  font-weight: bold;
  padding-top: 10px;
}
/deep/.van-field__control,
/deep/.van-field__control--right {
  font-size: 18px;
}
</style>
