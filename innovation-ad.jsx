// LinkedIn "Middle East Is Ready for Accessibility Innovation" ads.
// Two formats: 1080×1080 square + 1080×1920 portrait (story/9:16).
// Faithful recreation of the supplied references, rebuilt in editable HTML.

const IINK   = '#2D2D2D';   // headline charcoal
const IORG   = '#F25C19';   // brand orange
const IYEL   = '#F9B10A';   // brand yellow
const IBG    = '#F5EFE3';   // warm cream background
const IGRAY  = '#4A4A4A';   // subtitle gray
const ISOFT  = 'rgba(45,45,45,0.35)';

// ─── Hand-drawn Dubai skyline (SVG) ──────────────────────────────────────
// Yellow→orange gradient stroke. Burj Khalifa in center, supporting towers
// + Burj Al Arab silhouette + palm trees on the flanks.
const DubaiSkyline = ({ width = 540, opacity = 1 }) => (
  <svg viewBox="0 0 540 150" width={width} height={width * (150 / 540)}
    style={{ display: 'block', opacity, overflow: 'visible' }}>
    <defs>
      <linearGradient id="sky-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={IYEL} />
        <stop offset="50%" stopColor={IORG} />
        <stop offset="100%" stopColor={IYEL} />
      </linearGradient>
    </defs>

    {/* Baseline rule */}
    <line x1="10" y1="140" x2="530" y2="140"
      stroke="url(#sky-grad)" strokeWidth="2.5" strokeLinecap="round" />

    {/* Far left palms */}
    <g stroke="url(#sky-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 35 140 L 35 110" />
      <path d="M 35 110 q -10 -6 -16 -2 M 35 110 q 10 -6 16 -2 M 35 108 q -6 -8 -2 -16 M 35 108 q 6 -8 2 -16" />
      <path d="M 60 140 L 60 115" />
      <path d="M 60 115 q -8 -5 -13 -1 M 60 115 q 8 -5 13 -1 M 60 113 q -5 -7 -1 -13 M 60 113 q 5 -7 1 -13" />
    </g>

    {/* Left tower cluster — Burj Al Arab style sail */}
    <g stroke="url(#sky-grad)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 95 140 L 95 75 Q 110 35 125 75 L 125 140" />
      <line x1="95" y1="100" x2="125" y2="100" />
      <line x1="95" y1="118" x2="125" y2="118" />
      {/* Rectangular towers */}
      <path d="M 140 140 L 140 80 L 160 80 L 160 140" />
      <line x1="140" y1="95" x2="160" y2="95" />
      <line x1="140" y1="108" x2="160" y2="108" />
      <line x1="140" y1="121" x2="160" y2="121" />
      <path d="M 175 140 L 175 95 L 200 95 L 200 140" />
      <line x1="175" y1="110" x2="200" y2="110" />
      <line x1="175" y1="124" x2="200" y2="124" />
    </g>

    {/* Burj Khalifa center — needle */}
    <g stroke="url(#sky-grad)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 240 140 L 248 95 L 264 30 L 272 5 L 280 30 L 296 95 L 304 140" />
      <line x1="248" y1="95" x2="296" y2="95" />
      <line x1="244" y1="115" x2="300" y2="115" />
      <line x1="240" y1="130" x2="304" y2="130" />
      {/* Crown detail */}
      <line x1="270" y1="20" x2="274" y2="20" />
    </g>

    {/* Right cluster — twin towers + curved roof */}
    <g stroke="url(#sky-grad)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
    </g>

    {/* Right palms */}
    <g stroke="url(#sky-grad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 460 140 L 460 110" />
      <path d="M 460 110 q -8 -5 -13 -1 M 460 110 q 8 -5 13 -1 M 460 108 q -5 -7 -1 -13 M 460 108 q 5 -7 1 -13" />
      <path d="M 490 140 L 490 115" />
      <path d="M 490 115 q -10 -6 -16 -2 M 490 115 q 10 -6 16 -2 M 490 113 q -6 -8 -2 -16 M 490 113 q 6 -8 2 -16" />
    </g>
  </svg>
);

// ─── Icon set (matches reference visual style) ───────────────────────────

const ICalendar = ({ size = 32, color = IORG }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="3" y="6" width="26" height="22" rx="3" stroke={color} strokeWidth="2.4" />
    <line x1="3" y1="12" x2="29" y2="12" stroke={color} strokeWidth="2.4" />
    <line x1="9" y1="3" x2="9" y2="9" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="23" y1="3" x2="23" y2="9" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <rect x="8" y="16" width="4" height="3" rx="0.5" fill={color} />
    <rect x="14" y="16" width="4" height="3" rx="0.5" fill={color} />
    <rect x="20" y="16" width="4" height="3" rx="0.5" fill={color} />
  </svg>
);
const IPin = ({ size = 32, color = IORG }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 3 C 10 3 6 7 6 13 c 0 7 10 16 10 16 s 10 -9 10 -16 c 0 -6 -4 -10 -10 -10 z"
      stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="16" cy="13" r="3.5" stroke={color} strokeWidth="2.4" />
  </svg>
);
const IPeople = ({ size = 36, color = IORG }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <circle cx="11" cy="11" r="4.5" fill={color} />
    <path d="M 2 28 c 0 -5 4 -8 9 -8 s 9 3 9 8" fill={color} />
    <circle cx="25" cy="13" r="4" fill={color} />
    <path d="M 17 28 c 0 -4 3.5 -7 8 -7 s 8 3 8 7" fill={color} />
  </svg>
);
const IGlobe = ({ size = 36, color = IORG }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="14" stroke={color} strokeWidth="2.6" />
    <ellipse cx="18" cy="18" rx="6" ry="14" stroke={color} strokeWidth="2.6" />
    <line x1="4" y1="18" x2="32" y2="18" stroke={color} strokeWidth="2.6" />
  </svg>
);
const IUser = ({ size = 36, color = IORG }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="11" r="5.5" fill={color} />
    <path d="M 6 31 c 0 -6 5 -10 12 -10 s 12 4 12 10" fill={color} />
  </svg>
);
const IArrow = ({ size = 32, color = IORG }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <line x1="6" y1="16" x2="24" y2="16" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <polyline points="18,9 25,16 18,23" stroke={color} strokeWidth="3.5"
      strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// ─── Shared building blocks ──────────────────────────────────────────────

const HeadlineStack = ({ scale = 1, align = 'left' }) => {
  const s = (px) => Math.round(px * scale);
  return (
    <div style={{
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.025em',
      fontSize: s(96), textAlign: align,
    }}>
      <div style={{ color: IINK }}>The Middle East</div>
      <div style={{ color: IORG }}>Is Ready for</div>
      <div style={{ color: IORG }}>Accessibility</div>
      <div style={{ color: IYEL }}>Innovation</div>
      <div style={{
        width: s(120), height: s(6), background: IORG, borderRadius: 3,
        marginTop: s(20),
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }} />
    </div>
  );
};

const Subhead = ({ scale = 1, maxWidth = 600 }) => (
  <div style={{
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontSize: Math.round(28 * scale), lineHeight: 1.45,
    color: IGRAY, fontWeight: 500, maxWidth, marginTop: Math.round(24 * scale),
  }}>
    Put your brand in front of buyers, distributors, healthcare leaders and decision-makers.
  </div>
);

const ExpoLogo = ({ height = 100 }) => (
  <img src="assets/accessabilities-logo.png" alt="AccessAbilities Expo Dubai"
    style={{ height, objectFit: 'contain', display: 'block' }} />
);

const DateRow = ({ scale = 1, gap = 16 }) => {
  const iconSize = Math.round(28 * scale);
  const fontSize = Math.round(22 * scale);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(20 * scale),
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', color: IINK,
      fontSize, fontWeight: 700 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(10 * scale) }}>
        <ICalendar size={iconSize} />
        <span>19–21 October 2026</span>
      </div>
      <div style={{ width: 1, height: Math.round(22 * scale), background: ISOFT }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(10 * scale) }}>
        <IPin size={iconSize} />
        <span>Dubai World Trade Centre</span>
      </div>
    </div>
  );
};

const StatsCard = ({ scale = 1, width }) => {
  const s = (px) => Math.round(px * scale);
  const stats = [
    { icon: <IPeople size={s(36)} />, num: '300+', label: 'Exhibitors' },
    { icon: <IGlobe size={s(36)} />, num: '50+', label: 'Countries' },
    { icon: <IUser size={s(36)} />, num: '18,000+', label: 'Visitors' },
  ];
  return (
    <div style={{
      width, padding: `${s(20)}px ${s(28)}px`,
      border: `2px solid ${IORG}`, borderRadius: s(16),
      background: 'rgba(255,255,255,0.7)',
      display: 'flex', alignItems: 'center', gap: 0,
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    }}>
      {stats.map((st, i) => (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: s(14), flex: 1, minWidth: 0 }}>
            {st.icon}
            <div style={{ lineHeight: 1.0 }}>
              <div style={{ fontSize: s(28), fontWeight: 800, color: IINK, letterSpacing: '-0.02em' }}>
                {st.num}
              </div>
              <div style={{ fontSize: s(16), color: IGRAY, fontWeight: 500, marginTop: s(4) }}>
                {st.label}
              </div>
            </div>
          </div>
          {i < stats.length - 1 && (
            <div style={{ width: 1, height: s(48), background: ISOFT, margin: `0 ${s(16)}px` }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const BookCTA = ({ scale = 1, width, height }) => {
  const s = (px) => Math.round(px * scale);
  return (
    <div style={{
      width, height: height || s(90),
      borderRadius: s(50),
      background: `linear-gradient(90deg, ${IORG} 0%, ${IORG} 30%, #F88410 65%, ${IYEL} 100%)`,
      display: 'flex', alignItems: 'center', padding: `0 ${s(12)}px 0 ${s(12)}px`, gap: s(20),
      boxShadow: `0 12px 28px rgba(242,92,25,0.35)`,
    }}>
      <div style={{
        width: s(68), height: s(68), borderRadius: s(34),
        background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <IArrow size={s(32)} color={IORG} />
      </div>
      <div style={{
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontSize: s(36), fontWeight: 800, color: '#fff', letterSpacing: '-0.015em',
      }}>
        Book Your Stand
      </div>
    </div>
  );
};

// ─── Square ad — 1080×1080 ───────────────────────────────────────────────

const SquareAd = () => (
  <div style={{
    width: 1080, height: 1080, background: IBG, position: 'relative', overflow: 'hidden',
  }}>
    {/* Right photo with diagonal clip */}
    <div style={{
      position: 'absolute', top: 0, right: 0, width: 560, height: 1080,
      clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
    }}>
      <img src="assets/expo-photo-wide.jpg" alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>

    {/* Orange/yellow gradient stripes accent over the top of the diagonal */}
    <svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        <linearGradient id="sq-strip-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={IORG} />
          <stop offset="100%" stopColor={IORG} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sq-strip-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={IYEL} />
          <stop offset="100%" stopColor={IYEL} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="540,0 600,0 770,500 720,500" fill="url(#sq-strip-1)" opacity="0.95" />
      <polygon points="610,0 670,0 820,470 780,470" fill="url(#sq-strip-2)" opacity="0.95" />
      <polygon points="680,0 740,0 870,440 840,440" fill="url(#sq-strip-1)" opacity="0.6" />
    </svg>

    {/* Left content column */}
    <div style={{ position: 'absolute', top: 56, left: 60, width: 480, bottom: 56,
      display: 'flex', flexDirection: 'column' }}>
      <DubaiSkyline width={380} />
      <div style={{ marginTop: 24 }}>
        <HeadlineStack scale={0.58} />
      </div>
      <div style={{ marginTop: 8, fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        fontSize: 19, lineHeight: 1.4, color: IGRAY, fontWeight: 500, maxWidth: 460 }}>
        Put your brand in front of buyers, distributors, healthcare leaders and decision-makers.
      </div>
      <div style={{ marginTop: 22 }}>
        <ExpoLogo height={78} />
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', color: IINK, fontSize: 17, fontWeight: 700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ICalendar size={22} />
          <span>19–21 October 2026</span>
        </div>
        <div style={{ width: 1, height: 18, background: ISOFT }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IPin size={22} />
          <span>Dubai World Trade Centre</span>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <StatsCard scale={0.82} width={480} />
      </div>
      <div style={{ marginTop: 20 }}>
        <BookCTA scale={0.85} width={440} height={76} />
      </div>
    </div>
  </div>
);

// ─── Portrait ad — 1080×1920 ──────────────────────────────────────────────

const PortraitAd = () => (
  <div style={{
    width: 1080, height: 1920, background: IBG, position: 'relative', overflow: 'hidden',
  }}>
    {/* Top-right swooping arc */}
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        <linearGradient id="pt-arc-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={IORG} />
          <stop offset="100%" stopColor={IYEL} />
        </linearGradient>
        <linearGradient id="pt-arc-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={IYEL} />
          <stop offset="100%" stopColor={IORG} />
        </linearGradient>
      </defs>
      <path d="M 1080 0 L 1080 720 Q 660 360 480 0 Z" fill="url(#pt-arc-1)" opacity="0.96" />
      <path d="M 1080 0 L 1080 580 Q 720 320 600 0 Z" fill="url(#pt-arc-2)" opacity="0.92" />
    </svg>

    {/* Content column */}
    <div style={{ position: 'absolute', top: 100, left: 80, right: 80,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <DubaiSkyline width={620} />
      <div style={{ marginTop: 40 }}>
        <HeadlineStack scale={1.05} />
      </div>
      <Subhead scale={1.1} maxWidth={780} />
      <div style={{ marginTop: 56 }}>
        <ExpoLogo height={132} />
      </div>
      <div style={{ marginTop: 36 }}>
        <DateRow scale={1.15} />
      </div>
      <div style={{ marginTop: 32 }}>
        <StatsCard scale={1.2} width={920} />
      </div>
    </div>

    {/* Bottom photo strip */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 660 }}>
      <img src="assets/expo-photo-tall.jpg" alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>

    {/* CTA pill overlaid on bottom of photo */}
    <div style={{ position: 'absolute', bottom: 90, left: 80, right: 80,
      display: 'flex', justifyContent: 'center' }}>
      <BookCTA scale={1.3} width={780} height={110} />
    </div>
  </div>
);

Object.assign(window, { SquareAd, PortraitAd, DubaiSkyline });
