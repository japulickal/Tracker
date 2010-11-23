/**
 * variable for holding the trac Plugin
 * 
 * Plugin mainly implements the getCount and getNotificationMessages needed
 * By the main program
 * 
 * @author jose antony <joseantony007@gmail.com>
 */
var tracPlugin = {
	/**
	 * This function will return the number of active tickets in the 
	 * ticket report
	 * 
	 * @param xmlDoc xml Document recived from the server
	 * 
	 * @returns integer
	 */
	getCount: function (xmlDoc) {
		return xmlDoc.getElementsByTagName('item').length;
	},
	/**
	 * Returns and Message object with details to be displayed if an new ticket
	 * or comment is added  to the tickets in the given report
	 * 
	 * @param xmlDoc xml Document recived from the server
	 * @param lastRunTime last run time of the script
	 * 
	 * @returns notificationMessage
	 */
	getNotificationMessages: function (xmlDoc, lastRunTime) {
		itemCount = xmlDoc.getElementsByTagName('item').length;
		currentMessageCount = 0;
		message = new Array();
		for (count = 0 ; count < itemCount ; count++) {
			if (undefined != xmlDoc.getElementsByTagName('item')[count].getElementsByTagName('pubDate')[1]) {
				pubTime = new Date(xmlDoc.getElementsByTagName('item')[count].getElementsByTagName('pubDate')[1].childNodes[0].nodeValue);
			} else {
				pubTime = new Date(xmlDoc.getElementsByTagName('item')[count].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue);
			}
			if (pubTime > lastRunTime) {
				notificationMessage.text = xmlDoc.getElementsByTagName('item')[count].getElementsByTagName('title')[0].childNodes[0].nodeValue;
				notificationMessage.icon = 'images/Trac_Logo_16.png';
				notificationMessage.title = 'Ticket / Ticket Comment Added';
				notificationMessage.pubTime = pubTime;
				message[currentMessageCount] = notificationMessage;//xmlDoc.getElementsByTagName('item')[count].getElementsByTagName('title')[0].childNodes[0].nodeValue;
				currentMessageCount++;
			}
		}
		
		return message;
	},
	/**
	 * function to generate the redirect url from the rss url
	 * 
	 * @param rssUrl
	 * 
	 * @returns String
	 */
	getRedirectUrl: function (rssUrl) {
		var splitIndex = rssUrl.indexOf('?');
		return rssUrl.substring(0,splitIndex);
	}
};