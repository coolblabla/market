import {bus} from "./bus"
import {params,someCity} from '../../api/config'
import {isIos,isAndroid} from "../js/verify"
import axios from 'axios'
import {cityCode} from '../../api/cityApi'
import jsonp from 'jsonp'
import {Indicator ,MessageBox } from 'mint-ui'
import qs from 'qs'
import {setLocalStorage} from './fun'



export function baiduGetLocaltion() {
  //创建百度地图控件
  let geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    let adds =r.point;
    someCity.lat = adds.lat;
    someCity.lng = adds.lng;
 //   setLocalStorage('point',JSON.stringify(adds));
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      jsonp('http://api.map.baidu.com/geocoder/v2/?ak=8mHttx4uZDZb3XRSevDk4YeAWNAeE0VU&location=' + adds.lat + ',' + adds.lng + '&output=json&pois=1','BMap._rd._cbk43398',(err,res) =>{
        let result = res.result, addressComponent = result.addressComponent;
       // bus.city = addressComponent.city;
        someCity.name = addressComponent.city;
       // bus.adcode = addressComponent.adcode;
        cityCode({adminCode:addressComponent.adcode,name:addressComponent.city}).then((r) =>{
          Indicator.close();
            if (r.data.retcode == 1000){
              let adcode = r.data.data.adminCode;
              someCity.adcode = adcode;
          //    setLocalStorage('address',JSON.stringify({city:addressComponent.city,adcode:adcode}));
              params.adminCode = adcode;
              bus.$emit('address',bus.city);
              bus.entryPage = true;
            }else {
              MessageBox('提示', r.data.retmsg);
            }
        });
      });
    }
    else {
      console.log('定位失败');
    }
  },{enableHighAccuracy: true}) //指示浏览器获取高精度的位置，默认false
}


export function routeJudge(to,from,next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {  //meta 路由元信息判断
    if (isIos()){
    //  next();    //到时候要取消掉
      if( typeof(localStorage.ioscon) == 'string'){
        var iosParams = JSON.parse(localStorage.ioscon);
        localStorage.$rem = iosParams.userid;    //获取用户id
        if (iosParams.islogin == 1){
          next();
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
        next();
      }else if (result[0] == 'false'){  //没有登录
        //   window.android.toLogin();
      }
    }
  } else {
    next() // 确保一定要调用 next()
  }
}






/*高德定位*/

// export function getLocation(){
//   var map, geolocation;
//   //加载地图，调用浏览器定位服务
//   map = new AMap.Map('', {
//     resizeEnable: true
//   });
//   map.plugin('AMap.Geolocation', function() {
//     geolocation = new AMap.Geolocation({
//       enableHighAccuracy: true,//是否使用高精度定位，默认:true
//       timeout: 1000,          //超过10秒后停止定位，默认：无穷大
//       buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//       zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//       buttonPosition:'RB',
//       GeoLocationFirst:true,
//       showButton:false
//     });
//     map.addControl(geolocation);
//     geolocation.getCurrentPosition();
//     AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//     AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
//   });
// }
// //解析定位结果
// export function onComplete(data) {
//   var addressComponent = data.addressComponent;
//   bus.city = addressComponent.city;
//   bus.adcode = addressComponent.adcode;
//   console.log(addressComponent);
//   bus.$emit('address',bus.city);
//   bus.$emit('address-component',addressComponent);
//   bus.entryPage = true;
// }
// //解析定位错误信息
// export function onError(data) {
//   console.log(data);
//   alert('定位失败');
// }


