<template>
  <div>
    <div class="top">
      <el-button
        size="small"
        type="primary"
        style="width: 218px"
        @click="addExam"
        >新增考试</el-button
      >
      <el-button size="small" style="width: 218px">录入设置</el-button>
      <el-button size="small" style="width: 218px">批量复制</el-button>
    </div>
    <div class="contain">
      <div class="left">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="clickTree"
          default-expand-all
          highlight-current
        ></el-tree>
      </div>
      <div class="right">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          size="small"
          @cell-click="clickCell"
        >
          <el-table-column prop="name" label="学科/设置" width="180">
            <template slot-scope="scope">
              <el-select
                @change="xkChange(scope)"
                size="small"
                v-model="scope.row.name"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in xkList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="kssj" label="考试时间" width="180">
            <template slot-scope="scope">
              <el-date-picker
                @change="kssjChange(scope)"
                style="width: 150px"
                size="small"
                v-model="scope.row.kssj"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="ksfs" label="考试方式" width="120">
            <template slot-scope="scope">
              <el-input
                size="small"
                @change="ksfsChange(scope)"
                v-model="scope.row.ksfs"
                placeholder="请输入考试方式"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lrqx" label="录入权限" width="100">
          </el-table-column>
          <el-table-column prop="lrfs" label="录入方式" width="80">
            <template slot-scope="scope">
              {{
                scope.row.lrfs == 0 ? "分值" : scope.row.lrfs == 1 ? "等第" : ""
              }}
            </template>
          </el-table-column>
        </el-table>
        <div class="addRow">
          <el-button
            @click="addRow"
            style="width: 95%; margin-top: 10px"
            size="small"
            >+添加行</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      title="考试管理"
      :visible.sync="showAddExam"
      width="25%"
      :before-close="closeAddExam"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="考试名称">
          <el-input
            size="small"
            style="width: 300px"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="对应年级">
          <el-select
            style="width: 300px"
            size="small"
            v-model="form.dynj"
            multiple
            placeholder="请选择对应年级"
          >
            <el-option
              v-for="item in dynjOpt"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddExam">取 消</el-button>
        <el-button type="primary" @click="submitAddExam">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="录入方式"
      :visible.sync="showLrfs"
      width="30%"
      :before-close="closeLrfs"
    >
      <el-radio v-model="llfsRadio" label="1">数值</el-radio>
      <el-radio v-model="llfsRadio" label="2">等第</el-radio>
      <div v-if="llfsRadio == '1'" style="margin-top: 15px">
        <el-form ref="form2" label-width="80px">
          <el-form-item label="最低值:">
            <el-input
              size="small"
              style="width: 300px"
              v-model="minScore"
            ></el-input>
          </el-form-item>
          <el-form-item label="最高值:">
            <el-input
              size="small"
              style="width: 300px"
              v-model="maxScore"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位:">
            <el-input
              size="small"
              style="width: 300px"
              v-model="ksdw"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else style="margin-top: 15px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeLrfs">取 消</el-button>
        <el-button type="primary" @click="submitLrfs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/examManage";
import main1 from "~/api/termManage";
export default {
  props: ["djxq", "cjlbId"],
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      ksId: 0, //点击树获取考试id
      gradeId: 0, //点击树获取年级id
      // 右侧表格数据
      tableData: [],
      //新增考试字段
      form: {
        name: "",
        dynj: [],
      },
      dynjOpt: [], //对应年级列表
      xkList: [], //所有学科列表
      defaultProps: {
        children: "showNj",
        label: "name",
      },
      treeData: [],
      //   新增考试dia
      showAddExam: false,
      //录入方式dia
      showLrfs: false,
      //录入方式单选绑定值
      llfsRadio: "1",
      maxScore: undefined, //最高值
      minScore: undefined, //最低值
      ksdw: "", //单位
      rowId: 0, //当前行id
    };
  },
  methods: {
    //添加行
    addRow() {
      if (this.gradeId == 0) {
        this.$message.error("请选择年级!");
      } else {
        this.tableData.push({});
      }
    },
    //   单击单元格
    clickCell(row, column, cell, event) {
      if (column.label == "录入方式") {
        this.showLrfs = true;
        this.rowId = row.id;
        this.maxScore = row.maxScore;
        this.minScore = row.minScore;
        this.ksdw = row.ksdw;
      }
    },
    //   学科值改变
    xkChange(scope) {
      if (scope.row.id) {
        let val = {
          id: scope.row.id,
          gradeId: this.gradeId,
          ksId: this.ksId,
          name: scope.row.name,
          lrqx: "任课老师",
        };
        console.log("1111", scope.row);
        main
          .editXk(val)
          .then((res) => {
            this.hxTabel();
          })
          .catch((err) => {});
      } else {
        let val = {
          gradeId: this.gradeId,
          ksId: this.ksId,
          name: scope.row.name,
          lrqx: "任课老师",
        };
        console.log("2222");
        main
          .addXk(val)
          .then((res) => {
            this.hxTabel();
          })
          .catch((err) => {});
      }
    },
    //  考试时间改变
    kssjChange(scope) {
      let val = {
        id: scope.row.id,
        gradeId: this.gradeId,
        ksId: this.ksId,
        kssj: scope.row.kssj,
        lrqx: "任课老师",
      };
      main
        .editXk(val)
        .then((res) => {
          this.hxTabel();
        })
        .catch((err) => {});
    },
    //  考试方式改变
    ksfsChange(scope) {
      let val = {
        id: scope.row.id,
        gradeId: this.gradeId,
        ksId: this.ksId,
        ksfs: scope.row.ksfs,
        lrqx: "任课老师",
      };
      main
        .editXk(val)
        .then((res) => {
          this.hxTabel();
        })
        .catch((err) => {});
    },
    // 提交录入方式
    submitLrfs() {
      let val = {
        id: this.rowId,
        gradeId: this.gradeId,
        ksId: this.ksId,
        maxScore: parseInt(this.maxScore),
        minScore: parseInt(this.minScore),
        ksdw: this.ksdw,
      };
      main
        .editXk(val)
        .then((res) => {
          this.showLrfs = false;
          this.$message.success(res.data);
          this.maxScore = undefined;
          this.minScore = undefined;
          this.ksdw = "";
          this.llfsRadio = "1";
          this.hxTabel();
        })
        .catch((err) => {});
    },
    //获取所有学科
    getAllXk() {
      main
        .findXk({ schoolId: this.schoolId })
        .then((res) => {
          this.xkList = res.data;
          console.log(" this.xkList", this.xkList);
        })
        .catch((err) => {});
    },
    //   获取新增考试中年级列表
    getDynj() {
      let val = {
        schoolId: this.schoolId,
        xueqiId: this.djxq,
      };
      main1
        .find(val)
        .then((res) => {
          this.dynjOpt = res.data.list[0].showNj;
        })
        .catch((err) => {});
    },
    //获取左侧树形列表
    getTreeData() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: parseInt(this.djxq),
      };
      main
        .find(val)
        .then((res) => {
          this.treeData = res.data.list;
        })
        .catch((err) => {});
    },
    //点击左侧树
    clickTree(data, Node) {
      this.ksId = Node.parent.data.id;
      this.gradeId = data.id;
      let val = {
        cjlbId: this.cjlbId,
        djxq: parseInt(this.djxq),
        ksId: Node.parent.data.id,
        gradeId: data.id,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list[0].xuekes;
        })
        .catch((err) => {});
    },
    //回显右侧表格
    hxTabel() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: parseInt(this.djxq),
        ksId: this.ksId,
        gradeId: this.gradeId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list[0].xuekes;
        })
        .catch((err) => {});
    },
    //添加考试
    addExam() {
      this.showAddExam = true;
    },
    // 关闭新增考试dia
    closeAddExam() {
      this.showAddExam = false;
      this.clearAddExam();
    },
    // 关闭录入方式dia
    closeLrfs() {
      this.showLrfs = false;
      this.maxScore = undefined;
      this.minScore = undefined;
      this.ksdw = "";
      this.llfsRadio = "1";
    },

    // 清除新增考试字段
    clearAddExam() {
      this.form = {
        name: "",
        dynj: [],
      };
    },
    //提交新增考试
    submitAddExam() {
      let showNj = [];
      this.form.dynj.map((item) => {
        showNj.push({
          id: item,
        });
      });
      let val = {
        cjlbId: this.cjlbId,
        djxq: this.djxq,
        name: this.form.name,
        showNj: showNj,
      };
      main
        .add(val)
        .then((res) => {
          this.getTreeData();
          this.showAddExam = false;
          this.$message.success(res.data);
          this.clearAddExam();
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTreeData();
    this.getDynj();
    this.getAllXk();
  },
};
</script>

<style scoped>
.top {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}
.contain {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.left {
  width: 250px;
  min-height: 500px;
  border: 1px solid #eeeeee;
}
.right {
  width: 100%;
  min-height: 500px;
  margin-left: 15px;
}
.addRow {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>