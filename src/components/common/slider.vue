<template>
  <div class="slider" ref="slider" :class="{'styleH':styleH}">
    <div class="slider-group" ref="sliderGroup" >
      <slot>
      </slot>
    </div>
    <div class="dots" v-if="scrollX">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from '../../common/js/dom'
  export default{
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      },
      scrollX:{    //X轴滚动
        type: Boolean,
        default: true
      },
      scrollY:{   //Y轴不滚动
        type: Boolean,
        default: false
      },
      sliderX:{  //判断是否是X轴方向滚动
        type:Boolean,
        default : true
      },
      styleH:{  //当X轴方向滚动设置 高度auto  Y轴设置自定义高度
        type: Boolean,
        default: false
      },
      nextTime:{   //每次结束时间
        type:Number,
        default:500
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        isNext:true,
        children:null
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
       this._setSliderWidth(true);
        this.slider.refresh();
      })
    },
    methods: {
      launch(){
          this.$nextTick(() =>{
            if (this.sliderX){
              this._setSliderWidth();
            }
            this._initSlider();
            this. _initDots();
            if (this.autoPlay) {
              this._play()
            }
          })
      },
      _setSliderWidth(isResize) {
        let width = 0;
        // 取轮播组的子元素
        this.children = this.$refs.sliderGroup.children;
        // 取轮播组件宽度(即屏幕宽度)
        let sliderWidth = this.$refs.slider.clientWidth;
        for ( let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          if (this.scrollX){
            addClass(child, 'slider-item');
          }
          // 设置轮播子图宽度为屏幕宽度
          child.style.width = sliderWidth + 'px';
          // 将轮播子图累加
          width += sliderWidth;
        }
        // 增加2个slider宽度,为无缝滚动服务
        if (this.loop && !isResize && this.isNext) {  //this.next 当第二次进入的时候 不加
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _newInit() {   //router跳转 更新
        this.isNext = false;
        if (this.sliderX){
          this._setSliderWidth();
        }
        this.slider.refresh();
        this._play();
      },
      _initSlider() {
        var that = this;
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: that.scrollX,
          scrollY: that.scrollY,
          momentum: false, // 惯性
          snap: {
            loop: this.loop, // 循环
            threshold: 0.3, // // 滚动距离超过宽度/高度的 30% 时切换图片
            speed: 400 // 轮播间隔
          },
          click: true
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;  //索引值下标
          this.currentPageIndex = pageIndex;   //获取当前的 页面下标  给 下面导航用
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play()
          }
        });
     //   this._initDots()
      },
      _initDots() {
        console.log(this.children.length)
        this.dots = new Array(this.children.length - 2)
      },
      _play() {
        this.timer = setTimeout(() => {
          this.slider.next(this.nextTime) //每次结束时间
        }, this.interval)    //this.interval  间隔时间
      }
    },
    // 什么时候会destroyed?
    destroyed() {   //组件销毁后调用
      console.log('destroyed --> 清理定时器11');
      clearTimeout(this.timer) // 有利于内存的释放
    },
    beforeRouteLeave(to,from,next){
      next();
    }
  }
</script>
<style>
  .styleH{
    height: 130px;
  }
  .slider{
    min-height: 1px;
    position :relative;
  }
  .slider-group{
    overflow :hidden;
    white-space: nowrap;
  }
  .slider-item{
    float: left;
    box-sizing: border-box;
    overflow :hidden;
    text-align :center ;
  }
  .slider-item a{
    display :block;
    width :100%;
    overflow: hidden;
    text-decoration :none;
  }
  .slider-item img{
    display:block;
    width :100%;
  }
  .dots{
    position :absolute;
    right: 0;
    left: 0;
    bottom :24px;
    text-align: center;
    font-size :0;
  }

  .dots .dot{
    display :inline-block;
    margin :0 8px;
    width :16px;
    height :16px;
    border-radius :8px;
    background-color: hsla(0,0%,100%,.8);
  }
  .dots .active{
    width: 40px;
    border-radius :10px;
    background-color :hsla(0,0%,100%,.8);
  }
</style>
