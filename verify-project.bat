@echo off
REM verify-project.ps1 - Script para verificar la estructura del proyecto Angular en Windows

echo.
echo ================================================
echo   Verificacion del Proyecto Angular
echo   Colombia Cafe Lab
echo ================================================
echo.

setlocal enabledelayedexpansion
set "PASS=0"
set "FAIL=0"

REM Verificar carpetas
echo Verificando carpetas...

if exist "src\app" (
  echo [OK] src\app
  set /a PASS+=1
) else (
  echo [ERROR] src\app (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "src\app\components" (
  echo [OK] src\app\components
  set /a PASS+=1
) else (
  echo [ERROR] src\app\components (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "src\app\pages" (
  echo [OK] src\app\pages
  set /a PASS+=1
) else (
  echo [ERROR] src\app\pages (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "src\app\services" (
  echo [OK] src\app\services
  set /a PASS+=1
) else (
  echo [ERROR] src\app\services (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "data" (
  echo [OK] data
  set /a PASS+=1
) else (
  echo [ERROR] data (NO ENCONTRADO)
  set /a FAIL+=1
)

echo.
echo Verificando archivos de configuracion...

if exist "package.json" (
  echo [OK] package.json
  set /a PASS+=1
) else (
  echo [ERROR] package.json (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "angular.json" (
  echo [OK] angular.json
  set /a PASS+=1
) else (
  echo [ERROR] angular.json (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "tsconfig.json" (
  echo [OK] tsconfig.json
  set /a PASS+=1
) else (
  echo [ERROR] tsconfig.json (NO ENCONTRADO)
  set /a FAIL+=1
)

echo.
echo Verificando componentes principales...

if exist "src\app\components\header.component.ts" (
  echo [OK] header.component.ts
  set /a PASS+=1
) else (
  echo [ERROR] header.component.ts (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "src\app\pages\home.component.ts" (
  echo [OK] home.component.ts
  set /a PASS+=1
) else (
  echo [ERROR] home.component.ts (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "src\app\pages\catalog.component.ts" (
  echo [OK] catalog.component.ts
  set /a PASS+=1
) else (
  echo [ERROR] catalog.component.ts (NO ENCONTRADO)
  set /a FAIL+=1
)

echo.
echo Verificando servicios...

if exist "src\app\services\coffee.service.ts" (
  echo [OK] coffee.service.ts
  set /a PASS+=1
) else (
  echo [ERROR] coffee.service.ts (NO ENCONTRADO)
  set /a FAIL+=1
)

echo.
echo Verificando documentacion...

if exist "README.md" (
  echo [OK] README.md
  set /a PASS+=1
) else (
  echo [ERROR] README.md (NO ENCONTRADO)
  set /a FAIL+=1
)

if exist "DOCUMENTACION.md" (
  echo [OK] DOCUMENTACION.md
  set /a PASS+=1
) else (
  echo [ERROR] DOCUMENTACION.md (NO ENCONTRADO)
  set /a FAIL+=1
)

echo.
echo ================================================
echo   RESULTADOS
echo ================================================
echo Verificados: !PASS!
echo Errores: !FAIL!
echo.

if !FAIL! equ 0 (
  echo [SUCCESS] Proyecto completamente configurado
) else (
  echo [WARNING] Faltan algunos archivos
)

echo.
echo ================================================
echo   PROXIMOS PASOS
echo ================================================
echo 1. Instalar dependencias:
echo    npm install --legacy-peer-deps
echo.
echo 2. Ejecutar en desarrollo:
echo    npm start
echo.
echo 3. Crear build para produccion:
echo    npm run build
echo.
echo 4. Leer documentacion:
echo    README.md
echo.
echo ================================================
echo.
pause
