<template>
  <div class="localWrap">
    <search :place="'请输入城市名'" :backW="true" :toggleInput="false" :citySearch="true">
      <i class="back" @click="goBack"></i>
    </search>
    <div class="currentCity">
      <h4>当前定位城市</h4>
    </div>
    <div class="locationCity">
      <span>{{someCity.name}}</span>
      <button @click="refresh()">重新定位</button>
    </div>
    <div class="city">
      <div class="cityListWrap" ref="cityListWrap">
        <ul>
          <li v-for="(item,index) in ChinaCity" class="city-list" ref="cityList" :key="index">
            <h1 class="title">{{item.names}}</h1>
            <ul>
              <li @click="selectCity(cityName.name,$event,cityName.adminCode)" v-for="(cityName,index) in item.sysCityList" :key="index" >
                 <span>{{cityName.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="letterWrap" ref="letterWrap">
        <ul>
          <li v-for="(item,index) in ChinaCity" :class="{'current':currentIndex == index}"
              @click="selectLetter(item.names,$event,index)" ref="letterList">
            <span>{{item.names}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--<comfirm :attr="hintAttr" v-show="hintAttr.show">-->
        <!--<button @click="skip">确定</button>-->
        <!--<button @click="close">取消</button>-->
    <!--</comfirm>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import search from '../common/search.vue'
  import BScroll from 'better-scroll'
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import {cityList} from '../../api/cityApi'
  import {bus} from '../../common/js/bus'
 // import comfirm from '../common/comfirm.vue'
  import {setLocalStorage} from '../../common/js/fun'
  import {params,someCity} from '../../api/config'
  import {baiduGetLocaltion}from '../../common/js/address'
  export default {
    data(){
      return {
        ChinaCity:[{}],
        listHeight:[],
        scrollY:0,
        someCity,
        hintAttr:{
          show:false,
          title:'提示',
          content:'',
          confirmText:'取消',
          router: true,
          to:"/"
        }
      }
    },
    computed:{
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);
            return i;
          }
        }
        return 0;
      }
    },
    created(){
      Indicator.open({text: '加载中...',
        spinnerType: 'fading-circle'});
      cityList().then(res =>{
        console.log(res);
        if (res.data.retcode == 1000){
          Indicator.close();
          this.ChinaCity = res.data.data;
          this.$nextTick(() =>{
            this._initScroll();
            this._calculateHeight();
          })
        }else {
          alert(res.data.retmsg)
        }

      })
    },
    mounted(){
      bus.$on('search-city',res =>{
        if (res.name && res.name.length <= 15){
          for (let i = 0, len = this.ChinaCity.length; i < len; i++){
            for (let j = 0, jen = this.ChinaCity[i].sysCityList.length; j < jen; j++){
              if (this.ChinaCity[i].sysCityList[j].name.indexOf(res.name) != -1){
               // alert(this.ChinaCity[i].sysCityList[j].name)

                this.selectLetter(this.ChinaCity[i].first,null,i);

              //  console.log(this.ChinaCity[i].sysCityList[j].name)
                 break;
              }
            }
          }
        }

      })
    },
    methods:{
      skip(){
        this.hintAttr.show = false;
      //  setLocalStorage('address',JSON.stringify({city:this.cityName,adcode:this.cityCode}));
       // someCity.name
        //params.adminCode = this.cityCode;
        bus.$emit('address',someCity.name);
        bus.$emit('refreshcity',someCity.adcode);
        this.$router.push({name:'city',params:{noActive:true}});
      },
      close(){
        this.hintAttr.show = false;
      },
      refresh(){  //重新定位
        baiduGetLocaltion();
        bus.$emit('refreshcity',someCity.adcode);
        bus.$on('address',(name)=>{
          this.city = name;
        })
      },
      goBack() {
        window.history.length > 1?  history.go(-1) : this.$router.push('/')
      },
      _initScroll(){
        this.cityScroll = new BScroll(this.$refs.cityListWrap, {
          click: true,
          probeType: 3
        });
        this.cityScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        });

        this.letterScroll = new BScroll(this.$refs.letterWrap, {
          click: true
        });
      },
      _calculateHeight(){
        let cityList = this.$refs.cityList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < cityList.length; i++) {
          let item = cityList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectCity(name,e,code){
        MessageBox({
          title: '提示',
          message: '确定切换到'+name+'?',
          showCancelButton: true
        }).then((r) =>{
          if (r == 'cancel'){
            return;
          }else {
            someCity.name = name;
            someCity.adcode = code;
//            this.cityName = name;
//            this.cityCode = code;
            this.skip();
          }
        });
//        this.hintAttr.show = true;
//        someCity.name = name;
//        someCity.adcode = code;
//        this.hintAttr.content = '确定切换到';
//        this.hintAttr.content = this.hintAttr.content+name;
      },
      _followScroll(index){
        let letterList = this.$refs.letterList;
        let el = letterList[index];
        this.letterScroll.scrollToElement(el, 300, 0, -100);
      },
      selectLetter(letter,e,index){
        try {
          if (!event._constructed) {
            return;
          }
        }catch(e) {

        }
        let cityList = this.$refs.cityList;
        let el = cityList[index];
        this.cityScroll.scrollToElement(el, 300);
      }
    },
    components:{search}
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .currentCity
    height 74px
    padding-left 46px
    font-size $font-size-24
    color rgb(102,102,102)
    line-height @height
  .locationCity
    display flex
    height 92px
    background-color #ffffff
    align-items center
    justify-content space-between
    font-size $font-size-30
    color rgb(102,102,102)
    padding 0 40px 0 77px
    button
      height 100%
      font-size 30px
      background-color transparent
      border none
      color $color-blue


  .city
    display flex
    position absolute
    top 254px
    bottom 0
    left 0
    right 0
    overflow hidden
    background-color #ffffff
    .cityListWrap
      flex  1
      .city-list
        background-color #f1f0f0
        .title
          padding-left 46px
          font-size 24px
          color rgb(102,102,102)
          height 52px
          line-height 52px
          background-color #f1f0f0
        ul
          background-color #ffffff
          padding-left 68px
          li
            font-size $font-size-30
            line-height 88px
            border-bottom 1px solid $color-bottom
            height 88px



    .letterWrap
      flex 0 0 40px
      width 40px
      text-align center
      margin-top 52px
      color $color-blue
      font-size $font-size-24
      li
        width @width
        height 40px
        line-height 40px
        background-color #ffffff

      .current
        font-size $font-size-36
       // color red



  .back
    display block
    width 38px
    height 35px
    margin 0 auto
    $bg-size(100%,100%)
    $bg-image('./ic-close-white')
</style>
