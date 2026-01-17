# UrbanX Quick Setup Guide

## Prerequisites

Before you begin, make sure you have:
- Node.js 18 or higher installed
- npm package manager
- A Supabase account (free tier is fine)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

Note: We use `--legacy-peer-deps` due to React version compatibility with react-leaflet.

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in your project details:
   - Project Name: UrbanX (or any name you prefer)
   - Database Password: Create a strong password
   - Region: Choose closest to your location
4. Wait for the project to be created (takes about 2 minutes)

### 3. Get Your Supabase Credentials

1. In your Supabase project dashboard, click on the "Settings" icon (gear icon) in the left sidebar
2. Click "API" in the settings menu
3. You'll see two important values:
   - **Project URL** (under Project URL section)
   - **anon/public key** (under Project API keys section)
4. Copy both values - you'll need them in the next step

### 4. Configure Environment Variables

1. In the project root, copy the `.env.example` file to create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and paste your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 5. Database Setup

Good news! The database schema and sample data are already set up automatically when you created your Supabase project. The following tables are ready:

- **departments** - City departments (Roads, Water, Electricity, etc.)
- **complaints** - Citizen complaints with sample data
- **projects** - Infrastructure projects with sample data
- **risk_alerts** - Risk alerts with sample data

You can verify this by:
1. Going to your Supabase dashboard
2. Clicking "Table Editor" in the left sidebar
3. You should see all 4 tables listed

### 6. Start the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 7. Create Your First Account

1. Navigate to `http://localhost:5173`
2. Click "Get Started" or "Create Account"
3. Fill in your details:
   - Name: Your name
   - Email: Any email address
   - Password: At least 6 characters
4. Click "Create Account"
5. You'll be automatically logged in and redirected to the dashboard

## Exploring the Application

### Main Features to Try:

1. **Dashboard** (`/dashboard`)
   - View statistics for projects, complaints, and alerts
   - See recent activity
   - Check system status

2. **Interactive Map** (`/map`)
   - View all complaints, projects, and alerts on a map
   - Filter by type using the toggle buttons
   - Click markers to see details

3. **Complaints** (`/complaints`)
   - Browse all citizen complaints
   - Filter by status and severity
   - See sample complaints with realistic data

4. **Risk Alerts** (`/alerts`)
   - Monitor active safety alerts
   - View alerts by severity (Critical, High, Medium, Low)
   - Filter by status

5. **Report Issue** (`/report`)
   - Submit a new complaint
   - Add location coordinates
   - Assign to a department

6. **Settings** (`/settings`)
   - Update your profile
   - Change password
   - Configure notifications

## Sample Data

The database comes pre-populated with:
- 6 departments (Roads, Water, Electricity, Telecom, Waste, Safety)
- 5 sample complaints
- 5 sample infrastructure projects
- 5 sample risk alerts

All sample data includes realistic:
- Titles and descriptions
- GPS coordinates (New York City area)
- Status and severity levels
- Timestamps

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure your `.env` file exists in the project root and contains valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values.

### Issue: Build warnings about chunk size
**Solution**: This is normal for development. The warnings suggest optimizations for production but don't affect functionality.

### Issue: Map not displaying
**Solution**:
1. Check your internet connection (maps load from OpenStreetMap)
2. Make sure you have data in the database with valid latitude/longitude values

### Issue: "Table not found" errors
**Solution**:
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. The migrations should have run automatically
4. If not, contact support as the schema was set up during project initialization

### Issue: Can't log in after creating account
**Solution**:
1. Supabase Auth might need a moment to process
2. Try refreshing the page
3. Make sure you're using the same email/password you registered with

## Production Deployment

To build for production:

```bash
npm run build
```

The optimized files will be in the `dist` directory. You can deploy them to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

Remember to set up your environment variables in your hosting platform's settings.

## Support

For issues or questions:
- Check the main README.md for detailed documentation
- Review the Supabase documentation at [supabase.com/docs](https://supabase.com/docs)
- Ensure all dependencies are properly installed

## Next Steps

1. Explore the codebase in `src/pages` to see how each feature works
2. Customize the design system in `src/index.css`
3. Add your own departments, projects, and features
4. Integrate with external APIs for real-world data

Enjoy building with UrbanX!
