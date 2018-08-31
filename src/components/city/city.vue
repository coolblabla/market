<template>
  <div class="continue">

    <search>
      <div class="address">
          <router-link to="/local">
            <i></i>
             <span>{{someCity.name.length <= 3? someCity.name : someCity.name.substr(0,3)+ '...'}}</span>
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
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for="(item,key) in banner" :key="key">
                <a :href="item.vUrl" >
                  <img :src="item.vImgUrl" alt="" width="100%" height="100%"/>
                </a>
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="bannerTab">
            <mt-swipe :auto="5000">
              <mt-swipe-item class="tabSlider" v-for="(item, key) in tabList" :key="key">
                <ul>
                  <li v-for="(slider,index) in item" :key="index" >
                    <router-link :to="{name:'tab'+(index+1),params:{tabId:index+1,id:slider.id}}">
                      <i :class="'tabIcon'+slider.id"></i>
                      <p>{{slider.id}}{{slider.typeName}}</p>
                    </router-link>
                  </li>
                </ul>
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
        <!--借贷精选-->
        <proGood>
          <div class="head" slot="head">
            <list-title :title="'借贷精选'" :more="true" :skip="'tab0'" :routerparams = routerparams></list-title>
          </div>
          <div class="proGood_list" slot="main">
            <div class="proGoodContainer">
            <mt-swipe :auto="5000">
              <mt-swipe-item class="goodSlider" v-for="(item, key) in goodProList" :key="key">
                <ul>
                  <li v-for="(slider,key2) in item" :key="key2">
                    <router-link :to="{name:'applyPage',params:{name:slider.proName,id:slider.proId}}">
                      <img :src="slider.proIcon" />
                      <p>{{slider.proName}}</p>
                    </router-link>
                  </li>
                </ul>
              </mt-swipe-item>
            </mt-swipe>
            </div>
            <!--<swiper :flag="'proGoodSwiper'" :autoplay="3000" :dom="'proGoodContainer'" :pagination="'proGood-pagination'" ref="proGood">-->
              <!--<div  slot="slider" class="swiper-slide goodSlider" v-for="(item, key) in goodProList" :key="key">-->
                <!--<ul>-->
                  <!--<li v-for="(slider,key2) in item" :key="key2">-->
                    <!--<router-link :to="{name:'applyPage',params:{name:slider.proName,id:slider.proId}}">-->
                      <!--<img :src="slider.proIcon" />-->
                      <!--<p>{{slider.proName}}</p>-->
                    <!--</router-link>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
              <!--<div slot="pagination" class="proGood-pagination" id="proGood-pagination"></div>-->
            <!--</swiper>-->


          </div>
        </proGood>
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
    <!--<div class="cover" v-if="cover"></div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import search from '../common/search.vue'
  import listTitle from '../common/listTitle.vue'
  import proGood from '../common/proGood.vue'
  import hot from '../common/hot.vue'
  import {banner,hotProduct,selectProduct} from '../../api/api'
  import {ProductTypes} from '../../api/cityApi'
  import {initScroll,initAxios,swiperConfig,excision,responseScroll} from '../../common/js/fun'
  import {bus} from '../../common/js/bus'
  import {params,someCity} from '../../api/config'
  export default {
    data(){
      return {
        /*刷新和加载跟多一些数据*/
        topTip:'下拉刷新',
        bottomTip:'查看更多',
        bottomTipJudge:false,
        refreshAlert:false,
        page :1,
        someCity,
        banner:[],  //轮播图
        tabList:[],
        goodProList:[],  //产品精选
        recommends:[],
        cityName:bus.city,
        routerparams:{
          tabId:0,
        },
        slider:{
          banner:'bannerSwiper'
        },
        cover:true
      }
    },
    created(){
      this.$router.typeId = 2; //区分 同城 和 线上
      this.initBanner();
      this.initProType();
      this.initGoodPro();
      this.$nextTick(() =>{
        initScroll(this,hotProduct,this.$refs.productWrap,{page:this.page,isLine:2});
      });

    },
    methods:{
      initBanner(){
        initAxios(banner,{state:2},(res) =>{  //banner 轮播图
          this.banner = res.list;
        });
      },
      initProType(){
        /*tab  type  借款类型*/
        initAxios(ProductTypes,{typeId:2},(res) =>{ //产品精选  这里要城市code
          this.tabList = excision(res.list,5);
        });
      },
      initGoodPro(){
        initAxios(selectProduct,{isLine:2,adminCode:someCity.adcode},(res) =>{ //产品精选  这里要城市code
          this.goodProList = excision(res.list,4);
        });
      }
    },
    mounted(){
       bus.$on('address',(res) =>{
        this.cityName = res;
        this.cover = false;
      });
      bus.$on('refreshcity',res=>{
        if (this.scroll){
          this.scroll.destroy();
          this.$nextTick(() =>{
            initScroll(this,hotProduct,this.$refs.productWrap,{page:this.page,isLine:2});
          });
        }
      });
    },
    components:{search,listTitle,hot,proGood}
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
        height 200px
        a
          height @height
      .bannerTab
        width 100%
        height 213px
        .tabSlider
          padding 22px 20px 0 20px
          box-sizing border-box
          ul
            display flex
            justify-content space-between
            margin auto
            li
              margin auto
              a
                display block
                width 100%
                height 100%
                text-align center
                i
                  display block
                  width 90px
                  height 90px
                  margin 0 auto
                  margin-bottom 12px
                .tabIcon9
                  $bg-image('./img/ic-tcd-cd')
                  $bg-size(100%,100%)
                .tabIcon10
                  $bg-image('./img/ic-tcd-fd')
                  $bg-size(100%,100%)
                .tabIcon11
                  $bg-image('./img/ic-tcd-bdd')
                  $bg-size(100%,100%)
                .tabIcon12
                  $bg-image('./img/ic-tcd-zjd')
                  $bg-size(100%,100%)
                .tabIcon13
                  $bg-image('./img/ic-tcd-lsd')
                  $bg-size(100%,100%)
                .tabIcon14
                  $bg-image('./img/ic-tcd-qyd')
                  $bg-size(100%,100%)
                p
                  font-size $font-size-24
                  color $color-black
    .hot
      background-color #ffffff
      .head
        padding-left 40px
      .list
        padding-left 40px
    .cover
      position absolute
      z-index 99
      width 100%
      height 100%
      left 0
      top 0
      background-color rgba(199,199,199,.8)
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
  #banner-pagination,#proGood-pagination,#tab-pagination
    position: absolute
    z-index 9
    text-align center
    span
      width 30px
      height 6px
      border-radius 6px
      background-color #ffffff

</style>

