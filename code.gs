 function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('CSV Importer')
        .addItem('Import CSV', 'showDialog')
        .addToUi();
}

function showDialog() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile('Index')
        .setWidth(400)
        .setHeight(400);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Import CSV File');
}

function doGet() {
    return HtmlService.createHtmlOutputFromFile('Index')
        .setTitle('CSV Importer')
        .setWidth(400)
        .setHeight(400);
}

function importSelectedColumns(selectedData) {
    try {
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = spreadsheet.getSheetByName('Sheet1');
        
        // Iterate through selected columns and append data to the sheet
        for (var i = 0; i < selectedData.length; i++) {
            var columnData = selectedData[i];

            // Check if any cell in the column has data
            var hasData = columnData.some(function(value) {
                return value !== '';
            });

            if (hasData) {
                sheet.appendRow(columnData);
            }
        }

        return 'Selected Columns Data successfully imported ';
    } catch (error) {
        return 'Error: ' + error.toString();
    }
}
