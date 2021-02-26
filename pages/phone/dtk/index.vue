<template>
  <div>
    <van-tabs v-model="bxActive" @click="clickTab" animated>
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
  computed: {
    //学校id
    bxActive: {
      get() {
        return this.$store.state.auth.bxActive;
      },
      set(v) {
        this.$store.commit("auth/setBxActive", v);
      },
    },
  },
  components: {
    kb,
    dtk,
    zzdk,
    allDtk,
  },
  data() {
    return {};
  },
  methods: {
    clickTab(name, title) {
      this.$store.commit("auth/setDtkActive", name);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped></style>
