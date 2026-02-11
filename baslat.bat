@echo off
title MaturkaAI Baslatici
echo ==========================================
echo MaturkaAI Baslatiliyor...
echo ==========================================

echo.
echo [1/2] Bagimliliklar kontrol ediliyor ve kuruluyor (npm install)...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo HATA: Bagimlilik kurulumu basarisiz oldu!
    echo Lutfen Node.js'in yuklu oldugundan emin olun.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/2] Uygulama baslatiliyor (npm run dev)...
echo.
call npm run dev

pause
