import { PositionInterface } from "../types/position";

export const positionFormatted = (
  position?: Partial<PositionInterface>
): PositionInterface => ({
  id: position?.id ?? 0,
  positionName: position?.positionName ?? "New Position",
});
