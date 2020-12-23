<template>
  <div class="contain">
    <div class="left">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="clickTree"
        highlight-current
        accordion
      ></el-tree>
    </div>
    <div style="margin-left: 15px">
      <el-button v-if="cjd" type="primary" size="small" v-print="'#printTest'"
        >打印</el-button
      >
    </div>
    <div class="right" v-if="cjd" id="printTest">
      <div
        class="info1"
        style="font-size: 23px; height: 28px; font-weight: none"
      >
        <span>{{ tableData.title }}</span>
      </div>
      <div class="info1">
        <span>小 学 生 全 面 素 质 报 告 单</span>
      </div>
      <div class="info">
        <span>姓名:{{ tableData.name }}</span>
        <span>性别:{{ tableData.sex == 1 ? "男" : "女" }}</span>
        <span>班级:{{ tableData.className }}</span>
        <span>学号:{{ tableData.xh }}</span>
      </div>
      <div class="topTitle"><span>一、学科基础知识和能力</span></div>
      <div class="kaoshi_contain">
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span>{{ tableData.names[index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span>{{ tableData.names[index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span>{{ tableData.names[index] }}</span>
        </div>
      </div>
      <!-- 成绩部分 -->
      <div class="kaoshi_contain" v-if="gradeRowNum >= 1">
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[0]">{{ tableData.xkMap[0][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[1]">{{ tableData.xkMap[1][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[2]">{{ tableData.xkMap[2][index] }}</span>
        </div>
      </div>
      <div class="kaoshi_contain" v-if="gradeRowNum >= 2">
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[3]">{{ tableData.xkMap[3][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[4]">{{ tableData.xkMap[4][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[5]">{{ tableData.xkMap[5][index] }}</span>
        </div>
      </div>
      <div class="kaoshi_contain" v-if="gradeRowNum >= 3">
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[6]">{{ tableData.xkMap[6][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[7]">{{ tableData.xkMap[7][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[8]">{{ tableData.xkMap[8][index] }}</span>
        </div>
      </div>
      <div class="kaoshi_contain" v-if="gradeRowNum >= 4">
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[9]">{{ tableData.xkMap[9][index] }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[10]">{{
            tableData.xkMap[10][index]
          }}</span>
        </div>
        <div
          class="kaoshi"
          :style="{ width: xkWid + '%' }"
          v-for="(item, index) in xkNum"
          :key="index"
        >
          <span v-if="tableData.xkMap[11]">{{
            tableData.xkMap[11][index]
          }}</span>
        </div>
      </div>
      <!-- 奖惩和出勤 -->
      <div class="jccq">
        <div class="jcText" :style="{ width: xkWid + '%' }">
          <span>奖惩</span>
        </div>
        <div
          class="jc"
          :style="{ width: 4 * xkWid + '%', 'flex-direction': 'column' }"
        >
          <span v-for="(item, index) in tableData.prizes" :key="index">
            {{ item.current }}
          </span>
        </div>
        <div class="jcText" :style="{ width: xkWid + '%' }">
          <span>出勤</span>
        </div>
        <div class="jcText1" :style="{ width: (100 - 6 * xkWid) / 2 + '%' }">
          <div class="one"><span>应出席（天）</span></div>
          <div class="two">
            <span>{{ tableData.ycx }}</span>
          </div>
        </div>
        <div class="jcText1" :style="{ width: (100 - 6 * xkWid) / 2 + '%' }">
          <div class="one"><span>病事假（天）</span></div>
          <div class="two">
            <span>{{ tableData.illness }}</span>
          </div>
        </div>
      </div>
      <!-- 品德评语 -->
      <div class="pdpy_contain">
        <div class="pdpy" :style="{ width: xkWid + '%' }">
          <span>品德评语</span>
        </div>
        <div class="jc" :style="{ width: 100 - xkWid + '%' }">
          <span>{{ tableData.comment }}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_one">
          <span>二、课外兴趣、爱好和特长</span>
        </div>
        <div class="bottom_two">
          <span>三、身体形态、机能、素质</span>
        </div>
      </div>
      <div class="final">
        <div class="finalLeft">{{ tableData.hobby }}</div>
        <div class="finalRight">
          <div class="finalRightTop">
            <div class="xb">
              <span>项别</span>
            </div>
            <div class="xb">
              <span>体重（千克）</span>
            </div>
            <div class="xb">
              <span>身高（厘米）</span>
            </div>
            <div class="xb11">
              <div class="slt1"><span>视力</span></div>
              <div class="slt">
                <div class="slTop"><span>左</span></div>
                <div class="slTop"><span>右</span></div>
              </div>
            </div>
          </div>
          <div class="finalRightBottom">
            <div class="ckz">
              <span>参考值</span>
            </div>
            <div class="ckz">
              <span v-if="tableData.twszs">{{ tableData.twszs[1].tz }}</span>
            </div>
            <div class="ckz">
              <span v-if="tableData.twszs">{{ tableData.twszs[1].sg }}</span>
            </div>
            <div class="ckz">
              <span v-if="tableData.twszs">{{ tableData.twszs[1].zsl }}</span>
            </div>
          </div>
          <div class="finalRightBottom">
            <div class="ckz">
              <span>数值</span>
            </div>
            <div class="ckz">
              <span v-if="tableData.twszs">{{ tableData.twszs[0].tz }}</span>
            </div>
            <div class="ckz">
              <span v-if="tableData.twszs">{{ tableData.twszs[0].sg }}</span>
            </div>
            <div class="ckz">
              <div class="slTop">
                <span v-if="tableData.twszs">{{ tableData.twszs[0].zsl }}</span>
              </div>
              <div class="slTop">
                <span v-if="tableData.twszs">{{ tableData.twszs[0].ysl }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info2">
        <span>下学期报到时间:{{ tableData.nextxsarrive2 }}</span>
      </div>
      <div class="info">
        <span>校长:{{ tableData.principal }}</span>
        <span>教导主任:{{ tableData.director }}</span>
        <span>班主任:{{ tableData.headmaster }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import main from "~/api/cjdsz";
import main1 from "~/api/jcManage";

import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  props: {
    cjlbId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      cjd: false,
      xkWid: "",
      treeData: [],
      tableData: {},
      xkNum: 0,
      gradeRowNum: 0,
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    getTree() {
      main1
        .seeSanjiMeui({ cjlbId: this.cjlbId })
        .then((res) => {
          this.treeData = res.data;
        })
        .catch((err) => {});
    },
    setGradeRowNum(val) {
      let chu = 0;
      let yu = 0;
      chu = parseInt(val / 3);
      yu = val % 3;
      if (yu > 0) {
        this.gradeRowNum = chu + 1;
      } else if (yu > 0) {
        this.gradeRowNum = chu;
      }
    },
    clickTree(data, Node) {
      if (Node.level == 4) {
        let val = {
          cjlbId: this.cjlbId,
          schoolId: this.schoolId,
          name: Node.data.name,
          classId: Node.parent.data.id,
          djxq: Node.parent.parent.parent.data.id,
        };
        main
          .seeAchimodule(val)
          .then((res) => {
            this.tableData = res.data[0];
            //学科div循环次数
            this.xkNum = res.data[0].names.length;
            //学科div宽度
            this.xkWid = 100 / res.data[0].names.length / 3;
            this.setGradeRowNum(res.data[0].xkMap.length);
            if (res.code == 200) {
              this.cjd = true;
            } else {
              this.cjd = false;
            }
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    this.getTree();
  },
};
</script>

<style scoped>
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.left {
  width: 250px;
  min-height: 500px;
  border: 1px solid #eeeeee;
}
.right {
  width: 100%;
  min-height: 500px;
  margin-left: 50px;
  margin-top: 100px;
}
.info {
  width: 85%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.info2 {
  width: 85%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.info1 {
  width: 85%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.topTitle {
  width: 85%;
  height: 50px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.kaoshi_contain {
  width: 85%;
  height: 50px;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.kaoshi {
  height: 50px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jccq {
  height: 105px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.jcText {
  height: 105px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: none;
  border-left: none;
}
.jcText1 {
  height: 105px;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: none;
  border-left: none;
}
.jc {
  height: 105px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.one {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.two {
  width: 100%;
  height: 65px;
  border-top: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pdpy_contain {
  height: 105px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.pdpy {
  height: 105px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom {
  height: 50px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  flex-direction: row;
}
.bottom_one {
  height: 50px;
  width: 40%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom_two {
  height: 50px;
  width: 60%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.final {
  height: 200px;
  width: 85%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finalLeft {
  height: 200px;
  width: 40%;
  border: 1px solid #000000;
  border-top: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finalRight {
  height: 200px;
  width: 60%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: column;
}
.finalRightTop {
  height: 100px;
  width: 100%;
  border: 1px solid #000000;
  border-top: none;
  border-bottom: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xb {
  height: 100px;
  width: 25%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xb11 {
  height: 100px;
  width: 25%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: column;
}
.slt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.slt1 {
  display: flex;
  justify-content: center;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  align-items: center;
  height: 50%;
}
.slTop {
  height: 50px;
  width: 100%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finalRightBottom {
  height: 50px;
  width: 100%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: row;
}
.ckz {
  height: 50px;
  width: 25%;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>