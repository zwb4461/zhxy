<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="报修申请"><bxApply></bxApply></van-tab>
      <van-tab title="待处理"><deal></deal></van-tab>
      <van-tab title="处理中"><deal></deal></van-tab>
      <van-tab title="已处理"><deal></deal></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import bxApply from "./components/bxApply";
import deal from "./components/deal";
export default {
  components: {
    bxApply,
    deal
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
