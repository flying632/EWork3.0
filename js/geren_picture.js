var thePage = 1;
var companyId = localStorage.getItem('companyId');
var this_phoneNum = localStorage.getItem('phoneNum');
//var url = 'http://121.42.29.124/workoa/index.php?s=/Api/Picture/getpicleader';
var url = 'http://121.42.29.124//workoa/index.php?s=/Api/Picture/getuserpicture';
 
 
function pullDownGetData() {
	thePage = 1;
	mui.ajax(url, {
		data: {
			companyid: companyId,
			userid: this_phoneNum,
			page: thePage,
			num: 10,
		},
		method: 'post',
		timeout: 1000,
		success: function(data) {
		//	mui.alert(JSON.stringify(data));
			mui.toast(data.msg);
			plus.nativeUI.closeWaiting();
			if(data.flag == 200) {
				var result = data.result;
				var scroll = document.getElementById('scroll');
				
				scroll.innerHTML = "";
				for(var i = 0;i<result.length;i++){
					var div = document.createElement('div');
					div.className = 'mui-card';
					div.setAttribute('id',result[i].id);
					div.innerHTML = '<div class="mui-card-header mui-card-media"><img src="'+result[i].personlogo+'" onerror="imgerror(this)"/>'+
									'<div class="mui-media-body">'+result[i].name+'<p>发表于'+result[i].writetime+'</p></div></div>'+
									'<div class="mui-card-content"><img src="'+result[i].picture+'" alt="" width="100%" /><div class="mui-card-content-inner">'+
									'<p style="color: #333;">'+result[i].content+'</p></div></div>'; 
					scroll.appendChild(div);
				}
			}
		},
		error() {
			mui.alert("查询出错");
		}
	});
}

function pullUpGetData() {
	thePage++;
	mui.ajax(url, {
		data: {
			companyid: companyId,
			userid: this_phoneNum,
			page: thePage,
			num: 10,
		},
		method: 'post',
		timeout: 1000,
		success: function(data) {
			mui.toast(data.msg);
			
			if(data.flag == 200) {
				var result = data.result;
				var scroll = document.getElementById('scroll'); 
				if(result.length = 0){
					mui.toast("已经到底了");
				}
				for(var i = 0;i<result.length;i++){
					var div = document.createElement('div');
					div.className = 'mui-card';
					div.setAttribute('id',result[i].id);
					div.innerHTML = '<div class="mui-card-header mui-card-media"><img src="'+result[i].personlogo+'" onerror="imgerror(this)"/>'+
									'<div class="mui-media-body">'+result[i].name+'<p>发表于'+result[i].writetime+'</p></div></div>'+
									'<div class="mui-card-content"><img src="'+result[i].picture+'" alt="" width="100%" /><div class="mui-card-content-inner">'+
									'<p style="color: #333;">'+result[i].content+'</p></div></div>'; 
					scroll.appendChild(div);
				}
			}
		},
		error() {
			mui.alert("查询出错");
		}
	});
}
function imgerror(img){
				img.src="../../images/Assets.xcassets/card.imageset/card@2x.png";
				img.onerror=null;
			}