<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="待处理"><deal ref="one" :status="0"></deal></van-tab>
      <van-tab title="处理中"><deal :status="1"></deal></van-tab>
      <van-tab title="已处理"><deal :status="2"></deal></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import deal from "./deal";
export default {
  components: {
    deal,
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
