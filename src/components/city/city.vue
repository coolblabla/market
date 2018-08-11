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
  import {banner} from '../../api/api'
 // import {getCity} from '../../common/js/fun'
  export default {
    data(){
      return {
        bannerList:[{}],
        cityName:'台州市',
        routerparams:{
          tabId:0,
        }
      }
    },
    created(){
      this._getRecommend();
      this._initBanner();
      this.$router.typeId = 2; //区分 同城 和 线上
      this.$router.isLine = 2;//区分 同城 和 线上
    },
    mounted(){
      this._initProdutScroll();
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
      _initProdutScroll(){
        if(!this.proScroll){
          this.proScroll = new BScroll(this.$refs.productWrap, {
            click: true,
          });
        }else {
          this.proScroll.refresh()
        }
      },
      _getRecommend() {
        this.recommends =  [
          {
            "linkUrl": "https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=700567",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003kGTF00E6oXe.jpg",
            "id": 15055,
            "name":"老张有钱,",
            "min":"1000",
            "max":"20000",
            list:['身份证','一次还清','新上线1']
          },
          {
            "linkUrl": "https://y.qq.com/msa/319/5_5136.html",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M0000008Xxwd1417y8.jpg",
            "id": 15068,
            "name":"我曾经很有钱,只是用完了",
            "min":"1000",
            "max":"8000",
            list:['身份证','一次还清','新上线2']
          },
          {
            "linkUrl": "https://y.qq.com/msa/324/0_5137.html",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002ab5of4Z6qH0.jpg",
            "id": 14616,
            "name":"喝喝",
            "min":"1000",
            "max":"5000",
            list:['身份证','一次还清','新上线3']
          }
        ]
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
</style>
