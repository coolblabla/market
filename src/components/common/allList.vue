<template>
  <loan-list :arr="recommends" ref="loanList"></loan-list>
</template>
<script type="text/ecmascript-6">
  import loanList from './loanList.vue'
  export default {
    data(){
      return {
          msg:''
      }
    },
    created(){
      this._getRecommend();
    },
    methods:{
      _getRecommend() {
        this.recommends =  [
          {
            "linkUrl": "https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=700567",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003kGTF00E6oXe.jpg",
            "id": 15055,
            "name":"老张有钱,",
            "detail":"借钱不",
            "rate":"0.03",
            "min":"1000",
            "max":"20000",
            "loanN":"1000",
            list:['身份证','一次还清','新上线1']
          },
          {
            "linkUrl": "https://y.qq.com/msa/319/5_5136.html",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M0000008Xxwd1417y8.jpg",
            "id": 15068,
            "name":"我曾经很有钱,只是用完了",
            "detail":"借钱不",
            "rate":"0.03",
            "min":"1000",
            "max":"8000",
            "loanN":"1000",
            list:['身份证','一次还清','新上线2']
          },
          {
            "linkUrl": "https://y.qq.com/msa/324/0_5137.html",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002ab5of4Z6qH0.jpg",
            "id": 14616,
            "name":"喝喝",
            "detail":"借钱不",
            "rate":"0.03",
            "min":"1000",
            "max":"5000",
            "loanN":"1000",
            list:['身份证','一次还清','新上线3']
          },
          {
            "linkUrl": "https://y.qq.com/msa/324/0_5137.html",
            "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000002ab5of4Z6qH0.jpg",
            "id": 14616,
            "name":"喝喝",
            "detail":"借钱不",
            "rate":"0.03",
            "min":"1000",
            "max":"5000",
            "loanN":"1000",
            list:['身份证','一次还清','新上线3']
          }
        ];
        this.messageList = [
          {id:1,msg:'1111111每邀请一位小伙伴,返佣金0.1%,小伙伴加油吧！'},
          {id:2,msg:'22222222来我们这里借钱吧来我们这里借钱吧！'},
          {id:3,msg:'3333333如果俞天阳会飞！'},
        ]
      },
    },
    beforeRouteUpdate(to,form,next){
      this.msg = to.params.userId;
      if(this.msg == 2){
        console.log(this.$refs.loanList)

        var a = [{
          "linkUrl": "https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=700567",
          "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003kGTF00E6oXe.jpg",
          "id": 15055,
          "name":"老张有钱,",
          "detail":"借钱不",
          "rate":"0.03",
          "min":"1000",
          "max":"20000",
          "loanN":"1000",
          list:['身份证','一次还清','新上线1']
        }];
        this.$refs.loanList.arr = a;
      }else {
        this.$refs.loanList.arr = this.recommends ;
      }
      next();
    },
    beforeRouteEnter(to,from,next){
      console.log(to);
      next( vm =>{
        if(to.params.id == 3){
          console.log('我是三号');
          vm.recommends = [{}];
        }
      });
    },
    components:{loanList}
  }
</script>
<style></style>
