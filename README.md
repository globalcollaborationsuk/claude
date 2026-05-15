# AccessAbilities Expo Dubai 2026 — LinkedIn Video Ad

A fully-responsive, animated LinkedIn video advertisement for AccessAbilities Expo Dubai 2026, built with React and real-time tweakable controls.

## What's Included

- **Innovation Video.html** — Main animated video (1080×1920px, 9:16 LinkedIn format)
- **Innovation Ad.html** — Static square ad (1080×1080px)
- **Carousel Ad.html** — 7-slide carousel format
- **Video Ad.html** — Alternative video treatment

Each file includes:
- **Live playback controls** — Play/pause, seek, frame-by-frame navigation
- **Tweaks panel** — Real-time adjustment of layout, timing, colors, CTA position
- **MP4/WebM export** — Download the animation as a video file

## Using Innovation Video.html

### Quick Start

1. Open `Innovation Video.html` in a modern browser (Chrome, Firefox, Safari, Edge)
2. The animation autoplays in a 1080×1920px preview area
3. Press **Space** to play/pause, use **Arrow keys** to seek
4. Click the **Tweaks button** in the bottom-right corner to adjust parameters

### Tweaks Panel

The tweaks panel allows real-time adjustment:

**Layout**
- Content top (40–400px) — Vertical position of the content stack
- Gap scale (0.6–1.4×) — Spacing multiplier between elements

**Bottom Photo**
- Height (300–780px) — Size of the expo photo at the bottom
- Lift from bottom (0–400px) — Distance from the video's bottom edge

**CTA Position**
- Inline — "Book Your Stand" button sits below the stats card
- Photo top — Button sits at the photo's top edge
- Centred — Button sits at the photo's center

**Decoration**
- Top-right arc (on/off) — Gradient accent swoosh

**Timing**
- Duration (10–24s) — Total animation length

**Export**
- Download as MP4 — Captures the current animation as a video file

### Animation Breakdown

The 20-second video has seven scenes:

1. **0.0–3.5s** — Arc and skyline reveal, headline lines stagger in
2. **3.5–5.5s** — Subheading fades up
3. **5.5–6.5s** — Logo and date/venue reveal
4. **6.5–8.5s** — Stats card appears with number tickers
5. **8.5–11s** — Expo photo fades in from bottom
6. **11–15s** — CTA pill slides up with pulse loop
7. **15–20s** — Holds on CTA, ends clean for social media loop

### Colors & Branding

- **Primary orange** — #F25C19 (AccessAbilities brand)
- **Secondary yellow** — #F9B10A (accent/highlights)
- **Dark ink** — #2D2D2D (headlines, body copy)
- **Cream background** — #F5EFE3 (safe for Instagram/LinkedIn feed crops)

### Fonts

- **Plus Jakarta Sans** — Headlines, body copy, labels (weights: 500, 600, 700, 800)
- **Inter** — Fallback, UI labels (weights: 500, 700, 800, 900)

## Exporting to Video

### MP4 Export (Browser-Based WebM → MP4)

1. Click **Download as MP4** in the tweaks panel
2. The animation plays through and captures frames
3. Saves as `innovation-video-{duration}s.webm` or `.mp4`

**Browser Support:**
- Chrome/Chromium 49+
- Firefox 25+
- Safari 14.1+ (WebM support limited; use MP4 for best compatibility)
- Edge 79+

**Limitations:**
- File size: ~20–40MB for a 20-second video at 1080×1920
- Compression is moderate quality to keep file size manageable
- For professional production work, consider server-side encoding

### Server-Side MP4 Conversion (Production)

For higher quality or MP4 compatibility:

```bash
# Install FFmpeg
brew install ffmpeg  # macOS
# or
apt-get install ffmpeg  # Linux
# or download from https://ffmpeg.org/download.html

# Convert WebM to MP4
ffmpeg -i innovation-video-20s.webm -c:v libx264 -preset medium -crf 23 output.mp4
```

## Component Files

- **animations.jsx** — Core Stage, Sprite, easing, playback controls
- **tweaks-panel.jsx** — Parameter UI (sliders, toggles, radios, etc.)
- **innovation-video.jsx** — Video composition, scenes, timing
- **innovation-ad.jsx** — Reusable ad components (logo, date card, stats, CTA pill)
- **mp4-export.jsx** — Export utility (frame capture, video encoding)

## Customization

### Changing Content

Edit `innovation-video.jsx`:
- Headlines: Lines 220–223
- Subheading: Line 241
- Date/venue: Lines 260–267
- Stats (300+, 50+, 18,000+): Lines 281–300
- CTA text: Line 356

### Adjusting Timing

Edit the `start` props in `InnovationVideo`:
- Line 215 (skyline): `start={0.3}`
- Line 220–223 (headline): `start={2.0}` through `start={3.5}`
- etc.

Each scene starts at a specific time (in seconds). Change the value to shift when elements appear.

### Changing Colors

Edit `innovation-video.jsx`:
- Orange: `#F25C19` → your brand color
- Yellow: `#F9B10A` → your accent
- Text: `#2D2D2D` → your text color

## Performance Notes

- Animation runs at 60fps (locked to display refresh rate)
- Stage auto-scales to fit viewport (never crops content)
- All assets are loaded inline; no external dependencies after page load
- Video export runs at 30fps (optimal balance of quality and file size)

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Animation playback | ✅ | ✅ | ✅ | ✅ |
| Tweaks panel | ✅ | ✅ | ✅ | ✅ |
| Video export (WebM) | ✅ | ✅ | ⚠️ | ✅ |
| Video export (MP4) | ✅ | ⚠️ | ✅ | ✅ |

⚠️ = Partial support; may require codec installation

## File Sizes

- **Innovation Video.html** — ~5 KB
- **animations.jsx** — ~21 KB
- **innovation-video.jsx** — ~16 KB
- **tweaks-panel.jsx** — ~26 KB
- **Assets** (logos, photos) — ~200–500 KB

**Total page load:** ~1–2MB (including all assets and dependencies)

## Troubleshooting

### Animation doesn't play
- Check browser console (F12) for errors
- Verify scripts load: Network tab should show all .jsx files as 200
- Try a different browser

### Video export fails
- Check browser console for error messages
- Ensure Canvas API is supported (all modern browsers)
- Try reducing animation duration (shorter = faster export)
- Use a Chromium-based browser for best compatibility

### Tweaks don't appear
- Click the "Tweaks" label in the bottom-right corner of the stage
- Ensure JavaScript is enabled
- Check if ad blockers are interfering

## License & Attribution

Created with Claude Design and React. Uses:
- React 18.3 (CDN)
- Babel 7.29 (for JSX transpilation)
- Google Fonts (Plus Jakarta Sans, Inter)

---

**For questions or improvements, check the design handoff notes in `/chats/chat1.md`.**
