<template>
<div>
  <div class="assetMager">
    <div class="top">
      资产管理
    </div>
    <div class="middle">
      <!-- 筛选条件 -->
      <div class=" flex mb-10">
        <el-input class="mr-10" style="width:200px" v-model="formItem.name" size="small" placeholder="资产名称"></el-input>
        <el-input class="mr-10" style="width:200px" v-model="formItem.IP" size="small" placeholder="资产IP"></el-input>
        <el-input class="mr-10" style="width:200px" v-model="formItem.type" size="small" placeholder="资产类型"></el-input>
        <el-input class="mr-10" style="width:200px" v-model="formItem.time" type="dateTime" size="small" placeholder="更新时间"></el-input>
        <el-button class="mr-10" icon="el-icon-search" size="small" type="primary" @click="query">查询</el-button>
        <el-button class="mr-10" icon="el-icon-refresh-left" size="small" @click="reset('formItem')">重置</el-button>
      </div>
      <!-- 按钮 -->
      <div class="flex mb-10 btnAsset">
        <el-button icon="el-icon-plus" size="small" type="primary">新增资产</el-button>
        <el-button icon="el-icon-download" size="small">导入资产信息</el-button>
        <el-button icon="el-icon-upload2" size="small">导出资产信息</el-button>
        <el-button icon="el-icon-upload2" size="small">导出数据</el-button>
        <el-popover v-model="visible" title="显示的列" placement="left" width="369" :visible-arrow="false" @show="show" @hide="hide">
          <div>
            <div>
              <el-checkbox v-model="checked">选择全部</el-checkbox>
              <el-button type="primary" plain round size="mini" style="margin:3px 0 12px 12px" @click="show">恢复默认</el-button>
            </div>
            <div>
              <span v-for="(item,index) in tableHeadChoose" :key="item.prop" class="chooseColoum" :style="item.flag?'color:#fff;backgroundColor:#2dab79':'color:#666;backgroundColor:#d7d7d7'" @click="choose(index)">{{item.label}}</span>
            </div>
          </div>
          
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="hide">取消</el-button>
            <el-button type="primary" size="mini" @click="ok">确定</el-button>
          </div>
            <div slot="reference" class="right">
                <span class="icon iconfont icon-xiangmuleixing"></span>
                <button class="ml-3 lie">配置显示列</button>
            </div>
        </el-popover>
      </div>
      <!-- 表格 -->
      <el-table class="mb-10 table_assetmanager" :data="tableData" element-loading-text="Loading" border
				highlight-current-row  :max-height="$store.state.clientHeight">
        <el-table-column type="index" min-width="55" label="序号" fixed align="center"></el-table-column>
        <el-table-column align="center" v-for="item in tableHead" :key="item.prop" :label="item.label" :prop="item.prop" :min-width="item.width"></el-table-column>
        <el-table-column align="center" label="操作" min-width="214" fixed="right">
					<template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" size="small">编辑</el-button>
            <el-button type="success" plain icon="el-icon-message" size="small">详情</el-button>
            <el-button type="danger" plain icon="el-icon-delete" size="small">删除</el-button>
					</template>
				</el-table-column>
      </el-table>
      <Page :page="page" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
    </div>
  </div>
</div>
</template>

<script>
import {calcColumnsWidth} from '../../utils/getWidth.js'
import Page from '../../components/pagination.vue'
import {deaTimeToday} from '@/utils/time.js'
import * as datas from '../../api/datas.js'
export default {
  components: { Page },
  data() {
    return {
      formItem: {
        name: '',
        IP: '',
        type: '',
        time: deaTimeToday()
      },
      tableHeadChoose: [],
      tableHead: [],
      tableData: [],
      page: {
        total: 1,
        page: 1,
        limit: 10
      },
      visible: false,
      checked: false
    }
  },
  watch: {
    tableData(val) {
      // 列表数据换了之后，计算每列最大宽度
      if(val.length > 0){
        const columns = calcColumnsWidth(this.tableHead, val);
        this.tableHead = JSON.parse(JSON.stringify(columns));
      }
    },
    checked(val) {
      if(val) {
        this.tableHeadChoose.forEach(item=>item.flag = true)
      } else {
        this.tableHeadChoose.forEach(item=>item.flag = false)
      }
    }
  },
  methods: {
    edit() {

    },
    dele() {

    },
    query() {
      this.page.page = 1;
      this.getData();
      this.getTableHeadAll();
    },
    getTableHeadAll() {
      datas.getData().then(res=>{
        this.tableHeadChoose = res.tableHead;
      })
    },
    getData() {
        const obj = {
          ...this.page,
          ...this.formItem
        }
        console.log('请求的参数',obj);
        datas.getData(obj).then(res=>{
          console.log('请求的结果',res);
          this.tableHead = res.tableHead;
          this.tableData = res.data.records;
          this.page.total = res.data.total;
          this.$message.success('请求成功');
        })
        // 获取模拟的数据
        

    },
    reset(form) {
      Object.assign(this[form],this.$options.data()[form]);
      this.query();
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.page.page = 1;
      this.getData();
    },
    show() {
      // 暂未知是否会出现对象改变，无法渲染的问题
      this.tableHeadChoose.forEach(item=>{
        item.flag = this.tableHead.some(item2=> {
          return item.prop===item2.prop
        });
      })
      // 判断是否全选
      this.checked = this.tableHeadChoose.length===this.tableHead.length?true:false;
      // this.tableHeadChoose = JSON.parse(JSON.stringify(this.tableHeadChoose));
    },
    hide() {
      this.visible = false;
    },
    ok() {
      this.visible = false;
      this.tableHead = this.tableHeadChoose.filter(item=>item.flag);
    },
    choose(index) {
      this.tableHeadChoose[index].flag = !this.tableHeadChoose[index].flag;
    },
    init() {

      // 获取数据
      this.query();
    }
  },
  created() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.assetMager {
  margin: 10px 10px 0 10px;
  box-shadow: 0 0 5px rgba(0,0,0,.1);
  background-color: #fff;
  border-radius: 10px;
  .top {
    width: 100%;
    background-color: #f9f9f9;
    border-radius: 10px 10px 0 0;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #e9e9e9;
  }
  .middle {
    padding: 22px 17px 5px 29px;
  }
  .btnAsset {
    position: relative;
    .right {
      position: absolute;
      right: 30px;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      .icon {
        border-radius: 14px;
        background-color: #2b85e4;
        color: #fff;
      }
      .lie {
        display: inline-block;
        color: #333;
        background: none;
        border: none;
        cursor: pointer;
      }
    }
    
  }
}
</style>

<style lang="scss">
.table_assetmanager {
  .el-button--small {
    padding: 6px 5px;
  }
}
.el-popover {
  .chooseColoum {
      display: inline-block;
      background-color: #2dab79;
      color: #fff;
      padding: 4px 5px;
      margin: 0 11px 10px 0;
      cursor: pointer;
    }
}
</style>