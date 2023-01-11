<template>
<div class="box mr-20 f14" :style="'borderColor:'+color[index]">
  <div class="title">总资产数</div>
  <div class="hang2">
    <span class="count f24 f700">1200</span>
    <span class="ge ml-5">个</span>
  </div>
  <div class="hang3">
    <span class="zi floatl">资产总量</span>
    <div class="shu floatl f16 f700 ml-5">3.00MB</div>
  </div>
  <canvas class="minganImg" :id="'c'+index" width="80" height="80">当前浏览器不支持canvas，请下载最新版</canvas>
  <div class="minganImg2">
  80%
  </div>
  <!-- <div class="minganImg" :style="'backgroundColor:'+color[index]">
  </div> -->
</div>
</template>

<script>
export default {
props:['data','index'],
data() {
  return {
    color: ['#f86768','#3fa8fe','#8167f5','#51d351','#ffa94c']
  }
},
watch: {
  index() {
    
  }
},
mounted() {
  let canvas = document.querySelector("#c"+this.index)
  let ctx = canvas.getContext("2d") //Context 上下文，canvas的2D渲染
  ctx.beginPath();
  let deg=Math.PI/180
  ctx.fillStyle = this.color[this.index]
  let n = 0.8*360;
  ctx.arc(40,40,40,270*deg,(270+n)*deg)//以45度开始
  ctx.lineTo(40,40)
  ctx.fill()
}
}
</script>

<style lang="scss" scoped>
.box {
  float: left;
  width: 296px;
  height: 131px;
  margin-top: 9px;
  border-left: 5px solid transparent;
  background-color: #fff;
  position: relative;
  .title {
    position: absolute;
    top: 16px;
    left: 25px;
  }
  .hang2 {
    position: absolute;
    top: 42px;
    left: 25px;
  }
  .hang3 {
    position: absolute;
    top: 90px;
    left: 25px;
  }
  .minganImg {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 27px;
    right: 19px;
  }
  .minganImg2 {
    position: absolute;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    width: 60px;
    height: 60px;
    border-radius: 40px;
    top: 37px;
    right: 29px;
    background-color: #0a213d;
  }
}
</style>
