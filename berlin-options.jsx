/* berlin-options.jsx — three trip option cards with scroll-driven zoom & reveal */

const { useRef: useRef_b, useEffect: useEffect_b, useState: useState_b } = React;

// Hook: returns 0..1 progress of element through viewport
function useScrollProgress(ref){
  const [p, setP] = useState_b(0);
  useEffect_b(()=>{
    const onScroll = () => {
      const el = ref.current; if(!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when bottom enters viewport, 1 when top leaves
      const total = r.height + vh;
      const seen = vh - r.top;
      setP(Math.max(0, Math.min(1, seen/total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  },[ref]);
  return p;
}

const OPTIONS = [
  {
    n: '01',
    kicker: 'Lakes & palaces',
    title: 'Potsdam to Caputh',
    distance: '46 km',
    difficulty: 'Easy',
    duration: '4–5 hrs',
    blurb: 'A loop of glassy lakes through Sanssouci\'s ornamental gardens, around the Havel inlets to Caputh, where Einstein\'s summerhouse waits between the pines.',
    pull: '"Like riding through a watercolour."',
    Scene: ({label}) => <PalaceScene label={label}/>,
    icons: [Palace, Lake, Bike],
    waypoints: ['Wannsee S-Bahn','Sanssouci Park','Templiner See','Caputh ferry','Einstein-Haus'],
    tags:['palace gardens','three lake crossings','ferry hop'],
  },
  {
    n: '02',
    kicker: 'Forest & dark sky',
    title: 'Westhavelland & the Stars',
    distance: '72 km',
    difficulty: 'Moderate',
    duration: '2 days',
    blurb: 'Out past Rathenow into Germany\'s first international Dark Sky Reserve. Reed beds, kettle lakes, and the kind of night you forget exists when you live in a city.',
    pull: '"The Milky Way as a horizon, not a rumour."',
    Scene: ({label}) => <StarScene label={label}/>,
    icons: [Star, Forest, Lake],
    waypoints: ['Rathenow','Gülpe village','Westhavelland reserve','overnight bivouac','sunrise over reed beds'],
    tags:['Bortle 2 sky','silent miles','no traffic'],
  },
  {
    n: '03',
    kicker: 'Industrial heritage & Spreewald',
    title: 'Lausitz Loop',
    distance: '95 km',
    difficulty: 'Spirited',
    duration: '2 days',
    blurb: 'Brick smokestacks of the Lausitz turn into willow-draped Spreewald canals. Punt boats glide past gherkin stalls; rust-coloured mining lakes glow at dusk.',
    pull: '"Where heavy industry softens into water gardens."',
    Scene: ({label}) => <IndustrialScene label={label}/>,
    icons: [Factory, Cottage, Bike],
    waypoints: ['Cottbus','F60 conveyor bridge','Lübbenau','Spreewald canals','Lehde village'],
    tags:['F60 "Liegender Eiffelturm"','canal punt','pickled gherkins'],
  },
];

function MapSketch({waypoints, color='#243321'}){
  // Generate a wandering route through points
  const points = React.useMemo(()=>{
    const n = waypoints.length;
    return waypoints.map((w,i)=>{
      const t = i/(n-1);
      const x = 30 + t*340;
      const y = 80 + Math.sin(i*1.3)*32 + (i%2===0?-8:8);
      return {x,y,w};
    });
  },[waypoints]);
  // smooth path
  const d = React.useMemo(()=>{
    let s = `M ${points[0].x} ${points[0].y}`;
    for(let i=1;i<points.length;i++){
      const p0=points[i-1], p1=points[i];
      const cx = (p0.x+p1.x)/2;
      s += ` Q ${cx} ${p0.y - 12} ${p1.x} ${p1.y}`;
    }
    return s;
  },[points]);

  return (
    <div style={{padding:'14px 18px 20px',background:'var(--paper-2)',border:'1px solid var(--rule)',borderRadius:2,position:'relative'}}>
      <div className="mono" style={{fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:8}}>
        Sketch route · not to scale
      </div>
      <svg viewBox="0 0 400 160" style={{width:'100%',height:140,display:'block'}}>
        {/* north arrow */}
        <g transform="translate(370 22)">
          <path d="M0 -10 L4 6 L0 2 L-4 6 Z" fill={color}/>
          <text x="0" y="20" fontFamily="JetBrains Mono" fontSize="7" fill={color} textAnchor="middle">N</text>
        </g>
        {/* dotted background */}
        <g opacity=".25">
          {[...Array(40)].map((_,i)=>{
            const x = (i%10)*40 + 20;
            const y = Math.floor(i/10)*40 + 20;
            return <circle key={i} cx={x} cy={y} r="0.6" fill={color}/>;
          })}
        </g>
        {/* the route */}
        <path d={d} stroke={color} strokeWidth="1.4" fill="none" strokeDasharray="3 3" strokeLinecap="round"/>
        {/* waypoints */}
        {points.map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--paper)" stroke={color} strokeWidth="1.4"/>
            <circle cx={p.x} cy={p.y} r="1.4" fill={color}/>
            <text x={p.x} y={p.y - 10} fontFamily="JetBrains Mono" fontSize="7"
                  fill={color} textAnchor="middle" style={{textTransform:'uppercase',letterSpacing:'.06em'}}>
              {p.w}
            </text>
          </g>
        ))}
        {/* start/end labels */}
        <text x={points[0].x} y={points[0].y + 14} fontFamily="JetBrains Mono" fontSize="6" fill={color} textAnchor="middle">START</text>
        <text x={points[points.length-1].x} y={points[points.length-1].y + 14} fontFamily="JetBrains Mono" fontSize="6" fill={color} textAnchor="middle">END</text>
      </svg>
    </div>
  );
}

function OptionCard({opt, index}){
  const ref = useRef_b(null);
  const p = useScrollProgress(ref);
  // zoom: image scales 1.25 -> 1.0 as the row scrolls past
  const scale = 1.18 - p*0.18;
  const yShift = (0.5 - p) * 60;

  // alternate layout
  const flip = index % 2 === 1;

  return (
    <article ref={ref} style={{
      position:'relative',padding:'14vh 7vw',
      borderTop:'1px solid var(--rule)',
    }}>
      <div style={{
        display:'grid',gap:'40px 5vw',
        gridTemplateColumns:'minmax(0,1fr) minmax(0,1.1fr)',
        direction: flip?'rtl':'ltr',
      }}>
        {/* image column */}
        <div style={{direction:'ltr',position:'relative'}}>
          <div style={{position:'relative',height:'min(560px, 70vh)',overflow:'hidden',
                       border:'1px solid var(--rule)',borderRadius:2,
                       boxShadow:'0 30px 60px -30px rgba(31,36,24,.4)'}}>
            <div style={{position:'absolute',inset:0,transform:`scale(${scale}) translateY(${yShift*0.2}px)`,transformOrigin:'center',transition:'transform .1s linear'}}>
              <opt.Scene label={`${opt.n} · ${opt.title.toUpperCase()}`}/>
            </div>
            {/* corner markers */}
            <div style={{position:'absolute',top:10,left:10,fontFamily:'JetBrains Mono',fontSize:9,letterSpacing:'.2em',color:'rgba(243,239,231,.85)',textTransform:'uppercase',mixBlendMode:'difference'}}>
              field plate {opt.n}
            </div>
            <div style={{position:'absolute',top:10,right:10,fontFamily:'JetBrains Mono',fontSize:9,letterSpacing:'.2em',color:'rgba(243,239,231,.85)',textTransform:'uppercase',mixBlendMode:'difference'}}>
              {opt.distance}
            </div>
          </div>
          {/* caption */}
          <div className="mono" style={{fontSize:10,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-mute)',marginTop:10,display:'flex',justifyContent:'space-between'}}>
            <span>fig. {opt.n} — {opt.kicker}</span>
            <span>↳ ai placeholder, swap with photograph</span>
          </div>
        </div>

        {/* text column */}
        <div style={{direction:'ltr',position:'relative',transform:`translateY(${yShift*0.1}px)`}}>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
            <div style={{
              fontFamily:'Fraunces',fontSize:84,fontStyle:'italic',
              color:'var(--clay)',lineHeight:1,fontWeight:300,
              fontVariationSettings:'"opsz" 144, "SOFT" 100'
            }}>{opt.n}</div>
            <div style={{flex:1,height:1,background:'var(--rule)'}}/>
            <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)'}}>
              option {opt.n} of 03
            </div>
          </div>

          <div className="hand" style={{fontSize:24,color:'var(--clay-deep)',marginBottom:6}}>{opt.kicker}</div>
          <h2 style={{margin:'0 0 32px',fontSize:'clamp(40px, 5.4vw, 76px)',lineHeight:1.05,fontWeight:300,letterSpacing:'-0.02em',color:'var(--ink)',fontVariationSettings:'"opsz" 144',paddingBottom:4}}>
            {opt.title}
          </h2>

          {/* chips */}
          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:24}}>
            {[{l:'Distance',v:opt.distance},{l:'Effort',v:opt.difficulty},{l:'Time',v:opt.duration}].map(c=>(
              <div key={c.l} style={{
                display:'flex',gap:8,alignItems:'baseline',
                padding:'7px 12px',border:'1px solid var(--rule)',borderRadius:999,
                background:'var(--paper-2)',
              }}>
                <span className="mono" style={{fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--ink-mute)'}}>{c.l}</span>
                <span style={{fontSize:14,color:'var(--ink)',fontWeight:500}}>{c.v}</span>
              </div>
            ))}
          </div>

          <p style={{margin:'0 0 22px',fontSize:21,lineHeight:1.5,color:'var(--ink-soft)',maxWidth:560,textWrap:'pretty'}}>
            {opt.blurb}
          </p>

          <div style={{display:'flex',gap:24,alignItems:'flex-start',color:'var(--moss-deep)',marginBottom:30}}>
            {opt.icons.map((Ic,i)=>(<Ic key={i} size={48}/>))}
          </div>

          <div className="hand" style={{
            fontSize:28,color:'var(--clay-deep)',lineHeight:1.2,
            paddingLeft:18,borderLeft:'2px solid var(--clay)',
            marginBottom:28,maxWidth:480,
          }}>
            {opt.pull}
          </div>

          {/* tags */}
          <div style={{display:'flex',flexWrap:'wrap',gap:'4px 14px',marginBottom:26}}>
            {opt.tags.map(t=>(
              <span key={t} className="mono" style={{fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ink-mute)'}}>
                · {t}
              </span>
            ))}
          </div>

          <MapSketch waypoints={opt.waypoints}/>
        </div>
      </div>
    </article>
  );
}

function BerlinOptions(){
  return (
    <section id="berlin" style={{position:'relative',background:'var(--paper)'}}>
      {/* section header */}
      <div style={{padding:'14vh 7vw 6vh',borderBottom:'1px solid var(--rule)'}}>
        <div className="mono" style={{fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:'var(--clay-deep)',marginBottom:24}}>
          Part one — Three weekend escapes
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:'5vw',alignItems:'end'}}>
          <h2 style={{margin:0,fontSize:'clamp(56px, 9vw, 140px)',lineHeight:.9,fontWeight:300,letterSpacing:'-0.03em',fontStyle:'italic',color:'var(--ink)',fontVariationSettings:'"opsz" 144, "SOFT" 60'}}>
            Out of Berlin,<br/>
            <span style={{color:'var(--moss-deep)'}}>into Brandenburg.</span>
          </h2>
          <div>
            <p style={{margin:0,fontSize:17,lineHeight:1.5,color:'var(--ink-soft)',maxWidth:420,textWrap:'pretty'}}>
              The countryside around the capital is flat, forested, and stitched
              with the kind of small lakes you find by accident. Three options,
              ranked roughly by ambition.
            </p>
            <div style={{display:'flex',gap:30,marginTop:24,color:'var(--moss-deep)'}}>
              <Compass size={42}/>
              <Bike size={42}/>
              <Forest size={42}/>
            </div>
          </div>
        </div>
      </div>

      {OPTIONS.map((opt,i)=>(<OptionCard key={opt.n} opt={opt} index={i}/>))}
    </section>
  );
}

window.BerlinOptions = BerlinOptions;
