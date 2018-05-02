//index.js
const config = require('../../utils/config.js');
const appInstance = getApp();
//获取应用实例
const app = getApp()
Page({
  data: {
    location:"",
    autoplay:true,
    interval:"5000",
    duration:"1000" ,
    scrollTop: "0",
    city_id2:"5",
    nav2: [
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/hgy.png",
      cate_name: "花岗岩",
      cate_id: "9"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/dls.png",
        cate_name: "大理石",
        cate_id: "2"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/hgy.png",
        cate_name: "人造石",
        cate_id: "32"
      },
   
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/whs.png",
        cate_name: "文化石",
        cate_id: "29"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/shs.png",
        cate_name: "雕刻工艺",
        cate_id: "54"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/mgs.png",
        cate_name: "蘑菇石",
        cate_id: "28"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/lys.png",
        cate_name: "路沿石",
        cate_id: "31"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/sy.png",
        cate_name: "砂岩",
        cate_id: "6"
      },
      {
        url: "http://www.chinascw.net/themes/default/Mobile/statics/img/by.png",
        cate_name: "板岩",
        cate_id: "5"
      },
    ]
  },
  onLoad: function (options) {
    var that = this;
    
  
     var city_id2 = options.id;
 
     
    
     
  
    // appInstance.globalData.codeId=options.id;
    // console.log(appInstance.globalData.codeId)
//     if(options.id){//判断有没有参数传过来
    
//      var  city_id2 = options.id;
//     }else{

//       city_id2=5
//     }
   
    //时间戳转换时间  
    function toDate(number) {
      var n = number * 1000;
      var date = new Date(n);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    }  
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  
    that.home=function(){
       console.log(that.data.location)
     console.log(that.data.city_id2)
      // if(that.data.city_id2==undefined){

       
        if(options.id==undefined){
        
          city_id2 = that.data.city_id2;
         
        }else{
          city_id2 = options.id
         
        }
       
      //}
      
      wx.request({
        url: 'https://www.chinascw.net/xcx/index',
        data: {
         
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
       
        //  一级广告栏
      var bannerData=res.data.banner;
      var banner=[]
      bannerData.map((item,index)=>{
       banner.push(item)
       })
   //二级广告栏
      var banner1Data = res.data.banner2[0];
      var banner1 = []
      banner1Data.map((item, index) => {
        banner1.push(item)
      })
      var banner2Data = res.data.banner2[1];
      var banner2 = []
      banner2Data.map((item, index) => {
        banner2.push(item)
      })
      //三级广告栏
      var banner3Data = res.data.banner3[0];
      var banner3 = []
      banner3Data.map((item, index) => {
        banner3.push(item)
      })
      var banner4Data = res.data.banner3[1];
      var banner4= []
      banner4Data.map((item, index) => {
        banner4.push(item)
      })
      var banner5Data = res.data.banner3[2];
      var banner5= []
      banner5Data.map((item, index) => {
        banner5.push(item)
      })
          // 导航栏
          var mobileNav = res.data.mobileFunction;
          var nav = [];
          for (var i = 0; i < mobileNav.length; i++) {
            nav.push(mobileNav[i]);
          }
          //头条
          var toutiaoData = res.data.toutiao;
          var toutiao = [];
          for (var i = 0; i < toutiaoData.length; i++) {
            toutiao.push(toutiaoData[i]);
          }
          //新闻咨询
          var zixunData = res.data.news;
          var zixun = [];
          for (var i = 0; i < zixunData.length; i++) {
            if (i < 3) {
              zixunData[i].create_time = toDate(zixunData[i].create_time);//转换时间戳
              zixun.push(zixunData[i]);

            }
          }
          //石材种类
          var stoneCateData = res.data.stoneCate;
          var stoneCate = [];
          for (var i = 0; i < stoneCateData.length; i++) {
            stoneCate.push(stoneCateData[i]);
          }
     
          that.setData({
            nav: nav,
            toutiao: toutiao,
            zixun: zixun,
            stoneCate: stoneCate,
            banner: banner,
            banner1: banner1,
            banner2: banner2,
            banner3: banner3,
            banner4: banner4,
            banner5: banner5,
            city_id2:city_id2
          });



        }
      })
     
      wx.request({
        url: 'https://www.chinascw.net/xcx/index',
        data: {
          city_id: city_id2
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // //商家咨询
          var shOpData = res.data.zixun;
          var shopZx = [];
          for (var i = 0; i < shOpData.length; i++) {
            shopZx.push(shOpData[i]);
          }
          try {
            shOpData == null
          } catch (err) {
            var shopZx = [];
            for (var i = 0; i < shOpData.length; i++) {
              shopZx.push(shOpData[i]);
            }
          }
          that.setData({
            shopZx: shopZx,
          
          })
        }
      })
    }
 
  },
  getUserInfo: function(e) {
   
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function (options) {
    if (this.options.id == undefined) {
      this.getLocation();
       this.home()
    }
  
  },
   getLocation: function () {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          success: res => { 
            console.log(res.data)
            var resData=" ";
            resData=res.data.result.ad_info.province;
            that.setData({
              resData:res.data,
            })
         
           
            wx.request({
              url: "https://www.chinascw.net/xcx/index/provinces",
              data: {
                data:resData
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success:res =>{
               console.log(res )
         
               that.setData({
               location: res.data.province.name,//获取的省份
               city_id2: res.data.province.city_id,//省份id
               
               })
            
               appInstance.globalData.defaultCity = that.data.location;//添加到公共城市
               appInstance.globalData.defaultId=that.data.city_id2;
               that.home();
             
               
               },
             
               
            })

          }

        })
      }
       
    })
   
  },
 
  onShow: function () {
    this.home();//每次触发加载页面
     this.setData({
      location: appInstance.globalData.defaultCity,
     //city_id2: appInstance.globalData.defaultId
    })
  },
})
