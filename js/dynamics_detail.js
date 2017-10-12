
		function addListener() {
			//监听点赞事件
			var like = document.getElementById('like');
			like.addEventListener('tap', function() {
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
							sendRequest();
						}
					},
					error: function(xhr, type, errorThrown) {
						mui.alert("无网络连接");
					}

				});

			});
			//监听评论事件
			var comment = document.getElementById('comment');
			var temp_id = id;
			comment.addEventListener('tap', function() {
				mui.openWindow({
					id: 'new_comment.html',
					url: 'new_comment.html',
					extras: {
						the_id: temp_id
					}
				});
			});
		}

		function sendRequest() {
			//得到动态内容
			mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/moment_con', {
				data: {
					id: id,
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
						showContent(data.moments);
					}
					getLikes();
				},
				error: function(xhr, type, errorThrown) {
					mui.alert("无网络连接");
				}

			});

		}

		function getLikes() {
			//得到点赞信息 
			mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/Moment/all_lauds', {
				data: {
					momentid: id,
					page: "1",
					num: "3",
					datetime: ""
				},
				dataType: 'json',
				type: 'get',
				timeout: 10000,
				headers: {
					'content-Type': 'application/json'
				},
				success: function(data) {
					if(data.flag == '200') {
						showLikes(data.lauds);
					} else {
						var temp = [];
						showLikes(temp);
					}
					getComments();
				},
				error: function(xhr, type, errorThrown) {
					mui.alert("无网络连接");
				}

			});
		}

		function getComments() {
			//得到评论信息 
			mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/Moment/all_comment', {
				data: {
					momentid: id,
					phoneNum: this_phoneNum,
					page: "1",
					num: "3",
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
				//	mui.alert(JSON.stringify(data));
					if(data.flag == '200') {
						showComments(data.comments);
					} else {
						var temp = [];
						showComments(temp);
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.alert("无网络连接");
				}

			});
		}

		function showContent(result) {

			var body = document.getElementById('body');
			body.innerHTML = '<div class="head"> <img class="headImg" src="' + result.personlogo + '" onerror="imgerror(this)"/> <div class="username">' +
				result.name + '</div><div class="date">' + result.date + '</div> </div>' + '<div class="content"> <div >' + result.describe + '</div></div>';
 

			var numOfPhotos = result.photourls.length;

			if(numOfPhotos != 0) {
				if(numOfPhotos == 1) {
					body.innerHTML += '<div class="photos"> <img class="photo" style="width:100%;" src="' + result.photourls[0].url + '" data-preview-src="" data-preview-group="' + 1 + '"/> </div>';

				} else if(numOfPhotos == 2) {
					body.innerHTML += '<div class="photos"><img class="photo" style="width:40%;" src="' + result.photourls[0].url + '" data-preview-src="" data-preview-group="' + 1 + '"/>' +
						'<img class="photo" style="width:40%;" src="' + result.photourls[1].url + '" data-preview-src="" data-preview-group="' + 1 + '"/> </div>';
				} else {
					body.innerHTML += '<div class="photos">';
					for(var j = 0; j < numOfPhotos; j++) {
						body.innerHTML += '<img class="photo"  src="' + result.photourls[j].url + '" data-preview-src="" data-preview-group="' + 1 + '"/>';
					}
					body.innerHTML += '</div>';
				}
			}

			body.innerHTML += '<div class="bottom"><div class="likeImg" id="like" ><img class="like_img" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />' +
				'<div class="num_like">' + result.laud_count + '</div></div>' +
				'<div class="commentImg" id="comment" ><div class="comment_img">' + result.comment_count + '</div><img class="num_comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />' +
				'</div></div>';

		}

		function showLikes(likes) {
			var body = document.getElementById('body');
			var like_ans = '';
			if(likes.length == 0) {
				like_ans = '0人';
			}
			for(var j = 0; j < likes.length; j++) {
				like_ans += likes[j].own_name;
				if(j != likes.length - 1) {
					like_ans += '、';
				}
			}
			body.innerHTML += '<div class="like">' + like_ans + '觉得很赞</div>';
		}
		
		function showComments(comments) {
			var body = document.getElementById('body');
			body.innerHTML += '<div class = "comments">';
			for(var i = 0; i < comments.length; i++) {
				body.innerHTML += '<div class="comment">' +
					'<img class="headImg" src="' + comments[i].personlogo + '" />' +
					'<div class="comment_content"><div class="comment_name">' + comments[i].own_name + '</div>' +
					'<div class="discribe">' + comments[i].content + '</div></div><div class="comment_date">' + comments[i].date + '</div></div>'
			}
			body.innerHTML += '</div>';

			//添加监听
			addListener();

		}
		
function imgerror(img){
				img.src="../../images/Assets.xcassets/card.imageset/card@2x.png";
				img.onerror=null;
			}