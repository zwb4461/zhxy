<template>
  <div>
    <div class="search">
      <el-select
        size="small"
        v-model="search.bxdl"
        placeholder="报修大类"
        class="inp"
      >
        <el-option
          v-for="item in search.bxdlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-select
        size="small"
        v-model="search.bxzl"
        placeholder="报修子类"
        class="inp"
      >
        <el-option
          v-for="item in search.bxzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-date-picker
        class="inp"
        style="width: 350px"
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
          v-for="item in search.statusOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-button size="small" type="primary">查询</el-button>
      <el-button size="small" style="margin-right: 15px">数据导出</el-button>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      size="small"
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="报修时间"> </el-table-column>
      <el-table-column prop="name" label="报修小类"> </el-table-column>
      <el-table-column prop="name" label="物品名称"> </el-table-column>
      <el-table-column prop="name" label="报修地点"> </el-table-column>
      <el-table-column prop="name" label="情况说明"> </el-table-column>
      <el-table-column prop="name" label="报修教师"> </el-table-column>
      <el-table-column prop="name" label="处理状态"> </el-table-column>
      <el-table-column prop="name" label="处理教师"> </el-table-column>
      <el-table-column prop="name" label="修复时间"> </el-table-column>
      <el-table-column prop="name" label="故障历时"> </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="primary" @click="see(scope.row)"
            >查看</a-button
          >
          <a-button size="small" @click="deal(scope.row)">处理</a-button>
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
      :close-on-click-modal="false"
      title="报修"
      :visible.sync="showBaoXiu"
      width="40%"
    >
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修时间:">
              <span>{{ form.time }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理状态:">
              <el-select clearable size="small" v-model="form.status">
                <el-option
                  v-for="item in statusOpt"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修大类:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理教师:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修小类:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修复时间:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品名称:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="故障历时:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修地点:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈信息:">
              <el-input
                v-model="form.fk"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="情况说明:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修图片:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈图片:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修教师:">
              <span>{{}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="处理状态"> </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="mini"
        :data="diaTable"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="name" label="数量"> </el-table-column>
        <el-table-column prop="name" label="单位"> </el-table-column>
      </el-table>
      <el-button size="mini" style="width: 100%">+</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBaoXiu = false">取 消</el-button>
        <el-button type="primary" @click="submitBX">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/baoxiu";
export default {
  data() {
    return {
      formType: 1, //1查看--2处理
      tableData: [{ name: "" }],
      diaTable: [],
      pageSize: 1,
      pageNum: 20,
      search: {
        bxdlOpt: [],
        bxzlOpt: [],
        statusOpt: [],
        bxdl: "",
        bxzl: "",
        status: "",
        dataTime: "",
      },
      showBaoXiu: false,
      statusOpt: [
        {
          name: "处理中",
          id: 1,
        },
        {
          name: "已处理",
          id: 2,
        },
      ],
      form: {
        time: "",
        fk: "",
      },
    };
  },
  methods: {
    //提交报修
    submitBX() {},
    getTable(pageNum, pageSize) {
      let val = {
        pageNum: pageNum,
        pageSize: pageSize,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {});
    },
    see() {
      this.formType = 1;
      this.showBaoXiu = true;
    },
    deal() {
      this.formType = 1;
      this.showBaoXiu = true;
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