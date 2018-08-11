// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
 //import Vuerify from 'vuerify'
import 'lib-flexible'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
//import {auth,userInfo} from "./api/api"
//import {bus} from "./common/js/bus"
//import VueClipboard  from 'vue-clipboard2'
fastclick.attach(document.body);
//Vue.use(Vuerify);
//Vue.use(VueClipboard);
Vue.config.productionTip = false;


// router.beforeEach((to,from,next) =>{
//   if (to.matched.some(record => record.meta.requiresAuth)) {  //meta 路由元信息判断
//     if (bus.status == 0){  //刷新页面
//       auth().then((res)=>{  //请求 是否登录
//         if (res.data.retcode == 1000){
//           console.log('多少人')
//           if(res.data.data.isLogin == 0){  //如果没登录
//             next({
//               path:'/my/register',
//             })
//           }else{  //如果登陆了
//             bus.status = 1;
//             next();
//           }
//         }else {
//           next({
//             path:'/my/register',
//           });
//         }
//       });
//
//     }else {  //如果登陆了
//       console.log('现在status为1')
//       next()
//     }
//
//
//   } else {
//     next() // 确保一定要调用 next()
//   }
// });


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

