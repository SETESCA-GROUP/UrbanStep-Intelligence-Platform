import type { DashboardSnapshot } from "@/types/domain";

export interface DashboardRepository {
  getSnapshot(): Promise<DashboardSnapshot>;
}
