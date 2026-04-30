/* rugen-route.jsx — two day route on the island */

const { useRef: useRef_r, useState: useState_r, useEffect: useEffect_r } = React;

const RUGEN_DAYS = [
  {
    n: 'Day 01',
    title: 'Putbus → Mönchgut',
    distance: '54 km',
    elev: '↗ 320 m',
    duration: '6 hrs riding',
    blurb: 'Train into Putbus — Rügen\'s pastel-white "Rosenstadt." Roll the Rasender Roland steam line down to Sellin and its ornate seaside pier, then south into the wild Mönchgut peninsula: hidden coves, a tongue of land between two seas, and ferry-only fishing villages.',
    stops: [
      { time:'08:40', place:'Berlin Hbf', detail:'IC 2213, bikes booked', icon:Train },
      { time:'12:55', place:'Putbus', detail:'Rosenstadt — pastel circle', icon:Cottage },
      { time:'14:20', place:'Sellin', detail:'White pier + Strandkörbe', icon:Beach },
      { time:'16:30', place:'Baabe → Lobbe', detail:'Forest tracks, sand under tyres', icon:Forest },
      { time:'18:15', place:'Mönchgut', detail:'Sunset over Bodden', icon:Lake },
    ],
    Scene: ({label}) => <PierScene label={label}/>,
    pull: '"You can hear the pier creak between gull cries."',
  },
  {
    n: 'Day 02',
    title: 'Binz → Cape Arkona',
    distance: '68 km',
    elev: '↗ 480 m',
    duration: '7 hrs riding',
    blurb: 'North through the Belle-Époque resort of Binz, past the long shadow of Prora, then into Jasmund National Park where ancient beech woods spill onto white chalk cliffs. Finish at the windswept tip — Cape Arkona, two lighthouses and the Baltic.',
    stops: [
      { time:'07:30', place:'Binz', detail:'Coffee on the promenade', icon:Beach },
      { time:'09:00', place:'Prora', detail:'4.5 km of concrete ghost', icon:Factory },
      { time:'11:00', place:'Jasmund N.P.', detail:'Beech, chalk, cliff air', icon:Forest },
      { time:'13:30', place:'Königsstuhl', detail:'The famous chalk crown', icon:Cliff },
      { time:'17:00', place:'Cape Arkona', detail:'Two lighthouses, end of land', icon:Lighthouse },
    ],
    Scene: ({label}) => <CapeScene label={label}/>,
    pull: '"Land just stops, and the wind keeps going."',
  },
];

function DayCard({ day, index }){
  const ref = useRef_r(null);
  const [p, setP] = useState_r(0);
  useEffect_r(()=>{
    const onScroll = () => {
      const el = ref.current; if(!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const seen = vh - r.top;
      setP(Math.max(0, Math.min(1, seen/total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  },[]);
  // image scales 1.25 -> 1.0
  const scale = 1.22 - p*0.22;
  // text rises slightly
  const ty = (0.5 - p) * 50;

  return (
    <article ref={ref} style={{
      position:'relative',padding:'12vh 7vw',
      borderTop:'1px solid var(--rule)',
    }}>
      {/* day number giant background */}
      <div aria-hidden style={{
        position:'absolute',top:'4vh',right:'-3vw',pointerEvents:'none',
        fontFamily:'Fraunces',fontWeight:200,fontStyle:'italic',
        fontSize:'clamp(220px, 36vw, 520px)',lineHeight:.7,
        color:'rgba(36,51,33,.06)',letterSpacing:'-0.06em',
        fontVariationSettings:'"opsz" 144, "SOFT" 60'
      }}>
        {index===0?'I':'II'}
      </div>

      <div style={{position:'relative',display:'grid',gap:'40px 5vw',gridTemplateColumns:'1.1fr 1fr',alignItems:'start'}}>
        {/* left: text + itinerary */}
        <div style={{transform:`translateY(${ty*0.1}px)`}}>
          <div className="mono" style={{fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--clay-deep)',marginBottom:18}}>
            {day.n} · Of two
          </div>
          <h3 style={{margin:'0 0 22px',fontSize:'clamp(48px, 6.4vw, 96px)',lineHeight:.94,fontWeight:300,fontStyle:'italic',letterSpacing:'-0.025em',color:'var(--ink)',fontVariationSettings:'"opsz" 144, "SOFT" 60'}}>
            {day.title}
          </h3>

          <div style={{display:'flex',gap:24,flexWrap:'wrap',marginBottom:26,paddingBottom:26,borderBottom:'1px solid var(--rule)'}}>
            {[{l:'Distance',v:day.distance},{l:'Climb',v:day.elev},{l:'Saddle time',v:day.duration}].map(c=>(
              <div key={c.l}>
                <div className="mono" style={{fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:4}}>{c.l}</div>
                <div style={{fontSize:22,color:'var(--ink)',fontWeight:400,fontFamily:'Fraunces'}}>{c.v}</div>
              </div>
            ))}
          </div>

          <p style={{margin:'0 0 30px',fontSize:20,lineHeight:1.55,color:'var(--ink-soft)',maxWidth:560,textWrap:'pretty'}}>
            {day.blurb}
          </p>

          {/* itinerary stops */}
          <div style={{position:'relative',paddingLeft:0}}>
            <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:14}}>
              Itinerary
            </div>
            <ol style={{listStyle:'none',margin:0,padding:0,position:'relative'}}>
              {/* connecting line */}
              <div style={{position:'absolute',left:23,top:18,bottom:18,width:1,background:'var(--rule)',borderLeft:'1px dashed var(--rule)'}}/>
              {day.stops.map((s, i)=>{
                const Ic = s.icon;
                return (
                  <li key={i} style={{display:'grid',gridTemplateColumns:'48px 70px 1fr',gap:14,alignItems:'flex-start',padding:'12px 0',position:'relative'}}>
                    <div style={{
                      width:46,height:46,borderRadius:'50%',background:'var(--paper-2)',
                      border:'1px solid var(--rule)',
                      display:'flex',alignItems:'center',justifyContent:'center',color:'var(--moss-deep)',
                    }}>
                      <Ic size={24}/>
                    </div>
                    <div className="mono" style={{fontSize:13,color:'var(--clay-deep)',letterSpacing:'.08em',paddingTop:13}}>
                      {s.time}
                    </div>
                    <div style={{paddingTop:8}}>
                      <div style={{fontSize:19,color:'var(--ink)',fontFamily:'Fraunces',fontWeight:500,letterSpacing:'-0.01em'}}>{s.place}</div>
                      <div className="hand" style={{fontSize:18,color:'var(--ink-mute)',marginTop:-2}}>{s.detail}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="hand" style={{
            fontSize:28,color:'var(--clay-deep)',lineHeight:1.2,
            paddingLeft:18,borderLeft:'2px solid var(--clay)',
            marginTop:30,maxWidth:480,
          }}>
            {day.pull}
          </div>
        </div>

        {/* right: scenic image, sticky on tall screens */}
        <div style={{position:'sticky',top:'10vh'}}>
          <div style={{position:'relative',height:'min(640px, 78vh)',overflow:'hidden',
                       border:'1px solid var(--rule)',borderRadius:2,
                       boxShadow:'0 30px 60px -30px rgba(31,36,24,.4)'}}>
            <div style={{position:'absolute',inset:0,transform:`scale(${scale})`,transformOrigin:'center',transition:'transform .1s linear'}}>
              <day.Scene label={`RÜGEN · ${day.n.toUpperCase()}`}/>
            </div>
            <div style={{position:'absolute',top:12,left:12,fontFamily:'JetBrains Mono',fontSize:9,letterSpacing:'.2em',color:'rgba(243,239,231,.85)',textTransform:'uppercase',mixBlendMode:'difference'}}>
              plate {index===0?'IV':'V'}
            </div>
            <div style={{position:'absolute',bottom:12,right:12,fontFamily:'JetBrains Mono',fontSize:9,letterSpacing:'.2em',color:'rgba(243,239,231,.85)',textTransform:'uppercase',mixBlendMode:'difference'}}>
              54.4°N · 13.4°E
            </div>
          </div>
          <div className="mono" style={{fontSize:10,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-mute)',marginTop:10}}>
            ↳ ai placeholder, swap with field photo
          </div>
        </div>
      </div>
    </article>
  );
}

function RugenIslandMap(){
  // rough island silhouette
  return (
    <div style={{padding:'0 7vw 8vh'}}>
      <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:14}}>
        The whole loop · sketched
      </div>
      <div style={{position:'relative',background:'var(--paper-2)',border:'1px solid var(--rule)',padding:'30px 24px'}}>
        <svg viewBox="0 0 800 400" style={{width:'100%',height:'auto',display:'block'}}>
          <defs>
            <pattern id="rg-water" patternUnits="userSpaceOnUse" width="6" height="6">
              <path d="M0 3 Q 1.5 1 3 3 T 6 3" stroke="rgba(91,125,122,.35)" fill="none" strokeWidth=".6"/>
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#rg-water)"/>
          {/* island silhouette - rough Rügen shape */}
          <path d="M180 240 C 130 200 140 150 200 130 C 240 110 280 130 320 110
                   C 360 95 400 100 430 80 C 470 60 510 70 520 90
                   C 540 70 580 70 600 95 C 615 75 640 90 645 110
                   C 670 110 685 130 670 150 C 690 170 680 200 650 210
                   C 660 240 620 270 580 260 C 560 290 510 295 480 270
                   C 460 295 410 300 380 280 C 360 305 310 305 280 285
                   C 250 305 200 290 180 240 Z"
                fill="#c8d2b4" stroke="#3d5942" strokeWidth="1.2"/>
          {/* Cape Arkona */}
          <circle cx="430" cy="80" r="4" fill="var(--clay)"/>
          <text x="438" y="76" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Cape Arkona</text>
          {/* Jasmund */}
          <circle cx="600" cy="130" r="4" fill="var(--clay)"/>
          <text x="608" y="126" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Jasmund N.P.</text>
          {/* Binz */}
          <circle cx="540" cy="200" r="4" fill="var(--clay)"/>
          <text x="548" y="204" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Binz · Prora</text>
          {/* Sellin */}
          <circle cx="520" cy="240" r="4" fill="var(--clay)"/>
          <text x="528" y="244" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Sellin</text>
          {/* Mönchgut */}
          <circle cx="490" cy="280" r="4" fill="var(--clay)"/>
          <text x="498" y="284" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Mönchgut</text>
          {/* Putbus */}
          <circle cx="380" cy="260" r="4" fill="var(--clay)"/>
          <text x="306" y="264" fontFamily="JetBrains Mono" fontSize="10" fill="#1f2418">Putbus ★</text>
          {/* Day 1 route */}
          <path d="M380 260 C 420 260 470 250 520 240 C 510 250 500 270 490 280"
                stroke="#8a4a22" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
          {/* Day 2 route */}
          <path d="M540 200 L580 170 C 600 145 600 130 600 130 C 580 110 480 90 430 80"
                stroke="#243321" strokeWidth="2" fill="none" strokeDasharray="6 4"/>
          {/* Train arrival */}
          <path d="M40 280 L380 260" stroke="#7a7868" strokeWidth="1" fill="none" strokeDasharray="2 4"/>
          <text x="50" y="276" fontFamily="JetBrains Mono" fontSize="9" fill="#7a7868">↘ from Berlin (IC)</text>
          {/* legend */}
          <g transform="translate(40 340)">
            <line x1="0" y1="0" x2="30" y2="0" stroke="#8a4a22" strokeWidth="2" strokeDasharray="4 3"/>
            <text x="36" y="3" fontFamily="JetBrains Mono" fontSize="9" fill="#1f2418">Day 1 — South</text>
            <line x1="160" y1="0" x2="190" y2="0" stroke="#243321" strokeWidth="2" strokeDasharray="6 4"/>
            <text x="196" y="3" fontFamily="JetBrains Mono" fontSize="9" fill="#1f2418">Day 2 — North</text>
            <text x="320" y="3" fontFamily="JetBrains Mono" fontSize="9" fill="#7a7868">★ overnight</text>
          </g>
          {/* compass */}
          <g transform="translate(740 60)">
            <circle r="22" fill="var(--paper)" stroke="#1f2418" strokeWidth=".8"/>
            <path d="M0 -16 L4 4 L0 1 L-4 4 Z" fill="#1f2418"/>
            <text x="0" y="-22" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" fill="#1f2418">N</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function RugenRoute(){
  return (
    <section id="rugen" style={{position:'relative',background:'var(--paper)'}}>
      {/* divider */}
      <div style={{padding:'12vh 7vw 8vh',background:'var(--paper-2)',borderTop:'1px solid var(--rule)',borderBottom:'1px solid var(--rule)'}}>
        <div className="mono" style={{fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--clay-deep)',marginBottom:24}}>
          Part two — Two days, one island
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:'5vw',alignItems:'end'}}>
          <h2 style={{margin:0,fontSize:'clamp(56px, 9vw, 140px)',lineHeight:.9,fontWeight:300,letterSpacing:'-0.03em',fontStyle:'italic',color:'var(--ink)',fontVariationSettings:'"opsz" 144, "SOFT" 80'}}>
            A weekend on<br/>
            <span style={{color:'var(--moss-deep)'}}>Rügen.</span>
          </h2>
          <div>
            <p style={{margin:0,fontSize:17,lineHeight:1.5,color:'var(--ink-soft)',maxWidth:420,textWrap:'pretty'}}>
              Germany's largest island, four hours north by train. Chalk cliffs, beech forest,
              white piers and a coast that ends in a lighthouse. Two days, roughly 120 km, one
              very satisfying ferry.
            </p>
            <div style={{display:'flex',gap:30,marginTop:24,color:'var(--moss-deep)'}}>
              <Train size={42}/>
              <Lighthouse size={42}/>
              <Cliff size={42}/>
            </div>
          </div>
        </div>
      </div>

      <RugenIslandMap/>

      {RUGEN_DAYS.map((d,i)=>(<DayCard key={d.n} day={d} index={i}/>))}
    </section>
  );
}

window.RugenRoute = RugenRoute;
