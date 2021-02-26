<template>
  <div>
    <van-tabs v-model="form.type">
      <van-tab title="代课">
        <van-cell-group>
          <van-field
            readonly
            clickable
            label="学期年级:"
            :value="form.className"
            placeholder="选择学期年级"
            @click="showXq = true"
          />
          <van-cell
            title="代课日期"
            :value="form.date"
            @click="showDkrq = true"
          />
          <van-field
            readonly
            clickable
            label="代课课次:"
            :value="form.stanza"
            placeholder="选择代课课次"
            @click="dkkc"
          />
          <van-field
            readonly
            clickable
            label="代课学科:"
            :value="form.xkname"
            placeholder="选择代课学科"
            @click="dkxk(6)"
          />
          <van-field readonly clickable label="原授课人:" :value="userName" />
          <van-field
            readonly
            clickable
            label="现授课人:"
            :value="form.teaname"
            placeholder="选择现授课人"
            @click="xskr()"
          />
          <van-field
            label="授课要求:"
            v-model="form.must"
            placeholder="授课要求"
          />
          <van-field
            label="代课原因:"
            v-model="form.reason"
            placeholder="代课原因"
          />
        </van-cell-group>
        <div class="topBtn">
          <van-button type="primary" style="width: 90%" @click="submit"
            >确定</van-button
          >
        </div>
      </van-tab>
      <van-tab title="调课">
        <van-cell-group>
          <van-field
            readonly
            clickable
            label="学期年级:"
            :value="form.className"
            placeholder="选择学期年级"
            @click="showXq = true"
          />
          <van-cell
            title="调课日期"
            :value="form.date"
            @click="showDkrq = true"
          />
          <van-field
            readonly
            clickable
            label="调课课次:"
            :value="form.stanza"
            placeholder="选择调课课次"
            @click="tkkc"
          />
          <van-field
            readonly
            clickable
            label="调课学科:"
            :value="form.xkname"
            placeholder="选择调课学科"
            @click="dkxk"
          />
          <van-field readonly clickable label="原授课人:" :value="userName" />
          <van-field
            readonly
            clickable
            label="现授课人:"
            :value="form.teaname"
            placeholder="选择现授课人"
            @click="xskr"
          />
          <van-field
            readonly
            clickable
            label="互调年级:"
            :value="form.oldCllassName"
            placeholder="选择学期年级"
            @click="hdnj"
          />
          <van-cell title="互调日期" :value="form.olddate" @click="htrq" />
          <van-field
            readonly
            clickable
            label="互调课次:"
            :value="form.oldStanza"
            placeholder="选择互调课次"
            @click="showHdkc = true"
          />
          <van-field
            readonly
            clickable
            label="互调学科:"
            :value="form.oldxkname"
            placeholder="选择互调学科"
            @click="htxk1"
          />

          <van-field
            label="调课原因:"
            v-model="form.reason"
            placeholder="调课原因"
          />
        </van-cell-group>
        <div class="topBtn">
          <van-button type="primary" style="width: 90%" @click="submit"
            >确定</van-button
          >
        </div>
      </van-tab>
    </van-tabs>
    <!-- 学期 -->
    <van-popup v-model="showXq" round position="bottom">
      <van-picker
        ref="picker"
        value-key="name"
        show-toolbar
        :columns="XqOpt"
        @cancel="showDl = false"
        @confirm="confirmXq"
      />
    </van-popup>
    <!-- 互调学期 -->
    <van-popup v-model="showHdxq" round position="bottom">
      <van-picker
        ref="picker2"
        value-key="name"
        show-toolbar
        :columns="XqOpt"
        @cancel="showHdxq = false"
        @confirm="confirmHdxq"
      />
    </van-popup>
    <!-- 代课节次 -->
    <van-popup v-model="showDkjc" round position="bottom">
      <van-picker
        ref="picker"
        value-key="stanz"
        show-toolbar
        :columns="stanzaOpt"
        @cancel="showDkjc = false"
        @confirm="confirmDkjc"
      />
    </van-popup>
    <!-- 互调节次 -->
    <van-popup v-model="showHdkc" round position="bottom">
      <van-picker
        ref="picker"
        value-key="stanz"
        show-toolbar
        :columns="stanzaOpt"
        @cancel="showHdkc = false"
        @confirm="confirmHdkc"
      />
    </van-popup>
    <!-- 代课学科 -->
    <van-popup v-model="showDkxk" round position="bottom">
      <van-picker
        ref="picker"
        value-key="subjectName"
        show-toolbar
        :columns="xkOpt"
        @cancel="showDkxk = false"
        @confirm="confirmDkxk"
      />
    </van-popup>
    <!-- 互调学科 -->
    <van-popup v-model="showHdxk" round position="bottom">
      <van-picker
        ref="picker"
        value-key="subjectName"
        show-toolbar
        :columns="xkOpt"
        @cancel="showHdxk = false"
        @confirm="confirmHdxk"
      />
    </van-popup>
    <!-- 现授课人 -->
    <van-popup v-model="showXskr" round position="bottom">
      <van-picker
        ref="picker"
        value-key="teacherName"
        show-toolbar
        :columns="XskrOpt"
        @cancel="showXskr = false"
        @confirm="confirmXskr"
      />
    </van-popup>
    <!-- 原授课人 -->
    <van-popup v-model="showYskr" round position="bottom">
      <van-picker
        ref="picker"
        value-key="teacherName"
        show-toolbar
        :columns="YskrOpt"
        @cancel="showYskr = false"
        @confirm="confirmYskr"
      />
    </van-popup>
    <van-calendar v-model="showDkrq" @confirm="confirmDkrq" />
    <van-calendar v-model="showHdrq" @confirm="confirmHdrq" />
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
    userName() {
      return this.$store.state.auth.userInfo.name;
    },
  },
  data() {
    return {
      kcZdyArr: [],
      zj: "",
      zjHt: "",
      xqName: "",
      cjlbId: "",
      active: 0,
      showXq: false,
      showDkrq: false,
      showDkjc: false,
      showDkxk: false,
      showXskr: false,
      showYskr: false,
      showHdxq: false,
      showHdxq: false,
      showHdrq: false,
      showHdkc: false,
      showHdxk: false,
      XqOpt: [],
      xkOpt: [],
      XskrOpt: [],
      YskrOpt: [],
      stanzaOpt: [
        // { name: "第一节", id: 1 },
        // { name: "第二节", id: 2 },
        // { name: "第三节", id: 3 },
        // { name: "第四节", id: 4 },
        // { name: "第五节", id: 5 },
        // { name: "第六节", id: 6 },
      ],
      form: {
        type: 0,
        classId: [],
        className: "",
        date: "",
        stanza: "",
        xkname: "",
        status: "",
        reason: "",
        must: "",
        oldTeaname: "",
        teaname: "",
        teaId: "",
        oldclassId: [],
        olddate: "",
        oldStanza: "",
        oldxkname: "",
      },
    };
  },
  methods: {
    dkkc() {
      this.showDkjc = true;
      this.getOpt(4);
    },
    hdxk() {
      this.showHdxk = true;
      this.getOpt(4);
    },
    getOpt(data) {
      if (data == 1) {
        //?代课学科opt
        let val = {
          classId: this.form.classId[2],
          type: 1,
        };
        console.log(val);
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 2) {
        //?原授课人opt
        this.showYskr = true;
        let val = {
          classId: this.form.classId[2],
          type: 2,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.YskrOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 3) {
        //?现授课人opt

        let val = {
          classId: this.form.classId[2],
          type: 3,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.XskrOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 4) {
        let data = new Date(this.form.date).getDay();
        this.zj = this.getZj(data);
        //?代课学科opt
        let val = {
          classId: this.form.classId[2],
          type: 4,
          weekName: this.zj,
          unionid: this.unionid,
          data: this.form.date,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.stanzaOpt = res.data;
            this.stanzaOpt = this.stanzaOpt.concat(this.kcZdyArr);
          })
          .catch((err) => {});
      } else if (data == 5) {
        //?现授课人opt
        let val = {
          type: 5,
          weekName: this.zj,
          stanz: this.form.stanza,
          unionid: this.unionid,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.XskrOpt = res.data;
          })
          .catch((err) => {});
      } else if (data == 6) {
        //?代课学科opt
        let val = {
          classId: this.form.classId[2],
          type: 1,
          stanz: this.form.stanza,
          weekName: this.zj,
        };
        main
          .selectTakeStanza(val)
          .then((res) => {
            this.xkOpt = res.data;
          })
          .catch((err) => {});
      }
    },
    hdnj() {
      this.showHdxq = true;
      let teacher = [];
      teacher = this.XskrOpt.filter((item) => {
        return item.teacherName == this.form.teaname;
      });
      let val = {
        cjlbId: this.cjlbId,
        type: 1,
        unionid: teacher.length > 0 ? teacher[0].teacherUnionid : "",
        //
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.XqOpt = res.data;
        })
        .catch((err) => {});
    },
    htxk1() {
      this.showHdxk = true;
    },
    htrq() {
      this.showHdrq = true;
    },
    tkkc() {
      this.showDkjc = true;
      this.getOpt(4);
    },
    dkxk() {
      this.showDkxk = true;
      this.getOpt(6);
    },
    xskr() {
      this.showXskr = true;
      this.getOpt(5);
    },
    getXqNj() {
      let val = {
        cjlbId: this.cjlbId,
        unionid: this.unionid,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.XqOpt = res.data;
        })
        .catch((err) => {});
    },
    //获取日期是周几
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
    submit() {
      let data = this.form;
      data.cjlbId = this.cjlbId;
      data.oldTeaId = this.unionid;
      data.status = undefined;
      console.log(data);
      main
        .add(data)
        .then((res) => {
          this.$message.success("提交成功!");
          this.$router.push("/Phone/dtk");
        })
        .catch((err) => {});
    },
    //!格式化日期
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    //!确定代课学科
    confirmDkxk(val) {
      this.showDkxk = false;
      this.form.xkname = val.subjectName;
    },
    //!确定互调学科
    confirmHdxk(val) {
      this.showHdxk = false;
      this.form.oldxkname = val.subjectName;
    },
    //!确定原授课人
    confirmYskr(val) {
      this.showYskr = false;
      this.form.oldTeaname = val.teacherName;
    },
    //!确定现授课人
    confirmXskr(val) {
      this.showXskr = false;
      this.form.teaname = val.teacherName;
      this.form.teaId = val.teacherUnionid;
    },
    //!确定代课节次
    confirmDkjc(val) {
      this.showDkjc = false;
      this.form.stanza = val.stanz;
      let data = {
        schoolId: this.schoolId,
        classId: this.form.classId ? this.form.classId[2] : "",
        stanz: this.form.stanza,
        weekName: this.zj,
        type: 4,
      };
      main
        .selectTakeStanza(data)
        .then((res) => {
          let data = {};
          data = res.data;
          this.form.xkname = data[0].subjectName;
        })
        .catch((err) => {});
    },
    //!确定互调节次
    confirmHdkc(val) {
      this.showHdkc = false;
      this.form.oldStanza = val.stanz;
      let data = {};
      data = this.stanzaOpt.filter((item) => {
        return item.stanz == this.form.oldStanza;
      });
      console.log(data, "data");
      this.form.oldxkname = data[0].subjectName;
    },
    //!确定代课日期
    confirmDkrq(date) {
      this.showDkrq = false;
      this.form.date = this.formatDate(date);
    },
    //!确定互调日期
    confirmHdrq(date) {
      let data1 = new Date(date).getDay();
      this.zjHt = this.getZj(data1);
      this.showHdrq = false;
      this.form.olddate = this.formatDate(date);
      let tId = this.XskrOpt.filter((item) => {
        return item.teacherName == this.form.teaname;
      });
      console.log(this.zjHt);
      let val = {
        schoolId: this.schoolId,
        classId: this.form.oldclassId ? this.form.oldclassId[2] : "",
        unionid: tId[0].teacherUnionid,
        weekName: this.zjHt,
        type: 4,
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          console.log(res.data, "获得的数据-------");
          this.stanzaOpt = res.data;
          this.xkOpt = res.data;
        })
        .catch((err) => {});
    },
    //!确定学期
    confirmXq(val) {
      let ind = this.$refs.picker.getIndexes();
      let one = this.XqOpt[ind[0]].id;
      let two = this.XqOpt[ind[0]].children[ind[1]].id;
      let three = this.XqOpt[ind[0]].children[ind[1]].children[ind[2]].id;
      this.form.classId = [one, two, three];
      this.form.className = val.join(",");
      this.showXq = false;
    },
    //!确定互调学期
    confirmHdxq(val) {
      let ind = this.$refs.picker2.getIndexes();
      let one = this.XqOpt[ind[0]].id;
      let two = this.XqOpt[ind[0]].children[ind[1]].id;
      let three = this.XqOpt[ind[0]].children[ind[1]].children[ind[2]].id;
      this.form.oldclassId = [one, two, three];
      this.form.oldCllassName = val.join(",");
      this.showHdxq = false;
    },
    //!获取当前学期
    getXq() {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          this.xqName = res.data.name;
          this.cjlbId = res.data.id;
          this.getXqNj();
          this.getKcZdy();
        })
        .catch((err) => {});
    },
    //!获取课次自定义参数
    getKcZdy() {
      main
        .selectSetTake({ cjlbId: this.cjlbId })
        .then((res) => {
          this.kcZdyArr = res.data.changeTakes.filter((item) => {
            return item.type == 0;
          });
          this.kcZdyArr = this.kcZdyArr.map((item) => {
            item.stanz = item.name;
            return item;
          });
          //   this.stanzaOptHt = this.stanzaOptHt.concat(this.kcZdyArr);
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>