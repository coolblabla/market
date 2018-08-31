<template>
  <div class="applyWrap">
    <back :title="head"></back>
    <div class="proInfo">
      <!--产品信息-->
      <div class="typeWrap_box">
        <div class="l_detail">
          <i><img :src="info.product_img" /></i>
          <p class="client">{{info.pro_name}}</p>
          <p class="l_number">{{info.loan_number}}人已借款</p>
        </div>
        <div class="l_limit">
          <div class="limit">
            <p class="money">{{DayRepay()}}</p>
            <p class="hint">日还款金额</p>
          </div>
          <div class="rate">
            <p>{{info.pro_rate_min}}%</p>
            <p class="hint">利率(%)</p>
          </div>
          <div class="total">
            <p>{{totalRate}}</p>
            <p class="hint">总利息</p>
          </div>
        </div>
      </div>
      <!--产品输入-->
      <div class="loanMoney">
        <div class="money">
          <div class="money_box">
            <label>借款金额<span>({{info.pro_limit_min}}~{{info.pro_limit_max}})</span></label>
            <div>
              <input type="number"  @change="changeMoney"   v-model.number="loanMoney" >
              <dfn>元</dfn>
            </div>
          </div>
        </div>
        <div class="timeLimit">
          <div class="timeLimit_box" style="overflow: hidden">
            <label>借款期限<span>({{info.time_name}})</span></label>
            <div class="selectTerm">
              <select v-model="selectRepayTime">
                <option :value="item"   v-for="(item,index) in timeLimitList">{{item}}</option>
              </select>
              <i class="iconfont icon-moreunfold"></i>
            </div>

          </div>

        </div>
      </div>
      <!--申请条件-->
      <div class="condition">
        <div class="condition_box">


          <h4 class="title">申请条件</h4>
          <ul class="condition_list">
            <!--<li v-for="(item,index) in info.condition_list" :key="index">-->
              <!--{{index+1}}、{{item}}-->
            <!--</li>-->
            <li>{{info.application_requirements}}</li>
          </ul>
        </div>
      </div>
      <!--产品介绍-->
      <div class="introduce">
         <div class="introduce_box">
           <h4>产品介绍</h4>
           <p>{{info.product_introduction}}</p>
         </div>
      </div>
      <!--立即申请-->
      <div class="applyBtn">
       <!-- <router-link :to="{name:'fastApply'}">立即申请</router-link>-->
        <button @click="fastApply">立即申请</button>
      </div>
    </div>
    <clue v-show="clue.show" :clue="clue.val"></clue>
  </div>
</template>
<script type="text/ecmascript-6">
  import back from '../common/back.vue'
  import {initAxios} from '../../common/js/fun'
  import clue from '../common/clue.vue'
  import {proDetail,applayInfo} from '../../api/api'
  import {showErrorGroup} from '../../common/js/verify'
  import {params,someCity} from '../../api/config'
  import {isIos,isAndroid} from '../../common/js/verify'
  export default {
    data(){
      return {
        slots:[{values: ['年假', '事假', '病假', '婚假', '其他']}],
       head:'',
        clue:{val:'',show:false,errorInfo:false},
        info :{},
        timeLimitList:[],
        selectRepayTime:null,
        loanMoney:null,
        repayTime:[
          {id:1, scope:false, minDay:'', maxDay:'', val:7},
          {id:2, scope:true, minDay:1,maxDay:15 ,val :''},
          {id:3, scope:true, minDay:16,maxDay:30 ,val :''},
          {id:4, scope:true, minDay:1,maxDay:3 ,val :''},
          {id:5, scope:true, minDay:4,maxDay:6 ,val :''},
          {id:6, scope:true, minDay:7,maxDay:8 ,val :''},
          {id:7, scope:true, minDay:10,maxDay:12 ,val :''},
          {id:8, scope:true, minDay:13,maxDay:28 ,val :''},
          {id:9, scope:true, minDay:19,maxDay:24 ,val :''},
          {id:10, scope:true, minDay:25,maxDay:36 ,val :''},
          {id:11, scope:false, minDay:'',maxDay:'' ,val :36},
        ]
      }
    },
    computed:{
      totalRate(){
        let val = (this.info.pro_rate_min / 100) * this.loanMoney * this.selectRepayTime;
        return Math.floor(val*1000)/1000;
      },
      computedRate:{
        get(){
          return this.info.pro_rate_min/100
        },
        set(newVal){
          this.info.pro_rate_min = newVal*100
        }
      },
      computedMoney:{
        get(){
          return this.info.loanMoney
        },
        set(newVal){
          console.log(newVal);
          if(!(/^[1-9]\d*$/.test(newVal))){
            this.info.loanMoney = newVal;
            console.log(this.info.loanMoney)
            showErrorGroup(this,'金额必须为整数');
          //  this.info.loanMoney = this.info.pro_limit_min
            this.clue.errorInfo = true;
          }else {
            this.info.loanMoney = newVal;
          }
          console.log('现在的值'+this.info.loanMoney)
        }
      },
    },
    methods:{
      DayRepay(){
        let val = (this.info.pro_rate_min / 100) * this.loanMoney;
        return Math.floor(val*1000)/1000;
      },
      loanDate(id){   //借款期限计算
        for (let i = 0, len = this.repayTime.length; i < len; i++){
          if(this.repayTime[i].id == id){
              if (!this.repayTime[i].scope){  //如果没有时间区间
                this.timeLimitList = [];
                this.timeLimitList.push(this.repayTime[i].val);
                this.selectRepayTime = this.repayTime[i].val;
              }else {
                this.timeLimitList = [];
                for (let j = this.repayTime[i].minDay,jen = this.repayTime[i].maxDay+1;j < jen;j++){
                  this.timeLimitList.push(j);
                }
                this.selectRepayTime = this.timeLimitList[this.timeLimitList.length-1];
              }
          }
        }

      },
      totalRepay(){
      //  return (this.info.pro_rate_min / 100) * this.info.loanMoney * ;
      },
      changeMoney(){
        if(!(/^[1-9]\d*$/.test(this.loanMoney))){
          showErrorGroup(this,'金额必须为整数');
          this.loanMoney = this.info.pro_limit_min;
        //  this.clue.errorInfo = true;
        }else if (this.loanMoney < this.info.pro_limit_min){
          showErrorGroup(this,'最低借款金额不能小于'+this.info.pro_limit_min);
          this.loanMoney = this.info.pro_limit_min;
        }else  if (this.loanMoney > this.info.pro_limit_max){
          showErrorGroup(this,'最高借款金额不能大于'+this.info.pro_limit_max);
          this.loanMoney = this.info.pro_limit_max;
        }else {
          this.DayRepay()
        }
      },
      fastApply(){  //点击申请
        //this.apply();return;
        if (isIos()){
          //  next();    //到时候要取消掉
          if( typeof(localStorage.ioscon) == 'string'){
            var iosParams = JSON.parse(localStorage.ioscon);
            localStorage.$rem = iosParams.userid;    //获取用户id
            if (iosParams.islogin == 1){
             this.apply();
            }else if(iosParams.islogin == 0){
              window.webkit.messageHandlers.getParam.postMessage('');
              // window.location.href = 'http://www.taobao.com'
            }
          }else {
            alert('格式错误')
          }
        }

        if (isAndroid()){
          //    next();    //到时候要取消掉
          var  result =  window.android.getParam();
          localStorage.result = result;
          result = result.split(",");
          localStorage.$rem = result[1];
          if (result[0] == 'true'){
            this.apply();
          }else if (result[0] == 'false'){  //没有登录
            //   window.android.toLogin();
          }
        }

      },
      apply(){
        this.selectRepayTime = this.selectRepayTime+ this.info.type;
        let par = {
          proId:this.$route.params.id,
          isLine:this.$router.typeId,
          userId:localStorage.$rem,
          money:this.loanMoney,
          term:this.selectRepayTime,
        };
        if (par.isLine == 2){
          par = Object.assign({},par,{
            code:someCity.adcode,
            latitude: JSON.parse(localStorage.point).lat,
            longitude:JSON.parse(localStorage.point).lng
          })
        }
        applayInfo(par).then((res) =>{
          console.log(res);
          if (res.data.retcode == 1000){
            window.location.href = this.info.pro_url;
         //   this.$router.push({ name: 'fastApply', params: { url: this.info.pro_url }})
          }else if (res.data.retcode == 4001){
            showErrorGroup(this,res.data.retmsg);
          }
        });
      },
    },
    beforeRouteEnter(to,from,next){
      next(vm =>{
        let params = {id:vm.$route.params.id};
        initAxios(proDetail,params,(res)=>{//这里获取 id 然后ajax请求
          console.log(res);
          vm.info = res;
          vm.loanDate(vm.info.id);
          vm.loanMoney = vm.info.pro_limit_min;
        });
        vm.head =  vm.$route.params.name;
      })
    },
    components:{back,clue}
  }
</script>
<style scoped lang="stylus">
@import "../../common/fonts/iconfont.css"
@import "../../common/stylus/variable.styl"
.proInfo
  h4
    font-size $font-size-30
    line-height 88px
  .typeWrap_box
    background-color #ffffff
    padding 34px 46px 0 46px
    border-bottom 1px solid $color-bottom
    .l_detail
      display flex
      align-items center
      justify-content space-between
      padding-bottom 28px
      border-bottom  1px solid $color-bottom
      i
        flex 0 0 64px
        height 64px
        margin-right 45px
        img
          width 100%
          height 100%
      .client
        font-size $font-size-34
        color $color-black
      .l_number
        font-size $font-size-22
        color $color-h
    .l_limit
      display flex
      align-items center
      justify-content space-between
      height 140px
      background-color transparent
      .limit,.rate,.total
        text-align center
        color $color-red
        font-size $font-size-36
        .hint
          margin-top 20px
          color $color-h
          font-size $font-size-22
        background-color transparent

  .loanMoney
    background-color #ffffff
    label
      font-size $font-size-30
      color $color-black
      span
        color $color-h
        padding-left 14px
    .money,.timeLimit
      height 100px
      box-sizing border-box
      border-bottom 1px solid $color-bottom
      .money_box,.timeLimit_box
        display flex
        height 100%
        align-items center
        justify-content space-between
        padding  0 46px
        input
          width 200px
          height 50px
          padding-right 20px
          font-size 32px
          text-align right
          border 2px solid $color-blue
          border-radius 50px
          color $color-blue
        dfn
          font-size $font-size-30
          color $color-black
          font-style normal

      .timeLimit_box
        .selectTerm
          display flex
          align-items center
          select
            appearance:none
            -moz-appearance:none
            -webkit-appearance:none
            padding 0 20px
            border none
            outline none

  .condition,.introduce
    background-color #ffffff
    border-bottom 1px solid $color-bottom
    .condition_box,.introduce_box
      padding 0 46px
      .condition_list
        padding 20px 0
        li
          color $color-h
          line-height 50px
          font-size $font-size-22
  .introduce
    margin-top 30px
    .introduce_box
      p
        line-height 50px

  .applyBtn
    margin-top 100px
    height 100px
    background-color $color-blue
    a,button
      display block
      width 100%
      height 100px
      line-height 100px
      border none
      text-align center
      color #ffffff
      font-size $font-size-30
      background-color transparent
</style>
