// secondary/pages/user_review/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        m_id: "",
        score: 0,
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
        areaValue: '',
        sourceType: [
            'camera', 'album'
        ],
        review: []
    },
    score(e) {
        var index = e.currentTarget.dataset.index
        this.setData({
            score: index + 1,
        })
    },
    inputs(e) {
        var value = e.detail.value
        this.setData({
            areaValue: value
        })
    },
    // 添加img
    addImg() {
        const that = this
        //调用微信上传照片的方法
        wx.showActionSheet({
            itemList: ['拍照', '相册'],
            itemColor: "#f7982a",
            //成功时回调
            success(res) {
                if (!res.cancel) {
                    //调用相册或者照相的方法，传参INDEX 
                    that.chooseImage(res.tapIndex)
                }
            },
            //失败时回调
            fail(res) {
                console.log('调用失败');
            }
        })
    },
    //打开相册或者照相的方法
    chooseImage(tapIndex) {
        const that = this
        var review = JSON.parse(JSON.stringify(that.data.review))
        //调用微信方法 打开相册或者照相的功能
        wx.chooseMedia({
            count: 9,
            mediaType: ["mix"],
            sizeType: ['compressed'],
            //根据下标选择data数据，以此判断是拍照还是相册
            sourceType: [that.data.sourceType[tapIndex]],
            success(res) {
                res.tempFiles.forEach(i => {
                    try {
                        app.upload(i.tempFilePath, 'userScore' + that.data.m_id).then(res => {
                            if (res.status == 1) {
                                review.push(res.data.fullurl)
                            } else {
                                wx.showToast({
                                    title: '当前系统繁忙',
                                    icon: 'error',
                                    duration: 1000 //持续的时间
                                })
                            }
                            that.setData({
                                review: review
                            })
                        })
                    } catch {
                        wx.showToast({
                            title: '网络不稳定~',
                            icon: 'error',
                            duration: 1000 //持续的时间
                        })
                    }
                })
            }
        })
    },
    remove(e) {
        var index = e.currentTarget.dataset.index
        var review = JSON.parse(JSON.stringify(this.data.review))
        review.splice(index, 1)
        this.setData({
            review: review
        })
    },
    submitReview() {
        var obj={
            score: this.data.score,
            areaValue: this.data.areaValue,
            review: this.data.review,
        }
        if(obj.score){
            console.log(obj);
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '评论',
        })
        console.log(options.m_id);
        this.setData({
            m_id: options.m_id
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})