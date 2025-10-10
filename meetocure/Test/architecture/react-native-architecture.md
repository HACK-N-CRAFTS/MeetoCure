# React Native Architecture Specification
# Patient-Doctor Appointment Booking System
## Andhra Pradesh, South India

---

## Document Control

| Field | Value |
|-------|-------|
| **Product Name** | Patient-Doctor Appointment Booking System |
| **Target Region** | Andhra Pradesh, South India |
| **Document Version** | 2.0 - Firebase Edition |
| **Last Updated** | October 8, 2025 |
| **Status** | Draft |
| **Document Owner** | Engineering Team |
| **Based on PRD** | v1.0 - Andhra Pradesh Edition |
| **Backend** | Firebase (BaaS) |

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Application Architecture](#4-application-architecture)
5. [Component Architecture](#5-component-architecture)
6. [State Management](#6-state-management)
7. [Navigation Architecture](#7-navigation-architecture)
8. [Data Layer](#8-data-layer)
9. [API Integration](#9-api-integration)
10. [Localization Architecture](#10-localization-architecture)
11. [Performance Optimization](#11-performance-optimization)
12. [Security Architecture](#12-security-architecture)
13. [Offline Support](#13-offline-support)
14. [Push Notifications](#14-push-notifications)
15. [Third-Party Integrations](#15-third-party-integrations)
16. [Build and Deployment](#16-build-and-deployment)
17. [Testing Strategy](#17-testing-strategy)
18. [Accessibility](#18-accessibility)

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Native App                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Presentation Layer                       │  │
│  │  • React Components                                   │  │
│  │  • Navigation (React Navigation)                      │  │
│  │  • UI Components (React Native Paper/NativeBase)     │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↕                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Business Logic Layer                         │  │
│  │  • State Management (Redux Toolkit/Zustand)          │  │
│  │  • Custom Hooks                                       │  │
│  │  • Services & Utilities                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↕                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Data Layer                               │  │
│  │  • Firebase SDK (Firestore, Auth, Storage)           │  │
│  │  • Local Storage (AsyncStorage/MMKV)                 │  │
│  │  • Offline Persistence (Firestore Cache)             │  │
│  │  • Cache Management                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│              Native Modules & Third-Party SDKs              │
│  • Google Maps • Firebase • SMS • Voice Recognition        │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│                   Firebase Backend (BaaS)                   │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Firestore • Authentication • Cloud Functions          │ │
│  │ Cloud Storage • FCM • Analytics • Crashlytics        │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│                  External APIs (via Cloud Functions)        │
│  • Aarogyasri Verification • Payment Gateway • SMS         │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Design Patterns

- **MVC/MVVM Pattern**: Separation of concerns between UI, business logic, and data
- **Repository Pattern**: Abstract data sources (API, local DB, cache)
- **Service Layer Pattern**: Encapsulate business logic
- **Observer Pattern**: State management with Redux/Zustand
- **Factory Pattern**: Component and service creation
- **Singleton Pattern**: API client, database connections

### 1.3 Key Architectural Principles

- **Cross-Platform Compatibility**: Single codebase for Android (iOS future)
- **Offline-First**: Local data persistence with sync
- **Performance-Oriented**: Optimized for low-end devices
- **Modular Design**: Reusable, maintainable components
- **Type Safety**: TypeScript for compile-time error detection
- **Accessibility**: Screen reader support, large touch targets
- **Localization**: Multi-language support (Telugu/English)

---

## 2. Technology Stack

### 2.1 Core Technologies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React Native | 0.73+ | Cross-platform mobile development |
| **Language** | TypeScript | 5.0+ | Type-safe JavaScript |
| **Package Manager** | Yarn | 3.x | Dependency management |
| **Build Tool** | Metro Bundler | Latest | JavaScript bundling |

### 2.2 State Management

| Technology | Purpose |
|-----------|---------|
| **Redux Toolkit** | Global state management (primary choice) |
| **Zustand** | Lightweight alternative for simpler state |
| **React Query (TanStack Query)** | Server state management, caching |
| **React Context** | Theme, language, auth context |

**Recommendation**: Redux Toolkit for predictable state management with strong DevTools support.

### 2.3 Navigation

| Technology | Purpose |
|-----------|---------|
| **React Navigation 6** | Primary navigation library |
| **Stack Navigator** | Screen transitions |
| **Bottom Tab Navigator** | Main app navigation |
| **Drawer Navigator** | Side menu (if needed) |

### 2.4 UI Component Libraries

| Library | Purpose |
|---------|---------|
| **React Native Paper** | Material Design 3 components |
| **React Native Elements** | Additional UI components |
| **NativeBase** | Alternative comprehensive UI library |
| **Custom Components** | App-specific, branded components |

**Recommendation**: React Native Paper for Material Design consistency with Android.

### 2.5 Backend & Data Persistence

| Technology | Purpose |
|-----------|---------|
| **Firebase Firestore** | NoSQL cloud database (primary data store) |
| **Firebase Authentication** | User authentication (phone, email, anonymous) |
| **Firebase Cloud Functions** | Serverless backend logic |
| **Firebase Cloud Storage** | File/image storage |
| **Firestore Offline Persistence** | Built-in offline caching |
| **AsyncStorage** | Simple key-value storage (preferences) |
| **MMKV** | Fast, encrypted key-value storage |

**Recommendation**: Firebase Firestore for all primary data with built-in offline support.

### 2.6 Firebase Services

| Service | Purpose |
|---------|---------|
| **Firestore Database** | Store doctors, appointments, users, reviews |
| **Firebase Auth** | Phone authentication (OTP), anonymous auth |
| **Cloud Functions** | Server-side logic (appointment validation, notifications, Aarogyasri API) |
| **Cloud Messaging (FCM)** | Push notifications |
| **Firebase Analytics** | User behavior tracking |
| **Firebase Crashlytics** | Crash reporting |
| **Cloud Storage** | Store doctor images, documents, prescriptions |
| **Firebase Remote Config** | Feature flags, A/B testing |

### 2.7 Localization

| Technology | Purpose |
|-----------|---------|
| **i18next** | Internationalization framework |
| **react-i18next** | React bindings for i18next |
| **react-native-localize** | Device locale detection |

### 2.8 Firebase React Native Packages

| Package | Purpose |
|---------|---------|
| **@react-native-firebase/app** | Core Firebase module |
| **@react-native-firebase/firestore** | Cloud Firestore database |
| **@react-native-firebase/auth** | Firebase Authentication |
| **@react-native-firebase/storage** | Cloud Storage |
| **@react-native-firebase/messaging** | Cloud Messaging (FCM) |
| **@react-native-firebase/analytics** | Firebase Analytics |
| **@react-native-firebase/crashlytics** | Crash reporting |
| **@react-native-firebase/functions** | Cloud Functions client |
| **@react-native-firebase/remote-config** | Remote Config |
| **@react-native-firebase/performance** | Performance monitoring |

### 2.9 Native Modules & Integrations

| Module | Purpose | Package |
|--------|---------|---------|
| **Google Maps** | Location, navigation | `react-native-maps` |
| **Voice Recognition** | Speech-to-text | `@react-native-voice/voice` |
| **Calendar** | Add appointments | `react-native-calendar-events` |
| **SMS** | Read confirmations | `react-native-sms` |
| **Camera** | Document upload | `react-native-image-picker` |
| **Share** | WhatsApp sharing | `react-native-share` |
| **Permissions** | Runtime permissions | `react-native-permissions` |

### 2.10 Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **Jest** | Unit testing |
| **React Native Testing Library** | Component testing |
| **Detox** | E2E testing |
| **Reactotron** | Debugging |
| **Flipper** | Native debugging |
| **Firebase Emulator Suite** | Local Firebase testing |

---

## 3. Project Structure

```
patient-doctor-app/
├── android/                    # Android native code
├── ios/                        # iOS native code (future)
├── firebase/                   # Firebase backend
│   ├── functions/              # Cloud Functions
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── appointments.ts
│   │   │   ├── notifications.ts
│   │   │   ├── aarogyasri.ts
│   │   │   └── triggers.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── firestore.rules        # Security rules
│   ├── storage.rules          # Storage security rules
│   └── firebase.json          # Firebase config
├── src/
│   ├── firebase/               # Firebase client SDK
│   │   ├── config.ts          # Firebase initialization
│   │   ├── collections.ts     # Firestore collection references
│   │   ├── queries/
│   │   │   ├── doctors.ts
│   │   │   ├── appointments.ts
│   │   │   └── users.ts
│   │   └── functions/         # Cloud Functions client calls
│   │       ├── appointments.ts
│   │       └── aarogyasri.ts
│   ├── assets/                 # Images, fonts, icons
│   │   ├── images/
│   │   ├── fonts/
│   │   │   ├── NotoSansTelugu-Regular.ttf
│   │   │   └── Roboto-Regular.ttf
│   │   └── icons/
│   ├── components/             # Reusable components
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Loading/
│   │   ├── doctors/
│   │   │   ├── DoctorCard/
│   │   │   ├── DoctorProfile/
│   │   │   └── DoctorFilters/
│   │   ├── appointments/
│   │   │   ├── AppointmentCard/
│   │   │   └── BookingForm/
│   │   └── layout/
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── Container/
│   ├── config/                 # App configuration
│   │   ├── constants.ts
│   │   ├── env.ts
│   │   ├── theme.ts
│   │   └── firebaseConfig.ts  # Firebase client config
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDoctors.ts
│   │   ├── useLocation.ts
│   │   └── useVoiceSearch.ts
│   ├── locales/                # Translation files
│   │   ├── en/
│   │   │   └── translation.json
│   │   ├── te/                # Telugu
│   │   │   └── translation.json
│   │   └── i18n.ts
│   ├── navigation/             # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── types.ts
│   ├── screens/                # Screen components
│   │   ├── Auth/
│   │   │   └── LanguageSelectionScreen.tsx
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx
│   │   ├── Search/
│   │   │   ├── SearchScreen.tsx
│   │   │   └── SearchResultsScreen.tsx
│   │   ├── Doctor/
│   │   │   └── DoctorProfileScreen.tsx
│   │   ├── Booking/
│   │   │   ├── BookingScreen.tsx
│   │   │   └── ConfirmationScreen.tsx
│   │   └── Appointments/
│   │       └── AppointmentsScreen.tsx
│   ├── services/               # Business logic services
│   │   ├── doctorService.ts
│   │   ├── appointmentService.ts
│   │   ├── aarogyasriService.ts
│   │   ├── locationService.ts
│   │   ├── voiceService.ts
│   │   ├── smsService.ts
│   │   └── analyticsService.ts
│   ├── store/                  # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── doctorsSlice.ts
│   │   │   ├── appointmentsSlice.ts
│   │   │   └── filtersSlice.ts
│   │   ├── store.ts
│   │   └── hooks.ts           # Typed useSelector/useDispatch
│   ├── types/                  # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── doctor.ts
│   │   ├── appointment.ts
│   │   └── navigation.ts
│   ├── utils/                  # Utility functions
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   ├── formatter.ts
│   │   └── storage.ts
│   └── App.tsx                 # Root component
├── __tests__/                  # Test files
├── .env                        # Environment variables
├── .eslintrc.js
├── .prettierrc.js
├── app.json                    # Expo config (if using Expo)
├── babel.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. Application Architecture

### 4.1 Clean Architecture Layers

```
┌───────────────────────────────────────────────────────────┐
│                    Presentation Layer                      │
│  • Screens                                                 │
│  • Components                                              │
│  • Navigation                                              │
└───────────────────────────────────────────────────────────┘
                          ↓
┌───────────────────────────────────────────────────────────┐
│                    Application Layer                       │
│  • State Management (Redux)                                │
│  • Custom Hooks                                            │
│  • Navigation Logic                                        │
└───────────────────────────────────────────────────────────┘
                          ↓
┌───────────────────────────────────────────────────────────┐
│                     Domain Layer                           │
│  • Services (Business Logic)                               │
│  • Use Cases                                               │
│  • Entities/Models                                         │
└───────────────────────────────────────────────────────────┘
                          ↓
┌───────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                      │
│  • API Client                                              │
│  • Local Database                                          │
│  • Third-party SDKs                                        │
└───────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow Architecture

**Unidirectional Data Flow (Redux Pattern)**

```
┌─────────────┐     Action      ┌─────────────┐
│   Screen    │ ──────────────> │   Reducer   │
│ (Component) │                  │   (Redux)   │
└─────────────┘                  └─────────────┘
       ↑                                │
       │                                │
       │                                ↓
       │                         ┌─────────────┐
       │      Subscription       │    Store    │
       └─────────────────────────│   (State)   │
                                 └─────────────┘
                                        │
                                        ↓
                                  ┌──────────┐
                                  │   View   │
                                  └──────────┘
```

**Server State Management (React Query)**

```
┌─────────────┐   useQuery    ┌──────────────┐    HTTP     ┌────────┐
│  Component  │ ────────────> │ React Query  │ ──────────> │  API   │
└─────────────┘               └──────────────┘             └────────┘
       ↑                             │
       │                             │
       └─────────────────────────────┘
           Auto re-render on data change
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App
├── RootNavigator
│   ├── AuthNavigator (if not authenticated)
│   │   └── LanguageSelectionScreen
│   └── MainNavigator (authenticated/guest)
│       ├── BottomTabNavigator
│       │   ├── HomeScreen
│       │   ├── SearchScreen
│       │   ├── AppointmentsScreen
│       │   └── ProfileScreen
│       ├── DoctorProfileScreen
│       ├── BookingScreen
│       └── ConfirmationScreen
└── Providers
    ├── ReduxProvider
    ├── ThemeProvider
    ├── I18nProvider
    └── QueryClientProvider
```

### 5.2 Component Design Patterns

**Container/Presenter Pattern**

```typescript
// Container Component (screens/Search/SearchScreen.tsx)
const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading } = useAppSelector(state => state.doctors);
  const { searchDoctors } = useDoctors();

  const handleSearch = (query: string) => {
    searchDoctors(query);
  };

  return <SearchPresenter doctors={doctors} loading={loading} onSearch={handleSearch} />;
};

// Presenter Component (components/search/SearchPresenter.tsx)
interface SearchPresenterProps {
  doctors: Doctor[];
  loading: boolean;
  onSearch: (query: string) => void;
}

const SearchPresenter: React.FC<SearchPresenterProps> = ({ doctors, loading, onSearch }) => {
  return (
    <View>
      <SearchInput onSubmit={onSearch} />
      {loading ? <Loading /> : <DoctorList doctors={doctors} />}
    </View>
  );
};
```

**Atomic Design Principles**

```
atoms/
├── Button
├── Input
├── Text
├── Icon
└── Badge

molecules/
├── SearchBar (Input + Icon)
├── FilterChip (Text + Icon + TouchableOpacity)
└── DoctorCardHeader (Image + Text + Badge)

organisms/
├── DoctorCard (DoctorCardHeader + Body + Actions)
├── BookingForm (Multiple Inputs + Button)
└── Header (Logo + LanguageToggle + LocationDisplay)

templates/
├── ScreenTemplate (Header + Content + Footer)
└── ListTemplate (SearchBar + FilterBar + FlatList)

pages/
├── SearchResultsScreen
├── DoctorProfileScreen
└── BookingScreen
```

### 5.3 Reusable Components

**Button Component**

```typescript
// components/common/Button/Button.tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  size = 'medium',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, styles[variant], styles[size]]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {icon && <Icon name={icon} />}
          <Text>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
```

**DoctorCard Component**

```typescript
// components/doctors/DoctorCard/DoctorCard.tsx
interface DoctorCardProps {
  doctor: Doctor;
  onPress: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress }) => {
  const { t } = useTranslation();

  return (
    <Card onPress={onPress}>
      <Card.Cover source={{ uri: doctor.photo }} />
      <Card.Title
        title={doctor.name}
        subtitle={doctor.specialty}
        left={(props) => <Avatar.Image {...props} source={{ uri: doctor.photo }} />}
        right={(props) => (
          <View style={styles.badges}>
            {doctor.aarogyasriAccepted && <Badge style={styles.aarogyasriBadge}>Aarogyasri</Badge>}
            <Badge>{doctor.languages.join(', ')}</Badge>
          </View>
        )}
      />
      <Card.Content>
        <View style={styles.info}>
          <Icon name="star" color="gold" />
          <Text>{doctor.rating}</Text>
          <Icon name="location" />
          <Text>{doctor.distance} km</Text>
        </View>
        <Text style={styles.fee}>₹{doctor.consultationFee}</Text>
      </Card.Content>
    </Card>
  );
};
```

---

## 6. State Management

### 6.1 Redux Toolkit Architecture

**Store Configuration**

```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './slices/authSlice';
import doctorsReducer from './slices/doctorsSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import filtersReducer from './slices/filtersSlice';
import languageReducer from './slices/languageSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'language'], // Only persist these reducers
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    filters: filtersReducer,
    language: persistReducer(persistConfig, languageReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Slice Example: Doctors**

```typescript
// store/slices/doctorsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doctorService } from '../../services/doctorService';
import { Doctor, SearchParams } from '../../types/doctor';

interface DoctorsState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
  searchParams: SearchParams;
}

const initialState: DoctorsState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
  searchParams: {},
};

// Async Thunks
export const searchDoctors = createAsyncThunk(
  'doctors/search',
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      const response = await doctorService.searchDoctors(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await doctorService.getDoctorById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearDoctors: (state) => {
      state.doctors = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.selectedDoctor = action.payload;
      });
  },
});

export const { setSearchParams, clearDoctors, clearError } = doctorsSlice.actions;
export default doctorsSlice.reducer;
```

### 6.2 React Query for Server State

```typescript
// hooks/useDoctors.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorService } from '../services/doctorService';

export const useDoctors = (params: SearchParams) => {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => doctorService.searchDoctors(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!params.symptoms || !!params.specialty,
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => doctorService.getDoctorById(id),
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days (profiles rarely change)
  });
};
```

### 6.3 State Management Strategy

| State Type | Solution | Reason |
|-----------|----------|--------|
| **Authentication** | Redux Persist | Need to persist across sessions |
| **Language Preference** | Redux Persist | User setting, persistent |
| **Doctor Search Results** | React Query | Server data, automatic caching/refetching |
| **Appointments** | Redux + Local DB | Offline access, sync with server |
| **Filters** | Redux (ephemeral) | UI state, doesn't need persistence |
| **Form State** | Local component state / React Hook Form | Scoped to component |
| **Theme** | React Context | Global, infrequent changes |

---

## 7. Navigation Architecture

### 7.1 Navigation Structure

```typescript
// navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**Bottom Tab Navigator**

```typescript
// navigation/MainNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          // ... more icons
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#757575',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('nav.home') }} />
      <Tab.Screen name="Search" component={SearchNavigator} options={{ title: t('nav.search') }} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} options={{ title: t('nav.appointments') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('nav.profile') }} />
    </Tab.Navigator>
  );
};
```

**Search Stack Navigator**

```typescript
// navigation/SearchNavigator.tsx
const SearchStack = createNativeStackNavigator<SearchStackParamList>();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="SearchHome" component={SearchScreen} />
      <SearchStack.Screen name="SearchResults" component={SearchResultsScreen} />
      <SearchStack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <SearchStack.Screen name="Booking" component={BookingScreen} />
      <SearchStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </SearchStack.Navigator>
  );
};
```

### 7.2 Type-Safe Navigation

```typescript
// navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Appointments: undefined;
  Profile: undefined;
};

export type SearchStackParamList = {
  SearchHome: undefined;
  SearchResults: { symptoms: string; filters?: SearchFilters };
  DoctorProfile: { doctorId: string };
  Booking: { doctorId: string; slotId: string };
  Confirmation: { appointmentId: string };
};

// Navigation prop types
export type SearchScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SearchStackParamList, 'SearchHome'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type DoctorProfileNavigationProp = NativeStackNavigationProp<
  SearchStackParamList,
  'DoctorProfile'
>;

export type DoctorProfileRouteProp = RouteProp<SearchStackParamList, 'DoctorProfile'>;

// Usage in components
const DoctorProfileScreen = () => {
  const navigation = useNavigation<DoctorProfileNavigationProp>();
  const route = useRoute<DoctorProfileRouteProp>();
  const { doctorId } = route.params;

  const handleBookAppointment = (slotId: string) => {
    navigation.navigate('Booking', { doctorId, slotId });
  };

  // ...
};
```

---

## 8. Data Layer (Firebase)

### 8.1 Firestore Database Structure

**Collections & Documents**

```typescript
// Firestore database structure
/doctors/{doctorId}
  - doctorId: string
  - name: string
  - nameTelugu: string
  - specialty: string
  - photoUrl: string (Cloud Storage URL)
  - rating: number
  - reviewCount: number
  - consultationFee: number
  - languages: string[]
  - aarogyasriAccepted: boolean
  - hospitalType: 'government' | 'private' | 'corporate'
  - hospitalName: string
  - location: GeoPoint
  - address: string
  - district: string
  - mandal: string
  - mciNumber: string
  - apMedicalCouncilNumber: string
  - experience: number
  - qualifications: string[]
  - availability: object
  - createdAt: Timestamp
  - updatedAt: Timestamp

/appointments/{appointmentId}
  - appointmentId: string
  - doctorId: string
  - userId: string
  - patientName: string
  - patientMobile: string
  - patientAge: number
  - appointmentDate: Timestamp
  - slotTime: string
  - status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  - referenceNumber: string
  - aarogyasriCardNumber?: string
  - symptoms: string
  - consultationFee: number
  - createdAt: Timestamp
  - updatedAt: Timestamp

/users/{userId}
  - userId: string
  - phoneNumber: string
  - name: string
  - email?: string
  - language: 'en' | 'te'
  - createdAt: Timestamp
  - lastLogin: Timestamp

/reviews/{reviewId}
  - doctorId: string
  - userId: string
  - rating: number
  - comment: string
  - createdAt: Timestamp

/search_history/{historyId}
  - userId: string
  - query: string
  - language: 'en' | 'te'
  - timestamp: Timestamp
```

**Firebase Configuration**

```typescript
// firebase/config.ts
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import functions from '@react-native-firebase/functions';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

// Initialize Firebase (automatically configured from google-services.json)
const app = initializeApp();

// Enable Firestore offline persistence
firestore().settings({
  persistence: true,
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
});

export { firestore, auth, storage, functions, analytics, crashlytics };
export default app;
```

**Collection References**

```typescript
// firebase/collections.ts
import firestore from '@react-native-firebase/firestore';

export const collections = {
  doctors: firestore().collection('doctors'),
  appointments: firestore().collection('appointments'),
  users: firestore().collection('users'),
  reviews: firestore().collection('reviews'),
  searchHistory: firestore().collection('search_history'),
};

// Type-safe document references
export const getDoctorRef = (doctorId: string) =>
  collections.doctors.doc(doctorId);

export const getAppointmentRef = (appointmentId: string) =>
  collections.appointments.doc(appointmentId);

export const getUserRef = (userId: string) =>
  collections.users.doc(userId);
```

### 8.2 AsyncStorage / MMKV

**Simple Key-Value Storage**

```typescript
// utils/storage.ts
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const StorageService = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },

  getItem: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setObject: <T>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },

  getObject: <T>(key: string): T | undefined => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : undefined;
  },

  removeItem: (key: string) => {
    storage.delete(key);
  },

  clear: () => {
    storage.clearAll();
  },
};

// Usage
StorageService.setItem('language', 'te');
const lang = StorageService.getItem('language');
```

---

## 9. Firebase Integration

### 9.1 Firestore Queries

```typescript
// firebase/queries/doctors.ts
import firestore from '@react-native-firebase/firestore';
import { collections } from '../collections';
import { Doctor, SearchParams } from '../../types/doctor';

export const doctorQueries = {
  // Search doctors by symptoms/specialty
  searchDoctors: async (params: SearchParams) => {
    let query = collections.doctors.where('isActive', '==', true);

    // Filter by specialty
    if (params.specialty) {
      query = query.where('specialty', '==', params.specialty);
    }

    // Filter by Aarogyasri acceptance
    if (params.aarogyasriOnly) {
      query = query.where('aarogyasriAccepted', '==', true);
    }

    // Filter by hospital type
    if (params.hospitalType) {
      query = query.where('hospitalType', '==', params.hospitalType);
    }

    // Filter by district
    if (params.district) {
      query = query.where('district', '==', params.district);
    }

    // Order by rating
    query = query.orderBy('rating', 'desc');

    // Limit results
    query = query.limit(50);

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
  },

  // Get doctor by ID (with real-time updates)
  getDoctorById: (doctorId: string, callback: (doctor: Doctor | null) => void) => {
    return collections.doctors.doc(doctorId).onSnapshot(
      (doc) => {
        if (doc.exists) {
          callback({ id: doc.id, ...doc.data() } as Doctor);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Error fetching doctor:', error);
        callback(null);
      }
    );
  },

  // Search by location (using geohash or GeoFirestore)
  searchDoctorsByLocation: async (latitude: number, longitude: number, radiusKm: number) => {
    // Implement geohash query or use GeoFirestore library
    // For simplicity, fetch all and filter client-side (not recommended for production)
    const snapshot = await collections.doctors
      .where('isActive', '==', true)
      .get();

    const doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));

    // Filter by distance (simplified)
    return doctors.filter(doctor => {
      const distance = calculateDistance(
        latitude,
        longitude,
        doctor.location._latitude,
        doctor.location._longitude
      );
      return distance <= radiusKm;
    });
  },
};

// Helper: Calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
```

**Appointments Queries**

```typescript
// firebase/queries/appointments.ts
import firestore from '@react-native-firebase/firestore';
import { collections } from '../collections';
import { Appointment } from '../../types/appointment';

export const appointmentQueries = {
  // Create appointment
  createAppointment: async (appointmentData: Partial<Appointment>) => {
    const docRef = await collections.appointments.add({
      ...appointmentData,
      status: 'pending',
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    return docRef.id;
  },

  // Get user's appointments (real-time)
  getUserAppointments: (userId: string, callback: (appointments: Appointment[]) => void) => {
    return collections.appointments
      .where('userId', '==', userId)
      .orderBy('appointmentDate', 'desc')
      .onSnapshot(
        (snapshot) => {
          const appointments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as Appointment));
          callback(appointments);
        },
        (error) => {
          console.error('Error fetching appointments:', error);
          callback([]);
        }
      );
  },

  // Update appointment status
  updateAppointmentStatus: async (appointmentId: string, status: string) => {
    await collections.appointments.doc(appointmentId).update({
      status,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId: string) => {
    await collections.appointments.doc(appointmentId).update({
      status: 'cancelled',
      cancelledAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  },
};
```

### 9.2 Cloud Functions

**Firebase Cloud Functions (Backend)**

```typescript
// firebase/functions/src/appointments.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Trigger: Send notification when appointment is created
export const onAppointmentCreated = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snap, context) => {
    const appointment = snap.data();
    const { doctorId, userId, patientName, appointmentDate } = appointment;

    // Send SMS notification
    await sendSMS(appointment.patientMobile,
      `Your appointment with Dr. ${doctorId} is confirmed for ${appointmentDate}`);

    // Send push notification
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const fcmToken = userDoc.data()?.fcmToken;

    if (fcmToken) {
      await admin.messaging().send({
        token: fcmToken,
        notification: {
          title: 'Appointment Confirmed',
          body: `Your appointment is confirmed for ${appointmentDate}`,
        },
      });
    }

    return null;
  });

// Callable function: Verify Aarogyasri card
export const verifyAarogyasriCard = functions.https.onCall(async (data, context) => {
  const { cardNumber } = data;

  // Call external Aarogyasri API
  const response = await fetch('https://aarogyasri.gov.in/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardNumber }),
  });

  const result = await response.json();
  return {
    isValid: result.valid,
    beneficiaryName: result.name,
    eligibility: result.eligibility,
  };
});

// Helper: Send SMS via external SMS gateway
const sendSMS = async (mobile: string, message: string) => {
  // Implement SMS gateway integration (Twilio, MSG91, etc.)
  console.log(`Sending SMS to ${mobile}: ${message}`);
};
```

### 9.3 Service Layer (Client-side)

```typescript
// services/doctorService.ts
import { doctorQueries } from '../firebase/queries/doctors';
import { SearchParams, Doctor } from '../types/doctor';

export const doctorService = {
  searchDoctors: async (params: SearchParams): Promise<Doctor[]> => {
    try {
      const doctors = await doctorQueries.searchDoctors(params);
      return doctors;
    } catch (error) {
      console.error('Error searching doctors:', error);
      throw error;
    }
  },

  getDoctorById: (doctorId: string, callback: (doctor: Doctor | null) => void) => {
    // Returns unsubscribe function
    return doctorQueries.getDoctorById(doctorId, callback);
  },

  searchNearbyDoctors: async (lat: number, lng: number, radius: number) => {
    return doctorQueries.searchDoctorsByLocation(lat, lng, radius);
  },
};

// services/appointmentService.ts
import { appointmentQueries } from '../firebase/queries/appointments';
import { functions } from '../firebase/config';
import { Appointment } from '../types/appointment';

export const appointmentService = {
  createAppointment: async (appointmentData: Partial<Appointment>) => {
    const appointmentId = await appointmentQueries.createAppointment(appointmentData);
    return appointmentId;
  },

  getUserAppointments: (userId: string, callback: (appointments: Appointment[]) => void) => {
    return appointmentQueries.getUserAppointments(userId, callback);
  },

  cancelAppointment: async (appointmentId: string) => {
    await appointmentQueries.cancelAppointment(appointmentId);
  },

  verifyAarogyasri: async (cardNumber: string) => {
    const verifyFunction = functions().httpsCallable('verifyAarogyasriCard');
    const result = await verifyFunction({ cardNumber });
    return result.data;
  },
};
```

---

## 10. Localization Architecture

### 10.1 i18next Configuration

```typescript
// locales/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { StorageService } from '../utils/storage';

import en from './en/translation.json';
import te from './te/translation.json';

const resources = {
  en: { translation: en },
  te: { translation: te },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const savedLanguage = StorageService.getItem('language');
    if (savedLanguage) {
      callback(savedLanguage);
    } else {
      const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
      callback(deviceLanguage === 'te' ? 'te' : 'en');
    }
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    StorageService.setItem('language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
```

### 10.2 Translation Files

**English (locales/en/translation.json)**

```json
{
  "nav": {
    "home": "Home",
    "search": "Search",
    "appointments": "Appointments",
    "profile": "Profile"
  },
  "search": {
    "placeholder": "Enter symptoms or doctor name",
    "voicePrompt": "Tap to speak",
    "filters": "Filters",
    "results": "{{count}} doctors found"
  },
  "doctor": {
    "consultationFee": "Consultation Fee",
    "experience": "{{years}} years experience",
    "languages": "Languages",
    "bookAppointment": "Book Appointment"
  },
  "booking": {
    "patientDetails": "Patient Details",
    "fullName": "Full Name",
    "mobile": "Mobile Number",
    "aarogyasriCard": "Aarogyasri Card Number (Optional)",
    "confirmBooking": "Confirm Booking"
  },
  "confirmation": {
    "success": "Appointment Confirmed!",
    "reference": "Reference Number",
    "smsMessage": "Confirmation sent to {{mobile}}"
  },
  "filters": {
    "specialty": "Specialty",
    "location": "Location",
    "aarogyasri": "Accepts Aarogyasri",
    "hospitalType": "Hospital Type",
    "fees": "Consultation Fees"
  },
  "errors": {
    "networkError": "Network error. Please check your connection.",
    "invalidMobile": "Please enter a valid mobile number",
    "bookingFailed": "Booking failed. Please try again."
  }
}
```

**Telugu (locales/te/translation.json)**

```json
{
  "nav": {
    "home": "హోమ్",
    "search": "వెతకండి",
    "appointments": "అపాయింట్మెంట్లు",
    "profile": "ప్రొఫైల్"
  },
  "search": {
    "placeholder": "లక్షణాలు లేదా డాక్టర్ పేరు నమోదు చేయండి",
    "voicePrompt": "మాట్లాడటానికి నొక్కండి",
    "filters": "ఫిల్టర్లు",
    "results": "{{count}} డాక్టర్లు దొరికారు"
  },
  "doctor": {
    "consultationFee": "కన్సల్టేషన్ ఫీజు",
    "experience": "{{years}} సంవత్సరాల అనుభవం",
    "languages": "భాషలు",
    "bookAppointment": "అపాయింట్మెంట్ బుక్ చేయండి"
  },
  "booking": {
    "patientDetails": "రోగి వివరాలు",
    "fullName": "పూర్తి పేరు",
    "mobile": "మొబైల్ నంబర్",
    "aarogyasriCard": "ఆరోగ్యశ్రీ కార్డ్ నంబర్ (ఐచ్ఛికం)",
    "confirmBooking": "బుకింగ్ నిర్ధారించండి"
  },
  "confirmation": {
    "success": "అపాయింట్మెంట్ ధృవీకరించబడింది!",
    "reference": "రిఫరెన్స్ నంబర్",
    "smsMessage": "{{mobile}}కు నిర్ధారణ పంపబడింది"
  },
  "filters": {
    "specialty": "నైపుణ్యం",
    "location": "స్థానం",
    "aarogyasri": "ఆరోగ్యశ్రీ అంగీకరిస్తారు",
    "hospitalType": "ఆస్పత్రి రకం",
    "fees": "కన్సల్టేషన్ ఫీజులు"
  },
  "errors": {
    "networkError": "నెట్‌వర్క్ లోపం. దయచేసి మీ కనెక్షన్‌ను తనిఖీ చేయండి.",
    "invalidMobile": "దయచేసి చెల్లుబాటు అయ్యే మొబైల్ నంబర్‌ను నమోదు చేయండి",
    "bookingFailed": "బుకింగ్ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి."
  }
}
```

### 10.3 Usage in Components

```typescript
import { useTranslation } from 'react-i18next';

const SearchScreen = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'te' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View>
      <Text>{t('search.placeholder')}</Text>
      <Button title={t('search.voicePrompt')} onPress={handleVoiceSearch} />
      <Text>{t('search.results', { count: doctors.length })}</Text>
      <Button title="TE/EN" onPress={toggleLanguage} />
    </View>
  );
};
```

---

## 11. Performance Optimization

### 11.1 List Optimization

**FlatList Best Practices**

```typescript
// components/doctors/DoctorList.tsx
const DoctorList: React.FC<{ doctors: Doctor[] }> = ({ doctors }) => {
  const renderItem = useCallback(
    ({ item }: { item: Doctor }) => <DoctorCard doctor={item} />,
    []
  );

  const keyExtractor = useCallback((item: Doctor) => item.id, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: DOCTOR_CARD_HEIGHT,
      offset: DOCTOR_CARD_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={50}
    />
  );
};
```

### 11.2 Image Optimization

```typescript
// components/common/OptimizedImage.tsx
import FastImage from 'react-native-fast-image';

interface OptimizedImageProps {
  uri: string;
  style?: any;
  priority?: 'low' | 'normal' | 'high';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  uri,
  style,
  priority = 'normal',
}) => {
  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority[priority],
        cache: FastImage.cacheControl.immutable,
      }}
      style={style}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
```

### 11.3 Code Splitting

```typescript
// Lazy load screens
import React, { lazy, Suspense } from 'react';

const DoctorProfileScreen = lazy(() => import('./screens/Doctor/DoctorProfileScreen'));
const BookingScreen = lazy(() => import('./screens/Booking/BookingScreen'));

const App = () => (
  <Suspense fallback={<LoadingScreen />}>
    <RootNavigator />
  </Suspense>
);
```

### 11.4 Memoization

```typescript
import React, { useMemo, useCallback } from 'react';

const DoctorCard = React.memo(({ doctor, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(doctor.id);
  }, [doctor.id, onPress]);

  const distanceText = useMemo(() => {
    return `${doctor.distance.toFixed(1)} km`;
  }, [doctor.distance]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{doctor.name}</Text>
      <Text>{distanceText}</Text>
    </TouchableOpacity>
  );
});
```

---

## 12. Security Architecture

### 12.1 Data Encryption

```typescript
// utils/encryption.ts
import CryptoJS from 'crypto-js';
import Config from 'react-native-config';

const ENCRYPTION_KEY = Config.ENCRYPTION_KEY;

export const EncryptionService = {
  encrypt: (data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  },

  decrypt: (ciphertext: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  },

  encryptObject: <T>(obj: T): string => {
    return EncryptionService.encrypt(JSON.stringify(obj));
  },

  decryptObject: <T>(ciphertext: string): T => {
    const decrypted = EncryptionService.decrypt(ciphertext);
    return JSON.parse(decrypted);
  },
};

// Usage: Store sensitive data encrypted
const aarogyasriCard = '12345678901234';
const encrypted = EncryptionService.encrypt(aarogyasriCard);
StorageService.setItem('aarogyasri_card', encrypted);
```

### 12.2 Secure Storage

```typescript
// Use react-native-encrypted-storage for sensitive data
import EncryptedStorage from 'react-native-encrypted-storage';

export const SecureStorageService = {
  setItem: async (key: string, value: string) => {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      console.error('SecureStorage setItem error', error);
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      console.error('SecureStorage getItem error', error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('SecureStorage removeItem error', error);
    }
  },
};
```

### 12.3 Firebase Authentication

**Phone Authentication (Primary)**

```typescript
// services/authService.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { collections } from '../firebase/collections';

export const AuthService = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber: string) => {
    try {
      // Format: +91XXXXXXXXXX
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return confirmation;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (confirmation: any, otp: string) => {
    try {
      const credential = await confirmation.confirm(otp);
      const user = credential.user;

      // Create/update user document
      await collections.users.doc(user.uid).set({
        userId: user.uid,
        phoneNumber: user.phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastLogin: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      return user;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  // Anonymous sign-in (for guest users)
  signInAnonymously: async () => {
    try {
      const userCredential = await auth().signInAnonymously();
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth().currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: any) => void) => {
    return auth().onAuthStateChanged(callback);
  },
};
```

**Usage in App**

```typescript
// App.tsx
import React, { useEffect, useState } from 'react';
import { AuthService } from './services/authService';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
```

### 12.4 Firestore Security with Authentication

All Firestore operations automatically include the user's authentication token, which is validated by security rules.

```typescript
// Example: Creating appointment with authenticated user
const createAppointment = async (appointmentData) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  // User ID is automatically verified by Firestore security rules
  const appointment = {
    ...appointmentData,
    userId: user.uid, // Secured by rules
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  const docRef = await collections.appointments.add(appointment);
  return docRef.id;
};
```

---

## 13. Offline Support (Firebase)

### 13.1 Firestore Offline Persistence

Firebase Firestore provides built-in offline persistence automatically.

```typescript
// firebase/config.ts
import firestore from '@react-native-firebase/firestore';

// Enable offline persistence (enabled by default in React Native)
firestore().settings({
  persistence: true, // Enable offline persistence
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED, // Unlimited cache
});

// Firestore automatically:
// - Caches data locally when online
// - Serves cached data when offline
// - Syncs changes when connection is restored
```

### 13.2 Offline Detection

```typescript
// hooks/useNetworkStatus.ts
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
      setIsInternetReachable(state.isInternetReachable ?? true);
    });

    return () => unsubscribe();
  }, []);

  return { isConnected, isInternetReachable, isOnline: isConnected && isInternetReachable };
};
```

### 13.3 Handling Offline Writes

```typescript
// services/offlineService.ts
import firestore from '@react-native-firebase/firestore';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const OfflineService = {
  // Firestore automatically queues writes when offline
  // and syncs when back online

  createAppointmentOffline: async (appointmentData: any) => {
    // This will work offline and sync when online
    try {
      const docRef = await firestore()
        .collection('appointments')
        .add(appointmentData);

      return docRef.id;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Listen to pending writes
  monitorPendingWrites: (callback: (hasPendingWrites: boolean) => void) => {
    return firestore().collection('appointments').onSnapshot(
      { includeMetadataChanges: true },
      (snapshot) => {
        callback(snapshot.metadata.hasPendingWrites);
      }
    );
  },
};
```

### 13.4 Offline UI Indicators

```typescript
// components/common/OfflineIndicator.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <View style={styles.offlineBanner}>
      <Text style={styles.offlineText}>
        You're offline. Changes will sync when you're back online.
      </Text>
    </View>
  );
};

// Usage in App.tsx
const App = () => {
  return (
    <>
      <OfflineIndicator />
      <RootNavigator />
    </>
  );
};
```

---

## 14. Push Notifications

### 14.1 Firebase Cloud Messaging Setup

```typescript
// services/notificationService.ts
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const NotificationService = {
  requestPermission: async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted');
    }
  },

  getFCMToken: async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  },

  onMessageReceived: (callback: (message: any) => void) => {
    return messaging().onMessage(callback);
  },

  setBackgroundMessageHandler: () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background notification:', remoteMessage);
    });
  },
};

// In App.tsx
useEffect(() => {
  NotificationService.requestPermission();
  NotificationService.getFCMToken();
  NotificationService.setBackgroundMessageHandler();

  const unsubscribe = NotificationService.onMessageReceived((message) => {
    // Show in-app notification
    Alert.alert(message.notification.title, message.notification.body);
  });

  return unsubscribe;
}, []);
```

### 14.2 Local Notifications

```typescript
// Use @notifee/react-native for rich local notifications
import notifee from '@notifee/react-native';

export const LocalNotificationService = {
  displayNotification: async (title: string, body: string) => {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'appointments',
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  },

  scheduleNotification: async (title: string, body: string, timestamp: number) => {
    await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId: 'appointments',
        },
      },
      {
        type: 'timestamp',
        timestamp,
      }
    );
  },
};
```

---

## 15. Third-Party Integrations

### 15.1 Google Maps Integration

```typescript
// components/common/MapView.tsx
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface CustomMapViewProps {
  latitude: number;
  longitude: number;
  markerTitle: string;
}

const CustomMapView: React.FC<CustomMapViewProps> = ({ latitude, longitude, markerTitle }) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={{ latitude, longitude }} title={markerTitle} />
    </MapView>
  );
};
```

### 15.2 Voice Recognition

```typescript
// hooks/useVoiceSearch.ts
import Voice from '@react-native-voice/voice';
import { useState, useEffect } from 'react';

export const useVoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e) => setTranscript(e.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async (language: 'en-IN' | 'te-IN') => {
    try {
      await Voice.start(language);
    } catch (error) {
      console.error('Voice start error', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Voice stop error', error);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};

// Usage in component
const SearchScreen = () => {
  const { i18n } = useTranslation();
  const { transcript, isListening, startListening, stopListening } = useVoiceSearch();

  const handleVoicePress = () => {
    const voiceLanguage = i18n.language === 'te' ? 'te-IN' : 'en-IN';
    startListening(voiceLanguage);
  };

  useEffect(() => {
    if (transcript) {
      handleSearch(transcript);
    }
  }, [transcript]);

  return <VoiceButton onPress={handleVoicePress} isListening={isListening} />;
};
```

### 15.3 Calendar Integration

```typescript
// services/calendarService.ts
import * as Calendar from 'react-native-calendar-events';

export const CalendarService = {
  requestPermission: async () => {
    const status = await Calendar.requestCalendarPermissionsAsync();
    return status.granted;
  },

  addAppointmentToCalendar: async (appointment: Appointment) => {
    const hasPermission = await CalendarService.requestPermission();
    if (!hasPermission) return;

    const calendars = await Calendar.getCalendarsAsync();
    const primaryCalendar = calendars.find((cal) => cal.isPrimary);

    if (primaryCalendar) {
      await Calendar.createEventAsync(primaryCalendar.id, {
        title: `Dr. ${appointment.doctorName}`,
        startDate: new Date(appointment.dateTime),
        endDate: new Date(appointment.dateTime + 30 * 60 * 1000), // 30 min
        location: appointment.hospitalAddress,
        notes: `Appointment Ref: ${appointment.referenceNumber}`,
        alarms: [{ relativeOffset: -60 }, { relativeOffset: -1440 }], // 1 hour and 1 day before
      });
    }
  },
};
```

---

## 16. Build and Deployment

### 16.1 Environment Configuration

```bash
# .env.development
API_BASE_URL=https://dev-api.appointhealthap.in
GOOGLE_MAPS_API_KEY=AIzaSy...
FIREBASE_APP_ID=1:1234567890:android:abc123...
ENVIRONMENT=development

# .env.production
API_BASE_URL=https://api.appointhealthap.in
GOOGLE_MAPS_API_KEY=AIzaSy...
FIREBASE_APP_ID=1:1234567890:android:xyz789...
ENVIRONMENT=production
```

```typescript
// config/env.ts
import Config from 'react-native-config';

export const ENV = {
  API_BASE_URL: Config.API_BASE_URL,
  GOOGLE_MAPS_API_KEY: Config.GOOGLE_MAPS_API_KEY,
  FIREBASE_APP_ID: Config.FIREBASE_APP_ID,
  ENVIRONMENT: Config.ENVIRONMENT,
};
```

### 16.2 Build Scripts

```json
// package.json
{
  "scripts": {
    "android": "react-native run-android",
    "android:dev": "ENVFILE=.env.development react-native run-android",
    "android:prod": "ENVFILE=.env.production react-native run-android",
    "build:android:release": "cd android && ./gradlew assembleRelease",
    "build:android:bundle": "cd android && ./gradlew bundleRelease",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### 16.3 Android Build Configuration

**android/app/build.gradle**

```gradle
android {
    compileSdkVersion 34
    buildToolsVersion "34.0.0"

    defaultConfig {
        applicationId "com.appointhealthap"
        minSdkVersion 26  // Android 8.0
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
        multiDexEnabled true
    }

    signingConfigs {
        release {
            storeFile file('release.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }

    buildTypes {
        debug {
            applicationIdSuffix ".dev"
            resValue "string", "app_name", "Appoint Health AP (Dev)"
        }
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
            resValue "string", "app_name", "Appoint Health AP"
        }
    }

    splits {
        abi {
            reset()
            enable true
            universalApk true
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }
}
```

### 16.4 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/android-build.yml
name: Android Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: yarn install

      - name: Run tests
        run: yarn test

      - name: Lint
        run: yarn lint

      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Build Android Release
        run: |
          cd android
          ./gradlew assembleRelease
        env:
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}

      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/app-release.apk
```

---

## 17. Testing Strategy

### 17.1 Unit Testing (Jest)

```typescript
// __tests__/services/doctorService.test.ts
import { doctorService } from '../../src/services/doctorService';
import { doctorsApi } from '../../src/api/endpoints/doctors';

jest.mock('../../src/api/endpoints/doctors');

describe('DoctorService', () => {
  describe('searchDoctors', () => {
    it('should fetch doctors from API when online', async () => {
      const mockDoctors = [{ id: '1', name: 'Dr. Smith' }];
      (doctorsApi.searchDoctors as jest.Mock).mockResolvedValue({ data: mockDoctors });

      const result = await doctorService.searchDoctors({ symptoms: 'fever' });

      expect(result.data).toEqual(mockDoctors);
      expect(doctorsApi.searchDoctors).toHaveBeenCalledWith({ symptoms: 'fever' });
    });
  });
});
```

### 17.2 Component Testing (React Native Testing Library)

```typescript
// __tests__/components/DoctorCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DoctorCard from '../../src/components/doctors/DoctorCard/DoctorCard';

describe('DoctorCard', () => {
  const mockDoctor = {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiologist',
    rating: 4.5,
    consultationFee: 500,
    distance: 2.3,
    aarogyasriAccepted: true,
  };

  it('renders doctor information correctly', () => {
    const { getByText } = render(<DoctorCard doctor={mockDoctor} onPress={() => {}} />);

    expect(getByText('Dr. Rajesh Kumar')).toBeTruthy();
    expect(getByText('Cardiologist')).toBeTruthy();
    expect(getByText('₹500')).toBeTruthy();
  });

  it('calls onPress when card is tapped', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<DoctorCard doctor={mockDoctor} onPress={onPressMock} />);

    fireEvent.press(getByTestId('doctor-card'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

### 17.3 E2E Testing (Detox)

```typescript
// e2e/bookingFlow.e2e.ts
describe('Appointment Booking Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should allow user to search for doctors and book appointment', async () => {
    // Search for doctor
    await element(by.id('search-input')).typeText('fever');
    await element(by.id('search-button')).tap();

    // Wait for results
    await waitFor(element(by.id('doctor-list')))
      .toBeVisible()
      .withTimeout(5000);

    // Tap first doctor
    await element(by.id('doctor-card-0')).tap();

    // Book appointment
    await element(by.id('book-button')).tap();

    // Fill form
    await element(by.id('patient-name')).typeText('Test User');
    await element(by.id('patient-mobile')).typeText('9876543210');

    // Submit
    await element(by.id('confirm-booking')).tap();

    // Verify confirmation
    await expect(element(by.text('Appointment Confirmed!'))).toBeVisible();
  });
});
```

---

## 18. Accessibility

### 18.1 Accessibility Implementation

```typescript
// components/common/AccessibleButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### 18.2 Screen Reader Support

```typescript
// All important elements should have accessibility props
<View accessible={true} accessibilityLabel="Doctor profile">
  <Image
    source={{ uri: doctor.photo }}
    accessible={true}
    accessibilityLabel={`Photo of ${doctor.name}`}
  />
  <Text accessible={true} accessibilityRole="header">
    {doctor.name}
  </Text>
</View>
```

---

## Appendix

### A. Key Dependencies

```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "@tanstack/react-query": "^5.15.0",
    "i18next": "^23.7.8",
    "react-i18next": "^13.5.0",
    "react-native-localize": "^3.0.4",
    "react-native-mmkv": "^2.11.0",
    "react-native-paper": "^5.11.3",
    "react-native-maps": "^1.10.0",
    "@react-native-voice/voice": "^3.2.4",
    "@react-native-firebase/app": "^19.0.1",
    "@react-native-firebase/firestore": "^19.0.1",
    "@react-native-firebase/auth": "^19.0.1",
    "@react-native-firebase/storage": "^19.0.1",
    "@react-native-firebase/messaging": "^19.0.1",
    "@react-native-firebase/analytics": "^19.0.1",
    "@react-native-firebase/crashlytics": "^19.0.1",
    "@react-native-firebase/functions": "^19.0.1",
    "@react-native-firebase/remote-config": "^19.0.1",
    "@react-native-firebase/performance": "^19.0.1",
    "react-native-config": "^1.5.1",
    "react-native-fast-image": "^8.6.3",
    "@react-native-community/netinfo": "^11.1.0",
    "react-native-image-picker": "^7.0.3",
    "react-native-share": "^10.0.2"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "jest": "^29.7.0",
    "@testing-library/react-native": "^12.4.2",
    "detox": "^20.14.8",
    "firebase-tools": "^13.0.0"
  }
}
```

### B. Firebase Security Rules

**Firestore Security Rules** (`firebase/firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Doctors collection - Read only for users
    match /doctors/{doctorId} {
      allow read: if true; // Public read access
      allow write: if false; // Only admins can write (via Cloud Functions)
    }

    // Appointments collection
    match /appointments/{appointmentId} {
      allow create: if isAuthenticated() &&
                      request.resource.data.userId == request.auth.uid;

      allow read: if isAuthenticated() &&
                     resource.data.userId == request.auth.uid;

      allow update: if isAuthenticated() &&
                      resource.data.userId == request.auth.uid &&
                      request.resource.data.userId == resource.data.userId; // Can't change userId

      allow delete: if false; // Soft delete only via status update
    }

    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false; // No deletion allowed
    }

    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true; // Public read
      allow create: if isAuthenticated() &&
                      request.resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() &&
                      resource.data.userId == request.auth.uid;
      allow delete: if isAuthenticated() &&
                      resource.data.userId == request.auth.uid;
    }

    // Search history
    match /search_history/{historyId} {
      allow read, write: if isAuthenticated() &&
                           resource.data.userId == request.auth.uid;
    }
  }
}
```

**Cloud Storage Security Rules** (`firebase/storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Doctor photos - Public read, admin write only
    match /doctors/{doctorId}/{fileName} {
      allow read: if true;
      allow write: if false; // Only via Cloud Functions
    }

    // User uploads (prescriptions, documents)
    match /users/{userId}/{fileName} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null &&
                     request.auth.uid == userId &&
                     request.resource.size < 5 * 1024 * 1024 && // Max 5MB
                     request.resource.contentType.matches('image/.*');
    }
  }
}
```

### C. Firebase Cloud Functions Package.json

**firebase/functions/package.json**

```json
{
  "name": "functions",
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "shell": "npm run build && firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "18"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^4.5.0",
    "axios": "^1.6.0",
    "twilio": "^4.19.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0"
  },
  "private": true
}
```

### B. Folder Size Estimates

```
src/
├── api/              (~10 KB)
├── assets/           (~5 MB - images, fonts)
├── components/       (~100 KB)
├── database/         (~30 KB)
├── hooks/            (~20 KB)
├── locales/          (~50 KB)
├── navigation/       (~15 KB)
├── screens/          (~150 KB)
├── services/         (~80 KB)
├── store/            (~50 KB)
├── types/            (~20 KB)
└── utils/            (~30 KB)

Total app size (release APK): ~15-20 MB
```

---

---

**END OF ARCHITECTURE SPECIFICATION**

---

**Document Version**: 2.0 - Firebase Edition
**Last Updated**: October 8, 2025
**Target Platform**: React Native (Android primary)
**Backend**: Firebase (Backend-as-a-Service)
**Based on PRD**: v1.0 - Andhra Pradesh Edition

## Key Benefits of Firebase Architecture

1. **Reduced Development Time**: No need to build and maintain custom backend infrastructure
2. **Built-in Offline Support**: Firestore automatically handles offline caching and sync
3. **Real-time Updates**: Live data synchronization for appointments and doctor availability
4. **Scalability**: Firebase auto-scales to handle growing user base
5. **Security**: Built-in authentication and security rules
6. **Cost-Effective**: Pay-as-you-grow pricing model
7. **Analytics & Monitoring**: Integrated analytics, crashlytics, and performance monitoring
8. **Cloud Functions**: Serverless backend logic for complex operations
9. **Easy Integration**: Official React Native Firebase library with excellent documentation
10. **Fast Time-to-Market**: MVP can be deployed in weeks instead of months
