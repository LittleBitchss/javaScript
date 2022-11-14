let base = 'https://qunyan.canancn.com/index.php/api'

function fetchData(url,data,method="GET"){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: base+url,
      method,
      header:{
        // 'X-LC-Id': '自己的id', 
        // 'X-LC-Key': ' 自己的key', 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data,
      success:(res)=>{
        resolve(res)    //此处的res会交给then
      },
      fail:(err)=>{
        reject(err)  //此处的err会交给catch
      }
    })
  }).catch((e) => {
    wx.navigateTo({
      url: '/pages/error/error',
    })
  })
}

function upload(tempFilePath, file){
  return new Promise((resolve,reject)=>{
    wx.uploadFile({
      url: 'https://qunyan.canancn.com/index.php/api/uploads/upload',
      filePath: tempFilePath,
      name: 'file',
      formData: {
        'savepath': '/uploads/chef/photoRecord/' + file
      },
      success(res) {
        if(res.statusCode == 200){
          resolve(JSON.parse(res.data))
        }else{
          reject(res) 
        }
      },
      fail:(err)=>{
        reject(err)  //此处的err会交给catch
      }
    })
  }).catch((e)=>{
    // wx.navigateTo({
    //   url: '/pages/error/error',
    // })
  })
}
function post(url,data={}){
  return fetchData(url,data,'POST')
}

function get(url,data={}){
  return fetchData(url,data,'GET')
}

module.exports = {
  fetchData,
  upload,
  post,
  get
}