var phoneNum = localStorage.getItem('phoneNum');
var companyId = localStorage.getItem('companyId');
var thePage = 1; 
var number = 10; //每一页的条数
//公司请示接口
var request_url = 'http://121.42.29.124/workoa/index.php?s=/Api/Shenpi/getspreceivid/';
//公司财务接口
var finance_url = 'http://121.42.29.124/workoa/index.php?s=/Api/Caiwu/getcaiwushenpiid/';
/**
 * 下拉具体业务的实现
 */
function pullDownGetData() { 
	var table = document.body.querySelector('.mui-table-view');
	thePage = 1;
	mui.ajax(request_url, {
		data: {
			companyid: companyId,
			userid: phoneNum,
			page: thePage,
			num: number,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast(data.msg); 
			var table = document.getElementById('request');
			table.innerHTML = "";
			//mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var result = data.result;
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.id=result[i].id;
					li.innerHTML = '<img class="img" src="' + result[i].iconpath + '" onerror="imgerror(this)"/>' +
						'<div class="content"><p><div class="name">' + result[i].uploadername + '</div><div class="date">' + result[i].date + '</div></p><p class="vacation">' + result[i].type + '</p></div>' +
						'<button class="mui-btn mui-btn-primary mui-btn-outlined">' + result[i].replycount + '回复</button>';
					table.appendChild(li);
				}
			}

		}
	});
	mui.ajax(finance_url, {
		data: {
			shenpiuserid:phoneNum,
			companyid: companyId,
			page: thePage,
			num: number,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			//mui.alert(JSON.stringify(data));
			mui.toast(data.msg);
			var table = document.getElementById('finance');
			table.innerHTML = "";
		//	mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var result = data.result; 
				for(var i = 0; i < result.length; i++) {
					var status;
					if(result[i].status == "30") {
						status = "未通过";
					} else if(result[i].status == "20") {
						status = "通过";
					}else{
						status="审核中";
					}
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.id=result[i].id;
					li.innerHTML = '<img class="img" src= "' + result[i].fabupersonlogo + '" onerror="imgerror(this)"/>' +
						'<div class="content"><p><div class="name">' + result[i].username + '</div>' +
						'<div class="date">' + result[i].writetime + '</div></p>' +
						'<p class="vacation">' + result[i].typename + '</p></div>' +
						'<button class="mui-btn mui-btn-primary mui-btn-outlined">' + status + '</button>'
					table.appendChild(li);
				}
			}

		}

	});
}

function pullUpGetData() {
	var table = document.body.querySelector('.mui-table-view');
	thePage++;
	//这个接口有问题，返回值是300   郭梦娜-2016-07-25-获得公司日报接口-		
	mui.ajax(request_url, { 
		data: {
			companyid: companyId,
			userid: phoneNum,
			page: thePage,
			num: number,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) { 
			//mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var result = data.result;
				var table = document.getElementById('request');
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.id=result[i].id;
					li.className = 'mui-table-view-cell';
					li.innerHTML = '<img class="img" src="' + result[i].iconpath + '" onerror="imgerror(this)"/>' +
						'<div class="content"><p><div class="name">' + result[i].uploadername + '</div><div class="date">' + result[i].date + '</div></p><p class="vacation">' + result[i].type + '</p></div>' +
						'<button class="mui-btn mui-btn-primary mui-btn-outlined">' + result[i].replycount + '回复</button>';
					table.appendChild(li);
				}
			}

		}

	});
	mui.ajax(finance_url, {
		data: {
			companyid: companyId,
			shenpiid:phoneNum,
			page: thePage,
			num: number,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) { 
			//mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var result = data.result;
				var table = document.getElementById('finance');
				for(var i = 0; i < result.length; i++) {
					var status;
					if(result[i].status == "30") {
						status = "未通过";
					} else if(result[i].status == "20") {
						status = "通过";
					}else{
						status="审核中";
					}
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.id=result.id;
					li.innerHTML = '<img class="img" src= "' + result[i].fabupersonlogo + '" onerror="imgerror(this)"/>' +
						'<div class="content"><p><div class="name">' + result[i].username + '</div>' +
						'<div class="date">' + result[i].writetime + '</div></p>' +
						'<p class="vacation">' + result[i].typename + '</p></div>' +
						'<button class="mui-btn mui-btn-primary mui-btn-outlined">' + status + '</button>'
					table.appendChild(li);
				}
			}

		}

	});
}
function imgerror(img){
				img.src="../../images/Assets.xcassets/card.imageset/card@2x.png";
				img.onerror=null;
			}