// Video ad scenes for AccessAbilities Expo Dubai 2026.
// 9:16 (1080×1920). Short cut ≈ 15s (default), Long cut ≈ 29s.
// Brand palette aligned to the AccessAbilities logo (orange #F25C19, yellow
// #F9B10A) over warm cream. Persistent logo lockup at the top of every
// scene — "AccessAbilities Expo · powered by · Global Exhibition UK".

const VINK    = '#1B1410';   // warm near-black
const VCREAM  = '#FAF6EC';   // creamy paper
const VGOLD   = '#F9B10A';   // AccessAbilities yellow
const VTERRA  = '#F25C19';   // AccessAbilities orange
const VGRAY   = '#4F4B4C';   // subtitle gray
const VLINE   = 'rgba(27,20,16,0.14)';

const W = 1080;
const H = 1920;

// ─── type helpers ──────────────────────────────────────────────────────────

const VMono = ({ children, style }) => (
  <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase', ...style }}>{children}</span>
);
const VSerif = ({ children, style }) => (
  <span style={{ fontFamily: '"Instrument Serif", "Times New Roman", serif', fontWeight: 400, ...style }}>{children}</span>
);
const VSans = ({ children, style }) => (
  <span style={{ fontFamily: '"Space Grotesk", "Helvetica Neue", sans-serif', ...style }}>{children}</span>
);

// ─── word reveal (handles JSX children, spaces fold into words) ────────────

function flattenWordTokens(children, parentStyle = {}) {
  const out = [];
  React.Children.forEach(children, (child) => {
    if (child == null || child === false) return;
    if (typeof child === 'string' || typeof child === 'number') {
      const text = String(child);
      const lines = text.split('\n');
      lines.forEach((line, li) => {
        line.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) out.push({ kind: 'space', text: p, style: parentStyle });
          else out.push({ kind: 'word', text: p, style: parentStyle });
        });
        if (li < lines.length - 1) out.push({ kind: 'br' });
      });
    } else if (React.isValidElement(child)) {
      if (child.type === 'br') { out.push({ kind: 'br' }); return; }
      const merged = { ...parentStyle, ...(child.props.style || {}) };
      out.push(...flattenWordTokens(child.props.children, merged));
    }
  });
  return out;
}

const WordReveal = ({ children, progress, stagger = 0.06 }) => {
  const tokens = flattenWordTokens(children);
  const wordCount = tokens.filter(t => t.kind === 'word').length;
  const denom = Math.max(1, wordCount - 1);
  const out = [];
  let pendingSpace = '';
  let wIdx = 0;
  tokens.forEach((tok, i) => {
    if (tok.kind === 'space') { pendingSpace += tok.text; return; }
    if (tok.kind === 'br') { pendingSpace = ''; out.push(<br key={'br-' + i} />); return; }
    const text = pendingSpace + tok.text;
    pendingSpace = '';
    const myStart = wordCount > 1 ? (wIdx / denom) * (1 - stagger) : 0;
    wIdx++;
    const local = clamp((progress - myStart) / Math.max(0.001, stagger), 0, 1);
    const eased = Easing.easeOutCubic(local);
    out.push(
      <span key={'w-' + i} style={{
        ...tok.style, display: 'inline-block', whiteSpace: 'pre',
        opacity: eased, transform: `translateY(${(1 - eased) * 14}px)`,
        willChange: 'transform, opacity',
      }}>{text}</span>
    );
  });
  return <>{out}</>;
};

// ─── shared blocks ─────────────────────────────────────────────────────────

const FadeBlock = ({ entry = 0.5, exit = 0.4, slide = 24, children, style }) => {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exit);
  let o = 1, y = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    o = t; y = (1 - t) * slide;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    o = 1 - t; y = -t * (slide * 0.5);
  }
  return <div style={{ ...style, opacity: o, transform: `translateY(${y}px)`, willChange: 'transform, opacity' }}>{children}</div>;
};

// Persistent logo lockup that sits at the top of every scene.
// Anchored to scene local time so it fades in once and stays until exit.
const LogoLockup = ({ tone = 'dark' }) => {
  const { localTime, duration } = useSprite();
  const entryT = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
  const exitStart = Math.max(0, duration - 0.4);
  const exitT = clamp((localTime - exitStart) / 0.4, 0, 1);
  const opacity = entryT * (1 - exitT);

  const textColor = tone === 'dark' ? VINK : VCREAM;
  const ruleColor = tone === 'dark' ? 'rgba(27,20,16,0.18)' : 'rgba(250,246,236,0.22)';

  return (
    <div style={{
      position: 'absolute', top: 70, left: 70, right: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      opacity, transform: `translateY(${(1 - entryT) * -8}px)`,
    }}>
      {/* AccessAbilities logo (left) */}
      <img src="assets/accessabilities-logo.png" alt="AccessAbilities Expo"
        style={{ height: 110, objectFit: 'contain', display: 'block' }} />

      {/* "powered by" + Global Exhibition (right) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 16,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: textColor, opacity: 0.55, marginBottom: 4,
          }}>
            Powered by
          </div>
          <div style={{
            fontFamily: '"Space Grotesk", sans-serif', fontSize: 24,
            fontWeight: 600, letterSpacing: '-0.005em',
            color: textColor,
          }}>
            Global Exhibition UK
          </div>
        </div>
        <img src="assets/global-exhibition-logo.png" alt="Global Exhibition UK"
          style={{ width: 90, height: 90, objectFit: 'contain', display: 'block' }} />
      </div>

      {/* faint baseline rule */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: -28, height: 1, background: ruleColor,
      }} />
    </div>
  );
};

// ─── Scene 1 · Hook ────────────────────────────────────────────────────────
const SceneHook = ({ start, end }) => (
  <Sprite start={start} end={end}>
    {({ progress }) => (
      <div style={{ position: 'absolute', inset: 0, background: VCREAM, color: VINK }}>
        <LogoLockup tone="dark" />

        {/* Big serif headline */}
        <div style={{ position: 'absolute', left: 80, right: 80, top: 480 }}>
          <VMono style={{ color: VTERRA, display: 'block', marginBottom: 32, opacity: clamp(progress / 0.15, 0, 1) }}>
            For UK &amp; Ireland innovators
          </VMono>
          <VSans style={{ fontSize: 44, color: VINK, opacity: 0.78, fontWeight: 400, lineHeight: 1.3, display: 'block' }}>
            <WordReveal progress={clamp((progress - 0.05) / 0.3, 0, 1)}>
              Your solution could change lives.
            </WordReveal>
          </VSans>
          <div style={{ height: 1, background: VLINE, width: 160, margin: '40px 0' }} />
          <VSerif style={{ fontSize: 168, lineHeight: 0.92, letterSpacing: '-0.025em', color: VINK, display: 'block' }}>
            <WordReveal progress={clamp((progress - 0.32) / 0.45, 0, 1)} stagger={0.1}>
              Will the right{'\n'}people <span style={{ fontStyle: 'italic', color: VTERRA }}>see it?</span>
            </WordReveal>
          </VSerif>
        </div>

        {/* Bottom rail */}
        <FadeBlock entry={0.6} exit={0.4} style={{ position: 'absolute', bottom: 90, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <VMono style={{ color: VINK, opacity: 0.5 }}>AccessAbilities Expo Dubai 2026</VMono>
            <VMono style={{ color: VINK, opacity: 0.5 }}>19–21 October · Dubai World Trade Centre</VMono>
          </div>
        </FadeBlock>
      </div>
    )}
  </Sprite>
);

// ─── Scene 2 · Expo info + Early Booking benefit ───────────────────────────
const SceneExpoInfo = ({ start, end }) => (
  <Sprite start={start} end={end}>
    {({ progress }) => {
      const dateT = Easing.easeOutCubic(clamp((progress - 0.05) / 0.3, 0, 1));
      const venueT = clamp((progress - 0.3) / 0.2, 0, 1);
      const benefitT = clamp((progress - 0.55) / 0.2, 0, 1);
      return (
        <div style={{ position: 'absolute', inset: 0, background: VCREAM, color: VINK }}>
          <LogoLockup tone="dark" />

          {/* Date hero — corporate save-the-date lockup */}
          <div style={{ position: 'absolute', left: 80, right: 80, top: 360 }}>
            {/* Section eyebrow with hairline */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36,
              opacity: clamp(progress / 0.15, 0, 1),
            }}>
              <div style={{ width: 56, height: 1, background: VTERRA }} />
              <VMono style={{ color: VTERRA }}>Save the date</VMono>
            </div>

            {/* Day range */}
            <VSerif style={{
              fontSize: 380, lineHeight: 0.9, letterSpacing: '-0.025em',
              color: VINK, display: 'block', whiteSpace: 'nowrap',
              opacity: dateT, transform: `translateY(${(1 - dateT) * 40}px)`,
            }}>
              19 – 21
            </VSerif>

            {/* Month + year */}
            <VSerif style={{
              fontSize: 110, lineHeight: 1.0, letterSpacing: '-0.015em',
              color: VINK, opacity: 0.85 * venueT,
              display: 'block', marginTop: 18,
              transform: `translateY(${(1 - venueT) * 24}px)`,
            }}>
              October 2026
            </VSerif>

            {/* Caption row — day range + duration */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 22, marginTop: 38,
              opacity: venueT,
            }}>
              <VMono style={{ color: VINK, opacity: 0.55 }}>
                Monday – Wednesday
              </VMono>
              <div style={{ width: 5, height: 5, background: VTERRA, borderRadius: 999 }} />
              <VMono style={{ color: VINK, opacity: 0.55 }}>
                3 day exhibition
              </VMono>
            </div>
          </div>

          {/* Venue card */}
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1080,
            padding: 36, background: VINK, color: VCREAM, borderRadius: 14,
            opacity: venueT, transform: `translateY(${(1 - venueT) * 30}px)`,
            display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <div style={{ width: 8, height: 80, background: VGOLD, borderRadius: 4 }} />
            <div>
              <VMono style={{ color: VGOLD, display: 'block', marginBottom: 10 }}>Venue</VMono>
              <VSerif style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: '-0.02em', display: 'block' }}>
                Dubai World Trade Centre
              </VSerif>
            </div>
          </div>

          {/* Early booking benefit — orange callout */}
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1330,
            padding: 36, background: VTERRA, color: VCREAM, borderRadius: 14,
            opacity: benefitT, transform: `translateY(${(1 - benefitT) * 40}px)`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
              <div style={{
                background: VCREAM, color: VTERRA,
                padding: '8px 18px', borderRadius: 999,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 16,
                fontWeight: 500, letterSpacing: '0.14em',
              }}>EARLY BOOKING</div>
              <VMono style={{ color: VCREAM, opacity: 0.85 }}>Limited</VMono>
            </div>
            <VSerif style={{ fontSize: 64, lineHeight: 1.0, letterSpacing: '-0.02em', display: 'block' }}>
              Free advertising across the <span style={{ fontStyle: 'italic' }}>MENASA region.</span>
            </VSerif>
          </div>
        </div>
      );
    }}
  </Sprite>
);

// ─── Scene 3 · Sectors ─────────────────────────────────────────────────────
const SECTORS = [
  'Healthcare & MedTech',
  'Assistive Technology',
  'Mobility & Rehabilitation',
  'Independent Living',
  'Inclusive Education',
  'Digital Accessibility',
  'Accessible Design & Innovation',
];

const SceneSectors = ({ start, end }) => (
  <Sprite start={start} end={end}>
    {({ progress }) => (
      <div style={{ position: 'absolute', inset: 0, background: VCREAM, color: VINK }}>
        <LogoLockup tone="dark" />

        <div style={{ position: 'absolute', left: 80, right: 80, top: 360 }}>
          <VMono style={{ color: VTERRA, display: 'block', marginBottom: 28, opacity: clamp(progress / 0.15, 0, 1) }}>
            If your organisation works in
          </VMono>
          <VSerif style={{ fontSize: 132, lineHeight: 0.94, letterSpacing: '-0.025em', display: 'block', color: VINK }}>
            <WordReveal progress={clamp(progress / 0.3, 0, 1)} stagger={0.08}>
              Seven sectors{'\n'}<span style={{ fontStyle: 'italic', color: VTERRA }}>ready for Dubai.</span>
            </WordReveal>
          </VSerif>
        </div>

        {/* Chips cascade */}
        <div style={{ position: 'absolute', left: 80, right: 80, top: 850, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {SECTORS.map((s, i) => {
            const t = clamp((progress - (0.2 + i * 0.06)) / 0.18, 0, 1);
            const eased = Easing.easeOutBack(t);
            const filled = i % 2 === 0;
            return (
              <div key={s} style={{
                padding: '20px 30px',
                border: `2px solid ${filled ? VTERRA : VGOLD}`,
                background: filled ? VTERRA : 'transparent',
                color: filled ? VCREAM : VINK,
                borderRadius: 999,
                opacity: t,
                transform: `translateY(${(1 - eased) * 16}px) scale(${0.92 + 0.08 * eased})`,
              }}>
                <VSans style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.005em' }}>{s}</VSans>
              </div>
            );
          })}
        </div>

        <FadeBlock entry={0.6} exit={0.4} style={{ position: 'absolute', bottom: 100, left: 80, right: 80 }}>
          <VSans style={{ fontSize: 32, lineHeight: 1.4, color: VINK, opacity: 0.7, display: 'block', fontWeight: 400 }}>
            Dubai is your route into the Middle East.
          </VSans>
        </FadeBlock>
      </div>
    )}
  </Sprite>
);

// ─── Scene 4 · CTA ─────────────────────────────────────────────────────────
const SceneCTA = ({ start, end }) => (
  <Sprite start={start} end={end}>
    {({ progress, localTime }) => {
      const buttonT = clamp((progress - 0.4) / 0.25, 0, 1);
      const pulse = 1 + 0.03 * Math.sin(localTime * 6);
      return (
        <div style={{ position: 'absolute', inset: 0, background: VINK, color: VCREAM }}>
          <LogoLockup tone="light" />

          {/* Center headline */}
          <div style={{ position: 'absolute', left: 80, right: 80, top: 420 }}>
            <VMono style={{ color: VGOLD, display: 'block', marginBottom: 28, opacity: clamp(progress / 0.15, 0, 1) }}>
              Showcase your innovation in Dubai
            </VMono>
            <VSerif style={{ fontSize: 156, lineHeight: 0.94, letterSpacing: '-0.025em', display: 'block', color: VCREAM }}>
              <WordReveal progress={clamp(progress / 0.4, 0, 1)} stagger={0.08}>
                Will your{'\n'}organisation be{'\n'}<span style={{ fontStyle: 'italic', color: VGOLD }}>represented{'\n'}in Dubai?</span>
              </WordReveal>
            </VSerif>
          </div>

          {/* CTA pill */}
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1380,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32,
          }}>
            <VSans style={{
              fontSize: 34, color: VCREAM, opacity: 0.82 * clamp((progress - 0.28) / 0.15, 0, 1),
              fontWeight: 400, lineHeight: 1.35, maxWidth: 880, display: 'block',
            }}>
              Register your interest today and explore how your organisation can be represented in Dubai.
            </VSans>

            <div style={{
              padding: '34px 60px', background: VTERRA, color: VCREAM,
              borderRadius: 999, display: 'flex', alignItems: 'center', gap: 22,
              opacity: buttonT,
              transform: `translateY(${(1 - buttonT) * 30}px) scale(${buttonT * pulse})`,
              boxShadow: `0 ${24 * buttonT}px ${60 * buttonT}px rgba(242,92,25,0.45)`,
            }}>
              <VSans style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.01em' }}>
                Register Interest
              </VSans>
              <span style={{ fontSize: 38, fontFamily: '"Space Grotesk", sans-serif' }}>→</span>
            </div>
          </div>

          {/* Bottom rail */}
          <FadeBlock entry={0.5} exit={0.3} style={{
            position: 'absolute', bottom: 80, left: 80, right: 80,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <VMono style={{ color: VCREAM, opacity: 0.55 }}>19–21 October 2026</VMono>
            <VMono style={{ color: VCREAM, opacity: 0.55 }}>Dubai World Trade Centre</VMono>
          </FadeBlock>
        </div>
      );
    }}
  </Sprite>
);

// ─── Optional extra scene for the long cut ─────────────────────────────────
// "Great solutions don't grow by staying invisible." — used as a beat in long cut.
const SceneProblem = ({ start, end }) => (
  <Sprite start={start} end={end}>
    {({ progress }) => (
      <div style={{ position: 'absolute', inset: 0, background: VTERRA, color: VCREAM }}>
        <LogoLockup tone="light" />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0 1px, transparent 1px 22px)' }} />
        <div style={{ position: 'absolute', left: 80, right: 80, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <VSerif style={{ fontSize: 168, lineHeight: 0.96, letterSpacing: '-0.025em', display: 'block' }}>
            <WordReveal progress={clamp((progress - 0.05) / 0.6, 0, 1)} stagger={0.08}>
              Great solutions{'\n'}don't grow{'\n'}internationally{'\n'}<span style={{ fontStyle: 'italic' }}>by staying invisible.</span>
            </WordReveal>
          </VSerif>
        </div>
      </div>
    )}
  </Sprite>
);

const SceneOpportunity = ({ start, end }) => (
  <Sprite start={start} end={end}>
    {({ progress }) => (
      <div style={{ position: 'absolute', inset: 0, background: VCREAM, color: VINK }}>
        <LogoLockup tone="dark" />
        <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {[200, 360, 540, 740, 960, 1200].map((r, i) => {
            const appear = clamp((progress - 0.05 - i * 0.04) / 0.4, 0, 1);
            return (<circle key={i} cx={540} cy={1080} r={r * appear} fill="none" stroke={VTERRA} strokeOpacity={0.16 - i * 0.02} strokeWidth="1.5" />);
          })}
          <circle cx={540} cy={1080} r={10 + 6 * Easing.easeOutBack(clamp(progress / 0.2, 0, 1))} fill={VTERRA} />
        </svg>
        <div style={{ position: 'absolute', left: 80, right: 80, top: 360 }}>
          <VMono style={{ color: VTERRA, display: 'block', marginBottom: 32, opacity: clamp(progress / 0.15, 0, 1) }}>
            The Middle East
          </VMono>
          <VSerif style={{ fontSize: 130, lineHeight: 0.96, letterSpacing: '-0.025em', display: 'block' }}>
            <WordReveal progress={clamp((progress - 0.1) / 0.5, 0, 1)} stagger={0.1}>
              is investing in <span style={{ fontStyle: 'italic', color: VTERRA }}>accessibility,{'\n'}inclusion</span> and{'\n'}healthcare innovation.
            </WordReveal>
          </VSerif>
        </div>
      </div>
    )}
  </Sprite>
);

// ─── Compositions ──────────────────────────────────────────────────────────

const ShortCut = () => (
  <>
    <SceneHook     start={0}    end={4.5}  />
    <SceneExpoInfo start={4.5}  end={10.0} />
    <SceneSectors  start={10.0} end={14.5} />
    <SceneCTA      start={14.5} end={20.0} />
  </>
);

const LongCut = () => (
  <>
    <SceneHook        start={0}    end={5.5}  />
    <SceneOpportunity start={5.5}  end={11.5} />
    <SceneProblem     start={11.5} end={17.5} />
    <SceneExpoInfo    start={17.5} end={25.0} />
    <SceneSectors     start={25.0} end={31.5} />
    <SceneCTA         start={31.5} end={40.0} />
  </>
);

Object.assign(window, {
  ShortCut, LongCut,
  SceneHook, SceneExpoInfo, SceneSectors, SceneCTA,
  SceneProblem, SceneOpportunity, LogoLockup,
  VINK, VCREAM, VGOLD, VTERRA, W, H,
});
