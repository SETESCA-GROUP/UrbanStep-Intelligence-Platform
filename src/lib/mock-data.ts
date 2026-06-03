import type { DashboardSnapshot } from "@/types/domain";

export const mockDashboardSnapshot: DashboardSnapshot = {
  previousYearRevenue: 4_820_000,
  annualRevenueTarget: 5_600_000,
  grossMarginTarget: 47,
  monthlyRevenue: [
    { name: "Jan", revenue: 380_000, units: 12_100, grossMargin: 45.8 },
    { name: "Feb", revenue: 402_000, units: 12_850, grossMargin: 46.2 },
    { name: "Mar", revenue: 418_000, units: 13_300, grossMargin: 46.5 },
    { name: "Apr", revenue: 431_000, units: 13_750, grossMargin: 46.9 },
    { name: "May", revenue: 447_000, units: 14_220, grossMargin: 47.1 },
    { name: "Jun", revenue: 465_000, units: 14_950, grossMargin: 47.5 },
    { name: "Jul", revenue: 472_000, units: 15_200, grossMargin: 47.8 },
    { name: "Aug", revenue: 458_000, units: 14_680, grossMargin: 46.8 },
    { name: "Sep", revenue: 486_000, units: 15_600, grossMargin: 47.7 },
    { name: "Oct", revenue: 501_000, units: 16_050, grossMargin: 48.1 },
    { name: "Nov", revenue: 523_000, units: 16_880, grossMargin: 48.4 },
    { name: "Dec", revenue: 548_000, units: 17_560, grossMargin: 49.1 },
  ],
  salesByCountry: [
    { name: "España", value: 1_890_000 },
    { name: "Francia", value: 1_335_000 },
    { name: "Italia", value: 1_122_000 },
    { name: "Alemania", value: 1_184_000 },
  ],
  salesByChannel: [
    { name: "Ecommerce", value: 1_960_000 },
    { name: "Amazon", value: 1_210_000 },
    { name: "Retail Partners", value: 1_452_000 },
    { name: "Tiendas Propias", value: 909_000 },
  ],
  topProducts: [
    { name: "US-RUN-01", value: 498_000, margin: 52 },
    { name: "US-URBAN-04", value: 471_000, margin: 50 },
    { name: "US-TRAIN-07", value: 446_000, margin: 48 },
    { name: "US-LITE-11", value: 428_000, margin: 46 },
  ],
  categoryProfitability: [
    { name: "Running", value: 1_840_000, margin: 49.6 },
    { name: "Lifestyle", value: 2_010_000, margin: 46.8 },
    { name: "Training", value: 1_111_000, margin: 44.2 },
  ],
  salesByManager: [
    { name: "Laura Martín", value: 1_520_000 },
    { name: "Adrien Petit", value: 1_260_000 },
    { name: "Giulia Conti", value: 1_115_000 },
    { name: "Lukas Weber", value: 1_636_000 },
  ],
  goalsVsActual: [
    { name: "Q1", actual: 1_200_000, target: 1_150_000 },
    { name: "Q2", actual: 1_343_000, target: 1_310_000 },
    { name: "Q3", actual: 1_416_000, target: 1_390_000 },
    { name: "Q4", actual: 1_572_000, target: 1_750_000 },
  ],
  marginByProduct: [
    { name: "US-RUN-01", value: 498_000, margin: 52 },
    { name: "US-URBAN-04", value: 471_000, margin: 50 },
    { name: "US-TRAIN-07", value: 446_000, margin: 48 },
    { name: "US-LITE-11", value: 428_000, margin: 46 },
  ],
  varianceByMonth: [
    { name: "Jul", value: -12_000 },
    { name: "Aug", value: -18_500 },
    { name: "Sep", value: -7_600 },
    { name: "Oct", value: 4_200 },
    { name: "Nov", value: 8_500 },
    { name: "Dec", value: 12_300 },
  ],
  financialForecast: [
    {
      name: "Base",
      value: 5_620_000,
      description: "Escenario central basado en run-rate actual y mix por canal.",
    },
    {
      name: "Optimista",
      value: 5_780_000,
      description: "Mayor contribución de ecommerce y mejora de margen en running.",
    },
    {
      name: "Conservador",
      value: 5_430_000,
      description: "Presión promocional en Amazon y menor ticket medio en retail.",
    },
  ],
};
