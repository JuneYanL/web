// 模拟表格数据
const tableHead1 = [
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
]

export const tableHead = function() {
  return tableHead1.map(item=>{
    return {
      ...item,
      flag: true
    }
  })
}()

const mockData = { c1: '测试数据库',c2:'正常',c3:'Oracle',c4:'11g',c5:'测试业务系统',c6:'192.168.101.234',c7:'8080',c8:'orcl',c9:'测试业务数据',c10:'张小刚',c11:'2020-11-25 23:26:08' };
function getCount() {
  return Math.round(Math.random()*10+1);
}

export const res = function() {
  const tableData = function() {
    let res = []
    const n = getCount();
    console.log(n);
    for(let i = 0;i<n;i++) {
      res.push(mockData);
    }
    return res;
  }()

  return {//数据结构
    code: 200,
    tableHead,
    data: {
      records: tableData,
      total: 100
    }
  }
}
// 模拟接口
export const getData = ()=>{
  return new Promise(function(resolve,reject) {
    setTimeout(()=>{
      // 模拟异步接口,不同的是，真实的接口返回的是对象，模拟的接口返回的是函数
      resolve(res())
    },0);
  })
}