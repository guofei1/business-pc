import Vue from 'vue'
export default Vue.filter('timeformate', function (value, formate = 'yyyy/mm/dd hh:ii:ss') {
    let timestamp = value * 1000
    let myDate = new Date(timestamp)
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)
    let day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    let hours = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
    let minutes = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
    let seconds = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
    let nowstring = formate.replace('yyyy', year)
    nowstring = nowstring.replace('mm', month)
    nowstring = nowstring.replace('dd', day)
    nowstring = nowstring.replace('hh', hours)
    nowstring = nowstring.replace('ii', minutes)
    nowstring = nowstring.replace('ss', seconds)
    return nowstring
})
