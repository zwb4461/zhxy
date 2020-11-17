<template>
  <div>
    <div class="topBtn">
      <a-input class="btn" placeholder="姓名" v-model="name" />
      <a-input class="btn" placeholder="证件号码" v-model="zjhm" />
      <a-input class="btn" placeholder="移动电话" v-model="yddh" />
      <a-select class="btn" v-model="ryzt">
        <a-select-option value="本单位在职">本单位在职</a-select-option>
        <a-select-option value="未在本单位任职">未在本单位任职</a-select-option>
      </a-select>
      <a-button class="btn" type="primary" @click="search">查询</a-button>
      <a-button class="btn" type="primary" @click="reset">重置</a-button>
      <a-button class="btn" type="default" @click="addForm">新增</a-button>
      <a-button class="btn" type="primary" @click="pipei">钉钉匹配</a-button>

      <el-upload
        class="uploads"
        action
        accept=".xlsx, .xls"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handle"
      >
        <el-button size="small" type="primary" style="background-color:#298cf7"
          >+导入数据</el-button
        >
      </el-upload>
      <a-button class="uploads" type="primary">
        <a-icon type="cloud-download" />
        <a href="教师信息导入模板.xlsx" style="color:white;font-size:11px"
          >模板下载</a
        >
      </a-button>
    </div>

    <!-- 表格 -->
    <a-table
      size="middle"
      bordered
      rowKey="id"
      :rowSelection="{
        selectedRowKeys: table.selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="table.columns"
      :dataSource="table.data"
      @change="tableChange"
    >
      <template slot="idx" slot-scope="text, record, index">
        {{
          table.pagination.current * table.pagination.pageSize -
            table.pagination.pageSize +
            index +
            1
        }}
      </template>
      <template slot="managerId" slot-scope="text, record, index">
        {{ table.usernames[index] }}
      </template>
      <template slot="ryzt" slot-scope="text">
        <template v-if="text === '本单位在职'">
          <a-tag color="#f6ffed" style="color:#55c52a">本单位在职</a-tag>
        </template>
        <template v-else-if="text === '未在本单位任职'">
          <a-tag color="#fffbe6" style="color:#fbac15">未在本单位任职</a-tag>
        </template>
      </template>
      <!-- -------------------------------------------------------------------------- -->
      <template
        v-if="record.isppdd == 1"
        slot="isppdd"
        slot-scope="text, record, index"
      >
        <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      </template>
      <template slot="tool" slot-scope="text, record, index">
        <a-button size="small" type="waring" @click="edit(record)"
          >编辑</a-button
        >
        <a-button
          size="small"
          type="waring"
          style="color:#fff;background-color:#298cf7"
          >查看</a-button
        >
        <a-button
          size="small"
          type="waring"
          style="color:#fff;background-color:#ff4d4f"
          @click="del(record)"
          >删除</a-button
        >
      </template>
    </a-table>

    <!-- 表单 -->

    <my-drawer-vue
      title="表单"
      :width="900"
      :loading="loading.form"
      :visible="pop.form"
      :onOk="submit"
      @onClose="formClose"
    >
      <template slot="contentInfo">
        <table-form ref="tableForm" :btnLoading="btnLoading" />
      </template>
    </my-drawer-vue>
  </div>
</template>

<script>
//组件
import myDrawerVue from "~/components/common/myDrawer.vue";
import tableForm from "./components/_form";

import { readFile, character } from "@/utils/read_file"; //导入解析方法与给定格式
import xlsx from "xlsx"; //导入xlsx插件

//接口
// import main from "~/api/school";
import main from "~/api/teacherInfo";
export default {
  components: {
    myDrawerVue,
    tableForm
  },
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    }
  },
  data() {
    return {
      isppdd: "", //钉钉匹配
      importBaoBiao: "",
      //-----查询条件字段-------
      name: "", //姓名
      zjhm: "", //证件号码
      yddh: "", //移动电话
      ryzt: "", //人员状态
      pop: {
        form: false
      },
      loading: {
        table: false,
        form: false
      },
      table: {
        select: {
          username: undefined
        },
        selectedRowKeys: [],
        selectedRows: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showTotal: total => "共有 data.total 条数据",
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true, //是否可以改变 pageSize
          pageSizeOptions: ["10", "20", "30", "40"]
        },
        //表头,
        columns: [
          {
            title: "序号",
            dataIndex: "idx",
            scopedSlots: { customRender: "idx" },
            width: 60
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: 110
          },
          // -----------------------------------------------------------------------
          {
            title: "钉钉匹配",
            // dataIndex: "isppdd",
            scopedSlots: { customRender: "isppdd" },
            width: 80
          },

          {
            title: "证件号码",
            dataIndex: "zjhm",
            width: 200
          },
          {
            title: "所属科室",
            dataIndex: "ssks",
            width: 100
          },

          {
            title: "移动号码",
            dataIndex: "yddh",
            width: 120
          },
          {
            title: "人员状态",
            dataIndex: "ryzt",
            scopedSlots: { customRender: "ryzt" },
            width: 90
          },
          {
            title: "家庭住址",
            dataIndex: "jtzz",
            width: 220
          },
          {
            title: "操作",
            scopedSlots: { customRender: "tool" },
            width: 170
          }
        ],
        //数据
        data: [],
        userName: [] //管理员姓名
      }
    };
  },
  methods: {
    pipei() {
      main
        .pp({ schoolId: sessionStorage.getItem("schoolId") })
        .then(res => {
          // console.log("钉钉匹配res", res);
          sessionStorage.removeItem("schoolId");
        })
        .catch(err => {
          console.log("钉钉匹配err", err);
        });
    },
    //调用上传接口
    impFile() {
      main
        .imp({
          teacherInfos: this.importBaoBiao,
          schoolId: sessionStorage.getItem("schoolId")
        })
        .then(res => {
          // console.log("上传成功", res);
          sessionStorage.removeItem("schoolId");
          this.$nextTick(() => {
            this.getTableData();
          });
        })
        .catch(err => {
          console.log("上传失败", err);
        });
    },
    //获取数据
    getTableData() {
      //用户列表
      main
        .sel({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize
        })
        .then(res => {
          this.table.data = res.data.list;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //页码改变触发
    tableChange({ current, pageSize }) {
      this.table.pagination.current = current;
      this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //重载表格
    reloadTable(type) {
      if (type) {
        this.table.pagination.current = 1;
      }
      //   this.table.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //获取表格选中的数据
    onSelectChange(selectedRowKeys, rows) {
      // console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectedRows = rows;
    },
    //编辑数据
    edit(row) {
      // console.log(row);
      // console.log("编辑");
      this.pop.form = true;
      setTimeout(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
      }, 100);
    },
    //新增表单
    addForm() {
      this.pop.form = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.tableForm.formType = 1;
          this.$refs.tableForm.clearForm();
        }, 100);
      });
    },
    //#表单相关操作--------
    //删除数据
    del(record) {
      //   console.log("wwwww", record);
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: record.id })
            .then(res => {
              this.reloadTable(false);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //提交表单
    submit() {
      this.$refs.tableForm.onSubmit();
    },
    //关闭表单弹窗
    formClose() {
      this.pop.form = false;
    },
    //按钮加载与不加载
    btnLoading(type) {
      this.loading.form = type;
      if (type === false) {
        this.formClose(); //关闭表单
        this.reloadTable(); //重载表格
      }
    },
    search() {
      main
        .sel({
          pagenum: this.table.pagination.current,
          pagesize: this.table.pagination.pageSize,
          name: this.name,
          zjhm: this.zjhm,
          yddh: this.yddh,
          ryzt: this.ryzt
        })
        .then(res => {
          this.table.data = res.data.list;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    reset() {
      this.name = "";
      this.zjhm = "";
      this.yddh = "";
      this.ryzt = "";
      this.getTableData();
    },
    // 上传表格
    async handle(ev) {
      let file = ev.raw;
      if (!file) return;
      //读取file中的数据
      let data = await readFile(file);
      let workbook = xlsx.read(data, { type: "binary" });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(worksheet);

      //把读出的数据转换为服务端给定的格式
      let arr = [];

      data.forEach(item => {
        let obj = {};
        for (let key in character) {
          if (!character.hasOwnProperty(key)) break;
          //此时v为三个字段的对象
          let v = character[key];
          // console.log("v---", v.text);
          let text = v.text;
          let type = v.type;
          v = item[text] || "";
          type == "string" ? (v = String(v)) : null;
          type == "number" ? (v = Number(v)) : null;
          obj[key] = v;
        }
        arr.push(obj);
      });
      this.importBaoBiao = arr;
      this.impFile();

      //   console.log("arr", this.importBaoBiao);
    }
  },
  created() {
    this.getTableData(); //获取列表
  }
};
</script>

<style lang="scss" scoped>
.resize-table-th {
  position: relative;
}
.table-draggable-handle {
  /* width: 10px !important; */
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
}
.topBtn {
  display: flex;
  flex-direction: row;
}
.btn {
  width: 120px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.uploads {
  margin: 10px 0;
}
</style>
