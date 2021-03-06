import { Children, ComponentPropsWithoutRef } from 'react';
import { FeedbackType, feedbackTypes } from '../../../static/FeedbackTypes';
import { CloseButton } from '../../CloseButton';

type FeedbackTypeStepProps = ComponentPropsWithoutRef<'div'> & {
  onFeedbackTypeChanged(key: FeedbackType): void;
};

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
  ...rest
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Leave your feedback</span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full" {...rest}>
        {Children.toArray(
          Object.entries(feedbackTypes).map(([key, value]) => {
            return (
              <button
                className="
                  dark:bg-zinc-800
                  bg-zinc-100
                  rounded-lg
                  py-5
                  w-24
                  flex-1
                  flex
                  flex-col
                  items-center
                  gap-2
                  border-2
                  border-transparent
                  hover:border-brand-500
                  focus:border-brand-500
                  focus:outline-none
                "
                type="button"
                onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              >
                <img src={value.image.source} alt={value.image.alt} />

                <span>{value.title}</span>
              </button>
            );
          })
        )}
      </div>
    </>
  );
}
