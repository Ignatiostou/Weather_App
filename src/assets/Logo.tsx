type Props = {
  variant?: 'default' | 'icon';
  size?: number;
};

export const Logo = ({ variant = 'default', size = 32 }: Props) => {
  if (variant === 'default') {
    return (
      <svg
        aria-label='SkyCast weather logo'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 270 78'
        height={size}
        data-logo='logo'
      >
        <defs>
          <radialGradient id='sun-glow' cx='50%' cy='50%' r='60%'>
            <stop offset='0%' stopColor='var(--primary-foreground)' stopOpacity='1' />
            <stop offset='45%' stopColor='var(--primary)' stopOpacity='0.95' />
            <stop offset='100%' stopColor='var(--primary)' stopOpacity='0.4' />
          </radialGradient>
          <linearGradient id='cloud-shade' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor='var(--muted)' />
            <stop offset='100%' stopColor='var(--secondary)' />
          </linearGradient>
          <linearGradient id='horizon' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor='var(--chart-3)' stopOpacity='0.4' />
            <stop offset='50%' stopColor='var(--primary)' stopOpacity='0.8' />
            <stop offset='100%' stopColor='var(--chart-2)' stopOpacity='0.4' />
          </linearGradient>
          <filter id='glow'>
            <feGaussianBlur stdDeviation='2.5' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        <g transform='translate(4, 6)'>
          <circle cx='36' cy='26' r='15' fill='url(#sun-glow)' filter='url(#glow)' />
          <g stroke='var(--primary)' strokeWidth='3' strokeLinecap='round' opacity='0.9'>
            <line x1='36' y1='4' x2='36' y2='12' />
            <line x1='36' y1='40' x2='36' y2='48' />
            <line x1='14' y1='26' x2='22' y2='26' />
            <line x1='50' y1='26' x2='58' y2='26' />
            <line x1='19' y1='11' x2='26' y2='18' />
            <line x1='46' y1='34' x2='53' y2='41' />
            <line x1='19' y1='41' x2='26' y2='34' />
            <line x1='46' y1='18' x2='53' y2='11' />
          </g>

          <path
            d='M26 51c0-9 7.3-16.3 16.3-16.3 6.2 0 11.5 3.5 14.2 8.9 1-0.4 2.1-0.7 3.4-0.7 5.8 0 10.6 4.7 10.6 10.6S65.8 64 60 64H33.6C28.1 64 26 59.9 26 55.8Z'
            fill='url(#cloud-shade)'
            stroke='var(--ring)'
            strokeWidth='2.2'
            strokeLinejoin='round'
          />

          <path
            d='M24 57c12 -1.8 18.5 -2.2 30.5 -0.6'
            fill='none'
            stroke='url(#horizon)'
            strokeWidth='2.4'
            strokeLinecap='round'
          />

          <g fill='none' stroke='var(--ring)' strokeWidth='2' strokeLinecap='round'>
            <path d='M42 60.5c-1.4 2.8-3.9 4.5-6.9 4.5' />
            <path d='M53 60.5c-0.9 2.1-2.7 3.4-5.1 3.4' />
            <path d='M32 44c4 -2.2 7.8 -3 12.5 -1.4' opacity='0.5' />
          </g>

          <path
            d='M58 30c2.2-1.2 4.6-1.2 6.8 0'
            fill='none'
            stroke='var(--primary-foreground)'
            strokeWidth='2'
            strokeLinecap='round'
            opacity='0.6'
          />
        </g>

        <g transform='translate(90, 18)'>
          <text
            x='0'
            y='22'
            fill='var(--foreground)'
            fontFamily='Inter, "Segoe UI", system-ui, -apple-system, sans-serif'
            fontWeight='700'
            fontSize='30'
            letterSpacing='0.35'
          >
            SkyCast
          </text>
          <text
            x='0'
            y='42'
            fill='var(--muted-foreground)'
            fontFamily='Inter, "Segoe UI", system-ui, -apple-system, sans-serif'
            fontWeight='500'
            fontSize='13'
            letterSpacing='0.25'
          >
            Weather at a glance
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      aria-label='SkyCast weather mark'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 68 68'
      height={size}
      data-logo='logo'
    >
      <defs>
        <radialGradient id='sun-glow-icon' cx='50%' cy='50%' r='60%'>
          <stop offset='0%' stopColor='var(--primary-foreground)' stopOpacity='1' />
          <stop offset='55%' stopColor='var(--primary)' stopOpacity='0.95' />
          <stop offset='100%' stopColor='var(--primary)' stopOpacity='0.35' />
        </radialGradient>
        <linearGradient id='cloud-shade-icon' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='var(--muted)' />
          <stop offset='100%' stopColor='var(--secondary)' />
        </linearGradient>
        <linearGradient id='horizon-icon' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='var(--chart-3)' stopOpacity='0.4' />
          <stop offset='50%' stopColor='var(--primary)' stopOpacity='0.8' />
          <stop offset='100%' stopColor='var(--chart-2)' stopOpacity='0.4' />
        </linearGradient>
        <filter id='glow-icon'>
          <feGaussianBlur stdDeviation='2.2' result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <circle cx='24' cy='23' r='11' fill='url(#sun-glow-icon)' filter='url(#glow-icon)' />
      <g stroke='var(--primary)' strokeWidth='2.6' strokeLinecap='round' opacity='0.9'>
        <line x1='24' y1='6' x2='24' y2='12' />
        <line x1='24' y1='34' x2='24' y2='40' />
        <line x1='7' y1='23' x2='13' y2='23' />
        <line x1='35' y1='23' x2='41' y2='23' />
        <line x1='11' y1='11' x2='15' y2='15' />
        <line x1='32' y1='32' x2='36' y2='36' />
        <line x1='11' y1='36' x2='15' y2='32' />
        <line x1='32' y1='15' x2='36' y2='11' />
      </g>

      <path
        d='M17 44c0-5.8 4.7-10.5 10.5-10.5 4.1 0 7.6 2.2 9.5 5.6 0.7-0.3 1.5-0.5 2.3-0.5 4.0 0 7.3 3.3 7.3 7.3S42 53.6 38.1 53.6H25.2c-4.5 0-8.2-3.5-8.2-9.6Z'
        fill='url(#cloud-shade-icon)'
        stroke='var(--ring)'
        strokeWidth='2'
        strokeLinejoin='round'
      />

      <path
        d='M18 50.7c9 -1.4 13.8 -1.7 22.8 -0.4'
        fill='none'
        stroke='url(#horizon-icon)'
        strokeWidth='2'
        strokeLinecap='round'
      />

      <g fill='none' stroke='var(--ring)' strokeWidth='1.8' strokeLinecap='round'>
        <path d='M28 51.2c-0.9 2.1-2.8 3.5-5.2 3.5' />
        <path d='M36 51.2c-0.7 1.7-2.2 2.8-4.2 2.8' />
        <path d='M22 38.6c3.4-1.9 6.6-2.5 10.6-1.1' opacity='0.45' />
      </g>
    </svg>
  );
};