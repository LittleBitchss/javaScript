// components/linkage/linkage.js
const app = getApp()
Component({
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 公用列表数据
    list: [],
    // 获取的列表数组
    area: {
      province: [],
      city: [],
      area: [],
      address: [],
      community: []
    },
    // 地址code
    provinceCode: '',
    cityCode: '',
    areaCode: '',
    addressCode: '',
    communityCode: '',
    // 选择按钮
    selectNum: 0,
    // 地址名称
    provinceName: '',
    cityName: '',
    areaName: '',
    addressName: '',
    communityName: '',
    // 判断是否还有下一级
    isHaveSubset: true,
    // 外部使用的数据包，如需使用地址数据请，在外部定义后直接调用this.data.addressObj即可
    addressObj: {
      province: '',
      city: '',
      area: '',
      address: '',
      community: '',
      list: [],
    },
    // 请求函数通道
    getBol: false
  },
  /*
   *组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached: function () {
    this.getProvince();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pass(obj){
      obj.addressObj.list.forEach(function (item) {
        if (item.code == obj.addressObj.community.communityCode) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      })
      this.setData({
        list:obj.addressObj.list,
        provinceName: obj.addressObj.province.provinceName,
        cityName: obj.addressObj.city.cityName,
        areaName: obj.addressObj.area.areaName,
        addressName: obj.addressObj.address.addressName,
        communityName: obj.addressObj.community.communityName,
        provinceCode: obj.addressObj.province.provinceCode,
        cityCode: obj.addressObj.city.cityCode,
        areaCode: obj.addressObj.area.areaCode,
        addressCode: obj.addressObj.address.addressCode,
        communityCode: obj.addressObj.community.communityCode,
        addressObj:obj.addressObj,
        selectNum: 4,
        isHaveSubset: false,
      })
    },
    //隐藏弹框
    hideDialog() {
      this.setData({
        addressObj: {
          province: '',
          city: '',
          area: '',
          address: '',
          community: ''
        },
        provinceName: '',
        cityName: '',
        areaName: '',
        addressName: '',
        communityName: '',
        isHaveSubset:true,
        selectNum: 0
      })
    },
    //展示弹框
    showDialog() {
      // if(this.data.communityName){
      //   return false
      // }
      this.getProvince();
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent",{show:false});
    },
    _confirmEvent() {
      // 判断地址是否选择完毕
      if (this.data.isHaveSubset) {
        return false;
      }
      //触发成功回调
      this.triggerEvent("confirmEvent",{show:false});
    },
    /*
     * 公有方法
     */
    // 地址三级请求函数
    // 省
    getProvince() {
      var _this = this;
      app.post('/region/getProvince', {
        province_code: 0
      }).then((res) => {
        // 为所有的省添加checked
        res.data.data.forEach(function (item) {
          item.checked = false;
        })
        _this.data.area.province = res.data.data;
        _this.setData({
          area: _this.data.area,
          list: res.data.data
        })
      })
    },
    // 市 
    getCity() {
      var _this = this;
      app.post('/region/getCity', {
        province_code: this.data.provinceCode
      }).then((res) => {
        // 为所有的省添加checked
        res.data.data.forEach(function (item) {
          item.checked = false;
        })
        _this.data.area.city = res.data.data;
        _this.setData({
          area: _this.data.area,
          list: res.data.data
        })
      })
    },
    // 区
    getArea() {
      var _this = this;
      app.post('/region/getAreas', {
        city_code: this.data.cityCode
      }).then((res) => {
        // 为所有的省添加checked
        res.data.data.forEach(function (item) {
          item.checked = false;
        })
        _this.data.area.area = res.data.data;
        _this.setData({
          area: _this.data.area,
          list: res.data.data
        })
      })
    },
    // 街道
    getAddress() {
      var _this = this;
      app.post('/region/getStreets', {
        area_code: this.data.areaCode
      }).then((res) => {
        // 为所有的省添加checked
        res.data.data.forEach(function (item) {
          item.checked = false;
        })
        _this.data.area.address = res.data.data;
        _this.setData({
          area: _this.data.area,
          list: res.data.data
        })
      })
    },
    // 小区
    getCommunity() {
      var _this = this;
      app.post('/region/getVillage', {
        street_code: this.data.addressCode
      }).then((res) => {
        // 为所有的省添加checked
        res.data.data.forEach(function (item) {
          item.checked = false;
        })
        _this.data.area.community = res.data.data;
        _this.setData({
          area: _this.data.area,
          list: res.data.data
        })
      })
    },
    // 点击tab进行切换
    tabBtn(event) {
      // 判断点击的级别
      if (event.currentTarget.id == 1) {
        this.setData({
          // 更新列表
          list : this.data.area.province,
          // 更新点击框
          selectNum : 0
        })
      } else if (event.currentTarget.id == 2) {
        this.setData({
          // 更新列表
          list : this.data.area.city,
          // 更新点击框
          selectNum : 1
        })
      } else if (event.currentTarget.id == 3) {
        this.setData({
          // 更新列表
          list : this.data.area.area,
          // 更新点击框
          selectNum : 2
        })
      } else if (event.currentTarget.id == 4) {
        this.setData({
          // 更新列表
          list : this.data.area.address,
          // 更新点击框
          selectNum : 3
        })
      }
      this.setData({
        isHaveSubset: true
      })
    },
    // 点击地址进行选择处理
    selectBtn(event) {
      // 清空列表
      if (this.data.selectNum != 4) {
        this.setData({
          list: []
        })
      }
      // 判断当前的点击区域selectNum值 0：省。1：市。2：区。3：街道。
      if (this.data.selectNum == 0) {
        // 保存信息
        this.data.area.province.forEach(function (item) {
          if (item.code == event.currentTarget.dataset.item.code) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        })
        this.data.selectNum = 1;
        this.setData({
          provinceCode: event.currentTarget.dataset.item.code,
          list: this.data.area.community,
          selectNum: this.data.selectNum,
          provinceName: event.currentTarget.dataset.item.name
        })
        this.getCity();
      }
      // 市
      else if (this.data.selectNum == 1) {
        // 保存信息
        this.data.area.city.forEach(function (item) {
          if (item.code == event.currentTarget.dataset.item.code) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        })
        this.data.selectNum = 2;
        this.setData({
          cityCode: event.currentTarget.dataset.item.code,
          list: this.data.area.community,
          selectNum: this.data.selectNum,
          cityName: event.currentTarget.dataset.item.name
        })
        this.getArea();
      } else if (this.data.selectNum == 2) {
        // 保存信息
        this.data.area.area.forEach(function (item) {
          if (item.code == event.currentTarget.dataset.item.code) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        })
        this.data.selectNum = 3;
        this.setData({
          areaCode: event.currentTarget.dataset.item.code,
          list: this.data.area.community,
          selectNum: this.data.selectNum,
          areaName: event.currentTarget.dataset.item.name
        })
        // 判断是否还有下一级// 由于数据源不对等，有三级数据源，所以需要做数据重置处理以免造成返回数据叠加问题
        // if (!this.data.isHaveSubset) {
        //   this.setData({
        //     addressCode: '',
        //     addressName: '',
        //     communityName: '',
        //     communityCode: ''
        //   })
        // }
        this.getAddress();

      } else if (this.data.selectNum == 3) {
        // 保存信息
        this.data.area.address.forEach(function (item) {
          if (item.code == event.currentTarget.dataset.item.code) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        })
        this.data.selectNum = 4;
        this.setData({
          addressCode: event.currentTarget.dataset.item.code,
          list: this.data.area.community,
          selectNum: this.data.selectNum,
          addressName: event.currentTarget.dataset.item.name
        })
        // 由于数据源不对等，有三级数据源，所以需要做数据重置处理以免造成返回数据叠加问题
        this.setData({
          communityName: '',
          communityCode: ''
        })
        this.getCommunity();
      } else if (this.data.selectNum == 4) {
        // 保存信息
        this.data.area.community.forEach(function (item) {
          if (item.code == event.currentTarget.dataset.item.code) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        })
        this.setData({
          communityCode: event.currentTarget.dataset.item.code,
          selectNum: this.data.selectNum,
          list: this.data.area.community,
          communityName: event.currentTarget.dataset.item.name,
          isHaveSubset:  false
        })
      }

      this.setData({
        addressObj: {
          province: {
            'provinceName': this.data.provinceName,
            'provinceCode': this.data.provinceCode
          },
          city: {
            'cityName': this.data.cityName,
            'cityCode': this.data.cityCode
          },
          area: {
            'areaName': this.data.areaName,
            'areaCode': this.data.areaCode
          },
          address: {
            'addressName': this.data.addressName,
            'addressCode': this.data.addressCode
          },
          community: {
            'communityName': this.data.communityName,
            'communityCode': this.data.communityCode
          },
          list:this.data.list
        }
      })
    }
  }
})