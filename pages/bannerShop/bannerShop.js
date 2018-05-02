
//获取应用实例 
var app = getApp()
Page({
  data: {
    autoplay: true,
    interval: "5000",
    duration: "1000",
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    loading:true,
    hidden:false
  },
  onLoad: function (options) {
    var that = this;
    that.swichNav = function (e) {

      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        this.setData({
          currentTab: e.target.dataset.current
        })
      }

    }

    wx.request({
      url: "https://www.chinascw.net/xcx/shop/detail",
      data: {
        shop_id: options.orderby,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        var detailData = res.data.detail;
        var detail = [];
        for (var i = 0; i < detailData.length; i++) {
          detail.push(detailData[i]);
        }
        var picData = detailData[0].pic;
        console.log(picData[0].photo);
        var pic = [];
        for (var i = 0; i < picData.length; i++) {
          pic.push(picData[i]);
        }
        var productData = res.data.goods;
        var shopProdct = [];
        for (var i = 0; i < productData.length; i++) {
          if (i < 6) {
            shopProdct.push(productData[i]);
          }

        }
        // if (res.data.case !== null) {
        //   var cases = [];

        //   for (var i = 0; i < res.data.case.length; i++) {
        //     cases.push(res.data.case[i]);
        //   }
        //   that.setData({
        //     cases: cases
        //   })
         
        // } else{
        //   wx.showToast({ title: "亲，没有案列", duration: 5000 })
        //   return false;
        // }
          
        
        
      
      

        var shopProdct1 = [];
        for (var i = 0; i < productData.length; i++) {

          shopProdct1.push(productData[i]);


        }
        that.setData({
          detail: detail,
          pic: pic,
          shopProdct: shopProdct,
          shopProdct1: shopProdct1,
          hidden:true
        })
      }
    })


    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },
  call: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel, //此号码并非真实电话号码，仅用于测试 
      success: function (res) {
        console.log("拨打电话成功！");
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  tapBanner: function (e) {//图片放大功能
    console.log(e)
    //图片预览
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  proBig: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  titleBig:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  // swichNav: function (e) {


  // },

})


