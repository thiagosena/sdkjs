Set objExcel = CreateObject("Excel.Application")
objExcel.Application.Run "'C:\Users\maxim\Downloads\Telegram Desktop\macros-locale (1).xlsm'!Module1.numformatlocale", WScript.Arguments(0)
objExcel.DisplayAlerts = False

objExcel.Application.Quit
Set objExcel = Nothing