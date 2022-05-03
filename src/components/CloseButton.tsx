import { Popover } from '@headlessui/react';
import { X } from 'phosphor-react';
import { ComponentPropsWithRef } from 'react';

type CloseButtonProps = ComponentPropsWithRef<'button'>;

export function CloseButton(props: CloseButtonProps) {
  return (
    <Popover.Button
      className="
        top-5
        right-5 absolute 
      text-zinc-400
      hover:text-zinc-100 
        border-2 border-transparent 
      focus:border-brand-500 
        focus:outline-none
        transition-colors
      "
      title="Close feedback form"
      {...props}
    >
      <X weight="bold" className="w-4 h-4" />
    </Popover.Button>
  );
}
