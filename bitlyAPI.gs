var bitlyToken = "de9c4f67721fe28b77eee1396154f0095ad7f7d5";
var shortenURL = "https://api-ssl.bitly.com/v4/shorten";
var orgURL = "https://api-ssl.bitly.com/v4/organizations";
var guid = "OicrhjqyDIR"

/**
 * Shorten Final Tracker Link to bit.ly domain
 *
 * 
 * @return {link} shortened link using bitly domain
 * 
 * @customfunction
 */

function bitly() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = ss.getActiveCell();
  var cellRow = cell.getRow();
  var cellCol = cell.getColumn();
  
  var finalLink = ss.getRange(cellRow, cellCol - 1).getValue().toString();

  var inputLink = {
    "long_url": finalLink
  }

  var optionsPOST = {
    "method": "POST",
    "headers": { "Authorization": "Bearer " + bitlyToken },
    "contentType": "application/json",
    "payload" : JSON.stringify(inputLink)
  }

  var response = UrlFetchApp.fetch(shortenURL, optionsPOST)
  var data = response.getContentText();
  var record = JSON.parse(data)
  var link = record.link

  link = link.replace(/https:\/\//, "")

  var backLink = link.replace(/https:\/\/bit.ly\//, "");
  var customizeLink = "https://app.bitly.com/BicrhX2Nfl3/bitlinks/" + backLink + "?actions=edit";

  return [[link, customizeLink]];
}


/**
 * Shorten Final Tracker Link to agorize.co domain
 *
 * 
 * @return {link} shortened link using agorize domain
 * 
 * @customfunction
 */

function agobitly() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = ss.getActiveCell();
  var cellRow = cell.getRow();
  var cellCol = cell.getColumn();
  
  var finalLink = ss.getRange(cellRow, cellCol - 1).getValue().toString();

  var inputLink = {
    "long_url": finalLink,
    "domain": "agorize.co"
  }

  var optionsPOST = {
    "method": "POST",
    "headers": { "Authorization": "Bearer " + bitlyToken },
    "contentType": "application/json",
    "payload" : JSON.stringify(inputLink)
  }

  var response = UrlFetchApp.fetch(shortenURL, optionsPOST)
  var data = response.getContentText();
  var record = JSON.parse(data)
  var link = record.link

  link = link.replace(/https:\/\//, "")

  var backLink = link.replace(/https:\/\/agorize.co\//, "");
  var customizeLink = "https://app.bitly.com/BicrhX2Nfl3/bitlinks/" + backLink + "?actions=edit";

  return [[link, customizeLink]];
}

function getOrgGUID() {
  var optionsGET = {
    "method": "GET",
    "headers": { "Authorization": "Bearer " + bitlyToken },
    "contentType": "application/json"
  }

  var response = UrlFetchApp.fetch(orgURL, optionsGET);
  var data = response.getContentText();
  var record = JSON.parse(data)
  var org = record.organizations
  Logger.log(org)
}

function limits(){
  var optionsGET = {
    "method": "GET",
    "headers": { "Authorization": "Bearer " + bitlyToken },
    "contentType": "application/json"
  }

  var response = UrlFetchApp.fetch("https://api-ssl.bitly.com/v4/organizations/" + guid + "/plan_limits", optionsGET);
  var data = response.getContentText();
  var record = JSON.parse(data)
  var limit = record.plan_limits
  var bitlyCount = limit[0].count
  var agoCount = limit[1].count
  var displayCount = "Bitly Domain Used: " + bitlyCount + "/1500\n\nAgo Domain Used: " + agoCount + "/1500"

  SpreadsheetApp.getUi().alert("Monthly Bitly Limit", displayCount, SpreadsheetApp.getUi().ButtonSet.OK);
}