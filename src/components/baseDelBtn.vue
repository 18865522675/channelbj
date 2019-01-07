<template>
  <div style="display: inline-block;margin-left:10px" class="delBtnWrap">
     <el-button type="text"  size="small"   class="baseModifyBtn" @click="showDelDialog" :disabled="disabled">删除</el-button>
  </div>

</template>

<script>
import { $ } from "@/api/axios";
export default {
  data() {
    return {
      disable: false
    };
  },

  props: {
    delUrl: {
      type: String,
      required: true
    },
    delId: {
      required: true,
      type: Number
    },
    delOk: {},
    disabled: {
      required: false,
      default: false
    }
  },
  methods: {
    showDelDialog() {
      this.$alert("确定要删除此数据嘛", "删除", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
          distinguishCancelAndClose: false,
        // cancelButtonText: "取消",
        callback: action => {
          if (action == "confirm") {
            $.get(`${this.delUrl}`,{id:this.delId}).then(() => {
              this.$message.success("删除成功");
              this.delOk && this.delOk();
            });
          }
          if(action == 'cancel'){
              this.$message.info("已取消删除操作")
          }
        }
      });
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="less">
.delBtnWrap {
    padding: 0 10px;
}
</style>
