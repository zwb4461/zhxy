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
      <el-button size="small" style="width: 108px" @click="lrsz"
        >录入设置</el-button
      >
      <el-button size="small" style="width: 108px">批量复制</el-button>
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
          <template v-for="(item, index) in tableColumns">
            <el-table-column :key="index" :label="item.name" width="100">
              <!-- <template slot-scope="scope">
                <div>
                  {{
                    scope.row.xkdedi[index] ? scope.row.xkdedi[index].flag : ""
                  }}
                </div>
              </template> -->
            </el-table-column>
          </template>
        </el-table>
        <div class="addRow">
          <el-button
            @click="addRow"
            style="width: 95%; margin-top: 10px"
            size="small"
            >+添加行</el-button
          >
          <el-button
            @click="addColumn"
            style="width: 95%; margin-top: 10px"
            size="small"
            >+添加列</el-button
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
      <el-radio v-model="llfsRadio" label="0">数值</el-radio>
      <el-radio v-model="llfsRadio" label="1">等第</el-radio>
      <div v-if="llfsRadio == '0'" style="margin-top: 15px">
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
      <div v-else style="margin-top: 15px">
        <el-table
          :data="cjlrfsTableData"
          size="small"
          border
          style="width: 100%"
        >
          <el-table-column prop="bh" label="编码" width="80">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.bh"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="rank" label="等第名称" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.rank"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          size="small"
          style="width: 100%; margin-top: 5px"
          @click="addCjlrfsRow"
          >+</el-button
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeLrfs">取 消</el-button>
        <el-button type="primary" @click="submitLrfs">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="录入设置"
      :visible.sync="showLrsz"
      width="30%"
      :before-close="closeLrsz"
    >
      <el-form ref="form3" label-width="80px">
        <el-form-item
          :label="item.name + ':'"
          v-for="(item, index) in lrszList"
          :key="index"
        >
          <el-date-picker
            @change="lrszChange(item)"
            :clearable="false"
            size="small"
            v-model="item.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeLrsz">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加等第转换"
      :visible.sync="showAddDDzh"
      width="30%"
      :before-close="closeAddDdzh"
    >
      <el-form ref="form4" label-width="80px">
        <el-form-item label="名称:">
          <el-input
            size="small"
            v-model="columnsName"
            placeholder="请输入等第转换名"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDdzh">取消</el-button>
        <el-button @click="submitAddDdzh">添加</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="zhName"
      :visible.sync="showDDzh"
      width="30%"
      :before-close="closeDdzh"
    >
      <el-radio-group v-model="needZh" @change="zhChang">
        <el-radio label="无需转换">无需转换</el-radio>
        <el-radio label="已设置">需要转换</el-radio>
      </el-radio-group>
      <div class="sjly" v-show="needZh == '已设置'">
        <span>数据来源:</span>
        <el-select
          size="small"
          @change="changSjly"
          v-model="sjly"
          placeholder="请选择数据来源"
        >
          <el-option
            v-for="item in sjlyOpt"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-table
          size="small"
          :data="ddzhtableData"
          border
          style="width: 100%; margin-top: 10px"
          v-if="lrfsRow == 0 && sjly == -1"
        >
          <el-table-column type="index" label="序" width="50">
          </el-table-column>
          <el-table-column prop="yscj" label="原始成绩" width="180">
            <template slot-scope="scope">
              <el-slider
                v-model="scope.row.yscj"
                input-size="small"
                show-stops
                range
                :max="maxScoreRow"
                :min="minScoreRow"
              >
              </el-slider>
            </template>
          </el-table-column>
          <el-table-column prop="bh" label="编码" width="100">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.bh"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="zhhmc" label="转换后等第名称">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.zhhmc"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          v-if="lrfsRow == 0 && sjly == -1"
          size="mini"
          style="width: 100%"
          @click="addDdRow"
          >+</el-button
        >
        <!-- 等第 -->
        <el-table
          size="small"
          :data="ddzhtableData1"
          border
          style="width: 100%; margin-top: 10px"
          v-if="lrfsRow == 1"
        >
          <el-table-column type="index" label="序" width="50">
          </el-table-column>
          <el-table-column prop="yscj" label="原始成绩1" width="180">
          </el-table-column>
          <el-table-column prop="bm" label="编码" width="100">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.bm"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="zhhmc" label="转换后等第名称">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.zhhmc"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDdzh">取消</el-button>
        <el-button @click="submitDdzh">确定</el-button>
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
      lrszList: [],
      cjlrfsTableData: [], //录入方式表格
      //   新增考试dia
      showAddExam: false,
      //录入方式dia
      showLrfs: false,
      //录入设置dia
      showLrsz: false,
      //添加等第转换-列dia
      showAddDDzh: false,
      //等第转换-列dia
      showDDzh: false,
      //录入方式单选绑定值
      llfsRadio: "0",
      //是否需要转换绑定值
      needZh: "无需转换",
      maxScore: undefined, //最高值
      minScore: undefined, //最低值
      ksdw: "", //单位
      rowId: 0, //当前行id
      tableColumns: [], //表格动态列
      columnsName: "", //动态列名
      ddzhtableData: [], //设置等第转换表格
      ddzhtableData1: [], //设置等第转换表格
      zhName: "", //点击的列名
      sjly: "", //数据来源
      sjlyOpt: [{ name: "原始成绩", id: -1 }], //数据来源选项
      lrfsRow: 0, //当前行的录入方式 ,0--分值，1--等第
      maxScoreRow: 0,
      minScoreRow: 0,
    };
  },
  methods: {
    // 添加成绩录入方式行
    addCjlrfsRow() {
      this.cjlrfsTableData.push({ bm: "", ddmc: "" });
    },
    //   提交等第转化--列
    submitAddDdzh() {
      let val = {
        gradeId: this.gradeId,
        ksId: this.ksId,
        name: this.columnsName,
      };
      main
        .addDd(val)
        .then((res) => {
          this.hxTabel();
          this.showAddDDzh = false;
          this.$message.success(res.data);
          this.columnsName = "";
        })
        .catch((err) => {});
    },
    //关闭添加等地转换-列
    closeAddDdzh() {
      this.showAddDDzh = false;
      this.columnsName = "";
    },
    addDdRow() {
      this.ddzhtableData.push({
        yscj: [this.minScoreRow, this.maxScoreRow],
        bm: "",
        zhhmc: "",
      });
    },
    //关闭等地转换dia
    closeDdzh() {
      this.showDDzh = false;
      this.ddzhtableData = [];
      this.ddzhtableData1 = [];
    },
    //提交等第转换
    submitDdzh() {
      //原始成绩--分值
      if (this.lrfsRow == 0 && this.sjly == -1) {
        let arr = [];
        let typeName = "";
        this.sjlyOpt.map((item) => {
          if (item.id == this.sjly) {
            typeName = item.name;
          }
        });
        this.ddzhtableData.map((item) => {
          arr.push({
            bh: item.bh,
            maxScore: item.yscj[1],
            minScore: item.yscj[0],
            typeName: typeName,
            flag: "已设置",
            name: this.zhName,
            rank: item.zhhmc,
            type: "1",
          });
        });
        let val = {
          id: this.rowId,
          xkdedi: arr,
        };
        main
          .editXk(val)
          .then((res) => {
            this.showDDzh = false;
            this.$message.success(res.data);
            this.hxTabel();
          })
          .catch((err) => {});
      } else {
        let arr = [];
        let typeName = "";
        this.sjlyOpt.map((item) => {
          if (item.id == this.sjly) {
            typeName = item.name;
          }
        });
        this.ddzhtableData1.map((item) => {
          arr.push({
            bh: item.bm,
            typeName: typeName,
            flag: "已设置",
            name: this.zhName,
            rank: item.zhhmc,
            beRank: item.yscj,
            type: "1",
          });
        });
        let val = {
          id: this.rowId,
          xkdedi: arr,
        };
        main.editXk(val).then((res) => {
          this.showDDzh = false;
          this.$message.success(res.data);
          this.hxTabel();
        });
      }
    },
    // 录入设置
    lrsz() {
      this.showLrsz = true;
    },
    //添加行
    addRow() {
      if (this.gradeId == 0) {
        this.$message.error("请选择年级!");
      } else {
        this.tableData.push({});
      }
    },
    //添加列
    addColumn() {
      if (this.gradeId == 0) {
        this.$message.error("请选择年级!");
      } else {
        this.showAddDDzh = true;
      }
    },
    //   点击单元格
    clickCell(row, column, cell, event) {
      this.rowId = row.id;
      if (column.label == "录入方式") {
        this.showLrfs = true;

        this.maxScore = row.maxScore;
        this.minScore = row.minScore;
        this.ksdw = row.ksdw;
        this.llfsRadio = row.lrfs ? row.lrfs.toString() : "0";
        console.log("1212", this.llfsRadio);
      }
      this.sjlyOpt = [{ name: "原始成绩", id: -1 }];
      this.tableColumns.map((item) => {
        if (column.label == item.name) {
          this.showDDzh = true;
          this.zhName = column.label; //点击的列名
        }

        this.sjlyOpt.push({ name: item.name, id: item.id });
      });
      console.log("row", row);
      this.needZh = "无需转换"; //清空是否需要转换
      this.sjly = ""; //原始数据下拉框
      this.lrfsRow = row.lrfs; //获取点击的单元的录入方式0--数值，1--等第
      this.maxScoreRow = row.maxScore;
      this.minScoreRow = row.minScore;
      if (row.lrfs == 1) {
        this.cjlrfsTableData = row.showdedi;
        console.log("this.cjlrfsTableData", this.cjlrfsTableData);
        if (row.xkdedi[0] ? row.xkdedi[0].flag == "已设置" : false) {
          this.ddzhtableData1 = [];
          this.needZh = "已设置";
          this.sjlyOpt.map((item) => {
            if (item.name == row.xkdedi[0].typeName) {
              this.sjly = item.id;
            }
          });
          row.xkdedi.map((item) => {
            this.ddzhtableData1.push({
              yscj: item.beRank,
              bm: item.bh,
              zhhmc: item.rank,
            });
          });
        }
      } else if (row.lrfs == 0) {
        if (row.xkdedi[0] ? row.xkdedi[0].flag == "已设置" : false) {
          this.ddzhtableData = [];
          this.needZh = "已设置";
          this.sjlyOpt.map((item) => {
            if (item.name == row.xkdedi[0].typeName) {
              this.sjly = item.id;
            }
          });
          row.xkdedi.map((item) => {
            this.ddzhtableData.push({
              yscj: [item.minScore, item.maxScore],
              bh: item.bh,
              zhhmc: item.rank,
            });
          });
        }
      }
    },
    // 是否需要转换
    zhChang(val) {
      console.log(val);
    },
    //改变数据来源
    changSjly(val) {
      console.log("val", val);
      let name = "";
      this.sjlyOpt.map((item) => {
        if (item.id == val) {
          name = item.name;
        }
      });
      let obj = {
        gradeId: this.gradeId,
        ksId: this.ksId,
        name: name,
        xkksId: this.rowId,
      };

      main
        .findDd(obj)
        .then((res) => {
          console.log("res", res.data);
          let arr = [];
          res.data.map((item) => {
            if (item.rank) {
              arr.push({
                yscj: item.rank,
              });
            }
          });
          this.ddzhtableData1 = arr;
        })
        .catch((err) => {});
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
    //  录入设置改变
    lrszChange(item) {
      let val = {
        endTime: item.date[1],
        startTime: item.date[0],
        id: item.id,
      };
      main
        .edit(val)
        .then((res) => {
          this.$message.success(res.data);
        })
        .catch((err) => {});
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
      if (this.llfsRadio == "0") {
        let val = {
          id: this.rowId,
          gradeId: this.gradeId,
          ksId: this.ksId,
          maxScore: parseInt(this.maxScore),
          minScore: parseInt(this.minScore),
          ksdw: this.ksdw,
          lrfs: 0,
        };
        main
          .editXk(val)
          .then((res) => {
            this.showLrfs = false;
            this.$message.success(res.data);
            this.maxScore = undefined;
            this.minScore = undefined;
            this.ksdw = "";
            this.llfsRadio = "0";
            this.hxTabel();
          })
          .catch((err) => {});
      } else {
        let arr = [];
        this.cjlrfsTableData.map((item) => {
          arr.push({
            bh: item.bh,
            name: "原始成绩",
            rank: item.rank,
            type: "-1",
          });
        });
        let val = {
          id: this.rowId,
          lrfs: 1,
          showdedi: arr,
        };
        // console.log("val", val);
        main
          .editXk(val)
          .then((res) => {
            this.showLrfs = false;
            this.$message.success(res.data);
            this.llfsRadio = "0";
            this.cjlrfsTableData = [];
            this.hxTabel();
          })
          .catch((err) => {});
      }
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
          console.log("res.data.list", res.data.list);
          let arr = [];
          res.data.list.map((item) => {
            arr.push({
              name: item.name,
              id: item.id,
              date: [item.startTime, item.endTime],
            });
          });
          this.lrszList = arr;
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
          res.data.list[0].showNj.map((item) => {
            if (item.id == this.gradeId) {
              this.tableColumns = item.scoreRankChanges;
            }
          });
          console.log("this.tableColumns", this.tableColumns);
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
          res.data.list[0].showNj.map((item) => {
            if (item.id == this.gradeId) {
              this.tableColumns = item.scoreRankChanges;
            }
          });
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
    // 关闭录入设置dia
    closeLrsz() {
      this.showLrsz = false;
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
.sjly {
  margin-top: 15px;
}
</style>