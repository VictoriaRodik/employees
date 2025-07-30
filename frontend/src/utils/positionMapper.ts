import { PositionInterface, ApiPosition } from "../types/position";

export const mapToApiPosition = (position: PositionInterface) => ({
  id: position.id,
  name: position.positionName,
});

export const mapFromApiPosition = (
  position: ApiPosition
): PositionInterface => ({
  id: position.id,
  positionName: position.name,
});
