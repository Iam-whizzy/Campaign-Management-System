# 🇰🇪 County Campaign Manager (Nairobi County Governor Prototype)

A mobile-friendly, full-featured operations web application built for the **Nairobi County Governor Campaign**. This project serves as a comprehensive case study, lab guide, and step-by-step classroom walkthrough for building production-grade frontend applications in **React**, **TypeScript**, and **Tailwind CSS**, integrated with **Supabase (PostgreSQL & Realtime WebSockets)**.



## 🎯 Learning Objectives

By working through this codebase, students will learn how to:

1. **Model complex real-world domain data** using TypeScript types and interfaces (17 constituencies, 85 wards, rallies, field tasks, community grievances, and team hierarchies).
2. **Design mobile-first interfaces** using custom shadcn/ui-inspired primitives (responsive desktop sidebar, mobile bottom navigation bar, accessible modals, and status badges).
3. **Manage client-side state & optimistic updates** using React Context with resilient `localStorage` fallbacks.
4. **Integrate Supabase as a Backend-as-a-Service (BaaS)**:
   - Defining relational PostgreSQL tables with Row Level Security (RLS).
   - Performing CRUD operations via `@supabase/supabase-js`.
   - Implementing **Realtime subscriptions** so changes sync instantly across multiple devices.
5. **Debug common real-world environment issues** (Vite environment variables, JWT keys, and offline resilience).

---

## 🏗️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Realtime**: [Supabase](https://supabase.com/) (PostgreSQL + PostgREST + WebSockets)
- **Design Palette**: Forest Green (`#007A3D` / `emerald-700`), Charcoal Black (`zinc-900`), White (`#FFFFFF`), and Light Grey (`zinc-100`).

---

## 📂 Project Architecture

```text
├── .env                             # Active environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
├── .env.example                     # Sample environment variable template
├── index.html                       # HTML entry point with metadata
├── package.json                     # Dependencies & npm scripts
├── src/
│   ├── App.tsx                      # Root layout, router view, and modal container
│   ├── main.tsx                     # React DOM entry point
│   ├── index.css                    # Tailwind CSS imports & global utilities
│   ├── types/
│   │   └── campaign.ts              # Data contracts: SubCounties, Activities, Tasks, Issues, Team
│   ├── data/
│   │   └── seedData.ts              # Fictional Nairobi campaign seed dataset
│   ├── lib/
│   │   ├── utils.ts                 # Class merging (`cn`) & date formatters
│   │   └── supabase.ts              # Supabase client, DB mappers, and seed helpers
│   ├── context/
│   │   └── CampaignContext.tsx      # Global store, optimistic CRUD, and Realtime listeners
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Top navigation bar, election countdown, DB status badge
│   │   │   ├── Sidebar.tsx          # Collapsible desktop sidebar navigation
│   │   │   └── MobileNav.tsx        # Mobile thumb-friendly bottom navigation bar
│   │   ├── ui/                      # Reusable UI primitives (Button, Card, Badge, Input, Dialog, etc.)
│   │   └── modals/
│   │       ├── NewActivityModal.tsx # Schedule campaign rallies & ward barazas
│   │       ├── NewTaskModal.tsx     # Assign operational tasks to field mobilizers
│   │       ├── NewIssueModal.tsx    # Log grassroots community grievances
│   │       ├── NewTeamMemberModal.tsx # Register ward coordinators & staff
│   │       ├── SupabaseSqlModal.tsx # Copy-paste SQL script & DB sync controls
│   │       └── TestingGuideModal.tsx# In-app QA testing walkthrough
│   └── pages/
│       ├── DashboardView.tsx        # Operations overview, 17-constituency presence grid, KPIs
│       ├── ActivitiesView.tsx       # Event scheduling, permits, audio rigs, and attendance
│       ├── TasksView.tsx            # Operations task board with one-click completion
│       ├── CommunityIssuesView.tsx  # Grassroots grievance tracker & manifesto commitments
│       └── TeamView.tsx             # Staff directory, ward coverage, and status toggles
```

---

## 🚀 Step-by-Step Student Implementation Guide
---

## 💬 Classroom Walkthrough: Step-by-Step Prompt Progression

This section documents the exact chronological prompts used by the instructor during the lesson. Students can trace how the application grew from an initial idea into a fully persistent, live-synced full-stack prototype.
Open Google AI Studio: https://aistudio.google.com/
### 📌 Prompt 1: Initial App Creation & Design Specs
> **User Prompt**:
> ```text
> Build a simple mobile-friendly web application called “County Campaign Manager”.
>
> It is a working prototype for Nairobi county governor campaign. Do not use real campaign or voter data.
>
> Create these pages: Dashboard, Activities, Tasks, Community Issues, Team & user managememt. Use fictional sample data. Make the navigation and forms functional.
>
> Use React, TypeScript, shadcn/ui components and Lucide icons. Use green, black, white and light grey. Do not add a database, payments, bulk messaging or external APIs. Make it work on phones and desktop screens. Explain how to test it.
> ```

### 📌 Prompt 2: Deciding to Integrate Supabase
> **User Prompt**:
> ```text
> I want to integrate supabase, how do I go about it?
> ```
- **Learning Takeaway**: Formulating the database schema for PostgreSQL, enabling Row Level Security (RLS) policies, generating API keys, and planning the integration architecture with `@supabase/supabase-js`.

---

### 📌 Prompt 3: Connecting Supabase Credentials
> **User Prompt**:
> ```text
> I have created env file and pasted the supabase credentials, help integrate supabase from there
> ```
- **Learning Takeaway**: Reading Vite environment variables (`import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`), wiring the Supabase client, and creating real-time channel subscriptions (`postgres_changes`) for multi-device sync with optimistic local fallback.

---

### Phase 1: Initialize Project & UI Primitives

1. **Scaffold the Vite project**:
   ```bash
   npm create vite@latest county-campaign-manager -- --template react-ts
   cd county-campaign-manager
   npm install
   ```

2. **Install core dependencies**:
   ```bash
   npm install @tailwindcss/vite tailwindcss lucide-react clsx tailwind-merge @supabase/supabase-js
   ```

3. **Configure Tailwind CSS**:
   Import Tailwind in `src/index.css`:
   ```css
   @import "tailwindcss";
   ```

4. **Build reusable UI components**:
   Create accessible, unstyled primitives under `src/components/ui/`:
   - `Button.tsx`: Supports variants (`default`, `green`, `secondary`, `outline`, `ghost`, `destructive`).
   - `Card.tsx`: Standard card layout (`CardHeader`, `CardTitle`, `CardContent`, `CardFooter`).
   - `Badge.tsx`: Visual tags (`success`, `warning`, `destructive`, `green`).
   - `Dialog.tsx`: Modal with backdrop blur, escape-key listener, and focus trapping.

---

### Phase 2: Domain Modeling & Seed Data

In `src/types/campaign.ts`, define the core data entities for Nairobi County:
- **17 Sub-Counties**: *Westlands, Dagoretti North/South, Lang'ata, Kibra, Roysambu, Kasarani, Ruaraka, Embakasi (South, North, Central, East, West), Makadara, Kamukunji, Starehe, Mathare*.
- **Activities**: Title, type (Rally, Townhall, Boda Boda Meetup, etc.), ward, venue, date, target attendance, permit status.
- **Tasks**: Title, assignee, role, due date, priority (*Critical*, *High*, *Medium*, *Low*), status (*To Do*, *In Progress*, *Completed*).
- **Community Issues**: Neighborhood grievance, location details, citizen upvotes, Governor manifesto pledge.
- **Team Members**: Full name, constituency, phone, role, active tasks count, operational status (*Active*, *On Field*, *On Standby*).

Populate `src/data/seedData.ts` with realistic fictional records to test the UI immediately.

---

### Phase 3: State Management & Optimistic UI

Create `src/context/CampaignContext.tsx` using the React Context API:
- Store arrays for `activities`, `tasks`, `issues`, and `team`.
- Store `activePage` (*dashboard*, *activities*, *tasks*, *issues*, *team*).
- Implement optimistic updates: when a user checks a task or adds an event, update the React state immediately, write to `localStorage`, and then sync with the database in the background.

---

### Phase 4: Supabase Database Integration

#### 1. Setup Your Supabase Project
1. Create a free account at [supabase.com](https://supabase.com) and create a new project.
2. Go to **Project Settings** → **API**.
3. Note your **Project URL** and **`anon` `public` key** (the long string starting with `eyJhbGciOi...`).

#### 2. Configure Environment Variables
Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
> **⚠️ Crucial Tip**: Ensure each variable is on its own line with no trailing spaces.

#### 3. Run the SQL Migration Script
Open your **Supabase Dashboard → SQL Editor** and execute the following schema:

```sql
-- 1. Campaign Activities Table
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  sub_county TEXT NOT NULL,
  ward TEXT NOT NULL,
  venue TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  target_attendance INTEGER DEFAULT 0,
  actual_attendance INTEGER,
  lead_organizer TEXT NOT NULL,
  status TEXT DEFAULT 'Scheduled',
  security_permit TEXT DEFAULT 'Pending',
  sound_system_booked BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Campaign Operations Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'Medium',
  status TEXT DEFAULT 'To Do',
  assignee_name TEXT NOT NULL,
  assignee_role TEXT,
  sub_county TEXT NOT NULL,
  ward TEXT,
  due_date DATE NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Community Issues Table
CREATE TABLE IF NOT EXISTS community_issues (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_county TEXT NOT NULL,
  ward TEXT NOT NULL,
  location_details TEXT NOT NULL,
  urgency TEXT DEFAULT 'Medium',
  status TEXT DEFAULT 'Open',
  reported_by TEXT NOT NULL,
  date_reported DATE DEFAULT CURRENT_DATE,
  manifesto_pledge TEXT,
  action_plan TEXT,
  upvotes_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Campaign Team & Mobilizers Table
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  sub_county TEXT NOT NULL,
  assigned_ward TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  active_tasks INTEGER DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  avatar_color TEXT DEFAULT 'bg-emerald-700',
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read & write policies for prototype operations
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public activities' AND tablename = 'activities') THEN
    CREATE POLICY "Allow public activities" ON activities FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public tasks' AND tablename = 'tasks') THEN
    CREATE POLICY "Allow public tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public issues' AND tablename = 'community_issues') THEN
    CREATE POLICY "Allow public issues" ON community_issues FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public team' AND tablename = 'team_members') THEN
    CREATE POLICY "Allow public team" ON team_members FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
```

#### 4. Initialize Supabase in Code (`src/lib/supabase.ts`)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 5. Realtime WebSockets Listener
In `CampaignContext.tsx`, subscribe to database changes so any device gets updates live:
```typescript
useEffect(() => {
  if (!supabase) return;

  const channel = supabase
    .channel('campaign-live-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
      if (payload.eventType === 'INSERT') {
        setTasks((prev) => [mapTaskFromDb(payload.new), ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        const updated = mapTaskFromDb(payload.new);
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      }
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 🛠️ Common Pitfalls & Instructor Gotchas

When students build this application, watch out for these frequent mistakes:

| Problem | Root Cause | Solution |
| :--- | :--- | :--- |
| **`"Invalid API key"` error** | Used the Supabase Project Secret / Service Key instead of the public `anon` JWT. | Copy the key labeled **`anon` `public`** from Supabase API settings. It is a JWT starting with `eyJhbGciOiJIUzI1Ni...`. |
| **Environment variables undefined** | Vite client-side environment variables must start with `VITE_`. | Name variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. |
| **`.env` changes not taking effect** | Vite loads `.env` at server launch. | Stop and restart the dev server (`npm run dev`). |
| **`.env` commented out on one line** | Missing newlines in `.env` cause comments (`#`) to comment out following keys. | Ensure each variable is on a fresh new line. |
| **`relation "public.activities" does not exist` (Error 42P01)** | Code is querying tables before the SQL migration script was run. | Open Supabase SQL Editor and run the table creation script. |

---

## ✅ Student Testing Checklist

Before submitting or presenting their project, students should verify:

- [ ] **Mobile Responsiveness**: Resize browser to 375px. Bottom navigation bar is visible, tabs switch cleanly, forms fit on small screens.
- [ ] **Desktop Layout**: On screens > 1024px, the sidebar is visible with active indicators and counters.
- [ ] **Sub-County Filter**: Selecting a constituency (e.g. *Kibra* or *Westlands*) filters all dashboards, events, and tasks.
- [ ] **Task Completion**: Clicking a task checkbox strikes through the title and updates the pending directive counter.
- [ ] **Community Issue Upvoting**: Clicking the thumbs-up button increments the citizen counter in real time.
- [ ] **Supabase Sync**:
  1. Open the application in **Window A**.
  2. Open the application in an incognito **Window B** (or on a mobile phone).
  3. Create an activity or complete a task in Window A.
  4. Verify that Window B updates automatically via Realtime WebSockets without refreshing!

---

## 📜 License & Usage

This project was developed for educational purposes to demonstrate modern React architecture, mobile-first design, and Supabase integration. Fictional sample data is used throughout. Feel free to fork and adapt for student workshops and portfolio projects!
