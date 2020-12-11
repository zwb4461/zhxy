<template>
  <div>
    <div class="contain">
      <div class="left">
        <el-tree
          :data="Menu"
          :props="ClassProps"
          @node-click="clickTree"
          highlight-current
          accordion
        ></el-tree>
      </div>
      <div class="right">
        <el-table
          size="small"
          :render-header="labelHead"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            :label="item"
            v-for="(item, index) in colList"
            :key="index"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/gradeTotal";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      Menu: [],
      colList: [],
      tableData: [],
      rowKey: [],
      ClassProps: {
        //树形的默认设置
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    labelHead(h, { column, index }) {
      return h("span", { class: "table-head", style: { width: "100%" } }, [
        column.label,
      ]);
    },
    getMenu() {
      console.log("this.cjlbId11111111111111", this.cjlbId);
      let val = { cjlbId: this.cjlbId };
      main
        .seeScore(val)
        .then((res) => {
          this.Menu = res.data;
        })
        .catch((err) => {});
    },
    //点击树
    clickTree(data, node) {
      if (node.level == 4) {
        let val = {
          schoolId: this.schoolId,
          ksxkId: node.data.id,
          ksId: node.parent.data.id,
          gradeId: node.parent.parent.data.id,
        };
        console.log(val);
        main
          .ksSeeScore(val)
          .then((res) => {
            this.colList = res.data.data2;
            this.tableData = res.data.data;
            this.rowKey = Object.keys(res.data.data[0]);
            console.log(this.tableData, "this.tableData");
            console.log(this.rowKey, "this.rowKey");
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    this.getMenu();
  },
};
</script>

<style scoped>
.contain {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  min-width: 250px;
  width: 250px;
  border: 1px solid #eeeeee;
  min-height: 600px;
}
.right {
  width: 100%;
  padding-left: 15px;
}
</style>