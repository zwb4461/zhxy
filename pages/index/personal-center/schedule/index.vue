<template>
  <div>
    <el-table
      :data="tableData"
      border
      size="small"
      style="width: 100%; margin-top: 20px"
      :span-method="objectSpanMethod"
    >
      <el-table-column prop="time" width="100"></el-table-column>
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="one" label="星期一"> </el-table-column>
      <el-table-column prop="two" label="星期二"> </el-table-column>
      <el-table-column prop="three" label="星期三"> </el-table-column>
      <el-table-column prop="four" label="星期四"> </el-table-column>
      <el-table-column prop="five" label="星期五"> </el-table-column>
    </el-table>
    <el-button type="primary" @click="getTable">123</el-button>
  </div>
</template>

<script>
import main from "~/api/courseManagement";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      tableData: [
        { time: "上午", one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { time: "下午", one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
        { one: "", two: "", three: "", four: "", five: "" },
      ],
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    getTable() {
      main
        .seeOwnerHour({ schoolId: this.schoolId, unionid: this.unionid })
        .then((res) => {
          res.data.stanzas.map((item) => {
            if (item.weekName == "星期一" && item.sort == 1) {
              this.tableData[0].one =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期二" && item.sort == 1) {
              this.tableData[0].two =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期三" && item.sort == 1) {
              this.tableData[0].three =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期四" && item.sort == 1) {
              this.tableData[0].four =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期五" && item.sort == 1) {
              this.tableData[0].five =
                item.subjectName + "(" + item.className + ")";
            }
            if (item.weekName == "星期一" && item.sort == 2) {
              this.tableData[1].one =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期二" && item.sort == 2) {
              this.tableData[1].two =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期三" && item.sort == 2) {
              this.tableData[1].three =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期四" && item.sort == 2) {
              this.tableData[1].four =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期五" && item.sort == 2) {
              this.tableData[1].five =
                item.subjectName + "(" + item.className + ")";
            }
            if (item.weekName == "星期一" && item.sort == 3) {
              this.tableData[2].one =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期二" && item.sort == 3) {
              this.tableData[2].two =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期三" && item.sort == 3) {
              this.tableData[2].three =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期四" && item.sort == 3) {
              this.tableData[2].four =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期五" && item.sort == 3) {
              this.tableData[2].five =
                item.subjectName + "(" + item.className + ")";
            }
            if (item.weekName == "星期一" && item.sort == 4) {
              this.tableData[3].one =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期二" && item.sort == 4) {
              this.tableData[3].two =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期三" && item.sort == 4) {
              this.tableData[3].three =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期四" && item.sort == 4) {
              this.tableData[3].four =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期五" && item.sort == 4) {
              this.tableData[3].five =
                item.subjectName + "(" + item.className + ")";
            }
            if (item.weekName == "星期一" && item.sort == 5) {
              this.tableData[4].one =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期二" && item.sort == 5) {
              this.tableData[4].two =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期三" && item.sort == 5) {
              this.tableData[4].three =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期四" && item.sort == 5) {
              this.tableData[4].four =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期五" && item.sort == 5) {
              this.tableData[4].five =
                item.subjectName + "(" + item.className + ")";
            }
            if (item.weekName == "星期一" && item.sort == 6) {
              this.tableData[5].one =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期二" && item.sort == 6) {
              this.tableData[5].two =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期三" && item.sort == 6) {
              this.tableData[5].three =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期四" && item.sort == 6) {
              this.tableData[5].four =
                item.subjectName + "(" + item.className + ")";
            } else if (item.weekName == "星期五" && item.sort == 6) {
              this.tableData[5].five =
                item.subjectName + "(" + item.className + ")";
            }
          });
          console.log("tableData", this.tableData);
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
  },
};
</script>

<style lang="scss" scoped></style>
