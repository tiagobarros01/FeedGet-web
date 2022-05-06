import axios from 'axios';
import { ArrowLeft } from 'phosphor-react';
import { ComponentPropsWithoutRef, FormEvent, useState } from 'react';
import { api } from '../../../services/api';
import { FeedbackType, feedbackTypes } from '../../../static/FeedbackTypes';
import { CloseButton } from '../../CloseButton';
import { Loading } from '../../Loading';
import { CameraButton } from '../CameraButton';

function feedbackInputPlaceholder(type: FeedbackType): string {
  switch (type) {
    case 'BUG':
      return 'Is something not working right? We want to change. Tell us in detail what is...';

    case 'IDEA':
      return 'Got an idea for improvement or a new feature? Tell us!';

    default:
      return 'We want to hear from you. What would you like to tell us?';
  }
}

type FeedbackContentStepProps = ComponentPropsWithoutRef<'div'> & {
  feedbackType: FeedbackType;
  onRestartFeedback(): void;
  onFeedbackSent(): void;
};

export function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  onFeedbackSent,
  ...rest
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    setIsSendingFeedback(true);

    event.preventDefault();

    const paramsToSubmit: any = {
      type: feedbackType,
      comment,
      screenshot,
    };

    if (!screenshot) {
      delete paramsToSubmit.screenshot;
    }

    try {
      await api.post('/feedbacks', paramsToSubmit);

      onFeedbackSent();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data || err.message);
      }
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <>
      <header className="animate-fade" {...rest}>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={onRestartFeedback}
        >
          <ArrowLeft
            weight="bold"
            className="
              w-4
              h-4
              dark:text-zinc-400
              dark:hover:text-zinc-100 
              hover:text-zinc-800 
              text-zinc-500
            "
          />
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

      <form
        className="my-4 w-full animate-fade"
        onSubmit={handleSubmitFeedback}
      >
        <textarea
          className="
            min-w-[304px]
            w-full
            min-h-[112px]
            text-sm
            placeholder-zinc-400 
            dark:text-zinc-100 
            dark:border-zinc-600
            border-zinc-300
            bg-transparent  
            rounded-md
            focus:border-brand-500
            focus:ring-brand-500
            focus:ring-1
            resize-none
            focus:outline-none
            dark:scrollbar-thumb-zinc-700
            scrollbar-thumb-zinc-300
            scrollbar-track-transparent
            scrollbar-thin
            transition-all
          "
          placeholder={feedbackInputPlaceholder(feedbackType)}
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
            disabled={!comment || isSendingFeedback}
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
              text-zinc-100
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
            {isSendingFeedback ? <Loading /> : 'Send feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}
