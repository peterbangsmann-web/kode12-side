@echo off
rem Henter den nyeste udgave af Kode12. Kraever git og internet.
cd /d "%~dp0"
git pull
echo.
echo Faerdig. Luk vinduet, og opdater siden i browseren (F5).
pause
