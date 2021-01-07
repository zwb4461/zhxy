<template>
  <div>
    <div class="search">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="add"
        >新增</el-button
      >
    </div>
    <el-table size="small" border :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序" width="50"></el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="className" label="班级"> </el-table-column>
      <el-table-column prop="stanza" label="课次"> </el-table-column>
      <el-table-column prop="oldxkname" label="原授学科"> </el-table-column>
      <el-table-column prop="oldTeaname" label="原授课人"> </el-table-column>
      <el-table-column prop="type" label="代课/调课"> </el-table-column>
      <el-table-column prop="xkname" label="现授学科"> </el-table-column>
      <el-table-column prop="teaname" label="现授课人"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <a-button
            size="small"
            type="waring"
            style="color: #fff; background-color: #ffba00"
            @click="pz(scope.row)"
            >批准</a-button
          >
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
    <el-dialog
      title="代调课"
      :visible.sync="showDiaData.showDia"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="dkOrTk">
        <el-radio-group size="small" v-model="showDiaData.form.type">
          <el-radio-button :label="0" style="margin-right: 20px"
            >代课</el-radio-button
          >
          <el-radio-button :label="1">调课</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 代课 -->
      <div class="dk" v-show="showDiaData.form.type == 0">
        <el-form label-width="80px">
          <el-form-item label="学期年级:">
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
          <el-form-item label="代课日期:">
            <el-date-picker
              size="small"
              class="inp"
              v-model="showDiaData.form.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zj }}
          </el-form-item>
          <el-form-item label="代课课次:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代课学科:">
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
          <el-form-item label="现授课人:">
            <el-select
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
          <el-form-item label="状态:">
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
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 调课 -->
      <div class="dk" v-show="showDiaData.form.type == 1">
        <el-form label-width="80px">
          <el-form-item label="学期年级:">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.classId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="调课日期:">
            <el-date-picker
              size="small"
              class="inp"
              v-model="showDiaData.form.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zj }}
          </el-form-item>
          <el-form-item label="调课课次:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.stanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调课学科:">
            <el-select
              @focus="getOpt(1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.xkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原授课人:">
            <el-select
              @focus="getOpt(2)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldTeaname"
            >
              <el-option
                v-for="item in oldTeanameOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调年级:">
            <el-cascader
              size="small"
              class="inp"
              :props="{ children: 'children', label: 'name', value: 'id' }"
              @focus="getXqNj"
              v-model="showDiaData.form.oldclassId"
              :options="xqNjOpt"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="互调日期:">
            <el-date-picker
              size="small"
              class="inp"
              v-model="showDiaData.form.olddate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            {{ zjHt }}
          </el-form-item>
          <el-form-item label="互调课次:">
            <el-select
              size="small"
              class="inp"
              v-model="showDiaData.form.oldStanza"
            >
              <el-option
                v-for="item in stanzaOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="互调学科:">
            <el-select
              @focus="getOpt(1)"
              size="small"
              class="inp"
              v-model="showDiaData.form.oldxkname"
            >
              <el-option
                v-for="item in xkOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现授课人:">
            <el-select
              @focus="getOpt(3)"
              size="small"
              class="inp"
              v-model="showDiaData.form.teaname"
            >
              <el-option
                v-for="item in teanameOpt"
                :key="item.id"
                :label="item.name"
                :value="item.name"
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
          <el-form-item label="状态:">
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
              >
              </el-option>
            </el-select>
          </el-form-item>
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
    zjHt() {
      let data = new Date(this.showDiaData.form.olddate).getDay();
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
  },
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tableData: [],
      xqNjOpt: [],
      teanameOpt: [],
      oldTeanameOpt: [],
      stanzaOpt: [
        { name: "第一节", id: 1 },
        { name: "第二节", id: 2 },
        { name: "第三节", id: 3 },
        { name: "第四节", id: 4 },
        { name: "第五节", id: 5 },
        { name: "第六节", id: 6 },
      ],
      xkOpt: [
        { name: "语文", id: 1 },
        { name: "数学", id: 2 },
      ],
      statusOpt: [
        { name: "待申请", id: 0 },
        { name: "待审核", id: 1 },
        { name: "审核通过", id: 2 },
        { name: "审核未通过", id: 3 },
      ],
      //编辑删除dia
      showDiaData: {
        showDia: false,
        formType: 1, //1新增--2编辑
        form: {
          type: 0,
          classId: "",
          date: "",
          stanza: "",
          xkname: "",
          status: "",
          reason: "",
          must: "",
          oldTeaname: "",
          teaname: "",
          oldclassId: "",
          olddate: "",
          oldStanza: "",
          oldxkname: "",
        },
      },
    };
  },
  methods: {
    //提交新增和编辑
    submit() {
      let data = this.showDiaData.form;
      data.cjlbId = this.dtkId;
      main
        .add(data)
        .then((res) => {
          this.getTable();
          this.clearForm();
          this.showDiaData.showDia = false;
          this.$message.success("提交成功!");
        })
        .catch((err) => {});
    },
    getOpt(data) {
      if (data == 1) {
        //?代课学科opt
        let val = {
          classId: this.showDiaData.form.classId[2],
          type: 1,
        };
        console.log(val);
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
      }
    },
    //dia-点击下拉-获取三级菜单
    getXqNj() {
      let val = {
        cjlbId: this.dtkId,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.xqNjOpt = res.data;
        })
        .catch((err) => {});
    },
    getTable() {
      let val = {
        cjlbId: this.dtkId,
        pageNum: 1,
        pageSize: 1000,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
    clearForm() {
      this.showDiaData.form = {
        type: 0,
        classId: "",
        date: "",
        stanza: "",
        xkname: "",
        status: "",
        reason: "",
        must: "",
      };
    },
    setFrom(row) {
      this.showDiaData.form = row;
    },
    add() {
      this.showDiaData.formType = 1;
      this.clearForm();
      this.showDiaData.showDia = true;
    },
    pz(row) {},
    chgang1(val) {
      console.log(val);
    },
    edit(row) {
      console.log(row);
      this.setFrom(row);
      this.showDiaData.formType = 2;
      this.showDiaData.showDia = true;
    },
    del(row) {},
  },
  created() {
    this.getTable();
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
</style>