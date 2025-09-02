src/
│
├── app/ # App-level setup (store, router, theme, etc.)
│ ├── store.js # Redux store or other global state config
│ ├── routes.js # React-router routes
│ └── ...  
│
├── assets/ # Static assets (images, fonts, icons)
│
├── components/ # Shared reusable components (buttons, inputs, layouts)
│
├── features/ # Feature-based folder (one folder per module/service)
│ ├── auth/ # Authentication Service
│ │ ├── components/ # Auth-specific UI components
│ │ ├── hooks/ # Custom hooks for auth
│ │ ├── services/ # API calls or logic (e.g., auth API)
│ │ ├── slices/ # Redux slices or state management files
│ │ ├── pages/ # Auth pages (login, register, reset password)
│ │ └── index.js # Exports for module
│ │
│ ├── studentManagement/ # Student Management Service
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── slices/
│ │ ├── pages/
│ │ └── index.js
│ │
│ ├── programCourseManagement/
│ │ ├── ...
│ │ └── index.js
│ │
│ ├── enrollment/
│ │ ├── ...
│ │ └── index.js
│ │
│ ├── attendanceTracking/
│ │ ├── ...
│ │ └── index.js
│ │
│ ├── assessmentGrading/
│ │ ├── ...
│ │ └── index.js
│ │
│ ├── feeManagement/
│ │ ├── ...
│ │ └── index.js
│ │
│ ├── timetableScheduling/
│ │ ├── ...
│ │ └── index.js
│ │
│ └── extendedFeatures/ # Library, Hostel, Transport, LMS, etc.
│ ├── libraryManagement/
│ ├── hostelManagement/
│ ├── transportManagement/
│ ├── lmsIntegration/
│ └── ...
│
├── hooks/ # Shared hooks across features
│
├── services/ # Shared services (e.g., API clients, utils)
│
├── utils/ # Shared utilities/helpers
│
├── styles/ # Global styles, tailwind config, variables
│
├── tests/ # Global test utilities or mocks
│
└── index.js # App entry point
