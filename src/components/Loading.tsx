import { CircleNotch } from 'phosphor-react';
import { ComponentPropsWithoutRef } from 'react';

type LoadingProps = ComponentPropsWithoutRef<'div'>;

export function Loading(props: LoadingProps) {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center overflow-hidden animate-spin"
      {...props}
    >
      <CircleNotch weight="bold" className="w-4 h-4" />
    </div>
  );
}
