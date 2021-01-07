<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="代调课" name="1"
        ><dtk :dtkId="dtkId"></dtk
      ></el-tab-pane>
      <el-tab-pane label="代调课统计" name="2">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dtk from "./dtk";
export default {
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    dtk,
  },
  data() {
    return {
      activeName: "1",
    };
  },
};
</script>

<style scoped>
</style>