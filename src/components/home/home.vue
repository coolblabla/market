<template>
  <scroll class="continue" ref="scroll" @touchtop="touchtop" @touchbottom="touchbottom">
    <div>
      <div class="bannerSlider">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, key) in banner" :key="key">
            <a :href="item.vUrl" >
              <img :src="item.vImgUrl" alt="" width="100%" height="100%"/>
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tab" :key="index"><router-link :to="{name:'type',params: { name: item.name,id:item.id,state:item.params }}"><i></i><span>{{item.name}}</span></router-link></li>
        </ul>
      </div>
      <!--贷款精品-->
      <proGood>
        <div class="head" slot="head">
          <list-title :title="'借贷精选'" :more="true" :skip="'tab0'" :routerparams = routerparams></list-title>
        </div>
        <div class="proGood_list" slot="main">
          <div class="proGoodContainer">
            <mt-swipe :auto="4000">
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
        </div>
      </proGood>
      <div class="hot">
        <div class="head">
          <list-title :title="'热门推荐'"></list-title>
        </div>
        <div class="list">
         <hot :arr="recommends"></hot>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import listTitle from '../common/listTitle.vue'
  import hot from '../common/hot.vue'
  import scroll from '../common/scroll.vue'
  import proGood from '../common/proGood.vue'
  import {bus} from '../../common/js/bus'
  import {banner,hotProduct,selectProduct} from '../../api/api'
  import {initScroll,initAxios,swiperConfig,excision,axiosScroll} from '../../common/js/fun'
export default {
  name: 'home',
  data () {
    return {
      /*刷新和加载跟多一些数据*/
      topTip:'下拉刷新',
      bottomTip:'查看更多',
      bottomTipJudge:false,
      refreshAlert:false,
      page :1,
      routerparams:{
        tabId:0,
      },

      goodProList:[],
      banner:[{}],
      recommends:[],  //热门 产品
      tab:[
        {id:1, route:'/type', params:{},name:'借款新口子'},
        {id:2, route:'/type', params:{state:1},name:'身份大额度'},
        {id:3, route:'/type', params:{state:2},name:'小额极速贷'},
        {id:4, route:'/type', params:{},name:'不上征信'},
        {id:5, route:'/type', params:{state:1},name:'芝麻分贷款'},
        {id:6, route:'/type', params:{state:2},name:'信用卡贷款'},
        {id:7, route:'/type', params:{state:3},name:'高通过率'},
        {id:8, route:'/type', params:{},name:'本周放款王'},
        {id:9, route:'/type', params:{},name:'7天贷'},
        {id:10,route:'/type', params:{state:4},name:'免息借钱'},
        ]
    }
  },
  created(){
    initAxios(banner,{state:1},(res) =>{  //banner 轮播图
      this.banner = res.list;
    });
    initAxios(selectProduct,{isLine:1},(res) =>{ //产品精选
        this.goodProList = excision(res.list,4);
    });
    this.par = {page:this.page,isLine:1};
    axiosScroll(this,hotProduct,this.par);
  this.$router.typeId = 1;//区分 同城 和 线上
  this.$router.isLine = 1;//区分 同城 和 线上
  },
  methods:{
    touchtop(){
      this.limitData();
      bus.$emit('refresh-data');
    },
    touchbottom(){
      if (!this.noParData){
        this.par.page++;
        axiosScroll(this,hotProduct,this.par)
      }else {
        bus.$emit('no-data',true)
      }
    },
    limitData(){
      this.noParData = false;
      this.par.page = 1;
      this.recommends = [];
      axiosScroll(this,hotProduct,this.par)
    }
  },
  components:{listTitle,hot,proGood,scroll}
}
</script>

<style scoped lang="stylus">
 @import "../../common/stylus/mixin.styl"
 @import "../../common/stylus/proList.styl"
.continue
  position absolute
  left 0
  top -60px
  right 0
  bottom 0
  overflow hidden
  .bannerSlider
    height 320px
  .banner
    width 100%
    height 320px
    overflow hidden
  .tab
    width 100%
    height auto
    background-color #ffffff
    ul
      display flex
      flex-flow: row wrap;
      align-content space-around
      padding 32px 40px 0 40px
      li
        width 20%
        margin  0 auto
        text-align center
        margin-bottom 26px
        a
          display block
          width 100%
          height 100%
          color rgb(51,51,51)
          font-size 24px
          i
            display block
            margin 0 auto
            width 90px
            height 90px
            margin-bottom 12px
            $bg-size(100%,100%)
        &:nth-child(1)
          i
            $bg-image('./img/ic-home-jkxkz')
        &:nth-child(2)
          i
            $bg-image('./img/ic-home-sfded')
        &:nth-child(3)
          i
            $bg-image('./img/ic-home-xejsd')
        &:nth-child(4)
          i
            $bg-image('./img/ic-home-sbzx')
        &:nth-child(5)
          i
            $bg-image('./img/ic-home-zmfdk')
        &:nth-child(6)
          i
            $bg-image('./img/ic-home-xykjk')
        &:nth-child(7)
          i
            $bg-image('./img/ic-home-gtgl')
        &:nth-child(8)
          i
            $bg-image('./img/ic-home-bzfkw')
        &:nth-child(9)
          i
            $bg-image('./img/ic-home-7td')
        &:nth-child(10)
          i
            $bg-image('./img/ic-home-mxjq')


  .hot
    background-color #ffffff
    .head
      padding-left 40px
    .list
      padding-left 40px
  .top-tip
    position absolute
    top -60px
    text-align center
    left 50%
    transform translate(-50%)
  .refreshAlert
    top 0
  #banner-pagination,#proGood-pagination
    position: absolute
    z-index 9
    text-align center
    span
      width 30px
      height 6px
      border-radius 6px
      background-color #ffffff

</style>
<style>
  .mint-swipe-indicators>.mint-swipe-indicator{
    width :30px;
    height: 6px;
    border-radius: 6px;
    background: rgba(255,255,255,.2);
  }
  .mint-swipe-indicators>.is-active{
    opacity: 1;
    background: rgb(255,255,255);
  }
  .proGoodContainer .mint-swipe-indicators>.mint-swipe-indicator{
    background: rgb(55,137,229);
  }
  .proGoodContainer .mint-swipe-indicators>.is-active{
    opacity: 1;
    background: rgb(55,137,229);
  }

</style>
