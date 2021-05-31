function createTrackersButton() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  
  // Retrieve URL and token on DATA_REF_BUILDER sheet
  var dataRefBuilder = ss.getSheetByName("DATA_REF_BUILDER")
  var url = dataRefBuilder.getRange("D2").getValue()
  var token = dataRefBuilder.getRange("E2").getValue()
  Logger.log ("URL : " + url)
  Logger.log("token : " + token)

  // Retrieve all lines in TRACKER BUILDER sheet
  var trackerBuilder = ss.getActiveSheet();
  trackers = trackerBuilder.getDataRange().getValues();

  // Create tracker when needed (all informations present, and link not present yet)
  trackers.splice(0,3)

  var createdCount = 0
  
  for (var i = 0; i < trackers.length; i++) {

    //Check if columns A-F is not empty
    if (trackers[i][1] != "" && trackers[i][2] != "" && trackers[i][3] != "" && trackers[i][4] != "" && trackers[i][6] == "") {

      Logger.log(trackers)

      // Tracker creation through API call
      var trackerToken = createTracker(trackers[i][5], url, token);

      // Write internal tracker Id to column G
      trackerBuilder.getRange(`G${i + 4}`).setValue("?t=" + trackerToken);

      //Corrects UTM Campaign
      trackerBuilder.getRange(`E${i + 4}`).setValue(trackers[i][5].split(" ").pop());

      createdCount++
    }
  }
  SpreadsheetApp.getUi().alert(createdCount + ' Tracker(s) added\n');
}

function onEdit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var trackerBuilder = ss.getActiveSheet();

  var range = e.range;
  var oldVal = e.oldValue;
  var newVal = e.value;

  if (trackerBuilder.getRange(range.getRow(), 7).getValue() != "" && range.getColumn() != 9 && range.getColumn() != 11) {
    range.setValue(oldVal)
  }

  if (range.getColumn() == 7 || range.getColumn() == 9 || range.getColumn() == 11) {
    if (oldVal != undefined) {
      range.setValue(oldVal)
    }
  }
}


