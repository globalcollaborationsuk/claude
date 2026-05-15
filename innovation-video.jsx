// Animated portrait video built from the same Innovation ad components.
// 1080×1920 · 16s · sequential reveal of skyline → headline → subhead →
// logo → date/venue → stats → photo Ken-Burns in → CTA pulse.

// Small helpers
const fadeUp = (localTime, entry = 0.6, exit = Infinity, exitDur = 0.4, slide = 30) => {
  const inT = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
  let outT = 0;
  if (exit !== Infinity && localTime > exit) {
    outT = Easing.easeInCubic(clamp((localTime - exit) / exitDur, 0, 1));
  }
  return {
    opacity: inT * (1 - outT),
    transform: `translateY(${(1 - inT) * slide}px)`,
  };
};

// Wraps a child in Sprite + entrance animation
const Beat = ({ start, end, slide = 24, entry = 0.6, children, style }) => (
  <Sprite start={start} end={end}>
    {({ localTime }) => {
      const a = fadeUp(localTime, entry, Infinity, 0.3, slide);
      return (
        <div style={{ ...style, opacity: a.opacity, transform: a.transform,
                      willChange: 'transform, opacity' }}>
          {children}
        </div>
      );
    }}
  </Sprite>
);

// Stroke-draw animation for the Dubai skyline
const AnimatedSkyline = ({ width = 720, start = 0.2 }) => {
  const { time } = useTimeline();
  const t = clamp((time - start) / 1.6, 0, 1);
  const drawn = Easing.easeInOutCubic(t);
  const PATHLEN = 1800;
  return (
    <div style={{ width, opacity: clamp((time - start + 0.1) * 4, 0, 1) }}>
      <svg viewBox="0 0 540 150" width={width} height={width * (150 / 540)}
        style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="vsky-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F9B10A" />
            <stop offset="50%" stopColor="#F25C19" />
            <stop offset="100%" stopColor="#F9B10A" />
          </linearGradient>
        </defs>
        <g stroke="url(#vsky-grad)" strokeWidth="2.4" fill="none"
           strokeLinecap="round" strokeLinejoin="round"
           strokeDasharray={PATHLEN}
           strokeDashoffset={PATHLEN * (1 - drawn)}>
          {/* baseline */}
          <line x1="10" y1="140" x2="530" y2="140" />
          {/* palms left */}
          <path d="M 35 140 L 35 110" />
          <path d="M 35 110 q -10 -6 -16 -2 M 35 110 q 10 -6 16 -2 M 35 108 q -6 -8 -2 -16 M 35 108 q 6 -8 2 -16" />
          <path d="M 60 140 L 60 115" />
          <path d="M 60 115 q -8 -5 -13 -1 M 60 115 q 8 -5 13 -1 M 60 113 q -5 -7 -1 -13 M 60 113 q 5 -7 1 -13" />
          {/* Burj Al Arab */}
          <path d="M 95 140 L 95 75 Q 110 35 125 75 L 125 140" />
          <line x1="95" y1="100" x2="125" y2="100" />
          <line x1="95" y1="118" x2="125" y2="118" />
          {/* rect towers */}
          <path d="M 140 140 L 140 80 L 160 80 L 160 140" />
          <line x1="140" y1="95" x2="160" y2="95" />
          <line x1="140" y1="108" x2="160" y2="108" />
          <line x1="140" y1="121" x2="160" y2="121" />
          <path d="M 175 140 L 175 95 L 200 95 L 200 140" />
          <line x1="175" y1="110" x2="200" y2="110" />
          <line x1="175" y1="124" x2="200" y2="124" />
          {/* Burj Khalifa */}
          <path d="M 240 140 L 248 95 L 264 30 L 272 5 L 280 30 L 296 95 L 304 140" />
          <line x1="248" y1="95" x2="296" y2="95" />
          <line x1="244" y1="115" x2="300" y2="115" />
          <line x1="240" y1="130" x2="304" y2="130" />
          {/* right cluster */}
          <path d="M 318 140 L 318 78 L 340 78 L 340 140" />
          <line x1="318" y1="95" x2="340" y2="95" />
          <line x1="318" y1="110" x2="340" y2="110" />
          <line x1="318" y1="125" x2="340" y2="125" />
          <path d="M 355 140 L 355 65 Q 372 50 389 65 L 389 140" />
          <line x1="355" y1="85" x2="389" y2="85" />
          <line x1="355" y1="105" x2="389" y2="105" />
          <line x1="355" y1="125" x2="389" y2="125" />
          <path d="M 405 140 L 405 90 L 432 90 L 432 140" />
          <line x1="405" y1="106" x2="432" y2="106" />
          <line x1="405" y1="122" x2="432" y2="122" />
          {/* palms right */}
          <path d="M 460 140 L 460 110" />
          <path d="M 460 110 q -8 -5 -13 -1 M 460 110 q 8 -5 13 -1 M 460 108 q -5 -7 -1 -13 M 460 108 q 5 -7 1 -13" />
          <path d="M 490 140 L 490 115" />
          <path d="M 490 115 q -10 -6 -16 -2 M 490 115 q 10 -6 16 -2 M 490 113 q -6 -8 -2 -16 M 490 113 q 6 -8 2 -16" />
        </g>
      </svg>
    </div>
  );
};

// Number that ticks up to its target
const TickingNumber = ({ value, start, dur = 1.2, suffix = '+', style }) => {
  const { time } = useTimeline();
  const t = clamp((time - start) / dur, 0, 1);
  const eased = Easing.easeOutCubic(t);
  // For value like 18000 -> format with comma
  const target = parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
  const current = Math.round(target * eased);
  const formatted = current >= 1000 ? current.toLocaleString() : String(current);
  return <span style={style}>{formatted}{suffix}</span>;
};

// Headline line revealer (stagger per line)
const HeadlineLine = ({ start, text, color, fontSize, line }) => (
  <Sprite start={start} end={Infinity}>
    {({ localTime }) => {
      const a = fadeUp(localTime, 0.45, Infinity, 0.3, 28);
      return (
        <div style={{
          fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
          fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.025em',
          fontSize, color, opacity: a.opacity, transform: a.transform,
          willChange: 'transform, opacity',
        }}>{text}</div>
      );
    }}
  </Sprite>
);

// ─── Composition ────────────────────────────────────────────────────────────

// Now takes layout props (driven by Tweaks) so the user can re-tune the
// vertical position without editing code.
const InnovationVideo = ({
  contentTop = 120,         // y where the skyline starts
  photoHeight = 560,        // pixel height of the bottom photo strip
  photoBottom = 280,        // px lifted up from the artboard bottom
                            //   (=280 keeps the photo entirely inside the 4:5 social-safe zone)
  ctaAnchor = 'photoTop',   // 'inline' | 'photoTop' | 'photoCenter'
  showArc = true,
  contentGapScale = 1.0,    // 0.7–1.3 multiplier on inter-element gaps
} = {}) => {
  const { time } = useTimeline();
  const photoScale = 1.05 + Math.min(1, time / 16) * 0.06;
  const arcT = Easing.easeOutCubic(clamp(time / 1.2, 0, 1));

  const g = (px) => Math.round(px * contentGapScale);

  // Photo Y bounds
  const photoTopY = 1920 - photoBottom - photoHeight;
  const photoBottomY = 1920 - photoBottom;

  // CTA position depends on anchor
  const ctaInline = ctaAnchor === 'inline';

  return (
    <>
      {/* Background base */}
      <div style={{ position: 'absolute', inset: 0, background: '#F5EFE3' }} />

      {/* Top-right gradient arc */}
      {showArc && (
        <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="vpt-arc-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F25C19" />
              <stop offset="100%" stopColor="#F9B10A" />
            </linearGradient>
            <linearGradient id="vpt-arc-2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F9B10A" />
              <stop offset="100%" stopColor="#F25C19" />
            </linearGradient>
            <clipPath id="vpt-arc-clip">
              <rect x={1080 - 1080 * arcT} y="0" width={1080 * arcT} height="500" />
            </clipPath>
          </defs>
          <g clipPath="url(#vpt-arc-clip)">
            <path d="M 1080 0 L 1080 480 Q 740 260 580 0 Z" fill="url(#vpt-arc-1)" opacity="0.92" />
            <path d="M 1080 0 L 1080 380 Q 790 220 680 0 Z" fill="url(#vpt-arc-2)" opacity="0.9" />
          </g>
        </svg>
      )}

      {/* Bottom photo strip — positioned via props so user can re-tune */}
      <Sprite start={9.5} end={Infinity}>
        {({ localTime }) => {
          const op = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
          return (
            <div style={{
              position: 'absolute', left: 0, right: 0,
              top: photoTopY, height: photoHeight,
              overflow: 'hidden', opacity: op,
            }}>
              <img src="assets/expo-photo-tall.jpg" alt=""
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: `scale(${photoScale})`, transformOrigin: 'center',
                }} />
              {/* Top fade for legibility under any CTA overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100,
                background: 'linear-gradient(to bottom, rgba(245,239,227,0.85), rgba(245,239,227,0))' }} />
            </div>
          );
        }}
      </Sprite>

      {/* CONTENT — sits in the upper portion now so the photo isn't cropped. */}
      <div style={{
        position: 'absolute', top: contentTop, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '0 80px',
      }}>

        {/* Skyline */}
        <AnimatedSkyline width={560} start={0.3} />

        {/* Headline */}
        <div style={{ marginTop: g(14), display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center' }}>
          <HeadlineLine start={2.0} text="The Middle East"  color="#2D2D2D" fontSize={86} />
          <HeadlineLine start={2.5} text="Is Ready for"      color="#F25C19" fontSize={86} />
          <HeadlineLine start={3.0} text="Accessibility"     color="#F25C19" fontSize={86} />
          <HeadlineLine start={3.5} text="Innovation"        color="#F9B10A" fontSize={86} />
          <Sprite start={4.1} end={Infinity}>
            {({ localTime }) => {
              const w = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
              return <div style={{
                height: 6, background: '#F25C19', borderRadius: 3,
                width: 130 * w, marginTop: 14,
              }} />;
            }}
          </Sprite>
        </div>

        {/* Subhead */}
        <Beat start={4.6} end={Infinity} style={{ marginTop: g(18), textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            fontSize: 26, lineHeight: 1.42, color: '#4A4A4A', fontWeight: 500,
            maxWidth: 760, margin: '0 auto',
          }}>
            Put your brand in front of buyers, distributors, healthcare leaders and decision-makers.
          </div>
        </Beat>

        {/* Logo */}
        <Beat start={5.6} end={Infinity} style={{ marginTop: g(22) }}>
          <img src="assets/accessabilities-logo.png" alt="AccessAbilities Expo Dubai"
            style={{ height: 100, objectFit: 'contain', display: 'block' }} />
        </Beat>

        {/* Date + venue */}
        <Beat start={6.4} end={Infinity} style={{ marginTop: g(20) }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 22, justifyContent: 'center',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            color: '#2D2D2D', fontSize: 22, fontWeight: 700,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ICalendar size={28} />
              <span>19–21 October 2026</span>
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(45,45,45,0.35)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <IPin size={28} />
              <span>Dubai World Trade Centre</span>
            </div>
          </div>
        </Beat>

        {/* Stats card */}
        <Beat start={7.4} end={Infinity} style={{ marginTop: g(20) }}>
          <div style={{
            width: 820, padding: '18px 28px',
            border: '2px solid #F25C19', borderRadius: 20,
            background: 'rgba(255,255,255,0.85)',
            display: 'flex', alignItems: 'center',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
          }}>
            {[
              { Icon: IPeople, num: '300', label: 'Exhibitors' },
              { Icon: IGlobe,  num: '50',  label: 'Countries' },
              { Icon: IUser,   num: '18000', label: 'Visitors' },
            ].map((s, i, arr) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, justifyContent: 'center' }}>
                  <s.Icon size={36} />
                  <div style={{ lineHeight: 1.0 }}>
                    <div style={{ fontSize: 30, fontWeight: 800, color: '#2D2D2D', letterSpacing: '-0.02em' }}>
                      <TickingNumber value={s.num} start={7.9 + i * 0.15} dur={1.0} />
                    </div>
                    <div style={{ fontSize: 16, color: '#4A4A4A', fontWeight: 500, marginTop: 5 }}>
                      {s.label}
                    </div>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 48, background: 'rgba(45,45,45,0.35)', margin: '0 10px' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Beat>

        {/* CTA inline (if anchor=inline) */}
        {ctaInline && <CtaPill style={{ marginTop: g(24) }} />}
      </div>

      {/* CTA overlay — anchored to photo top or center */}
      {!ctaInline && (
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: ctaAnchor === 'photoCenter'
            ? photoTopY + photoHeight / 2 - 58
            : photoTopY - 58,
          display: 'flex', justifyContent: 'center',
        }}>
          <CtaPill />
        </div>
      )}
    </>
  );
};

// CTA pill extracted so it can be inline or overlay
const CtaPill = ({ style }) => (
  <Sprite start={11.0} end={Infinity}>
    {({ localTime }) => {
      const t = clamp(localTime / 0.6, 0, 1);
      const op = Easing.easeOutCubic(t);
      const slide = (1 - op) * 36;
      const pulse = 1 + 0.022 * Math.sin(Math.max(0, localTime - 0.7) * 6);
      return (
        <div style={{
          ...style,
          transform: `translateY(${slide}px) scale(${pulse})`,
          opacity: op, willChange: 'transform, opacity',
        }}>
          <div style={{
            width: 700, height: 116,
            borderRadius: 58,
            background: 'linear-gradient(90deg, #F25C19 0%, #F25C19 30%, #F88410 65%, #F9B10A 100%)',
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 22,
            boxShadow: '0 18px 40px rgba(242,92,25,0.45)',
          }}>
            <div style={{
              width: 88, height: 88, borderRadius: 44, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <IArrow size={42} color="#F25C19" />
            </div>
            <div style={{
              fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
              fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: '-0.015em',
            }}>
              Book Your Stand
            </div>
          </div>
        </div>
      );
    }}
  </Sprite>
);

Object.assign(window, { InnovationVideo, AnimatedSkyline, CtaPill });
