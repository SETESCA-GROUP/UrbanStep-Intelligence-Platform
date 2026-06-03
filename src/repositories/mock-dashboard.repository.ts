import { mockDashboardSnapshot } from "@/lib/mock-data";
import type { DashboardRepository } from "@/repositories/dashboard.repository";

export class MockDashboardRepository implements DashboardRepository {
  async getSnapshot() {
    return structuredClone(mockDashboardSnapshot);
  }
}
