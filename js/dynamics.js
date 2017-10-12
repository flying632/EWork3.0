//添加监听事件，获得全文展示
var result;
var thePage = 1;
var this_phoneNum;

function getData(thePage, dateTime) {
	this_phoneNum = localStorage.getItem('phoneNum');

	//请求数据  
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/jh_circle_moments', {
		data: {
			phoneNum: this_phoneNum,
			page: thePage,
			flag: '1',
			datetime: "", //加入时间时返回值为false
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			//	mui.alert(JSON.stringify(data));
			var table = document.getElementById('table');
			table.innerHTML = "";
			if(data.flag == '200') {
				table.innerHTML = "";
				result = data.result;
				for(var i = 0; i < result.length; i++) {
					var card = document.createElement('div');
					card.className = 'mui-card';
					card.setAttribute('id', result[i].id);

					var numOfPhotos = result[i].photourls.length;
					var innerCode = '<div class="mui-card-header mui-card-media"><img src="' + result[i].personlogo + '"  onerror="imgerror(this)"/>' +
						'<div class="mui-media-body">' + result[i].name + '<p>' + result[i].location + '</p></div></div>' +
						'	<div class="mui-card-content"><div id="text" class="mui-ellipsis-2">' + result[i].describe + '</div>';
					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							innerCode += '<div class="photos"> <img class="photo"   src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else if(numOfPhotos == 2) {
							innerCode += '<div class="photos"><img class="photo" style="width:40%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="photo" style="width:40%;" src="' + result[i].photourls[1].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							innerCode += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								innerCode += '<img class="photo" style="width:30%"  src="' + result[i].photourls[j].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							innerCode += '</div>';
						}
					}
					innerCode += '<p>' + result[i].date + '</p>'
					innerCode += '</div><div class="mui-card-footer"><a class="mui-card-link"><img class="mui-icon like" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />' + result[i].laud_count + '</a>' +
						'<a  class="mui-card-link"> <img class="mui-icon comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />' + result[i].comment_count + '</a>';

					innerCode += '</div><div class="comment">';
					var comments = result[i].moment_list;
					for(var j = 0; j < comments.length; j++) {
						innerCode += ' <div class="commentname">' + comments[j].own_name + '</div><div class="commentcontent">' + comments[j].content + '</div>';
					}
					innerCode += '</div>';
					card.innerHTML = innerCode;
					table.appendChild(card);
				}
			}

		},
		error: function(xhr, type, errorThrown) {
			mui.alert("无网络连接");
		}

	});
}
//下拉刷新, 时间戳的具体作用，暂时未知，现行搁置
function pulldownGetData(Page, dateTime) {
	//请求数据  
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/jh_circle_moments', {
		data: {
			phoneNum: this_phoneNum,
			page: Page,
			flag: '1',
			datetime: "", //加入时间时返回值为false
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			var table = document.getElementById('table');
			table.innerHTML = "";
			mui.toast(data.msg);
			if(data.flag == '200') {
				table.innerHTML = "";
				result = data.result;
				for(var i = 0; i < result.length; i++) {
					var card = document.createElement('div');
					card.className = 'mui-card';
					card.setAttribute('id', result[i].id);

					var numOfPhotos = result[i].photourls.length;
					var innerCode = '<div class="mui-card-header mui-card-media"><img src="' + result[i].personlogo + '" onerror="imgerror(this)" />' +
						'<div class="mui-media-body">' + result[i].name + '<p>' + result[i].date + '</p></div></div>' +
						'	<div class="mui-card-content"><div id="text" class="mui-ellipsis-2">' + result[i].describe + '</div>';
					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							innerCode += '<div class="photos"> <img class="photo"   src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else if(numOfPhotos == 2) {
							innerCode += '<div class="photos"><img class="photo" style="width:40%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="photo" style="width:40%;" src="' + result[i].photourls[1].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							innerCode += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								innerCode += '<img class="photo" style="width:30%"  src="' + result[i].photourls[j].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							innerCode += '</div>';
						}
					}
					innerCode += '</div><div class="mui-card-footer"><a class="mui-card-link"><img class="mui-icon like" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />' + result[i].laud_count + '</a>' +
						'<a  class="mui-card-link"> <img class="mui-icon comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />' + result[i].comment_count + '</a>';
					innerCode += '</div><div class="comment">';
					var comments = result[i].moment_list;
					for(var j = 0; j < comments.length; j++) {
						innerCode += ' <div class="commentname">' + comments[j].own_name + '</div><div class="commentcontent">' + comments[j].content + '</div>';
					}
					innerCode += '</div>';

					card.innerHTML = innerCode;
					table.appendChild(card);
				}
			}

		},
		error: function(xhr, type, errorThrown) {
			mui.alert("wrron");
		}

	});
}

function pullupGetData(Page, dateTime) {
	//请求数据
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/jh_circle_moments', {
		data: {
			phoneNum: this_phoneNum,
			page: Page,
			flag: '2',
			datetime: "",
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			thePage++;
			mui.toast(data.msg);
			if(data.flag == '200') {
				var table = document.getElementById('table');

				result = data.result;
				for(var i = 0; i < result.length; i++) {
					var card = document.createElement('div');
					card.className = 'mui-card';
					card.setAttribute('id', result[i].id);

					var numOfPhotos = result[i].photourls.length;
					var innerCode = '<div class="mui-card-header mui-card-media"><img src="' + result[i].personlogo + '"  onerror="imgerror(this)"/>' +
						'<div class="mui-media-body">' + result[i].name + '<p>' + result[i].date + '</p></div></div>' +
						'	<div class="mui-card-content"><div id="text" class="mui-ellipsis-2">' + result[i].describe + '</div>';
					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							innerCode += '<div class="photos"> <img class="photo"   src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else if(numOfPhotos == 2) {
							innerCode += '<div class="photos"><img class="photo" style="width:40%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="photo" style="width:40%;" src="' + result[i].photourls[1].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							innerCode += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								innerCode += '<img class="photo" style="width:30%"  src="' + result[i].photourls[j].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							innerCode += '</div>';
						}
					}
					innerCode += '</div><div class="mui-card-footer"><a class="mui-card-link"><img class="mui-icon like" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />' + result[i].laud_count + '</a>' +
						'<a  class="mui-card-link"> <img class="mui-icon comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />' + result[i].comment_count + '</a>';
					innerCode += '</div><div class="comment">';
					var comments = result[i].moment_list;
					for(var j = 0; j < comments.length; j++) {
						innerCode += ' <div class="commentname">' + comments[j].own_name + '</div><div class="commentcontent">' + comments[j].content + '</div>';
					}
					innerCode += '</div>';
					card.innerHTML = innerCode;
					table.appendChild(card);
				}

			}
			mui('#pullrefresh').pullRefresh().endPullupToRefresh();

		},
		error: function(xhr, type, errorThrown) {
			mui.alert("wrron");
		}

	});
}
function imgerror(img){ 
				img.src="../../images/Assets.xcassets/card.imageset/card@2x.png";
				img.onerror=null;
			}
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentDate = date.getFullYear() + seperator1 + month + seperator1 +
		strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentDate;
}
/**
 * 下拉具体业务的实现
 */
function pulldownRefresh() {
	thePage = 1;
	pulldownGetData(1, getNowFormatDate());
	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
}

function pullupRefresh() {
	pullupGetData(thePage + 1, getNowFormatDate());
	mui('#pullrefresh').pullRefresh().endPullupToRefresh();

}

//点赞
function like(id) {
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/Moment/laud_add', {
		data: {
			momentid: id,
			phoneNum: this_phoneNum,
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			if(data.flag == '200') {
				getData();
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.alert("无网络连接");
		}

	});
}
//评论
function comment(temp_id) {

	mui.openWindow({
		id: 'Dnew_comment.html',
		url: 'Dnew_comment.html',
		extras: {
			the_id: temp_id
		}
	});
}