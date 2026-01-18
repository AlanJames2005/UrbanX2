# UrbanX - Smart City Management Platform

A modern, comprehensive web application for municipal management and citizen services. UrbanX provides city administrators, department heads, and citizens with tools to manage urban infrastructure, track complaints, monitor projects, and respond to risk alerts in real-time.

## Features

- **Dashboard Overview**: Real-time statistics and activity monitoring
- **Interactive Map**: Visualize complaints, projects, and alerts on a city map
- **Complaint Management**: Track and manage citizen complaints efficiently
- **Risk Alerts**: Monitor and respond to city-wide safety alerts
- **Project Tracking**: Monitor infrastructure projects with progress indicators
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- React Router DOM for navigation
- Leaflet for interactive maps
- Lucide React for icons

### Backend
- Supabase (PostgreSQL database)
- Supabase Auth for authentication
- Row Level Security (RLS) for data protection

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd urbanx
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - The database schema is already created automatically
   - Sample data has been populated for demonstration

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
   - Add your Google Maps API key (get from [Google Cloud Console](https://console.cloud.google.com)):
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
   - Enable these Google Maps APIs:
     - Maps JavaScript API
     - Geocoding API

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Database Schema

The platform uses four main tables:

### Departments
- Stores city department information
- Pre-populated with 6 departments (Roads, Water, Electricity, Telecom, Waste, Safety)

### Complaints
- Citizen-submitted issues and feedback
- Includes severity levels, status tracking, and location data

### Projects
- Infrastructure projects across departments
- Tracks progress, budget, and timeline

### Risk Alerts
- Safety and infrastructure alerts
- Multiple severity levels (critical, high, medium, low)

## Location Selection Features

The Report an Issue page includes advanced location selection capabilities:

### Interactive Map Selection
- **Google Maps Integration**: Click-to-select locations on an interactive map
- **India-Focused**: Map centered on India with appropriate zoom level
- **Visual Feedback**: Draggable markers with real-time position updates
- **Reverse Geocoding**: Automatic address resolution from selected coordinates

### Geotagged Photo Upload
- **EXIF Data Extraction**: Automatically reads GPS coordinates from photo metadata
- **Address Resolution**: Converts coordinates to readable addresses
- **User-Friendly**: No need for manual latitude/longitude entry
- **Error Handling**: Clear feedback for photos without location data

### Key Benefits
- **Accuracy**: Precise location data through visual selection or photo upload
- **User Experience**: Intuitive location selection without technical knowledge
- **Flexibility**: Multiple ways to specify location (map click, photo upload)
- **Offline Capability**: Photo-based location works without internet for coordinate extraction

## Usage

### First Time Setup

1. Register a new account at `/register`
2. Log in with your credentials
3. Explore the dashboard to see statistics and recent activity
4. View the interactive map to see complaints, projects, and alerts
5. Submit new complaints via the Report page

### Key Pages

- **Dashboard** (`/dashboard`): Overview of city operations
- **Map View** (`/map`): Interactive map with all markers
- **Complaints** (`/complaints`): Manage citizen complaints
- **Risk Alerts** (`/alerts`): Monitor safety alerts
- **Report Issue** (`/report`): Submit new complaints
- **Settings** (`/settings`): Configure user preferences

## Design System

The platform uses a modern dark theme with:

- **Primary Color**: Blue (#3b82f6)
- **Accent Color**: Purple (#8b5cf6)
- **Background**: Dark (#0a0a0a, #111111, #1a1a1a)
- **Typography**: Inter font family
- **Components**: Modern cards, buttons, and form inputs with hover effects

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Security

- All tables use Row Level Security (RLS)
- Authentication required for sensitive operations
- Public read access for transparency
- Secure password handling with Supabase Auth

## Contributing

This is a demo project for the UrbanX Smart City Management Platform.

## License

MIT License
