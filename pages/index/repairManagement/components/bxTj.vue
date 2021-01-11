<template>
  <div>
    <div class="search">
      <el-select
        size="small"
        v-model="search.xq"
        placeholder="学期"
        class="inp"
      >
        <el-option
          v-for="item in search.xqlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
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
    </div>
    <div class="search">
      <el-date-picker
        class="inp"
        style="width: 365px"
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
      <el-input
        size="small"
        class="inp"
        v-model="search.address"
        placeholder="报修地点"
      ></el-input>
      <el-input
        size="small"
        class="inp"
        v-model="search.person"
        placeholder="报修人"
      ></el-input>
      <el-select
        size="small"
        v-model="search.status"
        placeholder="报修状态"
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
      <el-button size="small" type="primary">统计</el-button>
      <el-button size="small" style="margin-right: 15px">数据导出</el-button>
    </div>
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
          <el-table-column prop="date" label="待处理"> </el-table-column>
          <el-table-column prop="date" label="处理中"> </el-table-column>
          <el-table-column prop="date" label="已处理"> </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="tableData_right"
          style="width: 100%"
          border
        >
          <el-table-column prop="date" label="配件"> </el-table-column>
          <el-table-column prop="date" label="数量"> </el-table-column>
          <el-table-column prop="date" label="单位"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData_left: [],
      tableData_right: [],
      search: {
        xqlOpt: [],
        bxdlOpt: [],
        bxzlOpt: [],
        statusOpt: [],
        xq: "",
        bxdl: "",
        bxzl: "",
        dataTime: "",
        address: "",
        person: "",
        status: "",
      },
    };
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
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  width: 49%;
}
.right {
  width: 49%;
}
</style>