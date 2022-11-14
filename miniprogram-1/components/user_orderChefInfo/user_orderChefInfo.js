// components/user_orderChefInfo/user_orderChefInfo.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chefs:Array,
    m_id:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    domain: app.domain + "/img/chef/",
    stars: [app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"],
    grades: [{
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
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkChef(e) {
      var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '/tertiary/pages/mine_chefInfo/index?chef_id='+this.data.chefs[index].chef_id+'&m_id='+this.data.m_id
      })
    }
  },

  lifetimes: {
    attached() {
    },
    detached() {

    },
  }
})