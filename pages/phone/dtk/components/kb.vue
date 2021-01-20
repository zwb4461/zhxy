<template>
  <div>
    <el-table
      :header-cell-style="{ 'background-color': '#e6e6e6' }"
      border
      size="mini"
      :data="item.showsjs"
      style="width: 100%; margin-top: 15px"
      v-for="(item, index) in tableData"
      :key="index"
    >
      <el-table-column :prop="sxw" label="时段" width="50px">
        <template slot-scope="scope">
          <div>
            {{ scope.row.sxw == 0 ? "上午" : scope.row.sxw == 1 ? "下午" : "" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="课次" width="80px"> </el-table-column>
      <el-table-column prop="subjectName" :label="item.weekName">
        <template slot-scope="scope">
          <div class="subjectName_contain">
            <span class="dk" v-if="scope.row.type == 0"> 代 </span>
            <span class="tk" v-else-if="scope.row.type == 1"> 调 </span>
            <span>
              {{ scope.row.subjectName }}
            </span>
            <div
              :class="
                scope.row.isbh == 1
                  ? 'teacherNameBh'
                  : scope.row.isbh == 0
                  ? 'teacherName'
                  : ''
              "
            >
              <span> {{ scope.row.teacherName }} </span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import main from "~/api/dtk";
export default {
  computed: {
    //用户id
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
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
        schoolId: this.schoolId,
        unionid: this.unionid,
      };
      main
        .selectMobileStanza(val)
        .then((res) => {
          console.log(res.data, "res.data");
          this.tableData = res.data;
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
.teacherNameBh {
  width: 65px;
  height: 25px;
  margin-left: 5px;
  background-color: #c8c8c8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 5px;
}
.teacherName {
  width: 65px;
  height: 25px;
  margin-left: 5px;
  background-color: #298cf7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 5px;
}
.subjectName_contain {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dk {
  margin-right: 5px;
  width: 30px;
  height: 25px;
  background-color: #298cf7;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.tk {
  margin-right: 5px;
  width: 30px;
  height: 25px;
  background-color: #be4fff;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
</style>