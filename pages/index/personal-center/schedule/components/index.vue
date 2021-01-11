<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的课表" name="first"
        ><myClass :dtkId="dtkId"></myClass
      ></el-tab-pane>
      <el-tab-pane label="代调课" name="second"
        ><dtk :dtkId="dtkId"></dtk
      ></el-tab-pane>
      <el-tab-pane label="自主代课" name="third"
        ><zzdk :dtkId="dtkId"></zzdk
      ></el-tab-pane>
      <el-tab-pane label="所有代调课" name="fourth"
        ><allDtk :dtkId="dtkId"></allDtk
      ></el-tab-pane>
      <el-tab-pane label="代调课统计" name="five"
        ><tj :dtkId="dtkId"></tj
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myClass from "./myClass";
import dtk from "./dtk";
import tj from "./tj";
import zzdk from "./zzdk";
import allDtk from "./allDtk";
export default {
  props: {
    dtkId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    myClass,
    dtk,
    tj,
    zzdk,
    allDtk,
  },
  data() {
    return { activeName: "first" };
  },
};
</script>

<style scoped>
</style>