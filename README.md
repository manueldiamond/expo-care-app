# Expo Care App

A comprehensive healthcare platform that connects patients with qualified caregivers. Built with React Native, Expo, TypeScript, and Tailwind CSS.

## 🏗️ Architecture Overview

The Expo Care App is a cross-platform mobile application with the following architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Backend API   │    │   Database      │
│   React Native  │◄──►│   Express.js    │◄──►│   PostgreSQL    │
│   Expo          │    │   TypeScript    │    │   Prisma ORM    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   WebSocket     │
                       │   Socket.io     │
                       │   Real-time     │
                       └─────────────────┘
```

## 🎯 Core Features

### 👥 User Management
- **Multi-role System**: Caregiver and Patient roles with role-based navigation
- **Authentication**: JWT-based authentication with secure token storage
- **Profile Management**: Complete user profiles with photo uploads and contact information
- **Social Login**: Google OAuth integration for seamless sign-in
- **Password Security**: Secure password handling with form validation

### 🏥 Caregiver Management
- **Profile System**: Detailed caregiver profiles with qualifications and verification
- **Verification Process**: Document-based verification system with photo uploads
- **Qualifications**: Support for multiple qualifications with file uploads
- **Availability Management**: Real-time availability status updates
- **Status Dashboard**: Real-time status display with availability toggle

### 👤 Patient Management
- **Medical Profiles**: Comprehensive patient medical information
- **Caregiver Search**: Advanced search and filtering capabilities
- **Matched Caregivers**: AI-powered caregiver matching system
- **Caregiver Details**: Detailed caregiver profiles with contact options

### 💬 Real-time Communication
- **Chat System**: Real-time messaging between users
- **Chat List**: Organized conversation management
- **Message History**: Persistent chat history with read status
- **WebSocket Integration**: Socket.io for real-time messaging

### 🔔 Notifications
- **Notification Center**: Organized notification management
- **Read Status**: Notification read/unread tracking

### 📁 File Management
- **Photo Uploads**: Profile photo and document uploads
- **Image Picker**: Native image selection with camera/gallery options
- **Secure Storage**: Organized file storage with public URL mapping

## 🛠️ Technology Stack

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: Tailwind CSS (twrnc)
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Icons**: Expo Vector Icons
- **Real-time**: Socket.io client

### Development Tools
- **Package Manager**: Bun
- **Type Checking**: TypeScript
- **Code Quality**: ESLint
- **UI Components**: Custom component library
- **Toast Notifications**: React Native Toast Message

## 📁 Project Structure

```
expo-care-app/
├── app/                        # Expo Router pages
│   ├── (auth)/                # Authentication routes
│   │   ├── login.tsx          # Login screen
│   │   ├── register.tsx       # Registration screen
│   │   └── role-select.tsx    # Role selection
│   ├── (protected)/           # Protected routes
│   │   ├── caregiver-user/    # Caregiver-specific routes
│   │   │   └── (tabs)/       # Caregiver tab navigation
│   │   ├── patient-user/      # Patient-specific routes
│   │   │   └── (tabs)/       # Patient tab navigation
│   │   ├── chat/              # Chat system routes
│   │   ├── profile/           # Profile management routes
│   │   └── notifications.tsx  # Notifications screen
│   └── index.tsx              # App entry point
├── components/                 # Reusable components
│   ├── global/                # Global UI components
│   ├── ui/                    # Base UI components
│   ├── auth/                  # Authentication components
│   └── shared/                # Shared components
├── modules/                   # Feature modules
│   ├── auth/                  # Authentication module
│   ├── caregiver/             # Caregiver features
│   ├── patient/               # Patient features
│   ├── chat/                  # Chat system
│   ├── notifications/         # Notifications
│   └── profile/               # Profile management
├── contexts/                  # React contexts
├── hooks/                     # Custom React hooks
├── lib/                       # Library configurations
├── services/                  # API services
├── stores/                    # Zustand stores
├── types/                     # TypeScript types
├── utils/                     # Utility functions
└── assets/                    # Static assets
```

## 🎨 UI/UX Design

### Design System
- **Medical Theme**: Professional healthcare-focused design
- **Color Palette**: Medical blue, green, and neutral colors
- **Typography**: Inter, Poppins, and Roboto font families
- **Icons**: Material Icons and FontAwesome
- **Components**: Consistent component library with medical styling

### Key UI Components
- **Medical Cards**: Styled cards for content organization
- **Action Sheets**: Bottom sheet modals for actions
- **Loading States**: Custom loading components with medical branding
- **Toast Notifications**: User feedback with medical styling
- **Form Components**: Validated input components with error handling

## 🔐 Authentication & Security

### Authentication Flow
1. **Role Selection**: Users choose between Caregiver or Patient role
2. **Registration**: Email/password or Google OAuth registration
3. **Profile Setup**: Multi-step profile completion process
4. **Verification**: Caregivers complete verification process
5. **Token Management**: Secure JWT token storage and refresh

### Security Features
- **JWT Tokens**: Secure authentication with refresh tokens
- **Role-based Access**: Route protection based on user roles
- **Form Validation**: Zod schemas for input validation
- **Secure Storage**: Encrypted token storage
- **API Security**: HTTPS communication with backend

## 📱 Core Features Deep Dive

### Authentication Module
```typescript
// Multi-step authentication flow
1. Role Selection → 2. Registration → 3. Profile Setup → 4. Verification
```

**Key Components:**
- `AuthLayout`: Consistent authentication UI
- `AuthInputs`: Validated form inputs
- `AuthProviders`: Social login integration
- `AuthOTP`: OTP verification system

### Caregiver Module
```typescript
// Caregiver-specific features
- Profile Management
- Availability Toggle
- Qualification Upload
- Verification Process
- Patient Management
```

**Key Components:**
- `CaregiverStatusCard`: Real-time availability display
- `CaregiverActionSheet`: Patient interaction options
- `HomeHeader`: Caregiver dashboard header

### Patient Module
```typescript
// Patient-specific features
- Caregiver Search
- Matched Caregivers
- Caregiver Details
- Medical Records
```

**Key Components:**
- `MatchedCaregivers`: AI-powered caregiver matching
- `CaregiverCard`: Caregiver profile display
- `SearchBar`: Advanced search functionality
- `FilterModal`: Search filtering options

### Chat Module
```typescript
// Real-time messaging system
- Chat List
- Chat Detail
- Message Sending
- Read Status
```

**Key Components:**
- `ChatList`: Conversation management
- `ChatDetail`: Message interface
- `ChatInput`: Message composition
- `ChatBubble`: Message display

### Profile Module
```typescript
// Profile management system
- Personal Information
- Medical Information
- Caregiver Details
- Identity Verification
```

**Key Components:**
- `ProfileLayout`: Consistent profile UI
- `ProfileInput`: Form input components
- `DateInput`: Date picker component
- `PhotoPickerSheet`: Image upload interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Bun (recommended) or npm
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expo-care-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_URL="http://your-backend-url:port/api"
   EXPO_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
   ```

4. **Start the development server**
   ```bash
   bun run kai
   # or
   npm run kai
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   bun run ios
   
   # Android
   bun run android
   
   # Web
   bun run web
   ```

## 📡 API Integration

### Backend Communication
- **Base URL**: Configurable API endpoint
- **Authentication**: JWT token-based API calls
- **Error Handling**: Comprehensive error management
- **Loading States**: User-friendly loading indicators

### Key API Services
- **Auth Service**: Authentication and user management
- **Caregiver Service**: Caregiver-specific operations
- **Patient Service**: Patient and matching operations
- **Chat Service**: Real-time messaging
- **Profile Service**: Profile management

## 🎯 User Flows

### Caregiver Journey
1. **Registration**: Sign up as caregiver
2. **Profile Setup**: Complete personal and professional information
3. **Verification**: Upload documents for verification
4. **Dashboard**: Access caregiver dashboard
5. **Patient Management**: View assigned patients
6. **Chat**: Communicate with patients

### Patient Journey
1. **Registration**: Sign up as patient
2. **Profile Setup**: Complete medical information
3. **Caregiver Search**: Find and filter caregivers
4. **Matched Caregivers**: View AI-recommended caregivers
5. **Caregiver Details**: View detailed caregiver profiles
6. **Chat**: Communicate with caregivers

## 🔧 Development

### Available Scripts
```bash
# Development
bun run kai          # Start Expo development server
bun run android      # Run on Android
bun run ios          # Run on iOS
bun run web          # Run on web

# Building
bun run build        # Build for production
bun run export       # Export static files

# Code Quality
bun run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and style enforcement
- **Component Architecture**: Modular component design
- **State Management**: Zustand for global state
- **Form Validation**: Zod schemas for runtime validation

### Development Guidelines
- **Component Structure**: Consistent component organization
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management
- **Loading States**: User-friendly loading indicators
- **Accessibility**: Inclusive design principles

## 🎨 Design System

### Color Palette
```typescript
// Medical theme colors
medical-primary: '#2563EB'      // Primary blue
medical-secondary: '#059669'     // Success green
medical-accent: '#7C3AED'       // Accent purple
medical-warning: '#D97706'      // Warning orange
medical-error: '#DC2626'         // Error red
medical-neutral: '#F8FAFC'      // Neutral background
```

### Typography
```typescript
// Font families
'Inter-Regular': Inter_400Regular
'Inter-Medium': Inter_500Medium
'Inter-SemiBold': Inter_600SemiBold
'Inter-Bold': Inter_700Bold
'Poppins-Regular': Poppins_400Regular
'Poppins-Medium': Poppins_500Medium
'Poppins-SemiBold': Poppins_600SemiBold
'Poppins-Bold': Poppins_700Bold
```

### Component Library
- **Buttons**: Primary, secondary, and ghost variants
- **Inputs**: Text inputs with validation
- **Cards**: Medical-themed card components
- **Modals**: Bottom sheets and action sheets
- **Loading**: Custom loading components

## 🚀 Deployment

### Expo Build
```bash
# Build for production
bun run build

# EAS Build (Expo Application Services)
eas build --platform ios
eas build --platform android
```

### Environment Configuration
```env
EXPO_PUBLIC_API_URL="https://your-production-api.com/api"
EXPO_PUBLIC_GOOGLE_CLIENT_ID="your-production-google-client-id"
```

### App Store Deployment
1. **iOS**: Submit to App Store Connect
2. **Android**: Submit to Google Play Console
3. **Web**: Deploy to hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Expo Care App** - Connecting patients with qualified caregivers through a secure, real-time mobile platform.

### Roadmap
- 🔄 **Records System**: Medical records management
- 🔄 **Appointment Booking**: Scheduling system
- 🔄 **Assignment System**: Admin assignment management
- 🔄 **Advanced Analytics**: Usage analytics and reporting
