@echo off
chcp 65001 >nul
title Publicador de Vercel (Luz)
echo ========================================================
echo Iniciando Vercel para publicar tu pagina web...
echo ========================================================
echo Por favor, en la siguiente lista usa las flechas de tu teclado
echo para seleccionar con que cuenta quieres iniciar sesion (ej: GitHub o Google)
echo y presiona Enter. Si se abre tu navegador, acepta los permisos.
echo ========================================================
call "C:\Program Files\nodejs\npx.cmd" -y vercel login
echo.
echo ========================================================
echo Publicando tu pagina web en internet...
echo Esto puede tomar unos segundos.
echo ========================================================
call "C:\Program Files\nodejs\npx.cmd" -y vercel deploy --prod --yes
echo.
echo ========================================================
echo ¡Listo! Si todo salio bien, arriba veras el enlace (Production: https://...)
echo ========================================================
pause
