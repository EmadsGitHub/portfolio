# Split-Screen Layout Update

## Overview

Your portfolio now has a **split-screen terminal layout** with:
- **Left side**: All content (scrollable)
- **Right side**: Dynamic image panel (fixed, changes based on scroll position)

## New Features

### 1. **Split-Screen Layout**
- Left column: Content with terminal styling
- Right column: Sticky image panel that shows relevant images as you scroll
- Grid layout (50/50 split on desktop)

### 2. **Dynamic Image Display**
The right panel automatically displays images based on which section is in view:

| Section | Image Displayed |
|---------|----------------|
| Home/Hero | `avatar-image.png` |
| About Me | `uwfeheadshot.png` |
| Skills | `roboticon.png` |
| Experience | `geotab.png` |
| Projects | `trackmythreads.png` |
| Contact | `emailrocket.png` |

### 3. **Removed Elements**
- ❌ Rocket ships (left and right sides)
- ❌ Moon/robot image from hero section  
- ❌ Fancy animations and parallax effects
- ❌ Shooting stars (kept subtle starfield only)

### 4. **Clean Terminal Aesthetic**
- Monospace font (Courier Prime)
- Dark blue background
- Yellow-gold accents
- Terminal command prompts throughout
- Minimalist card designs

## Technical Implementation

### New Files Created
1. **`src/hooks/useImageDisplay.jsx`**
   - Custom React hook
   - Tracks which section is in view using `react-intersection-observer`
   - Returns current image and section refs

2. **Updated `src/App.js`**
   - Split-screen grid layout
   - Left column: Content
   - Right column: Image display

3. **Updated `src/Pages/Home/Homescreen/index.jsx`**
   - Accepts `refs` prop
   - Wraps each section with ref for tracking

## Layout Structure

```
┌─────────────────────────────────────────────┐
│  Navbar (Terminal prompt: > emad@portfolio) │
├──────────────────────┬──────────────────────┤
│                      │                      │
│  Left Column         │  Right Column        │
│  (Content)           │  (Image Display)     │
│  - Scrollable        │  - Sticky/Fixed      │
│  - Full content      │  - Changes on scroll │
│                      │                      │
│  [Hero Section]      │  [avatar-image]      │
│  [About Me]          │  [uwfeheadshot]      │
│  [Skills]            │  [roboticon]         │
│  [Experience]        │  [geotab]            │
│  [Projects]          │  [trackmythreads]    │
│  [Contact Form]      │  [emailrocket]       │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

## Responsive Design

### Desktop (> 1024px)
- Split screen 50/50
- Right panel is sticky
- Smooth image transitions

### Tablet/Mobile (< 1024px)
- Single column layout
- Right panel hidden
- Images appear inline with content

## Section Details

### Hero Section
- Terminal prompt: `$ whoami`
- Your name and title
- About text in bordered card
- Status indicators with bullets

### About Me
- Terminal prompt: `$ whoami`
- Bullet-pointed list of info
- Image shows in right panel (desktop)

### Skills
- Terminal prompt: `$ cat skills.txt`
- Vertical list of skill cards
- Icons at bottom of each card

### Experience
- Terminal prompt: `$ cat experience.log`
- Company cards with achievements
- Skill tags at bottom
- Images show in right panel

### Projects
- Terminal prompt: `$ ls -la projects/`
- Vertical list of project cards
- GitHub button at top
- Technology icons

### Contact
- Terminal prompt: `$ cat contact.txt`
- Quick contact cards (LinkedIn, Twitter, Email)
- Contact form below
- Submit button styled as terminal command

## Color Scheme

- **Background**: Dark blue `oklch(0.15 0.08 250)`
- **Foreground**: Off-white `oklch(0.98 0.01 250)`
- **Accent**: Yellow-gold `oklch(0.88 0.12 95)`
- **Skill Tags**: Cyan `oklch(0.75 0.12 210)`
- **Cards**: Slightly lighter blue `oklch(0.18 0.08 250)`
- **Borders**: Blue-gray `oklch(0.4 0.06 250)`

## Terminal Elements

All sections use terminal-style prompts:
- `$ whoami` - Identity/about sections
- `$ cat filename.txt` - Reading content
- `$ ls -la directory/` - Listing items
- `$ command` - Action buttons

## Files Modified

1. `src/App.css` - Complete rewrite for split-screen layout
2. `src/App.js` - Grid structure with left/right columns
3. `src/hooks/useImageDisplay.jsx` - New hook for image tracking
4. `src/Pages/Home/Homescreen/index.jsx` - Wrapped sections with refs
5. `src/Pages/Home/navbar.jsx` - Simplified navigation
6. `src/Pages/Home/HeroSection.jsx` - Removed rockets and moon

## View Your Portfolio

The development server is running at:
- **Local**: http://localhost:3001
- **Network**: http://192.168.56.1:3001

## Next Steps

1. Open http://localhost:3001 in your browser
2. Scroll through sections and watch the right panel change images
3. Test on mobile (resize browser or use DevTools)
4. Verify all links and forms work correctly



