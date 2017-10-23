/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
//var lastdelid = 0;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input");
	var cityname = city.value.trim();
	var temp = document.getElementById("aqi-value-input");
	var citydata = temp.value.trim();
	//console.log(citydata.trim())
	var cn = /^[\u4e00-\u9fa5a-zA-Z\/\(\)]+$/; 
	var d = /^[0-9]*[1-9][0-9]*$/;
	if(!cn.test(cityname))// "/[a-zA-z\u4E00-\u9FA5]/* ")
	{
		alert("城市名只可是中英文！");
		return 1;
	}
	if(! d.test(citydata) )
		{
		  alert("指数只可是正整数！");//use decimal test and fushu  以后来修改错误提示！！！！
		  //document.write("温度只可是整数！")
		  //temp.value ="温度只可是整数!";
		  return 1;
		}
	
	
	aqiData[cityname] = citydata;

	return 0;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var weathertable = document.getElementById("aqi-table");
	var dataindex = Object.keys(aqiData);
	weathertable.innerHTML = "";
	for(var name in aqiData)
	{
		if(!weathertable.hasChildNodes())
			weathertable.innerHTML = "<tr> <td>城市</td><td>空气质量</td><td>操作</td> </tr>";
		var colomn = document.createElement("tr");
		var row = [name,aqiData[name],"删除"];
		for(var i = 0 ; i < 3 ; i++)
		{
			var name1 = document.createElement("td");
			var text = document.createTextNode(row[i]);
			console.log(row[i]);
			// if(i == 0)
			// {
			// 	name1.setAttribute("id","")
			// }
			if(i == 2)
			{
				var bt = document.createElement("button");
				bt.setAttribute("Class","del");
				bt.appendChild(document.createTextNode(row[i]));
				name1.appendChild(bt);
			}
			else
				name1.appendChild(text);
			colomn.appendChild(name1);
		}
		weathertable.appendChild(colomn);

	}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
 
  var b = addAqiData();
  if(b == 0)
  {
	  renderAqiList();
	  clearinput();
	}
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  //console.log(event.srcElement);
  //var deltr = e.target.parentNode.parentNode;
  //alert(e.target.tagName);
  if(e.target.tagName == "BUTTON")
  {
	  var delciname = e.target.parentNode.previousSibling.previousSibling;
	  console.log(delciname.innerHTML);
	  delete aqiData[delciname.innerHTML];
	  renderAqiList();
  }
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var yesbutton = document.getElementById("add-btn");
  yesbutton.addEventListener("click",addBtnHandle,false) ;
  //yesbutton.onclick = addBtnHandle;

  
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 var delbuttons = document.getElementById("aqi-table");
 //console.log(delbuttons.length);
 //for(var j = 0 ; j < delbuttons.length ;j++)
 delbuttons.addEventListener("click",function(){return delBtnHandle(event);},false);

}

function clearinput() {

	document.getElementById("aqi-city-input").value = "";
	document.getElementById("aqi-value-input").value  = "";
}
init();