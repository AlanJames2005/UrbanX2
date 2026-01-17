# UrbanX Project Structure

## Directory Overview

```
urbanx/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── lib/            # Utility libraries and configurations
│   ├── pages/          # Page components (routes)
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component with routing
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles and design system
├── .env.example        # Environment variables template
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite build configuration
```

## Source Code Structure

### `/src/components` - UI Components

- **MainLayout.tsx** - Main application layout wrapper
  - Includes sidebar and navbar
  - Manages responsive layout

- **Sidebar.tsx** - Left navigation sidebar
  - Collapsible design
  - Navigation links with icons
  - User profile section

- **Navbar.tsx** - Top navigation bar
  - Search functionality
  - Notifications bell
  - Sign out button

- **ProtectedRoute.tsx** - Route protection wrapper
  - Checks authentication status
  - Redirects to login if not authenticated
  - Shows loading state

### `/src/contexts` - State Management

- **AuthContext.tsx** - Authentication state
  - User session management
  - Sign in/up/out functions
  - Auth state persistence

- **SidebarContext.tsx** - Sidebar state
  - Open/close state
  - Toggle function
  - Responsive behavior

### `/src/lib` - Utilities

- **supabase.ts** - Supabase client configuration
  - Database connection
  - Authentication setup
  - Type-safe client

### `/src/pages` - Application Pages

- **Home.tsx** - Landing page
  - Features showcase
  - Call-to-action buttons
  - Statistics display

- **Login.tsx** - User authentication
  - Email/password form
  - Error handling
  - Redirect after login

- **Register.tsx** - User registration
  - Account creation form
  - Password validation
  - Success messaging

- **Dashboard.tsx** - Main dashboard
  - Statistics cards
  - Recent activity feed
  - System status
  - Quick actions

- **MapView.tsx** - Interactive map
  - Leaflet integration
  - Custom markers
  - Popup information
  - Filter controls

- **Complaints.tsx** - Complaint management
  - List view
  - Filtering options
  - Status badges
  - Search functionality

- **Alerts.tsx** - Risk alert monitoring
  - Severity-based organization
  - Status filtering
  - Alert details

- **Report.tsx** - Issue reporting form
  - Multi-field form
  - Department selection
  - Location input
  - Form validation

- **Settings.tsx** - User settings
  - Profile management
  - Password change
  - Notification preferences

### `/src/types` - TypeScript Types

- **database.ts** - Supabase database types
  - Table row types
  - Insert types
  - Update types
  - Database schema types

### Root Files

- **App.tsx** - Main application
  - Router configuration
  - Context providers
  - Route definitions

- **main.tsx** - Entry point
  - React root mounting
  - CSS imports
  - Strict mode wrapper

- **index.css** - Global styles
  - Design system variables
  - Component classes
  - Animations
  - Utility classes

## Design System

### Color Palette

Located in `src/index.css`:

```css
--bg-primary: #0a0a0a      /* Main background */
--bg-secondary: #111111    /* Card backgrounds */
--bg-tertiary: #1a1a1a     /* Borders and accents */
--fg-primary: #ffffff      /* Primary text */
--fg-secondary: #a1a1aa    /* Secondary text */
--fg-tertiary: #71717a     /* Tertiary text */
--primary: #3b82f6         /* Blue - primary actions */
--accent: #8b5cf6          /* Purple - accents */
--success: #10b981         /* Green - success states */
--warning: #f59e0b         /* Orange - warnings */
--error: #ef4444           /* Red - errors */
```

### Component Classes

**Cards:**
- `.card-modern` - Modern card with hover effects

**Buttons:**
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button

**Inputs:**
- `.input-modern` - Styled form input

**Navigation:**
- `.nav-link` - Navigation link with hover
- `.nav-link.active` - Active navigation state

**Typography:**
- `.section-header` - Page section header
- `.section-subheader` - Section subheader

**Badges:**
- `.badge` - Base badge style
- `.badge-success` - Success badge
- `.badge-warning` - Warning badge
- `.badge-error` - Error badge
- `.badge-info` - Info badge

### Animations

- `fade-in` - Fade in animation
- `slide-up` - Slide up animation
- `slide-down` - Slide down animation
- `glow-blue` - Blue glow effect
- `glow-purple` - Purple glow effect

## Database Schema

### Tables

**departments**
- Stores city department information
- Fields: id, name, slug, description, timestamps

**complaints**
- Citizen-submitted complaints
- Fields: id, title, description, department, severity, status, location, coordinates, contact info, timestamps

**projects**
- Infrastructure projects
- Fields: id, title, description, department, status, priority, location, coordinates, dates, budget, progress, timestamps

**risk_alerts**
- Safety and infrastructure alerts
- Fields: id, title, description, severity, category, location, coordinates, status, reporter info, timestamps

### Row Level Security (RLS)

All tables have RLS enabled with policies for:
- Public read access (transparency)
- Authenticated write access
- Department-based access control

## Routing Structure

```
/ (Home)                    - Landing page
├── /login                  - User login
├── /register               - User registration
└── Protected Routes (require auth):
    ├── /dashboard          - Main dashboard
    ├── /map               - Interactive map
    ├── /complaints        - Complaint list
    ├── /alerts            - Risk alerts
    ├── /report            - Report new issue
    └── /settings          - User settings
```

## Key Features

### Authentication Flow
1. User visits site → Home page
2. Click "Get Started" → Register page
3. Create account → Auto login
4. Redirect to Dashboard

### Data Flow
1. Component loads → Fetch from Supabase
2. Display loading state
3. Render data with React
4. Real-time updates via Supabase subscriptions (optional)

### Map Integration
1. Leaflet map container
2. Custom icon creation
3. Marker placement from database
4. Popup information display
5. Filter controls

## Development Workflow

### Adding a New Page

1. Create page component in `src/pages/NewPage.tsx`
2. Import in `src/App.tsx`
3. Add route in the Routes section
4. Add navigation link in `src/components/Sidebar.tsx`
5. Update types if needed

### Styling Guidelines

1. Use Tailwind utility classes
2. Follow existing color scheme
3. Use component classes for consistency
4. Add animations for better UX
5. Ensure responsive design

### Database Operations

1. Import `supabase` from `src/lib/supabase.ts`
2. Use `await supabase.from('table').select()`
3. Handle errors appropriately
4. Show loading states
5. Update UI on success

## Build and Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production
```bash
npm run preview
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## Best Practices

### Component Structure
- Keep components focused and single-purpose
- Extract reusable logic into hooks
- Use TypeScript for type safety
- Handle loading and error states

### Performance
- Lazy load routes if needed
- Optimize images
- Minimize bundle size
- Use React.memo for expensive renders

### Security
- Never expose API keys in client code
- Use environment variables
- Implement RLS on all tables
- Validate user input

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Maintain color contrast

## Future Enhancements

Potential features to add:
- Real-time notifications with Supabase subscriptions
- File upload for complaint images
- Advanced analytics dashboard
- Department-specific dashboards
- Mobile app with React Native
- AI-powered conflict detection
- Automated workflow triggers
- Email notifications
- PDF report generation
- Data export functionality
