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
        <el-button class="mr-10" icon="icon iconfont icon-sousuo" size="small" type="primary" @click="query">查询</el-button>
        <el-button class="mr-10" icon="icon iconfont icon-zhongzhi" size="small">重置</el-button>
      </div>
      <!-- 按钮 -->
      <div class="flex mb-10 btnAsset">
        <el-button icon="icon iconfont icon-jia" size="small" type="primary">新增资产</el-button>
        <el-button icon="icon iconfont icon-daoru" size="small">导入资产信息</el-button>
        <el-button icon="icon iconfont icon-daochu1" size="small">导出资产信息</el-button>
        <el-button icon="icon iconfont icon-daochu1" size="small">导出数据</el-button>
        <div class="right">
          <span class="icon iconfont icon-xiangmuleixing"></span>
          <div class="ml-3 lie">配置显示列</div>
        </div>
      </div>
      <!-- 表格 -->
      <el-table class="mb-10" :data="tableData" element-loading-text="Loading" border
				highlight-current-row  :max-height="$store.state.clientHeight">
        <el-table-column type="index" min-width="55" label="序号" fixed align="center"></el-table-column>
        <el-table-column align="center" v-for="item in tableHead" :key="item.prop" :label="item.label" :prop="item.prop" :min-width="item.width"></el-table-column>
        <el-table-column align="center" label="操作" min-width="120" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit('点击打开编辑',scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="edit('点击打开编辑',scope.row)">详情</el-button>
						<el-button type="text" size="small" @click="dele('点击打开删除',scope.row)">删除</el-button>
					</template>
				</el-table-column>
      </el-table>
      <Page :page="page"/>
    </div>
  </div>
</div>
</template>

<script>
import {calcColumnsWidth} from '../../utils/getWidth.js'
import Page from '../../components/pagination.vue'
export default {
  components: { Page },
  data() {
    return {
      formItem: {
        name: '',
        IP: '',
        type: '',
        time: '2022-08-01'
      },
      tableHead: [
        {
          label: '资产名称',
          prop: 'c1'
        },{
          label: '资产状态',
          prop: 'c2'
        },{
          label: '资产类型',
          prop: 'c3'
        },{
          label: '资产版本',
          prop: 'c4'
        },{
          label: '所属业务系统',
          prop: 'c5'
        },{
          label: 'IP',
          prop: 'c6'
        },{
          label: '端口',
          prop: 'c7'
        },{
          label: '服务名',
          prop: 'c8'
        },{
          label: '资产描述',
          prop: 'c9'
        },{
          label: '添加人员',
          prop: 'c10'
        },{
          label: '更新时间',
          prop: 'c11'
        },
      ],
      tableData: [],
      page: {
        total: 1,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    tableData(val) {
      // 列表数据换了之后，计算每列最大宽度
      if(val.length > 0){
        const columns = calcColumnsWidth(this.tableHead, val);
        this.tableHead = JSON.parse(JSON.stringify(columns));
      }
    }
  },
  methods: {
    edit() {

    },
    dele() {

    },
    query() {
      this.tableData = [
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' },
        ]
    }
  },
  created() {
    this.query();
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
      }
    }
  }
}
</style>
