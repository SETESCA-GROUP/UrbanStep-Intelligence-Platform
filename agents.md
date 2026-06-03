# AGENTS.md

# UrbanStep Intelligence Platform

## Propósito

UrbanStep Intelligence Platform es una plataforma SaaS de inteligencia ejecutiva para la dirección de UrbanStep Footwear.

No estamos construyendo un dashboard tradicional de BI.

Estamos construyendo una plataforma que permita responder:

* ¿Cómo evoluciona el negocio?
* ¿Qué impulsa el crecimiento?
* ¿Qué destruye margen?
* ¿Qué riesgos existen?
* ¿Qué decisiones debería tomar la dirección?

---

# Contexto de negocio

UrbanStep Footwear opera en:

* España
* Francia
* Italia
* Alemania

Canales:

* Ecommerce
* Amazon
* Retail Partners
* Tiendas Propias

Narrativa principal:

## Año 2025

* Negocio estable
* Margen saludable
* Predominio del canal Retail

## Año 2026

* Crecimiento acelerado del Ecommerce
* Alemania lidera el crecimiento
* Running es la categoría más dinámica
* Outdoor presenta presión sobre márgenes
* Descenso del canal Retail tradicional

La aplicación debe reflejar esta historia de negocio.

---

# Tecnologías

Frontend:

* Next.js
* TypeScript
* TailwindCSS
* ShadCN
* Recharts

Backend:

* Prisma
* Supabase

Normas:

* TypeScript estricto
* No utilizar "any"
* Reutilizar componentes existentes
* Reutilizar servicios existentes
* Evitar duplicación de código

---

# Directorios importantes

Antes de modificar código revisar:

1. package.json
2. prisma/schema.prisma
3. src/app
4. src/components
5. src/lib
6. data

No crear funcionalidades que ya existan.

Buscar siempre reutilización antes de crear nuevos componentes.

---

# Datos

Los datos están en:

/data

Ficheros principales:

* Ventas2025.csv
* Ventas2026.csv
* Clientes.csv
* Productos.csv
* Objetivos.csv

Antes de crear modelos nuevos:

* Analizar relaciones existentes
* Identificar claves comunes
* Aprovechar estructuras existentes

---

# Visión del producto

La aplicación debe parecer un producto SaaS moderno.

Inspiración:

* Stripe Dashboard
* HubSpot Analytics
* Salesforce Executive Console
* Vercel Analytics

Evitar:

* Aspecto Power BI
* Informes excesivamente densos
* Pantallas puramente técnicas

Priorizar:

* Storytelling ejecutivo
* Experiencia de usuario
* Insights accionables
* Claridad visual

---

# Capacidades obligatorias

* Executive Command Center
* Growth Analytics
* Profitability Analytics
* Customer Intelligence
* Product Intelligence
* Forecast Center
* Executive Insights Engine
* Strategic Recommendations

---

# Motor de Insights

Los insights tienen más valor que los gráficos.

Siempre que sea posible detectar:

* Drivers de crecimiento
* Riesgos de margen
* Dependencia de clientes
* Concentración de ingresos
* Rendimiento por país
* Rendimiento por categoría

Cada insight debe incluir:

* Evidencia numérica
* Impacto
* Prioridad
* Recomendación

---

# Forma de trabajar

Antes de implementar:

1. Analizar el repositorio.
2. Analizar dependencias.
3. Analizar arquitectura.
4. Buscar código reutilizable.

Al implementar:

* Cambios pequeños
* Cambios focalizados
* Mínimo impacto colateral
* Mantener consistencia arquitectónica

No realizar refactorizaciones masivas sin solicitarlo.

---

# Validación

Antes de finalizar cualquier tarea:

Ejecutar:

npm run build

Ejecutar:

npm run lint

Ejecutar tests si existen.

Corregir errores antes de entregar.

No dejar errores de compilación.

---

# Criterio de éxito

Cada funcionalidad debe cumplir:

* Aporta valor ejecutivo
* Es visualmente profesional
* Está alineada con la arquitectura existente
* Es mantenible
* Es reutilizable
* Está preparada para entorno productivo

La prioridad es construir un producto empresarial, no una demo técnica.
