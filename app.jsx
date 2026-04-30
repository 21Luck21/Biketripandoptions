/* app.jsx — root, scroll progress, navigation rail, footer */

const { useState: useState_a, useEffect: useEffect_a, useRef: useRef_a } = React;

function ProgressRail(){
  const [p, setP] = useState_a(0);
  useEffect_a(()=>{
    const f = ()=>{
      const h = document.documentElement;
      const total = h.scrollHeight - window.innerHeight;
      setP(total>0 ? Math.max(0,Math.min(1, window.scrollY/total)) : 0);
    };
    f();
    window.addEventListener('scroll', f, {passive:true});
    window.addEventListener('resize', f);
    return ()=>{ window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  },[]);
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,height:2,zIndex:100,pointerEvents:'none'}}>
      <div style={{height:'100%',width:`${p*100}%`,background:'var(--clay)',transition:'width .08s linear'}}/>
    </div>
  );
}

function NavDots(){
  const [active, setActive] = useState_a('top');
  useEffect_a(()=>{
    const f = ()=>{
      const sections = ['top','berlin','rugen'];
      let cur = 'top';
      for(const id of sections){
        const el = id==='top' ? document.body : document.getElementById(id);
        if(!el) continue;
        const r = id==='top' ? {top:-window.scrollY} : el.getBoundingClientRect();
        if(r.top < window.innerHeight*0.4) cur = id;
      }
      setActive(cur);
    };
    f();
    window.addEventListener('scroll', f, {passive:true});
    return ()=> window.removeEventListener('scroll', f);
  },[]);
  const items = [
    {id:'top', label:'Cover'},
    {id:'berlin', label:'Brandenburg'},
    {id:'rugen', label:'Rügen'},
  ];
  return (
    <nav style={{
      position:'fixed',right:'2.5vw',top:'50%',transform:'translateY(-50%)',
      zIndex:50,display:'flex',flexDirection:'column',gap:14,
    }}>
      {items.map(it=>{
        const on = active===it.id;
        return (
          <a key={it.id} href={`#${it.id}`} onClick={(e)=>{
            if(it.id==='top'){ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }
          }}
          style={{
            display:'flex',alignItems:'center',gap:10,
            color: on ? 'var(--clay-deep)' : 'var(--ink-mute)',
            textDecoration:'none',fontFamily:'JetBrains Mono',
            fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',
            opacity: on?1:.6,transition:'opacity .2s,color .2s',
          }}>
            <span style={{
              width: on?28:14,height:1,background:'currentColor',
              transition:'width .25s',
            }}/>
            <span>{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Footer(){
  return (
    <footer style={{
      borderTop:'1px solid var(--rule)',padding:'10vh 7vw 6vh',
      background:'var(--paper-2)',
    }}>
      <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr',gap:'5vw',alignItems:'flex-start'}}>
        <div>
          <h3 style={{margin:'0 0 18px',fontSize:'clamp(40px, 5vw, 72px)',lineHeight:.95,fontWeight:300,fontStyle:'italic',letterSpacing:'-0.02em',color:'var(--ink)',fontVariationSettings:'"opsz" 144'}}>
            Bring a thermos.
          </h3>
          <p style={{margin:0,fontSize:17,lineHeight:1.5,color:'var(--ink-soft)',maxWidth:480,textWrap:'pretty'}}>
            All four routes are on quiet bike paths or unpaved forest tracks. Bring a patch kit, a
            paper map (signal is moody out east), and a layer for the wind.
          </p>
        </div>
        <div>
          <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:12}}>Bike on train</div>
          <ul style={{listStyle:'none',padding:0,margin:0,fontSize:14,color:'var(--ink-soft)',lineHeight:1.7}}>
            <li>RE & RB — bike spot included</li>
            <li>IC to Rügen — reserve in advance</li>
            <li>Local SPNV — €6 day add-on</li>
          </ul>
        </div>
        <div>
          <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:12}}>Best season</div>
          <ul style={{listStyle:'none',padding:0,margin:0,fontSize:14,color:'var(--ink-soft)',lineHeight:1.7}}>
            <li>May → early July (long days)</li>
            <li>September (warm seas, no crowds)</li>
            <li>Avoid August on Rügen</li>
          </ul>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:60,paddingTop:24,borderTop:'1px solid var(--rule)'}}>
        <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)'}}>
          Field Notes № 04 · Berlin–Rügen · 26
        </div>
        <div className="hand" style={{fontSize:22,color:'var(--clay-deep)'}}>— ride well —</div>
        <div className="mono" style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)'}}>
          Page 12 of 12
        </div>
      </div>
    </footer>
  );
}

function App(){
  const [scrollY, setScrollY] = useState_a(0);
  useEffect_a(()=>{
    const f = ()=> setScrollY(window.scrollY);
    f();
    window.addEventListener('scroll', f, {passive:true});
    return ()=> window.removeEventListener('scroll', f);
  },[]);
  return (
    <div data-screen-label="01 Cover">
      <ProgressRail/>
      <NavDots/>
      <Hero scrollY={scrollY}/>
      <BerlinOptions/>
      <RugenRoute/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
