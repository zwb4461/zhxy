<template>
  <div>
    <van-cell-group>
      <van-field
        disabled
        label="学期年级:"
        :value="infoList.className"
        placeholder="学期年级"
      />
      <van-cell title="代课日期" :value="infoList.date" />
      <van-field
        disabled
        label="代课课次:"
        :value="infoList.stanza"
        placeholder="代课课次"
      />
      <van-field
        disabled
        label="代课学科:"
        :value="infoList.xkname"
        placeholder="选择代课学科"
      />

      <van-field disabled label="原授课人:" :value="userName" />
      <van-field
        disabled
        label="现授课人:"
        :value="infoList.teaname"
        placeholder="现授课人"
      />
      <van-field
        disabled
        label="授课要求:"
        v-model="infoList.must"
        placeholder="授课要求"
      />
      <van-field
        disabled
        label="代课原因:"
        v-model="infoList.reason"
        placeholder="代课原因"
      />
    </van-cell-group>
    <div class="topBtn">
      <van-button style="width: 45%" @click="back">取消</van-button>
      <van-button type="primary" style="width: 45%" @click="submit"
        >确定代课</van-button
      >
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
export default {
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
  },
  data() {
    return {
      infoList: {},
    };
  },
  methods: {
    submit() {
      let val = {
        teaId: this.unionid,
        id: this.infoList.id,
      };
      main
        .edit(val)
        .then((res) => {
          this.$message.success("申请成功!");
          this.$router.back(-1);
        })
        .catch((err) => {});
    },
    back() {
      this.$router.back(-1);
    },
  },
  created() {
    this.infoList = this.$route.query;
  },
};
</script>

<style scoped>
.topBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>