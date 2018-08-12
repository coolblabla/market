<template>
  <div class="continue">

    <search>
      <div class="address">
          <router-link to="/local">
            <i></i>
             <span>{{cityName}}</span>
          </router-link>
      </div>
    </search>
    <div class="productWrap" ref="productWrap">
      <div>
        <div class="top-tip">
          <span class="refresh-hook">{{topTip}}</span>
        </div>
        <div class="refreshAlert" v-show="refreshAlert"><p>刷新成功!</p></div>
        <div class="bannerWrap">
          <div class="banner">
            <scroll ref="scroll" class="recommend-content">
              <div>
                <div class="slider-wrapper">
                  <slider ref="isSliderX">
                    <div v-for="(item, index) in bannerList" :key="index">
                      <a :href="item.vUrl">
                        <img :src="item.vImgUrl" width="100%" height="100%">
                      </a>
                    </div>
                  </slider>
                </div>
              </div>
            </scroll>
          </div>
          <div class="bannerTab">

          </div>
        </div>
        <!--借贷精选-->
        <div class="proGood">
          <div class="head">
            <list-title :title="'借贷精选'" :more="true" :skip="'tab0'" :routerparams = routerparams></list-title>
          </div>
          <div class="proGood_list">

          </div>
        </div>
        <!-- 热门推荐 -->
        <div class="hot">
          <div class="head">
            <list-title :title="'热门推荐'"></list-title>
          </div>
          <div class="list">
            <hot :arr="recommends"></hot>
          </div>
        </div>
        <div class="bottom-tip" v-show="bottomTipJudge">
          <span class="loading-hook">{{bottomTip}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import scroll from '../common/scroll.vue'
  import slider from '../common/slider.vue'
  import search from '../common/search.vue'
  import listTitle from '../common/listTitle.vue'
  import hot from '../common/hot.vue'
  import {banner,hotProduct} from '../../api/api'
  import {initScroll} from '../../common/js/fun'
  export default {
    data(){
      return {
        /*刷新和加载跟多一些数据*/
        topTip:'下拉刷新',
        bottomTip:'查看更多',
        bottomTipJudge:false,
        refreshAlert:false,
        page :1,

        bannerList:[{}],
        recommends:[],
        cityName:'台州市',
        routerparams:{
          tabId:0,
        }
      }
    },
    created(){
      this._initBanner();
      this.$router.typeId = 2; //区分 同城 和 线上
      this.$nextTick(() =>{
        initScroll(this,hotProduct,this.$refs.productWrap,{page:this.page,isLine:2});
      });
    //  this.$router.isLine = 2;//区分 同城 和 线上
    },
    mounted(){
      this.$root.$on('address',(res) =>{
        this.cityName = res;
      });
    },
    methods:{
      _initBanner(){  //轮播图
        banner().then((res) =>{
          if (res.data.retcode == 1000){
            this.bannerList = res.data.data.list;
            console.log(this.slider);
            this.$refs.isSliderX.launch();
          }else {
            alert(res.data.retmsg)
          }
        });
      },
    },
//    beforeRouteUpdate(to,from,next){
//      this.$refs.isSliderX._newInit();
//      next();
//      console.log('update')
//    },
    beforeRouteEnter(to,from,next){
      next((vm)=>{
        if (from.name){
          console.log('喝喝');
          vm.$refs.isSliderX.isNext = false;
          vm.$refs.isSliderX._newInit();
        }
      });
    },
    components:{search,scroll,slider,listTitle,hot}
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/proList.styl"
  .continue
    .bannerWrap
      background-color #ffffff
      padding-top 20px
      overflow hidden
      .banner
        a
          height 200px
      .bannerTab
        width 100%
        height 213px
        background-color red
    .proGood
      margin 30px 0
      background-color #ffffff
      .head
        padding-left 40px
      .proGood_list
        height 224px
        background-color red

    .hot
      background-color #ffffff
      .head
        padding-left 40px
      .list
        padding-left 40px
  .productWrap
    position absolute
    left 0
    right 0
    top 88px
    bottom 0
    overflow hidden
  .address
    display flex
    a
      height 44px
      margin auto
      color #ffffff
      font-size $font-size-28
      i
        display inline-block
        vertical-align middle
        width 44px
        height 44px
        $bg-image('./img/ic-addr')
        background-size 100% 100%
      span
        display inline-block
        vertical-align middle
  .top-tip
    position absolute
    top -60px
    text-align center
    left 50%
    transform translate(-50%)
  .refreshAlert
    top 0
</style>
