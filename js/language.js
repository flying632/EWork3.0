function ready(){
	 //   lang = (jQuery.i18n.browserLang().substring(0,2));检测浏览器当前语言环境
		    var lang = localStorage.getItem('lang');
		    if(lang==null){
		    	lang = (jQuery.i18n.browserLang().substring(0,2));//检测浏览器当前语言环境
		    }
			jQuery.i18n.properties({
				name:'strings',
				path:'i18n/',
				mode:'map',
				language:lang,
				callback:function(){
					$('#dongtai').html($.i18n.prop('dongtai')); 
					$('#renwu').html($.i18n.prop('renwu')); 
					$('#gongsi').html($.i18n.prop('gongsi')); 
					$('#wode').html($.i18n.prop('wode')); 
					$('#huanying').html($.i18n.prop('huanying'));
					$('#login').html($.i18n.prop('login'));
					$('#zhanghao').html($.i18n.prop('zhanghao'));
					$('#mima').html($.i18n.prop('mima'));
					$('#denglu').html($.i18n.prop('login')); 
					$('#zidongdenglu').html($.i18n.prop('zidongdenglu')); 
					$('#forget').html($.i18n.prop('forget')); 
					$('#chongzhimima').html($.i18n.prop('chongzhimima'));
				}
			});
		}