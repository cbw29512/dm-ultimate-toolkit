export type EarlierSave =
  | { status: "empty" }
  | { status: "available"; json: string }
  | { status: "error"; message: string };

export function earlierWorkbenchBackup(storage: Pick<Storage, "getItem">): EarlierSave {
  try {
    // Preserve the exact earlier value, including saves too old to understand today.
    const raw = storage.getItem("iron-pit-hall");
    if (raw === null) return { status: "empty" };
    return { status: "available", json: JSON.stringify({
      schemaVersion: 1, source: "dm-ultimate-toolkit-workbench", savedAt: new Date().toISOString(),
      originalStorageKey: "iron-pit-hall", originalValue: raw,
    }, null, 2) };
  } catch (error) {
    console.error("[toolkit] Cannot read earlier workbench data", error);
    return { status: "error", message: "Earlier saves could not be read. Your data has not been changed." };
  }
}
