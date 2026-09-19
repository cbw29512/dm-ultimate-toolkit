export type Permitless = "no" | "21" | "18";

export type CarryState = {
  code: string;
  name: string;
  permitless: Permitless;
  sensitive: boolean;
  note: string;
};

export const CARRY_STATES: CarryState[] = [
  { code: "AL", name: "Alabama", permitless: "18", sensitive: false, note: "Permitless for eligible adults. Confirm prohibited places." },
  { code: "AK", name: "Alaska", permitless: "21", sensitive: false, note: "Permitless with residency/presence caveats." },
  { code: "AZ", name: "Arizona", permitless: "21", sensitive: false, note: "Permitless for eligible adults." },
  { code: "AR", name: "Arkansas", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "CA", name: "California", permitless: "no", sensitive: true, note: "May-issue / highly restricted. Magazine and location rules are strict." },
  { code: "CO", name: "Colorado", permitless: "no", sensitive: false, note: "Shall-issue. Local restrictions and magazine rules apply." },
  { code: "CT", name: "Connecticut", permitless: "no", sensitive: true, note: "Permit required. Recognition is limited." },
  { code: "DE", name: "Delaware", permitless: "no", sensitive: false, note: "Permit required. Check current recognition list." },
  { code: "FL", name: "Florida", permitless: "21", sensitive: false, note: "Permitless 21+. 18–20 generally need a permit path." },
  { code: "GA", name: "Georgia", permitless: "21", sensitive: false, note: "Permitless for eligible adults 21+." },
  { code: "HI", name: "Hawaii", permitless: "no", sensitive: true, note: "May-issue. Do not assume any mainland permit works." },
  { code: "ID", name: "Idaho", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "IL", name: "Illinois", permitless: "no", sensitive: true, note: "FOID + CCL regime. Chicago and transit rules need a separate check." },
  { code: "IN", name: "Indiana", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "IA", name: "Iowa", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "KS", name: "Kansas", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "KY", name: "Kentucky", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "LA", name: "Louisiana", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "ME", name: "Maine", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "MD", name: "Maryland", permitless: "no", sensitive: true, note: "Permit required. Recognition is narrow." },
  { code: "MA", name: "Massachusetts", permitless: "no", sensitive: true, note: "License required. Do not assume reciprocity." },
  { code: "MI", name: "Michigan", permitless: "no", sensitive: false, note: "Shall-issue. Confirm CPL recognition for your permit." },
  { code: "MN", name: "Minnesota", permitless: "no", sensitive: false, note: "Permit required. Check permit-to-carry recognition." },
  { code: "MS", name: "Mississippi", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "MO", name: "Missouri", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "MT", name: "Montana", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "NE", name: "Nebraska", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "NV", name: "Nevada", permitless: "no", sensitive: false, note: "Shall-issue. Confirm recognition." },
  { code: "NH", name: "New Hampshire", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "NJ", name: "New Jersey", permitless: "no", sensitive: true, note: "Permit required. Transport rules are strict." },
  { code: "NM", name: "New Mexico", permitless: "no", sensitive: false, note: "Shall-issue. Confirm recognition." },
  { code: "NY", name: "New York", permitless: "no", sensitive: true, note: "Permit required. NYC is a separate, stricter regime." },
  { code: "NC", name: "North Carolina", permitless: "18", sensitive: false, note: "Permitless for eligible adults; confirm current statute." },
  { code: "ND", name: "North Dakota", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "OH", name: "Ohio", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "OK", name: "Oklahoma", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "OR", name: "Oregon", permitless: "no", sensitive: false, note: "Shall-issue. Magazine and local rules need a check." },
  { code: "PA", name: "Pennsylvania", permitless: "no", sensitive: false, note: "Shall-issue. Vehicle and Philadelphia rules need a check." },
  { code: "RI", name: "Rhode Island", permitless: "no", sensitive: true, note: "Permit required. Recognition is limited." },
  { code: "SC", name: "South Carolina", permitless: "18", sensitive: false, note: "Permitless for eligible adults. Florence desk default origin." },
  { code: "SD", name: "South Dakota", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "TN", name: "Tennessee", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "TX", name: "Texas", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "UT", name: "Utah", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "VT", name: "Vermont", permitless: "18", sensitive: false, note: "Permitless for eligible adults." },
  { code: "VA", name: "Virginia", permitless: "no", sensitive: false, note: "Shall-issue. Confirm whether your permit is recognized." },
  { code: "WA", name: "Washington", permitless: "no", sensitive: false, note: "Permit required. Magazine and training rules apply." },
  { code: "WV", name: "West Virginia", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "WI", name: "Wisconsin", permitless: "no", sensitive: false, note: "Shall-issue. Confirm recognition." },
  { code: "WY", name: "Wyoming", permitless: "21", sensitive: false, note: "Permitless 21+." },
  { code: "DC", name: "District of Columbia", permitless: "no", sensitive: true, note: "Registration/permit regime. Do not treat as a state reciprocity hop." },
];

const ADJACENT: Record<string, string[]> = {
  AL: ["FL", "GA", "MS", "TN"],
  AK: [],
  AZ: ["CA", "NV", "UT", "CO", "NM"],
  AR: ["MO", "TN", "MS", "LA", "TX", "OK"],
  CA: ["OR", "NV", "AZ"],
  CO: ["WY", "NE", "KS", "OK", "NM", "AZ", "UT"],
  CT: ["NY", "MA", "RI"],
  DE: ["MD", "PA", "NJ"],
  FL: ["AL", "GA"],
  GA: ["FL", "AL", "TN", "NC", "SC"],
  HI: [],
  ID: ["MT", "WY", "UT", "NV", "OR", "WA"],
  IL: ["WI", "IA", "MO", "KY", "IN", "MI"],
  IN: ["MI", "OH", "KY", "IL"],
  IA: ["MN", "WI", "IL", "MO", "NE", "SD"],
  KS: ["NE", "MO", "OK", "CO"],
  KY: ["IL", "IN", "OH", "WV", "VA", "TN", "MO"],
  LA: ["TX", "AR", "MS"],
  ME: ["NH"],
  MD: ["PA", "DE", "VA", "WV", "DC"],
  MA: ["NY", "VT", "NH", "RI", "CT"],
  MI: ["OH", "IN", "WI", "IL"],
  MN: ["WI", "IA", "SD", "ND"],
  MS: ["LA", "AR", "TN", "AL"],
  MO: ["IA", "IL", "KY", "TN", "AR", "OK", "KS", "NE"],
  MT: ["ND", "SD", "WY", "ID"],
  NE: ["SD", "IA", "MO", "KS", "CO", "WY"],
  NV: ["OR", "ID", "UT", "AZ", "CA"],
  NH: ["VT", "ME", "MA"],
  NJ: ["NY", "PA", "DE"],
  NM: ["AZ", "CO", "OK", "TX"],
  NY: ["PA", "NJ", "CT", "MA", "VT"],
  NC: ["VA", "TN", "GA", "SC"],
  ND: ["MN", "SD", "MT"],
  OH: ["PA", "WV", "KY", "IN", "MI"],
  OK: ["KS", "MO", "AR", "TX", "NM", "CO"],
  OR: ["WA", "ID", "NV", "CA"],
  PA: ["NY", "NJ", "DE", "MD", "WV", "OH"],
  RI: ["CT", "MA"],
  SC: ["NC", "GA"],
  SD: ["ND", "MN", "IA", "NE", "WY", "MT"],
  TN: ["KY", "VA", "NC", "GA", "AL", "MS", "AR", "MO"],
  TX: ["NM", "OK", "AR", "LA"],
  UT: ["ID", "WY", "CO", "AZ", "NV"],
  VT: ["NY", "NH", "MA"],
  VA: ["MD", "DC", "NC", "TN", "KY", "WV"],
  WA: ["OR", "ID"],
  WV: ["OH", "PA", "MD", "VA", "KY"],
  WI: ["MN", "IA", "IL", "MI"],
  WY: ["MT", "SD", "NE", "CO", "UT", "ID"],
  DC: ["MD", "VA"],
};

export type AgeBand = "18-20" | "21+";
export type PermitKind = "none" | "sc" | "other";

export type StateFlag = {
  state: CarryState;
  attention: "ok" | "check" | "high";
  headline: string;
  detail: string;
};

export function findState(code: string) {
  return CARRY_STATES.find((s) => s.code === code);
}

export function routeStates(from: string, to: string): string[] | null {
  if (from === to) return [from];
  const queue: string[][] = [[from]];
  const seen = new Set([from]);
  while (queue.length) {
    const path = queue.shift();
    if (!path) break;
    const last = path[path.length - 1];
    for (const next of ADJACENT[last] ?? []) {
      if (seen.has(next)) continue;
      const nextPath = [...path, next];
      if (next === to) return nextPath;
      seen.add(next);
      queue.push(nextPath);
    }
  }
  return null;
}

export function flagState(state: CarryState, age: AgeBand, permit: PermitKind): StateFlag {
  const ageOk = age === "21+" || state.permitless === "18";
  const permitlessFits = state.permitless !== "no" && ageOk;

  if (state.sensitive) {
    return {
      state,
      attention: "high",
      headline: "High attention",
      detail: `${state.name} is a restricted regime. ${state.note} A permit from another state is not a guarantee.`,
    };
  }

  if (permitlessFits) {
    return {
      state,
      attention: "ok",
      headline: state.permitless === "18" ? "Permitless (18+ snapshot)" : "Permitless (21+ snapshot)",
      detail: `${state.note} This desk never certifies that you personally qualify.`,
    };
  }

  if (state.permitless === "21" && age === "18-20") {
    return {
      state,
      attention: "high",
      headline: "Age band mismatch",
      detail: `${state.name} permitless snapshot is 21+. At 18–20 you generally need a valid permit path, if one exists.`,
    };
  }

  if (permit === "sc" || permit === "other") {
    return {
      state,
      attention: "check",
      headline: "Permit recognition check",
      detail: `${state.name} is not treated as permitless on this desk. Confirm whether your specific permit is recognized today.`,
    };
  }

  return {
    state,
    attention: "high",
    headline: "Permit likely required",
    detail: `${state.name} is not permitless on this snapshot and you listed no permit. Do not carry based on this page.`,
  };
}

export const PRESET_TRIPS = [
  { id: "richmond", label: "Florence, SC → Richmond, VA", from: "SC", to: "VA" },
  { id: "atlanta", label: "Florence, SC → Atlanta, GA", from: "SC", to: "GA" },
  { id: "orlando", label: "Florence, SC → Orlando, FL", from: "SC", to: "FL" },
  { id: "charlotte", label: "Florence, SC → Charlotte, NC", from: "SC", to: "NC" },
  { id: "nashville", label: "Florence, SC → Nashville, TN", from: "SC", to: "TN" },
];

export const SNAPSHOT_DATE = "September 17, 2026";
