# Project Requirement Document

## 1. Introduction
This document outlines the requirements for a Link Shortener Application. The goal of this application is to provide a simple and efficient way for users to create short links (slugs) that redirect to original URLs, track analytics data (e.g. IP address, user agent, clicks), and support custom domains for branded links. Users will also have access to an authenticated interface where they can manage their created links and domains.

## 2. Objectives
1. **Link Shortening**  
   Provide a user-friendly interface to shorten links, automatically generating a slug or allowing the user to specify a custom slug if needed.
2. **Analytics and Tracking**  
   Track link usage data such as IP addresses, user agents, number of clicks, and provide summarized analytics to the link owner.
3. **Custom Domains**  
   Allow users to add their own custom domain, verify through DNS, and assign new slugs under that domain.
4. **Secure Access**  
   Restrict the visibility and management of links and domains to authenticated users only using Better-Auth.

## 3. Scope
The scope of this project covers:
- User account creation and authentication using Better-Auth.
- Short link creation, customization, and management.
- Display of basic analytics (IP address, user agent, click count) per link.
- Custom domain integration and verification.

## 4. Functional Requirements

### 4.1 User Authentication and Authorization
1. **Sign-Up / Registration**  
   - Users can register with email and password or other supported providers through Better-Auth.  
   - The system will validate and store user credentials securely.
2. **Sign-In**  
   - Users log in with their credentials.  
   - The app should maintain session state (e.g., using JWT, cookies, or session tokens as managed by Better-Auth).
3. **Authorization**  
   - Only authenticated users can create, view, and manage their own links and domains.  
   - No unauthorized user should be able to view or manage another user’s links or domains.

### 4.2 Link Shortening
1. **Slug Generation**  
   - System automatically generates a short, random slug if one is not provided by the user.  
   - Users may override the generated slug with a custom slug, if available.
2. **Link Storage**  
   - Each shortened link will be stored with a reference to its owner (user ID) for permission access.  
   - Metadata stored includes:  
     - Original URL  
     - Slug  
     - User ID (to identify ownership)  
     - (Optional in the future) Expiration date or any advanced settings
3. **Redirection**  
   - When a user or visitor accesses example.com/{slug} (or customDomain.com/{slug}), the system queries the database to find the associated original URL.  
   - It then redirects the visitor to the original URL.

### 4.3 Custom Domains
1. **Domain Registration**  
   - Users can register a domain they own (e.g., abc.com).  
   - The system stores the domain details against the user’s account.
2. **DNS Verification**  
   - Users must verify ownership by setting the appropriate DNS records (e.g. CNAME pointing to an app subdomain).  
   - System checks DNS or a pre-configured method before approving the domain’s usage.
3. **Domain-Specific Slugs**  
   - Once verified, user can create slugs under that domain (e.g., abc.com/{slug}).  
   - The system maintains a domain-to-user ownership relationship so the domain is not used by other users.

### 4.4 Analytics and Tracking
1. **Data Collection**  
   - On each click of the shortened link, the system collects:  
     - IP address  
     - User agent  
     - Timestamp  
     - Other potential data in the future (e.g. referrer)
2. **Click Counting**  
   - The system stores and increments click counts in real-time or near real-time.
3. **Reporting**  
   - Authenticated users can view basic analytics for each link:  
     - Total clicks count  
     - Click timestamps  
     - Potential breakdown by user agent (future)

### 4.5 User Interface
1. **Dashboard**  
   - Displays a list of user-created links and domains.  
   - Shows key metrics (e.g., total clicks, top visited links, domain verification status).
2. **Create/Edit Link Modal or Page**  
   - Form-based interface for creating or editing a link.  
   - Allows user to pick a domain (default domain or a verified custom domain).  
   - Specify or edit a slug.  
   - Enter original URL.
3. **Domain Management Page**  
   - Interface for users to add, edit, and verify domains.  
   - Display DNS verification instructions.

## 5. Non-Functional Requirements
1. **Performance**  
   - System should handle a reasonable number of requests for redirection with minimal latency.  
   - App should be optimized for quick link creation and analytics retrieval.
2. **Security**  
   - Implement secure authentication and authorization using Better-Auth.  
   - Protect user data and stored links from unauthorized access.
3. **Scalability**  
   - Architecture should allow adding more analytics features or expanding the number of supported domains without major refactoring.
4. **Maintainability**  
   - Code should follow best practices and be modular to facilitate future enhancements and fixes.

## 6. Technology Stack
1. **Front-End**  
   - Next.js (App Router) for server-rendered React application and routing.  
   - SHADCN for UI components (ensuring a consistent and accessible look and feel).
2. **State Management**  
   - Zustand for managing complex global states (e.g., user information, domain details, link lists).
3. **Authentication**  
   - Better-Auth for handling user authentication and authorization, token/session management, and integration with Next.js.
4. **Back-End API**  
   - Next.js API routes (or a separate server if needed) for logic including:  
     - Link creation (slug and domain handling).  
     - Domain verification.  
     - Analytics collection (storing IP, user agent, and click data).
5. **Database**  
   - Any relational or NoSQL DB (not specified but recommended options could be PostgreSQL, MySQL, or MongoDB).  
   - Store link data, domain data, user data, and analytics data.

## 7. Project Stakeholders
- **Product Owner:** Responsible for finalizing the feature set, prioritizing stories.  
- **Development Team:** Comprising front-end, back-end, and full-stack engineers.  
- **Users:** Individuals who will create short links, manage domains, and review analytics.

## 8. User Stories
1. **As a user, I can register and log in**  
   So that I can securely manage my links and domains.
2. **As a user, I can create a short link**  
   So that I can share shorter, branded links easily.
3. **As a user, I can view analytics for my short link**  
   So that I can understand click patterns (counts, IPs, user agents).
4. **As a user, I can add a custom domain and verify it**  
   So that I can use my branded domain for short links.
5. **As a user, I can see only my links and domains**  
   So that sensitive data is not visible to others.
6. **As a user, I can track usage statistics**  
   So that I can analyze and optimize my marketing or link sharing strategy.

## 9. High-Level Project Plan
1. **Planning & Requirements** (Current Phase)  
   - Finalize scope, functional and non-functional requirements.  
   - Define user stories and acceptance criteria.

2. **Design**  
   - Plan the UI using wireframes or prototypes.  
   - Establish data models (e.g., schema for links, domains, users, analytics).  
   - Confirm architecture for Next.js and server-side rendering approach.

3. **Implementation**  
   - Set up project structure with Next.js (App Router), SHADCN integration, and Zustand for state management.  
   - Integrate Better-Auth for authentication.  
   - Implement core link creation and domain verification functionalities.  
   - Handle analytics gathering on link redirects (IP, user agent, clicks).

4. **Testing**  
   - Unit tests for core functionalities (e.g., link creation, domain verification, analytics).  
   - Integration testing for end-to-end flows (short link usage, dashboard analytics).  
   - Security testing to ensure only authorized users can access their links.

5. **Deployment**  
   - Deploy to a chosen hosting environment (e.g., Vercel, AWS, or other).  
   - Set up monitoring and logging.

6. **Maintenance & Future Enhancements**  
   - Add advanced analytics (e.g., geolocation, referrers, browser breakdown).  
   - Implement link expiration or dynamic parameters if needed.

## 10. Risks and Mitigation

| Risk                                        | Mitigation Strategy                                                       |
|---------------------------------------------|---------------------------------------------------------------------------|
| Scalability issues due to analytics volume  | Use a scalable database; optimize queries; consider caching strategies.   |
| Custom domain DNS verification complexities | Provide clear setup instructions; implement robust DNS checking logic.     |
| Security vulnerabilities (e.g. open redirects, cross-user data leaks) | Enforce strict ownership checks; sanitize inputs; use best practices in web security. |
| Data privacy concerns (collecting IP, user agent data) | Provide clear usage terms; anonymize or secure data appropriately.         |

## 11. Acceptance Criteria
1. **Link Creation & Redirection**  
   - Users can create a link and the shortened version redirects correctly to the original URL.
2. **Authentication**  
   - Only authenticated users can manage or view their own links.
3. **Custom Domain Verification**  
   - System should correctly detect valid DNS records and allow domain usage only after verification.
4. **Analytics**  
   - IP address, user agent, click counts are stored and retrievable for each user’s links.
5. **Ease of Use**  
   - The UI built with SHADCN components should be clear and intuitive for creating and managing links.

---

### End of Document

This Project Requirement Document aims to ensure the team has a clear understanding of the application’s objectives, scope, and functional expectations. Updates to these requirements should be managed through a formal change process to maintain clarity and alignment among all stakeholders.