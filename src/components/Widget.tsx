import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';
import { ComponentPropsWithoutRef } from 'react';

type WidgetProps = ComponentPropsWithoutRef<'div'>;

export function Widget(props: WidgetProps) {
  return (
    <Popover className="absolute bottom-5 right-5" {...props}>
      <Popover.Panel>hello world</Popover.Panel>

      <Popover.Button className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
        <ChatTeardropDots className="w-6 h-6" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2" />
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
