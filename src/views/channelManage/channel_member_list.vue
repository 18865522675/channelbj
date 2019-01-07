<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>会员列表</span>
            </div>
            <div class="cardBody">
                <div class="cardBodyHeader">
                    <div class="cardHeader-searchInp flex-r" style="justify-content: space-between">
                        <div>
                            <el-input placeholder="请输入电话号码" v-model="tableForm.phone" class="searchInpBody " style="width: 250px">
                            </el-input>
                            <el-input  placeholder="请输入姓名" v-model="tableForm.userName" class="searchInpBody marL10"  style="width: 250px">
                            </el-input>
                            <el-button  class="marL10 searchBtn"  icon="el-icon-search" @click="readyAjax" > </el-button>
                        </div>
                        <el-button icon="el-icon-back" class="backBtn"  @click="$router.go(-1)">
                            返回
                        </el-button>
                    </div>
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


            <!--<el-dialog-->
                    <!--:title="isAdd?'添加':'编辑'"-->
                    <!--:visible.sync="addDialogVisible"-->
                    <!--width="30%"-->
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
        </el-card>

    </div>
</template>

<script>
  export default {
    name: "channelList",
    data() {
      return {
        name: "",
          tableForm:{
              phone:"",
              userName:""
          },
        loading:false,
        tableData: [
        ],
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
          currentPage:1,
          pageSize:10,
          total:0
      };
    },
    mounted() {
        this.getList()
    },
      watch:{
          "tableForm.phone":function (n) {
              if(!n){
                  this.readyAjax()
              }
          },
          "tableForm.userName":function (n) {
              if(!n){
                  this.readyAjax()
              }
          }
      },
    methods: {
      addDialogShow(isAdd, row) {
        this.isAdd = isAdd;
        if (!isAdd) {
          this.ruleForm = Object.assign({}, row);
        }
        this.addDialogVisible=true;
      },
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
      delAction(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
        getList(){
            this.$api.channel.channelList_memberList({
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    channelId:this.$route.params.channelId,
                    ...this.tableForm
                }
            ).then((res)=>{
                this.tableData=res.data.list;
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
        forStatus(row){
          switch(row.status){
              case 1:return "正常";break;
              case 2:return "黑名单";break;
              case 3:return "禁用";break;
              default:return "未知"
          }
        }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .backBtn{
        padding: 0 10px;
        font-size: 12px;
    }
</style>
