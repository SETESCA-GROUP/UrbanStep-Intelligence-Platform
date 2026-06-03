import { describe, expect, it } from "vitest";
import { CsvImportService } from "@/services/csv-import.service";

describe("CsvImportService", () => {
  it("parses CSV rows into keyed objects", () => {
    const service = new CsvImportService();
    const rows = service.parseCsv(`month,revenue
Jan,100
Feb,120`);

    expect(rows).toEqual([
      { month: "Jan", revenue: "100" },
      { month: "Feb", revenue: "120" },
    ]);
  });

  it("returns an empty array for empty content", () => {
    const service = new CsvImportService();
    expect(service.parseCsv("")).toEqual([]);
  });
});
