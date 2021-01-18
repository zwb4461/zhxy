<template>
  <div>
    <div class="item_contain" v-for="(item, index) in tableData" :key="index">
      <div class="topTitle">
        <span :class="item.type == 1 ? 'tk1' : item.type == 0 ? 'dk1' : ''">
          {{ item.type == 1 ? "调课" : item.type == 0 ? "代课" : "" }}</span
        >
        <span class="marginL">{{ item.date }}</span>
        <span class="marginL">{{ item.className }}</span>
        <span class="marginL">{{ item.stanza }}</span>
      </div>
      <div class="table">
        <!-- 0：匹配中，1：待审核，2：审核通过，3：审核未通过，4：自动通过 -->

        <el-table border :data="[...item]" style="width: 100%" size="mini">
          <el-table-column prop="className" label="班级"> </el-table-column>
          <el-table-column prop="stanza" label="课次"> </el-table-column>
          <el-table-column prop="oldxkname" label="原学科"> </el-table-column>
          <el-table-column prop="oldTeaname" label="原授课"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <div>
                <van-tag v-show="scope.row.status == 0" type="warning"
                  >匹配中</van-tag
                >
                <van-tag v-show="scope.row.status == 1">待审核</van-tag>
                <van-tag type="success" v-show="scope.row.status == 2"
                  >审核通过</van-tag
                >
                <van-tag type="danger" v-show="scope.row.status == 3"
                  >审核未通过</van-tag
                >
                <van-tag type="success" v-show="scope.row.status == 4"
                  >自动通过</van-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="xkname" label="现授学科"> </el-table-column>
          <el-table-column prop="teaname" label="现授课人"> </el-table-column>
        </el-table>
      </div>
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
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getTable() {
      let val = {
        cjlbId: 44,
        pageNum: 1,
        pageSize: 10000,
        unionid: this.unionid,
        isowner: 3,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
  },
};
</script>

<style scoped>
.topBtn {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_contain {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.topTitle {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.tk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #be4fff;
}
.dk1 {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  color: #ffffff;
  background-color: #298cf7;
}
.marginL {
  margin-left: 5px;
}
</style>