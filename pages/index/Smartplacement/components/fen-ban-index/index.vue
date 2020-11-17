<template>
  <div>
    <a-spin size="large" tip="处理中" :spinning="loading.spinning">
      <div>
        <div style="width:100%;min-height:286px;overflow:hidden; zoom:1; ">
          <div class="main-box">
            <div class="button-box">
              <!-- <a-button
                v-if="isconfirm == 1"
                class="button-item noclick"
                icon="project"
                >选择分班班级</a-button
              > -->
              <a-button
                v-if="isconfirm == 0"
                class="button-item"
                icon="project"
                @click="toShowClass"
                >选择分班班级</a-button
              >
            </div>
            <div class="button-box">
              <!-- <a-button
                v-if="isconfirm == 1"
                class="button-item noclick"
                type="primary"
                icon="block"
                >开始随机分班</a-button
              > -->
              <a-button
                v-if="isconfirm == 0"
                class="button-item"
                type="primary"
                icon="block"
                @click="autoClass(2)"
                >开始随机分班</a-button
              >
            </div>
            <div class="button-box">
              <!-- <a-button
                v-if="isconfirm == 1"
                class="button-item noclick"
                type="primary"
                icon="desktop"
                >开始智能分班</a-button
              > -->
              <a-button
                v-if="isconfirm == 0"
                class="button-item"
                type="primary"
                icon="desktop"
                @click="autoClass(1)"
                >开始智能分班</a-button
              >
            </div>
            <div class="button-box">
              <!-- <a-button
                v-if="isconfirm == 1"
                class="noclick button-item"
                type="primary"
                icon="cloud"
                >保存</a-button
              > -->
              <a-button
                v-if="isconfirm == 0"
                class="button-item"
                type="primary"
                icon="cloud"
                @click="onSubmit"
                >保存</a-button
              >
            </div>
            <div class="button-box">
              <!-- <a-button
                v-if="isconfirm == 1"
                class="button-item noclick"
                type="danger"
                icon="check"
                >分班确定</a-button
              > -->
              <a-button
                v-if="isconfirm == 0"
                class="button-item"
                type="danger"
                icon="check"
                @click="confirmOk"
                >分班确定</a-button
              >
            </div>
          </div>
          <div v-for="(item, index) in classList" :key="index" class="main-box">
            <a-card @click="showClassInfo(item)" hoverable class="class-main">
              <div class="title">{{ item.name }}</div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="green">A</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.A1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.A2.length }}</div>
                  </a-col>
                </a-row>
              </div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="cyan">B</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.B1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.B2.length }}</div>
                  </a-col>
                </a-row>
              </div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="blue">C</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.C1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.C2.length }}</div>
                  </a-col>
                </a-row>
              </div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="purple">D</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.D1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.D2.length }}</div>
                  </a-col>
                </a-row>
              </div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="purple">E</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.E1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.E2.length }}</div>
                  </a-col>
                </a-row>
              </div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="purple">F</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.F1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.F2.length }}</div>
                  </a-col>
                </a-row>
              </div>

              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="red">未</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">{{ item.H1.length }}</div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">{{ item.H2.length }}</div>
                  </a-col>
                </a-row>
              </div>
              <div class="mark-box">
                <a-row class="mark-item">
                  <a-col :span="8">
                    <a-tag color="orange">总</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nan">
                      {{
                        item.A1.length +
                          item.B1.length +
                          item.C1.length +
                          item.D1.length +
                          item.E1.length +
                          item.F1.length +
                          item.H1.length
                      }}
                    </div>
                  </a-col>
                  <a-col :span="8">
                    <div class="sex-box nv">
                      {{
                        item.A2.length +
                          item.B2.length +
                          item.C2.length +
                          item.D2.length +
                          item.E2.length +
                          item.F2.length +
                          item.H2.length
                      }}
                    </div>
                  </a-col>
                </a-row>
              </div>
            </a-card>
            <!-- <a-button
              v-if="isconfirm == 1"
              size="small"
              class="noclick upload-student"
              icon="cloud-upload"
              >添加学生入班</a-button
            > -->
            <a-button
              v-if="isconfirm == 0"
              @click="uploadStudent(item.id)"
              size="small"
              class="upload-student"
              icon="cloud-upload"
              >添加学生入班</a-button
            >
          </div>
        </div>

        <a-card hoverable class="students-box">
          <a-row :gutter="16">
            <a-col :span="5" v-if="studentsLength.classA !== 0">
              <div class="mark-title">A</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && j.rank === 'A' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && j.rank === 'A' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="5" v-if="studentsLength.classB !== 0">
              <div class="mark-title">B</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && j.rank === 'B' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && j.rank === 'B' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="5" v-if="studentsLength.classC !== 0">
              <div class="mark-title">C</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && j.rank === 'C' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && j.rank === 'C' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="5" v-if="studentsLength.classD !== 0">
              <div class="mark-title">D</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && j.rank === 'D' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && j.rank === 'D' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="5" v-if="studentsLength.classE !== 0">
              <div class="mark-title">E</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && j.rank === 'E' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && j.rank === 'E' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="5" v-if="studentsLength.classF !== 0">
              <div class="mark-title">F</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && j.rank === 'F' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && j.rank === 'F' && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="4" v-if="studentsLength.classW !== 0">
              <div class="mark-title">未评定</div>
              <a-row>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nan',
                      item.isClick ? 'click-nan' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 1 && !j.rank && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="[
                      'name-item',
                      'hvr-grow-rotate',
                      'border-nv',
                      item.isClick ? 'click-nv' : ''
                    ]"
                    v-for="(item, index) in studentsList.filter(
                      j => j.sex == 2 && !j.rank && !j.hide
                    )"
                    :key="index"
                    @click="changeClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>

        <!-- 显示学生数组 -->
        <a-modal
          :title="data.classInfo.name"
          width="80vw"
          :visible="pop.classInfo"
          @cancel="closeClassInfo"
        >
          <class-students :classInfo="data.classInfo"></class-students>
          <div class="class-info-button" slot="footer">
            <!-- <a-button v-if="isconfirm == 1" class="noclick">取消</a-button> -->
            <a-button v-if="isconfirm == 0" @click="closeClassInfo"
              >取消</a-button
            >
            <!-- <a-button
              v-if="isconfirm == 1"
              class="noclick"
              type="danger"
              icon="cloud-download"
              >移除选中学生</a-button
            > -->
            <a-button
              v-if="isconfirm == 0"
              @click="outClickStudents"
              type="danger"
              icon="cloud-download"
              >移除选中学生</a-button
            >
          </div>
        </a-modal>

        <!-- 显示组织管理选择部门 -->
        <a-modal
          title="选择班级"
          width="800px"
          :visible="pop.class"
          @cancel="outClickStudentsClose"
        >
          <class-choose
            ref="classChoose"
            :getClassList="getClassList"
          ></class-choose>
          <div class="class-info-button" slot="footer">
            <a-button
              :class="isconfirm == 1 ? 'noclick' : ''"
              @click="outClickStudentsClose"
              >取消</a-button
            >
            <a-button
              :class="isconfirm == 1 ? 'noclick' : ''"
              @click="toGetClass"
              type="primary"
              >确定</a-button
            >
          </div>
        </a-modal>

        <a-modal title="提示" :visible="pop.importStudent" :footer="null">
          <a-icon type="sync" spin />正在导入学籍库请稍后。。。
        </a-modal>
      </div>
    </a-spin>
  </div>
</template>

<script>
//接口
import main from "~/api/Smartplacement"; //智能分班主接口
import DD from "~/api/dingding"; //钉钉相关接口
import studentStatus from "~/api/studentStatus"; //学籍管理
import freshmenReport from "~/api/freshmenReport"; //学生类型

//组件
import classStudents from "./components/class-students.vue";
import classChoose from "./components/class-choose.vue";

export default {
  components: {
    classStudents,
    classChoose
  },
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    }
  },
  data() {
    return {
      enrollId: "",
      studenttype: "",
      isconfirm: 0,
      indicator: <a-icon type="loading" spin />,
      loading: {
        spinning: false
      },
      pop: {
        classInfo: false,
        class: false,
        importStudent: false
      },
      data: {
        classInfo: {}
      },
      showList: [],
      classList: [
        // {
        //   id: 30001,
        //   name: "一年级1班",
        //   A1: [],
        //   A2: [],
        //   B1: [],
        //   B2: [],
        //   C1: [],
        //   C2: [],
        //   D1: [],
        //   D2: [],
        //   H1: [],
        //   H2: []
        // },
      ],
      studentsList: [
        // {
        //   hide: false,
        //   id: 1,
        //   name: "华吉锋啊",
        //   sex: 1,
        //   isClick: false,
        //   rank: "A"
        // }
      ],
      studentsLength: {
        classA: 0,
        classB: 0,
        classC: 0,
        classD: 0,
        classE: 0,
        classF: 0,
        classW: 0
      }
    };
  },
  methods: {
    //再次进入取得分班成功后的数据
    async getOkDataInfo(list) {
      //   this.loading.spinning = true;
      //获取钉钉部门
      let { data: dep } = await DD.dep({ schoolId: this.schoolId });

      //获取分班信息
      let { data: classInfo } = await main.find({ enrollId: this.enrollId });
      //   debugger;
      //获取班级信息
      let cList = list.map(i => dep.find(j => j.deptId == i));
      //赋值班级
      this.getClassList(cList);
      //赋值选中的班级
      // this.$refs.classChoose.setData(cList);
      //   setTimeout(() => {
      //     this.toSetClass();
      //   }, 1000);
      //赋值班级人员
      this.getOkInfo(classInfo);
      this.loading.spinning = false;
    },
    //获取钉钉部门
    getDDdepReal() {
      DD.dep({ schoolId: this.schoolId })
        .then(res => {
          //   // console.log("真正的钉钉部门--23---", res);
        })
        .catch(err => {});
    },
    //初始化数据（ isClick =false,,, hide =false）
    dataInit(list) {
      return list.map(item => {
        let obj = { ...item };
        obj.isClick = false;
        obj.hide = false;
        return obj;
      });
    },
    //分班结束后返回处理
    getOkInfo(data) {
      //转换返回的数据，将学生存入班级中
      for (const item of this.classList) {
        item.A1 = this.dataInit(data[`${item.id}A1`]);
        item.A2 = this.dataInit(data[`${item.id}A2`]);
        item.B1 = this.dataInit(data[`${item.id}B1`]);
        item.B2 = this.dataInit(data[`${item.id}B2`]);
        item.C1 = this.dataInit(data[`${item.id}C1`]);
        item.C2 = this.dataInit(data[`${item.id}C2`]);
        item.D1 = this.dataInit(data[`${item.id}D1`]);
        item.D2 = this.dataInit(data[`${item.id}D2`]);
        item.E1 = this.dataInit(data[`${item.id}E1`]);
        item.E2 = this.dataInit(data[`${item.id}E2`]);
        item.F1 = this.dataInit(data[`${item.id}F1`]);
        item.F2 = this.dataInit(data[`${item.id}F2`]);
        item.H1 = this.dataInit(data[`${item.id}H1`]);
        item.H2 = this.dataInit(data[`${item.id}H2`]);
      }

      //重新刷未分班的学生信息
      this.getStudents();

      this.loading.spinning = false;
    },
    //自动分班（type = 1 是智能分班  type = 2 是手动分班）
    autoClass(type = 1) {
      if (this.classList.length > 0) {
        this.loading.spinning = true;
        let list = this.classList.map(item => item.id);
        if (type === 1) {
          //智能分班
          main
            .autoSmart({
              enrollId: this.enrollId,
              list
            })
            .then(res => {
              this.getOkInfo(res.data);
            })
            .catch(err => {
              this.$message.error(err);
              this.loading.spinning = false;
            });
        } else if (type === 2) {
          //随机分班
          main
            .autoRandom({
              enrollId: this.enrollId,
              list
            })
            .then(res => {
              this.getOkInfo(res.data);
            })
            .catch(err => {
              this.$message.error(err);
              this.loading.spinning = false;
            });
        }
      } else {
        this.$message.error("请选择需要分班的班级");
      }
    },
    //得到指定班级的人员id
    getClassIdList(data) {
      let list = [
        ...data.A1,
        ...data.A2,
        ...data.B1,
        ...data.B2,
        ...data.C1,
        ...data.C2,
        ...data.D1,
        ...data.D2,
        ...data.E1,
        ...data.E2,
        ...data.F1,
        ...data.F2,
        ...data.H1,
        ...data.H2
      ];

      return list.map(i => i.id);
    },
    //手动分班
    onSubmit() {
      //   // console.log(this.classList);

      this.loading.spinning = true;
      let map = {};
      for (const item of this.classList) {
        let idList = this.getClassIdList(item);
        if (idList.length > 0) {
          map[item.id] = idList;
        } else {
          map[item.id] = [];
        }
      }

      main
        .submit({ enrollId: this.enrollId, map })
        .then(res => {
          this.$message.success("保存成功");
          this.loading.spinning = false;
        })
        .catch(err => {
          this.loading.spinning = false;

          this.$message.error(err);
        });
    },

    confirmOk() {
      this.onSubmit();

      this.$confirm({
        icon: "null",
        class: "confirm-Ok",
        content: `确定要对“${this.studenttype}”进行确定操作吗？点击“分班确定”系统正式将新生分配到各班级中。并对“${this.studenttype}”数据进行锁定，只能进行数据查看。`,
        onOk: () => {
          main
            .confirm({ enrollId: this.enrollId })
            //分班成功
            .then(res => {
              this.$message.success("分班成功");

              //执行导入学籍库操作
              this.pop.importStudent = true;
              return studentStatus.importThis({ enrollId: this.enrollId });
            })
            //导入学籍库成功
            .then(res => {
              this.pop.importStudent = false;
              this.$message.success("学籍库导入成功");

              //执行关闭报名操作
              return freshmenReport.close({ enrollId: this.enrollId });
            })
            //关闭报名成功
            .then(res => {
              // // console.log("报名关闭成功");
            })
            .catch(err => {
              this.pop.importStudent = false;
              this.$message.error(err);
            });
        },
        onCancel() {}
      });
    },
    //获取未分班的学生
    getStudents() {
      main
        .student({ enrollId: this.enrollId })
        .then(res => {
          // // console.log("获取的学生是------", res.data);
          let info = res.data;

          let infoList = [
            ...info.A1,
            ...info.A2,
            ...info.B1,
            ...info.B2,
            ...info.C1,
            ...info.C2,
            ...info.D1,
            ...info.D2,
            ...info.E1,
            ...info.E2,
            ...info.F1,
            ...info.F2,
            ...info.H1,
            ...info.H2
          ];

          this.studentsList = infoList.map(i => {
            return { ...i, ...{ isClick: false, hide: false } };
          });
          //   for (const item of this.studentsList) {
          //     item.isClick = false;
          //     item.hide = false;
          //   }

          this.studentsList.forEach(list => {
            if (list.rank === "A") {
              this.studentsLength.classA++;
            } else if (list.rank === "B") {
              this.studentsLength.classB++;
            } else if (list.rank === "C") {
              this.studentsLength.classC++;
            } else if (list.rank === "D") {
              this.studentsLength.classD++;
            } else if (list.rank === "E") {
              this.studentsLength.classE++;
            } else if (list.rank === "F") {
              this.studentsLength.classF++;
            } else if (list.rank == null) {
              this.studentsLength.classW++;
            }
          });

          //   // console.log(this.studentsList, "0000000000");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //初始化方法
    setInfo(id, list, studenttype, isconfirm) {
      //   // console.log("获得的id是-----------", id);
      //   // console.log("获得的id是-----------", id);
      //   // console.log("获得的list是-----------", list);
      //   // console.log("获得的isconfirm是-----------", isconfirm);
      this.enrollId = id;
      this.studenttype = studenttype;
      this.isconfirm = isconfirm;
      if (list.length > 0) {
        //如果有班级
        this.getOkDataInfo(list).catch(err => {
          this.$message.error(err);
        });
      } else {
        //没有班级
        this.getStudents();
      }
    },
    changeClick(item) {
      item.isClick = !item.isClick;
    },
    //删除数组元素
    delItem(list, idx) {
      list.splice(idx, 1);
    },
    //返回相对应的学生
    returnTypeStudents(list, sex, rank) {
      let info = list.filter(item => item.sex === sex && item.rank == rank);
      return info ? info : [];
    },
    //重置表单
    initClassStudent(info) {
      for (const item of info.A1) {
        item.isClick = false;
      }
      for (const item of info.A2) {
        item.isClick = false;
      }
      for (const item of info.B1) {
        item.isClick = false;
      }
      for (const item of info.B2) {
        item.isClick = false;
      }
      for (const item of info.C1) {
        item.isClick = false;
      }
      for (const item of info.C2) {
        item.isClick = false;
      }
      for (const item of info.D1) {
        item.isClick = false;
      }
      for (const item of info.D2) {
        item.isClick = false;
      }
      for (const item of info.E1) {
        item.isClick = false;
      }
      for (const item of info.E2) {
        item.isClick = false;
      }
      for (const item of info.F1) {
        item.isClick = false;
      }
      for (const item of info.F2) {
        item.isClick = false;
      }
      for (const item of info.H1) {
        item.isClick = false;
      }
      for (const item of info.H2) {
        item.isClick = false;
      }
    },
    //添加学生到对应的班级
    uploadStudent(id) {
      let clickStudent = this.studentsList.filter(item => item.isClick);

      if (clickStudent && clickStudent.length > 0) {
        let info = this.classList.find(item => item.id === id);
        // // console.log(info);
        // // console.log("clickStudent---------", clickStudent);
        info.A1 = [
          ...info.A1,
          ...this.returnTypeStudents(clickStudent, 1, "A")
        ];
        info.A2 = [
          ...info.A2,
          ...this.returnTypeStudents(clickStudent, 2, "A")
        ];
        info.B1 = [
          ...info.B1,
          ...this.returnTypeStudents(clickStudent, 1, "B")
        ];
        info.B2 = [
          ...info.B2,
          ...this.returnTypeStudents(clickStudent, 2, "B")
        ];
        info.C1 = [
          ...info.C1,
          ...this.returnTypeStudents(clickStudent, 1, "C")
        ];
        info.C2 = [
          ...info.C2,
          ...this.returnTypeStudents(clickStudent, 2, "C")
        ];
        info.D1 = [
          ...info.D1,
          ...this.returnTypeStudents(clickStudent, 1, "D")
        ];
        info.D2 = [
          ...info.D2,
          ...this.returnTypeStudents(clickStudent, 2, "D")
        ];
        info.E1 = [
          ...info.E1,
          ...this.returnTypeStudents(clickStudent, 1, "E")
        ];
        info.E2 = [
          ...info.E2,
          ...this.returnTypeStudents(clickStudent, 2, "E")
        ];
        info.F1 = [
          ...info.F1,
          ...this.returnTypeStudents(clickStudent, 1, "F")
        ];
        info.F2 = [
          ...info.F2,
          ...this.returnTypeStudents(clickStudent, 2, "F")
        ];
        info.H1 = [
          ...info.H1,
          ...this.returnTypeStudents(clickStudent, 1, null)
        ];
        info.H2 = [
          ...info.H2,
          ...this.returnTypeStudents(clickStudent, 2, null)
        ];

        //删除选中的学生
        this.studentsList = this.studentsList.filter(item => !item.isClick);

        //重置班级学生数组的点击状态
        this.initClassStudent(info);
      } else {
        this.$message.error("请先选择学生");
      }
    },
    //显示该班级详情
    showClassInfo(item) {
      this.pop.classInfo = true;
      this.$nextTick(() => {
        this.data.classInfo = item;
      });
    },
    //关闭学生详情
    closeClassInfo() {
      this.pop.classInfo = false;
      this.initClassStudent(this.data.classInfo);
    },
    outClickStudentsClose() {
      this.pop.class = false;
    },
    //移出选中学生
    outClickStudents() {
      let info = this.classList.find(
        item => item.id === this.data.classInfo.id
      );
      this.studentsList = [
        ...this.studentsList,
        ...this.data.classInfo.A1.filter(item => item.isClick),
        ...this.data.classInfo.A2.filter(item => item.isClick),
        ...this.data.classInfo.B1.filter(item => item.isClick),
        ...this.data.classInfo.B2.filter(item => item.isClick),
        ...this.data.classInfo.C1.filter(item => item.isClick),
        ...this.data.classInfo.C2.filter(item => item.isClick),
        ...this.data.classInfo.D1.filter(item => item.isClick),
        ...this.data.classInfo.D2.filter(item => item.isClick),
        ...this.data.classInfo.E1.filter(item => item.isClick),
        ...this.data.classInfo.E2.filter(item => item.isClick),
        ...this.data.classInfo.F1.filter(item => item.isClick),
        ...this.data.classInfo.F2.filter(item => item.isClick),
        ...this.data.classInfo.H1.filter(item => item.isClick),
        ...this.data.classInfo.H2.filter(item => item.isClick)
      ];

      //需要重置的学生id
      let ids = [
        ...this.data.classInfo.A1.filter(item => item.isClick),
        ...this.data.classInfo.A2.filter(item => item.isClick),
        ...this.data.classInfo.B1.filter(item => item.isClick),
        ...this.data.classInfo.B2.filter(item => item.isClick),
        ...this.data.classInfo.C1.filter(item => item.isClick),
        ...this.data.classInfo.C2.filter(item => item.isClick),
        ...this.data.classInfo.D1.filter(item => item.isClick),
        ...this.data.classInfo.D2.filter(item => item.isClick),
        ...this.data.classInfo.E1.filter(item => item.isClick),
        ...this.data.classInfo.E2.filter(item => item.isClick),
        ...this.data.classInfo.F1.filter(item => item.isClick),
        ...this.data.classInfo.F2.filter(item => item.isClick),
        ...this.data.classInfo.H1.filter(item => item.isClick),
        ...this.data.classInfo.H2.filter(item => item.isClick)
      ].map(j => j.id);

      //重置学生信息
      main.initStudent(ids);

      info.A1 = this.data.classInfo.A1.filter(item => !item.isClick);
      info.A2 = this.data.classInfo.A2.filter(item => !item.isClick);
      info.B1 = this.data.classInfo.B1.filter(item => !item.isClick);
      info.B2 = this.data.classInfo.B2.filter(item => !item.isClick);
      info.C1 = this.data.classInfo.C1.filter(item => !item.isClick);
      info.C2 = this.data.classInfo.C2.filter(item => !item.isClick);
      info.D1 = this.data.classInfo.D1.filter(item => !item.isClick);
      info.D2 = this.data.classInfo.D2.filter(item => !item.isClick);
      info.E1 = this.data.classInfo.E1.filter(item => !item.isClick);
      info.E2 = this.data.classInfo.E2.filter(item => !item.isClick);
      info.F1 = this.data.classInfo.F1.filter(item => !item.isClick);
      info.F2 = this.data.classInfo.F2.filter(item => !item.isClick);
      info.H1 = this.data.classInfo.H1.filter(item => !item.isClick);
      info.H2 = this.data.classInfo.H2.filter(item => !item.isClick);

      this.studentsList.forEach(item => {
        item.isClick = false;
      });
      this.pop.classInfo = false;

      this.$nextTick(() => {
        this.getStudents();
      });
    },
    //得到班级
    getClassList(list) {
      //   debugger;
      // // console.log("获得的班级数组是----", list);
      let bb = [];
      for (const item of list) {
        let aa = this.classList.findIndex(j => j.id == item.deptId) > -1;
        // // console.log(aa);
        if (!aa) {
          this.classList.push({
            id: item.deptId,
            name: item.name,
            A1: [],
            A2: [],
            B1: [],
            B2: [],
            C1: [],
            C2: [],
            D1: [],
            D2: [],
            E1: [],
            E2: [],
            F1: [],
            F2: [],
            H1: [],
            H2: []
          });
        }

        if (this.classList.length > 0) {
          bb.push(this.classList.find(i => i.id == item.deptId));
        }
      }
      this.classList = bb;
      this.pop.class = false;
    },
    toShowClass() {
      this.pop.class = true;
      this.$nextTick(() => {
        this.toSetClass(this.classList);
      });
    },
    //点击获取班级
    toGetClass() {
      this.$refs.classChoose.getData();
    },
    toSetClass(list) {
      this.$refs.classChoose.setData(list);
    }
  }
};
</script>

<style lang="scss" scoped>
.noclick {
  cursor: not-allowed;
}
.hvr-grow-rotate:hover,
.hvr-grow-rotate:focus,
.hvr-grow-rotate:active {
  transform: scale(1.1);
}
.upload-student {
  width: 200px;
  margin-top: 10px;
}
.main-box {
  float: left;
  margin: 15px;
  //   height: 285px;
  .class-main {
    width: 200px;
    height: 370px;
    border-radius: 10px;
  }
  .button-box {
    margin-top: 20px;
    .button-item {
      width: 150px;
    }
  }
  .title {
    font-weight: bolder;
    color: black;
    text-align: center;
    position: relative;
    bottom: 20px;
  }
  .mark-box {
    font-size: 16px;
    position: relative;
    right: 15px;
    bottom: 10px;
    width: 180px;
    height: 40px;
    line-height: 34px;
    .mark-item {
      text-align: center;
      .sex-box {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        color: white;
      }
      .nan {
        background: #4f6fff;
      }
      .nv {
        background: #be4fff;
      }
    }
  }
}
.students-box {
  width: 100%;
  border-radius: 5px;
  .mark-title {
    height: 30px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid lightgray;
  }
  .name-item {
    color: black;
    float: left;
    border-radius: 5px;
    margin: 5px;
    font-size: 12px;
    text-align: center;
    min-width: 55px;
    height: 25px;
  }
  .border-nan {
    border: 1px solid #4f6fff;
  }
  .border-nv {
    border: 1px solid #be4fff;
  }
  .click-nan {
    color: white;
    background: #4f6fff;
  }
  .click-nv {
    color: white;
    background: #be4fff;
  }
}
.class-info-button {
  text-align: center;
}
/deep/ .ant-modal-confirm {
  background: red !important;
}
</style>
