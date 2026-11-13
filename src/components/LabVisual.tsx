import type { LabItem } from '../types/lab';

/** Abstract print-bed visual — used when the blog post has no thumbnail. */
export function LabVisual({
  item,
  className = '',
}: {
  item: Pick<LabItem, 'id' | 'accent' | 'thumbnail' | 'title'>;
  className?: string;
}) {
  if (item.thumbnail) {
    return (
      <div className={`relative overflow-hidden bg-[color:var(--maker-bg)] ${className}`}>
        <img
          src={item.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: `linear-gradient(to top, ${item.accent}33, transparent)`,
          }}
        />
      </div>
    );
  }

  const patternId = `lab-pattern-${item.id.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${item.accent}33, transparent 55%),
          linear-gradient(160deg, #12161d 0%, #0a0d12 55%, #151a22 100%)`,
      }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="12"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 2 H12"
              stroke={item.accent}
              strokeWidth="0.6"
              opacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 160 120"
          className="h-[72%] w-[72%] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        >
          <rect
            x="18"
            y="78"
            width="124"
            height="18"
            rx="3"
            fill="#1c2330"
            stroke={item.accent}
            strokeOpacity="0.45"
          />
          <path
            d="M48 78 L80 28 L112 78 Z"
            fill={`${item.accent}22`}
            stroke={item.accent}
            strokeWidth="2"
          />
          <path
            d="M56 78 L80 42 L104 78"
            fill="none"
            stroke={item.accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
          />
          <path
            d="M64 78 L80 54 L96 78"
            fill="none"
            stroke={item.accent}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <rect
            x="74"
            y="14"
            width="12"
            height="10"
            rx="1.5"
            fill={item.accent}
            opacity="0.85"
          />
          <line
            x1="80"
            y1="24"
            x2="80"
            y2="28"
            stroke={item.accent}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: `linear-gradient(to top, ${item.accent}18, transparent)`,
        }}
      />
    </div>
  );
}
