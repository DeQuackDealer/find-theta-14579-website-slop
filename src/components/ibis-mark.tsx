import { cn } from "@/lib/utils";

/**
 * Low-poly ibis mark. Placeholder for the team's supplied logo artwork -
 * drop the real file at /public/logo.svg (or update src/app/icon.tsx) to
 * replace it everywhere this component is used.
 */
export function IbisMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("text-fg", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="ibis-body-clip">
          <polygon points="30,55 55,44 73,52 69,73 45,79 27,68" />
        </clipPath>
      </defs>

      {/* legs */}
      <line x1="43" y1="75" x2="40" y2="106" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="106" x2="33" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="106" x2="46" y2="111" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="74" x2="61" y2="105" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="61" y1="105" x2="54" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="61" y1="105" x2="68" y2="109" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* tail */}
      <polygon points="29,60 14,66 29,71" fill="currentColor" />

      {/* body */}
      <polygon points="30,55 55,44 73,52 69,73 45,79 27,68" fill="currentColor" />

      {/* geometric cut-out pattern, clipped to body */}
      <g clipPath="url(#ibis-body-clip)" fill="var(--bg)">
        <polygon points="30,55 46,50 40,64" />
        <polygon points="50,47 63,50 55,60 46,58" />
        <polygon points="58,62 70,58 66,72 52,73" opacity="0.9" />
      </g>

      {/* neck */}
      <polygon points="55,44 61,45 71,29 66,27" fill="currentColor" />

      {/* head */}
      <circle cx="70" cy="23" r="6" fill="currentColor" />

      {/* decurved beak */}
      <path
        d="M75,21 C84,24 92,30 98,38 C90,33 82,29 74,27 Z"
        fill="currentColor"
      />
    </svg>
  );
}
