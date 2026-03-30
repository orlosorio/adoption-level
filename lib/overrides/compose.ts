import type { ComponentType } from "react";

export function compose<P extends object>(
  Component: ComponentType<P>,
  ...overrides: Array<
    (c: ComponentType<any>, config?: any) => ComponentType<any>
  >
) {
  return overrides.reduceRight(
    (acc, override) => override(acc),
    Component as any,
  ) as ComponentType<P>;
}
