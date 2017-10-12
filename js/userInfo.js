var companyId;
var this_phoneNum;
function getUserInfo() {
	this_phoneNum = localStorage.getItem('phoneNum');
	
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/Search/person_info', {
		data: {
			phoneNum: this_phoneNum,
			objectID: this_phoneNum,
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
//			var info = JSON.stringify(data);
//			mui.alert(info);
			if(data.flag==200){
				companyId = data.result.companyid;  
				localStorage.setItem("companyId",companyId);
				console.log(companyId);
			}
			
		},
		error: function(xhr, type, errorThrown) {
			mui.alert("无网络连接");
		}

	});
}