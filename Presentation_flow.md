# Application Presentation Flow

This document outlines the recommended navigation flow for presenting the application, moving from the general user experience to the specific business management features.

## 1. General Dashboard (Start Here)
**Path:** `/pages/dashboard`

* **Context:** This is the main landing view for a standard user (The "Feed").
* **Key Features to Show:**
    * **Discovery Feed:** Scroll through the masonry grid of posts (videos/images).
    * **Interactivity:** Hover over video posts to see the smart playback feature.
    * **Location Filter:** Click the **Floating Action Button** (bottom right) to simulate the "Nearby" scanning feature.
    * **Navigation:** Point out the top navigation bar.
* **Transition:** Click the **"ME"** avatar in the top right corner to navigate to the User Profile.

## 2. User Profile
**Path:** `/pages/userProfile`

* **Context:** Personal account management for a standard user.
* **Key Features to Show:**
    * **User Info:** Display of the user avatar and basic details.
    * **Saved Activity:** Briefly show the saved posts/events section.
    * **Upgrade Call-to-Action:** Highlight the "Have a Business?" section with the "Upgrade Now" button.
* **Transition:** Click the **"Upgrade Now"** button. A success modal will appear. Click **"OK, Let's Go!"** to be redirected to the Business Dashboard.

## 3. Business Dashboard
**Path:** `/pages/businessDashboard`

* **Context:** The command center for a business owner (e.g., "Nexus Properties").
* **Key Features to Show:**
    * **Overview Stats:** Top-level metrics (Profile Views, Event Signups, Notifications Sent).
    * **Sidebar Navigation:** Show the dedicated business menu on the left.
    * **Quick Actions:** Point out the "Create Event" button.
* **Transition:** Click **"Analytics"** in the left sidebar.

## 4. Analytics
**Path:** `/pages/businessAnalysis`

* **Context:** Deep dive into business performance data.
* **Key Features to Show:**
    * **Visual Charts:** Show the Event Performance Trends (Area Chart) and Event Types (Pie Chart).
    * **Demographics:** Scroll down to show Audience Age Distribution.
    * **Tabs:** Briefly mention the different analysis tabs (Overview, Events, Audience, etc.).
* **Transition:** Click **"My Events"** in the left sidebar.

## 5. Business Events
**Path:** `/pages/businessEvents`

* **Context:** Management of hosted events.
* **Key Features to Show:**
    * **Event List:** Show the status indicators (Live, Upcoming, Completed).
    * **Registration Numbers:** Highlight the attendee counts for specific events.
    * **Create New:** Reiterate the ability to add new events.
* **Transition:** Click the **"Manage Subscription"** button inside the "PRO PLAN" card in the bottom left of the sidebar.

## 6. Subscription
**Path:** `/pages/subscription`

* **Context:** Managing billing and plan upgrades.
* **Key Features to Show:**
    * **Current Plan:** Show the active "Professional" plan details.
    * **Plan Comparison:** Display the differences between Basic, Professional, and Enterprise tiers.
    * **Visuals:** Highlight the clean pricing UI.
* **Transition:** Click **"View Public Profile"** in the bottom left sidebar.

## 7. Public Business Profile (End Here)
**Path:** `/pages/businessProfile`

* **Context:** How the business appears to other users on the platform.
* **Key Features to Show:**
    * **Hero Banner:** The visual header and business logo.
    * **Contact Info:** Address, phone, and opening hours.
    * **Featured Listings:** The grid of properties or services the business offers.
* **Conclusion:** This completes the loop, showing how the backend management (Dashboard/Events) translates to the frontend public view.