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
      className="dark:bg-zinc-900 bg-white p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"
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

      <footer className="text-xs dark:text-neutral-400 text-zinc-500">
        made with ♥ by{' '}
        <a
          className="underline underline-offset-2"
          href="https://github.com/tiagobarros01"
          target="_blank"
        >
          Tiago Barros
        </a>
      </footer>
    </div>
  );
}
