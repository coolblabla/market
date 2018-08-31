
import Vue from 'vue'
import App from './CityLoan.vue'
import router from './router/indexCity'
//import Vuerify from 'vuerify'
import 'lib-flexible'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import {isIos,isAndroid} from "./common/js/verify"
import {bus} from "./common/js/bus"
import 'mint-ui/lib/style.css'
 import {routeJudge,baiduGetLocaltion} from './common/js/address'
import {Swipe, SwipeItem ,MessageBox,TabContainer, TabContainerItem,InfiniteScroll,Loadmore,Indicator,Popup  } from 'mint-ui'
//import {auth,userInfo} from "./api/api"
//import VueClipboard  from 'vue-clipboard2'
fastclick.attach(document.body);
Vue.config.productionTip = false;

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);
Vue.component(Popup.name, Popup);

router.beforeEach((to,from,next) =>{

  bus.$on('address',(data)=>{
    routeJudge(to,from,next);

  });
   if (bus.entryPage){
     routeJudge(to,from,next);

  }

});


new Vue({
  el: '#app',
  router,
  components: { App },
  data(){
    return {
      cityAddress:''
    }
  },
  created(){
    Indicator.open();
    baiduGetLocaltion();
  //  getLocation()
  },
  template: '<App/>'
});

