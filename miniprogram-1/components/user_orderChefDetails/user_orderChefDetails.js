// components/user_orderChefDetails/user_orderChefDetails.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chefs:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr:[1,2,3],
    active1:'active',
    active2:'',
    star: [{
      stars: [app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png"]
    }],
    grade: [{
      code: '1',
      name: '初级(国家职业资格五级)'
    }, {
      code: '2',
      name: '中级(国家职业资格四级)'
    }, {
      code: '003',
      name: '高级(国家职业资格三级)'
    }, {
      code: '4',
      name: '技师(国家职业资格二级)'
    }, {
      code: '5',
      name: '高级技师(国家职业资格一级)'
    }],
    toView: '',
    isShow:false,
    chefArr:[],
    cuisine:[],
    chef_id:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    taggle(e){
      var item = e.currentTarget.dataset.item
      if(item==1){
        this.setData({
          active1:'active',
          active2:'',
          isShow:1,
          toView: 'yuyue'
        })
      }else if(item==2){
        this.setData({
          active1:'',
          active2:'active',
          isShow:2,
          toView: 'renzheng'
        })
      }
    },
    handelScroll(e){
      if(e.detail.scrollTop>=311){
        this.setData({
          isShow:true
        })
      }else{
        this.setData({
          isShow:false,
          active1:'active',
          active2:'',
        })
      }
    },
  },
  lifetimes: {
    attached() {
      console.log(this.data.chefs);
      // try {
      //   app.post('/region/getProvince', {
      //     province_code: 0
      //   }).then(res => {
      //     if (res.data.status == 1) {
      //       this.setData({
      //         province: res.data.data
      //       })
      //     }
      //   }).then(res => {
      //     app.post('/region/getCity', {
      //       province_code: this.data.chefs.chef_province
      //     }).then(res => {
      //       if (res.data.status == 1) {
      //         this.setData({
      //           city: res.data.data
      //         })
      //       }
      //     }).then(res => {
      //       app.post('/region/getAreas', {
      //         city_code: this.data.chefs.chef_city
      //       }).then(res => {
      //         if (res.data.status == 1) {
      //           this.setData({
      //             area: res.data.data
      //           })
      //         }
      //       }).then(res => {
      //         app.post('/region/getStreets', {
      //           area_code: this.data.chefs.chef_area
      //         }).then(res => {
      //           if (res.data.status == 1) {
      //             this.setData({
      //               street: res.data.data
      //             })
      //           }
      //         }).then(res => {
      //           app.post('/region/getVillage', {
      //             street_code: this.data.chefs.chef_street
      //           }).then(res => {
      //             if (res.data.status == 1) {
      //               this.setData({
      //                 village: res.data.data
      //               })
      //             }
      //           }).then(res => {
      //             var chef = JSON.parse(JSON.stringify(this.data.chefs))
      //             var province = this.data.province.find(i=>i.code == this.data.chefs.chef_province).name+'，'
      //             var city = this.data.city.find(i=>i.code == this.data.chefs.chef_city).name+'，'
      //             var area = this.data.area.find(i=>i.code == this.data.chefs.chef_area).name+'，'
      //             var street = this.data.street.find(i=>i.code == this.data.chefs.chef_street)?this.data.street.find(i=>i.code == this.data.chefs.chef_street).name+'，':''
      //             var village = this.data.village.find(i=>i.code == this.data.chefs.chef_village)?this.data.village.find(i=>i.code == this.data.chefs.chef_village).name+'，':''
      //             var region=(province+city+area+street+village)
      //             chef.region = region.slice(0,region.length-1)
      //             this.setData({
      //               chef: chef
      //             })
      //           })
      //         })
      //       })
      //     })
      //   })
      // } catch {
      //   wx.showToast({
      //     title: '网络不稳定~',
      //     icon: 'error',
      //     duration: 1000 //持续的时间
      //   })
      // }
    }
  }
})