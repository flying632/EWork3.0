window.onload = pullDownGetData(1);
var phoneNum = localStorage.getItem('phoneNum');

function pullDownGetData(thePage) {
	mui.ajax("http://121.42.29.124/workoa/index.php?s=/Api/renwu/searchrenwu", {
		data: {
			userid: phoneNum,
			condition: '',
			page: thePage,
			datatime: getDate(),
			flag: 1,
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
		//mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var list = document.getElementById('table');
				list.innerHTML = "";
				for(var i = 0; i < data.result.length; i++) {
					var weidurenwushu = data.result[i].weidu_list.length;

					var item = document.createElement("li");
					item.className = 'mui-table-view-cell';
					item.id = data.result[i].renwuid;

					//显示top div 头像，名字，时间，和确认按钮
					var top = document.createElement("div");
					top.setAttribute("class", "top");
					var headimage = document.createElement("img");
					headimage.setAttribute("src", data.result[i].personlogo);
					headimage.setAttribute('onerror','imgerror(this)');
					top.appendChild(headimage);

					var information = document.createElement("div");
					information.setAttribute("class", "information");
					var name = document.createTextNode(data.result[i].name);
					information.appendChild(name);

					var datetime = document.createElement("span");
					datetime.setAttribute("class", "date");
					var fabudate = data.result[i].fabudate.split(" ")[0];
					var year = fabudate.split("-")[0];
					var index = fabudate.split("-")[1].indexOf('0');
					if(index == 0) {
						var month = fabudate.split("-")[1].substring(1);
					} else {
						var month = fabudate.split("-")[1];
					}
					var date = fabudate.split("-")[2];
					datetime.innerHTML = year + "年" + month + "月" + date + "日";
					information.appendChild(datetime);

					//未确认或进行中或已结束的按钮
					var button = document.createElement("button");
					button.setAttribute("id", "receive");

					var jieshou_flag = false;
					var jieshou_list = data.result[i].yidu_list;
					for(var k = 0; k < jieshou_list.length; k++) {
						if(jieshou_list[k].jieshouzheid == phoneNum) { //之后得把userid传过来
							jieshou_flag = true;
							break;
						}
					}
					var flag = data.result[i].flag;
					if(data.result[i].renwushuxing == 20 && !jieshou_flag) { //不是自己发布的 是参与的 而且还没有确认收到
						button.setAttribute("class", "mui-btn mui-btn-yellow mui-pull-right mui-btn-nav mui-btn-outlined");
						button.innerHTML = "未确认";
					} else if(data.result[i].renwushuxing == 10 || (data.result[i].renwushuxing == 20 && jieshou_flag)) { //是自己发布的
						button.setAttribute("class", "mui-btn mui-btn-primary mui-pull-right mui-btn-nav mui-btn-outlined");
						if(flag == 10) {
							button.innerHTML = "进行中";
						} else {
							button.innerHTML = "已结束";
						} 
					}
					//显示有几人确认
					var queren_list = document.createElement("div");
					queren_list.setAttribute("id", "queren_list");
					if(data.result[i].flag!=50){
						var weidu = document.createTextNode("有" + weidurenwushu + "人未确认");
						queren_list.appendChild(weidu);
					} 
					top.appendChild(button); 
					top.appendChild(information); 
					item.appendChild(top);
					

					//显示内容的div
					var content = document.createElement("div");
					content.setAttribute("class", "small_content");
					var div = document.createElement("div");
					var text = document.createTextNode(data.result[i].content);
					div.appendChild(text);
					content.appendChild(div);

					//显示任务的图片的
					var picture = document.createElement("p");
					picture.setAttribute("class", "picture");
					if(data.result[i].photourls.length == 1) {
						var image = document.createElement("img");
						image.setAttribute("src", data.result[i].photourls[0].renwupic);
						image.style.width = '80%';
						image.setAttribute("data-preview-src", "");
						image.setAttribute("data-preview-group", "1");
						picture.appendChild(image);
					} else {
						for(var j = 0; j < data.result[i].photourls.length; j++) {
							var image = document.createElement("img");
							image.setAttribute("src", data.result[i].photourls[j].renwupic);
							image.setAttribute("data-preview-src", "");
							image.setAttribute("data-preview-group", "1");
							picture.appendChild(image);
						}
					}
					content.appendChild(picture);
					item.appendChild(content); 
					item.appendChild(queren_list);
					list.appendChild(item);
				}
			}
		}
	});
}

function pullUpGetData(thePage) {
	mui.ajax("http://121.42.29.124/workoa/index.php?s=/Api/renwu/searchrenwu", {
		data: {
			userid: phoneNum,
			condition: '',
			page: thePage,
			datatime: getDate(),
			flag: 2,
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			if(data.flag == 200) {
				var list = document.getElementById('table');
				for(var i = 0; i < data.result.length; i++) {

					var item = document.createElement("li");
					item.setAttribute("class", "mui-table-view-cell");
					item.id = data.result[i].renwuid;

					//显示top div 头像，名字，时间，和确认按钮
					var top = document.createElement("div");
					top.setAttribute("class", "top");
					var headimage = document.createElement("img");
					headimage.setAttribute("src", data.result[i].personlogo);
					headimage.setAttribute('onerror','imgerror(this)');
					top.appendChild(headimage);

					var information = document.createElement("div");
					information.setAttribute("class", "information");
					var name = document.createTextNode(data.result[i].name);
					information.appendChild(name);

					var datetime = document.createElement("span");
					datetime.setAttribute("class", "date");
					var fabudate = data.result[i].fabudate.split(" ")[0];
					var year = fabudate.split("-")[0];
					var index = fabudate.split("-")[1].indexOf('0');
					if(index == 0) {
						var month = fabudate.split("-")[1].substring(1);
					} else {
						var month = fabudate.split("-")[1];
					}
					var date = fabudate.split("-")[2];
					datetime.innerHTML = year + "年" + month + "月" + date + "日";
					information.appendChild(datetime);

					//未确认或进行中或已结束的按钮
					var button = document.createElement("button");
					button.setAttribute("id", "receive");
					var flag = data.result[i].flag;
					var weidurenwushu = data.result[i].weidurenwushu;
					if(data.result[i].renwushuxing == 20) { //不是自己发布的 是参与的
						button.setAttribute("class", "mui-btn mui-btn-yellow mui-pull-right mui-btn-nav mui-btn-outlined");
						button.innerHTML = "未确认";
					} else if(data.result[i].renwushuxing == 10) { //是自己发布的
						button.setAttribute("class", "mui-btn mui-btn-primary mui-pull-right mui-btn-nav mui-btn-outlined");
						if(flag == 10) {
							button.innerHTML = "进行中";
						} else {
							button.innerHTML = "已结束";
						}
					 
					}
					//显示有几人确认
					var queren_list = document.createElement("div");
					queren_list.setAttribute("id", "queren_list");
					if(data.result[i].flag!=50){
						var weidu = document.createTextNode("有" + weidurenwushu + "人未确认");
						queren_list.appendChild(weidu);
					} 
					top.appendChild(button);
					top.appendChild(information);
					item.appendChild(top);

					//显示内容的div
					var content = document.createElement("div");
					content.setAttribute("class", "small_content");
					var div = document.createElement("div");
					var text = document.createTextNode(data.result[i].content);
					div.appendChild(text);
					content.appendChild(div);

					//显示任务的图片的
					var picture = document.createElement("p");
					picture.setAttribute("class", "picture");
					if(data.result[i].photourls.length == 1) {
						var image = document.createElement("img");
						image.setAttribute("src", data.result[i].photourls[0].renwupic);
						image.style.width = '80%';
						picture.appendChild(image);
					} else {
						for(var j = 0; j < data.result[i].photourls.length; j++) {
							var image = document.createElement("img");
							image.setAttribute("src", data.result[i].photourls[j].renwupic);
							image.setAttribute("data-preview-src", "");
							image.setAttribute("data-preview-group", "1");
							picture.appendChild(image);
						}
					}
					content.appendChild(picture);
					item.appendChild(content);
  					item.appendChild(queren_list);
					list.appendChild(item);
				}
			}
		}
	});
}

function getDate() {
	var date = new Date();
	var token = '-';
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if(month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if(day >= 1 && day <= 9) {
		day = '0' + day;
	}
	var currentDate = date.getFullYear() + token + month + token + day;
	return currentDate;
}
function imgerror(img){
				img.src="../../images/Assets.xcassets/card.imageset/card@2x.png";
				img.onerror=null;
			}