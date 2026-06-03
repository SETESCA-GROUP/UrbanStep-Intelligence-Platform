import type { MonthlyRevenueRecord } from "@/types/domain";

export function calculateGrossMarginRevenue(records: MonthlyRevenueRecord[]) {
  return records.reduce(
    (total, record) => total + record.revenue * (record.grossMargin / 100),
    0
  );
}

export function calculateAverageMargin(records: MonthlyRevenueRecord[]) {
  if (!records.length) return 0;
  return records.reduce((total, record) => total + record.grossMargin, 0) / records.length;
}
