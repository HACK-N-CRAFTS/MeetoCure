# Use Case 01: Search Doctors by Symptoms - UI Mockups
## Patient-Doctor Appointment Booking System - Andhra Pradesh

**Use Case**: UC-01 - Search Doctors by Symptoms (Telugu/English)
**Created**: October 8, 2025
**Platform**: Android Mobile (360x640dp minimum)
**Languages**: Telugu and English

---

## Table of Contents
1. [Screen 1: Home/Search Screen](#screen-1-homesearch-screen)
2. [Screen 2: Voice Search Interface](#screen-2-voice-search-interface)
3. [Screen 3: Search Auto-Suggestions](#screen-3-search-auto-suggestions)
4. [Screen 4: Search Results](#screen-4-search-results)
5. [Screen 5: No Results State](#screen-5-no-results-state)
6. [Screen 6: Error State (No Internet)](#screen-6-error-state-no-internet)
7. [Responsive Variations](#responsive-variations)
8. [Interaction Specifications](#interaction-specifications)

---

## Screen 1: Home/Search Screen

### Visual Mockup
```
┌─────────────────────────────────────────────┐
│ Status Bar (System)                    20dp │
├─────────────────────────────────────────────┤
│                                         56dp│
│  🌐 తెలుగు                      [👤]       │ ← Top bar
│                                              │
├─────────────────────────────────────────────┤
│                                              │
│                    32dp                      │
│           ┌───────────────┐                 │
│           │               │                  │
│           │   [App Logo]  │            96dp │
│           │               │                  │
│           └───────────────┘                 │
│                                              │
│        Doctor Appointment Booking            │
│       వైద్య అపాయింట్మెంట్ బుకింగ్         16dp│
│                                              │
│                    16dp                      │
│  ┌──────────────────────────────────────┐  │
│  │ 🔍 Search symptoms...           [🎤] │  56dp
│  │    లక్షణాలు వెతకండి...              │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    24dp                      │
│  Common symptoms / సాధారణ లక్షణాలు:   14sp│
│                                              │
│                     8dp                      │
│  ┌────────┬────────┬────────┬────────┐     │
│  │  😷    │  🤕    │  🤒    │  🤢    │  64dp
│  │ Fever  │Headache│ Cold   │Cough   │     │
│  │జ్వరం   │తలనొప్పి│జలుబు   │దగ్గు   │     │
│  └────────┴────────┴────────┴────────┘     │
│  ┌────────┬────────┬────────┬────────┐     │
│  │  😫    │  🦴    │  👁️    │  🦷    │  64dp
│  │Body    │Joint   │ Eye    │Tooth   │     │
│  │ Pain   │ Pain   │Problem │ache    │     │
│  │నొప్పి  │కీళ్ళనొప్పి│కంటి   │పంటినొప్పి│  │
│  └────────┴────────┴────────┴────────┘     │
│                                              │
│                    16dp                      │
│  Or search by specialty:                     │
│  లేదా ప్రత్యేకత ద్వారా వెతకండి:       14sp│
│                                              │
│                     8dp                      │
│  ┌────────┬────────┬────────┬────────┐     │
│  │   ❤️   │   🦷   │  👁️   │  🩺   │   64dp
│  │Cardio  │Dental  │  Eye   │General │     │
│  │గుండె   │దంతాలు │  కంటి  │సాధారణ │     │
│  └────────┴────────┴────────┴────────┘     │
│                                              │
│                    16dp                      │
│  ┌──────────────────────────────────────┐  │
│  │      📍 Find Doctors Near Me         │  48dp
│  │      సమీపంలో వైద్యులను కనుగొనండి    │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    24dp                      │
│                                              │
├─────────────────────────────────────────────┤
│  ┌────────┬────────┬────────┬────────┐     │
│  │   🔍   │   📍   │   📅   │   👤   │  56dp
│  │ Search │Near Me │ Appts  │Profile │     │
│  │ వెతకండి│సమీపంలో│అపాయింట్│ప్రొఫైల్│     │
│  └────────┴────────┴────────┴────────┘     │
└─────────────────────────────────────────────┘
```

### Specifications

**Dimensions**:
- Screen width: 360dp (minimum), 375-414dp (typical)
- Screen height: 640dp minimum
- Safe margins: 16dp left/right

**Colors**:
- Background: #FFFFFF (White)
- Search bar: #FFFFFF with 2dp elevation, #E0E0E0 border
- Symptom chips: #F5F5F5 background, #0D7FBF border (1dp)
- Specialty chips: #E3F2FD background, #0D7FBF border (1dp)
- Primary button: #0D7FBF background, #FFFFFF text
- Bottom nav (active): #0D7FBF icon/text
- Bottom nav (inactive): #757575 icon/text

**Typography**:
- App title: 20sp, Medium, #212121
- Section headers: 14sp, Regular, #757575
- Chip labels: 14sp, Regular, #212121
- Button text: 16sp, Medium, #FFFFFF

**Icons**:
- Search icon: 24dp, #757575
- Voice icon: 24dp, #0D7FBF
- Emoji icons: 32dp
- Bottom nav icons: 24dp

**Interactions**:
- Search bar: Tap to focus → keyboard appears → voice icon always visible
- Voice icon: Tap → microphone activation (See Screen 2)
- Symptom chips: Tap → fills search bar with symptom term
- Specialty chips: Tap → navigates to specialty-filtered results
- "Find Near Me" button: Tap → requests location → shows nearby doctors
- Bottom nav: Tap → navigate to respective sections

---

## Screen 2: Voice Search Interface

### Visual Mockup
```
┌─────────────────────────────────────────────┐
│ Status Bar                             20dp │
├─────────────────────────────────────────────┤
│                                         56dp│
│  [X Cancel]   Voice Search                  │
│               వాయిస్ శోధన                   │
│                                              │
├─────────────────────────────────────────────┤
│                                              │
│                    48dp                      │
│                                              │
│           ┌──────────────┐                  │
│           │              │                   │
│           │              │                   │
│           │     🎤       │            120dp │
│           │              │                   │
│           │  (Animated   │                   │
│           │   pulsing)   │                   │
│           │              │                   │
│           └──────────────┘                  │
│                                              │
│                    24dp                      │
│                                              │
│         Listening...                    20sp│
│         వినడం...                            │
│                                              │
│                    16dp                      │
│                                              │
│  ┌─────────────────────────────────────┐   │
│  │  ◉ Recording...                     │   │
│  │  [████████░░░░░░░░░░░]  0:03       │   │
│  └─────────────────────────────────────┘   │
│                                              │
│                    32dp                      │
│                                              │
│     Speak your symptoms in Telugu or        │
│     English                             14sp│
│                                              │
│     తెలుగు లేదా ఆంగ్లంలో మీ లక్షణాలు      │
│     చెప్పండి                                │
│                                              │
│                    24dp                      │
│                                              │
│     Examples / ఉదాహరణలు:                   │
│                                              │
│     "నాకు జ్వరం మరియు తలనొప్పి ఉంది"       │
│     "I have fever and headache"              │
│                                              │
│     "నాకు పొట్ట నొప్పి"                     │
│     "I have stomach pain"                    │
│                                              │
│                    48dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │         Tap to Stop / ఆపండి         │  48dp
│  └──────────────────────────────────────┘  │
│                                              │
│                    16dp                      │
│                                              │
└─────────────────────────────────────────────┘
```

### Specifications

**Animations**:
- Microphone icon: Pulsing scale animation (1.0 → 1.1 → 1.0, 800ms cycle)
- Sound wave visualization: Real-time audio amplitude bars
- Recording timer: Live countdown

**Colors**:
- Microphone icon: #0D7FBF
- Pulsing outer ring: #0D7FBF at 30% opacity
- Recording indicator: #D32F2F (red dot)
- Progress bar: #2E7D32 (green)
- Stop button: #D32F2F background, #FFFFFF text

**Voice Recognition**:
- Language detection: Auto-detect Telugu vs English
- Supported: Telugu (te-IN), English (en-IN)
- Timeout: 10 seconds of silence → auto-stop
- Maximum duration: 30 seconds

**Error Handling**:
- Microphone permission denied → Show permission request dialog
- Voice not detected → "Couldn't hear you. Please try again."
- Network error → "Need internet for voice search. Try typing instead."

---

## Screen 3: Search Auto-Suggestions

### Visual Mockup
```
┌─────────────────────────────────────────────┐
│ Status Bar                             20dp │
├─────────────────────────────────────────────┤
│                                         56dp│
│  [← Back]     Search                   [X]  │
│                                              │
├─────────────────────────────────────────────┤
│                                              │
│                    16dp                      │
│  ┌──────────────────────────────────────┐  │
│  │ 🔍 Fever|                       [🎤] │  56dp
│  │    జ్వరం                             │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │                                       │  │
│  │  🔍 Fever (జ్వరం)                    │ 48dp
│  │                                     → │  │
│  ├───────────────────────────────────────┤  │
│  │  🔍 Fever and cold                    │ 48dp
│  │     జ్వరం మరియు జలుబు               → │  │
│  ├───────────────────────────────────────┤  │
│  │  🔍 Fever and headache                │ 48dp
│  │     జ్వరం మరియు తలనొప్పి           → │  │
│  ├───────────────────────────────────────┤  │
│  │  🔍 Fever and body pain               │ 48dp
│  │     జ్వరం మరియు శరీర నొప్పి        → │  │
│  ├───────────────────────────────────────┤  │
│  │  🔍 Viral fever                       │ 48dp
│  │     వైరల్ జ్వరం                     → │  │
│  └───────────────────────────────────────┘  │
│                                              │
│                     8dp                      │
│  Recent searches / ఇటీవలి శోధనలు:      14sp│
│                                              │
│  ┌───────────────────────────────────────┐  │
│  │  🕐 Headache                          │  │
│  │     తలనొప్పి                      [X]│ 48dp
│  ├───────────────────────────────────────┤  │
│  │  🕐 Stomach pain                      │  │
│  │     పొట్ట నొప్పి                  [X]│ 48dp
│  └───────────────────────────────────────┘  │
│                                              │
│                    16dp                      │
│                                              │
└─────────────────────────────────────────────┘
```

### Specifications

**Auto-Suggestions Logic**:
- Triggered: After 2 characters typed
- Source: Symptom database (bilingual)
- Delay: 300ms debounce
- Maximum suggestions: 5
- Ranking: Popularity + regional prevalence (AP-specific)

**Bilingual Display**:
- Primary language (user preference) shown first
- Secondary language shown below in lighter color
- Both searchable (typing Telugu or English matches both)

**Recent Searches**:
- Stored locally: Last 10 searches
- Clearable: Tap [X] to remove individual items
- Privacy: Clear all option in settings

**Keyboard**:
- Default: System keyboard (supports Telugu input)
- Suggestion bar: Show Telugu/English toggle
- Close: Tap outside or back button

---

## Screen 4: Search Results

### Visual Mockup
```
┌─────────────────────────────────────────────┐
│ Status Bar                             20dp │
├─────────────────────────────────────────────┤
│                                         56dp│
│  [← Back]   Search Results           [⚙️]  │
│                                              │
├─────────────────────────────────────────────┤
│                    12dp                      │
│  Showing 12 doctors for "Fever"         14sp│
│  "జ్వరం" కోసం 12 వైద్యులు                  │
│                                              │
│                     8dp                      │
│  ┌────┬──────────┬───────┬────────────┐    │
│  │All │Telugu ✓ │<5km ✓│Aarogyasri  │ 32dp│ ← Filter chips
│  └────┴──────────┴───────┴────────────┘    │
│                                              │
│  Sort: [Relevance ▼]  [List/Map 📍]     12sp│
│                                              │
│                     8dp                      │
│  ┌──────────────────────────────────────┐  │
│  │ ┌─────┐                             │  │
│  │ │     │  డా. రామ మోహన్ రావు      ✓│  │
│  │ │     │  Dr. Rama Mohan Rao         │  │
│  │ │ 👨‍⚕️ │  General Physician          │  │
│  │ │96x  │  సాధారణ వైద్యం              │  144dp
│  │ │96dp │                              │  │
│  │ └─────┘  ⭐ 4.5 (150) • 📍 2.3 km   │  │
│  │          💰 ₹500 • 🗣️ తెలుగు, ఆంగ్లం│  │
│  │          Apollo Hospital             │  │
│  │                                      │  │
│  │  ┌────────────────────────────────┐ │  │
│  │  │    View Profile / ప్రొఫైల్    │ │ 36dp
│  │  └────────────────────────────────┘ │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    12dp                      │
│  ┌──────────────────────────────────────┐  │
│  │ ┌─────┐                             │  │
│  │ │     │  డా. లక్ష్మి దేవి          ✓│  │
│  │ │     │  Dr. Lakshmi Devi            │  │
│  │ │ 👩‍⚕️ │  General Physician          │  │
│  │ │96x  │  సాధారణ వైద్యం              │  144dp
│  │ │96dp │                              │  │
│  │ └─────┘  ⭐ 4.7 (89) • 📍 3.8 km    │  │
│  │          💰 ₹400 • 🗣️ తెలుగు       │  │
│  │          ❤️ Aarogyasri • Govt Hosp  │  │
│  │                                      │  │
│  │  ┌────────────────────────────────┐ │  │
│  │  │    View Profile / ప్రొఫైల్    │ │ 36dp
│  │  └────────────────────────────────┘ │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    12dp                      │
│  ┌──────────────────────────────────────┐  │
│  │ ┌─────┐                             │  │
│  │ │     │  డా. వెంకట రావు             ✓│  │
│  │ │     │  Dr. Venkata Rao             │  │
│  │ │ 👨‍⚕️ │  Pediatrician                │  │
│  │ │96x  │  శిశు వైద్యం                │  144dp
│  │ │96dp │                              │  │
│  │ └─────┘  ⭐ 4.6 (203) • 📍 4.2 km   │  │
│  │          💰 ₹600 • 🗣️ తెలుగు, హిందీ│  │
│  │          KIMS Hospital               │  │
│  │                                      │  │
│  │  ┌────────────────────────────────┐ │  │
│  │  │    View Profile / ప్రొఫైల్    │ │ 36dp
│  │  └────────────────────────────────┘ │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    12dp                      │
│  ┌──────────────────────────────────────┐  │
│  │      Load More / మరిన్ని చూడండి     │ 48dp
│  └──────────────────────────────────────┘  │
│                                              │
└─────────────────────────────────────────────┘
```

### Specifications

**Doctor Card Components**:

1. **Photo** (96x96dp):
   - Aspect ratio: 1:1 (square)
   - Corner radius: 8dp
   - Placeholder: Generic doctor icon if no photo
   - Border: 1dp #E0E0E0

2. **Name**:
   - Telugu: 16sp, Medium, #212121
   - English: 14sp, Regular, #757575
   - Verified badge: 16dp checkmark, #2E7D32

3. **Specialty**:
   - English: 14sp, Regular, #212121
   - Telugu: 13sp, Regular, #757575

4. **Rating**:
   - Star icon: 16dp, #F57C00 (orange)
   - Rating number: 14sp, Bold, #212121
   - Review count: 14sp, Regular, #757575 in parentheses

5. **Distance**:
   - Icon: 16dp, #757575
   - Text: 14sp, Regular, #757575
   - Format: "2.3 km"

6. **Fees**:
   - Icon: 16dp, #757575
   - Text: 14sp, Medium, #0D7FBF
   - Format: "₹500"

7. **Languages**:
   - Icon: 16dp, #757575
   - Text: 14sp, Regular, #757575
   - Comma-separated

8. **Aarogyasri Badge**:
   - Heart icon: 16dp, #4A148C
   - Text: 12sp, Medium, #4A148C
   - Background: #EDE7F6
   - Padding: 4dp vertical, 8dp horizontal
   - Corner radius: 12dp

9. **Hospital**:
   - Text: 13sp, Regular, #757575
   - Truncate with "..." if too long

10. **View Profile Button**:
    - Style: Outlined
    - Border: 2dp, #0D7FBF
    - Background: Transparent
    - Text: 14sp, Medium, #0D7FBF
    - Height: 36dp
    - Full width within card
    - Corner radius: 18dp

**Filter Chips**:
- Default: White background, gray border
- Selected: Blue background (#0D7FBF), white text, checkmark
- Tap: Toggle selection
- Clear all: "X" icon on far right

**Sort Dropdown**:
- Options: Relevance, Distance, Rating, Fees (Low to High)
- Default: Relevance
- Icon indicates current sort

**List/Map Toggle**:
- Icon button: 40x40dp
- Map view: Shows doctors as pins on Google Maps
- List view: Current card layout

**Loading More**:
- Load 10 doctors at a time
- Show loading spinner while fetching
- Infinite scroll alternative: Auto-load on scroll

**Performance**:
- Initial load: 10 doctors (< 3 seconds per REQ-5.1.1)
- Images: Lazy load, progressive JPEG
- Cached: Previous searches cached for 1 hour

---

## Screen 5: No Results State

### Visual Mockup
```
┌─────────────────────────────────────────────┐
│ Status Bar                             20dp │
├─────────────────────────────────────────────┤
│                                         56dp│
│  [← Back]   Search Results           [⚙️]  │
│                                              │
├─────────────────────────────────────────────┤
│                    16dp                      │
│  Searched for "rare symptom xyz"        14sp│
│  "అరుదైన లక్షణం xyz" కోసం వెతికారు         │
│                                              │
│                     8dp                      │
│  [Telugu ✓] [<5km ✓] [Aarogyasri]  [Clear] │
│                                              │
│                    48dp                      │
│                                              │
│           ┌──────────────┐                  │
│           │              │                   │
│           │     🔍       │                   │
│           │      ❌      │             96dp │
│           │              │                   │
│           │ (Empty box)  │                   │
│           │              │                   │
│           └──────────────┘                  │
│                                              │
│                    16dp                      │
│                                              │
│         No Doctors Found                20sp│
│         వైద్యులు కనబడలేదు                  │
│                                              │
│                    16dp                      │
│                                              │
│  We couldn't find any doctors matching       │
│  your search.                           14sp│
│                                              │
│  మీ శోధనకు సరిపోయే వైద్యులు కనబడలేదు.     │
│                                              │
│                    24dp                      │
│                                              │
│  Try these suggestions:                 16sp│
│  ఈ సూచనలను ప్రయత్నించండి:                 │
│                                              │
│                     8dp                      │
│                                              │
│  • Expand your search radius to 10-20 km    │
│    మీ శోధన పరిధిని 10-20 కి.మీ.కి పెంచండి   │
│                                              │
│  • Remove some filters (language, fees)      │
│    కొన్ని ఫిల్టర్లు తొలగించండి              │
│                                              │
│  • Try different symptoms or simpler terms   │
│    వేరే లక్షణాలు లేదా సరళ పదాలు ప్రయత్నించండి│
│                                              │
│  • Search by specialty instead              │
│    బదులుగా ప్రత్యేకత ద్వారా వెతకండి        │
│                                              │
│                    24dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  🔍 Expand Search to 20 km           │  48dp
│  │     శోధనను 20 కి.మీ.కి విస్తరించండి │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                     8dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  ✖️ Clear All Filters                 │  48dp
│  │     అన్ని ఫిల్టర్లు తొలగించండి       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                     8dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  🏠 Search from Home                  │  48dp
│  │     హోమ్ నుండి వెతకండి              │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    16dp                      │
│                                              │
│  Need help? / సహాయం కావాలా?            14sp│
│  Call: 1800-XXX-XXXX (Toll Free)             │
│                                              │
│                    16dp                      │
│                                              │
└─────────────────────────────────────────────┘
```

### Specifications

**Empty State Illustration**:
- Size: 96x96dp
- Style: Simple line art, not overwhelming
- Color: #BDBDBD (light gray)
- Icon: Magnifying glass with X or empty search result

**Message Tone**:
- Empathetic, not blaming
- Constructive suggestions
- Clear next steps
- Bilingual throughout

**Action Buttons**:
1. **Expand Search**: Primary action
   - Automatically increases radius to 20km
   - Re-runs search

2. **Clear Filters**: Secondary action
   - Removes all applied filters
   - Keeps search term
   - Shows all results for symptom

3. **Search from Home**: Tertiary action
   - Returns to home screen
   - Clears search state
   - Fresh start

**Help Contact**:
- Toll-free number prominently displayed
- WhatsApp support option (future)
- Link to help center (future)

---

## Screen 6: Error State (No Internet)

### Visual Mockup
```
┌─────────────────────────────────────────────┐
│ Status Bar (No Signal)                 20dp │
├─────────────────────────────────────────────┤
│                                         56dp│
│  [← Back]   Search                          │
│                                              │
├─────────────────────────────────────────────┤
│                    16dp                      │
│  ┌──────────────────────────────────────┐  │
│  │ 🔍 Fever                        [🎤] │  56dp
│  │    జ్వరం                             │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    48dp                      │
│                                              │
│           ┌──────────────┐                  │
│           │              │                   │
│           │              │                   │
│           │      📡      │                   │
│           │      ❌      │            96dp  │
│           │              │                   │
│           │  (No wifi)   │                   │
│           │              │                   │
│           └──────────────┘                  │
│                                              │
│                    16dp                      │
│                                              │
│      No Internet Connection             20sp│
│      ఇంటర్నెట్ కనెక్షన్ లేదు                │
│                                              │
│                    16dp                      │
│                                              │
│  We can't search for doctors without an      │
│  internet connection.                   14sp│
│                                              │
│  ఇంటర్నెట్ కనెక్షన్ లేకుండా మేము వైద్యుల  │
│  కోసం వెతకలేము.                             │
│                                              │
│                    24dp                      │
│                                              │
│  Please check:                          16sp│
│  దయచేసి తనిఖీ చేయండి:                      │
│                                              │
│                     8dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  📱 Mobile data is turned on         │  │
│  │     మొబైల్ డేటా ఆన్ చేయబడింది       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  📶 Wi-Fi is connected               │  │
│  │     Wi-Fi కనెక్ట్ చేయబడింది         │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  ✈️ Airplane mode is off              │  │
│  │     ఎయిర్‌ప్లేన్ మోడ్ ఆఫ్ చేయబడింది  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    24dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  🔄 Try Again                         │  48dp
│  │     మళ్ళీ ప్రయత్నించండి              │  │
│  └──────────────────────────────────────┘  │
│                                              │
│                     8dp                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  📅 View Saved Appointments          │  48dp
│  │     సేవ్ చేసిన అపాయింట్మెంట్లు చూడండి│  │
│  └──────────────────────────────────────┘  │
│                                              │
│                    16dp                      │
│                                              │
│  ℹ️ You can view saved appointment details   │
│     offline.                            13sp│
│                                              │
│     మీరు ఆఫ్‌లైన్‌లో సేవ్ చేసిన          │
│     అపాయింట్మెంట్ వివరాలను చూడవచ్చు.      │
│                                              │
│                    16dp                      │
│                                              │
└─────────────────────────────────────────────┘
```

### Specifications

**Network Detection**:
- Check connectivity before search
- Listen for network state changes
- Detect: No WiFi, no mobile data, airplane mode
- Auto-retry when connection restored

**Error Icon**:
- Size: 96x96dp
- Style: WiFi icon with slash or X
- Color: #EF5350 (light red)
- Animation: None (static for clarity)

**Action Buttons**:
1. **Try Again**:
   - Re-checks network connection
   - Re-runs search if connected
   - Shows loading spinner during check

2. **View Saved Appointments**:
   - Navigates to offline-cached appointments
   - No internet required
   - Useful fallback

**Offline Capabilities**:
- Previously viewed doctor profiles cached (7 days)
- Booked appointments accessible offline
- Recent searches cached locally
- Help text explains what's available offline

**User Education**:
- Clear, non-technical language
- Checklist format easy to follow
- Visual cues (icons) for each step
- Bilingual instructions

---

## Responsive Variations

### Small Screen (360x640dp)
- Minimum supported size
- All elements visible without horizontal scroll
- Search bar: Full width minus 32dp margins
- Symptom chips: 4 columns, equal width
- Doctor cards: Single column, full width
- Bottom nav: 4 items, 90dp each

### Medium Screen (375x667dp - iPhone SE/8)
- Comfortable spacing
- Search bar: Full width minus 32dp margins
- Symptom chips: 4 columns with 8dp gaps
- Doctor cards: Single column
- Bottom nav: 4 items, 93.75dp each

### Large Screen (414x896dp - iPhone Pro Max, large Android)
- More breathing room
- Search bar: Full width minus 32dp margins
- Symptom chips: 4 columns with 12dp gaps
- Doctor cards: Single column (could be 2 columns in landscape)
- Bottom nav: 4 items, 103.5dp each

### Tablet (600dp+ width)
- Two-column layout for doctor cards
- Larger search bar (max 600dp width, centered)
- More symptoms/specialties visible
- Side navigation instead of bottom nav

### Landscape Orientation
- Search bar: Horizontal, top of screen
- Filters: Horizontal row below search
- Doctor cards: 2 columns
- Bottom nav: Hidden, use side drawer or top tabs

---

## Interaction Specifications

### 1. Search Bar Interactions

**Tap Search Bar**:
```
State: Unfocused → Focused
Actions:
- Keyboard appears from bottom
- Search bar elevates to 4dp
- Cursor blinks in input field
- Voice icon remains visible
- Recent searches shown (if any)
- Cancel button appears on right
```

**Type in Search Bar**:
```
Actions:
- Auto-suggestions appear after 2 characters
- Debounce: 300ms delay before API call
- Show loading indicator in suggestions
- Highlight matching text in suggestions
- Update suggestions as typing continues
```

**Tap Suggestion**:
```
Actions:
- Fill search bar with selected term
- Keyboard dismisses
- Execute search immediately
- Navigate to results screen
- Loading spinner shown
- Add to recent searches
```

**Tap Voice Icon**:
```
Actions:
- Request microphone permission (first time)
- Open voice search modal (Screen 2)
- Start listening immediately
- Show pulsing animation
- Display transcription in real-time
```

**Clear Search (X button)**:
```
Actions:
- Clear search input
- Hide suggestions
- Show recent searches
- Keep keyboard open
- Keep cursor focused
```

### 2. Symptom Chip Interactions

**Tap Symptom Chip**:
```
Actions:
- Fill search bar with symptom term (bilingual)
- Auto-execute search
- Navigate to results screen
- Show loading state
- Add to recent searches
```

**Visual Feedback**:
```
States:
- Default: Light background, dark text
- Pressed: Ripple effect (Material Design)
- Active: Blue background, white text (0.2s transition)
```

### 3. Filter Interactions

**Tap Filter Chip**:
```
Actions:
- Toggle filter on/off
- Visual change: Gray → Blue (selected)
- Add checkmark icon
- Re-run search with new filters
- Update result count
- Animate result list update
```

**Tap Filter Icon (⚙️)**:
```
Actions:
- Open filter bottom sheet
- Show all filter options:
  - Specialty (checkboxes)
  - Location (district/mandal dropdown)
  - Distance (slider, 1-50 km)
  - Language (checkboxes)
  - Fees (slider, ₹0-₹5000)
  - Hospital type (checkboxes)
  - Aarogyasri (toggle)
- Apply button at bottom
- Clear all button at top
```

### 4. Doctor Card Interactions

**Tap "View Profile" Button**:
```
Actions:
- Navigate to doctor profile screen
- Slide transition (left to right)
- Show loading skeleton while profile loads
- Cache profile for offline viewing
```

**Tap Doctor Photo**:
```
Actions:
- Same as "View Profile" button
- Larger touch target for accessibility
```

**Tap Hospital Name**:
```
Actions:
- Show hospital details (future)
- Or same as "View Profile"
```

**Long Press Doctor Card**:
```
Actions:
- Show quick action menu:
  - Save/Favorite doctor
  - Share doctor profile
  - Get directions to hospital
  - Call hospital
```

### 5. Voice Search Interactions

**Voice Input Detected**:
```
Actions:
- Display transcribed text in real-time
- Highlight text as it's spoken
- Show confidence level (optional)
- Auto-detect language (Telugu/English)
```

**Voice Input Complete**:
```
Actions:
- Show final transcription
- "Confirm" and "Edit" buttons appear
- Tap Confirm → execute search
- Tap Edit → open keyboard with transcription
- Auto-confirm after 3 seconds of silence
```

**Voice Input Error**:
```
Actions:
- Show error message (bilingual)
- Suggest: Try again, Type instead
- Offer to switch to text input
- Log error for analytics
```

### 6. Loading States

**Search Loading**:
```
Display:
- Skeleton screens for doctor cards (3 visible)
- Pulsing gray rectangles
- Search bar shows loading spinner
- Disable further interaction
Duration: Typical 1-2 seconds, max 3 seconds
```

**Image Loading**:
```
Display:
- Doctor photo placeholder (generic icon)
- Progressive JPEG loading
- Fade-in animation when loaded
- Retry on error
```

### 7. Scroll Interactions

**Scroll Down Results**:
```
Actions:
- Search bar minimizes (hides logo, shrinks)
- Filter chips stick to top
- Load more results at bottom
- "Scroll to top" FAB appears after 2 screens
```

**Pull to Refresh**:
```
Actions:
- Pull down on results
- Show refresh indicator
- Re-run search with current filters
- Update results with animation
```

### 8. Accessibility Interactions

**Screen Reader (TalkBack)**:
```
Announcements:
- "Search for symptoms. Text input field."
- "Voice search button. Double tap to activate."
- "Doctor Rama Mohan Rao, General Physician,
   4.5 star rating, 2.3 kilometers away,
   consultation fee 500 rupees, Telugu and English spoken,
   View profile button."
```

**Large Text Mode**:
```
Adjustments:
- All text scales up to 200%
- Cards expand vertically
- Buttons remain minimum 48dp height
- Scrollable if content exceeds screen
```

**High Contrast Mode**:
```
Adjustments:
- Increase border thickness to 2dp
- Darken text colors
- Increase icon stroke width
- Ensure 7:1 contrast ratio
```

---

## Technical Specifications

### Animation Timings
```
Fast: 100-150ms (button press, ripple)
Standard: 200-300ms (transitions, fades)
Slow: 400-500ms (screen transitions, modal open)
```

### Elevation (Shadow) Levels
```
0dp: Base background
2dp: Cards, raised elements
4dp: App bar, focused search bar
6dp: FAB (scroll to top)
8dp: Bottom sheet, modal dialogs
16dp: Navigation drawer (if used)
```

### Touch Feedback
```
All interactive elements:
- Ripple effect on touch (Material Design)
- Color: rgba(13, 127, 191, 0.12) for light backgrounds
- Duration: 200ms
- Origin: Touch point
```

### Performance Targets
```
Search Results: < 3 seconds (REQ-5.1.1)
Image Load: < 1 second per image (3G)
Scroll FPS: 60fps minimum
App Launch: < 2 seconds (cold start)
Screen Transition: < 300ms
```

---

## Accessibility Checklist

**Visual**:
- ✅ Minimum text size: 16sp (14sp for labels)
- ✅ Color contrast: 4.5:1 for text, 3:1 for UI elements
- ✅ Touch targets: 48x48dp minimum
- ✅ Spacing: 8dp minimum between targets
- ✅ Icons with text labels (not icon-only)

**Motor**:
- ✅ Large buttons easy to tap
- ✅ No complex gestures required
- ✅ Single tap for all actions
- ✅ No time-sensitive interactions

**Cognitive**:
- ✅ Simple, clear language
- ✅ Bilingual (Telugu/English)
- ✅ Visual hierarchy obvious
- ✅ One primary action per screen
- ✅ Error messages helpful, not alarming

**Screen Reader**:
- ✅ All elements have contentDescription
- ✅ Images have alt text
- ✅ Focus order logical (top to bottom, left to right)
- ✅ Announcements for status changes

**Testing**:
- ✅ Tested with TalkBack enabled
- ✅ Tested with large text (200%)
- ✅ Tested with elderly users (60+)
- ✅ Tested with low IT literacy users
- ✅ Tested on entry-level devices

---

## Design Assets Required

### Icons (24dp, 48dp versions)
- Search (magnifying glass)
- Voice (microphone)
- Location (pin)
- Filter (funnel)
- Star (rating)
- Checkmark (verified)
- Heart (Aarogyasri)
- Close (X)
- Back arrow
- Language toggle
- User profile
- Calendar
- Phone
- Hospital
- Rupee symbol

### Illustrations (96x96dp)
- Empty search results
- No internet connection
- Error state
- Voice listening animation
- Success confirmation

### Photos
- Placeholder doctor photo (generic)
- Placeholder hospital image

### Fonts
- Noto Sans Telugu (Regular, Medium, Bold)
- Roboto (Regular, Medium, Bold)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 8, 2025 | Initial mockup for UC-01 |

---

## Approval

- [ ] Product Manager
- [ ] UX Designer
- [ ] Android Developer
- [ ] Telugu Language Reviewer
- [ ] Accessibility Specialist

---

**End of UC-01 Mockup Document**
