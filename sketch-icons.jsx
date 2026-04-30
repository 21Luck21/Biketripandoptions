/* sketch-icons.jsx — hand-drawn, slightly wobbly line icons.
   Stroke uses currentColor so they tint with text color.
   Each path uses 'sketchy' attribute styling: round caps, wandering paths.
*/

const SK = {
  stroke: 'currentColor',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Bike({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      {/* wheels — slightly imperfect circles via two arcs */}
      <path d="M5 44 a13 12.6 0 1 0 26 0.4 a13.1 12.5 0 1 0 -26 -0.4 z"/>
      <path d="M33 44 a13 12.6 0 1 0 26 0.4 a13.1 12.5 0 1 0 -26 -0.4 z"/>
      {/* frame */}
      <path d="M18 44 L30 27 L46 44"/>
      <path d="M30 27 L46 27 L46 44"/>
      <path d="M30 27 L24 27"/>
      {/* seat */}
      <path d="M28.5 27 L26.5 22 L30 22"/>
      {/* handlebar */}
      <path d="M46 27 L50 22 L54 22"/>
      {/* hub dots */}
      <circle cx="18" cy="44" r="1.1" fill="currentColor"/>
      <circle cx="46" cy="44" r="1.1" fill="currentColor"/>
    </svg>
  );
}

function Lake({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      {/* shoreline */}
      <path d="M6 42 C14 36 20 44 28 40 C36 36 44 44 58 38"/>
      {/* ripples */}
      <path d="M14 48 C20 46 26 50 34 47"/>
      <path d="M22 53 C28 51 36 54 44 51"/>
      {/* tiny boat */}
      <path d="M36 36 L42 36 L40 39 L37 39 Z"/>
      <path d="M39 36 L39 31"/>
      <path d="M39 31 L43 35"/>
      {/* sun */}
      <circle cx="50" cy="20" r="4"/>
      <path d="M50 12 L50 9 M58 20 L61 20 M50 28 L50 31 M42 20 L39 20"/>
    </svg>
  );
}

function Forest({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      {/* big tree */}
      <path d="M32 12 L22 28 L26 28 L18 42 L24 42 L16 54 L48 54 L40 42 L46 42 L38 28 L42 28 Z"/>
      <path d="M32 54 L32 60"/>
      {/* small tree left */}
      <path d="M10 30 L6 38 L8 38 L4 46 L16 46 L12 38 L14 38 L10 30 Z"/>
      <path d="M10 46 L10 52"/>
      {/* small tree right */}
      <path d="M55 32 L51 40 L53 40 L49 48 L60 48 L57 40 L59 40 L55 32 Z"/>
      <path d="M55 48 L55 54"/>
    </svg>
  );
}

function Palace({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      {/* central dome */}
      <path d="M26 22 C26 16 38 16 38 22"/>
      <path d="M32 14 L32 10"/>
      <circle cx="32" cy="9" r="1" fill="currentColor"/>
      {/* roofline */}
      <path d="M22 22 L42 22 L42 28 L22 28 Z"/>
      {/* main facade */}
      <path d="M10 28 L54 28 L54 52 L10 52 Z"/>
      {/* columns */}
      <path d="M16 32 L16 50 M22 32 L22 50 M32 32 L32 50 M42 32 L42 50 M48 32 L48 50"/>
      {/* steps */}
      <path d="M6 52 L58 52 M8 56 L56 56"/>
    </svg>
  );
}

function Star({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      <path d="M32 10 L36 26 L52 28 L40 38 L44 54 L32 45 L20 54 L24 38 L12 28 L28 26 Z"/>
      <circle cx="14" cy="14" r="1" fill="currentColor"/>
      <circle cx="52" cy="48" r="1" fill="currentColor"/>
      <circle cx="50" cy="14" r="1" fill="currentColor"/>
    </svg>
  );
}

function Factory({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      <path d="M8 52 L8 30 L20 36 L20 26 L32 32 L32 22 L46 28 L46 18 L56 18 L56 52 Z"/>
      {/* chimney smoke */}
      <path d="M50 14 C52 11 48 9 50 6"/>
      <path d="M53 14 C55 11 51 9 53 6"/>
      {/* windows */}
      <path d="M12 42 L14 42 M24 42 L26 42 M36 42 L38 42 M48 42 L50 42"/>
    </svg>
  );
}

function Cottage({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      {/* thatched roof */}
      <path d="M8 32 L32 12 L56 32"/>
      <path d="M10 34 C18 32 24 30 32 30 C40 30 48 32 54 34"/>
      {/* walls */}
      <path d="M14 32 L14 54 L50 54 L50 32"/>
      {/* door */}
      <path d="M28 54 L28 42 C28 40 36 40 36 42 L36 54"/>
      {/* window */}
      <path d="M18 38 L24 38 L24 44 L18 44 Z M21 38 L21 44 M18 41 L24 41"/>
      {/* canal squiggle */}
      <path d="M4 60 C12 58 20 62 28 60 C36 58 48 62 60 60"/>
    </svg>
  );
}

function Compass({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      <path d="M6 32 a26 25.6 0 1 0 52 0.4 a26.1 25.5 0 1 0 -52 -0.4 z"/>
      <path d="M32 14 L36 32 L32 50 L28 32 Z"/>
      <path d="M14 32 L32 28 L50 32 L32 36 Z"/>
      <circle cx="32" cy="32" r="1.2" fill="currentColor"/>
      <text x="32" y="11" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="currentColor" stroke="none">N</text>
    </svg>
  );
}

function Train({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      <path d="M10 18 L46 18 C50 18 54 22 54 26 L54 44 L10 44 Z"/>
      <path d="M14 24 L26 24 L26 32 L14 32 Z"/>
      <path d="M30 24 L42 24 L42 32 L30 32 Z"/>
      <path d="M46 26 L52 26 L52 32 L46 32 Z"/>
      <circle cx="18" cy="48" r="3"/>
      <circle cx="32" cy="48" r="3"/>
      <circle cx="46" cy="48" r="3"/>
      <path d="M4 44 L10 44 M54 44 L60 44"/>
      <path d="M10 18 L8 12"/>
    </svg>
  );
}

function Lighthouse({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      <path d="M28 14 L36 14 L34 18 L30 18 Z"/>
      <path d="M26 18 L38 18 L38 22 L26 22 Z"/>
      <path d="M28 22 L36 22 L40 50 L24 50 Z"/>
      <path d="M28 30 L36 30 M28 38 L36 38"/>
      <path d="M14 50 C24 48 40 48 50 50"/>
      <path d="M8 56 C20 54 44 54 56 56"/>
      {/* light rays */}
      <path d="M22 14 L18 10 M42 14 L46 10 M32 8 L32 4"/>
    </svg>
  );
}

function Cliff({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      <path d="M4 50 L14 32 L22 38 L30 22 L40 30 L48 18 L60 30 L60 50 Z"/>
      <path d="M14 32 L18 28 M30 22 L34 18 M48 18 L52 14"/>
      <path d="M4 56 C16 54 28 58 40 56 C48 54 56 58 60 56"/>
    </svg>
  );
}

function Beach({size=42}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...SK}>
      {/* umbrella */}
      <path d="M14 32 C14 22 34 22 34 32 Z"/>
      <path d="M14 32 L34 32"/>
      <path d="M24 32 L24 52"/>
      <path d="M20 52 L28 52"/>
      {/* waves */}
      <path d="M4 44 C10 42 14 46 22 44 M40 44 C46 42 52 46 60 44"/>
      <path d="M4 50 C12 48 18 52 28 50 M36 50 C44 48 52 52 60 50"/>
      {/* sun */}
      <circle cx="46" cy="20" r="4"/>
    </svg>
  );
}

function ArrowDown({size=24}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...SK}>
      <path d="M12 4 L12 20 M5 13 L12 20 L19 13"/>
    </svg>
  );
}

function ArrowRight({size=24}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...SK}>
      <path d="M4 12 L20 12 M13 5 L20 12 L13 19"/>
    </svg>
  );
}

Object.assign(window, { Bike, Lake, Forest, Palace, Star, Factory, Cottage, Compass, Train, Lighthouse, Cliff, Beach, ArrowDown, ArrowRight });
