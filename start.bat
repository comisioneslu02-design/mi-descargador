@echo off
echo Iniciando el motor de descargas en segundo plano...
"C:\Program Files\nodejs\node.exe" node_modules\pm2\bin\pm2 start server.js --name "yt-downloader"
echo.
echo ========================================================
echo SERVIDOR INICIADO CORRECTAMENTE.
echo Puedes cerrar esta ventana negra. El servidor seguira
echo funcionando en secreto para que descargues sin problemas.
echo.
echo Ingresa a: http://localhost:3000
echo ========================================================
pause
