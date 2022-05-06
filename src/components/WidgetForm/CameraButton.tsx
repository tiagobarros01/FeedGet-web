import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { ComponentPropsWithoutRef, useState } from 'react';
import { Loading } from '../Loading';

type CameraButtonProps = ComponentPropsWithoutRef<'button'> & {
  onTakeScreenshot(screenshot: string | null): void;
  screenshot: string | null;
};

export function CameraButton({
  onTakeScreenshot,
  screenshot,
  ...rest
}: CameraButtonProps) {
  const [tsTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);

    const base64image = canvas.toDataURL('image/png');

    onTakeScreenshot(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="
        p-1
        w-10
        h-10
        rounded-md
        border-transparent
        flex
        justify-end
        items-end
        dark:text-zinc-400
        text-zinc-500
        dark:hover:text-zinc-100
        hover:text-zinc-800
        transition-colors
      "
        style={{
          backgroundImage: `url(${screenshot})`,
        }}
        onClick={() => onTakeScreenshot(null)}
        {...rest}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="
      p-2 
      dark:bg-zinc-800 
      bg-zinc-100 
      rounded-md 
      border-transparent 
      dark:hover:bg-zinc-700 
      hover:bg-zinc-200 
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      dark:focus:ring-offset-zinc-900
      focus:ring-offset-zinc-200
      focus:ring-brand-500 
      transition-colors
    "
      {...rest}
    >
      {tsTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
