/* hero.jsx — opening hero with parallax, scroll cue, and big editorial type */

const { useRef, useEffect, useState } = React;

function Hero({ scrollY }){
  const y = scrollY || 0;
  // parallax transforms — different layers move at different rates
  const tSky = `translateY(${y*0.15}px)`;
  const tHill = `translateY(${y*0.25}px)`;
  const tFront = `translateY(${y*0.4}px)`;
  const tType = `translateY(${y*-0.1}px)`;
  const opacity = Math.max(0, 1 - y/600);

  return (
    <section style={{
      position:'relative',height:'100vh',minHeight:680,
      overflow:'hidden',background:'var(--paper)',
      borderBottom:'1px solid var(--rule)',
    }}>
      {/* sky wash */}
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, #e8d9b8 0%, #dfe2cc 55%, #c8d2b4 100%)',transform:tSky}}/>
      {/* sun */}
      <div style={{position:'absolute',right:'14%',top:'18%',width:140,height:140,borderRadius:'50%',background:'radial-gradient(circle,#f3e4c4 0%, #e8c9a4 60%, transparent 75%)',transform:tSky}}/>
      {/* far hills */}
      <svg viewBox="0 0 1600 400" preserveAspectRatio="none"
           style={{position:'absolute',left:0,right:0,bottom:'34%',width:'100%',height:'30%',transform:tHill}}>
        <path d="M0 280 C 200 230 400 260 700 220 C 1000 180 1300 240 1600 200 L1600 400 L0 400 Z" fill="#6b805f"/>
        <path d="M0 320 C 250 280 500 310 800 270 C 1100 230 1400 290 1600 260 L1600 400 L0 400 Z" fill="#506b48"/>
      </svg>
      {/* foreground hills + trees */}
      <svg viewBox="0 0 1600 400" preserveAspectRatio="none"
           style={{position:'absolute',left:0,right:0,bottom:0,width:'100%',height:'40%',transform:tFront}}>
        <path d="M0 200 C 200 160 400 220 700 180 C 1000 140 1300 200 1600 170 L1600 400 L0 400 Z" fill="#3d5942"/>
        <g fill="#243321">
          <path d="M120 200 L110 175 L130 175 Z M120 175 L113 158 L127 158 Z M120 158 L115 145 L125 145 Z"/>
          <path d="M260 220 L252 195 L268 195 Z M260 195 L255 180 L265 180 Z"/>
          <path d="M520 195 L510 170 L530 170 Z M520 170 L513 152 L527 152 Z"/>
          <path d="M860 175 L850 148 L870 148 Z M860 148 L854 130 L866 130 Z"/>
          <path d="M1180 195 L1170 168 L1190 168 Z"/>
          <path d="M1380 185 L1370 158 L1390 158 Z M1380 158 L1374 140 L1386 140 Z"/>
        </g>
      </svg>

      {/* type lockup */}
      <div style={{position:'relative',zIndex:2,height:'100%',padding:'48px 7vw',display:'flex',flexDirection:'column',justifyContent:'space-between',transform:tType,opacity}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:24}}>
          <div className="mono" style={{fontSize:11,letterSpacing:'.2em',color:'var(--ink-soft)',textTransform:'uppercase'}}>
            Field Notes № 04 · Spring '26
          </div>
          <div className="mono" style={{fontSize:11,letterSpacing:'.2em',color:'var(--ink-soft)',textTransform:'uppercase',textAlign:'right'}}>
            52.5°N · 13.4°E<br/>
            Berlin–Brandenburg
          </div>
        </div>

        <div>
          <div className="hand" style={{fontSize:34,color:'var(--clay-deep)',marginBottom:-14,marginLeft:6}}>two days, two wheels —</div>
          <h1 style={{
            margin:0,fontSize:'clamp(64px, 12vw, 200px)',lineHeight:.86,
            fontWeight:300,fontStyle:'italic',letterSpacing:'-0.04em',
            color:'var(--ink)',fontVariationSettings:'"opsz" 144, "SOFT" 80'
          }}>
            <span style={{display:'block'}}>The Long</span>
            <span style={{display:'block',marginLeft:'14%'}}>Way <em style={{fontStyle:'italic',color:'var(--moss-deep)'}}>Round</em></span>
          </h1>
          <div style={{display:'flex',gap:'5vw',alignItems:'baseline',marginTop:18,maxWidth:780}}>
            <p style={{margin:0,fontSize:18,lineHeight:1.5,color:'var(--ink-soft)',maxWidth:520}}>
              Three weekend rides out of Berlin and one slow island lap on Rügen.
              Routes for tired eyes, sore legs, and a thermos of coffee.
            </p>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div className="mono" style={{fontSize:11,color:'var(--ink-soft)',letterSpacing:'.15em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:10}}>
            <ArrowDown size={18}/> Scroll to begin
          </div>
          <div style={{display:'flex',alignItems:'center',gap:24,color:'var(--moss-deep)'}}>
            <Bike size={36}/>
            <Lake size={36}/>
            <Forest size={36}/>
            <Compass size={36}/>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
