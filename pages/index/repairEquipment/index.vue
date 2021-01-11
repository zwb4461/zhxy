<template>
  <div>
    <div class="search">
      <el-select
        size="small"
        v-model="search.sbdl"
        placeholder="设备大类"
        class="inp"
      >
        <el-option
          v-for="item in search.sbdlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-select
        size="small"
        v-model="search.sbzl"
        placeholder="设备子类"
        class="inp"
      >
        <el-option
          v-for="item in search.sbzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
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
      <el-select
        size="small"
        v-model="search.status"
        placeholder="审核状态"
        class="inp"
      >
        <el-option
          v-for="item in search.sbzlOpt"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-button size="small" type="primary">查询</el-button>
      <el-button size="small" type="primary">+新增</el-button>
    </div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      border
      size="small"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="报修时间"> </el-table-column>
      <el-table-column prop="name" label="报修大类"> </el-table-column>
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
          <a-button size="small" @click="edit(scope.row)">编辑</a-button>
          <a-button size="small" type="danger" @click="del(scope.row)"
            >删除</a-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: {
        sbdlOpt: [],
        sbzlOpt: [],
        sbdl: "",
        sbzl: "",
        dataTime: "",
        status: "",
      },
    };
  },
  methods: {
    see() {},
    edit() {},
    del() {},
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