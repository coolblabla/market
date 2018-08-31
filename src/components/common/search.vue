<template>
  <div class="searchWrap">
    <div class="flag" :class="{'backWidth':backW}">
      <slot></slot>
    </div>
    <div class="search" v-if="showSearch">
      <i></i>
      <input v-if="toggleInput" :placeholder="place"        @focus="skipSearch"  />
      <input v-else :placeholder="place" v-model="queryStr"     autofocus     />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {searchPro} from '../../api/cityApi'
  import {bus} from '../../common/js/bus'
  export default {
    props:{
      backW:{
        type:Boolean,
        default(){
          return false;
        }
      },
      place:{
        default(){
          return '搜索'
        }
      },
      showSearch:{
        default(){
          return true
        }
      },
      toggleInput:{
        default(){
          return true
        }
      },
      citySearch:{
        default(){
          return false
        }
      }
    },
    data(){
      return {
         queryStr:'',
         page : 1,
         flag :true,
         times :null,
      }
    },
    watch:{
      queryStr(){
          clearTimeout(this.times);
          this.times = null;
          this.times = setTimeout(() =>{
            if (!this.citySearch){
              this.search();
            }else {
              this.searchCity();
            }
            clearTimeout(this.times);
            this.times = null;
          },600);
      }
    },
    created(){

    },
    methods:{
      skipSearch(){
        this.$router.push({ name: 'proSearch'});
      },
      searchCity(){  //搜索 城市
        bus.$emit('search-city',{name:this.queryStr,flag:this.flag})
      },
      search(){   //这里发起 产品搜索请求
        bus.$emit('search-result',{name:this.queryStr,flag:this.flag})
      },
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
.searchWrap
  display flex
  align-items center
  padding 14px 40px 14px 0
  height 88px
  box-sizing border-box
  background-color #3789e5
  .flag
    flex  0 0 180px
  .backWidth
    flex  0 0 120px
  .search
    position relative
    flex 1
    i
      position absolute
      top 50%
      margin-top -18px
      left 30px
      width 36px
      height 36px
      $bg-size(100%,100%)
      $bg-image('./img/ic-search')
    input
      height 60px
      width 100%
      box-sizing border-box
      padding-left 80px
      border-radius 6px
   /* i
      position absolute
      top 50%
      margin-top -18px
      left 50%
      margin-left -48px
      width 36px
      height 36px
      $bg-size(100%,100%)
      $bg-image('./img/ic-search')
    input
      height 60px
      width 100%
      box-sizing border-box
      padding-left 50%
      border-radius 6px*/
</style>

