import type { Sizes } from "@siberiana/schemas";

export function isWhat(sizes: Sizes): "diameter" | "3D" | "2D" | "none" {
  if (sizes.diameter > 0) return "diameter";
  if (sizes.depth > 0) return "3D";
  if (sizes.length > 0) return "2D";
  else return "none";
}

export function isZero(sizes: Sizes) {
  if (
    sizes.width === 0 &&
    sizes.height === 0 &&
    sizes.length === 0 &&
    sizes.depth === 0 &&
    sizes.diameter === 0
  )
    return true;
  else return false;
}

export function getLable(sizes: Sizes) {
  if (isZero(sizes)) return "__";
  if (sizes.diameter > 0)
    return `Высота: ${sizes.height} мм;\nДиаметр: ${sizes.diameter} мм;`;
  if (sizes.depth > 0)
    return `${sizes.width}x${sizes.height}x${sizes.depth} мм`;
  if (sizes.length > 0) return `${sizes.width}x${sizes.length} мм`;
  else return "";
}
