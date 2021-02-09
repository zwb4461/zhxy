<template>
  <div class="contain">
    <div
      class="item_contain"
      v-for="(item, index) in tableData"
      :key="index"
      @click="toEdit(item)"
    >
      <div class="time_contain">
        <span>{{ item.bxTime }}</span>
      </div>
      <div class="lei_contain">
        <span>{{ item.name }}</span>
      </div>
      <div class="address_contain">
        <img
          src="../../../../../assets/img/address.svg"
          style="width: 24px; height: 24px"
        />
        <span>{{ item.address }}</span>
      </div>
      <div class="teacher_contain">
        <span>报修教师:{{ item.bxTeaname }}</span>
        <span>处理教师:{{ item.clTeaname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/baoxiu";
export default {
  head() {
    return {
      title: "报修管理",
      meta: [],
    };
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
  },
  props: {
    status: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    //!跳转编辑-负责人
    toEdit(item) {
      this.$router.push({
        path: "/Phone/bxPhone/components/fzr/dealEdit",
        query: {
          data: item,
        },
      });
    },
    getTable() {
      let val = {
        status: this.status,
        unionid: this.unionid,
        schoolId: this.schoolId,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
  },
};
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
.item_contain {
  width: 90%;
  height: 130px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  background-color: #e7f0ff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
  display: inline-block;
  vertical-align: top;
  margin-bottom: 20px;
}
.time_contain {
  width: 100%;
  height: 30px;
  padding-left: 15px;
  display: flex;
  align-items: center;
}
.lei_contain {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  font-size: 20px;
}
.address_contain {
  width: 100%;
  height: 30px;
  padding-left: 15px;
  font-size: 18px;
}
.teacher_contain {
  width: 100%;
  height: 35px;
  padding: 0 15px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
