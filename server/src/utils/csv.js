export function toCsv(rows) {
  const plainRows = rows.map((row) => row.toObject ? row.toObject() : row);
  const keys = Object.keys(plainRows[0] || {}).filter((key) => !["__v", "password"].includes(key));
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [keys.join(","), ...plainRows.map((row) => keys.map((key) => escape(row[key])).join(","))].join("\n");
}
