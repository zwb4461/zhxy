<template>
  <div class="contain">
    <div class="item_contain" v-for="(item, index) in tableData" :key="index">
      <div class="topTitle">
        <span :class="item.type == 1 ? 'tk1' : item.type == 0 ? 'dk1' : ''">
          {{ item.type == 1 ? "调课" : item.type == 0 ? "代课" : "" }}</span
        >
        <span class="marginL">{{ item.date }}</span>
        <span class="marginL">{{ item.weekName }}</span>
        <!-- <span class="marginL">{{ item.stanza }}</span> -->
      </div>
      <div class="table">
        <!-- 0：申请中，1：待审核，2：审核通过，3：审核未通过，4：自动通过 -->

        <div style="width: 95%">
          <el-table border :data="[...item]" style="width: 100%" size="mini">
            <el-table-column prop="className" label="班级"> </el-table-column>
            <el-table-column prop="stanza" label="课次"> </el-table-column>
            <el-table-column prop="oldxkname" label="原学科"> </el-table-column>
            <el-table-column prop="oldTeaname" label="原授课">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="apply(scope.row)"
                    >申请</el-button
                  >
                </div>
              </template>
            </el-table-column>
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
    apply(data) {
      this.$router.push({
        path: "/phone/dtk/components/applyDetail",
        query: data,
      });
    },
    getTable() {
      let val = {
        cjlbId: this.cjlbId,
        pageNum: 1,
        pageSize: 10000,
        unionid: this.unionid,
        isowner: 2,
        isowner: 2,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
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
.contain {
  padding: 10px 0;
}
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
  padding-left: 2.5%;
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
.table {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>