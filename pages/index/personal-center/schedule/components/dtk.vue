<template>
  <div>
    <div class="search">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="add"
        >新增</el-button
      >
    </div>
    <el-table size="small" border :data="tableData" style="width: 100%">
      <el-table-column
        type="index"
        label="序"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="date" label="日期" align="center">
      </el-table-column>
      <el-table-column prop="className" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="stanza" label="课次" align="center">
      </el-table-column>
      <el-table-column prop="oldxkname" label="原授学科" align="center">
      </el-table-column>
      <el-table-column prop="oldTeaname" label="原授课人" align="center">
        <template slot-scope="scope">
          <div style="color: #298cf7">
            {{ scope.row.oldTeaname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="代课/调课" align="center">
        <template slot-scope="scope">
          <div class="dk2">
            <div
              :class="
                scope.row.type == 1 ? 'tk1' : scope.row.type == 0 ? 'dk1' : ''
              "
            >
              {{
                scope.row.type == 1 ? "调课" : scope.row.type == 0 ? "代课" : ""
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="xkname" label="现授学科" align="center">
      </el-table-column>
      <el-table-column prop="teaname" label="现授课人" align="center">
        <template slot-scope="scope">
          <div style="color: #298cf7">
            {{ scope.row.teaname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <!-- 0：申请中，1：待审核，2：审核通过，3：审核未通过，4：自动通过 -->
          <div>
            <el-tag v-show="scope.row.status == 0" type="warning"
              >申请中</el-tag
            >
            <el-tag v-show="scope.row.status == 1">待审核</el-tag>
            <el-tag type="success" v-show="scope.row.status == 2"
              >审核通过</el-tag
            >
            <el-tag type="danger" v-show="scope.row.status == 3"
              >审核未通过</el-tag
            >
            <el-tag type="success" v-show="scope.row.status == 4"
              >自动通过</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="waring" @click="edit(scope.row)"
            >编辑</a-button
          >
          <a-button
            size="small"
            type="waring"
            style="color: #fff; background-color: #ff4d4f"
            @click="del(scope.row)"
            >删除</a-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="changePageSize"
      @current-change="changePageNum"
      :current-page="pageNum"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalDataNum"
    >
    </el-pagination>
    <el-dialog
      title="代调课"
      :visible.sync="showDiaData.showDia"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="dkOrTk">
        <el-radio-group v-model="showDiaData.form.type">
          <el-radio-button :label="0" style="margin-right: 20px"
            >代课</el-radio-button
          >
          <el-radio-button :label="1">调课</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 代课 -->
      <div class="dk" v-show="showDiaData.form.type == 0">
        <el-form
          label-width="90px"
          :model="showDiaData.form"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="学期年级:" prop="classId">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
              @change="chgang1"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="代课日期:" prop="date">
            <el-date-picker
              size="small"
              class="inp"
              v-model="showDiaData.form.date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zj }}
          </el-form-item>
          <el-form-item label="代课课次:" prop="stanza">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
              @focus="getOpt(4)"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.stanz"
                :value="item.stanz"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代课学科:" prop="xkname">
            <el-select
              @focus="getOpt(1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.xkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原授课人:">
            <el-select
              disabled
              @focus="getOpt(2)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaname"
            >
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现授课人:" prop="teaname">
            <el-select
              filterable
              @focus="getOpt(3)"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaname"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授课要求:">
            <el-input
              size="small"
              class="inp"
              v-model="showDiaData.form.must"
            ></el-input>
          </el-form-item>
          <el-form-item label="代课原因:">
            <el-input
              size="small"
              class="inp"
              v-model="showDiaData.form.reason"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.status"
            >
              <el-option
                v-for="item in statusOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <!-- 调课 -->
      <div class="dk" v-show="showDiaData.form.type == 1">
        <el-form
          label-width="90px"
          :model="showDiaData.form"
          :rules="rules1"
          ref="ruleForm1"
        >
          <el-form-item label="学期年级:" prop="classId">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="调课日期:" prop="date">
            <el-date-picker
              size="small"
              class="inp"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="showDiaData.form.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zj }}
          </el-form-item>
          <el-form-item label="调课课次:" prop="stanza">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
              @focus="getOpt(4)"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.stanz"
                :value="item.stanz"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调课学科:" prop="xkname">
            <el-select
              @focus="getOpt(1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.xkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原授课人:">
            <el-select
              disabled
              @focus="getOpt(2)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaname"
            >
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现授课人:" prop="teaname">
            <el-select
              clearable
              filterable
              @focus="getOpt(3)"
              @change="changeXskr"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaname"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.teacherName"
                :value="item.teacherName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调年级:" prop="oldclassId">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNjHt"
              v-model="showDiaData.form.oldclassId"
              :options="xqNjOptHt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="互调日期:" prop="olddate">
            <el-date-picker
              size="small"
              class="inp"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="showDiaData.form.olddate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zjHt }}
          </el-form-item>
          <el-form-item label="互调课次:" prop="oldStanza">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.oldStanza"
            >
              <el-option
                v-for="item in stanzaOptHt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调学科:" prop="oldxkname">
            <el-select
              @focus="getOpt(1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldxkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.subjectName"
                :value="item.subjectName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="调课原因:">
            <el-input
              size="small"
              class="inp"
              v-model="showDiaData.form.reason"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.status"
            >
              <el-option
                v-for="item in statusOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDiaData.showDia = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
export default {
  computed: {
    zj() {
      let data = new Date(this.showDiaData.form.date).getDay();
      return this.getZj(data);
    },
    zjHt() {
      let data = new Date(this.showDiaData.form.olddate).getDay();
      return this.getZj(data);
    },
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
  },
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      rules: {
        classId: [
          { required: true, message: "请选择学期年级", trigger: "blur" },
        ],
        date: [{ required: true, message: "请选择代课日期", trigger: "blur" }],
        stanza: [
          { required: true, message: "请选择代课课次", trigger: "blur" },
        ],
        xkname: [
          { required: true, message: "请选择代课学科", trigger: "blur" },
        ],
        teaname: [
          { required: true, message: "请选择现授课人", trigger: "blur" },
        ],
      },
      rules1: {
        classId: [
          { required: true, message: "请选择学期年级", trigger: "blur" },
        ],
        date: [{ required: true, message: "请选择代课日期", trigger: "blur" }],
        stanza: [
          { required: true, message: "请选择代课课次", trigger: "blur" },
        ],
        xkname: [
          { required: true, message: "请选择代课学科", trigger: "blur" },
        ],
        teaname: [
          { required: false, message: "请选择现授课人", trigger: "blur" },
        ],
        oldclassId: [
          { required: false, message: "请选择互调年级", trigger: "blur" },
        ],
        olddate: [
          { required: false, message: "请选择互调日期", trigger: "blur" },
        ],
        oldStanza: [
          { required: false, message: "请选择互调课次", trigger: "blur" },
        ],
        oldxkname: [
          { required: false, message: "请选择互调学科", trigger: "blur" },
        ],
      },
      // 分页相关
      pageNum: 1,
      totalDataNum: 0,
      pageSize: 20,
      //
      tableData: [],
      kcZdyArr: [],
      xqNjOpt: [],
      xqNjOptHt: [],
      teanameOpt: [],
      oldTeanameOpt: [],
      stanzaOpt: [],
      stanzaOptHt: [
        { name: "第一节", id: 1 },
        { name: "第二节", id: 2 },
        { name: "第三节", id: 3 },
        { name: "第四节", id: 4 },
        { name: "第五节", id: 5 },
        { name: "第六节", id: 6 },
        { name: "第七节", id: 7 },
        { name: "第八节", id: 8 },
      ],
      xkOpt: [
        { name: "语文", id: 1 },
        { name: "数学", id: 2 },
      ],
      statusOpt: [
        { name: "申请中", id: 0, disabled: true },
        { name: "待审核", id: 1 },
        { name: "审核通过", id: 2 },
        { name: "审核未通过", id: 3 },
        { name: "自动通过", id: 4, disabled: true },
      ],
      showCsOptData: {
        showCsOpt: false,
      },
      kcTable: [],
      dkTable: [],
      //编辑删除dia
      showDiaData: {
        showDia: false,
        formType: 1, //1新增--2编辑
        form: {
          type: 0,
          classId: [],
          date: "",
          stanza: "",
          xkname: "",
          status: "",
          reason: "",
          must: "",
          oldTeaname: "",
          teaname: "",
          oldclassId: [],
          olddate: "",
          oldStanza: "",
          oldxkname: "",
        },
      },
    };
  },
  methods: {
    //!通用-调课打开必填项
    setRequire() {
      this.rules1.teaname[0].required = true;
      this.rules1.oldclassId[0].required = true;
      this.rules1.olddate[0].required = true;
      this.rules1.oldStanza[0].required = true;
      this.rules1.oldxkname[0].required = true;
    },
    //!通用-调课关闭必填项
    breakRequire() {
      this.rules1.teaname[0].required = false;
      this.rules1.oldclassId[0].required = false;
      this.rules1.olddate[0].required = false;
      this.rules1.oldStanza[0].required = false;
      this.rules1.oldxkname[0].required = false;
    },
    //!调课-选择现授课人-打开必填项
    changeXskr(val) {
      if (val) {
        this.setRequire();
      }
    },
    changePageSize(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTable(this.pageNum, val);
    },
    changePageNum(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTable(val, this.pageSize);
    },

    //!提交新增和编辑
    submit() {
      let data = this.showDiaData.form;
      data.cjlbId = this.dtkId;
      data.oldTeaId = this.unionid;
      data.status = undefined;
      if (this.showDiaData.form.type == 0) {
        //!代课
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if (this.showDiaData.formType == 1) {
              //?新增
              main
                .add(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("提交成功!");
                })
                .catch((err) => {});
            } else if (this.showDiaData.formType == 2) {
              console.log(data, "data....");
              //?编辑
              main
                .edit(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("编辑成功!");
                })
                .catch((err) => {});
            }
          } else {
            return false;
          }
        });
      } else {
        //!调课
        this.$refs["ruleForm1"].validate((valid) => {
          if (valid) {
            if (this.showDiaData.formType == 1) {
              //?新增
              main
                .add(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("提交成功!");
                })
                .catch((err) => {});
            } else if (this.showDiaData.formType == 2) {
              //?编辑
              main
                .edit(data)
                .then((res) => {
                  this.getTable(this.pageNum, this.pageSize);
                  this.clearForm();
                  this.showDiaData.showDia = false;
                  this.$message.success("编辑成功!");
                })
                .catch((err) => {});
            }
          } else {
            return false;
          }
        });
      }
    },
    getOpt(data) {
      if (data == 1) {
        //?代课学科opt
        let val = {
          classId: this.showDiaData.form.classId[2],
          type: 1,
          unionid: this.unionid,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 2) {
        //?原授课人opt
        let val = {
          classId: this.showDiaData.form.classId[2],
          type: 2,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.oldTeanameOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 3) {
        //?现授课人opt
        let val = {
          classId: this.showDiaData.form.classId[2],
          type: 3,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.teanameOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 4) {
        //?节次opt
        let val = {
          classId: this.showDiaData.form.classId[2],
          type: 4,
          unionid: this.unionid,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.stanzaOpt = res.data;
            this.stanzaOpt = this.stanzaOpt.concat(this.kcZdyArr);
          })
          .catch((err) => {});
      }
    },
    //dia-点击下拉-获取三级菜单
    getXqNj() {
      let val = {
        cjlbId: this.dtkId,
        type: 1,
        unionid: this.unionid,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.xqNjOpt = res.data;
        })
        .catch((err) => {});
    },
    getXqNjHt() {
      let val = {
        cjlbId: this.dtkId,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.xqNjOptHt = res.data;
        })
        .catch((err) => {});
    },
    getTable(pageNum, pageSize) {
      let val = {
        cjlbId: this.dtkId,
        pageNum: pageNum,
        pageSize: pageSize,
        unionid: this.unionid,
        isowner: 1,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
          this.totalDataNum = res.data.total;
        })
        .catch((err) => {});
    },
    clearForm() {
      this.showDiaData.form = {
        type: 0,
        classId: [],
        date: "",
        stanza: "",
        xkname: "",
        status: "",
        reason: "",
        must: "",
      };
    },
    setFrom(row) {
      this.showDiaData.form = JSON.parse(JSON.stringify(row));
      if (this.showDiaData.form.teaname) {
        this.setRequire();
      } else {
        this.breakRequire();
      }
    },
    add() {
      this.showDiaData.formType = 1;
      this.clearForm();
      this.breakRequire();
      this.showDiaData.form.oldTeaname = this.userName;
      this.showDiaData.showDia = true;
    },
    chgang1(val) {
      console.log(this.showDiaData.form.classId);
    },
    edit(row) {
      console.log(row);
      this.getXqNj();
      this.getXqNjHt();
      this.setFrom(row);
      this.showDiaData.formType = 2;
      this.showDiaData.showDia = true;
    },
    //删除数据
    del(row) {
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功!");
              this.getTable(this.pageNum, this.pageSize);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    csOpt() {
      main
        .selectSetTake({ cjlbId: this.dtkId })
        .then((res) => {
          let arr = {
            changeTakes: [],
            cjlbId: 0,
            id: 0,
            dkzdsh: 0, //
            syjscktj: 0, //
            tksjf: 0, //
            tkzdsh: 0, //
          };
          this.csData = res.data ? res.data : arr;
          this.showCsOptData.showCsOpt = true;
          this.dkTable = res.data.changeTakes.filter((item) => {
            return item.type == 1;
          });
          this.kcTable = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });
          console.log(this.dkTable, "this.dkTable");
          console.log(this.kcTable, "this.kcTable");
        })
        .catch((err) => {});
    },
    addKcRow() {
      this.kcTable.push({ type: 0 });
    },
    addDkRow() {
      this.dkTable.push({ type: 1 });
    },
    //获取日期是周几
    getZj(data) {
      switch (data) {
        case 1:
          return "周一";
          break;
        case 2:
          return "周二";
        case 3:
          return "周三";
        case 4:
          return "周四";
        case 5:
          return "周五";
        case 6:
          return "周六";
        case 0:
          return "周日";
        default:
          return "";
      }
    },
    //!获取课次自定义参数
    getKcZdy() {
      main
        .selectSetTake({ cjlbId: this.dtkId })
        .then((res) => {
          this.kcZdyArr = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });
          this.kcZdyArr = this.kcZdyArr.map((item) => {
            item.stanz = item.name;
            return item;
          });
          this.stanzaOptHt = this.stanzaOptHt.concat(this.kcZdyArr);
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable(1, 20);
    this.getKcZdy();
    this.showDiaData.form.oldTeaname = this.userName;
  },
};
</script>

<style scoped>
.search {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dkOrTk {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/deep/.el-radio-button__inner {
  border-left: 1px solid #dcdfe6;
}
.dk {
}
.inp {
  width: 80%;
}
.tk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #be4fff;
}
.dk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #298cf7;
}
.dk2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.csTop {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>