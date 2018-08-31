import Vue from 'vue'
import Router from 'vue-router'
import city from '@/components/city/city'

import proApply from '@/components/proApply/proApply'
import allList from '@/components/common/allList'
import loanList from '@/components/common/loanList'
import local from '@/components/cityLocation/local'
import fastApply from  '@/components/common/fastApply'  //点击申请的时候
import proSearch from '@/components/proSearch/proSearch'


import all from '@/components/proAll/proAll'
import tabAll from '@/components/tab/tab_all'
import tabBank from '@/components/tab/tab_bank'
import tabFund from '@/components/tab/tab_fund'
import tabFast from '@/components/tab/tab_fast'
import tabPhone from '@/components/tab/tab_phone'
import tabRate from '@/components/tab/tab_rate'
import tabSbd from '@/components/tab/tab_sbd'
import tabCredit from '@/components/tab/tab_credit'
import tabZmf from '@/components/tab/tab_zmf'


Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'city',
      component: city
    }, {    //选择城市
      path: '/local',
      name: 'local',
      component: local
    }, {
      path :'/fastApply',
      name:'fastApply',
      component:fastApply,
      meta: { requiresAuth: true }
    },
    {
      path: '/all',
      name: 'all',
      component: all,
      //meta: { requiresAuth: true },
      children:[
        {path:'tab/:tabId',name:'tab0',component:tabAll}, //全部
        {path:'tab/:tabId',name:'tab1',component:tabPhone},  //手机
        {path:'tab/:tabId',name:'tab2',component:tabBank},  //信用卡
        {path:'tab/:tabId',name:'tab3',component:tabFund}, //公积金
        {path:'tab/:tabId',name:'tab4',component:tabSbd},  //色报贷
        {path:'tab/:tabId',name:'tab5',component:tabZmf},  //芝麻分
        {path:'tab/:tabId',name:'tab6',component:tabFast},  //急速贷
        {path:'tab/:tabId',name:'tab7',component:tabCredit}, //上真心
        {path:'tab/:tabId',name:'tab8',component:tabRate},  //免息

    //    {path:'tab/:tabId',name:'tab',component:loanList},
      ]
    }
    ,{
      path: '/apply',
      name: 'applyPage',
      component: proApply,
    },
    {
      path:'/search',
      name:'proSearch',
      component:proSearch
    }
  ]
})
