# Arquitectura UrbanStep Intelligence Platform

## Principios

- **Clean Architecture**: separación entre presentación, servicios, repositorios e integraciones.
- **SOLID**: servicios pequeños, dependencias invertidas y DTOs explícitos.
- **Repository Pattern**: la aplicación consume contratos de datos, no implementaciones concretas.
- **React Server Components**: páginas server-first y componentes cliente solo para interacciones y gráficos.

## Estructura

```text
src/
├── ai                # Prompt corporativo, servicio OpenAI y validaciones
├── analytics         # Formateadores y helpers analíticos
├── app               # App Router, layout principal y API routes
├── components        # UI reutilizable, navegación y widgets de dashboard
├── forecasting       # Servicio y tipos preparados para forecast
├── lib               # Mock data, navegación, utilidades y acceso Prisma
├── repositories      # Contratos y repositorios mock/datos
├── services          # Casos de uso de dashboards e importación CSV
├── tests             # Pruebas unitarias focalizadas
└── types             # DTOs y tipos de dominio
```

## Flujo de datos

1. Las páginas (`src/app/**/page.tsx`) solicitan DTOs a los servicios.
2. Los servicios (`src/services`) orquestan repositorios y módulos auxiliares.
3. Los repositorios (`src/repositories`) encapsulan la obtención de datos mock o, en el futuro, Prisma/CSV.
4. La capa AI reutiliza el contexto de negocio y aplica un prompt corporativo consistente.

## Capas principales

### Presentación
- `AppShell` expone el layout principal enterprise y la navegación lateral.
- `components/charts` concentra visualizaciones Recharts desacopladas de la fuente de datos.
- `components/ui` ofrece piezas estilo ShadCN listas para reutilizar.

### Aplicación
- `DashboardService` arma los DTOs para CEO, Director Comercial y Director Financiero.
- `CsvImportService` deja preparada la importación de ficheros en `/data`.
- `ForecastService` aporta una estructura inicial para media móvil, regresión lineal y forecast mensual.

### Infraestructura
- `prisma/schema.prisma` define el modelo inicial para ventas, clientes, productos y objetivos.
- `src/lib/prisma.ts` deja lista la inicialización segura del cliente Prisma.
- `src/repositories/mock-dashboard.repository.ts` actúa como adaptador temporal para la demo.

## Evolución prevista

- Sustituir el repositorio mock por uno Prisma + importación CSV.
- Añadir autenticación y trazabilidad de prompts/consultas.
- Incorporar RAG y orquestación de agentes sobre los datos consolidados.
