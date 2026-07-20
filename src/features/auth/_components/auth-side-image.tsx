import Image from 'next/image';
import Link from 'next/link';

interface AuthSideImageProps {
  src?: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
  text?: string;
  title?: string;
  link?: string;
  linkText?: string;
  darkSrc?: string;
}

export default function AuthSideImage({
  src ="/separator.png",
  alt = 'Authentication background',
  className = '',
  wrapperClassName = '',
  title ="Welcome back",
  darkSrc = "/separator-dark.png",
  text,
  link,
  linkText = 'Click here',
}: AuthSideImageProps) {
  return (
    <div
      className={`flex ${link && !title ? 'flex-col-reverse justify-content-center' : 'flex-col'
        } items-center gap-10 ${wrapperClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        width="690"
        height="112"
        className={`w-auto ${link && !title ? 'rotate-180' : ''
          }   ${className}`}
      />

      <div
        className={`w-auto ${link && !title ? 'rotate-180' : ''} ${className}`}
      >
        {darkSrc && (
          <Image
            src={darkSrc}
            alt={alt}
            width={280}
            height={46}
            className="hidden dark:block"
          />
        )}
      </div>
      {title && (
        <h3
          className={`font-[family-name:var(--font-edwardian)] text-5xl   text-ds-text-primary`}
        >
          {title}
        </h3>
      )}

      {text && (
        <div className="w-full border-t border-ds-border-soft pt-5">
          <div className="flex justify-center gap-2">
            <p className="font-medium ">{text}</p>

            {link && (
              <Link
                href={link}
                className="font-medium text-ds-text-primary hover:underline"
              >
                {linkText}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
