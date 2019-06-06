var ct_date = new Date(), 
	ctTimeMs = new Date().getTime(),
	ctMouseEventTimerFlag = true, //Reading interval flag
	ctMouseData = [],
	ctMouseDataCounter = 0;

function ctSetCookieSec(c_name, value) {
	document.cookie = c_name + "=" + encodeURIComponent(value) + "; path=/";
}

function apbct_attach_event_handler(elem, event, callback){
	if(typeof window.addEventListener === "function") elem.addEventListener(event, callback);
	else                                             elem.attachEvent(event, callback);
}

function apbct_remove_event_handler(elem, event, callback){
	if(typeof window.removeEventListener === "function") elem.removeEventListener(event, callback);
	else                                                elem.detachEvent(event, callback);
}

ctSetCookieSec("ct_ps_timestamp", Math.floor(new Date().getTime()/1000));
ctSetCookieSec("ct_fkp_timestamp", "0");
ctSetCookieSec("ct_pointer_data", "0");
ctSetCookieSec("ct_timezone", "0");

setTimeout(function(){
	ctSetCookieSec("ct_timezone", ct_date.getTimezoneOffset()/60*(-1));
},1000);

//Writing first key press timestamp
var ctFunctionFirstKey = function output(event){
	var KeyTimestamp = Math.floor(new Date().getTime()/1000);
	ctSetCookieSec("ct_fkp_timestamp", KeyTimestamp);
	ctKeyStopStopListening();
};

//Reading interval
var ctMouseReadInterval = setInterval(function(){
	ctMouseEventTimerFlag = true;
}, 150);
	
//Writting interval
var ctMouseWriteDataInterval = setInterval(function(){
	ctSetCookieSec("ct_pointer_data", JSON.stringify(ctMouseData));
}, 1200);

//Logging mouse position each 150 ms
var ctFunctionMouseMove = function output(event){
	if(ctMouseEventTimerFlag === true){
		
		ctMouseData.push([
			Math.round(event.clientY),
			Math.round(event.clientX),
			Math.round(new Date().getTime() - ctTimeMs)
		]);
		
		ctMouseDataCounter++;
		ctMouseEventTimerFlag = false;
		if(ctMouseDataCounter >= 50){
			ctMouseStopData();
		}
	}
};

//Stop mouse observing function
function ctMouseStopData(){
	apbct_remove_event_handler(window, "mousemove", ctFunctionMouseMove);
	clearInterval(ctMouseReadInterval);
	clearInterval(ctMouseWriteDataInterval);				
}

//Stop key listening function
function ctKeyStopStopListening(){
	apbct_remove_event_handler(window, "mousedown", ctFunctionFirstKey);
	apbct_remove_event_handler(window, "keydown", ctFunctionFirstKey);
}

apbct_attach_event_handler(window, "mousemove", ctFunctionMouseMove);
apbct_attach_event_handler(window, "mousedown", ctFunctionFirstKey);
apbct_attach_event_handler(window, "keydown", ctFunctionFirstKey);

// Ready function
function apbct_ready(){
	ctSetCookieSec("apbct_visible_fields", 0);
	ctSetCookieSec("apbct_visible_fields_count", 0);
	setTimeout(function(){
		for(var i = 0; i < document.forms.length; i++){
			var form = document.forms[i];

			form.onsubmit_prev = form.onsubmit;
			form.onsubmit = function(event){
				
				// Get only fields
				var elements = [];
				for(var key in this.elements){
					if(!isNaN(+key))
						elements[key] = this.elements[key];
				}
				
				// Filter fields
				elements = elements.filter(function(elem){
					
					var pass = true;
					
					// Filter fields
					if( getComputedStyle(elem).display    === "none" ||   // hidden
						getComputedStyle(elem).visibility === "hidden" || // hidden
						getComputedStyle(elem).opacity    === "0" ||      // hidden
						elem.getAttribute("type")         === "hidden" || // type == hidden
						elem.getAttribute("type")         === "submit" || // type == submit
						elem.value                        === ""          // empty value
					){
						return false;
					}
					
					// Filter elements with same names for type == radio
					if(elem.getAttribute("type") === "radio"){
						elements.forEach(function(el, j, els){
							if(elem.getAttribute('name') === el.getAttribute('name')){
								pass = false;
								return;
				}
						});
					}
					
					return true;
				});
				
				// Visible fields count
				var visible_fields_count = elements.length;
				
				// Visible fields
				var visible_fields = '';
				elements.forEach(function(elem, i, elements){
					visible_fields += " " + elem.getAttribute("name");
				});
				visible_fields = visible_fields.trim();
				
				ctSetCookieSec("apbct_visible_fields", visible_fields);
				ctSetCookieSec("apbct_visible_fields_count", visible_fields_count);
				
				// Call previous submit action
				if(event.target.onsubmit_prev instanceof Function){
					setTimeout(function(){
						event.target.onsubmit_prev.call(event.target, event);
					}, 500);
				}
			};
		}
	}, 1000);
}
apbct_attach_event_handler(window, "DOMContentLoaded", apbct_ready);

// Capturing responses and output block message for unknown AJAX forms
jQuery(document).ajaxComplete(function(event, xhr, settings) {
	if(xhr.responseText && xhr.responseText.indexOf('"apbct') !== -1){
		var response = JSON.parse(xhr.responseText);
		if(typeof response.apbct !== 'undefined'){
			var response = response.apbct;
			if(response.blocked){
				alert(response.comment);
			}
		}
	}
});

function apbct_js_keys__set_input_value(result, data, params, obj){
	if (document.getElementById(params.input_name) !== null) {
		var ct_input_value = document.getElementById(params.input_name).value;
		document.getElementById(params.input_name).value = document.getElementById(params.input_name).value.replace(ct_input_value, result.js_key);
	}
}

function apbct_sendAJAXRequest(data, params, obj){
	
	// Default params
	var callback    = params.callback    || null;
	var notJson     = params.notJson     || null;
	var timeout     = params.timeout     || 15000;
	var obj         = obj                || null;
	
	data._ajax_nonce = ctPublic._ajax_nonce;
	
	jQuery.ajax({
		type: "POST",
		url: ctPublic._ajax_url,
		data: data,
		success: function(result){
			if(!notJson) result = JSON.parse(result);
			if(result.error){
				
			}else{
				if(callback)
					callback(result, data, params, obj);
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('APBCT_AJAX_ERROR');
			console.log(data);
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},
		timeout: timeout
	});
}

//(function(open) {
//    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
//        this.addEventListener("readystatechange", function() {
//        }, false);
//        open.call(this, method, url, async, user, pass);
//    };
//})(XMLHttpRequest.prototype.open);