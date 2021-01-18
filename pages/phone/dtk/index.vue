<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="我的课表"><kb></kb></van-tab>
      <van-tab title="代调课"><dtk></dtk></van-tab>
      <van-tab title="自主代课"><zzdk></zzdk></van-tab>
      <van-tab title="所有代调"><allDtk></allDtk></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import kb from "./components/kb";
import dtk from "./components/dtk";
import zzdk from "./components/zzdk";
import allDtk from "./components/allDtk";
export default {
  components: {
    kb,
    dtk,
    zzdk,
    allDtk,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped></style>
