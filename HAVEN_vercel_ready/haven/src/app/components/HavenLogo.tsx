import havenImg from '../../imports/haven-logo.png';

interface HavenLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function HavenLogo({ size = 'md', showText = true }: HavenLogoProps) {
  const imgSizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const textSizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };

  return (
    <div className="flex items-center gap-2">
      <img
        src={havenImg}
        alt="Haven logo"
        className={`${imgSizes[size]} object-contain flex-shrink-0`}
        style={{ mixBlendMode: 'multiply' }}
      />
      {showText && (
        <span className={`${textSizes[size]} font-bold text-foreground tracking-tight`}>Haven</span>
      )}
    </div>
  );
}
