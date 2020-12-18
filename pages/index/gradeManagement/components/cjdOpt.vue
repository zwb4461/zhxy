<template>
  <div>
    <el-table
      size="small"
      :header-cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column label="一、学科基础知识和能力">
        <el-table-column
          :label="item.name"
          v-for="(item, index) in bt"
          :key="index"
        >
          <template slot-scope="scope">
            <span v-if="index == 0"> {{ scope.row[index] }}</span>
            <el-select
              style="width: 100%"
              v-else
              size="small"
              v-model="scope.row[index]"
              @focus="getDd(scope.row, item)"
              @change="editOneXq"
            >
              <el-option
                v-for="(item, ddIndex) in ddOpt"
                :key="ddIndex"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import main from "~/api/cjdsz";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tableData: [],
      bt: [], //表头
      ddOpt: [],
      ksxuekeId: 0, //当前行的考试学科id
      ksId: 0, //当前行的考试id
    };
  },
  methods: {
    //修改第一学期
    editOneXq(dd) {
      let val = {
        cjlbId: this.cjlbId,
        dediName: dd,
        djxq: 1,
        ksxuekeId: this.ksxuekeId,
        ksId: this.ksId,
      };
      main
        .saveAchimodule(val)
        .then((res) => {
          this.find();
        })
        .catch((err) => {});
    },
    //获取第一学期等第
    getDd(row, item) {
      this.ksId = item.id;
      let len = this.bt.length;
      this.ksxuekeId = row[len];
      let val = {
        cjlbId: this.cjlbId,
        ksxuekeId: this.ksxuekeId,
        djxq: 1, //第二个表格为2
        ksId: this.ksId,
      };
      main
        .seeDedis(val)
        .then((res) => {
          this.ddOpt = res.data;
        })
        .catch((err) => {});
    },
    //获取第一学期表格数据
    find() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: 1,
      };
      main
        .find(val)
        .then((res) => {
          // 获取表头
          this.bt = res.data.names;
          this.tableData = res.data.xkMap;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.find();
  },
};
</script>

<style scoped>
</style>