import { ArrowLeft } from 'phosphor-react';
import { ComponentPropsWithoutRef, FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '../../../static/FeedbackTypes';
import { CloseButton } from '../../CloseButton';
import { CameraButton } from '../CameraButton';

type FeedbackContentStepProps = ComponentPropsWithoutRef<'div'> & {
  feedbackType: FeedbackType;
  onRestartFeedback(): void;
};

export function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  ...rest
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({
      comment,
      screenshot,
    });
  }

  return (
    <>
      <header {...rest}>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={onRestartFeedback}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />

          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="
            min-w-[304px]
            w-full
            min-h-[112px]
            text-sm
            placeholder-zinc-400 
            text-zinc-100 
            border-zinc-600 
            bg-transparent  
            rounded-md
            focus:border-brand-500
            focus:ring-brand-500
            focus:ring-1
            resize-none
            focus:outline-none
            scrollbar-thumb-zinc-700
            scrollbar-track-transparent
            scrollbar-thin
          "
          placeholder="Tell in details what's happening..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <CameraButton
            onTakeScreenshot={setScreenshot}
            screenshot={screenshot}
          />

          <button
            type="submit"
            disabled={!comment}
            className="
              p-2 
              bg-brand-500 
              rounded-md 
              border-transparent 
              flex-1 
              flex 
              justify-center 
              items-center 
              text-sm 
              hover:bg-brand-300
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-zinc-900
              focus:ring-brand-500
              transition-all
              disabled:opacity-50
              disabled:hover:bg-brand-500
            "
          >
            Send feedback
          </button>
        </footer>
      </form>
    </>
  );
}
