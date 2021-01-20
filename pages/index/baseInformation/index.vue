<template>
  <div>
    <div class="search_contain">
      <el-input
        class="inp"
        size="small"
        v-model="search.name"
        placeholder="姓名"
      ></el-input>
      <el-input
        class="inp"
        size="small"
        v-model="search.idNumber"
        placeholder="证件号码"
      ></el-input>
      <el-input
        class="inp"
        size="small"
        v-model="search.phone"
        placeholder="移动电话"
      ></el-input>
      <el-button size="small" type="primary">查询</el-button>
      <el-button size="small" @click="add">新增</el-button>
      <el-button size="small" type="primary">钉钉同步</el-button>
      <el-button size="small" type="primary">导入数据</el-button>
      <el-button size="small" type="primary">模板下载</el-button>
    </div>
    <div class="table_contain">
      <el-table border size="small" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="name" label="钉钉绑定"> </el-table-column>
        <el-table-column prop="name" label="身份证号"> </el-table-column>
        <el-table-column prop="name" label="性别"> </el-table-column>
        <el-table-column prop="name" label="籍贯"> </el-table-column>
        <el-table-column prop="name" label="移动号码"> </el-table-column>
        <el-table-column prop="name" label="出生年月"> </el-table-column>
        <el-table-column prop="name" label="考入编制(工作)时间">
        </el-table-column>
        <el-table-column prop="name" label="党派"> </el-table-column>
        <el-table-column prop="name" label="入党年月"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="see(scope.row)"
              >查看</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="表单"
      :visible.sync="showDia"
      width="700px"
    >
      <div>
        <el-form :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名:" label-width="80px">
                    <el-input size="small" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别:" label-width="80px">
                    <el-input size="small" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="身份证号:">
                    <el-input size="small" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="籍贯:">
                    <el-input size="small" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="出生年月:">
                    <el-date-picker
                      style="width: 100%"
                      size="small"
                      v-model="form.name"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="移动号码:">
                    <el-input size="small" v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div
                style="border: 1px solid #000000; width: 80%; height: 280px"
              ></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="考入编制时间:">
                <el-date-picker
                  style="width: 100%"
                  size="small"
                  v-model="form.name"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="退休时间:">
                <el-date-picker
                  style="width: 100%"
                  size="small"
                  v-model="form.name"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="党派:">
                <el-select style="width: 100%" size="small" v-model="form.name">
                  <el-option
                    v-for="item in dpOpt"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="实足教龄:">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入党年月:">
                <el-date-picker
                  style="width: 100%"
                  size="small"
                  v-model="form.name"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历(全日制):">
                <el-select style="width: 100%" size="small" v-model="form.name">
                  <el-option
                    v-for="item in dpOpt"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历(最高):">
                <el-select style="width: 100%" size="small" v-model="form.name">
                  <el-option
                    v-for="item in dpOpt"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业学校:">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业学校:">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="专业:">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业:">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业时间:">
                <el-date-picker
                  style="width: 100%"
                  size="small"
                  v-model="form.name"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间:">
                <el-date-picker
                  style="width: 100%"
                  size="small"
                  v-model="form.name"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>录入人:</span>
              <span style="margin-right: 15px">小明</span>
              <span>录入时间:</span>
              <span>2021-01-23</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>修改人:</span>
              <span style="margin-right: 15px">小明</span>
              <span>修改时间:</span>
              <span>2021-01-23</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="showDia = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDia: true, //0新增--1编辑--2查看
      search: {
        name: "",
        idNumber: "",
        phone: "",
      },
      tableData: [{ name: "" }],
      form: {
        name: "",
      },
      dpOpt: [],
    };
  },
  methods: {
    //!获取表格数据
    getTable() {},
    //!提交表单
    submit() {},
    //!新增
    add() {
      this.formType = 0;
      this.showDia = true;
    },
    //!编辑
    edit(row) {
      this.formType = 1;
      this.showDia = true;
    },
    //!查看
    see(row) {
      this.formType = 2;
      this.showDia = true;
    },
    //!删除
    del(row) {},
  },
  created() {
    this.getTable();
  },
};
</script>

<style scoped>
.search_contain {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.inp {
  width: 180px;
  margin-right: 15px;
}
</style>