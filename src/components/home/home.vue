<template>
  <div class="continue" ref="continue">
    <div>
      <div class="top-tip">
        <span class="refresh-hook">{{topTip}}</span>
      </div>
      <div class="refreshAlert" v-show="refreshAlert"><p>刷新成功!</p></div>
      <div class="banner">
        <scroll ref="scroll" class="recommend-content">
          <div>
            <div class="slider-wrapper">
              <slider ref="isSliderX">
                <div v-for="(item, index) in banner" :key="index">
                  <a :href="item.vUrl" >
                    <img :src="item.vImgUrl" width="100%" height="100%">
                  </a>
                </div>
              </slider>
            </div>
          </div>
        </scroll>
      </div>
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tab" :key="index"><router-link :to="{name:'type',params: { name: item.name,id:item.id,state:item.params }}"><i></i><span>{{item.name}}</span></router-link></li>
        </ul>
      </div>
      <!--贷款精品-->
      <div class="proGood">
        <div class="head">
          <list-title :title="'借贷精选'" :more="true" :skip="'tab0'" :routerparams = routerparams></list-title>
        </div>
        <div class="proGood_list">
         <!-- <scroll ref="good" class="recommend-content">-->
            <div>
              <div class="slider-wrapper">
                <slide ref="isSliderGoodX">
                  <div class="goodSlider" v-for="(item, index) in goodProList" :key="index">
                    <ul>
                      <li v-for="(child,n) in item" :key="n">
                        <router-link :to="{name:'applyPage'}">
                          <img :src="child.proIcon" />
                          <p>{{child.proName}}</p>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </slide>
              </div>
            </div>
         <!-- </scroll>-->
        </div>
      </div>
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
</template>

<script>
  import scroll from '../common/scroll.vue'
  import slider from '../common/slider.vue'
  import slide from '../common/slide.vue'
  import listTitle from '../common/listTitle.vue'
  import hot from '../common/hot.vue'
  import {banner,hotProduct,selectProduct} from '../../api/api'
  import {_initScroll,initScroll} from '../../common/js/fun'
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
    //  list:[],
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
   this._initBanner();
 //  this._initSelectProduct();   //产品精选
    this.$nextTick(() =>{
      initScroll(this,hotProduct,this.$refs.continue,{page:this.page,isLine:1});
    });
  this.$router.typeId = 1;//区分 同城 和 线上
  this.$router.isLine = 1;//区分 同城 和 线上
  },
  methods:{
    _initBanner(){  //轮播图
      banner().then((res) =>{
        if (res.data.retcode == 1000){
          this.banner = res.data.data.list;
            console.log(this.slider);
            this.$refs.isSliderX.launch();
        }else {
          alert(res.data.retmsg)
        }
      });
    },
    _initSelectProduct(){
      selectProduct().then((res) =>{
        if(res.data.retcode == 1000){
          console.log(this.goodProList);
          if ( res.data.data.list.length != 0){
            this.goodSliderTab =  res.data.data.list.length / 4;
            if ( res.data.data.list.length % 4 > 0){
              this.goodSliderTab += 1;
            }
             for (let i = 0; i < this.goodSliderTab; i++ ){
               this.goodProList[i] = res.data.data.list.slice(i,i+4);
             }
              this.$refs.isSliderGoodX.launch();
             console.log(this.goodProList)
          }
        }
      })
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      if (from.name){
        console.log('喝喝');
        vm.$refs.isSliderX.isNext = false;
        vm.$refs.isSliderX._newInit();
      }
    })
  },
  components:{scroll,slider,listTitle,hot,slide}
}
</script>

<style scoped lang="stylus">
 @import "../../common/stylus/mixin.styl"
 @import "../../common/stylus/proList.styl"
.continue
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  overflow hidden
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

  /*借贷精选*/
  .proGood
    margin 30px 0
    background-color #ffffff
    .head
      padding-left 40px
    .proGood_list
      height 224px
      background-color red
      .goodSlider
        width 100%
        box-sizing border-box
        padding 30px
        ul
          display flex
          justify-content space-between
          li
            width 153px
            height 152px
            background-color yellow
            a
              display block
              width 100%
              height 100%
              margin 0 auto
              text-align center
              img
                width 80px
                height 80px
                margin 16px 0

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
</style>
