# UrbanStep Intelligence Platform

Plataforma enterprise de Business Intelligence e Inteligencia Artificial para UrbanStep Footwear, preparada para demo ejecutiva sobre Next.js 15, TypeScript, TailwindCSS, ShadCN UI, Recharts, Prisma y SQLite.

## Alcance de este PR inicial

- Base profesional con **Next.js 15 + App Router + React Server Components**.
- Arquitectura organizada por **Clean Architecture, Repository Pattern y Services Layer**.
- Configuración inicial de **Prisma + SQLite**.
- Configuración **ShadCN-ready** con componentes reutilizables.
- Dashboard Ejecutivo, Comercial y Financiero con **datos mock**.
- Módulo Forecast y AI Assistant preparados para evolucionar.
- Carpeta `/data` lista para importar los CSV de negocio.

## Stack

- Next.js 15
- TypeScript
- TailwindCSS
- ShadCN UI (configuración lista)
- Recharts
- Prisma ORM
- SQLite
- OpenAI SDK

## Puesta en marcha

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

Abrir `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run type-check
npm run test
npm run build
npm run prisma:generate
npm run prisma:push
```

## Estructura

```text
src/
├── ai
├── analytics
├── app
├── components
├── forecasting
├── lib
├── repositories
├── services
├── tests
└── types
```

## Datos esperados en `/data`

- `Ventas2025.csv`
- `Ventas2026.csv`
- `Clientes.csv`
- `Productos.csv`
- `Objetivos.csv`

## Próximos pasos naturales

1. Conectar importación CSV a Prisma.
2. Sustituir repositorios mock por repositorios reales.
3. Añadir autenticación, auditoría y trazabilidad de prompts.
4. Evolucionar forecasting y asistentes IA con datos reales.

## Arquitectura

Consulta `/docs/architecture.md` para el detalle de capas, módulos y flujo de datos.
