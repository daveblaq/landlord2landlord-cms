# Landlord2Landlord (L2L) CMS

A premium portfolio management and lead triage Content Management System (CMS) designed specifically for Landlord-to-Landlord (L2L) transactions and operations. This application acts as the control panel for listing properties, triaging incoming investor leads, and monitoring key portfolio health metrics.

---

## 🚀 Key Features

### 📊 Dynamic Dashboard Overview (`/dashboard`)
*   **Live Portfolio Metrics:**
    *   **Total Properties:** Cumulative catalog metrics with Month-over-Month (MoM) listing activity.
    *   **Active Leads:** Triage counts with status-based filters.
    *   **Avg. Monthly Rent:** Formatted in British Pounds (GBP / `£`) with cohort pricing shifts.
    *   **Conversion Rate:** Triage efficiency trends (Closed leads / total submissions).
    *   *Skeletons:* Full loading states using animated pulses block-by-block.
*   **Activity Feed:** Chronological activity stream tracking lead submissions, listings, and updates with relative humanized durations (e.g., "Just now", "2 mins ago", "Yesterday").
*   **Quick Actions Panel:** Convenient pathways to add new listings or view leads.
*   **System Status Widget:** Live service connection indicators optimized with custom styling for both light and dark modes.

### 🏢 Property Listings Management (`/dashboard/properties`)
*   **Live Table View:** Real-time property database query leveraging `React Aria Table` collections. Fully responsive layout with scroll containers for mobile screens.
*   **Property Filters:** Search listings dynamically by location and filter by status.
*   **Listing Management:** Form templates to create (`/properties/new`) and edit (`/properties/[id]/edit`) listings including bedrooms, bathrooms, rent yields, locations, epc status, and tenure parameters.
*   **Image Galleries:** Integrated base64 image uploads synced with Cloudinary.

### 👥 Leads Triage System (`/dashboard/leads`)
*   **Triage Table:** Manage captured leads by source/type (Property Enquiries, Mortgage Leads, Valuations, Insurance, General).
*   **Triage Workflow:** Interactive dropdown selections to update statuses on the fly (New, Contacted, Qualified, Viewing Scheduled, Negotiating, Closed).
*   **Lead Search:** Filter down results instantly by email or lead properties.

### 🌗 Dark & Light Theme Support
*   Universal dark mode theme using `next-themes`.
*   Pulsing loaders, sidebar controls, page headers, tables, badges, and preloaders respect class settings dynamically.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) utilizing turbopack dev bundling.
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with native class variables for flexible theme styles.
*   **UI System:** [React Aria](https://react-spectrum.adobe.com/react-aria/) and [React Aria Components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html) for fully accessible, highly interactive UI components.
*   **Data Fetching:** [TanStack React Query v5](https://tanstack.com/query/latest) for server-state caching, automatic refetches, and loading transitions.
*   **API Client:** [Axios](https://axios-http.com/) configured with interceptors and base token storage for authentication.
*   **Icons:** [Untitled UI Icons](https://www.untitledui.com/icons) for clean modern design indicators.

---

## 📁 Project Structure

```bash
landlord-cms/
├── public/                 # Static assets (logo.svg, branding icons)
├── src/
│   ├── app/                # Next.js page routers & layouts
│   │   ├── auth/           # Login flows
│   │   └── dashboard/      # Metrics, Properties list, and Leads triage pages
│   ├── components/         # React components (modals, tables, navigation, metrics)
│   │   ├── application/    # Feature components (activity feed, table, page headers)
│   │   ├── base/           # Base inputs, dropdowns, buttons
│   │   └── foundations/    # Logos, featured icons
│   ├── contexts/           # Authentication state context providers
│   ├── lib/
│   │   ├── api/            # API wrappers (properties, leads, stats, activities hooks)
│   │   └── utils/          # Storage utilities
│   ├── providers/          # Theme and Query Client provider setup
│   └── styles/             # Global CSS files and Tailwind configurations
├── package.json            # Scripts and project dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have Node.js and a package manager (npm, yarn, pnpm, or bun) installed.

### 2. Configure Environment Variables
Create a `.env` file in the root of the CMS project:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```
*(Adjust the API URL based on where your `landlord-backend` is running).*

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
To build the production-ready bundle:
```bash
npm run build
npm run start
```

### 6. Storybook (UI Playbook)
To run Storybook and preview individual design components:
```bash
npm run storybook
```
