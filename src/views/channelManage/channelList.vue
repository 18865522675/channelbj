<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>渠道商列表</span>
            </div>
            <div class="cardBody">
                <div class="cardBodyHeader flex-r" style="justify-content: space-between">
                    <div class="flex-r">
                        <div class="cardHeader-searchInp">
                            <el-input placeholder="请输入账号名称" v-model="tableForm.loginName" class="searchInpBody">
                                <el-button slot="append" icon="el-icon-search" @click="readyAjax"></el-button>
                            </el-input>
                        </div>
                        <!--<div class="marL10">-->
                            <!--<el-button type="primary" size="small" style="background: rgb(50, 64, 87)" @click="addDialogShow(true)">添加</el-button>-->
                        <!--</div>-->
                    </div>
                    <div class="peopleCount">
                         人数 : <span class="peopleCountNum">{{peopleCountNum}}</span>
                    </div>
                </div>

                <div class="cardTableWrap">
                    <el-table
                            :data="tableData"
                            border
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            class="cardTable"
                            style="width: 100%">
                        <el-table-column

                                prop="id"
                                label="ID"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                width="120"
                                label="渠道商名称">
                        </el-table-column>
                        <el-table-column
                                prop="loginName"
                                label="账号"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="linkUrl"
                                label="推广链接"
                                :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                                prop="visitorCount"
                                width="80"
                                label="访问量">
                        </el-table-column>
                        <el-table-column
                                prop="memberCount"
                                label="注册会员数"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <!--<el-button @click="addDialogShow(false,scope.row)" type="text" size="small">修改</el-button>-->
                                <!--<baseDelBtn delUrl="/channel/deleteOne" :delId="scope.row.id" :delOk="readyAjax"></baseDelBtn>-->
                                <!--<el-button type="text" size="small" @click="delAction(scope.row.id)">删除</el-button>-->
                                <el-button type="text" size="small" @click="showDialog(scope.row)">会员详情</el-button>
                                <!--<el-button type="text" size="small" @click="$router.push(`/channel/channel_orderList/${scope.row.id}`)">订单详情</el-button>-->
                                <!--<el-button type="text" size="small">查看日统计</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="block pagiWrap">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <!--<el-dialog-->
                    <!--:title="isAdd?'添加':'编辑'"-->
                    <!--:visible.sync="addDialogVisible"-->
                    <!--width="600px"-->
                    <!--:before-close="handleClose">-->
                <!--<div>-->
                    <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
                        <!--<el-form-item label="账号" prop="loginName">-->
                            <!--<el-input v-model="ruleForm.loginName"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="密码" prop="password">-->
                            <!--<el-input v-model="ruleForm.password"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                <!--</div>-->
                <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="addDialogVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>-->
              <!--</span>-->
            <!--</el-dialog>-->


            <div id="myChart" style="height: 300px;"></div>

            <!--会员详情弹窗-->
            <el-dialog
            :title="`会员详情/${actionRow.name}`"
            :visible.sync="dialogVisible"
            width="50%"
            style="height: 100%;"
            @opened="dialogOpened"
            ref="memberDialog"
            class="animated  slideInRight memberDialog"
            :close-on-press-escape="true"
            :before-close="handleClose">
            <div>
                <el-table
                        :data="tableDataMember"
                        border
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        class="cardTable"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="gmtDatetime"
                            label="申请日期"
                            :show-overflow-tooltip="true"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="身份状态" :formatter="forStatus">
                    </el-table-column>
                    <el-table-column
                            prop="authScore"
                            label="认证分数">
                    </el-table-column>
                </el-table>

                <div class="block pagiWrap" style="margin-top: 20px">
                    <el-pagination
                            @size-change="handleSizeChangeMember"
                            @current-change="handleCurrentChangeMember"
                            :current-page="currentPageMember"
                            class="memberPagi"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSizeMember"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalMember">
                    </el-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <!--<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>-->
            </span>
            </el-dialog>




        </el-card>

    </div>
</template>

<script>
    import baseDelBtn from "@/components/baseDelBtn";
    // import animate from "animate.css";
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: "channelList",
        data() {
        return {
          name: "",
          tableForm:{
              loginName:""
          },
          loading:false,
          tableData: [],
          addDialogVisible: false,
          isAdd: false,
          ruleForm: {},
          rules: {
            loginName: [
              { required: true, message: "请输入账号", trigger: "blur" }
            ],
            password: [
              { required: true, message: "请输入密码", trigger: "blur" }
            ],
          },

            // 渠道商列表分页
            currentPage:1,
            pageSize:10,
            peopleCountNum:0,
            total:0,


            // dialog控制
            dialogVisible:false,


            // 当前使用行数据
            actionRow:{},


            //渠道商会员分页
            pageSizeMember:10,
            currentPageMember:1,
            totalMember:0,

            tableDataMember:[]
        };
      },
      mounted() {
          this.getList();
          this.drawLine();
      },
        components:{
            baseDelBtn
        },
        watch:{
          "tableForm.loginName":function (n) {
              if(!n){
                  this.readyAjax()
              }
          }
        },
      methods: {
          showDialog(row){
              this.actionRow={...row};
              this.dialogVisible=true;
              this.getMenberList()
          },
          getMenberList(){
              this.$api.channel.channelList_memberList({
                      pageNo:this.currentPageMember,
                      pageSize:this.pageSizeMember,
                      channelId:this.actionRow.id,
                      phone:"",
                      userName:""
                  }
              ).then((res)=>{
                  this.tableDataMember=res.data.list;
                  this.totalMember=res.data.total;
              })
          },
        // addDialogShow(isAdd, row) {
        //   this.isAdd = isAdd;
        //   if (!isAdd) {
        //     this.ruleForm = Object.assign({}, row);
        //   }
        //   this.addDialogVisible=true;
        // },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        handleClose(){
          console.log("close")
        },
          getList(){
            this.$api.channel.channelList_getList({
                pageNo:this.currentPage,
                pageSize:this.pageSize,
                ...this.tableForm
            }
            ).then((res)=>{
                this.tableData=res.data.records;
                this.peopleCountNum=res.data.total;
                this.total=res.data.total;
            })
          },
          readyAjax(){
            this.currentPage=1;
            this.pageSize=10;
            this.getList()
          },
          handleCurrentChange(val){
            this.currentPage=val;
            this.getList();
          },
          handleSizeChange(val){
            this.pageSize=val;
            this.getList();
          },
          handleSizeChangeMember(val){
              this.pageSizeMember=val;
              this.getMenberList()
          },
          handleCurrentChangeMember(val){
              this.currentPageMember=val;
              this.getMenberList()
          },
          forStatus(row){
              switch(row.status){
                  case 1:return "正常";break;
                  case 2:return "黑名单";break;
                  case 3:return "禁用";break;
                  default:return "未知"
              }
          },
          drawLine() {
              // 基于准备好的dom，初始化echarts实例
              let myChart = this.$echarts.init(document.getElementById('myChart'))
              // 绘制图表
              myChart.setOption({
                  title: {text: '在Vue中使用echarts'},
                  tooltip: {},
                  xAxis: {
                      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                  },
                  yAxis: {},
                  series: [{
                      name: '销量',
                      type: 'bar',
                      data: [5, 20, 36, 10, 10, 20]
                  }]
              });
          },
          dialogOpened(){
                this.$refs.memberDialog.querySelectorAll(".el-dialog").style.left='50%'
          }
      },
      created() {},
      destoryed() {}
};
</script>

<style  lang="less">
    .peopleCount{
        line-height: 32px;
        font-size: 14px;
        .peopleCountNum{
            color:red
        }
    }
    .el-dialog__title{
        font-weight: bold;
        font-size: 14px;
    }
    @keyframes dialog-fade-in {
        0% {
            transform: translate3d(100%, 0, 0);
            opacity: 0;
        }
        100% {
            transform: translate3d(50%, 0, 0);
            opacity: 1;
        }
    }

    @keyframes dialog-fade-out {
        0% {
            transform: translate3d(50%, 0, 0);
            opacity: 1;
        }
        100% {
            transform: translate3d(100%,0, 0);
            opacity: 0;
        }
    }
    .memberDialog{
        /*margin:0 25%;*/
        overflow: hidden;
        .el-dialog{
            height: calc( 100% - 71px);
            margin: 0!important;
            z-index:1000000;
            /*left: 50%;*/
            /*margin: 0 50%!important;*/
            /*transition: all 10s;*/
            margin-top: 71px!important;
        }
    }
</style>
