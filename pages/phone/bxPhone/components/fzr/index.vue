<template>
  <div>
    <van-tabs v-model="bxFzrActive" @click="clickTab">
      <van-tab title="待处理"><deal ref="one" :status="0"></deal></van-tab>
      <van-tab title="处理中"><deal :status="1"></deal></van-tab>
      <van-tab title="已处理"><deal :status="2"></deal></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import deal from "./deal";
export default {
  computed: {
    bxFzrActive: {
      get() {
        return this.$store.state.auth.bxFzrActive;
      },
      set(v) {
        this.$store.commit("auth/setBxFzrActive", v);
      },
    },
  },
  components: {
    deal,
  },
  data() {
    return {};
  },
  methods: {
    clickTab(name, title) {
      console.log(name);
      console.log(title);
      this.$store.commit("auth/setBxFzrActive", name);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
/deep/.van-tab,
/deep/.van-tab--active,
/deep/.van-ellipsis {
  font-size: 18px;
}
</style>
