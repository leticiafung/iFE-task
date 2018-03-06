var queue = [1,2,3];

//渲染界面
function render()
{
	var numtag = document.getElementById("queue");
	var temp ="";
	for(var k = 0 ;k < queue.length;k++)
	{
		var iden = "num"+k;
		temp += "<div id="+ iden + " style='background:red';'width:10px';'height:10px' >"+queue[k]+"</div>";
		//console.log(iden);

	}
	numtag.innerHTML =temp;
}
//接受输入

//为按钮绑定事件

//初始化
render();