import Bscroll from 'better-scroll'
import {baseConfig} from '../../api/config'
import {params} from '../../api/config'
export function setTime() {
  var times = null;
  times = setTimeout(function () {
    clearInterval(times);
    times = null;
    return false;
  }, 1500);

}

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));  //多少天数
  // d.setTime(d.getTime()+(exdays*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
export function delCookie(key) {
  document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
export function getScrollTop() {
  var scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset; }
  else if (document.compatMode && document.compatMode != 'BackCompat')
  { scrollPos = document.documentElement.scrollTop; }
  else if (document.body) { scrollPos = document.body.scrollTop; }
  return scrollPos;
}



export  function isAuth(vm,num) {
  if (num == 1){
    vm.$router.push('/memberAuth');
  }else if (num == 2){
    return '你已认证!'
  }else{
    vm.$router.push('/memberAuth');
  }
}


export function _initScroll(vm,req) {
  const that = vm;
  req({page:that.page}).then((res) => {
    console.log(res);
    if (res.data.retcode == 1000){
      that.list = res.data.data.list.concat(that.list);
      that.$nextTick(() => {
        if (!that.scroll) {
          that.scroll = new Bscroll(that.$refs.continue, {click:true ,scrollY: true,pullUpLoad:{threshold:-30}});
          that.scroll.on('pullingUp', (pos) => {
            // 下拉动作
            that.page++;
            _initScroll(vm,req)
          })
        } else {
          that.scroll.refresh()
        }
      })

    }
  })
};
export function initAxios(req,params,callback){
  req(params).then((res) =>{
    if (res.data.retcode == 1000){
      callback(res.data.data);
    }else {
      alert(res.data.retmsg);
    }
  });
}

export function resettingCity(vm,req,par) {
  return req(par).then((res) =>{
    console.log(res);
    if (res.data.retcode == baseConfig.responseCode){
      if (res.data.data.list.length != 0){
        vm.recommends = vm.recommends.concat(res.data.data.list);
        vm.recommends.length < params.limit ?  vm.bottomTipJudge = false : vm.bottomTipJudge = true;
      }else {
        vm.recommends = [];
        vm.bottomTip = '无更多产品'
      }
    }else {
      alert(res.data.retmsg);
    }
  })
}

export function responseScroll(vm,req,par){
  console.log(par);
  return req(par).then((res) =>{
    console.log(res);
    if (res.data.retcode == baseConfig.responseCode){
      if (res.data.data.list.length != 0){
        vm.recommends = vm.recommends.concat(res.data.data.list);
        vm.recommends.length < params.limit ?  vm.bottomTipJudge = false : vm.bottomTipJudge = true;
      }else {
        vm.bottomTip = '无更多产品'
      }
    }else {
      alert(res.data.retmsg)
    }
  })
}

export function initScroll(vm,req,ref,params){
  responseScroll(vm,req,params);
  vm.scroll = new Bscroll(ref, {
    probeType: 1,
    click:true
  });
  // 滑动中
  vm.scroll.on('scroll', function (position) {
    if(position.y > 25) {
      vm.topTip = '释放立即刷新';
    }
  });

  /*
   * @ touchend:滑动结束的状态
   * @ maxScrollY:屏幕最大滚动高度
  */
  // 滑动结束
  vm.scroll.on('touchEnd', function (position) {
    if (position.y > 25) {
      setTimeout(function () {     //上啦刷新的时候
        params.page = 1;
        responseScroll(vm,req,params);
        vm.recommends = [];
        vm.topTip = '下拉刷新';  // 恢复文本值
        vm.bottomTip = '查看更多';
        // 刷新成功后的提示
        refreshAlert(vm);
        //refreshAlert('刷新成功');
        vm.scroll.refresh(); // 刷新列表后,重新计算滚动区域高度
      }, 1000);
    }else if(position.y < (this.maxScrollY - 25)) {   ////下拉 加载更多
      vm.bottomTip = '加载中...';
      setTimeout(function () {
        vm.bottomTip = '查看更多';
        params.page ++;
        responseScroll(vm,req,params);     // 向列表添加数据
        vm.scroll.refresh(); // 加载更多后,重新计算滚动区域高度
      }, 1000);
    }
  });
}
export function refreshAlert(vm) {
  vm.refreshAlert =true;
  let times = setTimeout(() =>{
    vm.refreshAlert = false;
    clearTimeout(times);
    times = null;
  },2000)
}



export function proList(vm,req,par){
  return req(par).then((res) =>{
    if (res.data.retcode == baseConfig.responseCode){
      if (res.data.data.list.length != 0){
        vm.recommends = vm.recommends.concat(res.data.data.list);
      }
    }else {
      alert(res.data.retmsg)
    }
  })
}


export function swiperConfig(vm,params) {
  vm[[params.dom]] = new Swiper (params.ref, {
    loop: true,
    autoplay:params.autoplay,
    autoplayDisableOnInteraction:false,
    observer: true,
    observeParents:true,
    pagination:params.pagination
  });
}

export function excision(list,index) {
  if ( list.length != 0){
    var len =  list.length / index;
    if ( list.length % index > 0){
      len += 1;
    }
    len = parseInt(len);
    let start = 0, end = index,arr = [];
    for (let i = 0; i < len; i++ ){
      arr[i] = list.slice(start,end);
      start = end;
      end = end*2;
    }
    return arr;
  }else {
    alert('数据不能为空!')
  }

}
export function setLocalStorage(key,value) {
  if(typeof(Storage)!=="undefined"){
    localStorage[key]=value;
  } else{
    alert("对不起您的浏览器不支持 web 存储");
  }
}


export function getCity(vm) {
  var g = new BMap.Geolocation();
  g.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      let lat = r.point.lat;
      let lng = r.point.lng;
      console.log(r);
      console.log(r.point);
      let city = r.address.city;
     return r.point;
    }
  })
}

export function axiosScroll(vm,req,par){
  vm.noPro = false;
  if (vm.$refs.scroll){
    vm.$refs.scroll.bottomTipJudge = false;
  }
  initAxios(req,par,r =>{
    vm.$nextTick(()=>{
      if (vm.recommends.length == 0 && r.list.length == 0){
        vm.$refs.scroll.bottomTipJudge = false;
        vm.noPro = true;
      }else {
        vm.$refs.scroll.bottomTipJudge = true;
        if (r.list.length < params.limit){  //没有更多数据了
          vm.noParData = true;
          vm.$refs.scroll.bottomTip = '无更多产品';
        }
        vm.recommends = vm.recommends.concat(r.list);
      }
      vm.$refs.scroll.scroll.refresh();
    })
  });
}






