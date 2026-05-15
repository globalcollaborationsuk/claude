// LinkedIn video ad — 9:16, ~28s long cut + 15s short cut.
// Reuses palette + type from the static creatives in ads.jsx.

const V_INK = '#0E1B2C';
const V_CREAM = '#F2EBDF';
const V_GOLD = '#C9A86B';
const V_GOLD_DEEP = '#B68A3E';
const V_TERRA = '#B8492E';
const V_PAPER = '#F6F1E6';

// ─── Helpers ───────────────────────────────────────────────────────────────

// Fade-in/out helper: returns opacity given local time within sprite.
const fade = (localTime, duration, fadeIn = 0.4, fadeOut = 0.4) => {
  const fi = clamp(localTime / fadeIn, 0, 1);
  const fo = clamp((duration - localTime) / fadeOut, 0, 1);
  return Easing.easeOutCubic(Math.min(fi, fo));
};

// Reveal-from-below text. Translates up while fading.
const Reveal = ({ start, end, x, y, w, align = 'left', children, fadeIn = 0.45, fadeOut = 0.35, slide = 36 }) => (
  <Sprite start={start} end={end}>
    {({ localTime, duration }) => {
      const op = fade(localTime, duration, fadeIn, fadeOut);
      const inT = Easing.easeOutCubic(clamp(localTime / fadeIn, 0, 1));
      const dy = (1 - inT) * slide;
      const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
      return (
        <div style={{
          position: 'absolute', left: x, top: y, width: w,
          transform: `translate(${tx}, ${dy}px)`, opacity: op,
          textAlign: align,
        }}>{children}</div>
      );
    }}
  </Sprite>
);

// Static mono label (no transform — used for footer rails).
const Label = ({ start, end, x, y, color, children, align = 'left', size = 22 }) => (
  <Sprite start={start} end={end}>
    {({ localTime, duration }) => (
      <div style={{
        position: 'absolute', left: x, top: y,
        transform: align === 'center' ? 'translateX(-50%)' : align === 'right' ? 'translateX(-100%)' : 'none',
        opacity: fade(localTime, duration, 0.3, 0.3),
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: size, letterSpacing: '0.16em', textTransform: 'uppercase',
        color, whiteSpace: 'nowrap',
      }}>{children}</div>
    )}
  </Sprite>
);

// Full-bleed background panel for a scene. fades in/out at edges.
const SceneBg = ({ start, end, color, children }) => (
  <Sprite start={start} end={end}>
    {({ localTime, duration }) => (
      <div style={{
        position: 'absolute', inset: 0, background: color,
        opacity: fade(localTime, duration, 0.35, 0.35),
        overflow: 'hidden',
      }}>
        {children}
      </div>
    )}
  </Sprite>
);

// ─── Scene 1 · Hook ─────────────────────────────────────────────────────────
// 0.0 → 4.2  ·  Cream background
// "Your solution could change lives." then "Will the right people see it?"

const Scene1 = () => (
  <>
    <SceneBg start={0} end={4.2} color={V_CREAM}>
      {/* Faint ripple */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[200, 360, 560, 800, 1080, 1400].map((r, i) => (
          <circle key={i} cx="540" cy="960" r={r}
            fill="none" stroke={V_INK} strokeOpacity={0.07 - i * 0.008} strokeWidth="1" />
        ))}
      </svg>
    </SceneBg>

    <Label start={0.3} end={4.1} x={80} y={120} color={V_INK}>
      AccessAbilities Expo · Dubai 2026
    </Label>
    <Label start={0.3} end={4.1} x={1000} y={120} color={V_GOLD_DEEP} align="right">
      UK &amp; Ireland
    </Label>

    {/* Beat 1: "Your solution could change lives." */}
    <Reveal start={0.45} end={2.4} x={80} y={760} w={920}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 132, lineHeight: 0.96,
        letterSpacing: '-0.025em', color: V_INK,
      }}>
        Your solution<br />could change
        <Sprite start={1.0} end={2.4} keepMounted>
          {({ localTime }) => {
            const op = clamp(localTime / 0.5, 0, 1);
            return (
              <span style={{
                color: V_TERRA, fontStyle: 'italic', display: 'inline-block',
                opacity: op, transform: `translateY(${(1 - op) * 14}px)`,
                marginLeft: 22,
              }}>lives.</span>
            );
          }}
        </Sprite>
      </div>
    </Reveal>

    {/* Beat 2: question */}
    <Reveal start={2.55} end={4.2} x={80} y={780} w={920} fadeIn={0.4}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 124, lineHeight: 0.96,
        letterSpacing: '-0.025em', color: V_INK,
      }}>
        Will the right<br />people <span style={{ fontStyle: 'italic', color: V_TERRA }}>see&nbsp;it?</span>
      </div>
    </Reveal>
  </>
);

// ─── Scene 2 · Opportunity ──────────────────────────────────────────────────
// 4.0 → 7.6  ·  Ink, list-reveal of categories the region is investing in.

const Scene2 = () => (
  <>
    <SceneBg start={4.0} end={7.6} color={V_INK}>
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: 'linear-gradient(rgba(242,235,223,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,235,223,1) 1px, transparent 1px)',
        backgroundSize: '90px 90px' }} />
    </SceneBg>

    <Label start={4.3} end={7.5} x={80} y={120} color={V_GOLD}>
      The Middle East
    </Label>
    <Label start={4.3} end={7.5} x={1000} y={120} color="rgba(242,235,223,0.55)" align="right">
      → growing demand
    </Label>

    <Reveal start={4.5} end={7.5} x={80} y={260} w={920} fadeIn={0.35}>
      <div style={{
        fontFamily: '"Space Grotesk", sans-serif', fontSize: 36, color: V_CREAM,
        opacity: 0.75, fontWeight: 400, lineHeight: 1.3,
      }}>
        is investing heavily in
      </div>
    </Reveal>

    {/* Three big words ladder-revealing */}
    {[
      { word: 'Accessibility.', start: 4.85, y: 540 },
      { word: 'Inclusion.', start: 5.55, y: 760 },
      { word: 'Healthcare innovation.', start: 6.25, y: 980, italic: true },
    ].map((row, i) => (
      <Reveal key={i} start={row.start} end={7.5} x={80} y={row.y} w={1000} fadeIn={0.4}>
        <div style={{
          fontFamily: '"Instrument Serif", serif', fontSize: 168, lineHeight: 0.92,
          letterSpacing: '-0.03em', color: V_CREAM,
          fontStyle: row.italic ? 'italic' : 'normal',
        }}>
          <span style={{ color: i === 2 ? V_GOLD : V_CREAM }}>{row.word}</span>
        </div>
      </Reveal>
    ))}

    <Label start={4.5} end={7.5} x={80} y={1820} color="rgba(242,235,223,0.55)">
      19—21 OCT 2026 · Dubai World Trade Centre
    </Label>
  </>
);

// ─── Scene 3 · Problem ──────────────────────────────────────────────────────
// 7.4 → 10.4  ·  Dot grid, one highlighted — invisible-among-many metaphor.

const Scene3 = () => (
  <>
    <SceneBg start={7.4} end={10.4} color={V_CREAM} />

    {/* Dot grid */}
    <Sprite start={7.6} end={10.4}>
      {({ localTime, duration }) => {
        const op = fade(localTime, duration, 0.4, 0.4);
        const ROWS = 9, COLS = 7;
        const dots = [];
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const idx = r * COLS + c;
            const delay = idx * 0.012;
            const localT = clamp((localTime - delay) / 0.5, 0, 1);
            const dotOp = Easing.easeOutCubic(localT) * 0.35;
            const isHero = r === 4 && c === 3;
            const heroPulse = isHero
              ? 0.5 + 0.5 * Math.sin((localTime - 0.6) * Math.PI * 2.4)
              : 0;
            dots.push(
              <circle key={idx}
                cx={140 + c * 130} cy={500 + r * 130}
                r={isHero ? 22 : 9}
                fill={isHero ? V_TERRA : V_INK}
                opacity={isHero ? Math.max(0.55, 0.7 + heroPulse * 0.3) * op : dotOp * op} />
            );
            if (isHero) {
              dots.push(
                <circle key={idx + 'ring'}
                  cx={140 + c * 130} cy={500 + r * 130}
                  r={28 + heroPulse * 18}
                  fill="none" stroke={V_TERRA}
                  strokeOpacity={(0.5 - heroPulse * 0.4) * op} strokeWidth="1.5" />
              );
            }
          }
        }
        return (
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            {dots}
          </svg>
        );
      }}
    </Sprite>

    <Label start={7.7} end={10.3} x={80} y={120} color={V_INK}>
      The problem.
    </Label>

    <Reveal start={7.8} end={10.3} x={80} y={220} w={920} fadeIn={0.4}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 120, lineHeight: 0.96,
        letterSpacing: '-0.025em', color: V_INK,
      }}>
        Great solutions<br />don't grow by<br /><span style={{ fontStyle: 'italic', color: V_TERRA }}>staying invisible.</span>
      </div>
    </Reveal>
  </>
);

// ─── Scene 4 · Solution + date hero ─────────────────────────────────────────
// 10.2 → 15.2  ·  Big "19—21" terracotta on cream.

const Scene4 = () => (
  <>
    <SceneBg start={10.2} end={15.2} color={V_TERRA}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0 1px, transparent 1px 24px)' }} />
    </SceneBg>

    <Label start={10.5} end={15.1} x={80} y={120} color={V_CREAM}>
      AccessAbilities Expo Dubai
    </Label>
    <Label start={10.5} end={15.1} x={1000} y={120} color="rgba(242,235,223,0.7)" align="right">
      19—21 OCT
    </Label>

    {/* Hero date — counter-scale entrance */}
    <Sprite start={10.7} end={15.1}>
      {({ localTime, duration }) => {
        const t = clamp(localTime / 0.7, 0, 1);
        const op = fade(localTime, duration, 0.3, 0.35);
        const s = 0.85 + 0.15 * Easing.easeOutCubic(t);
        return (
          <div style={{
            position: 'absolute', left: 80, top: 380,
            opacity: op, transform: `scale(${s})`, transformOrigin: 'left top',
          }}>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 480,
              lineHeight: 0.82, letterSpacing: '-0.045em', color: V_CREAM,
            }}>19—21</div>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif', fontWeight: 400, fontSize: 116,
              lineHeight: 1, letterSpacing: '-0.02em', color: V_CREAM, marginTop: 12,
            }}>OCT&nbsp;2026</div>
          </div>
        );
      }}
    </Sprite>

    <Reveal start={11.4} end={15.1} x={80} y={1340} w={920} fadeIn={0.4}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 96, lineHeight: 0.98,
        letterSpacing: '-0.025em', color: V_CREAM,
      }}>
        Showcase your innovation<br /><span style={{ fontStyle: 'italic' }}>to the Middle East.</span>
      </div>
    </Reveal>

    <Label start={11.6} end={15.1} x={80} y={1820} color="rgba(242,235,223,0.8)">
      Dubai World Trade Centre
    </Label>
  </>
);

// ─── Scene 5 · Categories ───────────────────────────────────────────────────
// 15.0 → 19.0  ·  Chips ladder-reveal on ink.

const Scene5 = () => {
  const cats = [
    'Healthcare', 'MedTech', 'Mobility', 'Rehabilitation',
    'Assistive Technology', 'Independent Living',
    'Inclusive Education', 'Digital Accessibility',
  ];
  return (
    <>
      <SceneBg start={15.0} end={19.0} color={V_INK} />

      <Label start={15.2} end={18.9} x={80} y={120} color={V_GOLD}>
        Who should exhibit
      </Label>

      <Reveal start={15.3} end={18.9} x={80} y={260} w={920} fadeIn={0.35}>
        <div style={{
          fontFamily: '"Instrument Serif", serif', fontSize: 124, lineHeight: 0.96,
          letterSpacing: '-0.025em', color: V_CREAM,
        }}>
          If your work<br />helps people <span style={{ fontStyle: 'italic', color: V_GOLD }}>live better</span>—
        </div>
      </Reveal>

      {/* Chips */}
      <Sprite start={15.7} end={18.9}>
        {({ localTime, duration }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 920,
            display: 'flex', flexWrap: 'wrap', gap: 16,
          }}>
            {cats.map((c, i) => {
              const delay = 0.07 * i;
              const t = clamp((localTime - delay) / 0.45, 0, 1);
              const op = Easing.easeOutCubic(t) * fade(localTime, duration, 0.0, 0.35);
              const dy = (1 - Easing.easeOutBack(t)) * 24;
              return (
                <div key={c} style={{
                  padding: '20px 28px', border: `1.5px solid ${V_GOLD}`,
                  borderRadius: 999, color: V_CREAM,
                  fontFamily: '"Space Grotesk", sans-serif', fontSize: 30, fontWeight: 500,
                  opacity: op, transform: `translateY(${dy}px)`,
                  background: 'rgba(201,168,107,0.06)',
                }}>{c}</div>
              );
            })}
          </div>
        )}
      </Sprite>

      <Label start={16.5} end={18.9} x={80} y={1820} color="rgba(242,235,223,0.6)">
        Dubai could be your next market.
      </Label>
    </>
  );
};

// ─── Scene 6 · UK&I → Dubai connection ──────────────────────────────────────
// 18.8 → 22.6

const Scene6 = () => (
  <>
    <SceneBg start={18.8} end={22.6} color={V_CREAM} />

    <Label start={19.0} end={22.5} x={80} y={120} color={V_INK}>
      Global Exhibition Dubai
    </Label>
    <Label start={19.0} end={22.5} x={1000} y={120} color={V_GOLD_DEEP} align="right">
      UK &amp; Ireland Pavilion
    </Label>

    {/* Connection diagram */}
    <Sprite start={19.1} end={22.5}>
      {({ localTime, duration }) => {
        const op = fade(localTime, duration, 0.4, 0.35);
        const drawT = clamp((localTime - 0.4) / 1.4, 0, 1);
        const drawn = Easing.easeInOutCubic(drawT);
        // Arc from UK (200, 700) to Dubai (880, 1100)
        const x1 = 200, y1 = 700, x2 = 880, y2 = 1100;
        const cx = (x1 + x2) / 2, cy = 580; // control point above
        const pathLen = 1200; // approximate
        return (
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, opacity: op }}>
            {/* Curve */}
            <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none" stroke={V_TERRA} strokeWidth="3"
              strokeDasharray={pathLen}
              strokeDashoffset={pathLen * (1 - drawn)} />
            {/* Endpoints */}
            <circle cx={x1} cy={y1} r="22" fill={V_INK} />
            <circle cx={x1} cy={y1} r="38" fill="none" stroke={V_INK} strokeOpacity="0.25" />
            {drawn > 0.95 && (
              <>
                <circle cx={x2} cy={y2} r="22" fill={V_TERRA} />
                <circle cx={x2} cy={y2} r="38" fill="none" stroke={V_TERRA} strokeOpacity="0.4" />
              </>
            )}
            {/* Labels */}
            <text x={x1 - 40} y={y1 + 90} fill={V_INK}
              fontFamily='"JetBrains Mono", monospace' fontSize="28"
              letterSpacing="0.14em" style={{ textTransform: 'uppercase' }}>
              UK &amp; Ireland
            </text>
            {drawn > 0.95 && (
              <text x={x2 - 110} y={y2 + 90} fill={V_TERRA}
                fontFamily='"JetBrains Mono", monospace' fontSize="28"
                letterSpacing="0.14em" style={{ textTransform: 'uppercase' }}>
                Dubai · UAE
              </text>
            )}
          </svg>
        );
      }}
    </Sprite>

    <Reveal start={20.9} end={22.5} x={80} y={1380} w={920} fadeIn={0.4}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 88, lineHeight: 0.98,
        letterSpacing: '-0.025em', color: V_INK,
      }}>
        We bring you<br /><span style={{ fontStyle: 'italic', color: V_TERRA }}>to the floor.</span>
      </div>
    </Reveal>

    <Label start={21.4} end={22.5} x={80} y={1820} color="rgba(14,27,44,0.55)">
      Part of Global Collaborations UK Ltd
    </Label>
  </>
);

// ─── Scene 7 · CTA ──────────────────────────────────────────────────────────
// 22.4 → 28.0

const Scene7 = () => (
  <>
    <SceneBg start={22.4} end={28.0} color={V_INK}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[200, 380, 580, 800, 1040].map((r, i) => (
          <circle key={i} cx="540" cy="960" r={r}
            fill="none" stroke={V_GOLD} strokeOpacity={0.12 - i * 0.018} strokeWidth="1" />
        ))}
      </svg>
    </SceneBg>

    <Label start={22.6} end={27.9} x={80} y={120} color={V_GOLD}>
      AccessAbilities Expo · Dubai 2026
    </Label>
    <Label start={22.6} end={27.9} x={1000} y={120} color="rgba(242,235,223,0.55)" align="right">
      19—21 OCT
    </Label>

    <Reveal start={22.8} end={27.9} x={80} y={620} w={920} fadeIn={0.5}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 124, lineHeight: 0.95,
        letterSpacing: '-0.025em', color: V_CREAM,
      }}>
        Will your<br />organisation be<br /><span style={{ fontStyle: 'italic', color: V_GOLD }}>represented?</span>
      </div>
    </Reveal>

    {/* CTA pill — scales in */}
    <Sprite start={24.4} end={27.9}>
      {({ localTime, duration }) => {
        const t = clamp(localTime / 0.6, 0, 1);
        const op = fade(localTime, duration, 0.35, 0.35);
        const s = 0.8 + 0.2 * Easing.easeOutBack(t);
        const pulse = 1 + 0.02 * Math.sin(localTime * Math.PI * 2);
        return (
          <div style={{
            position: 'absolute', left: '50%', top: 1500,
            transform: `translateX(-50%) scale(${s * pulse})`,
            opacity: op,
            padding: '36px 64px',
            background: V_GOLD, borderRadius: 999,
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 48,
            color: V_INK, letterSpacing: '-0.01em',
            boxShadow: '0 24px 60px rgba(201,168,107,0.35)',
            display: 'flex', alignItems: 'center', gap: 20,
            whiteSpace: 'nowrap',
          }}>
            Register Interest
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 36 }}>→</span>
          </div>
        );
      }}
    </Sprite>

    <Label start={25.2} end={27.9} x={540} y={1700} color="rgba(242,235,223,0.7)" align="center">
      globalexhibitiondubai.com
    </Label>
  </>
);

// ─── 15s SHORT CUT ─────────────────────────────────────────────────────────
// Condensed version: hook → expo + date → CTA.

const ShortCut = () => (
  <>
    {/* 0-4: Hook */}
    <SceneBg start={0} end={4.2} color={V_CREAM}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[200, 360, 560, 800, 1080].map((r, i) => (
          <circle key={i} cx="540" cy="960" r={r}
            fill="none" stroke={V_INK} strokeOpacity={0.07 - i * 0.008} strokeWidth="1" />
        ))}
      </svg>
    </SceneBg>
    <Label start={0.3} end={4.1} x={80} y={120} color={V_INK}>
      AccessAbilities Expo · Dubai 2026
    </Label>
    <Reveal start={0.4} end={4.1} x={80} y={680} w={920}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 128, lineHeight: 0.96,
        letterSpacing: '-0.025em', color: V_INK,
      }}>
        Your solution could<br />change <span style={{ fontStyle: 'italic', color: V_TERRA }}>lives.</span>
      </div>
    </Reveal>
    <Reveal start={2.2} end={4.1} x={80} y={1040} w={920} fadeIn={0.45}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 96, lineHeight: 0.98,
        letterSpacing: '-0.025em', color: V_INK, opacity: 0.85,
      }}>
        Will the right<br />people <span style={{ fontStyle: 'italic', color: V_TERRA }}>see&nbsp;it?</span>
      </div>
    </Reveal>

    {/* 4-9: Expo info + huge date */}
    <SceneBg start={4.0} end={9.5} color={V_TERRA}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0 1px, transparent 1px 24px)' }} />
    </SceneBg>
    <Label start={4.3} end={9.4} x={80} y={120} color={V_CREAM}>
      AccessAbilities Expo Dubai
    </Label>
    <Sprite start={4.5} end={9.4}>
      {({ localTime, duration }) => {
        const t = clamp(localTime / 0.7, 0, 1);
        const op = fade(localTime, duration, 0.3, 0.35);
        const s = 0.85 + 0.15 * Easing.easeOutCubic(t);
        return (
          <div style={{
            position: 'absolute', left: 80, top: 420,
            opacity: op, transform: `scale(${s})`, transformOrigin: 'left top',
          }}>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 460,
              lineHeight: 0.82, letterSpacing: '-0.045em', color: V_CREAM,
            }}>19—21</div>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif', fontWeight: 400, fontSize: 100,
              lineHeight: 1, color: V_CREAM, marginTop: 8,
            }}>OCT&nbsp;2026</div>
          </div>
        );
      }}
    </Sprite>
    <Reveal start={5.4} end={9.4} x={80} y={1340} w={920} fadeIn={0.4}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 0.98,
        color: V_CREAM,
      }}>
        Showcase your innovation<br /><span style={{ fontStyle: 'italic' }}>to the Middle East.</span>
      </div>
    </Reveal>
    <Label start={5.8} end={9.4} x={80} y={1820} color="rgba(242,235,223,0.8)">
      Dubai World Trade Centre
    </Label>

    {/* 9-15: CTA */}
    <SceneBg start={9.3} end={15.0} color={V_INK}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[200, 380, 580, 800, 1040].map((r, i) => (
          <circle key={i} cx="540" cy="960" r={r}
            fill="none" stroke={V_GOLD} strokeOpacity={0.12 - i * 0.018} strokeWidth="1" />
        ))}
      </svg>
    </SceneBg>
    <Label start={9.5} end={14.9} x={80} y={120} color={V_GOLD}>
      UK &amp; Ireland exhibitors
    </Label>
    <Reveal start={9.7} end={14.9} x={80} y={620} w={920} fadeIn={0.5}>
      <div style={{
        fontFamily: '"Instrument Serif", serif', fontSize: 120, lineHeight: 0.96,
        letterSpacing: '-0.025em', color: V_CREAM,
      }}>
        Will your<br />organisation be<br /><span style={{ fontStyle: 'italic', color: V_GOLD }}>represented?</span>
      </div>
    </Reveal>
    <Sprite start={11.0} end={14.9}>
      {({ localTime, duration }) => {
        const t = clamp(localTime / 0.6, 0, 1);
        const op = fade(localTime, duration, 0.3, 0.3);
        const s = 0.8 + 0.2 * Easing.easeOutBack(t);
        const pulse = 1 + 0.02 * Math.sin(localTime * Math.PI * 2);
        return (
          <div style={{
            position: 'absolute', left: '50%', top: 1500,
            transform: `translateX(-50%) scale(${s * pulse})`,
            opacity: op,
            padding: '36px 64px',
            background: V_GOLD, borderRadius: 999,
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 48,
            color: V_INK,
            boxShadow: '0 24px 60px rgba(201,168,107,0.35)',
            display: 'flex', alignItems: 'center', gap: 20,
            whiteSpace: 'nowrap',
          }}>
            Register Interest
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 36 }}>→</span>
          </div>
        );
      }}
    </Sprite>
    <Label start={11.8} end={14.9} x={540} y={1700} color="rgba(242,235,223,0.7)" align="center">
      globalexhibitiondubai.com
    </Label>
  </>
);

// ─── Full long-cut composition ─────────────────────────────────────────────

const LongCut = () => (
  <>
    <Scene1 /><Scene2 /><Scene3 /><Scene4 /><Scene5 /><Scene6 /><Scene7 />
  </>
);

Object.assign(window, { LongCut, ShortCut, V_INK, V_CREAM, V_GOLD, V_TERRA });
