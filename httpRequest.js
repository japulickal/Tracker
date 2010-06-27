/**
 * This file provide the basic HTTP request handling like get,post etc..
 * 
 * @author jose
 */

/**
 * @var integer request time out variable
 */
var requestTimeout = 1000 * 2;

/**
 * This function will fetch data from the given url
 * and call back the success function with data fetched
 * if any error happens it will call the failure function
 * 
 * callBackSuccess function should be of signature
 *  function <functionName>(data) {}
 *  
 * callBackFailure function should be of signature 
 *  function <functioName>(error) {} 
 * 
 * @param url - Url to fetch data
 * @param callBackSuccess - function reference to be called on success 
 * @param callBackFailure
 */
function getData(url, callBackSuccess, callBackFailure) {

	var xhr = new XMLHttpRequest();

	var abortTimerId = window.setTimeout(function() {
		xhr.abort();  // synchronously calls onreadystatechange
	}, requestTimeout);

	try {
		xhr.onreadystatechange = function(){
			if (xhr.readyState != 4) {
				return;
			}

			if (xhr.responseXML) {
				var xmlDoc = xhr.responseXML;
				window.clearTimeout(abortTimerId);
				callBackSuccess(xmlDoc);
				return;
			}

			window.clearTimeout(abortTimerId);
			callBackFailure('Unable to fetch the data');
		};

		xhr.onerror = function(error) {
			window.clearTimeout(abortTimerId);
			callBackFailure(error);
		};

		xhr.open("GET", url, true);
		xhr.send(null);
	  } catch(e) {
		console.error(e);
	}
}