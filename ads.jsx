// Six 1080×1080 creatives + 1 landscape variant for LinkedIn.
// Each ad is the IMAGE portion of a sponsored post — the LinkedIn chrome
// (profile, headline, description, CTA) wraps it in the InFeed preview below.

const INK = '#0E1B2C';
const CREAM = '#F2EBDF';
const GOLD = '#B68A3E';
const TERRA = '#B8492E';
const PAPER = '#F6F1E6';
const LINE = 'rgba(14,27,44,0.14)';

// ─── Shared building blocks ────────────────────────────────────────────────

const Mono = ({ children, style, ...p }) => (
  <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', ...style }} {...p}>{children}</span>
);

const Serif = ({ children, style, ...p }) => (
  <span style={{ fontFamily: '"Instrument Serif", "Times New Roman", serif', fontWeight: 400, ...style }} {...p}>{children}</span>
);

const Sans = ({ children, style, ...p }) => (
  <span style={{ fontFamily: '"Space Grotesk", "Helvetica Neue", sans-serif', ...style }} {...p}>{children}</span>
);

// Hatched/striped image placeholder.
const ImgSlot = ({ label, w = '100%', h = '100%', tone = 'dark', style }) => {
  const bg = tone === 'dark' ? '#15273e' : '#dccfbb';
  const stripe = tone === 'dark' ? 'rgba(255,255,255,0.045)' : 'rgba(14,27,44,0.06)';
  const fg = tone === 'dark' ? 'rgba(242,235,223,0.75)' : 'rgba(14,27,44,0.55)';
  return (
    <div style={{
      width: w, height: h, background: bg,
      backgroundImage: `repeating-linear-gradient(45deg, ${stripe} 0 1px, transparent 1px 9px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <Mono style={{ color: fg, fontSize: 13 }}>{label}</Mono>
    </div>
  );
};

// Corner marks — four L-shaped registration marks like a print proof.
const Corners = ({ color, inset = 28, size = 14, weight = 1.5 }) => {
  const c = { position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid' };
  return (
    <>
      <div style={{ ...c, top: inset, left: inset, borderWidth: `${weight}px 0 0 ${weight}px` }} />
      <div style={{ ...c, top: inset, right: inset, borderWidth: `${weight}px ${weight}px 0 0` }} />
      <div style={{ ...c, bottom: inset, left: inset, borderWidth: `0 0 ${weight}px ${weight}px` }} />
      <div style={{ ...c, bottom: inset, right: inset, borderWidth: `0 ${weight}px ${weight}px 0` }} />
    </>
  );
};

// ─── V1 · Editorial question (serif-led, cream) ────────────────────────────

const V1 = () => (
  <div style={{ width: 1080, height: 1080, background: CREAM, color: INK, position: 'relative', overflow: 'hidden' }}>
    <Corners color="rgba(14,27,44,0.35)" inset={44} size={20} />

    {/* Top label row */}
    <div style={{ position: 'absolute', top: 66, left: 88, right: 88, display: 'flex', justifyContent: 'space-between' }}>
      <Mono style={{ color: INK }}>AccessAbilities Expo · Dubai 2026</Mono>
      <Mono style={{ color: GOLD }}>UK &amp; Ireland</Mono>
    </div>

    {/* Centerpiece */}
    <div style={{ position: 'absolute', inset: '0 88px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
      <Sans style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', color: INK, opacity: 0.78 }}>
        Your solution could change lives.
      </Sans>
      <Serif style={{ fontSize: 156, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
        Will the right<br />
        people <span style={{ fontStyle: 'italic', color: TERRA }}>see&nbsp;it?</span>
      </Serif>
      <div style={{ height: 1, background: LINE, width: 220, marginTop: 16 }} />
      <Sans style={{ fontSize: 22, fontWeight: 400, color: INK, opacity: 0.7, maxWidth: 720, lineHeight: 1.45 }}>
        Showcase your innovation to buyers, distributors, healthcare providers and regional decision-makers across the Middle East.
      </Sans>
    </div>

    {/* Bottom rail */}
    <div style={{ position: 'absolute', bottom: 66, left: 88, right: 88, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Mono style={{ color: INK, opacity: 0.55 }}>19—21 October 2026</Mono>
        <Mono style={{ color: INK, opacity: 0.55 }}>Dubai World Trade Centre</Mono>
      </div>
      <Mono style={{ color: TERRA }}>Register interest →</Mono>
    </div>
  </div>
);

// ─── V2 · Bold ink hero (sans, deep ink) ────────────────────────────────────

const V2 = () => (
  <div style={{ width: 1080, height: 1080, background: INK, color: CREAM, position: 'relative', overflow: 'hidden' }}>
    {/* Thin grid */}
    <div style={{ position: 'absolute', inset: 0, opacity: 0.08,
      backgroundImage: 'linear-gradient(rgba(242,235,223,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,235,223,1) 1px, transparent 1px)',
      backgroundSize: '90px 90px' }} />

    {/* Top */}
    <div style={{ position: 'absolute', top: 64, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Mono style={{ color: GOLD }}>AccessAbilities Expo</Mono>
      <Mono style={{ color: CREAM, opacity: 0.55 }}>UK &amp; Ireland Pavilion</Mono>
    </div>

    {/* Heavy date block, top-left of stack */}
    <div style={{ position: 'absolute', left: 80, top: 200 }}>
      <Sans style={{ display: 'block', fontSize: 280, fontWeight: 700, lineHeight: 0.85, letterSpacing: '-0.04em', color: CREAM }}>
        DUBAI
      </Sans>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: 4 }}>
        <Sans style={{ fontSize: 280, fontWeight: 300, lineHeight: 0.85, letterSpacing: '-0.04em', color: GOLD }}>
          2026
        </Sans>
        <Serif style={{ fontStyle: 'italic', fontSize: 96, color: CREAM, opacity: 0.85, letterSpacing: '-0.02em' }}>
          see&nbsp;us&nbsp;there.
        </Serif>
      </div>
    </div>

    {/* Description block */}
    <div style={{ position: 'absolute', left: 80, bottom: 200, maxWidth: 720 }}>
      <Sans style={{ fontSize: 28, lineHeight: 1.35, fontWeight: 400, color: CREAM }}>
        Your solution could change lives — but only if the right people see it. Showcase to the Middle East's buyers, providers and regional decision-makers.
      </Sans>
    </div>

    {/* Bottom rail */}
    <div style={{ position: 'absolute', bottom: 64, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Mono style={{ color: CREAM, opacity: 0.65 }}>19—21 OCT · Dubai World Trade Centre</Mono>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', border: `1px solid ${GOLD}`, borderRadius: 999 }}>
        <Mono style={{ color: GOLD }}>Register interest</Mono>
        <span style={{ color: GOLD, fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>→</span>
      </div>
    </div>
  </div>
);

// ─── V3 · Editorial split (image + question) ────────────────────────────────

const V3 = () => (
  <div style={{ width: 1080, height: 1080, background: CREAM, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    {/* Image top */}
    <div style={{ height: 580, position: 'relative' }}>
      <ImgSlot label="expo floor photography · 1080×580" tone="dark" h="100%" />
      {/* Overlay label */}
      <div style={{ position: 'absolute', top: 40, left: 56, right: 56, display: 'flex', justifyContent: 'space-between' }}>
        <Mono style={{ color: CREAM, opacity: 0.85 }}>AccessAbilities Expo Dubai 2026</Mono>
        <Mono style={{ color: GOLD }}>19—21 OCT</Mono>
      </div>
      {/* Bottom-anchored serif on the image */}
      <div style={{ position: 'absolute', bottom: 40, left: 56, right: 56 }}>
        <Serif style={{ fontSize: 88, lineHeight: 0.96, color: CREAM, letterSpacing: '-0.02em' }}>
          Your solution<br />could change <span style={{ fontStyle: 'italic', color: GOLD }}>lives.</span>
        </Serif>
      </div>
    </div>

    {/* Text bottom */}
    <div style={{ flex: 1, padding: '60px 56px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: INK }}>
      <Serif style={{ fontSize: 88, lineHeight: 0.98, letterSpacing: '-0.02em' }}>
        Will the right people <span style={{ fontStyle: 'italic', color: TERRA }}>see it?</span>
      </Serif>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Sans style={{ fontSize: 20, color: INK, opacity: 0.7, maxWidth: 520, lineHeight: 1.45 }}>
            UK &amp; Ireland exhibitor opportunities at Dubai World Trade Centre.
          </Sans>
        </div>
        <div style={{ padding: '14px 22px', background: INK, borderRadius: 999 }}>
          <Mono style={{ color: CREAM }}>Register interest →</Mono>
        </div>
      </div>
    </div>
  </div>
);

// ─── V4 · Concentric circles (reach metaphor) ───────────────────────────────

const V4 = () => (
  <div style={{ width: 1080, height: 1080, background: PAPER, color: INK, position: 'relative', overflow: 'hidden' }}>
    {/* Ripples — concentric circles emanating from right side */}
    <svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="rg" cx="78%" cy="50%" r="80%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.18" />
          <stop offset="60%" stopColor={GOLD} stopOpacity="0.02" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#rg)" />
      {[80, 180, 300, 440, 600, 780, 980, 1200].map((r, i) => (
        <circle key={i} cx={842} cy={540} r={r} fill="none" stroke={INK} strokeOpacity={0.10 - i * 0.008} strokeWidth="1" />
      ))}
      {/* Origin dot */}
      <circle cx={842} cy={540} r={9} fill={TERRA} />
      <circle cx={842} cy={540} r={22} fill="none" stroke={TERRA} strokeOpacity="0.4" />
    </svg>

    {/* Top label */}
    <div style={{ position: 'absolute', top: 66, left: 88, right: 88, display: 'flex', justifyContent: 'space-between' }}>
      <Mono style={{ color: INK }}>AccessAbilities Expo · Dubai 2026</Mono>
      <Mono style={{ color: INK, opacity: 0.55 }}>UK &amp; Ireland</Mono>
    </div>

    {/* Stack of copy on the left */}
    <div style={{ position: 'absolute', left: 88, top: 280, maxWidth: 540 }}>
      <Mono style={{ color: GOLD, display: 'block', marginBottom: 24 }}>One stage. The whole region.</Mono>
      <Serif style={{ fontSize: 124, lineHeight: 0.95, letterSpacing: '-0.025em', color: INK, display: 'block' }}>
        Showcase your <span style={{ fontStyle: 'italic', color: TERRA }}>innovation</span> in Dubai.
      </Serif>
      <Sans style={{ fontSize: 22, lineHeight: 1.45, color: INK, opacity: 0.7, marginTop: 36, display: 'block', maxWidth: 480 }}>
        Reach buyers, distributors, healthcare providers and government bodies across the Middle East — from a single floor at Dubai World Trade Centre.
      </Sans>
    </div>

    {/* Small caption near origin dot */}
    <div style={{ position: 'absolute', right: 88, top: 590, textAlign: 'right' }}>
      <Mono style={{ color: TERRA, display: 'block' }}>You</Mono>
      <Mono style={{ color: INK, opacity: 0.45, display: 'block', marginTop: 4 }}>→ the region</Mono>
    </div>

    {/* Bottom rail */}
    <div style={{ position: 'absolute', bottom: 66, left: 88, right: 88, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Mono style={{ color: INK, opacity: 0.55 }}>19—21 October · Dubai World Trade Centre</Mono>
      <div style={{ padding: '14px 22px', background: INK, borderRadius: 999 }}>
        <Mono style={{ color: CREAM }}>Register interest →</Mono>
      </div>
    </div>
  </div>
);

// ─── V5 · Date-led poster ───────────────────────────────────────────────────

const V5 = () => (
  <div style={{ width: 1080, height: 1080, background: TERRA, color: CREAM, position: 'relative', overflow: 'hidden' }}>
    {/* Diagonal stripes very faint */}
    <div style={{ position: 'absolute', inset: 0, opacity: 0.08,
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0 1px, transparent 1px 22px)' }} />

    {/* Top */}
    <div style={{ position: 'absolute', top: 64, left: 80, right: 80, display: 'flex', justifyContent: 'space-between' }}>
      <Mono style={{ color: CREAM }}>AccessAbilities Expo</Mono>
      <Mono style={{ color: CREAM, opacity: 0.7 }}>UK &amp; Ireland</Mono>
    </div>

    {/* Date as poster */}
    <div style={{ position: 'absolute', left: 80, top: 160, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Sans style={{ fontSize: 460, lineHeight: 0.82, fontWeight: 600, letterSpacing: '-0.045em', color: CREAM }}>
        19—21
      </Sans>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: -8 }}>
        <Sans style={{ fontSize: 96, fontWeight: 400, letterSpacing: '-0.02em', color: CREAM }}>OCT&nbsp;2026</Sans>
        <Mono style={{ color: CREAM, opacity: 0.7 }}>Dubai World Trade Centre</Mono>
      </div>
    </div>

    {/* Headline lower */}
    <div style={{ position: 'absolute', left: 80, bottom: 200, maxWidth: 760 }}>
      <Serif style={{ fontSize: 76, lineHeight: 0.98, letterSpacing: '-0.02em' }}>
        Showcase your innovation to <span style={{ fontStyle: 'italic' }}>the Middle East.</span>
      </Serif>
    </div>

    {/* Bottom rail */}
    <div style={{ position: 'absolute', bottom: 64, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Mono style={{ color: CREAM, opacity: 0.7, maxWidth: 600 }}>UK &amp; Ireland exhibitor opportunities</Mono>
      <div style={{ padding: '14px 22px', background: CREAM, borderRadius: 999 }}>
        <Mono style={{ color: TERRA }}>Register interest →</Mono>
      </div>
    </div>
  </div>
);

// ─── V6 · Quiet/minimal poster ──────────────────────────────────────────────

const V6 = () => (
  <div style={{ width: 1080, height: 1080, background: CREAM, color: INK, position: 'relative', overflow: 'hidden' }}>
    {/* Vertical rule */}
    <div style={{ position: 'absolute', top: 88, bottom: 88, left: 88, width: 1, background: LINE }} />

    {/* Top mark */}
    <div style={{ position: 'absolute', top: 88, left: 120, right: 88, display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Mono style={{ color: INK }}>AccessAbilities Expo Dubai</Mono>
        <Mono style={{ color: INK, opacity: 0.5 }}>Edition 2026</Mono>
      </div>
      <Mono style={{ color: GOLD }}>UK &amp; Ireland Pavilion</Mono>
    </div>

    {/* Centerpiece, generous whitespace */}
    <div style={{ position: 'absolute', left: 120, right: 88, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 56 }}>
      <Serif style={{ fontSize: 168, lineHeight: 0.92, letterSpacing: '-0.028em', maxWidth: 880 }}>
        Showcase your innovation in <span style={{ fontStyle: 'italic', color: GOLD }}>Dubai.</span>
      </Serif>
      <Sans style={{ fontSize: 24, lineHeight: 1.45, color: INK, opacity: 0.7, maxWidth: 620, fontWeight: 400 }}>
        Three days. One floor. Buyers, distributors, healthcare providers and government bodies from across the Middle East — under one roof.
      </Sans>
    </div>

    {/* Bottom */}
    <div style={{ position: 'absolute', bottom: 88, left: 120, right: 88, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', gap: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Mono style={{ color: INK, opacity: 0.45 }}>Dates</Mono>
          <Sans style={{ fontSize: 22, color: INK, fontWeight: 500 }}>19—21 Oct 2026</Sans>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Mono style={{ color: INK, opacity: 0.45 }}>Venue</Mono>
          <Sans style={{ fontSize: 22, color: INK, fontWeight: 500 }}>Dubai World Trade Centre</Sans>
        </div>
      </div>
      <Mono style={{ color: TERRA }}>Register interest →</Mono>
    </div>
  </div>
);

// ─── V7 · Landscape (1200×627) for sponsored content ───────────────────────

const V7 = () => (
  <div style={{ width: 1200, height: 627, background: INK, color: CREAM, position: 'relative', overflow: 'hidden', display: 'flex' }}>
    {/* LEFT: text */}
    <div style={{ flex: '0 0 660px', padding: '52px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Mono style={{ color: GOLD }}>AccessAbilities Expo</Mono>
        <Mono style={{ color: CREAM, opacity: 0.55 }}>UK &amp; Ireland</Mono>
      </div>

      <div>
        <Sans style={{ fontSize: 18, color: CREAM, opacity: 0.7, display: 'block', marginBottom: 16 }}>
          Your solution could change lives.
        </Sans>
        <Serif style={{ fontSize: 84, lineHeight: 0.96, letterSpacing: '-0.025em', display: 'block' }}>
          Will the right people<br /><span style={{ fontStyle: 'italic', color: GOLD }}>see it?</span>
        </Serif>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Mono style={{ color: CREAM, opacity: 0.55 }}>19—21 October 2026</Mono>
          <Mono style={{ color: CREAM, opacity: 0.55 }}>Dubai World Trade Centre</Mono>
        </div>
        <div style={{ padding: '12px 18px', border: `1px solid ${GOLD}`, borderRadius: 999 }}>
          <Mono style={{ color: GOLD }}>Register interest →</Mono>
        </div>
      </div>
    </div>

    {/* RIGHT: image */}
    <div style={{ flex: 1, position: 'relative' }}>
      <ImgSlot label="expo floor / handshake / accessibility tech" tone="dark" h="100%" />
      {/* Gold corner accent */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, borderRight: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}` }} />
    </div>
  </div>
);

// ─── InFeed · LinkedIn post mockup wrapping V1 ─────────────────────────────

const InFeedPreview = ({ creative }) => (
  <div style={{ width: 552, background: '#fff', borderRadius: 8, boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)', fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif', color: 'rgba(0,0,0,0.9)', overflow: 'hidden' }}>
    {/* Profile row */}
    <div style={{ padding: '12px 16px 8px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <div style={{ width: 48, height: 48, borderRadius: 24, background: INK, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
        GE
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Global Exhibition Dubai</span>
          <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: 12 }}>· Promoted</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Part of Global Collaborations UK Ltd</div>
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)', marginTop: 2 }}>Supporting UK &amp; Ireland exhibitors</div>
      </div>
      <button style={{ border: 'none', background: 'transparent', color: 'rgba(0,0,0,0.6)', fontSize: 18, cursor: 'pointer' }}>···</button>
    </div>

    {/* Body copy */}
    <div style={{ padding: '0 16px 12px', fontSize: 14, lineHeight: 1.45, whiteSpace: 'pre-line' }}>
      Your solution could change lives. But only if the right people see it.
      {'\n\n'}
      The Middle East is investing heavily in accessibility, inclusion, healthcare innovation and independent living. <span style={{ color: '#0a66c2' }}>#AccessAbilitiesExpo</span> <span style={{ color: '#0a66c2' }}>#Dubai2026</span>
    </div>

    {/* Creative — scaled to 552 wide */}
    <div style={{ width: 552, height: 552, overflow: 'hidden' }}>
      <div style={{ transform: 'scale(0.5111)', transformOrigin: 'top left' }}>
        {creative}
      </div>
    </div>

    {/* CTA strip */}
    <div style={{ padding: '12px 16px', background: '#eef3f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'rgba(0,0,0,0.9)' }}>Showcase Your Innovation in Dubai</div>
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)', marginTop: 2 }}>AccessAbilities Expo Dubai 2026 · UK &amp; Ireland Exhibitor Opportunities</div>
      </div>
      <button style={{ border: '1px solid #0a66c2', background: '#fff', color: '#0a66c2', fontWeight: 600, fontSize: 14, padding: '6px 16px', borderRadius: 16, cursor: 'pointer', flexShrink: 0, marginLeft: 12 }}>
        Register Interest
      </button>
    </div>

    {/* Reactions */}
    <div style={{ padding: '8px 16px', fontSize: 12, color: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <span>👍 ❤️ 💡  142</span>
      <span>18 comments</span>
    </div>
  </div>
);

Object.assign(window, { V1, V2, V3, V4, V5, V6, V7, InFeedPreview });
