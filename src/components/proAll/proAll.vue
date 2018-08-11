<template>
  <div class="proAll">
    <search :backW="true">
      <i class="back" @click="goBack"></i>
    </search>
    <!--tab-->
    <div class="menuWrap" ref="menuWrapper">
      <ul ref="menu">
        <li @click="selectTab($event)" v-for="(item,index) in menu" class="menu-item" :class="{'current':currentIndex===index}"
            ref="menuList">
          <router-link :to="{name:'tab'+index,params:{tabId:index,id:item.id}}">
            {{item.typeName}}
          </router-link>
        </li>
      </ul>
    </div>
    <div @touchend="touchEnd($event)" @touchstart="touchStart($event)">
      <transition :name="fade">
        <keep-alive>
          <router-view :arr="recommends" ref="loanList"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import search from '../common/search.vue'
  import BScroll from 'better-scroll'
  import loanList from '../common/loanList.vue'
  import {initScroll} from '../../common/js/fun'
  import {ProductTypes,ProductAllCity} from '../../api/cityApi'
  export default {
    data(){
      return {
        fade:'fadeIn',
        recommends:[],
        currentIndex:0,
        touchVal:{},
        page:1,
        menu :[{typeName:'全部'}],   //标签
        recommends:null,
        path:this.$router.currentRoute.path
      }
    },
    created(){
      this.initProductTypes();
    },
    methods:{
      initProductTypes(){
        ProductTypes({typeId : this.$router.typeId}).then((res) =>{
          console.log(res);
          if (res.data.retcode == 1000){
              this.menu = this.menu.concat(res.data.data.list);
             this.$nextTick(() =>{
               this._initMenuScroll();
             })
          }else{
            alert(res.data.retmsg);
          }
        })
      },
      selectTab(event){
        console.log(event);
        if (!event._constructed) {
          return;
        }
      },
      _followScroll(index){
        let letterList = this.$refs.menuList;
        let el = letterList[index];
        this.meunScroll.scrollToElement(el, 300, -200, 0);
      },
      touchStart(e){
        e.preventDefault();
        this.touchVal.startX = e.touches[0].pageX;
        this.touchVal.startY = e.touches[0].pageY;
        this.touchVal.judgeTime = false;
      },
      touchEnd(e){
        e.preventDefault();
        this.touchVal.moveEndX = e.changedTouches[0].pageX;
        this.touchVal.moveEndY = e.changedTouches[0].pageY;
        this.touchVal.X = this.touchVal.moveEndX - this.touchVal.startX;
        this.touchVal.Y = this.touchVal.moveEndY - this.touchVal.startY;
        if ( Math.abs(this.touchVal.X) > Math.abs(this.touchVal.Y) && this.touchVal.X > 0 ) {
         //这里是  减减  右
          let currentIndex = this.$route.params.tabId;
          if (currentIndex > 0) {
            currentIndex --;
            this._followScroll(currentIndex);
            this.$router.push({name: 'tab'+currentIndex, params: {tabId: currentIndex,id:this.menu[currentIndex].id}})
//            this.proScroll.on('scrollEnd', () => {
//              console.log('结束了 的范德萨发')
//           //  this.$router.push({name: 'tab', params: {tabId: currentIndex}})
//            });
          }else{
            return;
          }
        } else if ( Math.abs(this.touchVal.X) > Math.abs( this.touchVal.Y) &&  this.touchVal.X < 0 ) {
          // 加
            let currentIndex = this.$route.params.tabId;
            if (currentIndex < this.menu.length) {
              currentIndex ++;
              this._followScroll(currentIndex);
//              this.proScroll.on('scrollEnd', () => {
//                this.$router.push({name: 'tab', params: {tabId: currentIndex}})
//              });
             this.$router.push({name: 'tab'+currentIndex, params: {tabId: currentIndex,id:this.menu[currentIndex].id}})
            }else{
              return;
            }
          }
      },
      goBack() {
        console.log(this.$route.params)
        console.log(this.$router)
        if (this.$router.typeId == 1){
          this.$router.push({ name: 'home'})
        }else if(this.$router.typeId == 2){
          this.$router.push({ name: 'city'})
        }

      },
      _initMenuScroll() {
        let width = 0;
        for (let i = 0; i < this.menu.length; i++) {
          width += this.$refs.menuList[i].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        }
        this.$refs.menu.style.width = width + 'px';
        if(!this.meunScroll){
          this.meunScroll = new BScroll(this.$refs.menuWrapper, {
            click: true,
            startX: 0,
            scrollX: true,
            //scrollY: true,
            probeType:3,
            eventPassthrough: 'vertical'
          });
        }else {
          this.meunScroll.refresh()
        }
        this.meunScroll.on('scrollEnd', () => {
          this.meunScroll.refresh()
        });
      },
    },
    watch:{
      '$route'(to,from){
         if (to.params.tabId > from.params.tabId){
          this.fade = 'fadeTo'
         }else{
           this.fade = 'fadeIn'
         }
      }
    },
    beforeRouteEnter(to,from,next){
      console.log(to);
      next(vm =>{
      })
    },
    components:{search,loanList}
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"
  /*菜单*/
  .menuWrap
    position absolute
    top 88px
    left 0
    z-index 99
    width 100%
    padding 0 58px 0 47px
    box-sizing border-box
    background-color #ffffff
    height 88px
    overflow hidden
    color $color-h

    ul
      display flex
      height 100%
      li
        flex 0 0 120px
        width 120px
        height 88px
        box-sizing border-box
        line-height 88px
        margin auto
        padding 0 10px
        text-align center
        font-size 29px
        .router-link-active
          box-sizing border-box
          border-bottom 6px solid $color-blue
        a
          display block
          width 100%
          height 100%
  .proWrap
    position absolute
    z-index 0
    top 118px
    bottom 0
    left 0
    right 0
    overflow hidden
  .back
    display block
    width 38px
    height 35px
    margin 0 auto
    $bg-size(100%,100%)
    $bg-image('./ic-back-white')

  .fadeIn-enter
    transform: translateX(100%)
    opacity: 0
  .fadeIn-enter-active, .fadeTo-enter-active
    transition: all 1s ease;
  .fadeTo-enter
    transform: translateX(-100%);


</style>





