import type { CharacterStatus } from "../types";

const COLORS: Record<CharacterStatus, string> = {
  Alive: "#2ecc71",
  Dead: "#e74c3c",
  unknown: "#95a5a6",
};

export function StatusDot({ status }: { status: CharacterStatus }) {
  return (
    <span
      className="status-dot"
      style={{ backgroundColor: COLORS[status] }}
      aria-hidden="true"
    />
  );
}
