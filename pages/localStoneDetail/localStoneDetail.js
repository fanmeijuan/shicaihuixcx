
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
    loading: true,
    hidden:false
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
   

    wx.request({
      url: "https://www.chinascw.net/xcx/goods/detail",
      data: {
        goods_id: options.goods_id,
      },
      success: function (res) {
      console.log(res.data)
        var detailData = res.data.detail;
        var detail = [];
          detail.push(detailData);
     var detailShop=res.data.shop;
     
        that.setData({
          detail: detailData,
          detailShop: detailShop,
          hidden: true

        })
      }
    })

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
  
  

})


