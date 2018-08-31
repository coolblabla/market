// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import 'mint-ui/lib/style.css'
import {isIos,isAndroid} from "./common/js/verify"
import {Swipe, SwipeItem ,MessageBox,TabContainer, TabContainerItem,InfiniteScroll,Loadmore,Indicator,Popup   } from 'mint-ui'
fastclick.attach(document.body);
Vue.config.productionTip = false;

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);
Vue.component(Popup.name, Popup);
// router.beforeEach((to,from,next) =>{
//   if (to.matched.some(record => record.meta.requiresAuth)) {  //meta 路由元信息判断
//     if (isIos()){
//    //   next();    //到时候要取消掉
//      if( typeof(localStorage.ioscon) == 'string'){
//        var iosParams = JSON.parse(localStorage.ioscon);
//         localStorage.$rem = iosParams.userid;    //获取用户id
//         if (iosParams.islogin == 1){
//            next();
//         }else if(iosParams.islogin == 0){
//           window.webkit.messageHandlers.getParam.postMessage('');
//           // window.location.href = 'http://www.taobao.com'
//         }
//      }else {
//        alert('格式错误')
//      }
//     }
//
//     if (isAndroid()){
//      // next();    //到时候要取消掉
//      var  result =  window.android.getParam();
//       localStorage.result = result;
//       result = result.split(",");
//       localStorage.$rem = result[1];   //获取用户id
//       if (result[0] == 'true'){
//          next();
//       }else if (result[0] == 'false'){  //没有登录
//      //   window.android.toLogin();
//       }
//     }
//
//
//   } else {
//     next()
//   }
// });


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

