import { promises as fs } from "fs";
import path from "path";

export interface CopyRow {
  id: string;
  page: string;
  section: string;
  field: string;
  current_text: string;
  new_text: string;
  notes: string;
}

const CSV_PATH = path.join(process.cwd(), "content", "copywriting-sheet.csv");
const HEADERS = [
  "id",
  "page",
  "section",
  "field",
  "current_text",
  "new_text",
  "notes",
] as const;

function parseCsvLineCells(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i += 1;
        continue;
      }
      if (ch === '"') {
        inQuotes = false;
        continue;
      }
      cell += ch;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    if (ch !== "\r") {
      cell += ch;
    }
  }

  row.push(cell);
  if (row.length > 1 || row[0] !== "") {
    rows.push(row);
  }

  return rows;
}

function escapeCsvValue(value: string): string {
  const needsQuotes = value.includes(",") || value.includes('"') || value.includes("\n");
  if (!needsQuotes) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

export async function readCopyRows(): Promise<CopyRow[]> {
  const raw = await fs.readFile(CSV_PATH, "utf8");
  const rows = parseCsvLineCells(raw);

  if (rows.length === 0) return [];

  const headerIndex: Record<string, number> = {};
  rows[0].forEach((h, idx) => {
    headerIndex[h] = idx;
  });

  return rows.slice(1).map((r) => ({
    id: r[headerIndex.id] ?? "",
    page: r[headerIndex.page] ?? "",
    section: r[headerIndex.section] ?? "",
    field: r[headerIndex.field] ?? "",
    current_text: r[headerIndex.current_text] ?? "",
    new_text: r[headerIndex.new_text] ?? "",
    notes: r[headerIndex.notes] ?? "",
  }));
}

export async function writeCopyRows(rows: CopyRow[]): Promise<void> {
  const header = HEADERS.join(",");
  const body = rows
    .map((r) =>
      HEADERS.map((h) => escapeCsvValue(String(r[h] ?? ""))).join(",")
    )
    .join("\n");
  const next = `${header}\n${body}\n`;
  await fs.writeFile(CSV_PATH, next, "utf8");
}

export async function readCopyCsvRaw(): Promise<string> {
  return fs.readFile(CSV_PATH, "utf8");
}
