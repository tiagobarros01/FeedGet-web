import { ComponentPropsWithoutRef, useState } from 'react';
import { FeedbackType } from '../../static/FeedbackTypes';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';

type WidgetFormProps = ComponentPropsWithoutRef<'div'>;

export function WidgetForm(props: WidgetFormProps) {
  const [feedbackType, setFeedbackTypes] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackTypes(null);
  }

  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"
      {...props}
    >
      {feedbackSent ? (
        <FeedbackSuccessStep onRestartFeedback={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackTypes} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onRestartFeedback={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        made with ♥ by {' '}
        <a
          className="underline underline-offset-2"
          href="https://github.com/tiagobarros01"
        >
          Tiago Barros
        </a>
      </footer>
    </div>
  );
}
