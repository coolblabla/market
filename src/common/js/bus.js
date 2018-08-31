import Vue from 'vue'
export const bus = new Vue({
   data:{
     name:"bus",
     status:0,
     city:'台州市',
     accountMap:{},
     addressComponent:{},
     myCommonData:{}   //是否登录 是否认证
   },
  methods:{
     mobileReplace(par){
       console.log(par)
       if (par){
         par = par.replace(/^([\d]{4,4}).*?([\d]{4,4})$/g,'$1****$2')
         return par;
       }else {
         return '';
       }

     }
  }
});
