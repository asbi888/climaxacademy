import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  linkTo?: string;
}

const sizeMap = {
  sm: { icon: 28, text: 'text-sm' },
  md: { icon: 36, text: 'text-base' },
  lg: { icon: 48, text: 'text-lg' },
  xl: { icon: 80, text: 'text-2xl' },
};

export default function Logo({ variant = 'full', size = 'md', className, linkTo = '/' }: LogoProps) {
  const { icon, text } = sizeMap[size];

  const content = (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/images/logocl.png"
        alt="Climax Academy"
        width={icon}
        height={icon}
        className="object-contain"
        priority
      />
      {variant === 'full' && (
        <div className="flex flex-col leading-tight">
          <span className={cn('font-bold tracking-wide text-brand-text', text)}>
            CLIMAX
          </span>
          <span className={cn('font-light tracking-[0.2em] text-brand-accent uppercase', size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-sm')}>
            Academy
          </span>
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return <Link href={linkTo}>{content}</Link>;
  }

  return content;
}
