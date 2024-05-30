@echo off

echo Verificando si Node.js está instalado...
node -v >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js ya está instalado.
) else (
    echo Instalando Node.js...
    chocolatey install nodejs
    echo Node.js instalado correctamente.
)

echo Verificando si Vue CLI está instalado...
vue --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Vue CLI ya está instalado.
) else (
    echo Instalando Vue CLI...
    npm install -g @vue/cli
    echo Vue CLI instalado correctamente.
)

echo Clonando tu repositorio o moviéndote a tu proyecto de Vue...

cd ruta_de_tu_proyecto

echo Instalando dependencias del proyecto...
npm install
echo Dependencias instaladas correctamente.

echo Iniciando proyecto...
start "" "http://localhost:5020"  // Abre el navegador en la URL especificada
start "" "http://localhost:5021" 
npm run serve
