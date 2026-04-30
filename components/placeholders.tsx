'use client';
import { useId, useMemo } from 'react';

type SceneProps = { label?: string; className?: string; style?: React.CSSProperties };

function ScenicDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-dot`} patternUnits="userSpaceOnUse" width="5" height="5">
        <circle cx="2.5" cy="2.5" r="0.7" fill="rgba(31,36,24,.18)" />
      </pattern>
    </defs>
  );
}

export function LakeScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  const sky = '#dfe2cc';
  const water = '#7a9892';
  const hills = '#3d5942';
  const hillsBack = '#6b805f';
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <rect width="400" height="260" fill={sky} />
      <circle cx="320" cy="60" r="22" fill="#f3e4c4" opacity=".9" />
      <circle cx="320" cy="60" r="32" fill="#f3e4c4" opacity=".15" />
      <path d="M0 140 C 60 110 120 130 180 115 C 240 100 300 130 400 110 L400 180 L0 180 Z" fill={hillsBack} />
      <path d="M0 165 C 80 145 140 175 220 155 C 290 138 340 165 400 150 L400 200 L0 200 Z" fill="#506b48" />
      <rect x="0" y="180" width="400" height="80" fill={water} />
      <path d="M30 215 C 60 213 90 217 130 215" stroke="rgba(255,255,255,.35)" fill="none" strokeWidth="1" />
      <path d="M180 230 C 220 228 260 232 320 230" stroke="rgba(255,255,255,.35)" fill="none" strokeWidth="1" />
      <g fill={hills}>
        <path d="M40 180 L36 168 L44 168 Z M40 168 L36 158 L44 158 Z M40 158 L37 150 L43 150 Z" />
        <path d="M340 182 L336 172 L344 172 Z M340 172 L337 164 L343 164 Z" />
      </g>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".25" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

export function PalaceScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <rect width="400" height="260" fill="#e8d9b8" />
      <circle cx="80" cy="50" r="18" fill="#f3e4c4" opacity=".9" />
      <rect x="0" y="160" width="400" height="40" fill="#506b48" />
      <rect x="0" y="200" width="400" height="60" fill="#3d5942" />
      <path d="M180 260 L195 200 L205 200 L220 260 Z" fill="#c8a878" />
      <g fill="#cfa173">
        <rect x="120" y="100" width="160" height="60" />
        <rect x="100" y="115" width="200" height="45" />
        <rect x="190" y="80" width="20" height="20" />
        <path d="M190 80 L200 65 L210 80 Z" fill="#a87749" />
        <path d="M100 115 L120 100 L280 100 L300 115 Z" fill="#b88858" />
      </g>
      <circle cx="40" cy="180" r="14" fill="#3d5942" />
      <circle cx="360" cy="180" r="14" fill="#3d5942" />
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

export function StarScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  const stars = useMemo(() => {
    const arr: { x: number; y: number; r: number }[] = [];
    let s = 42;
    for (let i = 0; i < 60; i++) {
      s = (s * 9301 + 49297) % 233280; const x = (s / 233280) * 400;
      s = (s * 9301 + 49297) % 233280; const y = (s / 233280) * 150;
      s = (s * 9301 + 49297) % 233280; const r = 0.4 + (s / 233280) * 1.4;
      arr.push({ x, y, r });
    }
    return arr;
  }, []);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2236" />
          <stop offset=".7" stopColor="#3a3a4e" />
          <stop offset="1" stopColor="#6b5a4a" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`} />
      {stars.map((s, i) => (<circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f3efe7" opacity={0.5 + s.r * 0.3} />))}
      <ellipse cx="200" cy="80" rx="180" ry="20" fill="#f3efe7" opacity=".06" />
      <ellipse cx="200" cy="80" rx="120" ry="10" fill="#f3efe7" opacity=".08" />
      <circle cx="320" cy="55" r="14" fill="#f3e4c4" />
      <circle cx="324" cy="52" r="14" fill="#1a2236" />
      <rect x="0" y="180" width="400" height="80" fill="#0f1610" />
      <g fill="#0f1610">
        <path d="M30 180 L26 168 L34 168 Z M30 168 L26 156 L34 156 Z" />
        <path d="M80 180 L74 165 L86 165 Z M80 165 L75 152 L85 152 Z" />
        <path d="M260 180 L254 162 L266 162 Z M260 162 L256 152 L264 152 Z" />
      </g>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".2" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(243,239,231,.55)">{label}</text>}
    </svg>
  );
}

export function IndustrialScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <rect width="400" height="260" fill="#d6c9a8" />
      <rect x="0" y="180" width="400" height="80" fill="#8a6a48" />
      <g fill="#8a4a22">
        <rect x="40" y="100" width="80" height="100" />
        <rect x="120" y="120" width="120" height="80" />
        <rect x="240" y="80" width="50" height="120" />
        <rect x="290" y="110" width="70" height="90" />
      </g>
      <g fill="#b96f3a">
        <rect x="40" y="100" width="80" height="6" />
        <rect x="240" y="80" width="50" height="6" />
      </g>
      <rect x="80" y="40" width="10" height="60" fill="#6e3818" />
      <rect x="78" y="38" width="14" height="6" fill="#6e3818" />
      <rect x="260" y="20" width="8" height="60" fill="#6e3818" />
      <rect x="258" y="18" width="12" height="5" fill="#6e3818" />
      <path d="M85 38 C 95 24 78 16 88 4" stroke="rgba(31,36,24,.25)" strokeWidth="2" fill="none" />
      <path d="M264 18 C 274 4 257 -4 268 -16" stroke="rgba(31,36,24,.25)" strokeWidth="2" fill="none" />
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".25" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

export function CliffScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <defs>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fa39d" />
          <stop offset="1" stopColor="#4a6663" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="#dbe7e6" />
      <circle cx="60" cy="50" r="18" fill="#f3e4c4" opacity=".8" />
      <rect x="0" y="120" width="400" height="140" fill={`url(#${id}-sea)`} />
      <path d="M0 120 L40 60 L80 90 L130 50 L180 95 L240 55 L300 100 L360 60 L400 110 L400 200 L0 200 Z" fill="#f3efe7" />
      <path d="M0 120 L40 60 L80 90 L130 50 L180 95 L240 55 L300 100 L360 60 L400 110" stroke="rgba(31,36,24,.2)" fill="none" strokeWidth="1" />
      <g fill="#3d5942">
        <path d="M50 60 L46 50 L54 50 Z M50 50 L47 42 L53 42 Z" />
        <path d="M140 50 L136 40 L144 40 Z M140 40 L137 32 L143 32 Z" />
        <path d="M250 55 L246 45 L254 45 Z" />
        <path d="M340 65 L336 55 L344 55 Z" />
      </g>
      <path d="M0 180 C 60 178 120 184 200 180 C 280 176 340 184 400 180" stroke="rgba(255,255,255,.5)" fill="none" strokeWidth="1.4" />
      <path d="M0 200 C 80 198 160 204 240 200 C 320 196 360 204 400 200" stroke="rgba(255,255,255,.4)" fill="none" strokeWidth="1.4" />
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

export function PierScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <defs>
        <linearGradient id={`${id}-sky2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8c9a4" />
          <stop offset=".7" stopColor="#dbe7e6" />
          <stop offset="1" stopColor="#7fa39d" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky2)`} />
      <circle cx="200" cy="100" r="24" fill="#f3e4c4" />
      <circle cx="200" cy="100" r="40" fill="#f3e4c4" opacity=".15" />
      <g>
        <rect x="160" y="120" width="80" height="40" fill="#f3efe7" />
        <path d="M150 120 L200 95 L250 120 Z" fill="#b96f3a" />
        <rect x="195" y="92" width="10" height="6" fill="#b96f3a" />
      </g>
      <rect x="60" y="160" width="280" height="6" fill="#7a5a3a" />
      <g fill="#3a2e22">
        {[80, 110, 140, 260, 290, 320].map(x => (<rect key={x} x={x} y="166" width="3" height="40" />))}
      </g>
      <rect x="0" y="190" width="400" height="70" fill="#5b7d7a" />
      <path d="M0 200 C 60 196 120 204 200 200 L200 220 L0 220 Z" fill="#e8d9b8" />
      <path d="M340 200 C 360 196 380 204 400 200 L400 220 L340 220 Z" fill="#e8d9b8" />
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".2" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

export function CapeScene({ label, className = '', style = {} }: SceneProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}>
      <ScenicDefs id={id} />
      <rect width="400" height="260" fill="#dfe2cc" />
      <rect x="0" y="160" width="400" height="40" fill="#3d5942" />
      <rect x="0" y="200" width="400" height="60" fill="#506b48" />
      <path d="M0 200 L80 200 C 100 210 130 195 180 205 L260 200 L400 200 L400 260 L0 260 Z" fill="#5b7d7a" />
      <g>
        <rect x="180" y="120" width="20" height="6" fill="#8a4a22" />
        <rect x="184" y="100" width="12" height="20" fill="#cfa173" />
        <rect x="178" y="120" width="24" height="40" fill="#b96f3a" />
        <rect x="178" y="125" width="24" height="4" fill="#f3efe7" />
        <rect x="178" y="140" width="24" height="4" fill="#f3efe7" />
        <rect x="178" y="155" width="24" height="4" fill="#f3efe7" />
        <path d="M190 110 L130 70 L130 50 L240 50 L240 70 Z" fill="#f3e4c4" opacity=".2" />
      </g>
      <g>
        <rect x="240" y="135" width="14" height="25" fill="#f3efe7" />
        <rect x="244" y="125" width="6" height="10" fill="#b96f3a" />
      </g>
      <g fill="#243321">
        <path d="M40 160 L34 144 L46 144 Z M40 144 L36 132 L44 132 Z" />
        <path d="M320 158 L314 142 L326 142 Z M320 142 L316 130 L324 130 Z" />
      </g>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22" />
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}
