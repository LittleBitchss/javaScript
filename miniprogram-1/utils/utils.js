const formatTime = time => {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const getTimeLastWeek = days => {
  // var last = Date.parse(last)
  var last = new Date(days-(86400000*30))
  const year = last.getFullYear()
  const month = last.getMonth()  + 1
  const day = last.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const getTimeLastWeeks = (lat,days) => {
  var last = Date.parse(lat)
  var lasts = new Date(last+(86400000*days))
  const year = lasts.getFullYear()
  const month = lasts.getMonth()  + 1
  const day = lasts.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getTimeLastWeek: getTimeLastWeek, 
  getTimeLastWeeks:getTimeLastWeeks
}