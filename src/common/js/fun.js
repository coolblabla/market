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


export function responseScroll(vm,req,par){
  return req(par).then((res) =>{
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








