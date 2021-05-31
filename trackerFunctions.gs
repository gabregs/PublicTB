/**
 * Return tracker name with correct formatting based on challenge string and utm attributes
 * meant to replace the following formula
 * =TO_TEXT(VLOOKUP(B4,DATA_REF_BUILDER!A:B,2,FALSE))&" - "&TO_TEXT(C4)&" "&TO_TEXT(D4)&" "&TO_TEXT(E4)
 *
 * @param {string} challengeString challenge part in url
 * @param {string} utmSource UTM Source
 * @param {string} utmMedium UTM Medium
 * @param {string} utmCampaign UTM Campaign (without space or special characters)
 * @return Tracker name with correct format
 * @customfunction
 */
function TRACKER_NAME(challengeString, utmSource, utmMedium, utmCampaign) {
  // Replace challenge url with challenge key
  var challengesDict = getChallengesDict()
  var challengeKey = challengesDict[challengeString]

  // Clean utmCampaign
  utmCampaign = cleanUTMCampaign(utmCampaign)

  // uncleanUTMCampaignCell.setValue();

  return challengeKey + " | " + utmSource + " " + utmMedium + " " + utmCampaign;
}

/**
 * Return full tracker URL with UTM parameters and agorize link
 * meant to replace the following formula
 * =TO_TEXT(A4)&TO_TEXT(B4)&TO_TEXT(G4)&"&utm_source="&TO_TEXT(C4)&"&utm_medium="&TO_TEXT(D4)&"&utm_campaign="&TO_TEXT(E4)
 *
 * @param {string} baseLink platform url
 * @param {string} challengeString challenge part in url
 * @param {string} utmSource UTM Source
 * @param {string} utmMedium UTM Medium
 * @param {string} utmCampaign UTM Campaign (without space or special characters)
 * @param {string} agorizeTracker Internal tracker ID
 * @return Tracker name with correct format
 * @customfunction
 */
function FULL_TRACKER_URL(baseLink, challengeString,utmSource, utmMedium, utmCampaign, agorizeTracker) {
  // Clean utmCampaign
  utmCampaign = cleanUTMCampaign(utmCampaign)

  return baseLink + challengeString + agorizeTracker + "&utm_source=" + utmSource + "&utm_medium=" + utmMedium + "&utm_campaign=" + utmCampaign;
}

/**
 * Return a dictionary with challenge links as keys and tracker name key as values
 */
function getChallengesDict() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName("DATA_REF_BUILDER")
  var values = sheet.getRange(2,1,sheet.getLastRow(),2).getValues()

  // Create dictionnary from array
  var challengesDict = {}
  for(var i = 0; i < values.length; i++) {
    if(values[i][0] != 0 && values[i][1] != 0)challengesDict[values[i][0]] = values[i][1]
  }
  return challengesDict
} 
/**
 * Return utmCampaign inputed in lowercase replacing space by "-"
 * and removing all non letters characters
 */
function cleanUTMCampaign(utmCampaign) {
  // Replacing spaces and underscores with "-"
  utmCampaign = utmCampaign.replace(/ /g, "-");

  //Removing accents
  utmCampaign = utmCampaign.replace(/à/g, "a");
  utmCampaign = utmCampaign.replace(/â/g, "a");
  utmCampaign = utmCampaign.replace(/é/g, "e");
  utmCampaign = utmCampaign.replace(/è/g, "e");
  utmCampaign = utmCampaign.replace(/ë/g, "e");
  utmCampaign = utmCampaign.replace(/ê/g, "e");
  utmCampaign = utmCampaign.replace(/ï/g, "i");
  utmCampaign = utmCampaign.replace(/î/g, "i");
  utmCampaign = utmCampaign.replace(/ô/g, "o");
  utmCampaign = utmCampaign.replace(/ö/g, "o");
  utmCampaign = utmCampaign.replace(/ù/g, "u");
  utmCampaign = utmCampaign.replace(/û/g, "u");
  utmCampaign = utmCampaign.replace(/ç/g, "c");

  utmCampaign = utmCampaign.toLowerCase()

  // Removing all non lowercase letters or "-" or "_"
  utmCampaign = utmCampaign.replace(/[^a-z0-9_-]/g, "");

  return utmCampaign
}