<template>
  <div>
    <van-tabs v-model="form.type">
      <van-tab title="代课">
        <van-cell-group>
          <van-field
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
            clickable
            label="代课课次:"
            :value="form.stanza"
            placeholder="选择代课课次"
            @click="showDkjc = true"
          />
          <van-field
            clickable
            label="代课学科:"
            :value="form.xkname"
            placeholder="选择代课学科"
            @click="getOpt(1)"
          />

          <van-field disabled clickable label="原授课人:" :value="userName" />
          <van-field
            clickable
            label="现授课人:"
            :value="form.teaname"
            placeholder="选择现授课人"
            @click="getOpt(3)"
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
            clickable
            label="调课课次:"
            :value="form.stanza"
            placeholder="选择调课课次"
            @click="showDkjc = true"
          />
          <van-field
            clickable
            label="调课学科:"
            :value="form.xkname"
            placeholder="选择调课学科"
            @click="getOpt(1)"
          />
          <van-field
            clickable
            label="原授课人:"
            :value="form.oldTeaname"
            placeholder="选择原授课人"
            @click="getOpt(2)"
          />
          <van-field
            clickable
            label="互调年级:"
            :value="form.oldCllassName"
            placeholder="选择学期年级"
            @click="showHdxq = true"
          />
          <van-cell
            title="互调日期"
            :value="form.olddate"
            @click="showHdrq = true"
          />
          <van-field
            clickable
            label="互调课次:"
            :value="form.oldStanza"
            placeholder="选择互调课次"
            @click="showHdkc = true"
          />
          <van-field
            clickable
            label="互调学科:"
            :value="form.oldxkname"
            placeholder="选择互调学科"
            @click="getOpt(4)"
          />
          <van-field
            clickable
            label="现授课人:"
            :value="form.teaname"
            placeholder="选择现授课人"
            @click="getOpt(3)"
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
        value-key="name"
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
        value-key="name"
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
        { name: "第一节", id: 1 },
        { name: "第二节", id: 2 },
        { name: "第三节", id: 3 },
        { name: "第四节", id: 4 },
        { name: "第五节", id: 5 },
        { name: "第六节", id: 6 },
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
        oldclassId: [],
        olddate: "",
        oldStanza: "",
        oldxkname: "",
      },
    };
  },
  methods: {
    getOpt(data) {
      if (data == 1) {
        //?代课学科opt
        this.showDkxk = true;
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
        this.showXskr = true;
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
        //?代课学科opt
        this.showHdxk = true;
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
      }
    },
    getXqNj() {
      let val = {
        cjlbId: 44,
        type: 1,
      };
      main1
        .seeSiji(val)
        .then((res) => {
          this.XqOpt = res.data;
        })
        .catch((err) => {});
    },
    submit() {
      let data = this.form;
      data.cjlbId = 44;
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
    },
    //!确定代课节次
    confirmDkjc(val) {
      this.showDkjc = false;
      this.form.stanza = val.name;
    },
    //!确定互调节次
    confirmHdkc(val) {
      this.showHdkc = false;
      this.form.oldStanza = val.name;
    },
    //!确定代课日期
    confirmDkrq(date) {
      this.showDkrq = false;
      this.form.date = this.formatDate(date);
    },
    //!确定互调日期
    confirmHdrq(date) {
      this.showHdrq = false;
      this.form.olddate = this.formatDate(date);
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
  },
  created() {
    this.getXqNj();
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