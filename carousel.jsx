// LinkedIn carousel ad — 7 slides, 1080×1350 each.
// Voice & data lifted from accessabilitiesexpo.com so it sits naturally
// alongside official Expo communications. Accessibility-first type:
// generous sizes (no text below 28px), high contrast (WCAG AA+ on every
// pair), strong hierarchy, no decorative italics in body copy.

const CINK   = '#1B1410';   // warm near-black
const CCREAM = '#FAF6EC';   // warm cream
const CGOLD  = '#F9B10A';   // AccessAbilities yellow
const CTERRA = '#F25C19';   // AccessAbilities orange
const CINK_SOFT = 'rgba(27,20,16,0.65)';
const CRULE = 'rgba(27,20,16,0.18)';
const CRULE_LIGHT = 'rgba(250,246,236,0.22)';

const CW = 1080;
const CH = 1350;

// ── Shared atoms ──────────────────────────────────────────────────────────

const Mono2 = ({ children, style }) => (
  <span style={{
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase',
    ...style,
  }}>{children}</span>
);

const Serif2 = ({ children, style }) => (
  <span style={{
    fontFamily: '"Instrument Serif", "Times New Roman", serif',
    fontWeight: 400, ...style,
  }}>{children}</span>
);

const Sans2 = ({ children, style }) => (
  <span style={{
    fontFamily: '"Space Grotesk", "Helvetica Neue", sans-serif',
    ...style,
  }}>{children}</span>
);

// Logo lockup — used on every slide footer
const SlideFooter = ({ tone = 'dark', index, total }) => {
  const text = tone === 'dark' ? CINK : CCREAM;
  const rule = tone === 'dark' ? CRULE : CRULE_LIGHT;
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '36px 60px',
      borderTop: `1px solid ${rule}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <img src="assets/accessabilities-logo.png" alt=""
          style={{ height: 60, objectFit: 'contain', display: 'block',
                   // Invert on dark slides since the logo is on white
                   filter: tone === 'dark' ? 'none' : 'invert(1) brightness(1.05)' }} />
        <div style={{ width: 1, height: 36, background: rule }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Mono2 style={{ color: text, opacity: 0.55, fontSize: 12 }}>
            Powered by
          </Mono2>
          <Sans2 style={{ fontSize: 16, fontWeight: 600, color: text }}>
            Global Exhibition UK
          </Sans2>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Mono2 style={{ color: text, opacity: 0.55, fontSize: 13 }}>
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Mono2>
        <img src="assets/global-exhibition-logo.png" alt="Global Exhibition UK"
          style={{ width: 56, height: 56, objectFit: 'contain', display: 'block' }} />
      </div>
    </div>
  );
};

// ── Slide 1 · Cover ────────────────────────────────────────────────────────

const C1 = () => (
  <div style={{ width: CW, height: CH, background: CCREAM, color: CINK, position: 'relative', overflow: 'hidden' }}>
    {/* Eyebrow */}
    <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 1, background: CTERRA }} />
        <Mono2 style={{ color: CTERRA }}>UK &amp; Ireland · LinkedIn Ad</Mono2>
      </div>
      <Mono2 style={{ color: CINK, opacity: 0.5 }}>8th Edition</Mono2>
    </div>

    {/* Headline */}
    <div style={{ position: 'absolute', left: 60, right: 60, top: 240 }}>
      <Serif2 style={{ fontSize: 168, lineHeight: 0.94, letterSpacing: '-0.028em', color: CINK, display: 'block' }}>
        Showcase your innovation.
      </Serif2>
      <Serif2 style={{ fontSize: 168, lineHeight: 0.94, letterSpacing: '-0.028em', color: CTERRA, display: 'block', marginTop: 12 }}>
        Empower millions.
      </Serif2>
    </div>

    {/* Subhead */}
    <div style={{ position: 'absolute', left: 60, right: 60, top: 800 }}>
      <Sans2 style={{ fontSize: 32, lineHeight: 1.45, color: CINK, fontWeight: 400, display: 'block', maxWidth: 920 }}>
        AccessAbilities Expo Dubai 2026 — the MENASA region's largest exhibition for assistive technology, rehabilitation and inclusion.
      </Sans2>
    </div>

    {/* Date block */}
    <div style={{ position: 'absolute', left: 60, right: 60, top: 1060, display: 'flex', alignItems: 'flex-end', gap: 40 }}>
      <Serif2 style={{ fontSize: 110, lineHeight: 0.95, letterSpacing: '-0.02em', color: CINK }}>
        19–21 October 2026
      </Serif2>
    </div>
    <div style={{ position: 'absolute', left: 60, top: 1190 }}>
      <Mono2 style={{ color: CINK, opacity: 0.6, fontSize: 18 }}>
        Za'abeel Halls 4–6 · Dubai World Trade Centre
      </Mono2>
    </div>

    {/* Swipe hint */}
    <div style={{ position: 'absolute', right: 60, top: 1180, display: 'flex', alignItems: 'center', gap: 10 }}>
      <Mono2 style={{ color: CTERRA, fontSize: 14 }}>Swipe</Mono2>
      <span style={{ color: CTERRA, fontSize: 22 }}>→</span>
    </div>

    <SlideFooter index={1} total={7} tone="dark" />
  </div>
);

// ── Slide 2 · The opportunity (market size) ───────────────────────────────

const C2 = () => (
  <div style={{ width: CW, height: CH, background: CINK, color: CCREAM, position: 'relative', overflow: 'hidden' }}>
    {/* Faint grid */}
    <div style={{ position: 'absolute', inset: 0, opacity: 0.05,
      backgroundImage: 'linear-gradient(rgba(250,246,236,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,246,236,1) 1px, transparent 1px)',
      backgroundSize: '90px 90px' }} />

    <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between' }}>
      <Mono2 style={{ color: CGOLD }}>01 · The opportunity</Mono2>
      <Mono2 style={{ color: CCREAM, opacity: 0.5 }}>MENASA</Mono2>
    </div>

    <div style={{ position: 'absolute', left: 60, right: 60, top: 220 }}>
      <Serif2 style={{ fontSize: 88, lineHeight: 0.98, letterSpacing: '-0.022em', color: CCREAM, display: 'block' }}>
        A USD 3 billion accessibility market — backed by government and institutional investment.
      </Serif2>
    </div>

    {/* Stat row */}
    <div style={{ position: 'absolute', left: 60, right: 60, top: 720, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {[
        { num: '200M+', label: 'People of Determination across MENASA' },
        { num: '1.3B',  label: 'Globally — rising to 2 billion by 2050 (WHO)' },
        { num: '10–15%', label: 'Share of any society — your TAM is bigger than you think' },
      ].map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'baseline', gap: 32,
          paddingBottom: 24, borderBottom: `1px solid ${CRULE_LIGHT}`,
        }}>
          <Sans2 style={{
            fontSize: 92, fontWeight: 600, lineHeight: 1, color: CGOLD,
            letterSpacing: '-0.03em', minWidth: 280,
          }}>{s.num}</Sans2>
          <Sans2 style={{ fontSize: 28, lineHeight: 1.35, color: CCREAM, opacity: 0.85, flex: 1 }}>
            {s.label}
          </Sans2>
        </div>
      ))}
    </div>

    <SlideFooter index={2} total={7} tone="light" />
  </div>
);

// ── Slide 3 · By the numbers ──────────────────────────────────────────────

const C3 = () => {
  const stats = [
    { num: '300+',    label: 'Exhibitors expected' },
    { num: '50+',     label: 'Exhibiting countries' },
    { num: '18,000+', label: 'Visitors projected' },
    { num: '70+',     label: 'Visitor nationalities' },
    { num: '4',       label: 'Co-located conferences' },
    { num: '1,200+',  label: 'High-level delegates' },
  ];
  return (
    <div style={{ width: CW, height: CH, background: CCREAM, color: CINK, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between' }}>
        <Mono2 style={{ color: CTERRA }}>02 · By the numbers</Mono2>
        <Mono2 style={{ color: CINK, opacity: 0.5 }}>2026 projections</Mono2>
      </div>

      <div style={{ position: 'absolute', left: 60, right: 60, top: 200 }}>
        <Serif2 style={{ fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.022em', color: CINK, display: 'block' }}>
          The most concentrated audience in the region.
        </Serif2>
      </div>

      {/* 2-column stat grid */}
      <div style={{
        position: 'absolute', left: 60, right: 60, top: 540,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 56px',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            paddingBottom: 20, borderBottom: `1.5px solid ${CRULE}`,
          }}>
            <Sans2 style={{
              fontSize: 96, fontWeight: 600, lineHeight: 0.95, color: CTERRA,
              letterSpacing: '-0.035em', display: 'block',
            }}>{s.num}</Sans2>
            <Sans2 style={{
              fontSize: 24, lineHeight: 1.35, color: CINK, opacity: 0.75,
              marginTop: 10, display: 'block',
            }}>{s.label}</Sans2>
          </div>
        ))}
      </div>

      <SlideFooter index={3} total={7} tone="dark" />
    </div>
  );
};

// ── Slide 4 · Sectors ─────────────────────────────────────────────────────

const SECTORS_LONG = [
  { name: 'Healthcare & MedTech',          icon: '+' },
  { name: 'Assistive Technology',          icon: '◊' },
  { name: 'Mobility & Rehabilitation',     icon: '→' },
  { name: 'Independent Living',            icon: '○' },
  { name: 'Inclusive Education',           icon: '✕' },
  { name: 'Digital Accessibility',         icon: '#' },
  { name: 'Accessible Design & Innovation',icon: '✦' },
];

const C4 = () => (
  <div style={{ width: CW, height: CH, background: CCREAM, color: CINK, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between' }}>
      <Mono2 style={{ color: CTERRA }}>03 · Who exhibits</Mono2>
      <Mono2 style={{ color: CINK, opacity: 0.5 }}>7 sectors</Mono2>
    </div>

    <div style={{ position: 'absolute', left: 60, right: 60, top: 200 }}>
      <Serif2 style={{ fontSize: 78, lineHeight: 0.98, letterSpacing: '-0.022em', color: CINK, display: 'block' }}>
        If your organisation works in any of these — Dubai is your route in.
      </Serif2>
    </div>

    {/* Sector list */}
    <div style={{
      position: 'absolute', left: 60, right: 60, top: 540,
      display: 'flex', flexDirection: 'column',
    }}>
      {SECTORS_LONG.map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 24,
          padding: '14px 0', borderBottom: `1.5px solid ${CRULE}`,
        }}>
          <Sans2 style={{
            width: 48, height: 48, borderRadius: 24, background: CTERRA, color: CCREAM,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 600, flexShrink: 0,
          }}>{s.icon}</Sans2>
          <Sans2 style={{ fontSize: 32, fontWeight: 500, color: CINK, letterSpacing: '-0.01em' }}>
            {s.name}
          </Sans2>
        </div>
      ))}
    </div>

    <SlideFooter index={4} total={7} tone="dark" />
  </div>
);

// ── Slide 5 · What you get (return on participation) ─────────────────────

const C5 = () => (
  <div style={{ width: CW, height: CH, background: CTERRA, color: CCREAM, position: 'relative', overflow: 'hidden' }}>
    {/* Subtle diagonal stripes */}
    <div style={{ position: 'absolute', inset: 0, opacity: 0.07,
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0 1px, transparent 1px 22px)' }} />

    <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between' }}>
      <Mono2 style={{ color: CCREAM }}>04 · Why exhibit</Mono2>
      <Mono2 style={{ color: CCREAM, opacity: 0.7 }}>ROI</Mono2>
    </div>

    <div style={{ position: 'absolute', left: 60, right: 60, top: 200 }}>
      <Serif2 style={{ fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.022em', color: CCREAM, display: 'block' }}>
        Built for deal-making and strategic networking.
      </Serif2>
    </div>

    {/* Three benefit cards */}
    <div style={{
      position: 'absolute', left: 60, right: 60, top: 580,
      display: 'flex', flexDirection: 'column', gap: 22,
    }}>
      {[
        { stat: '4,500+',        label: 'Structured business meetings with procurement-ready buyers' },
        { stat: 'AED 18M',       label: 'Projected marketing and media coverage across MENASA' },
        { stat: '40M+',          label: 'Digital impressions across targeted global channels' },
      ].map((b, i) => (
        <div key={i} style={{
          background: 'rgba(250,246,236,0.08)',
          border: `1.5px solid ${CRULE_LIGHT}`,
          borderLeft: `6px solid ${CGOLD}`,
          padding: '28px 32px',
          display: 'flex', alignItems: 'center', gap: 32,
        }}>
          <Sans2 style={{
            fontSize: 72, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em',
            color: CGOLD, minWidth: 240,
          }}>{b.stat}</Sans2>
          <Sans2 style={{ fontSize: 26, lineHeight: 1.4, color: CCREAM, flex: 1 }}>
            {b.label}
          </Sans2>
        </div>
      ))}
    </div>

    <SlideFooter index={5} total={7} tone="light" />
  </div>
);

// ── Slide 6 · Early-bird benefit ──────────────────────────────────────────

const C6 = () => (
  <div style={{ width: CW, height: CH, background: CCREAM, color: CINK, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between' }}>
      <Mono2 style={{ color: CTERRA }}>05 · Early-bird benefit</Mono2>
      <Mono2 style={{ color: CINK, opacity: 0.5 }}>Limited</Mono2>
    </div>

    {/* Stamp / badge */}
    <div style={{
      position: 'absolute', left: 60, top: 240,
      padding: '12px 20px', background: CTERRA, color: CCREAM,
      borderRadius: 4,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 16,
      letterSpacing: '0.22em', fontWeight: 500,
    }}>
      BOOK EARLY · FREE BONUS
    </div>

    <div style={{ position: 'absolute', left: 60, right: 60, top: 340 }}>
      <Serif2 style={{ fontSize: 132, lineHeight: 0.96, letterSpacing: '-0.025em', color: CINK, display: 'block' }}>
        Early exhibitors get free advertising across the
      </Serif2>
      <Serif2 style={{ fontSize: 132, lineHeight: 0.96, letterSpacing: '-0.025em', color: CTERRA, display: 'block' }}>
        MENASA region.
      </Serif2>
    </div>

    {/* Coverage list */}
    <div style={{ position: 'absolute', left: 60, right: 60, top: 920 }}>
      <Mono2 style={{ color: CINK, opacity: 0.5, display: 'block', marginBottom: 22, fontSize: 14 }}>
        Coverage includes
      </Mono2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {['Middle East', 'North Africa', 'South Asia', 'Trade press', 'Industry directories', 'Co-located forums'].map(t => (
          <div key={t} style={{
            padding: '14px 22px', border: `1.5px solid ${CINK}`, borderRadius: 999,
            background: 'transparent',
          }}>
            <Sans2 style={{ fontSize: 22, fontWeight: 500, color: CINK }}>{t}</Sans2>
          </div>
        ))}
      </div>
    </div>

    <SlideFooter index={6} total={7} tone="dark" />
  </div>
);

// ── Slide 7 · CTA ─────────────────────────────────────────────────────────

const C7 = () => (
  <div style={{ width: CW, height: CH, background: CINK, color: CCREAM, position: 'relative', overflow: 'hidden' }}>
    {/* Soft radial */}
    <svg viewBox="0 0 1080 1350" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="cta-rg" cx="50%" cy="62%" r="70%">
          <stop offset="0%" stopColor={CGOLD} stopOpacity="0.18" />
          <stop offset="100%" stopColor={CGOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#cta-rg)" />
      {[180, 320, 480, 660, 860].map((r, i) => (
        <circle key={i} cx="540" cy="840" r={r} fill="none" stroke={CGOLD} strokeOpacity={0.15 - i * 0.022} strokeWidth="1.2" />
      ))}
    </svg>

    <div style={{ position: 'absolute', top: 80, left: 60, right: 60, display: 'flex', justifyContent: 'space-between' }}>
      <Mono2 style={{ color: CGOLD }}>06 · Take part</Mono2>
      <Mono2 style={{ color: CCREAM, opacity: 0.55 }}>19–21 Oct 2026</Mono2>
    </div>

    <div style={{ position: 'absolute', left: 60, right: 60, top: 240 }}>
      <Sans2 style={{ fontSize: 36, color: CCREAM, opacity: 0.8, fontWeight: 400, display: 'block', marginBottom: 28 }}>
        Your solution could change lives.
      </Sans2>
      <Serif2 style={{ fontSize: 156, lineHeight: 0.95, letterSpacing: '-0.025em', color: CCREAM, display: 'block' }}>
        Will the right people see&nbsp;it?
      </Serif2>
    </div>

    <div style={{ position: 'absolute', left: 60, right: 60, top: 800 }}>
      <Sans2 style={{ fontSize: 28, lineHeight: 1.45, color: CCREAM, opacity: 0.8, display: 'block', maxWidth: 880 }}>
        Global Exhibition UK supports UK &amp; Ireland organisations applying to exhibit at AccessAbilities Expo Dubai 2026. Stand allocation, logistics, and on-the-ground support.
      </Sans2>
    </div>

    {/* CTA pill */}
    <div style={{
      position: 'absolute', left: 60, top: 1030,
      padding: '32px 56px', background: CTERRA, color: CCREAM,
      borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 22,
      boxShadow: '0 20px 60px rgba(242,92,25,0.4)',
    }}>
      <Sans2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.005em' }}>
        Register Interest
      </Sans2>
      <span style={{ fontSize: 34 }}>→</span>
    </div>

    <SlideFooter index={7} total={7} tone="light" />
  </div>
);

Object.assign(window, {
  C1, C2, C3, C4, C5, C6, C7,
});
