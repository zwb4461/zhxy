<template>
  <div class="contain1">
    <div style="width: 100%; min-height: 100px">
      <el-table
        size="small"
        :header-cell-style="{ 'text-align': 'center' }"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column label="一、学科基础知识和能力">
          <el-table-column
            :label="item.name"
            v-for="(item, index) in bt"
            :key="index"
          >
            <template slot-scope="scope">
              <el-input
                v-show="index == 0"
                v-model="scope.row[index]"
                size="small"
                @input="editOneXq1(scope.row)"
              ></el-input>
              <span v-show="index == 1"> {{ scope.row[index] }}</span>
              <el-select
                style="width: 100%"
                v-show="index > 1"
                size="small"
                v-model="scope.row[index]"
                @focus="getDd(scope.row, item)"
                @change="editOneXq"
              >
                <el-option
                  v-for="(item, ddIndex) in ddOpt"
                  :key="ddIndex"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="xz">
      <span>校长:</span>
      <el-input
        @blur="editXz"
        v-model="xz"
        style="width: 100px; margin-right: 15px"
        size="small"
      ></el-input>
      <span>教导主任:</span>
      <el-input
        @blur="editXz"
        v-model="jdzr"
        style="width: 100px; margin-right: 15px"
        size="small"
      ></el-input>
      <span>应出席(天):</span>
      <el-input
        @blur="editXz"
        v-model="ycx"
        style="width: 100px; margin-right: 15px"
        size="small"
      ></el-input>
      <span>家长可看成绩报告:</span>
      <el-switch
        @change="editXz"
        v-model="jzkk"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="1"
        :inactive-value="0"
      >
      </el-switch>
    </div>
  </div>
</template>

<script>
import main from "~/api/cjdsz";
import main1 from "~/api/addGradeClass";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      jzkk: 0,
      tableData: [],
      bt: [], //表头
      ddOpt: [],
      ksxuekeId: 0, //当前行的考试学科id
      ksId: 0, //当前行的考试id
      xz: "",
      jdzr: "",
      ycx: "",
    };
  },
  methods: {
    //获取第一学期表格数据
    find() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: 1,
      };
      main
        .find(val)
        .then((res) => {
          this.jdzr = res.data.director;
          this.xz = res.data.principal;
          this.ycx = res.data.ycx;
          this.jzkk = res.data.jzkk;
          // 获取表头
          this.bt = res.data.names;
          this.tableData = res.data.xkMap;
        })
        .catch((err) => {});
    },
    editXz() {
      let val = {
        id: this.cjlbId,
        director: this.jdzr,
        principal: this.xz,
        ycx: this.ycx,
        jzkk: this.jzkk,
      };
      main1
        .edit(val)
        .then((res) => {
          this.find();
        })
        .catch((err) => {});
    },
    //修改第一学期
    editOneXq(dd) {
      console.log(dd);
      let val = {
        cjlbId: this.cjlbId,
        dediName: dd,
        djxq: 1,
        xkName: this.xkName,
        ksId: this.ksId,
      };
      main
        .saveAchimodule(val)
        .then((res) => {
          this.find();
        })
        .catch((err) => {});
    },
    editOneXq1(row) {
      console.log(row);
      let val = {
        cjlbId: this.cjlbId,
        djxq: 1,
        xkName: row[1],
        ksId: this.ksId,
        sort: row[0],
      };
      this.xkName = row[1];
      main
        .saveAchimodule(val)
        .then((res) => {
          this.find();
        })
        .catch((err) => {});
    },
    //获取第一学期等第
    getDd(row, item) {
      console.log(row, item);
      this.ksId = item.id;
      let len = this.bt.length;
      this.ksxuekeId = row[len];
      this.xkName = row[1];
      let val = {
        cjlbId: this.cjlbId,
        // ksxuekeId: this.ksxuekeId,
        djxq: 1, //第二个表格为2
        ksId: this.ksId,
        xkName: this.xkName,
      };
      main
        .seeDedis(val)
        .then((res) => {
          this.ddOpt = res.data;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.find();
  },
};
</script>

<style scoped>
.contain1 {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
}
.xz {
  width: 100%;
  height: 50px;
  margin-top: 30px;
  margin-left: 50px;
  /* display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row; */
}
</style>