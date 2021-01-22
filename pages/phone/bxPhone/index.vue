<template>
  <div>
    <van-tabs v-model="bxActive" @click="clickTab">
      <van-tab title="报修申请"><bxApply></bxApply></van-tab>
      <van-tab title="待处理"><deal ref="one" :status="0"></deal></van-tab>
      <van-tab title="处理中"><deal :status="1"></deal></van-tab>
      <van-tab title="已处理"><deal :status="2"></deal></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import bxApply from "./components/bxApply";
import deal from "./components/deal";
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
    bxApply,
    deal,
  },
  data() {
    return {};
  },
  methods: {
    clickTab(name, title) {
      console.log(name);
      console.log(title);
      this.$store.commit("auth/setBxActive", name);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped></style>
