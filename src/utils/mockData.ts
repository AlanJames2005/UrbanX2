// Mock data for demonstration when Supabase is not configured
import type { Database } from '../types/database';

type Complaint = Database['public']['Tables']['complaints']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];
type RiskAlert = Database['public']['Tables']['risk_alerts']['Row'];

// Initialize empty arrays first
let mockComplaints: Complaint[] = [];
let mockProjects: Project[] = [];
let mockAlerts: RiskAlert[] = [];

// Mock Supabase client implementation
class MockSupabaseClient {
  from(table: string) {
    return new MockQueryBuilder(table);
  }

  auth = {
    signUp: async (credentials: { email: string; password: string }) => {
      return { data: { user: { id: 'mock-user-id', email: credentials.email } }, error: null };
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      return { data: { user: { id: 'mock-user-id', email: credentials.email } }, error: null };
    },
    signOut: async () => {
      return { error: null };
    },
    getUser: async () => {
      return { data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, error: null };
    },
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  };
}

class MockQueryBuilder {
  private table: string;
  private filters: Array<{ column: string; value: unknown; operator: string }> = [];
  private orderBy: { column: string; ascending: boolean } | null = null;
  private limitCount: number | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(columns?: string) {
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters.push({ column, value, operator: 'eq' });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderBy = { column, ascending: options?.ascending !== false };
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  async then(callback?: (result: { data: unknown[]; error: null; count?: number }) => unknown) {
    const result = await this.execute();
    return callback ? callback(result) : result;
  }

  async execute() {
    let data: (Complaint | Project | RiskAlert)[] = [];

    // Get base data
    if (this.table === 'complaints') {
      data = [...mockComplaints];
    } else if (this.table === 'projects') {
      data = [...mockProjects];
    } else if (this.table === 'risk_alerts') {
      data = [...mockAlerts];
    }

    // Apply filters
    this.filters.forEach(filter => {
      if (filter.operator === 'eq') {
        data = data.filter(item => (item as Record<string, unknown>)[filter.column] === filter.value);
      }
    });

    // Apply ordering
    if (this.orderBy) {
      data.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[this.orderBy!.column];
        const bVal = (b as Record<string, unknown>)[this.orderBy!.column];
        const ascending = this.orderBy!.ascending;
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
      });
    }

    // Apply limit
    if (this.limitCount) {
      data = data.slice(0, this.limitCount);
    }

    return { data, error: null, count: data.length };
  }

  insert(data: Record<string, unknown>) {
    return {
      select: () => ({
        execute: async () => {
          const newItem = { ...data, id: Date.now().toString() };
          if (this.table === 'complaints') {
            mockComplaints.push(newItem as Complaint);
          } else if (this.table === 'projects') {
            mockProjects.push(newItem as Project);
          } else if (this.table === 'risk_alerts') {
            mockAlerts.push(newItem as RiskAlert);
          }
          return { data: [newItem], error: null };
        }
      })
    };
  }

  update(updates: Record<string, unknown>) {
    return {
      eq: (column: string, value: unknown) => ({
        select: () => ({
          execute: async () => {
            let item: Complaint | Project | RiskAlert | null = null;
            if (this.table === 'complaints') {
              item = mockComplaints.find(c => (c as Record<string, unknown>)[column] === value) || null;
              if (item) Object.assign(item, updates);
            } else if (this.table === 'projects') {
              item = mockProjects.find(p => (p as Record<string, unknown>)[column] === value) || null;
              if (item) Object.assign(item, updates);
            } else if (this.table === 'risk_alerts') {
              item = mockAlerts.find(a => (a as Record<string, unknown>)[column] === value) || null;
              if (item) Object.assign(item, updates);
            }
            return { data: item ? [item] : [], error: null };
          }
        })
      })
    };
  }

  delete() {
    return {
      eq: (column: string, value: unknown) => ({
        execute: async () => {
          let deletedItem: Complaint | Project | RiskAlert | null = null;
          if (this.table === 'complaints') {
            const index = mockComplaints.findIndex(c => (c as Record<string, unknown>)[column] === value);
            if (index !== -1) {
              deletedItem = mockComplaints.splice(index, 1)[0];
            }
          } else if (this.table === 'projects') {
            const index = mockProjects.findIndex(p => (p as Record<string, unknown>)[column] === value);
            if (index !== -1) {
              deletedItem = mockProjects.splice(index, 1)[0];
            }
          } else if (this.table === 'risk_alerts') {
            const index = mockAlerts.findIndex(a => (a as Record<string, unknown>)[column] === value);
            if (index !== -1) {
              deletedItem = mockAlerts.splice(index, 1)[0];
            }
          }
          return { data: deletedItem ? [deletedItem] : [], error: null };
        }
      })
    };
  }
}

export const mockSupabase = new MockSupabaseClient();

// Initialize mock data
mockComplaints = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic hazards near the intersection of Main Street and Oak Avenue.',
    department: 'roads',
    severity: 'high',
    status: 'in-progress',
    location: 'Main Street & Oak Avenue',
    latitude: 20.5937,
    longitude: 78.9629,
    submitted_by: 'John Smith',
    contact_info: 'john.smith@email.com',
    submitted_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-01-15T10:00:00Z',
    resolved_at: null,
    assigned_to: null
  },
  {
    id: '2',
    title: 'Water Pipeline Burst in Mumbai',
    description: 'Major water pipeline burst on Bandra-Worli Sea Link causing water shortage in surrounding areas.',
    department: 'water',
    severity: 'high',
    status: 'in-progress',
    location: 'Bandra-Worli Sea Link, Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    submitted_by: 'Rajesh Kumar',
    contact_info: 'rajesh.kumar@mumbai.gov.in',
    submitted_at: '2026-01-16T08:30:00Z',
    updated_at: '2026-01-16T08:30:00Z',
    resolved_at: null,
    assigned_to: 'Water Department Team'
  },
  {
    id: '3',
    title: 'Power Outage in Delhi',
    description: 'Complete power outage affecting 200+ homes in Rohini sector.',
    department: 'electricity',
    severity: 'high',
    status: 'in-progress',
    location: 'Rohini Sector 15, Delhi',
    latitude: 28.7320,
    longitude: 77.0880,
    submitted_by: 'Priya Sharma',
    contact_info: 'priya.sharma@email.com',
    submitted_at: '2026-01-17T14:20:00Z',
    updated_at: '2026-01-17T14:20:00Z',
    resolved_at: null,
    assigned_to: 'Electricity Department'
  },
  {
    id: '4',
    title: 'Potholed Roads in Bangalore',
    description: 'Multiple large potholes on Outer Ring Road causing accidents.',
    department: 'roads',
    severity: 'high',
    status: 'pending',
    location: 'Outer Ring Road, Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    submitted_by: 'Arun Patel',
    contact_info: 'arun.patel@bangalore.gov.in',
    submitted_at: '2026-01-17T16:45:00Z',
    updated_at: '2026-01-17T16:45:00Z',
    resolved_at: null,
    assigned_to: null
  },
  {
    id: '5',
    title: 'Sewage Overflow in Chennai',
    description: 'Sewage overflowing from manholes in T. Nagar area causing health hazards.',
    department: 'water',
    severity: 'high',
    status: 'in-progress',
    location: 'T. Nagar, Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    submitted_by: 'Kavita Singh',
    contact_info: 'kavita.singh@email.com',
    submitted_at: '2026-01-16T11:15:00Z',
    updated_at: '2026-01-16T11:15:00Z',
    resolved_at: null,
    assigned_to: 'Water Maintenance Team'
  },
  {
    id: '6',
    title: 'Street Light Malfunction in Hyderabad',
    description: 'Over 50 street lights not working in Jubilee Hills area.',
    department: 'electricity',
    severity: 'medium',
    status: 'pending',
    location: 'Jubilee Hills, Hyderabad',
    latitude: 17.3850,
    longitude: 78.4867,
    submitted_by: 'Suresh Reddy',
    contact_info: 'suresh.reddy@hyderabad.gov.in',
    submitted_at: '2026-01-16T13:30:00Z',
    updated_at: '2026-01-16T13:30:00Z',
    resolved_at: null,
    assigned_to: null
  }
];

mockProjects = [
  {
    id: '1',
    title: 'Delhi Metro Phase 4',
    description: 'Extension of Delhi Metro network with 50+ new stations across NCR.',
    department: 'roads',
    status: 'active',
    priority: 'high',
    location: 'Delhi NCR',
    latitude: 28.7041,
    longitude: 77.1025,
    start_date: '2025-01-01',
    end_date: '2028-12-31',
    budget: 50000000000.00,
    progress: 35,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z'
  },
  {
    id: '2',
    title: 'Mumbai Coastal Road',
    description: 'Construction of elevated coastal road connecting South Mumbai to Nhava Sheva.',
    department: 'roads',
    status: 'active',
    priority: 'high',
    location: 'Mumbai Coastline',
    latitude: 19.0760,
    longitude: 72.8777,
    start_date: '2024-06-01',
    end_date: '2027-05-31',
    budget: 15000000000.00,
    progress: 60,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z'
  },
  {
    id: '3',
    title: 'Bangalore Solar City Initiative',
    description: 'Install solar panels on 500+ government buildings and create microgrids for energy independence.',
    department: 'electricity',
    status: 'planning',
    priority: 'medium',
    location: 'Bangalore City',
    latitude: 12.9716,
    longitude: 77.5946,
    start_date: '2026-03-01',
    end_date: '2028-02-28',
    budget: 150000000.00,
    progress: 15,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z'
  },
  {
    id: '4',
    title: 'Chennai Coastal Protection',
    description: 'Build sea walls and flood barriers along Chennai coastline to protect against rising sea levels.',
    department: 'water',
    status: 'active',
    priority: 'high',
    location: 'Chennai Coastline',
    latitude: 13.0827,
    longitude: 80.2707,
    start_date: '2025-09-01',
    end_date: '2027-08-31',
    budget: 320000000.00,
    progress: 55,
    created_at: '2025-08-01T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z'
  },
  {
    id: '5',
    title: 'Hyderabad Smart Traffic System',
    description: 'Implement AI-powered traffic management system with 200+ smart signals.',
    department: 'roads',
    status: 'active',
    priority: 'high',
    location: 'Hyderabad City',
    latitude: 17.3850,
    longitude: 78.4867,
    start_date: '2025-11-15',
    end_date: '2027-04-30',
    budget: 180000000.00,
    progress: 70,
    created_at: '2025-10-15T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z'
  }
];

mockAlerts = [
  {
    id: '1',
    title: 'Monsoon Flood Warning - Mumbai',
    description: 'Heavy monsoon rains expected to cause severe flooding in low-lying areas of Mumbai. Residents advised to secure belongings.',
    severity: 'critical',
    category: 'Weather',
    location: 'Mumbai Coastal Areas',
    latitude: 19.0760,
    longitude: 72.8777,
    status: 'active',
    reported_by: 'India Meteorological Department',
    reported_at: '2026-01-18T06:00:00Z',
    resolved_at: null,
    updated_at: '2026-01-18T06:00:00Z'
  },
  {
    id: '2',
    title: 'Heatwave Alert - Delhi NCR',
    description: 'Extreme heatwave conditions with temperatures exceeding 45°C. Risk of heatstroke and water shortage.',
    severity: 'high',
    category: 'Weather',
    location: 'Delhi NCR Region',
    latitude: 28.7041,
    longitude: 77.1025,
    status: 'active',
    reported_by: 'Delhi Disaster Management',
    reported_at: '2026-01-17T12:00:00Z',
    resolved_at: null,
    updated_at: '2026-01-17T12:00:00Z'
  },
  {
    id: '3',
    title: 'Air Pollution Crisis - Delhi',
    description: 'PM2.5 levels exceeding safe limits by 8x. Respiratory health emergency declared.',
    severity: 'critical',
    category: 'Health',
    location: 'Delhi Metropolitan Area',
    latitude: 28.7041,
    longitude: 77.1025,
    status: 'active',
    reported_by: 'Central Pollution Control Board',
    reported_at: '2026-01-16T09:30:00Z',
    resolved_at: null,
    updated_at: '2026-01-16T09:30:00Z'
  },
  {
    id: '4',
    title: 'Construction Crane Collapse Risk',
    description: 'Unstable construction crane at Bandra Worli Sea Link project site. High winds pose collapse risk.',
    severity: 'critical',
    category: 'Safety',
    location: 'Bandra Worli Sea Link',
    latitude: 19.0760,
    longitude: 72.8777,
    status: 'monitoring',
    reported_by: 'BMC Safety Inspector',
    reported_at: '2026-01-15T14:00:00Z',
    resolved_at: null,
    updated_at: '2026-01-15T14:00:00Z'
  },
  {
    id: '5',
    title: 'Power Grid Overload Warning',
    description: 'Substation showing signs of overload during peak hours. Risk of brownouts.',
    severity: 'high',
    category: 'Infrastructure',
    location: 'Downtown Substation',
    latitude: 12.9716,
    longitude: 77.5946,
    status: 'active',
    reported_by: 'Power Company',
    reported_at: '2026-01-14T16:30:00Z',
    resolved_at: null,
    updated_at: '2026-01-14T16:30:00Z'
  }
];