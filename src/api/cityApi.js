import axios from 'axios'
import qs from 'qs'
import {options,params} from "./config"



//城市列表
export function cityList() {
 // const url = 'http://10.10.100.11:7878/';
   const url = options.url+'/portal/sysCity/userInfo';
  return axios.get(url).then((res) => {
    return  Promise.resolve(res)
  })
}

//17：查询分类列表
export function ProductTypes(par) {
  const url = options.url+'/portal/portalProduct/MoreProduct';
  const data = Object.assign({},par,{merchantcode:params.merchantcode});    //admincode 写死的 到时候要改
  return axios.get(url,{params:data}).then((res) => {
    return  Promise.resolve(res)
  })
}




//查看更多 全部数据

export function ProductAllCity(par) {
  const url = options.url+'/portal/portalProduct/productAll';
  const data = Object.assign({},par,{merchantcode:params.merchantcode,limit:params.limit,adminCode:params.adminCode});    //admincode 写死的 到时候要改
  return axios.get(url,{params:data}).then((res) => {
    return  Promise.resolve(res)
  })
}

/*查看 其他类型 */

export function MoreProduct(par) {
  const url = options.url+'/portal/portalProduct/ProductTypes';
  const data = Object.assign({},par,{merchantcode:params.merchantcode,limit:params.limit,adminCode:params.adminCode});    //admincode 写死的 到时候要改
  console.log(data);
  return axios.get(url,{params:data}).then((res) => {
    return  Promise.resolve(res)
  })
}




