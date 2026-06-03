import { readFile } from "node:fs/promises";
import path from "node:path";

export class CsvImportService {
  private readonly dataDirectory = path.join(process.cwd(), "data");
  readonly expectedFiles = [
    "Ventas2025.csv",
    "Ventas2026.csv",
    "Clientes.csv",
    "Productos.csv",
    "Objetivos.csv",
  ] as const;

  async loadDataset(fileName: (typeof this.expectedFiles)[number]) {
    const content = await readFile(path.join(this.dataDirectory, fileName), "utf8");
    return this.parseCsv(content);
  }

  parseCsv(content: string) {
    const normalizedContent = content.replaceAll("\r", "").trim();

    if (!normalizedContent) {
      return [];
    }

    const [headerLine, ...rows] = normalizedContent.split("\n");
    const headers = headerLine.split(",").map((header) => header.trim());

    return rows.filter(Boolean).map((row) => {
      const values = row.split(",").map((value) => value.trim());
      return headers.reduce<Record<string, string>>((record, header, index) => {
        record[header] = values[index] ?? "";
        return record;
      }, {});
    });
  }
}
