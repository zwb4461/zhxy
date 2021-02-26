<template>
  <div>
    <van-cell-group>
      <van-field
        readonly
        label="学期年级:"
        :value="infoList.className"
        placeholder="学期年级"
      />
      <van-cell title="代课日期" :value="infoList.date" />
      <van-field
        readonly
        label="代课课次:"
        :value="infoList.stanza"
        placeholder="代课课次"
      />
      <van-field
        readonly
        label="代课学科:"
        :value="infoList.xkname"
        placeholder="选择代课学科"
      />

      <van-field readonly label="原授课人:" :value="userName" />
      <van-field
        readonly
        label="现授课人:"
        :value="infoList.teaname"
        placeholder="现授课人"
      />
      <van-field
        readonly
        label="授课要求:"
        v-model="infoList.must"
        placeholder="授课要求"
      />
      <van-field
        readonly
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
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      infoList: {},
      canApply: true,
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
    //!获取日期是周几
    getZj(data) {
      switch (data) {
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 0:
          return "星期日";
        default:
          return "";
      }
    },
    check() {
      let data = new Date(this.infoList.date).getDay();
      let zjz = this.getZj(data);
      this.canApply = false;
      let val = {
        schoolId: this.schoolId,
        stanz: this.infoList.stanza,
        unionid: this.unionid,
        weekName: zjz,
        type: 4,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          if (res.data.length > 0) {
            this.canApply = true;
          } else {
            this.infoList.teaname = this.name;
          }
        })
        .catch((err) => {});
      this.id = row.id;
      this.getXqNj();
      this.setFrom(row);
      this.showDiaData.showDia = true;
    },
  },
  created() {
    this.infoList = this.$route.query;
    this.check();
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