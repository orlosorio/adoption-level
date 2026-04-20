import type { ComponentType } from 'react';

type Override = <Q extends object>(c: ComponentType<Q>) => ComponentType<Q>;

export function compose<P extends object>(
  Component: ComponentType<P>,
  ...overrides: Override[]
): ComponentType<P> {
  return overrides.reduceRight<ComponentType<P>>((acc, override) => override(acc), Component);
}
