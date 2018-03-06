/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2017-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */


function renderChart() {
  var place = document.getElementsByClassName("aqi-chart-wrap")[0];
  var color = '',text = '';
  for (var item in chartData) {
    color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    text += '<div title="'+item+":"+chartData[item]+'" style="height:'+chartData[item]+'px; background-color:'+color+'"></div>';
}
  place.innerHTML = text;
//画图
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  var newtime = e.target.getAttribute("value");
  pageState.nowGraTime = newtime;
  initAqiChartData();
  renderChart();

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  var newcity = e.target.value;//option有没有value？
  pageState.nowSelectCity = newcity;
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var time = document.getElementsByName("gra-time");
  for(var k= 0; k < time.length;k++)
  {

    time[k].setAttribute("click",function(){return graTimeChange(event);});
}

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var citys = document.getElementById("city-select");

  for(var city in aqiSourceData)
  {
    var e = document.createElement("option");
    var name = document.createTextNode(city);
    e.appendChild(name);
    citys.appendChild(e);
  }
  citys.setAttribute("click",function(){return citySelectChange(event);});

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {//???如何处理这个获取周！！！
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var scity = pageState.nowSelectCity;
  var stime = pageState.nowGraTime;
  var alldata = aqiSourceData[scity];
  if(scity == -1)
    return;
  switch(stime){
    case "day":
      chartData = alldata;
    case "week":
     // var allweekdata = {}; 
      var count = 0;
      var weeked = 1;
      var tag = 0;
      var every = 0; 
      chartData["第"+ weeked +"周"] = alldata["2017-01-01"];
      weeked++;
      for(var everd in alldata)
      {
        if(tag == 0)
          tag++;
        else
        {
          every += alldata[everd];
          if(count == 6)
          {
            
             every /= 7;
             chartData["第"+ weeked +"周"] = alldata[everd];
             weeked++;
             every = 0;
             count = -1;

          }
          count++;
        }
      }

    case "month":
      var amonth = 0;
      var lastmonth = "01";
      var days = 1;
      for(var aday in alldata)
      {
        if(aday.substring(5,7) != lastmonth)
        {
          chartData[lastmonth+"月"] = amonth/days;
          lastmonth = aday.substring(5,7);
          days = 0;
          amonth = 0;
        }
        days++;
        amonth += alldata[aday];
      }

 }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();