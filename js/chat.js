$('.sendBtn').on('click', function () {
	var news = $('#dope').val();
	if (news == '') {
		mui.toast("啥都没有你发送个球球~");
	} else {
		$('#dope').val('');
		var str = '';
		str += '<li class="right-li">' +
			'<div class="l-con clearfix"><span id="head-img" class="chat-icon right" ></span> <p class="text right-text">' + news + '</p></div></li>';		
		$('.newsList').append(str);
		Send(news);
		$('.message-content').scrollTop($('.message-content')[0].scrollHeight);

	}
})

var xmlHttp

function Send(news) {
	xmlHttp = GetXmlHttpObject()

	if (xmlHttp == null) {

		alert("您的浏览器不支持AJAX！");

		return;

	}

	var url = "http://www.tuling123.com/openapi/api?key=34651045d8d644e2b81ff9a8710b7db7";

	url = url + "&info=" + news;

	xmlHttp.onreadystatechange = stateChanged;

	xmlHttp.open("GET", url, true);

	xmlHttp.send(null);

	/**
	 * 这里的代码被我注释掉了
	 */
	 //document.getElementById("dope").value = "";

}

function stateChanged() {

	// xmlHttp.readyState
	// 0 （未初始化）
	// 对象已建立，但是尚未初始化（尚未调用open方法）

	// 1 （初始化）
	// 已调用send()方法，正在发送请求

	// 2 （发送数据）
	// send方法调用完成，但是当前的状态及http头未知

	// 3 （数据传送中）
	// 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，

	// 4 （完成）
	// 数据接收完毕，此时可以通过通过responseBody和responseText获取完整的回应数据
	if (xmlHttp.readyState == 4) {
		// var msg = eval('(' + xmlHttp.responseText + ')');
		//document.getElementById("robot").innerHTML = msg;
		var text = JSON.parse(xmlHttp.responseText).text;
		answers(text);
		//console.log(xmlHttp.responseText);
	}
}

function GetXmlHttpObject() {

	var xmlHttp = null;

	try {

		// Firefox, Opera 8.0+, Safari

		xmlHttp = new XMLHttpRequest();

	}

	catch (e) {

		// Internet Explorer

		try {

			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");

		}

		catch (e) {

			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

		}

	}

	return xmlHttp;

}

/**
 * 参数被我修改了，调用方式也改为当onreadystatechange事件触发时调用并传参
 * @param {String} answer 
 */
function answers(answer) {
	/**
	 * 这里删了两句代码，把<li>标签里的变量改为了answer
	 */
	answer = '<li class="left-li">' +
			'<div class="l-con clearfix"><span class="chat-icon left" ></span> <p class="text">' + answer + '</p></div></li>';

	$('.newsList').append(answer);
	$('.message-content').scrollTop($('.message-content')[0].scrollHeight);
}