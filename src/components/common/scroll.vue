<template>
    <div class="scroll" ref="scroll">
      <div>
        <div class="top-tip">
          <span class="refresh-hook">{{topTip}}</span>
        </div>
        <div class="refreshAlert" v-show="refreshAlert"><p>刷新成功!</p></div>
        <slot></slot>
        <div class="bottom-tip" v-show="bottomTipJudge">
          <span class="loading-hook">{{bottomTip}}</span>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'better-scroll'
  import {bus} from '../../common/js/bus'
  export default {
    data(){
      return {
        topTip:'下拉刷新',
        bottomTip:'查看更多',
        bottomTipJudge:false,
        refreshAlert:false,
        page:1,
      }
    },
    mounted(){
      console.log(this.$parent)
      console.log(this.$parent.$el)
      this.initScroll();
      bus.$on('no-data',r=>{
        this.bottomTip = '无更多产品'
      });
      bus.$on('refresh-data',r=>{
        this.bottomTip = '查看更多'
      });
    },
    methods:{
      refresh(){
        this.scroll.refresh();
      },
      initScroll(){
        const that = this;
        this.scroll = new Scroll(this.$parent.$el, {
          probeType: 1,
          click:true
        });
        // 滑动中
        this.scroll.on('scroll',  (position) =>{
          if(position.y > 25) {
            this.topTip = '释放立即刷新';
          }
        });
        this.scroll.on('touchEnd', function (position){
          if (position.y > 25) {
            that.disable();
            let times = null;
            times = setTimeout( ()=> {     //上啦刷新的时候
              that.$emit('touchtop');
              that.topTip = '下拉刷新';  // 恢复文本值
              // 刷新成功后的提示
              that.hint();
              clearTimeout(times);
              times = null;
              that.enable();
              that.scroll.refresh(); // 刷新列表后,重新计算滚动区域高度
            }, 1000);
          }else if(position.y < (this.maxScrollY - 25)) {   ////下拉 加载更多
            that.bottomTip = '加载中...';
            that.disable();
            let times = null;
            times = setTimeout( () =>{
              that.$emit('touchbottom');
              clearTimeout(times);
              times = null;
              that.enable();
              that.scroll.refresh(); // 加载更多后,重新计算滚动区域高度
            }, 1000);
          }

        })
      },
      hint(){
        this.refreshAlert =true;
        let times = setTimeout(() =>{
          this.refreshAlert = false;
          clearTimeout(times);
          times = null;
        },2000)
      },
      disable(){
        this.scroll && this.scroll.disable()
      },
      enable(){
        this.scroll && this.scroll.enable()
      }
    },
  //  components:{orderList}
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/proList.styl"
</style>
