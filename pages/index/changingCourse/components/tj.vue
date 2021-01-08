<template>
  <div>
    <div class="search">
      <el-date-picker
        class="inp"
        size="small"
        v-model="dataTime"
        type="daterange"
        format="yy-HH-mm"
        value-format="yy-HH-mm"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input
        class="inp"
        style="width: 150px"
        size="small"
        v-model="name"
        placeholder="教师姓名"
      ></el-input>
      <el-button size="small" icon="el-icon-setting" @click="tj" type="primary"
        >统计</el-button
      >
      <el-button size="small" @click="sjdc">数据导出</el-button>
    </div>
    <el-table border size="small" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="prop" label="教师"></el-table-column>
      <el-table-column prop="prop" label="代课节次"></el-table-column>
      <el-table-column prop="prop" label="调课"></el-table-column>
      <el-table-column prop="prop" label="综合积分"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTime: [],
      tableData: [],
      name: "",
    };
  },
  methods: {
    sjdc() {},
    tj() {},
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
.inp {
  margin-right: 15px;
}
</style>