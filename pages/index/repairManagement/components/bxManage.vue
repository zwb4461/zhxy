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
      <el-table-column prop="bxTime" label="报修时间"> </el-table-column>
      <el-table-column prop="maxCate" label="报修大类"> </el-table-column>
      <el-table-column prop="minCate" label="报修小类"> </el-table-column>
      <el-table-column prop="name" label="物品名称"> </el-table-column>
      <el-table-column prop="address" label="报修地点"> </el-table-column>
      <el-table-column prop="explaion" label="情况说明"> </el-table-column>
      <el-table-column prop="bxTeaname" label="报修教师"> </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 0">待处理</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 1">处理中</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clTeaname" label="处理教师"> </el-table-column>
      <el-table-column prop="xfTime" label="修复时间"> </el-table-column>
      <el-table-column prop="history" label="故障历时"> </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <a-button size="small" type="primary" @click="see(scope.row)"
            >查看</a-button
          >
          <a-button size="small" @click="deal(scope.row)">处理</a-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="changePageSize"
      @current-change="changePageNum"
      :current-page="pageNum"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalDataNum"
    >
    </el-pagination> -->
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
              <span>{{ form.bxTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理状态:">
              <el-select
                :disabled="formType == 1"
                size="small"
                v-model="form.status"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修大类:">
              <span>{{ form.maxCate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理教师:">
              <span>{{ form.clTeaname }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修小类:">
              <span>{{ form.minCate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修复时间:">
              <span>{{ form.xfTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品名称:">
              <span>{{ form.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="故障历时:">
              <span>{{ form.history }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修地点:">
              <span>{{ form.address }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈信息:">
              <el-input
                :disabled="formType == 1"
                v-model="form.fkxx"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="情况说明:">
              <span>{{ form.explaion }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修图片:">
              <img
                style="width: 100px; height: 100px; margin: 5px"
                :src="item.url"
                alt=""
                v-for="(item, index) in form.bxImg"
                :key="index"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈图片:">
              <el-upload
                :disabled="formType == 1"
                action="http://103.219.33.112:10010/upload"
                list-type="picture-card"
                :limit="9"
                :on-preview="pictureYl"
                :on-remove="handleRemove"
                :on-success="uploadPictureSuccess"
                name="imgFile"
                :file-list="form.fkImg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="showPictureYl">
                <img width="130px" style="height: 80px" :src="dialogImageUrl" />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修教师:">
              <span>{{ form.bxTeaname }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="处理状态"> </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="mini"
        :data="form.pjqd"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <el-input
              :disabled="formType == 1"
              size="mini"
              v-model="scope.row.name"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="数量">
          <template slot-scope="scope">
            <el-input
              :disabled="formType == 1"
              size="mini"
              v-model="scope.row.sum"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dw" label="单位">
          <template slot-scope="scope">
            <el-input
              :disabled="formType == 1"
              size="mini"
              v-model="scope.row.dw"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        v-show="formType != 1"
        size="mini"
        style="width: 100%"
        @click="addRow"
        >+</el-button
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBaoXiu = false">取 消</el-button>
        <el-button v-show="formType == 2" type="primary" @click="submitBX"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/baoxiu";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  data() {
    return {
      text: [],
      dialogImageUrl: "",
      showPictureYl: false,
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
          name: "待处理",
          id: 0,
          disabled: true,
        },
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
        address: "",
        bxImg: [],
        bxTeaid: "",
        bxTeaname: "",
        bxTime: "",
        bxfile: "",
        cjlbId: 0,
        clTeaid: "",
        clTeaname: "",
        fkImg: [],
        fkfile: "",
        history: "",
        id: 0,
        ifdelete: 0,
        maxCate: "",
        maxCateId: 0,
        minCate: "",
        minCateId: 0,
        name: "",
        pjqd: [
          {
            dw: "",
            id: 0,
            name: "",
            repairId: 0,
            sum: 0,
          },
        ],
        status: 0,
        xfTime: "",
      },
    };
  },
  methods: {
    //!图片预览
    pictureYl(file) {
      this.dialogImageUrl = file.url;
      this.showPictureYl = true;
    },
    //!移除图片
    handleRemove(file, fileList) {
      this.form.fkImg = [];
      fileList.map((item) => {
        this.form.fkImg.push({
          url: item.response.data,
        });
      });
    },
    //!图片上传成功
    uploadPictureSuccess(res, file, fileList) {
      this.form.fkImg.push({
        url: res.data,
      });
      console.log(this.form.fkImg);
    },
    //!添加表格行
    addRow() {
      console.log(this.form.pjqd);
      this.form.pjqd.push({});
    },
    //!提交报修
    submitBX() {
      let val = this.form;
      //   val.bxTeaid = this.unionid;
      main
        .edit(val)
        .then((res) => {
          this.$message.success("处理成功!");
          this.getTable();
          this.showBaoXiu = false;
        })
        .catch((err) => {});
    },
    getTable(pageNum, pageSize) {
      let val = {
        // pageNum: pageNum,
        // pageSize: pageSize,
        schoolId: this.schoolId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    see(row) {
      console.log(row);
      this.setForm(row);
      this.formType = 1;
      this.showBaoXiu = true;
    },
    deal(row) {
      console.log(row);
      this.setForm(row);
      this.formType = 2;
      this.showBaoXiu = true;
    },
    //!赋值表单
    setForm(row) {
      this.form = row;
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
    this.getTable(1, 20);
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