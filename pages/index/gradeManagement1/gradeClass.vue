<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="clickTab">
      <el-tab-pane label="成绩录入" name="3">
        <div class="condition">
          <el-select
            v-model="xueqi"
            placeholder="请选择学期"
            size="small"
            style="margin-right: 15px; width: 218px"
            @change="changeXq"
          >
            <el-option
              v-for="item in xueqiOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="xueke"
            placeholder="请选择学科"
            size="small"
            style="margin-right: 15px"
            @change="changeXk"
          >
            <el-option
              v-for="item in xuekeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            size="small"
            style="background-color: #fafafa; width: 108px"
            @click="plDeal"
            >批量处理</el-button
          >
        </div>
        <div class="contain">
          <div class="left">
            <el-tree
              :data="ClassData"
              :props="ClassProps"
              @node-click="clickTree"
              highlight-current
              accordion
            ></el-tree>
          </div>
          <div class="right">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              size="small"
              @cell-click="clickCell"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="xh" label="学号" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <template v-for="(item, index) in DynamicColumn">
                <el-table-column
                  :key="index"
                  :label="item.name"
                  :prop="item.name"
                >
                  <template slot-scope="scope">
                    <span
                      v-if="
                        scope.row.index === tabClickIndex &&
                        tabClickLabel === item.name
                      "
                    >
                      <el-input
                        v-model="scope.row.showExam[index].score"
                        max-length="300"
                        size="mini"
                        @blur="inputBlur(scope.row)"
                      />
                    </span>
                    <span v-else>{{
                      scope.row.showExam && scope.row.showExam.length > 0
                        ? scope.row.showExam[index].score
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <template v-for="(subItem, subIndex) in item.scoreChange">
                  <el-table-column
                    :key="subIndex + item.name"
                    :label="subItem.name"
                  >
                    {{ subItem.score }}
                  </el-table-column>
                </template>
              </template>
              <!-- 
              <el-table-column prop="xkName" label="课程名称" width="180">
              </el-table-column> -->
              <el-table-column prop="comment" label="期末评语" width="250">
                <template slot-scope="scope">
                  <div>
                    <el-popover trigger="hover" placement="top">
                      <div style="width: 380px">
                        <p>{{ scope.row.comment }}</p>
                      </div>
                      <!-- <p>住址: {{ scope.row.xkName }}</p> -->
                      <div
                        slot="reference"
                        style="
                          display: inline-block;
                          white-space: nowrap;
                          width: 220px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                      >
                        <span size="medium">{{ scope.row.comment }}</span>
                      </div>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div></el-tab-pane
      >
      <el-tab-pane label="成绩统计" name="4">成绩统计</el-tab-pane>
    </el-tabs>
    <qmpy
      ref="qmpyComponent"
      :commentRow="commentRow"
      :getTable="changeXq"
    ></qmpy>
  </div>
</template>

<script>
import main from "~/api/scoreEntry";
import qmpy from "./components/qmpy";
import firstTerm from "./firstTerm";
import secondTerm from "./secondTerm";
export default {
  components: {
    qmpy,
    firstTerm,
    secondTerm,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    DynamicColumn: function () {
      //   debugger;
      if (this.tableData.length > 0) return this.tableData[0].showExam;
      return [];
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      activeName: "3", //顶部tabs
      cjlbId: 0, //当前课程类别id
      classId: "", //当前选择的班级id
      xueqi: 1, //下拉框-学期-绑定值
      xueqiOpt: [
        //下拉框-学期-选项
        { label: "第一学期", value: 1 },
        { label: "第二学期", value: 2 },
      ],
      xueke: "", //下拉框-学科-绑定值
      xuekeOpt: [
        //下拉框-学科-选项
      ],
      tableData: [], //表格数据
      ClassData: [], //班级树形数据
      ClassProps: {
        //班级-树形的默认设置
        children: "children",
        label: "name",
      },
      commentRow: {}, //当前评语行数据
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },

    // 失去焦点初始化
    inputBlur(row) {
      let val = row;
      delete val.comment;
      delete val.createTime;
      delete val.ifdelete;
      delete val.index;
      delete val.ksName;
      delete val.ksTime;
      delete val.ksdata;
      delete val.rank;
      delete val.score;
      delete val.xh;
      val.schoolId = this.schoolId;
      val.createUser = this.unionid;
      console.log("val", val);
      if (!val.id) {
        val.xkName = this.xueke;
        val.djxq = this.xueqi;
        val.cjlbId = this.cjlbId;
      }
      // comment/createTime/ifdelete/index/ksName/ksTime/ksdata/rank/score/xh/showExam.scoreChange
      //   添加createUser

      main
        .addEdit(val)
        .then((res) => {
          this.changeXq();
        })
        .catch((err) => {});
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },

    //单击单元格
    clickCell(row, column, cell, event) {
      console.log("rowrowrow", row);
      if (row.id == null && !this.xueke) {
        this.$message.error("请选择录入学科！");
      } else {
        this.tabClickIndex = row.index;
        this.tabClickLabel = column.label;
      }

      if (column.label == "期末评语") {
        // console.log("期末评语", row);
        this.commentRow = row;
        this.$refs.qmpyComponent.showPy(row.comment);
        this.$refs.qmpyComponent.showQmpyDia = true;
      }
    },
    //下拉框--学期
    changeXq() {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: this.classId,
        xkName: this.xueke,
        djxq: this.xueqi,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    //下拉框--学科
    changeXk() {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: this.classId,
        xkName: this.xueke,
        djxq: this.xueqi,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    //   点击树
    clickTree(data) {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
        classId: data.id,
      };
      console.log(val);
      this.classId = data.id;
      main
        .find(val)
        .then((res) => {
          // 点击班级时清空下拉框
          this.xuekeOpt = [];
          this.xueqi = 1;
          this.xueke = "";
          this.tableData = res.data.list;
          res.data2.xuekes.map((item) => {
            this.xuekeOpt.push({
              label: item.name,
              value: item.name,
            });
          });
        })
        .catch((err) => {});
    },
    //获取树
    getClass() {
      let val = {
        cjlbId: this.cjlbId,
        schoolId: this.schoolId,
      };
      //   console.log("val", val);
      main
        .find(val)
        .then((res) => {
          this.ClassData = res.data2.class;
        })
        .catch((err) => {});
    },
    // 批量处理
    plDeal() {
      console.log("this.cjlbId", this.cjlbId);
    },
    //点击顶部tabs
    clickTab(tab, event) {
      //   console.log(tab, event);
    },
  },
  created() {
    this.cjlbId = this.id;
    console.log("cjlbId", this.cjlbId);
    this.getClass();
  },
};
</script>

<style scoped>
.condition {
  width: 100%;
  height: 50px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  flex-direction: row;
}
.contain {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  min-width: 250px;
  width: 250px;
  border: 1px solid #eeeeee;
  min-height: 600px;
}
.right {
  width: 100%;
  padding-left: 15px;
}
</style>