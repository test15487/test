var dbUrl = "jdbc:mysql://my8001.gabiadb.com:3306/kimbumsoo";
var user = "kimbumsoo";
var userPwd = "902356pp!*";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function importDataFromMySQL() {
  var sheet = SpreadsheetApp.openById(
    "1233GITSYYY5xuTqGc5PpXftyWkl92jTz5KExj2LURJQ"
  )
    .getSheets()
    .filter(function (sheet) {
      return sheet.getSheetId() == 618941580;
    })[0];

  var conn = Jdbc.getConnection(dbUrl, user, userPwd);
  var stmt = conn.createStatement();
  var results = stmt.executeQuery("SELECT 선수이름 FROM player_DB");
  var data = [];

  while (results.next()) {
    data.push([results.getString("선수이름")]);
  }

  sheet.getRange(2, 4, data.length, 1).clearContent(); // 기존 데이터 삭제
  sheet.getRange(2, 4, data.length, 1).setValues(data);

  results.close();
  stmt.close();
  conn.close();
}

function getSheetData() {
  var sheet = SpreadsheetApp.openById(
    "1233GITSYYY5xuTqGc5PpXftyWkl92jTz5KExj2LURJQ"
  )
    .getSheets()
    .filter(function (sheet) {
      return sheet.getSheetId() == 618941580;
    })[0];
  var range = sheet.getRange("D2:D" + sheet.getLastRow()); // D열에서 데이터를 가져옵니다. 범위 조정 필요.
  var values = range.getValues();

  var data = [];
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] !== "") data.push(values[i][0]);
  }
  return data;
}
