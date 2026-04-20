#!/bin/bash
# verify-project.sh - Script para verificar la estructura del proyecto Angular

echo "================================================"
echo "  Verificación del Proyecto Angular"
echo "  Colombia Café Lab"
echo "================================================"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador
PASS=0
FAIL=0

# Función para verificar archivos
check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1"
    ((PASS++))
  else
    echo -e "${RED}✗${NC} $1 (NO ENCONTRADO)"
    ((FAIL++))
  fi
}

# Función para verificar directorios
check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $1/"
    ((PASS++))
  else
    echo -e "${RED}✗${NC} $1/ (NO ENCONTRADO)"
    ((FAIL++))
  fi
}

echo "📁 Verificando estructura de carpetas..."
check_dir "src/app"
check_dir "src/app/components"
check_dir "src/app/pages"
check_dir "src/app/services"
check_dir "src/app/models"
check_dir "data"
check_dir "css"
echo ""

echo "📄 Verificando archivos de configuración..."
check_file "package.json"
check_file "angular.json"
check_file "tsconfig.json"
check_file "tsconfig.app.json"
check_file "tsconfig.spec.json"
echo ""

echo "🎯 Verificando componentes..."
check_file "src/app/app.component.ts"
check_file "src/app/app.routes.ts"
check_file "src/app/components/header.component.ts"
check_file "src/app/components/footer.component.ts"
check_file "src/app/components/coffee-card.component.ts"
echo ""

echo "📄 Verificando páginas..."
check_file "src/app/pages/home.component.ts"
check_file "src/app/pages/catalog.component.ts"
check_file "src/app/pages/coffee-details.component.ts"
check_file "src/app/pages/favorites.component.ts"
check_file "src/app/pages/contact.component.ts"
check_file "src/app/pages/admin.component.ts"
echo ""

echo "🔧 Verificando servicios..."
check_file "src/app/services/coffee.service.ts"
check_file "src/app/services/admin.service.ts"
echo ""

echo "🎨 Verificando modelos..."
check_file "src/app/models/coffee.model.ts"
check_file "src/app/models/contact.model.ts"
echo ""

echo "🚀 Verificando archivos de entrada..."
check_file "src/main.ts"
check_file "src/app.config.ts"
check_file "src/index.html"
echo ""

echo "📚 Verificando documentación..."
check_file "README.md"
check_file "COMPONENTES.md"
check_file "SERVICIOS.md"
check_file "BINDING.md"
check_file "INSTALACION.md"
check_file "CONVERSION_RESUMEN.md"
check_file "DOCUMENTACION.md"
echo ""

echo "📊 Verificando datos..."
check_file "data/productos.json"
check_file "css/styles.css"
echo ""

echo "================================================"
echo "  RESULTADOS"
echo "================================================"
echo -e "${GREEN}✓ Verificados: $PASS${NC}"
if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}✓ Errores: 0${NC}"
  echo ""
  echo -e "${GREEN}✅ Proyecto completamente configurado${NC}"
else
  echo -e "${RED}✗ Errores: $FAIL${NC}"
  echo ""
  echo -e "${RED}❌ Faltan archivos${NC}"
fi
echo ""

echo "================================================"
echo "  PRÓXIMOS PASOS"
echo "================================================"
echo "1. Instalar dependencias:"
echo "   npm install --legacy-peer-deps"
echo ""
echo "2. Ejecutar en desarrollo:"
echo "   npm start"
echo ""
echo "3. Crear build para producción:"
echo "   npm run build"
echo ""
echo "4. Leer documentación:"
echo "   README.md"
echo ""
echo "================================================"
