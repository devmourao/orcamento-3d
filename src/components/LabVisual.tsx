import type { LabProject } from '../types/lab';

/** Abstract print-bed visual — identity stand-in until real photos are added. */
export function LabVisual({
  project,
  className = '',
}: {
  project: LabProject;
  className?: string;
}) {
  const patternId = `lab-pattern-${project.id}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${project.accent}33, transparent 55%),
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
              stroke={project.accent}
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
          {/* Print bed */}
          <rect
            x="18"
            y="78"
            width="124"
            height="18"
            rx="3"
            fill="#1c2330"
            stroke={project.accent}
            strokeOpacity="0.45"
          />
          {/* Layer stack / printed object */}
          <path
            d="M48 78 L80 28 L112 78 Z"
            fill={`${project.accent}22`}
            stroke={project.accent}
            strokeWidth="2"
          />
          <path
            d="M56 78 L80 42 L104 78"
            fill="none"
            stroke={project.accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
          />
          <path
            d="M64 78 L80 54 L96 78"
            fill="none"
            stroke={project.accent}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          {/* Extruder hint */}
          <rect
            x="74"
            y="14"
            width="12"
            height="10"
            rx="1.5"
            fill={project.accent}
            opacity="0.85"
          />
          <line
            x1="80"
            y1="24"
            x2="80"
            y2="28"
            stroke={project.accent}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: `linear-gradient(to top, ${project.accent}18, transparent)`,
        }}
      />
    </div>
  );
}
