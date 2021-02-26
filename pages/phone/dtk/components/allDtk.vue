<template>
  <div class="contain">
    <div class="item_contain" v-for="(item, index) in tableData" :key="index">
      <div class="topTitle">
        <span class="marginL">{{ item.name }}</span>
      </div>
      <div class="table">
        <!-- 0：申请中，1：待审核，2：审核通过，3：审核未通过，4：自动通过 -->
        <div style="width: 95%">
          <el-table border :data="item.data" style="width: 100%" size="mini">
            <el-table-column prop="className" label="班级"> </el-table-column>
            <el-table-column prop="stanza" label="课次"> </el-table-column>
            <el-table-column prop="oldxkname" label="原学科"> </el-table-column>
            <el-table-column prop="oldTeaname" label="原授课">
            </el-table-column>
            <el-table-column prop="oldTeaname" label="代调">
              <template slot-scope="scope">
                <div>
                  <el-tag effect="dark" v-if="scope.row.type == 0">代</el-tag>
                  <el-tag
                    effect="dark"
                    type="warning"
                    v-else-if="scope.row.type == 1"
                    >调</el-tag
                  >
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <div>
                <van-tag v-show="scope.row.status == 0" type="warning"
                  >申请中</van-tag
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
          </el-table-column> -->
            <el-table-column prop="xkname" label="现授学科"> </el-table-column>
            <el-table-column prop="teaname" label="现授课人"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main1 from "~/api/scoreEntry";
import main2 from "~/api/baoxiuCs";
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
        cjlbId: this.cjlbId,
        unionid: this.unionid,
        isowner: 3,
      };
      main
        .seeH5All(val)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {});
    },
    //!获取当前学期
    getXq() {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          //   this.xqName = res.data.name;
          this.cjlbId = res.data.id;
          this.getTable();
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getXq();
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
  padding-left: 2.5%;
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
.table {
  width: 100%;
  display: flex;
  justify-content: center;
}
.contain {
  padding: 10px 0;
}
</style>