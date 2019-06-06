/*
 Assign default values for backend variables.
*/
if (typeof ctNocache === 'undefined') {
    ctNocache.set_cookies_flag = true;
    ctNocache.ajaxurl = 'http://medicare.bold-themes.com/wp-admin/admin-ajax.php';
}

function sendRequest(url,callback,postData) {
    var req = createXMLHTTPObject();
    if (!req) return;
    var method = (postData) ? "POST" : "GET";
    
    var protocol = location.protocol;
    if (protocol === 'index.html') {
        url = url.replace('index.html', 'index.html');
    } else {
        url = url.replace('index.html', 'index.html');
    }
    
    req.open(method,url,true);
    if (postData)
        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
//          alert('HTTP error ' + req.status);
            return;
        }
        callback(req);
    };
    if (req.readyState == 4) return;
    req.send(postData);
}

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

function ct_getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function ct_setCookie(name, value)
{
    if (ctNocache.set_cookies_flag) {
        document.cookie = name+" =; expires=Thu, 01 Jan 1970 00:00:01 GMT; path = /";
        document.cookie = name+" =; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        
        var date = new Date;
        date.setDate(date.getDate() + 1);
        setTimeout(function() { document.cookie = name+"=" + value + "; expires=" + date.toUTCString() + "; path = /;"}, 500);
    }

    return null;
}

function ct_callback(req)
{
	ct_cookie = req.responseText.trim();
	//alert('Key value: ' + ct_cookie);
	
	ct_setCookie('ct_checkjs', ct_cookie);
	
	for(i=0;i<document.forms.length;i++)
	{
		f=document.forms[i];
		for(j=0;j<f.elements.length;j++)
		{
			e=f.elements[j];
			if(e.name!==undefined&&e.name.indexOf('ct_checkjs')!=-1)
			{
				e.value=ct_cookie;
				//alert('Form #' + i + ', field ' + e.name + ' = ' + ct_cookie);
			}
		}
	}

	//alert('Set cookie: \n' + document.cookie);
}

if (!Date.now) {
	Date.now = function() { return new Date().getTime(); }
}

if(ct_nocache_executed==undefined)
{
	var ct_nocache_executed=true;
	
	var checkjs_cookie=ct_getCookie('ct_checkjs');
	
	if(checkjs_cookie!=undefined)
	{
		for(i=0;i<document.forms.length;i++)
		{
			f=document.forms[i];
			for(j=0;j<f.elements.length;j++)
			{
				e=f.elements[j];
				if(e.name!==undefined&&e.name.indexOf('ct_checkjs')!=-1)
				{
					e.value=checkjs_cookie;
					//alert('Form #' + i + ', field ' + e.name + ' = ' + ct_cookie);
				}
			}
		}
	}	
	
	if(checkjs_cookie==undefined) //86400 is 24 hours
	{
		sendRequest(ctNocache.ajaxurl+'?'+Math.random(),ct_callback,'action=ct_get_cookie');
	}
	
	if(typeof ctNocache.info_flag !== 'undefined' && ctNocache.info_flag)
	{
	
		var cleantalk_user_info={};
		
		var cleantalk_screen_info={};
		for(var prop in screen)
		{
			if (navigator[prop] instanceof Object || screen[prop]==='')
				continue;
			cleantalk_screen_info[prop]=screen[prop];
		}
		
		cleantalk_user_info.screen=cleantalk_screen_info;
		
		var cleantalk_plugins=Array();
		var prev;
		var cnt=0;
		for(var i=0;i<navigator.plugins.length;i++)
		{
			var plugin = navigator.plugins[i];
			var plugin = plugin.name+" "+(plugin.version || '')
			if (prev == plugin ) continue;
			cleantalk_plugins[cnt]=plugin;
			cnt++;
			prev = plugin;
		}
		cleantalk_user_info.plugins=cleantalk_plugins;
		
		cleantalk_user_info.timezone_offset = -new Date().getTimezoneOffset()/60;
		cleantalk_user_info.datetime = Math.round((new Date().getTime())/1000);
		
		cleantalk_user_info.browser_x=document.documentElement.clientWidth;
		cleantalk_user_info.browser_y=document.documentElement.clientHeight;
		
		var ua = navigator.userAgent.toLowerCase();
		var flashInstalled = 0;
		if (typeof(navigator.plugins)!="undefined"&&typeof(navigator.plugins["Shockwave Flash"])=="object")
		{
			flashInstalled = 1;
		}
		else if (typeof window.ActiveXObject != "undefined")
		{
			try
			{
				if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
				{
					flashInstalled = 1;
				}
			} catch(e) {};
		};
		
		cleantalk_user_info.is_flash=flashInstalled;
		
		isVisitedMain=-1;
		if(location.href=='http://'+location.hostname+'/' || location.href=='https://'+location.hostname+'/')
		{
			isVisitedMain=1;
			setTimeout(function() { document.cookie = "ct_visited_main = 1; path = /;"}, 1500);
		}
		
		
		ct_visited_main = ct_getCookie('ct_visited_main');
		if(ct_visited_main==undefined && isVisitedMain==-1)
		{
			isVisitedMain=0;
		}
		else
		{
			isVisitedMain=1;
		}
		
		cleantalk_user_info.is_main=isVisitedMain;
		
		setTimeout(function() { document.cookie = "ct_user_info = "+escape(JSON.stringify(cleantalk_user_info))+"; path = /;"}, 1500);
	}
}