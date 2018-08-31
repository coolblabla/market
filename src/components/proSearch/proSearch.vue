<template>
  <div>
    <search :backW="true" :showSearch="showSearch"  :toggleInput ='false' :place="'你需要什么?我来满足你'">
      <i class="back" @click="goBack"></i>
    </search>
    <div class="hot">
      <h4>热门搜索</h4>
      <ul class="hotList">
        <li v-for="(item,index) in hotInfo">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="searchContent" ref="searchContent">
      <div>
        <div class="top-tip">
          <span class="refresh-hook">{{topTip}}</span>
        </div>
        <div class="refreshAlert" v-show="refreshAlert"><p>刷新成功!</p></div>
        <loan-list :arr="recommends"></loan-list>
        <div class="bottom-tip" v-show="bottomTipJudge">
          <span class="loading-hook">{{bottomTip}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import search from '../common/search.vue'
  import {bus} from '../../common/js/bus'
  import {initScroll} from '../../common/js/fun'
  import {searchPro} from '../../api/cityApi'
  import loanList from '../common/loanList.vue'
  export default {
    data(){
      return {
        topTip:'下拉刷新',
        bottomTip:'查看更多',
        bottomTipJudge:false,
        refreshAlert:false,
        titleName:'',
        page:1,
        recommends:[],
        test:'',
        showSearch:true,
        hotInfo:['等额本息','等本本息'],
        name:''
      }
    },
    created(){
      this.par = {page:this.page,isLine:this.$router.typeId,name:this.name};
      this.$nextTick(() =>{
        initScroll(this,searchPro,this.$refs.searchContent,this.par);  //跟多产品
      });
    },
    mounted(){
      bus.$on('search-result',(data) =>{
          this.par.name = data.name;
          searchPro({isLine: this.$router.typeId, page: 1, name: data.name}).then(res => {
            if (res.data.retcode == 1000) {
              this.recommends = res.data.data.list;
              if ( this.recommends.length == 0){
                  this.bottomTip = '找不到产品'
              }else {
                this.bottomTip = '查看更多';
                this.bottomTipJudge = true;
              }
              this.scroll.refresh();
            } else {
              alert(res.data.retmsg);
            }
        });
      })

    },
    methods:{
      goBack(){
        window.history.length > 1?  history.go(-1) : this.$router.push('/')
      }
    },
    components:{search,loanList}
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/proList.styl"
  .hot
    height 180px
    padding 0 37px 36px 37px
    box-sizing border-box
    h4
      width 100%
      height 89px
      line-height 89px
      font-size $font-size-26
      color $color-h
    .hotList
      display flex
      li
        width 180px
        height 64px
        line-height 64px
        text-align center
        background-color #ffffff
        border-radius 10px
        color $color-black
        margin-right 10px
  .searchContent
    position absolute
    top (88+180)px
    left 0
    right 0
    bottom 0
    overflow hidden
  .back
    display block
    width 38px
    height 35px
    margin 0 auto
    $bg-size(100%,100%)
    $bg-image('../common/img/ic-back-white')
  .top-tip
    position absolute
    top -60px
    left 0
    right 0
  .refreshAlert
    top 0
</style>
