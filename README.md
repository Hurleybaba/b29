# B29 - Business Event & Management Platform

## Overview
B29 is a comprehensive web application designed for businesses to manage events, posts, and analyze their performance. It features a robust dashboard for business insights, event creation tools, and user profile management. Built with the latest web technologies, B29 offers a seamless experience for both business owners and general users.

## 🚀 Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** React 19
- **Animations:** Framer Motion
- **Charts/Visualization:** Recharts
- **Authentication:** NextAuth.js

## ✨ Features

### For Businesses
- **Dashboard:** Real-time overview of business performance.
- **Business Analysis:** Detailed analytics and reports.
- **Event Management:** Create, edit, and manage business events.
- **Post Management:** Create and share posts to engage with the audience.
- **Profile Management:** Customizable business profiles.
- **Settings:** Configurable business settings.

### For Users
- **User Profile:** Personal profile management.
- **Event Discovery:** Browse and view event details.
- **Subscription:** Manage subscription plans.

### Authentication
- Secure Login and Signup functionality.

## 📂 Project Structure
The project follows the Next.js App Router structure:

- `app/pages/`: Contains the main application views.
  - `businessAnalysis/`: Analytics pages.
  - `businessDashboard/`: Main business dashboard.
  - `createEvent/`: Event creation wizard.
  - `createPost/`: Post creation interface.
  - `eventDetails/`: Individual event pages.
  - `login/` & `signup/`: Authentication pages.
  - `subscription/`: Subscription management.
  - `profile/` & `userProfile/`: Profile views.

## 🛠 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd b29
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔌 Anticipated API Endpoints

The following API endpoints are anticipated to support the frontend functionality.

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user or business. |
| POST | `/login` | Authenticate user and retrieve token. |
| POST | `/logout` | Invalidate current session. |
| GET | `/me` | Get current authenticated user details. |

### Business (`/api/business`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:id` | Get public business profile. |
| PUT | `/profile` | Update business profile details. |
| GET | `/dashboard/stats` | Get aggregated stats for the dashboard. |
| GET | `/analysis` | Get detailed analytics data (charts/graphs). |
| PUT | `/settings` | Update business settings. |

### Events (`/api/events`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List all events (with pagination/filtering). |
| POST | `/` | Create a new event. |
| GET | `/:id` | Get details of a specific event. |
| PUT | `/:id` | Update an existing event. |
| DELETE | `/:id` | Cancel/Delete an event. |
| POST | `/:id/register` | Register a user for an event. |

### Posts (`/api/posts`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Feed of posts. |
| POST | `/` | Create a new post. |
| GET | `/:id` | Get a specific post. |
| DELETE | `/:id` | Delete a post. |

### Users (`/api/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get own user profile. |
| PUT | `/profile` | Update user profile. |
| GET | `/events` | Get list of registered events. |

### Subscriptions (`/api/subscriptions`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/plans` | List available subscription plans. |
| POST | `/checkout` | Initiate subscription checkout. |
| GET | `/status` | Check current subscription status. |
| POST | `/cancel` | Cancel current subscription. |
