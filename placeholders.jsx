/* placeholders.jsx — stylized scenic SVG placeholders.
   Each scene is a layered, slightly textured landscape composition.
   They aren't photo-realistic — that's intentional; they read as "field sketch / risograph."
*/

// Generate a deterministic noise pattern id
let _pId = 0;
const uid = (p='id') => `${p}-${++_pId}`;

// Common defs: paper grain, slight noise, hatching
function ScenicDefs({id}){
  return (
    <defs>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/>
        <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.14  0 0 0 0 0.10  0 0 0 0.18 0"/>
        <feComposite in2="SourceGraphic" operator="in"/>
      </filter>
      <pattern id={`${id}-hatch`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(31,36,24,.18)" strokeWidth="1"/>
      </pattern>
      <pattern id={`${id}-dot`} patternUnits="userSpaceOnUse" width="5" height="5">
        <circle cx="2.5" cy="2.5" r="0.7" fill="rgba(31,36,24,.18)"/>
      </pattern>
    </defs>
  );
}

// Lake & forest scene
function LakeScene({label, palette='moss', className='', style={}}){
  const id = React.useMemo(()=>uid('lake'),[]);
  const sky = palette==='clay' ? '#e8c9a4' : '#dfe2cc';
  const water = palette==='clay' ? '#7fa39d' : '#7a9892';
  const hills = '#3d5942';
  const hillsBack = '#6b805f';
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      {/* sky */}
      <rect width="400" height="260" fill={sky}/>
      <circle cx="320" cy="60" r="22" fill="#f3e4c4" opacity=".9"/>
      <circle cx="320" cy="60" r="32" fill="#f3e4c4" opacity=".15"/>
      {/* far hills */}
      <path d="M0 140 C 60 110 120 130 180 115 C 240 100 300 130 400 110 L400 180 L0 180 Z" fill={hillsBack}/>
      <path d="M0 140 C 60 110 120 130 180 115 C 240 100 300 130 400 110 L400 180 L0 180 Z" fill={`url(#${id}-dot)`} opacity=".4"/>
      {/* mid hills */}
      <path d="M0 165 C 80 145 140 175 220 155 C 290 138 340 165 400 150 L400 200 L0 200 Z" fill="#506b48"/>
      {/* lake */}
      <rect x="0" y="180" width="400" height="80" fill={water}/>
      <path d="M0 180 C 60 178 130 184 200 181 C 270 178 340 184 400 181 L400 200 L0 200 Z" fill={water} opacity=".6"/>
      {/* reflection ripples */}
      <path d="M30 215 C 60 213 90 217 130 215" stroke="rgba(255,255,255,.35)" fill="none" strokeWidth="1"/>
      <path d="M180 230 C 220 228 260 232 320 230" stroke="rgba(255,255,255,.35)" fill="none" strokeWidth="1"/>
      <path d="M50 245 C 100 243 160 247 240 245" stroke="rgba(255,255,255,.35)" fill="none" strokeWidth="1"/>
      {/* trees on shore */}
      <g fill={hills}>
        <path d="M40 180 L36 168 L44 168 Z M40 168 L36 158 L44 158 Z M40 158 L37 150 L43 150 Z"/>
        <path d="M70 180 L66 170 L74 170 Z M70 170 L67 162 L73 162 Z"/>
        <path d="M340 182 L336 172 L344 172 Z M340 172 L337 164 L343 164 Z"/>
      </g>
      {/* small boat */}
      <g transform="translate(250 218)">
        <path d="M0 0 L24 0 L20 6 L4 6 Z" fill="#3a2e22"/>
        <path d="M12 0 L12 -14" stroke="#3a2e22" strokeWidth="1.2"/>
        <path d="M12 -14 L20 -2" stroke="#3a2e22" strokeWidth="1.2" fill="none"/>
      </g>
      {/* grain overlay */}
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".25"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Palace / formal garden
function PalaceScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('palace'),[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <rect width="400" height="260" fill="#e8d9b8"/>
      <circle cx="80" cy="50" r="18" fill="#f3e4c4" opacity=".9"/>
      {/* garden hedges */}
      <rect x="0" y="160" width="400" height="40" fill="#506b48"/>
      <path d="M0 160 C 50 156 100 162 200 158 C 280 156 340 162 400 158 L400 165 L0 165 Z" fill="#3d5942"/>
      <rect x="0" y="200" width="400" height="60" fill="#3d5942"/>
      {/* path */}
      <path d="M180 260 L195 200 L205 200 L220 260 Z" fill="#c8a878"/>
      {/* palace silhouette */}
      <g fill="#cfa173">
        <rect x="120" y="100" width="160" height="60"/>
        <rect x="100" y="115" width="200" height="45"/>
        <rect x="190" y="80" width="20" height="20"/>
        <path d="M190 80 L200 65 L210 80 Z" fill="#a87749"/>
        <rect x="135" y="115" width="6" height="20" fill="#7a5a3a"/>
        <rect x="155" y="115" width="6" height="20" fill="#7a5a3a"/>
        <rect x="175" y="115" width="6" height="20" fill="#7a5a3a"/>
        <rect x="220" y="115" width="6" height="20" fill="#7a5a3a"/>
        <rect x="240" y="115" width="6" height="20" fill="#7a5a3a"/>
        <rect x="260" y="115" width="6" height="20" fill="#7a5a3a"/>
        <path d="M100 115 L120 100 L280 100 L300 115 Z" fill="#b88858"/>
      </g>
      {/* topiary */}
      <circle cx="40" cy="180" r="14" fill="#3d5942"/>
      <circle cx="40" cy="180" r="14" fill={`url(#${id}-dot)`} opacity=".35"/>
      <circle cx="360" cy="180" r="14" fill="#3d5942"/>
      <circle cx="360" cy="180" r="14" fill={`url(#${id}-dot)`} opacity=".35"/>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Dark sky / starry
function StarScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('star'),[]);
  // Pre-generate star positions
  const stars = React.useMemo(()=>{
    const arr=[]; let s=42;
    for(let i=0;i<60;i++){ s=(s*9301+49297)%233280; const x=(s/233280)*400;
      s=(s*9301+49297)%233280; const y=(s/233280)*150;
      s=(s*9301+49297)%233280; const r=0.4+(s/233280)*1.4;
      arr.push({x,y,r});
    }
    return arr;
  },[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2236"/>
          <stop offset=".7" stopColor="#3a3a4e"/>
          <stop offset="1" stopColor="#6b5a4a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`}/>
      {/* stars */}
      {stars.map((s,i)=>(<circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f3efe7" opacity={0.5+s.r*0.3}/>))}
      {/* milky way wash */}
      <ellipse cx="200" cy="80" rx="180" ry="20" fill="#f3efe7" opacity=".06"/>
      <ellipse cx="200" cy="80" rx="120" ry="10" fill="#f3efe7" opacity=".08"/>
      {/* moon */}
      <circle cx="320" cy="55" r="14" fill="#f3e4c4"/>
      <circle cx="324" cy="52" r="14" fill="#1a2236"/>
      {/* horizon trees */}
      <rect x="0" y="180" width="400" height="80" fill="#0f1610"/>
      <g fill="#0f1610">
        <path d="M30 180 L26 168 L34 168 Z M30 168 L26 156 L34 156 Z"/>
        <path d="M80 180 L74 165 L86 165 Z M80 165 L75 152 L85 152 Z"/>
        <path d="M150 180 L145 168 L155 168 Z"/>
        <path d="M260 180 L254 162 L266 162 Z M260 162 L256 152 L264 152 Z"/>
        <path d="M340 180 L336 170 L344 170 Z"/>
      </g>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".2"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(243,239,231,.55)">{label}</text>}
    </svg>
  );
}

// Industrial heritage — brick towers, smokestacks
function IndustrialScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('ind'),[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <rect width="400" height="260" fill="#d6c9a8"/>
      <rect x="0" y="180" width="400" height="80" fill="#8a6a48"/>
      {/* brick complex */}
      <g fill="#8a4a22">
        <rect x="40" y="100" width="80" height="100"/>
        <rect x="120" y="120" width="120" height="80"/>
        <rect x="240" y="80" width="50" height="120"/>
        <rect x="290" y="110" width="70" height="90"/>
      </g>
      {/* highlight band */}
      <g fill="#b96f3a">
        <rect x="40" y="100" width="80" height="6"/>
        <rect x="240" y="80" width="50" height="6"/>
      </g>
      {/* windows grid */}
      <g fill="#e8d9b8">
        {[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>(
          <rect key={`${r}${c}`} x={48+c*15} y={115+r*20} width="6" height="10"/>
        )))}
        {[0,1,2].map(r=>[0,1,2,3,4,5,6].map(c=>(
          <rect key={`a${r}${c}`} x={128+c*15} y={130+r*20} width="6" height="10"/>
        )))}
        {[0,1,2,3,4].map(r=>(
          <rect key={`s${r}`} x={258} y={92+r*20} width="6" height="10"/>
        ))}
        {[0,1,2,3,4].map(r=>(
          <rect key={`s2${r}`} x={272} y={92+r*20} width="6" height="10"/>
        ))}
      </g>
      {/* smokestacks */}
      <rect x="80" y="40" width="10" height="60" fill="#6e3818"/>
      <rect x="78" y="38" width="14" height="6" fill="#6e3818"/>
      <rect x="260" y="20" width="8" height="60" fill="#6e3818"/>
      <rect x="258" y="18" width="12" height="5" fill="#6e3818"/>
      {/* smoke */}
      <path d="M85 38 C 95 24 78 16 88 4" stroke="rgba(31,36,24,.25)" strokeWidth="2" fill="none"/>
      <path d="M264 18 C 274 4 257 -4 268 -16" stroke="rgba(31,36,24,.25)" strokeWidth="2" fill="none"/>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".25"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Spreewald — canals, cottages, willows
function SpreewaldScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('spw'),[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <rect width="400" height="260" fill="#dfe2cc"/>
      {/* canal */}
      <path d="M0 200 C 100 190 200 220 400 200 L400 260 L0 260 Z" fill="#7a9892"/>
      <path d="M40 215 C 80 213 120 217 180 215" stroke="rgba(255,255,255,.35)" fill="none"/>
      <path d="M220 230 C 260 228 320 232 380 230" stroke="rgba(255,255,255,.35)" fill="none"/>
      {/* cottages with thatched roofs */}
      <g>
        <rect x="60" y="140" width="60" height="50" fill="#e8d9b8"/>
        <path d="M50 140 L90 110 L130 140 Z" fill="#7a5a3a"/>
        <rect x="80" y="160" width="14" height="30" fill="#3a2e22"/>
        <rect x="65" y="150" width="10" height="10" fill="#3d5942"/>
      </g>
      <g>
        <rect x="240" y="120" width="80" height="70" fill="#e8d9b8"/>
        <path d="M225 120 L280 88 L335 120 Z" fill="#7a5a3a"/>
        <rect x="270" y="150" width="18" height="40" fill="#3a2e22"/>
        <rect x="250" y="135" width="12" height="12" fill="#3d5942"/>
        <rect x="300" y="135" width="12" height="12" fill="#3d5942"/>
      </g>
      {/* willow trees */}
      <g>
        <rect x="20" y="150" width="3" height="50" fill="#3a2e22"/>
        <ellipse cx="22" cy="148" rx="14" ry="20" fill="#506b48" opacity=".9"/>
      </g>
      <g>
        <rect x="370" y="150" width="3" height="50" fill="#3a2e22"/>
        <ellipse cx="372" cy="150" rx="16" ry="22" fill="#506b48" opacity=".9"/>
      </g>
      {/* punt boat */}
      <g transform="translate(150 220)">
        <path d="M0 0 L60 0 L52 8 L8 8 Z" fill="#3a2e22"/>
        <path d="M50 0 L62 -22" stroke="#3a2e22" strokeWidth="1.6" fill="none"/>
        <circle cx="20" cy="-2" r="2" fill="#1f2418"/>
      </g>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Coastal cliffs — for Rügen
function CliffScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('cliff'),[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <defs>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fa39d"/>
          <stop offset="1" stopColor="#4a6663"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="#dbe7e6"/>
      <circle cx="60" cy="50" r="18" fill="#f3e4c4" opacity=".8"/>
      {/* sea */}
      <rect x="0" y="120" width="400" height="140" fill={`url(#${id}-sea)`}/>
      {/* white chalk cliffs */}
      <path d="M0 120 L40 60 L80 90 L130 50 L180 95 L240 55 L300 100 L360 60 L400 110 L400 200 L0 200 Z" fill="#f3efe7"/>
      <path d="M0 120 L40 60 L80 90 L130 50 L180 95 L240 55 L300 100 L360 60 L400 110" stroke="rgba(31,36,24,.2)" fill="none" strokeWidth="1"/>
      {/* trees on top */}
      <g fill="#3d5942">
        <path d="M50 60 L46 50 L54 50 Z M50 50 L47 42 L53 42 Z"/>
        <path d="M140 50 L136 40 L144 40 Z M140 40 L137 32 L143 32 Z"/>
        <path d="M250 55 L246 45 L254 45 Z"/>
        <path d="M340 65 L336 55 L344 55 Z"/>
      </g>
      {/* waves */}
      <path d="M0 180 C 60 178 120 184 200 180 C 280 176 340 184 400 180" stroke="rgba(255,255,255,.5)" fill="none" strokeWidth="1.4"/>
      <path d="M0 200 C 80 198 160 204 240 200 C 320 196 360 204 400 200" stroke="rgba(255,255,255,.4)" fill="none" strokeWidth="1.4"/>
      <path d="M0 220 C 80 218 160 224 240 220 C 320 216 360 224 400 220" stroke="rgba(255,255,255,.3)" fill="none" strokeWidth="1.2"/>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Beach pier (Sellin / Binz seaside resort)
function PierScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('pier'),[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <defs>
        <linearGradient id={`${id}-sky2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8c9a4"/>
          <stop offset=".7" stopColor="#dbe7e6"/>
          <stop offset="1" stopColor="#7fa39d"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky2)`}/>
      {/* sun */}
      <circle cx="200" cy="100" r="24" fill="#f3e4c4"/>
      <circle cx="200" cy="100" r="40" fill="#f3e4c4" opacity=".15"/>
      {/* pier pavilion */}
      <g>
        <rect x="160" y="120" width="80" height="40" fill="#f3efe7"/>
        <path d="M150 120 L200 95 L250 120 Z" fill="#b96f3a"/>
        <rect x="195" y="92" width="10" height="6" fill="#b96f3a"/>
        <rect x="170" y="135" width="8" height="20" fill="#7a9892"/>
        <rect x="190" y="135" width="8" height="20" fill="#7a9892"/>
        <rect x="210" y="135" width="8" height="20" fill="#7a9892"/>
        <rect x="225" y="135" width="8" height="20" fill="#7a9892"/>
      </g>
      {/* pier deck */}
      <rect x="60" y="160" width="280" height="6" fill="#7a5a3a"/>
      {/* pier pylons */}
      <g fill="#3a2e22">
        {[80,110,140,260,290,320].map(x=>(
          <rect key={x} x={x} y="166" width="3" height="40"/>
        ))}
      </g>
      {/* sea */}
      <rect x="0" y="190" width="400" height="70" fill="#5b7d7a"/>
      {/* beach */}
      <path d="M0 200 C 60 196 120 204 200 200 L200 220 L0 220 Z" fill="#e8d9b8"/>
      <path d="M340 200 C 360 196 380 204 400 200 L400 220 L340 220 Z" fill="#e8d9b8"/>
      <path d="M0 230 L400 230" stroke="#d6c9a8" strokeWidth="1"/>
      {/* waves */}
      <path d="M0 215 C 60 213 90 217 130 215" stroke="rgba(255,255,255,.5)" fill="none"/>
      <path d="M260 220 C 300 218 350 222 400 220" stroke="rgba(255,255,255,.5)" fill="none"/>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".2"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Lighthouse / Cape Arkona
function CapeScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('cape'),[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <rect width="400" height="260" fill="#dfe2cc"/>
      <rect x="0" y="160" width="400" height="40" fill="#3d5942"/>
      <rect x="0" y="200" width="400" height="60" fill="#506b48"/>
      {/* cliff edge */}
      <path d="M0 200 L80 200 C 100 210 130 195 180 205 L260 200 L400 200 L400 260 L0 260 Z" fill="#5b7d7a"/>
      {/* lighthouse big */}
      <g>
        <rect x="180" y="120" width="20" height="6" fill="#8a4a22"/>
        <rect x="184" y="100" width="12" height="20" fill="#cfa173"/>
        <rect x="178" y="120" width="24" height="40" fill="#b96f3a"/>
        <rect x="178" y="125" width="24" height="4" fill="#f3efe7"/>
        <rect x="178" y="140" width="24" height="4" fill="#f3efe7"/>
        <rect x="178" y="155" width="24" height="4" fill="#f3efe7"/>
        {/* light beam */}
        <path d="M190 110 L130 70 L130 50 L240 50 L240 70 Z" fill="#f3e4c4" opacity=".2"/>
      </g>
      {/* small lighthouse */}
      <g>
        <rect x="240" y="135" width="14" height="25" fill="#f3efe7"/>
        <rect x="244" y="125" width="6" height="10" fill="#b96f3a"/>
      </g>
      {/* trees */}
      <g fill="#243321">
        <path d="M40 160 L34 144 L46 144 Z M40 144 L36 132 L44 132 Z"/>
        <path d="M80 162 L75 148 L85 148 Z"/>
        <path d="M320 158 L314 142 L326 142 Z M320 142 L316 130 L324 130 Z"/>
        <path d="M360 160 L355 146 L365 146 Z"/>
      </g>
      {/* gulls */}
      <path d="M60 50 C 65 46 70 50 75 46" stroke="#1f2418" fill="none" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M280 70 C 285 66 290 70 295 66" stroke="#1f2418" fill="none" strokeWidth="1.2" strokeLinecap="round"/>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".22"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(31,36,24,.55)">{label}</text>}
    </svg>
  );
}

// Beech forest — for Jasmund
function BeechScene({label, className='', style={}}){
  const id = React.useMemo(()=>uid('beech'),[]);
  // Random trunk positions
  const trunks = React.useMemo(()=>{
    const arr=[]; let s=17;
    for(let i=0;i<14;i++){ s=(s*9301+49297)%233280; const x=(s/233280)*400;
      s=(s*9301+49297)%233280; const w=2+(s/233280)*4;
      arr.push({x,w});
    }
    return arr;
  },[]);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} style={{display:'block',width:'100%',height:'100%',...style}}>
      <ScenicDefs id={id}/>
      <defs>
        <linearGradient id={`${id}-fg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8b88a"/>
          <stop offset="1" stopColor="#506b48"/>
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-fg)`}/>
      {/* canopy wash */}
      <ellipse cx="100" cy="20" rx="160" ry="50" fill="#3d5942" opacity=".6"/>
      <ellipse cx="320" cy="30" rx="140" ry="60" fill="#3d5942" opacity=".5"/>
      {/* trunks */}
      {trunks.map((t,i)=>(
        <rect key={i} x={t.x} y="20" width={t.w} height="220" fill="#7a5a3a" opacity={.8 - (i%4)*0.1}/>
      ))}
      {/* foreground forest floor */}
      <path d="M0 200 C 100 196 200 210 300 204 C 360 200 400 206 400 206 L400 260 L0 260 Z" fill="#3d5942"/>
      {/* path */}
      <path d="M170 260 L195 200 L205 200 L230 260 Z" fill="#a87749" opacity=".7"/>
      {/* light shaft */}
      <path d="M120 0 L100 260 L160 260 L180 0 Z" fill="#f3e4c4" opacity=".08"/>
      <rect width="400" height="260" fill={`url(#${id}-dot)`} opacity=".3"/>
      {label && <text x="14" y="248" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(243,239,231,.7)">{label}</text>}
    </svg>
  );
}

Object.assign(window, { LakeScene, PalaceScene, StarScene, IndustrialScene, SpreewaldScene, CliffScene, PierScene, CapeScene, BeechScene });
