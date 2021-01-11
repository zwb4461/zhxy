<template>
  <div class="contain">
    <div class="left">
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="small"
        :data="tableData_left"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="date" label="报修分类"> </el-table-column>
        <el-table-column prop="date" label="大类负责人"> </el-table-column>
      </el-table>
      <el-button size="small" style="width: 100%">+添加大类</el-button>
    </div>
    <div class="center">
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="small"
        :data="tableData_center"
        style="width: 100%"
        border
      >
        <el-table-column prop="date" label="配件管理"> </el-table-column>
        <el-table-column prop="date" label="单位"> </el-table-column>
      </el-table>

      <el-button size="small" style="width: 100%">+添加</el-button>
    </div>
    <div class="right">
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        size="small"
        :data="tableData_right"
        style="width: 100%"
        border
      >
        <el-table-column prop="date" label="报修地点"> </el-table-column>
      </el-table>
      <el-button size="small" style="width: 100%">+添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData_left: [],
      tableData_center: [],
      tableData_right: [],
    };
  },
};
</script>

<style scoped>
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  width: 33%;
}
.center {
  width: 33%;
}
.right {
  width: 33%;
}
</style>