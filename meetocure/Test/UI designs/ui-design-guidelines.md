# UI Design Guidelines for Patient-Doctor Appointment Booking System
## Andhra Pradesh, South India

**Target Audience**: Users with varying IT literacy levels, including elderly and rural populations
**Languages**: Telugu and English
**Platform**: Mobile-first (Android primary), Web responsive
**Version**: 1.0
**Last Updated**: October 8, 2025

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Core Principles for Low IT Literacy Users](#core-principles-for-low-it-literacy-users)
3. [Visual Design Guidelines](#visual-design-guidelines)
4. [Typography Guidelines](#typography-guidelines)
5. [Color Palette](#color-palette)
6. [Layout and Spacing](#layout-and-spacing)
7. [Navigation Patterns](#navigation-patterns)
8. [Component Design Specifications](#component-design-specifications)
9. [Language and Content Guidelines](#language-and-content-guidelines)
10. [Accessibility Requirements](#accessibility-requirements)
11. [Screen-by-Screen Design Examples](#screen-by-screen-design-examples)
12. [Error Handling and Feedback](#error-handling-and-feedback)
13. [Regional Customization](#regional-customization)

---

## 1. Design Philosophy

### Mission Statement
Create a healthcare appointment booking experience that is **simple, trustworthy, and accessible** to all users regardless of their technical skills, age, or language preference.

### User-Centered Approach
- **Simplicity First**: Remove complexity at every step
- **Visual Over Text**: Use icons, images, and visual cues extensively
- **Bilingual by Default**: Telugu and English presented together when space allows
- **Forgiving Design**: Allow easy recovery from errors
- **Immediate Feedback**: Confirm every action visually
- **Trust Building**: Use familiar visual metaphors and government/medical trust indicators

---

## 2. Core Principles for Low IT Literacy Users

### 2.1 Minimize Cognitive Load

**DO:**
- Show one primary action per screen
- Use familiar real-world metaphors (calendar, hospital building, doctor symbols)
- Provide clear visual hierarchies
- Limit choices to 3-5 options on screen
- Use progressive disclosure for advanced options

**DON'T:**
- Use technical jargon or English-only terms
- Present multiple paths forward without clear priority
- Hide important actions in menus or hamburger icons
- Use abstract icons without text labels

### 2.2 Visual Communication Priority

**Hierarchy of Communication:**
1. **Icons/Images** - Universal visual symbols
2. **Telugu Text** - Primary language for many users
3. **English Text** - Secondary or bilingual support
4. **Color Coding** - Red (alert), Green (success), Blue (info)

### 2.3 Touch-Friendly Design

**Mobile Touch Targets:**
- Minimum button size: 48x48 dp (Android) / 44x44 pt (iOS)
- Recommended: 56x56 dp for primary actions
- Spacing between touch targets: Minimum 8dp
- Bottom navigation preferred over top for easy thumb reach

### 2.4 Error Prevention Over Correction

**Design Strategy:**
- Use input constraints (date pickers instead of text entry)
- Provide default selections where appropriate
- Show examples in placeholder text
- Confirm destructive actions
- Validate in real-time with friendly feedback

---

## 3. Visual Design Guidelines

### 3.1 Design Language

**Style**: Clean, modern, medical-friendly with warm human touch

**Visual Characteristics:**
- Rounded corners (8dp radius for cards, 24dp for buttons)
- Soft shadows for depth (elevation 2-4dp)
- Ample white space (don't crowd elements)
- Photographic images of real doctors and hospitals
- Culturally appropriate imagery reflecting Andhra Pradesh diversity

### 3.2 Iconography

**Icon Requirements:**
- **Size**: 24x24 dp (standard), 48x48 dp (feature icons)
- **Style**: Filled (primary actions), Outlined (secondary)
- **Color**: Use color to convey meaning
- **Labels**: ALWAYS include text labels below or beside icons

**Essential Icon Set:**
```
🔍 Search (తెలుసుకోండి / Search)
📍 Location (ప్రాంతం / Location)
🏥 Hospital (ఆసుపత్రి / Hospital)
👨‍⚕️ Doctor (వైద్యుడు / Doctor)
📅 Calendar (క్యాలెండర్ / Calendar)
⏰ Time (సమయం / Time)
✓ Confirmed (నిర్ధారించబడింది / Confirmed)
📞 Phone (ఫోన్ / Phone)
💰 Fee (రుసుము / Fee)
🗣️ Language (భాష / Language)
🎤 Voice (వాయిస్ / Voice)
❤️ Health Card (ఆరోగ్యశ్రీ / Aarogyasri)
```

### 3.3 Photography Guidelines

**Doctor Profile Photos:**
- Professional but approachable expression
- White coat or professional medical attire
- Clear, well-lit headshot
- Consistent aspect ratio: 1:1 (square) or 4:5 (portrait)
- Size: Minimum 300x300 px

**Hospital/Location Images:**
- Recognizable building facades
- Clean, professional environments
- Include signage for identification
- Aspect ratio: 16:9 for hero images, 4:3 for cards

---

## 4. Typography Guidelines

### 4.1 Font Selection

**Telugu Typography:**
- **Primary Font**: Noto Sans Telugu / Pothana2000 / Mallanna
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Priority**: Telugu text should be equal or slightly larger than English

**English Typography:**
- **Primary Font**: Roboto / Open Sans
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Style**: Clean, sans-serif, highly readable

### 4.2 Text Hierarchy

```
H1 (Page Titles)
- Telugu: 24sp, Bold (700), Line height: 32sp
- English: 24sp, Bold (700), Line height: 32sp

H2 (Section Headings)
- Telugu: 20sp, Medium (500), Line height: 28sp
- English: 20sp, Medium (500), Line height: 28sp

H3 (Card Titles)
- Telugu: 18sp, Medium (500), Line height: 24sp
- English: 18sp, Medium (500), Line height: 24sp

Body Text
- Telugu: 16sp, Regular (400), Line height: 24sp
- English: 16sp, Regular (400), Line height: 24sp

Small Text (Labels, Metadata)
- Telugu: 14sp, Regular (400), Line height: 20sp
- English: 14sp, Regular (400), Line height: 20sp

Button Text
- Telugu: 16sp, Medium (500)
- English: 16sp, Medium (500)
```

### 4.3 Bilingual Text Presentation

**Option 1: Stacked (Preferred for critical info)**
```
వైద్యుడు
Doctor
```

**Option 2: Side-by-side (Space permitting)**
```
వైద్యుడు / Doctor
```

**Option 3: Primary language with toggle**
- Show user's preferred language prominently
- Provide language switch icon (🌐) for instant toggle

---

## 5. Color Palette

### 5.1 Primary Colors

**Primary Blue** (Trust, Medical)
- Primary: #0D7FBF (Healthcare blue)
- Light: #4DA8DA
- Dark: #065A87
- Usage: Primary buttons, headers, key actions

**Accent Green** (Success, Health)
- Primary: #2E7D32 (Healthy green)
- Light: #60AD5E
- Dark: #1B5E20
- Usage: Success messages, confirmations, available slots

**Warning Orange** (Attention)
- Primary: #F57C00
- Light: #FF9E40
- Dark: #E65100
- Usage: Important notices, time-sensitive information

**Error Red** (Alert, Critical)
- Primary: #D32F2F
- Light: #EF5350
- Dark: #C62828
- Usage: Errors, critical alerts, unavailable items

### 5.2 Neutral Colors

**Grays** (Text, Backgrounds)
```
Background: #FFFFFF (White)
Surface: #F5F5F5 (Light gray)
Border: #E0E0E0 (Medium gray)
Disabled: #9E9E9E (Gray)
Text Primary: #212121 (Almost black)
Text Secondary: #757575 (Medium gray)
```

### 5.3 Semantic Colors

```
Aarogyasri: #4A148C (Purple) - Government scheme color
Verified: #1B5E20 (Dark green) - Verified doctors/hospitals
Premium: #F57F17 (Amber) - Premium services
Emergency: #B71C1C (Deep red) - Emergency services
```

### 5.4 Color Usage Guidelines

**DO:**
- Use color + icon + text for maximum clarity
- Maintain WCAG AA contrast ratio (4.5:1 for text)
- Test colors with elderly users for visibility

**DON'T:**
- Rely on color alone to convey information
- Use pure red/green for color-blind users without additional indicators

---

## 6. Layout and Spacing

### 6.1 Spacing System (8dp Grid)

```
Space Unit System:
xs: 4dp   (tight spacing within components)
sm: 8dp   (component internal padding)
md: 16dp  (standard spacing between elements)
lg: 24dp  (section spacing)
xl: 32dp  (major section dividers)
xxl: 48dp (page margins)
```

### 6.2 Mobile Layout (Primary Focus)

**Screen Sizes:**
- Small: 360x640 dp (minimum support)
- Medium: 375x667 dp (common)
- Large: 414x896 dp (large phones)

**Safe Zones:**
- Top: 56dp (status bar + header)
- Bottom: 80dp (navigation bar)
- Sides: 16dp (minimum margins)

### 6.3 Card Design

**Standard Doctor Card:**
```
Width: Screen width - 32dp (16dp margins each side)
Padding: 16dp (all sides)
Corner Radius: 8dp
Elevation: 2dp
Margin Bottom: 12dp (between cards)
```

**Card Structure:**
```
┌─────────────────────────────────────┐
│ [Photo]  Dr. Name (Telugu)          │
│ [96x96]  Dr. Name (English)         │
│          Specialty                   │
│          ⭐ 4.5 • 📍 2.3 km         │
│          💰 ₹500                     │
│          ────────────────────────   │
│          [View Profile Button]       │
└─────────────────────────────────────┘
```

---

## 7. Navigation Patterns

### 7.1 Primary Navigation (Bottom Navigation Bar)

**Position**: Fixed at bottom of screen (easy thumb access)

**Navigation Items** (3-4 maximum):
```
┌────────┬────────┬────────┬────────┐
│   🔍   │   📍   │   📅   │   👤   │
│ Search │ Near Me│ Appts  │ Profile│
│తెలుసు │ సమీపంలో│ అపాయింట్│ ప్రొఫైల్ │
└────────┴────────┴────────┴────────┘
```

**Specifications:**
- Height: 56dp
- Icon size: 24dp
- Active state: Primary color with label
- Inactive state: Gray with label
- Always show text labels (no icon-only)

### 7.2 Top App Bar

**Standard Header:**
```
┌─────────────────────────────────────┐
│ [← Back]    Page Title        [🌐]  │
│                                      │
└─────────────────────────────────────┘
```

**Specifications:**
- Height: 56dp
- Title: 20sp, Medium weight
- Back button: Always visible (left arrow)
- Language toggle: Top right
- Elevation: 4dp

### 7.3 Navigation Flows

**Simple Linear Flow** (Minimize back-tracking):
```
Search → Results → Profile → Booking → Confirmation
```

**Always Provide:**
- Clear "Back" button (← icon + "వెనుకకు/Back" text)
- "Home" option from any screen
- Progress indicators for multi-step processes

---

## 8. Component Design Specifications

### 8.1 Buttons

**Primary Button** (Main action)
```
Style: Filled with primary color
Size: Full width or minimum 120dp width
Height: 48dp
Corner Radius: 24dp (pill shape)
Text: 16sp, Medium weight
Icon: Optional, 24dp, left of text
Example: [Book Appointment / అపాయింట్మెంట్ బుక్ చేయండి]
```

**Secondary Button** (Alternative action)
```
Style: Outlined with primary color
Size: Same as primary
Height: 48dp
Border: 2dp solid
Background: Transparent
Text Color: Primary color
Example: [View Profile / ప్రొఫైల్ చూడండి]
```

**Text Button** (Tertiary action)
```
Style: Text only, no background
Minimum touch target: 48x48dp
Text: Primary color, underline on press
Example: "Cancel / రద్దు చేయండి"
```

**Button States:**
- Default: Full color/opacity
- Pressed: Darker shade (-20% brightness)
- Disabled: 38% opacity + gray
- Loading: Show spinner + "Please wait..."

### 8.2 Input Fields

**Text Input:**
```
Height: 56dp
Padding: 16dp horizontal
Border: 1dp solid #E0E0E0
Border (Focus): 2dp solid primary color
Corner Radius: 8dp
Label: Floating label or placeholder
Icon: Optional, left or right, 24dp
```

**Bilingual Labels:**
```
┌─────────────────────────────────────┐
│ పేరు / Name *                       │
│ మీ పూర్తి పేరు ఇవ్వండి              │
└─────────────────────────────────────┘
```

**Input Types with Icons:**
```
📞 Phone Number: [+91 |_____________]
📧 Email: [example@email.com____]
📅 Date: [DD/MM/YYYY] with calendar picker
```

### 8.3 Search Bar

**Design:**
```
┌─────────────────────────────────────┐
│ 🔍 Search symptoms...               │
│    లక్షణాలు వెతకండి...         [🎤]│
└─────────────────────────────────────┘
```

**Specifications:**
- Height: 56dp
- Corner Radius: 28dp (pill shape)
- Background: White with elevation 2dp
- Icon: Search 🔍 (left), Voice 🎤 (right)
- Placeholder: Bilingual, light gray
- Auto-suggestions: Dropdown below search bar

### 8.4 Date & Time Picker

**Calendar View** (Preferred for low literacy):
```
Visual calendar grid with:
- Current month/year prominently displayed
- Available dates: Green circle
- Unavailable dates: Gray, crossed out
- Selected date: Filled primary color circle
- Today: Outlined circle

Navigation:
[← Previous Month] [Month Year] [Next Month →]
```

**Time Slot Selection:**
```
Grid of time chips:
┌──────┬──────┬──────┐
│ 9:00 │10:00 │11:00 │ Morning (ఉదయం)
├──────┼──────┼──────┤
│ 2:00 │ 3:00 │ 4:00 │ Afternoon (మధ్యాహ్నం)
├──────┼──────┼──────┤
│ 6:00 │ 7:00 │ 8:00 │ Evening (సాయంత్రం)
└──────┴──────┴──────┘
```

**Time Slot States:**
- Available: White background, primary border
- Selected: Primary background, white text
- Unavailable: Gray, crossed out, not clickable

### 8.5 Filter Components

**Chip Filters** (Multiple selection):
```
[All] [Telugu ✓] [Aarogyasri ✓] [Under ₹500]
```

**Slider Filter** (Fees, Distance):
```
Distance: [•────────────] 10 km
Fees: [•──────────────] ₹1000
```

**Dropdown Filters:**
```
┌─────────────────────────────────────┐
│ Specialty / ప్రత్యేకత              ▼│
├─────────────────────────────────────┤
│ ☑ Cardiology (గుండె వైద్యం)        │
│ ☐ Dentist (దంత వైద్యుడు)          │
│ ☐ General (సాధారణ వైద్యుడు)        │
└─────────────────────────────────────┘
```

### 8.6 Doctor Card Component

**Detailed Specification:**
```
┌─────────────────────────────────────────┐
│ ┌────┐  డా. రామ మోహన్ రావు          ✓ │ ← Verified badge
│ │    │  Dr. Rama Mohan Rao              │
│ │    │  Cardiologist | గుండె వైద్యం    │
│ └────┘  15 years experience              │
│         ⭐ 4.5 (150 reviews)              │
│         📍 2.3 km • Apollo Hospital      │
│         🗣️ Telugu, English               │
│         💰 ₹500 consultation fee          │
│         ❤️ Aarogyasri Accepted           │
│                                           │
│         ┌──────────────────────┐         │
│         │ View Profile         │         │
│         │ ప్రొఫైల్ చూడండి      │         │
│         └──────────────────────┘         │
└─────────────────────────────────────────┘
```

### 8.7 Status Indicators

**Loading States:**
```
[◐ Loading...] with spinner
[దయచేసి వేచి ఉండండి / Please wait...]
```

**Success Message:**
```
┌─────────────────────────────────────┐
│             ✓                        │
│    అపాయింట్మెంట్ నిర్ధారించబడింది   │
│    Appointment Confirmed             │
│                                      │
│    Ref: AP-2025-123456              │
└─────────────────────────────────────┘
```

**Error Message:**
```
┌─────────────────────────────────────┐
│             ⚠                        │
│    ఏదో తప్పు జరిగింది                │
│    Something went wrong              │
│                                      │
│    Please try again or call support  │
│    సపోర్ట్‌కు కాల్ చేయండి          │
│                                      │
│    [Try Again / మళ్ళీ ప్రయత్నించండి] │
└─────────────────────────────────────┘
```

---

## 9. Language and Content Guidelines

### 9.1 Writing Style

**Principles:**
- Use simple, everyday words
- Keep sentences short (8-12 words)
- Use active voice
- Avoid medical jargon
- Explain technical terms when necessary

**Examples:**

❌ Don't: "Authentication required to proceed"
✅ Do: "Please enter your phone number / ఫోన్ నంబర్ ఇవ్వండి"

❌ Don't: "Invalid credentials"
✅ Do: "Phone number is incorrect / ఫోన్ నంబర్ తప్పు"

❌ Don't: "Fetching available slots"
✅ Do: "Finding available times / సమయాలు వెతుకుతున్నాం"

### 9.2 Telugu Translation Guidelines

**Quality Requirements:**
- Use commonly understood Telugu words
- Avoid literal translations
- Test with native speakers
- Consider regional dialects

**Common Terms:**
```
English → Telugu
Doctor → వైద్యుడు (vaidyudu)
Hospital → ఆసుపత్రి (āsup'atri)
Appointment → అపాయింట్మెంట్ (apāyiṇṭmeṇṭ)
Search → వెతకండి (vetakaṇḍi)
Confirm → నిర్ధారించు (nird'hāriñcu)
Cancel → రద్దు చేయి (raddu cēyi)
Time → సమయం (samayaṁ)
Date → తేదీ (tēdī)
Available → అందుబాటులో (aṁdubāṭulō)
```

### 9.3 Placeholder Text

**Always provide examples:**

```
Phone Number:
Placeholder: "Example: 9876543210 / ఉదాహరణ: 9876543210"

Age:
Placeholder: "Example: 45 years / ఉదాహరణ: 45 సంవత్సరాలు"

Symptoms:
Placeholder: "Example: Fever, Headache / జ్వరం, తలనొప్పి"
```

### 9.4 Help Text and Instructions

**Provide context-sensitive help:**

```
Phone Number field:
ℹ️ "We will send SMS confirmation to this number"
   "ఈ నంబర్‌కు SMS నిర్ధారణ పంపిస్తాం"

Date Selection:
ℹ️ "Select a date within next 30 days"
   "తదుపరి 30 రోజులలో తేదీని ఎంచుకోండి"
```

---

## 10. Accessibility Requirements

### 10.1 Visual Accessibility

**Large Touch Targets:**
- Minimum: 48x48 dp
- Recommended: 56x56 dp for primary actions
- Spacing: 8dp between targets

**Color Contrast:**
- Text on background: 4.5:1 ratio (WCAG AA)
- Large text (18sp+): 3:1 ratio
- Test with color blindness simulators

**Font Sizing:**
- Support system font size settings
- Allow text scaling up to 200%
- Minimum body text: 16sp

### 10.2 Screen Reader Support

**Label Requirements:**
- Every interactive element has contentDescription (Android) / aria-label (Web)
- Images have alt text in Telugu and English
- Status changes announced audibly

**Example:**
```xml
contentDescription="Doctor Rama Mohan Rao, Cardiologist,
4.5 star rating, 2.3 kilometers away,
Consultation fee 500 rupees, View profile button"

contentDescription="వైద్యుడు రామ మోహన్ రావు, గుండె వైద్యం,
4.5 స్టార్ రేటింగ్, 2.3 కిలోమీటర్ల దూరంలో,
కన్సల్టేషన్ రుసుము 500 రూపాయలు, ప్రొఫైల్ చూడండి బటన్"
```

### 10.3 Motor Accessibility

**Gesture Alternatives:**
- No pinch-zoom required (provide zoom buttons)
- No complex gestures (swipes, multi-touch)
- All actions available via simple tap
- Large, well-spaced buttons

### 10.4 Voice Input Support

**Voice Search:**
- Prominent microphone icon
- Clear visual feedback when listening
- Show transcribed text for confirmation
- Easy correction of voice input

---

## 11. Screen-by-Screen Design Examples

### 11.1 Home / Search Screen

**Layout:**
```
┌─────────────────────────────────────────┐
│  [🌐 తెలుగు]               [👤 Profile] │ ← Header
├─────────────────────────────────────────┤
│                                          │
│         [Logo + App Name]                │
│       Doctor Appointment Booking         │
│      డాక్టర్ అపాయింట్మెంట్ బుకింగ్       │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 🔍 Search symptoms...       [🎤] │   │ ← Search bar
│  │    లక్షణాలు వెతకండి...          │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Common symptoms / సాధారణ లక్షణాలు:    │
│                                          │
│  [😷 Fever]    [🤕 Headache]  [🤢 Cold] │ ← Quick chips
│  [జ్వరం]      [తలనొప్పి]    [జలుబు]    │
│                                          │
│  Or search by specialty:                 │
│  లేదా ప్రత్యేకత ద్వారా వెతకండి:        │
│                                          │
│  [❤️ Cardio]  [🦷 Dental]  [👁️ Eye]     │ ← Category chips
│  [గుండె]      [దంతాలు]     [కంటి]      │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │      📍 Find Doctors Near Me     │   │ ← Secondary button
│  │      సమీపంలో వైద్యులను కనుగొనండి│   │
│  └──────────────────────────────────┘   │
│                                          │
├─────────────────────────────────────────┤
│  [🔍]     [📍]     [📅]     [👤]         │ ← Bottom nav
│ Search  Near Me   Appts  Profile         │
└─────────────────────────────────────────┘
```

**Key Features:**
- Large, friendly search bar
- Voice input prominently displayed
- Quick access to common symptoms
- Visual category browsing
- Location-based search option

### 11.2 Search Results Screen

**Layout:**
```
┌─────────────────────────────────────────┐
│ [← Back]   Search Results        [⚙️]   │ ← Filter icon
├─────────────────────────────────────────┤
│  Showing 12 doctors for "Fever"          │
│  "జ్వరం" కోసం 12 వైద్యులు                │
│                                          │
│  [All] [Telugu ✓] [<5km] [Aarogyasri]  │ ← Active filters
│                                          │
│  ┌─────────────────────────────────┐   │
│  │ ┌──┐ డా. రామ మోహన్             ✓ │   │ ← Doctor card
│  │ │  │ Dr. Rama Mohan              │   │
│  │ │  │ General Physician           │   │
│  │ └──┘ ⭐ 4.5 • 📍 2.3 km         │   │
│  │      💰 ₹300 • 🗣️ తెలుగు       │   │
│  │      [View Profile]              │   │
│  └─────────────────────────────────┘   │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │ ┌──┐ డా. లక్ష్మి               ✓ │   │
│  │ │  │ Dr. Lakshmi                 │   │
│  │ │  │ General Physician           │   │
│  │ └──┘ ⭐ 4.7 • 📍 3.8 km         │   │
│  │      💰 ₹400 • 🗣️ తెలుగు       │   │
│  │      ❤️ Aarogyasri              │   │
│  │      [View Profile]              │   │
│  └─────────────────────────────────┘   │
│                                          │
│  [Load More / మరిన్ని చూడండి]         │
│                                          │
└─────────────────────────────────────────┘
```

**Key Features:**
- Clear result count
- Applied filters visible and removable
- Consistent card layout
- Essential info at a glance
- Clear call-to-action buttons

### 11.3 Doctor Profile Screen

**Layout:**
```
┌─────────────────────────────────────────┐
│ [← Back]   Doctor Profile         [❤️]  │ ← Save/favorite
├─────────────────────────────────────────┤
│                                          │
│         ┌─────────────┐                 │
│         │             │        ✓         │ ← Verified badge
│         │   Photo     │                  │
│         │             │                  │
│         └─────────────┘                 │
│                                          │
│      డా. రామ మోహన్ రావు                │
│      Dr. Rama Mohan Rao                  │
│      General Physician • సాధారణ వైద్యం  │
│                                          │
│      ⭐⭐⭐⭐⭐ 4.5 (150 reviews)         │
│      15 years experience                 │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│ 📍 Location / ప్రాంతం:                  │
│    Apollo Hospital, Visakhapatnam        │
│    2.3 km from you                       │
│    [Get Directions / దిశలు పొందండి]    │
│                                          │
│ 💰 Consultation Fee / రుసుము:          │
│    ₹500                                  │
│    ❤️ Aarogyasri Accepted                │
│                                          │
│ 🗣️ Languages / భాషలు:                   │
│    Telugu, English, Hindi                │
│    తెలుగు, ఆంగ్లం, హిందీ                │
│                                          │
│ 📅 Available Times / అందుబాటు సమయాలు:  │
│    Mon-Sat: 9 AM - 5 PM                  │
│    సోమ-శని: ఉదయం 9 - సాయం 5            │
│                                          │
│ 🎓 Qualifications:                       │
│    MBBS, MD (General Medicine)           │
│    Medical Council Registration: 12345   │
│                                          │
│ ℹ️ About:                                │
│    Dr. Rama Mohan has 15 years of        │
│    experience treating fever, cold...    │
│    [Read More]                           │
│                                          │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │ ← Sticky bottom
│  │    Book Appointment              │  │
│  │    అపాయింట్మెంట్ బుక్ చేయండి    │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Key Features:**
- Professional photo prominently displayed
- Verification badge for trust
- All critical info visible
- Clear pricing and insurance info
- Languages clearly stated
- Sticky booking button (always accessible)

### 11.4 Appointment Booking Screen - Date Selection

**Layout:**
```
┌─────────────────────────────────────────┐
│ [← Back]   Book Appointment    [Step 1/3]│
├─────────────────────────────────────────┤
│  Dr. Rama Mohan Rao • Apollo Hospital   │
│                                          │
│  Select Date / తేదీని ఆయ్కోండి:         │
│                                          │
│    [← Oct]  October 2025  [Nov →]       │
│                                          │
│    Sun  Mon  Tue  Wed  Thu  Fri  Sat    │
│    ───────────────────────────────────  │
│          1    2    3    4    5    6     │
│     7  [ 8]  [ 9]  [10]  11   12   13   │ ← Available in green
│    14   15   16   17   18   19   20     │   Unavailable gray
│   [21]  22   23   24   25   26   27     │   Today outlined
│    28   29   30   31                     │   Selected filled
│                                          │
│  Legend:                                 │
│  [•] Available  [○] Today  [X] Unavailable│
│                                          │
│  ┌──────────────────────────────────┐  │
│  │         Next / తదుపరి           │  │ ← Primary button
│  └──────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

### 11.5 Appointment Booking Screen - Time Selection

**Layout:**
```
┌─────────────────────────────────────────┐
│ [← Back]   Book Appointment    [Step 2/3]│
├─────────────────────────────────────────┤
│  Dr. Rama Mohan Rao • Apollo Hospital   │
│  Date: Monday, October 8, 2025          │
│                                          │
│  Select Time / సమయాన్ని ఆయ్కోండి:       │
│                                          │
│  Morning / ఉదయం:                        │
│  ┌──────┬──────┬──────┬──────┐         │
│  │ 9:00 │10:00 │11:00 │12:00 │         │ ← Time slots
│  └──────┴──────┴──────┴──────┘         │   Available: white bg
│                                          │   Selected: blue bg
│  Afternoon / మధ్యాహ్నం:                 │   Booked: gray X
│  ┌──────┬──────┬──────┬──────┐         │
│  │ 2:00 │ 3:00 │ X    │ X    │         │
│  └──────┴──────┴──────┴──────┘         │
│                                          │
│  Evening / సాయంత్రం:                    │
│  ┌──────┬──────┬──────┬──────┐         │
│  │ X    │ X    │ X    │ X    │         │
│  └──────┴──────┴──────┴──────┘         │
│                                          │
│  ℹ️ Typically available next day         │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │         Next / తదుపరి           │  │
│  └──────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

### 11.6 Appointment Booking Screen - Patient Details

**Layout:**
```
┌─────────────────────────────────────────┐
│ [← Back]   Book Appointment    [Step 3/3]│
├─────────────────────────────────────────┤
│  Dr. Rama Mohan Rao • Apollo Hospital   │
│  Oct 8, 2025 • 10:00 AM                 │
│                                          │
│  Patient Details / రోగి వివరాలు:        │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ పేరు / Full Name *              │  │ ← Text input
│  │ మీ పూర్తి పేరు ఇవ్వండి          │  │   with bilingual
│  └──────────────────────────────────┘  │   label
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ 📞 Phone Number *                │  │
│  │ +91 |_____________________       │  │
│  └──────────────────────────────────┘  │
│  ℹ️ SMS confirmation will be sent       │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ 📧 Email (Optional)              │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ Age / వయస్సు *                   │  │
│  │ Example: 45 years                │  │
│  └──────────────────────────────────┘  │
│                                          │
│  Language Preference / భాష:             │
│  ( ) Telugu / తెలుగు  (•) English      │ ← Radio buttons
│                                          │
│  ❤️ Aarogyasri Card (Optional)          │
│  ┌──────────────────────────────────┐  │
│  │ Card Number                      │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ Reason for Visit (Optional)      │  │
│  │ (Helps doctor prepare)           │  │ ← Text area
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │    Confirm Booking               │  │ ← Primary button
│  │    బుకింగ్ నిర్ధారించండి         │  │
│  └──────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

**Key Features:**
- Clear step indicator (3/3)
- Required fields marked with *
- Help text for phone number
- Optional fields clearly labeled
- Example text in placeholders
- Reason for visit helps set expectations

### 11.7 Confirmation Screen

**Layout:**
```
┌─────────────────────────────────────────┐
│        [X Close]                         │
├─────────────────────────────────────────┤
│                                          │
│              ✓                           │ ← Large success icon
│                                          │
│     అపాయింట్మెంట్ నిర్ధారించబడింది      │
│     Appointment Confirmed!               │
│                                          │
│  ────────────────────────────────────   │
│                                          │
│  Booking ID: AP-2025-123456              │
│                                          │
│  👨‍⚕️ Doctor / వైద్యుడు:                 │
│     Dr. Rama Mohan Rao                   │
│     General Physician                    │
│                                          │
│  📅 Date & Time / తేదీ & సమయం:          │
│     Monday, October 8, 2025              │
│     10:00 AM - 10:30 AM (IST)            │
│                                          │
│  📍 Location / ప్రాంతం:                  │
│     Apollo Hospital                      │
│     MG Road, Visakhapatnam               │
│     [Get Directions →]                   │
│                                          │
│  💰 Fee / రుసుము:                       │
│     ₹500 (Pay at hospital)               │
│                                          │
│  📞 Contact / సంప్రదింపు:                │
│     +91 891 123 4567                     │
│     [Call Hospital]                      │
│                                          │
│  ────────────────────────────────────   │
│                                          │
│  ℹ️ What to bring:                       │
│     • Aarogyasri card (if applicable)    │
│     • Previous medical records           │
│     • Valid ID proof                     │
│                                          │
│  ✉️ Confirmation SMS sent to +91 98765  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  📅 Add to Calendar              │  │ ← Secondary button
│  │     క్యాలెండర్‌కు జోడించండి      │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  📱 Share via WhatsApp           │  │ ← Secondary button
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │       Done / పూర్తయింది          │  │ ← Primary button
│  └──────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

**Key Features:**
- Large, clear success indicator
- Booking reference number prominently displayed
- All appointment details in one place
- Quick actions (directions, call, add to calendar)
- What to bring instructions
- SMS confirmation status
- Share options for family members

### 11.8 Error Screen Example

**Layout:**
```
┌─────────────────────────────────────────┐
│ [← Back]   Booking Failed                │
├─────────────────────────────────────────┤
│                                          │
│              ⚠️                          │ ← Warning icon
│                                          │
│         ఏదో తప్పు జరిగింది               │
│         Something went wrong             │
│                                          │
│  ────────────────────────────────────   │
│                                          │
│  The selected time slot is no longer     │
│  available. Another patient may have     │
│  booked it.                              │
│                                          │
│  ఎంచుకున్న సమయం ఇప్పుడు అందుబాటులో లేదు.│
│  మరొక రోగి బుక్ చేసి ఉండవచ్చు.          │
│                                          │
│  What you can do:                        │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  🔄 Try Another Time Slot        │  │ ← Primary action
│  │     మరో సమయం ఎంచుకోండి          │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  🔍 Search Other Doctors         │  │ ← Alternative
│  │     ఇతర వైద్యులను వెతకండి       │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  📞 Call Hospital                │  │ ← Support option
│  │     ఆసుపత్రికి కాల్ చేయండి      │  │
│  └──────────────────────────────────┘  │
│                                          │
│  Need help? / సహాయం కావాలా?            │
│  Call: 1800-XXX-XXXX (Toll Free)        │
│  WhatsApp: +91 98765 43210              │
│                                          │
│  Error Code: ERR_SLOT_UNAVAILABLE        │
│  Reference: AP-ERR-2025-7890             │
│                                          │
└─────────────────────────────────────────┘
```

**Key Features:**
- Clear error explanation (no technical jargon)
- Bilingual error message
- Multiple recovery options
- Support contact information prominently displayed
- Error reference for troubleshooting
- Friendly, helpful tone

---

## 12. Error Handling and Feedback

### 12.1 Error Message Principles

**DO:**
- Explain what happened in simple terms
- Explain why it might have happened
- Provide clear next steps
- Offer multiple recovery options
- Include support contact information
- Use appropriate icon (⚠️, ❌, ℹ️)

**DON'T:**
- Use technical error codes as main message
- Blame the user
- Use alarming language
- Leave users without options
- Hide support contact information

### 12.2 Form Validation

**Inline Validation:**
```
Phone Number Field:
✓ Valid format: Green checkmark + border
❌ Invalid format: Red X + "Please enter 10 digits" below
⏳ Checking: Blue spinner
```

**Real-time Feedback:**
```
As user types phone number:
[+91 987_______]  ⏳ Checking...
[+91 9876543210] ✓ Valid number
[+91 98765]      ❌ 10 digits required (మీకు 10 అంకెలు కావాలి)
```

### 12.3 Loading States

**Button Loading:**
```
Before: [Book Appointment]
During: [◐ Booking... / బుకింగ్...]
After:  [✓ Booked! / బుక్ అయింది!]
```

**Screen Loading:**
```
┌─────────────────────────────────────┐
│                                      │
│            [◐]                       │
│                                      │
│    Loading doctor profiles...        │
│    వైద్యుల ప్రొఫైల్‌లు లోడవుతున్నాయి... │
│                                      │
│    This may take a few seconds       │
│                                      │
└─────────────────────────────────────┘
```

### 12.4 Success Feedback

**Toast Notifications:**
```
┌─────────────────────────────────────┐
│ ✓ Profile saved! / ప్రొఫైల్ సేవ్ అయింది│
└─────────────────────────────────────┘
Duration: 3 seconds
Position: Bottom center
Dismissible: Swipe or auto-dismiss
```

**Confirmation Dialogs:**
```
┌─────────────────────────────────────┐
│  Cancel Appointment?                 │
│  అపాయింట్మెంట్ రద్దు చేయాలా?         │
│                                      │
│  Are you sure you want to cancel?    │
│  మీరు నిజంగా రద్దు చేయాలనుకుంటున్నారా?│
│                                      │
│  [No, Keep It]    [Yes, Cancel]     │
│  [వద్దు]          [అవును, రద్దు చేయి]│
└─────────────────────────────────────┘
```

### 12.5 Network Error Handling

**No Internet Connection:**
```
┌─────────────────────────────────────┐
│              📡❌                     │
│                                      │
│    No Internet Connection            │
│    ఇంటర్నెట్ కనెక్షన్ లేదు           │
│                                      │
│    Please check your:                │
│    • Wi-Fi or mobile data            │
│    • Airplane mode is off            │
│                                      │
│  ┌──────────────────────────────┐  │
│  │  Try Again / మళ్ళీ ప్రయత్నించండి│  │
│  └──────────────────────────────┘  │
│                                      │
│  Or view saved appointments offline  │
└─────────────────────────────────────┘
```

**Slow Connection:**
```
┌─────────────────────────────────────┐
│ ⚠️ Slow connection detected           │
│    నెమ్మదిగా లోడవుతోంది               │
│                                      │
│ [◐] Loading... Please wait           │
│     దయచేసి వేచి ఉండండి               │
│                                      │
│ [Load lighter version]               │
│ [తేలికపాటి వెర్షన్ లోడ్ చేయండి]     │
└─────────────────────────────────────┘
```

---

## 13. Regional Customization

### 13.1 Andhra Pradesh Specific Elements

**Location Display Format:**
```
Apollo Hospital
MG Road, Visakhapatnam
Visakhapatnam District, Andhra Pradesh
2.3 km from your location
```

**District Coverage Indicator:**
```
Available in your district:
✓ Visakhapatnam (12 doctors)
✓ Nearby: Vizianagaram (8 doctors, 45 km away)
```

**Aarogyasri Integration:**
```
Visual Badge:
┌────────────────┐
│ ❤️ AAROGYASRI  │  ← Purple badge
│   ACCEPTED     │
└────────────────┘

Filter Option:
[❤️ Aarogyasri Accepted]  ← Filter chip with heart icon
```

### 13.2 Cultural Considerations

**Festival Dates:**
```
ℹ️ Hospital may have limited hours during Ugadi (April 9)
   ఉగాది సందర్భంగా ఆసుపత్రి పరిమిత సమయాలు ఉండవచ్చు
```

**Respectful Titles:**
```
Always use:
- డా. (Dr.) before doctor names in Telugu
- Avoid first-name-only references
- Include appropriate honorifics (గారు/gāru)
```

**Family-Friendly Messaging:**
```
"Book for yourself or family member"
"మీ కోసం లేదా కుటుంబ సభ్యుల కోసం బుక్ చేయండి"
```

### 13.3 Payment and Currency

**Currency Format:**
```
Always use: ₹500
Not: Rs 500, INR 500, 500 rupees
```

**Payment Methods Display:**
```
Payment accepted at hospital:
💳 Credit/Debit Cards
📱 UPI (GPay, PhonePe, Paytm)
💵 Cash
❤️ Aarogyasri (Free for eligible)
```

### 13.4 Time and Date Format

**Time Format:**
```
Preferred: 10:00 AM
Not: 10:00, 22:00

With period:
Morning / ఉదయం: 6 AM - 12 PM
Afternoon / మధ్యాహ్నం: 12 PM - 5 PM
Evening / సాయంత్రం: 5 PM - 9 PM
```

**Date Format:**
```
Short: 08/10/2025 (DD/MM/YYYY)
Long: Monday, October 8, 2025
Telugu: సోమవారం, అక్టోబర్ 8, 2025
```

### 13.5 Distance and Directions

**Distance Format:**
```
Short: 2.3 km
Long: 2.3 kilometers from your location
Telugu: మీ స్థానం నుండి 2.3 కి.మీ.

Categories:
Very near: < 1 km (చాలా దగ్గర)
Nearby: 1-5 km (సమీపంలో)
Far: 5-20 km (దూరంలో)
Very far: > 20 km (చాలా దూరంలో)
```

**Direction Links:**
```
[📍 Get Directions / దిశలు పొందండి]
Opens: Google Maps with destination pre-filled
```

---

## Appendix A: Component Library Summary

### Essential Components Checklist

✅ **Buttons**
- Primary (filled)
- Secondary (outlined)
- Text button
- Icon button
- Floating action button (FAB)

✅ **Input Fields**
- Text input
- Phone input (with +91 prefix)
- Email input
- Number input
- Text area
- Date picker
- Time picker

✅ **Selection Controls**
- Radio buttons
- Checkboxes
- Dropdown/Select
- Filter chips
- Toggle switch

✅ **Cards**
- Doctor card
- Hospital card
- Appointment card
- Information card

✅ **Navigation**
- Bottom navigation bar
- Top app bar
- Back button
- Tab bar

✅ **Feedback**
- Toast notification
- Alert dialog
- Confirmation dialog
- Loading spinner
- Progress indicator
- Error message
- Success message

✅ **Lists**
- Scrollable list
- Grid view
- Search results list

✅ **Media**
- Profile photo
- Hospital image
- Icon with label

---

## Appendix B: Accessibility Checklist

### Pre-Launch Accessibility Audit

**Visual:**
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Text is readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators visible on all interactive elements

**Motor:**
- [ ] All touch targets minimum 48x48 dp
- [ ] No complex gestures required
- [ ] All functionality available via simple tap
- [ ] Adequate spacing between interactive elements

**Cognitive:**
- [ ] Simple, clear language throughout
- [ ] Consistent navigation patterns
- [ ] Clear error messages with recovery steps
- [ ] One primary action per screen

**Auditory:**
- [ ] Not applicable (no audio-dependent features)
- [ ] Visual alternatives for any audio cues

**Screen Reader:**
- [ ] All images have alt text
- [ ] All buttons have labels
- [ ] Form fields have associated labels
- [ ] Status changes announced

**Testing:**
- [ ] Tested with TalkBack (Android)
- [ ] Tested with elderly users (60+ age)
- [ ] Tested with users of varying literacy levels
- [ ] Tested in low-light conditions
- [ ] Tested on entry-level devices

---

## Appendix C: Bilingual Content Template

### Common UI Strings

```json
{
  "search": {
    "en": "Search",
    "te": "వెతకండి"
  },
  "doctor": {
    "en": "Doctor",
    "te": "వైద్యుడు"
  },
  "hospital": {
    "en": "Hospital",
    "te": "ఆసుపత్రి"
  },
  "appointment": {
    "en": "Appointment",
    "te": "అపాయింట్మెంట్"
  },
  "book_now": {
    "en": "Book Now",
    "te": "ఇప్పుడే బుక్ చేయండి"
  },
  "view_profile": {
    "en": "View Profile",
    "te": "ప్రొఫైల్ చూడండి"
  },
  "confirm": {
    "en": "Confirm",
    "te": "నిర్ధారించండి"
  },
  "cancel": {
    "en": "Cancel",
    "te": "రద్దు చేయండి"
  },
  "back": {
    "en": "Back",
    "te": "వెనుకకు"
  },
  "next": {
    "en": "Next",
    "te": "తదుపరి"
  },
  "done": {
    "en": "Done",
    "te": "పూర్తయింది"
  },
  "loading": {
    "en": "Loading...",
    "te": "లోడవుతోంది..."
  },
  "please_wait": {
    "en": "Please wait",
    "te": "దయచేసి వేచి ఉండండి"
  },
  "error_occurred": {
    "en": "Something went wrong",
    "te": "ఏదో తప్పు జరిగింది"
  },
  "try_again": {
    "en": "Try Again",
    "te": "మళ్ళీ ప్రయత్నించండి"
  },
  "success": {
    "en": "Success!",
    "te": "విజయవంతం!"
  }
}
```

---

## Design Sign-off Checklist

Before finalizing any screen design:

- [ ] Tested with users who have low IT literacy
- [ ] Tested with elderly users (60+ years)
- [ ] Tested in Telugu and English languages
- [ ] Touch targets meet minimum size requirements
- [ ] Color contrast meets accessibility standards
- [ ] Works on small screens (360x640 dp minimum)
- [ ] Works with slow network connections
- [ ] Error states designed and tested
- [ ] Loading states designed and implemented
- [ ] Success confirmations clear and reassuring
- [ ] All text is bilingual or easily switchable
- [ ] Icons have text labels
- [ ] Navigation is simple and consistent
- [ ] Help/support is easily accessible
- [ ] Tested on entry-level Android devices

---

**Document Status**: Complete
**Last Review**: October 8, 2025
**Next Review**: November 8, 2025
**Owner**: UX Design Team
**Approval**: Required from Product, Development, and Regional Stakeholders
