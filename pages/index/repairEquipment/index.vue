<template>
  <div>
    <div class="search">
      <el-select
        size="small"
        v-model="search.sbdl"
        placeholder="设备大类"
        class="inp"
      >
        <el-option
          v-for="item in search.sbdlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-select
        size="small"
        v-model="search.sbzl"
        placeholder="设备子类"
        class="inp"
      >
        <el-option
          v-for="item in search.sbzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-date-picker
        class="inp"
        style="width: 365px"
        size="small"
        v-model="search.dataTime"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-select
        size="small"
        v-model="search.status"
        placeholder="审核状态"
        class="inp"
      >
        <el-option
          v-for="item in search.sbzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-button size="small" type="primary">查询</el-button>
      <el-button size="small" type="primary" @click="addBtn">+新增</el-button>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      border
      size="small"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="bxTime" label="报修时间" align="center">
      </el-table-column>
      <el-table-column prop="maxCate" label="报修大类" align="center">
      </el-table-column>
      <el-table-column prop="minCate" label="报修小类" align="center">
      </el-table-column>
      <el-table-column prop="name" label="物品名称" align="center">
      </el-table-column>
      <el-table-column prop="address" label="报修地点" align="center">
      </el-table-column>
      <el-table-column prop="explaion" label="情况说明" align="center">
      </el-table-column>
      <el-table-column prop="bxTeaname" label="报修教师" align="center">
      </el-table-column>
      <el-table-column prop="status" label="处理状态" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 0">待处理</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 1">处理中</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clTeaname" label="处理教师" align="center">
      </el-table-column>
      <el-table-column prop="xfTime" label="修复时间" align="center">
      </el-table-column>
      <el-table-column prop="history" label="故障历时" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="primary" @click="see(scope.row)"
            >查看</a-button
          >
          <a-button size="small" @click="edit(scope.row)">编辑</a-button>
          <a-button size="small" type="danger" @click="del(scope.row)"
            >删除</a-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="报修"
      :visible.sync="showBx"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <el-form label-width="80px">
          <el-form-item label="报修时间:">
            <span>{{ form.bxTime }}</span>
          </el-form-item>
          <el-form-item label="报修大类:">
            <el-select @change="changeBxDl" size="small" v-model="form.maxCate">
              <el-option
                v-for="item in maxCateOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报修小类:">
            <el-select @change="changeBxXl" size="small" v-model="form.minCate">
              <el-option
                v-for="item in minCateOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物品名称:">
            <el-select size="small" v-model="form.name">
              <el-option
                v-for="item in nameOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报修地点:">
            <el-input size="small" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="情况说明:">
            <el-input
              size="small"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10 }"
              v-model="form.explaion"
            ></el-input>
          </el-form-item>
          <el-form-item label="报修图片:">
            <span>{{ form.bxImg }}</span>
          </el-form-item>
          <el-form-item label="报修教师:">
            <span>{{ form.bxTeaid }}</span>
          </el-form-item>
          <el-form-item label="处理状态:">
            <span>{{ form.status }}</span>
          </el-form-item>
          <el-form-item label="处理教师:">
            <span>{{ form.clTeaid }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="showBx = false">取 消</el-button>
        <el-button type="primary" @click="submitBx">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/baoxiu";
import main1 from "~/api/baoxiuCs";
export default {
  data() {
    return {
      gettime: "",
      formType: 1, //1--新增，2编辑
      tableData: [],
      search: {
        sbdlOpt: [],
        sbzlOpt: [],
        sbdl: "",
        sbzl: "",
        dataTime: "",
        status: "",
      },
      maxCateOpt: [],
      minCateOpt: [],
      nameOpt: [],
      form: {
        bxTime: "",
        maxCate: "",
        minCate: "",
        name: "",
        address: "",
        explaion: "",
        bxImg: "",
        bxTeaid: "",
        clTeaid: "",
        status: 0,
      },
      showBx: false,
      tableData_left: [],
      tableData_center: [],
      tableData_right: [],
    };
  },
  methods: {
    //!改变报修大类获取报修小类
    changeBxDl(val) {
      this.minCateOpt = [];
      this.nameOpt = [];
      this.form.minCate = "";
      this.form.name = "";
      this.tableData_left.map((item) => {
        if (item.children && item.name == val) {
          item.children.map((subItem) => {
            this.minCateOpt.push({
              name: subItem.name,
              id: subItem.id,
            });
          });
        }
      });
    },
    //!改变报修小类获取物品名称
    changeBxXl(val) {
      this.nameOpt = [];
      this.form.name = "";
      this.tableData_left.map((item) => {
        if (item.children) {
          item.children.map((subItem) => {
            if (subItem.children && subItem.name == val) {
              subItem.children.map((subItem1) => {
                this.nameOpt.push({
                  name: subItem1.name,
                  id: subItem1.id,
                });
              });
            }
          });
        }
      });
    },
    //!获取报修大类数据源
    getBxDl() {
      main1
        .findCs({})
        .then((res) => {
          this.tableData_left = res.data.setRepcates;
          this.tableData_center = res.data.setRepapjs;
          this.tableData_right = res.data.setAddrs;
          //?赋值报修大类数据源
          this.maxCateOpt = [];
          this.tableData_left.map((item) => {
            this.maxCateOpt.push({
              name: item.name,
              id: item.id,
            });
          });
        })
        .catch((err) => {});
    },
    //!提交报修
    submitBx() {
      if (this.formType == 1) {
        //新增
        let val = {
          bxTime: "2021-01-12 10:37",
          maxCate: "报修大类",
          minCate: "报修小类",
          name: "物品名称",
          address: "报修地点",
          explaion: "情况说明",
          bxImg: "",
          bxTeaid: "1",
          clTeaid: "2",
          status: 0,
        };
        main
          .edit(val)
          .then((res) => {
            this.$message.success("新增成功!");
            this.getTable(20, 1);
            this.showBx = false;
          })
          .catch((err) => {});
      } else if (this.formType == 2) {
        //编辑
      }
    },
    //!获取数据
    getTable(pageNum, pageSize) {
      let val = {
        // pageNum: pageNum,
        // pageSize: pageSize,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    //!重置表单
    clearForm() {
      this.form = {
        bxTime: "",
        maxCate: "",
        minCate: "",
        name: "",
        address: "",
        explaion: "",
        bxImg: "",
        bxTeaid: "",
        clTeaid: "",
        status: 0,
      };
      this.minCateOpt = [];
      this.nameOpt = [];
      this.maxCateOpt = [];
    },
    //!点击新增按钮
    addBtn() {
      this.clearForm();
      this.getTime();
      this.getBxDl();
      this.formType = 1;
      this.showBx = true;
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
    //!查看
    see() {},
    //!编辑
    edit() {
      this.formType = 2;
      this.showBx = true;
    },
    //!删除
    del() {},
  },
  created() {
    this.getTable(20, 1);
  },
};
</script>

<style scoped>
.search {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  width: 180px;
  margin-right: 15px;
}
</style>