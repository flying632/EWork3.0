var phoneNum = localStorage.getItem('phoneNum');
var companyId = localStorage.getItem('companyId');
var thePage = 1;
var companyId;
var number = 10; //每一页的条数
var url = 'http://121.42.29.124/workoa/index.php?s=/Api/Shenpi/getspuserid/';
/**
 * 下拉具体业务的实现
 */
function pullDownGetData() {
	var table = document.body.querySelector('.mui-table-view');
	thePage = 1;
	//这个接口有问题，返回值是300   郭梦娜-2016-07-25-获得公司日报接口-		
	mui.ajax(url, {

		data: {
			companyid: companyId, //先以刘老师的companyid为例
			userid: phoneNum, //不知道是啥，获取的信息中没有
			page: thePage,
			num: number,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast(data.msg);
			localStorage.setItem("requestData",JSON.stringify(data));
			//mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var result = data.result;
				var table = document.getElementById('table');
				table.innerHTML = "";
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.id=result[i].requestid;
					li.innerHTML = '<img class="img" src="' + result[i].iconpath + '" onerror="imgerror(this)" />' +
						'<div class="content"><p><div class="name">' + result[i].uploadername + '</div><div class="date">' + result[i].date + '</div></p><p class="vacation">' + result[i].type + '</p></div>' +
						'<button class="mui-btn mui-btn-primary mui-btn-outlined">' + result[i].replycount + '回复</button>';
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
	mui.ajax(url, {

		data: {
			companyid: companyId, //先以刘老师的companyid为例
			userid: phoneNum, //不知道是啥，获取的信息中没有
			page: thePage,
			num: number,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast(data.msg);
			localStorage.setItem("requestData",JSON.stringify(data));
			//mui.alert(JSON.stringify(data));
			if(data.flag == 200) {
				var result = data.result;
				var table = document.getElementById('table'); 
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.id=result[i].requestid;
					li.innerHTML = '<img class="img" src="' + result[i].iconpath + '" onerror="imgerror(this)"/>' +
						'<div class="content"><p><div class="name">' + result[i].uploadername + '</div><div class="date">' + result[i].date + '</div></p><p class="vacation">' + result[i].type + '</p></div>' +
						'<button class="mui-btn mui-btn-primary mui-btn-outlined">' + result[i].replycount + '回复</button>';
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