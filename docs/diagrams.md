# Family Care Platform - System Diagrams

## 1. Patient-Caregiver Matching Flow

```mermaid
sequenceDiagram
    participant P as Patient
    participant App as Family Care App
    participant API as Backend API
    participant DB as PostgreSQL
    participant AI as AI Matching System
    participant WS as WebSocket

    P->>App: Access patient dashboard
    App->>API: GET /matches?limit=3
    API->>DB: Query patient profile & preferences
    DB-->>API: Return patient data
    API->>DB: Query available caregivers
    DB-->>API: Return caregiver profiles
    API->>AI: Process matching algorithm
    Note over AI: Xenova/all-MiniLM-L6-v2<br/>Semantic similarity + Location scoring
    AI-->>API: Return ranked matches
    API-->>App: Return matched caregivers
    App->>P: Display MatchedCaregivers component
    P->>App: Select caregiver
    App->>API: GET /caregivers/{id}
    API->>DB: Query caregiver details
    DB-->>API: Return caregiver profile
    API-->>App: Return caregiver details
    App->>P: Show caregiver details
    P->>App: Initiate chat
    App->>WS: Connect to chat room
    WS-->>App: Establish connection
    App->>P: Open chat interface
```

## 2. Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant App as Family Care App
    participant API as Backend API
    participant DB as PostgreSQL
    participant Google as Google OAuth

    U->>App: Open app
    App->>U: Show role selection
    U->>App: Select role (Caregiver/Patient)
    App->>U: Show registration form
    U->>App: Choose auth method (Email/Google)
    
    alt Email Registration
        U->>App: Enter email/password
        App->>API: POST /register
        API->>DB: Create user account
        DB-->>API: User created
        API-->>App: Return JWT tokens
    else Google OAuth
        U->>Google: Authenticate with Google
        Google-->>U: Return access token
        U->>App: Google token
        App->>API: POST /auth/google
        API->>DB: Create/update user
        DB-->>API: User data
        API-->>App: Return JWT tokens
    end
    
    App->>U: Store tokens securely
    App->>U: Redirect to profile setup
    U->>App: Complete profile information
    App->>API: PUT /profile
    API->>DB: Update user profile
    DB-->>API: Profile updated
    
    alt Caregiver Role
        App->>U: Show verification upload
        U->>App: Upload documents
        App->>API: POST /caregivers/verification
        API->>DB: Store verification docs
        DB-->>API: Verification stored
    end
    
    App->>U: Redirect to main dashboard
```

## 3. UI Component Structure (Family Care App)

```mermaid
graph TD
    A[App Root] --> B[Protected Layout]
    A --> C[Auth Layout]
    
    B --> D[Caregiver User]
    B --> E[Patient User]
    B --> F[Shared Components]
    
    D --> G[Caregiver Dashboard]
    D --> H[Caregiver Profile]
    D --> I[Patient Management]
    
    E --> J[Patient Dashboard]
    E --> K[Patient Profile]
    E --> L[Caregiver Search]
    E --> M[Matched Caregivers]
    
    F --> N[Chat System]
    F --> O[Notifications]
    F --> P[Profile Management]
    
    %% Shared Components
    F --> Q[Auth Components]
    F --> R[UI Components]
    F --> S[Global Components]
    
    Q --> T[AuthLayout]
    Q --> U[AuthInputs]
    Q --> V[AuthProviders]
    Q --> W[AuthOTP]
    
    R --> X[Button]
    R --> Y[TextInput]
    R --> Z[Select]
    R --> AA[Loading]
    
    S --> BB[BlurredCircles]
    S --> CC[QuickActionCard]
    S --> DD[Section]
    S --> EE[PendingActions]
    
    %% Feature Components
    N --> FF[ChatList]
    N --> GG[ChatDetail]
    N --> HH[ChatInput]
    N --> II[ChatBubble]
    
    O --> JJ[NotificationBell]
    O --> KK[NotificationItem]
    O --> LL[EmptyNotifications]
    
    P --> MM[ProfileLayout]
    P --> NN[ProfileInput]
    P --> OO[DateInput]
    P --> PP[PhotoPickerSheet]
    
    %% Caregiver Components
    G --> QQ[CaregiverStatusCard]
    G --> RR[GreetingHeader]
    G --> SS[HomeHeader]
    
    %% Patient Components
    L --> TT[SearchBar]
    L --> UU[FilterModal]
    L --> VV[CaregiverCard]
    M --> WW[MatchedCaregivers]
    M --> XX[SectionHeader]
```

## 4. State Management Flow - Zustand Store

```mermaid
graph TD
    A[User Store] --> B[User State]
    A --> C[Auth State]
    A --> D[Profile State]
    
    B --> E[user: User | null]
    B --> F[loadProfile: Function]
    B --> G[updateUser: Function]
    B --> H[logout: Function]
    
    C --> I[isAuthenticated: boolean]
    C --> J[accessToken: string]
    C --> K[refreshToken: string]
    
    D --> L[profileLoading: boolean]
    D --> M[profileError: string]
    
    %% Store Actions
    N[setUser] --> B
    O[loadProfile] --> B
    P[updateUser] --> B
    Q[logout] --> B
    
    %% Component Usage
    R[Auth Components] --> A
    S[Profile Components] --> A
    T[Chat Components] --> A
    U[Navigation] --> A
    
    %% State Updates
    V[API Calls] --> W[Update Store]
    W --> A
    
    %% Persistence
    X[AsyncStorage] --> Y[Token Persistence]
    Y --> A
```

## 5. State Management Comparison

| Feature | Zustand | Redux | Context API |
|---------|---------|-------|-------------|
| **Bundle Size** | ~2KB | ~14KB | Built-in |
| **Boilerplate** | Minimal | High | Medium |
| **TypeScript** | Excellent | Good | Good |
| **DevTools** | Yes | Excellent | Limited |
| **Performance** | Good | Good | Poor (re-renders) |
| **Learning Curve** | Easy | Steep | Easy |
| **Middleware** | No | Yes | No |
| **Our Choice** | ✅ **Zustand** | ❌ Redux | ❌ Context |

## 6. Real-time Chat Flow

```mermaid
sequenceDiagram
    participant P1 as Patient
    participant P2 as Caregiver
    participant App as Family Care App
    participant WS as WebSocket Server
    participant API as Backend API
    participant DB as PostgreSQL

    P1->>App: Open chat list
    App->>API: GET /chat
    API->>DB: Query user conversations
    DB-->>API: Return chat list
    API-->>App: Return conversations
    App->>P1: Display chat list
    
    P1->>App: Select conversation
    App->>WS: Join chat room
    WS-->>App: Room joined
    App->>API: GET /chat/{id}/messages
    API->>DB: Query messages
    DB-->>API: Return messages
    API-->>App: Return chat history
    App->>P1: Display chat interface
    
    P1->>App: Type message
    App->>WS: Send message
    WS->>P2: Deliver message (real-time)
    WS->>DB: Store message
    DB-->>WS: Message stored
    WS-->>App: Message sent confirmation
    
    P2->>App: Receive message
    App->>P2: Show notification
    P2->>App: Open chat
    P2->>App: Type reply
    App->>WS: Send reply
    WS->>P1: Deliver reply (real-time)
```

## 7. Caregiver Verification Flow

```mermaid
sequenceDiagram
    participant C as Caregiver
    participant App as Family Care App
    participant API as Backend API
    participant DB as PostgreSQL
    participant Storage as File Storage

    C->>App: Complete profile setup
    App->>C: Show verification form
    C->>App: Select document type
    C->>App: Upload document photo
    C->>App: Take selfie photo
    App->>API: POST /caregivers/verification
    API->>Storage: Upload document files
    Storage-->>API: Return file URLs
    API->>DB: Store verification data
    DB-->>API: Verification stored
    API-->>App: Verification submitted
    App->>C: Show pending status
    
    Note over C,App: Admin Review Process
    Note over API,DB: Admin approves/rejects verification
    API->>C: Send notification (approved/rejected)
    App->>C: Update verification status
```

## 8. File Upload Flow

```mermaid
sequenceDiagram
    participant U as User
    participant App as Family Care App
    participant Picker as Image Picker
    participant API as Backend API
    participant Storage as File Storage

    U->>App: Trigger photo upload
    App->>Picker: Open image picker
    Picker->>U: Show camera/gallery options
    U->>Picker: Select image
    Picker-->>App: Return image URI
    
    App->>App: Compress image
    App->>App: Create FormData
    App->>API: POST /profile/photo
    API->>Storage: Upload file
    Storage-->>API: Return public URL
    API->>DB: Update user profile
    DB-->>API: Profile updated
    API-->>App: Return updated profile
    App->>U: Update UI with new photo
```

## 9. Notification System Flow

```mermaid
sequenceDiagram
    participant S as System
    participant API as Backend API
    participant WS as WebSocket
    participant App as Family Care App
    participant U as User

    S->>API: Trigger notification event
    API->>DB: Create notification record
    DB-->>API: Notification created
    API->>WS: Broadcast notification
    WS->>App: Send real-time notification
    App->>U: Show notification badge
    App->>U: Display toast message
    
    U->>App: Open notification center
    App->>API: GET /notifications
    API->>DB: Query user notifications
    DB-->>API: Return notifications
    API-->>App: Return notification list
    App->>U: Display notifications
    
    U->>App: Mark as read
    App->>API: PUT /notifications/{id}/read
    API->>DB: Update read status
    DB-->>API: Status updated
    API-->>App: Confirmation
    App->>U: Update UI
```

## 10. Family Care Platform Limitations vs Roadmap

| Current Limitation | Impact | Planned Fix | Timeline |
|-------------------|--------|-------------|----------|
| **No Video Call** | Limited communication options | WebRTC + Expo SDK integration | Q2 2024 |
| **Basic Chat** | Text-only messaging | Rich media support (images, files) | Q1 2024 |
| **No Analytics** | No usage insights | Dashboard with usage statistics | Q3 2024 |
| **Limited Search** | Basic filtering | Advanced AI-powered search | Q2 2024 |
| **No Offline Mode** | Requires internet | Offline data sync | Q4 2024 |
| **No Push Notifications** | Manual app checking | Firebase Cloud Messaging | Q1 2024 |
| **No Payment Integration** | Manual payment tracking | Stripe/Paystack integration | Q3 2024 |
| **No Emergency Features** | No emergency protocols | SOS button + emergency contacts | Q2 2024 |
| **Limited File Types** | Images only | Document uploads (PDF, DOC) | Q1 2024 |
| **No Voice Messages** | Text-only chat | Voice message recording | Q2 2024 |

## 11. System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend - Family Care App"
        A[React Native + Expo]
        B[TypeScript]
        C[Tailwind CSS]
        D[Zustand Store]
    end
    
    subgraph "Backend - Express API"
        E[Express.js]
        F[TypeScript]
        G[Prisma ORM]
        H[JWT Auth]
    end
    
    subgraph "Database"
        I[PostgreSQL]
        J[File Storage]
    end
    
    subgraph "Real-time"
        K[Socket.io]
        L[WebSocket Server]
    end
    
    subgraph "AI Services"
        M[Xenova Transformers]
        N[Semantic Matching]
        O[Location Scoring]
    end
    
    A --> E
    E --> I
    E --> K
    K --> L
    E --> M
    M --> N
    M --> O
```

## 12. Data Flow Architecture

```mermaid
flowchart TD
    A[User Input] --> B[Form Validation]
    B --> C[API Request]
    C --> D[Authentication]
    D --> E[Business Logic]
    E --> F[Database]
    F --> G[Response]
    G --> H[State Update]
    H --> I[UI Update]
    
    J[Real-time Event] --> K[WebSocket]
    K --> L[State Update]
    L --> I
    
    M[File Upload] --> N[Storage Service]
    N --> O[Database Update]
    O --> G
```

---

**Family Care Platform** - Comprehensive healthcare connection platform with intelligent matching and real-time communication. 