function createTracker(trackerName,url,key) {
  // Add '/' if not present at the end of the URL
  if (url.slice(-1) != "/") {fullURL += "/"}

  var data = {"tracker":{"title":trackerName}};
  Logger.log(data);
  var options = {
     "async": true,
     "crossDomain": true,
     "contentType": "application/json",
     "method" : "POST",
     "headers" : {
       "Authorization" : "Bearer "+key,
       "cache-control": "no-cache"
     },
     "payload" : JSON.stringify(data)
   };
  var response = UrlFetchApp.fetch(url+'api/partners/v2/trackers',options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data.data.attributes.token
}
