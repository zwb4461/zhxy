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
        <el-table-column label="学科"></el-table-column>
        <el-table-column :label="item" v-for="(item, index) in bt" :key="index">
          <template slot-scope="scope">
            <el-select v-model="scope.row">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
    };
  },
  methods: {
    find() {
      let val = {
        cjlbId: this.cjlbId,
        djxq: 1,
      };
      main
        .find(val)
        .then((res) => {
          // 获取表头
          this.bt = [];
          res.data.scoreExams.map((item) => {
            this.bt.push(item.name);
          });
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