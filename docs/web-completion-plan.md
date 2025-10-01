# RosterUp Web App - Completion Plan

## Priority 1: Core Functionality Gaps (Must Have)

### 1. Stripe Connect Integration
- [ ] Org-level Stripe Connect onboarding flow
- [ ] Connect status display in org settings
- [ ] Webhook handling for account updates
- [ ] Payout dashboard
- [ ] Fee collection on paid listings

### 2. Edit/Update Operations
- [ ] Edit listing details (title, description, requirements)
- [ ] Update team information
- [ ] Edit season dates
- [ ] Close/reopen listings manually
- [ ] Edit org settings and refund policy

### 3. Offers System
- [ ] Create offers from accepted applications
- [ ] Set offer expiration dates
- [ ] Offer status tracking (pending/accepted/declined/expired)
- [ ] Auto-withdraw other offers on acceptance
- [ ] Offer expiration notifications

### 4. Messaging System
- [ ] Real-time messaging in application conversations
- [ ] Message notifications
- [ ] File/image attachments
- [ ] Read receipts
- [ ] Conversation search

### 5. Mini-Site Builder
- [ ] Page creation interface
- [ ] Drag-drop block editor
- [ ] Block types: Hero, Roster, Schedule, Achievements, Shop
- [ ] Preview mode
- [ ] Publish/unpublish controls
- [ ] Custom branding (colors, fonts, logo)

### 6. Analytics Dashboard
- [ ] Traffic analytics (views, unique visitors)
- [ ] Application funnel (started → submitted → accepted)
- [ ] Revenue tracking
- [ ] Conversion rates
- [ ] Export to CSV

## Priority 2: Enhanced Features (Should Have)

### 7. Bulk Operations
- [ ] Bulk status updates for applications
- [ ] Bulk messaging to applicants
- [ ] Bulk export applications
- [ ] Bulk invite parents to apply

### 8. Team Member Management
- [ ] Invite coaches/admins by email
- [ ] Role management (coach, admin, editor, finance)
- [ ] Permission controls
- [ ] Activity logs

### 9. Schedule Management
- [ ] Practice schedule creation
- [ ] Game schedule with opponents
- [ ] Calendar sync (iCal export)
- [ ] Schedule visibility controls

### 10. Email Notifications
- [ ] Application received
- [ ] Status updates
- [ ] New messages
- [ ] Offer expiring soon
- [ ] Payment confirmations

### 11. Financial Features
- [ ] Revenue reports by team/season
- [ ] Refund processing
- [ ] Invoice generation
- [ ] Financial export for accounting

### 12. Advanced Search & Filters
- [ ] Search applications by name/location
- [ ] Filter by multiple statuses
- [ ] Date range filters
- [ ] Saved filter sets

## Priority 3: Polish & UX (Nice to Have)

### 13. Dashboard Enhancements
- [ ] Customizable dashboard widgets
- [ ] Recent activity feed
- [ ] Quick stats comparison (vs last season)
- [ ] Upcoming deadlines widget

### 14. Templates
- [ ] Listing templates by sport
- [ ] Message templates
- [ ] Email templates
- [ ] Site page templates

### 15. Mobile Responsiveness
- [ ] Optimize all pages for mobile
- [ ] Touch-friendly interfaces
- [ ] Mobile-specific navigation

### 16. Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] High contrast mode

### 17. Settings & Preferences
- [ ] User profile management
- [ ] Notification preferences
- [ ] Time zone settings
- [ ] Language preferences (future)

## Technical Debt & Infrastructure

### 18. Error Handling
- [ ] Global error boundary
- [ ] User-friendly error messages
- [ ] Retry mechanisms
- [ ] Offline support indicators

### 19. Performance
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Pagination for large lists
- [ ] Caching strategies

### 20. Security
- [ ] Rate limiting on API routes
- [ ] Input validation with Zod
- [ ] XSS prevention
- [ ] CSRF protection

### 21. Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for API routes
- [ ] E2E tests for critical flows
- [ ] Load testing

### 22. Deployment & DevOps
- [ ] Environment configurations
- [ ] CI/CD pipeline
- [ ] Error monitoring (Sentry)
- [ ] Analytics (Posthog/Mixpanel)

## Implementation Order

### Sprint 1 (Critical Path - 1 week)
1. Stripe Connect Integration
2. Edit operations for listings/teams
3. Offers system
4. Basic messaging

### Sprint 2 (Core Features - 1 week)
5. Mini-site builder (basic)
6. Analytics dashboard
7. Email notifications
8. Team member management

### Sprint 3 (Enhancement - 1 week)
9. Bulk operations
10. Schedule management
11. Financial features
12. Advanced search

### Sprint 4 (Polish - 1 week)
13. Mobile responsiveness
14. Templates
15. Accessibility
16. Performance optimization

## Database Schema Updates Needed

```sql
-- Add missing fields
ALTER TABLE public.team_admins ADD COLUMN invited_at TIMESTAMPTZ;
ALTER TABLE public.team_admins ADD COLUMN accepted_at TIMESTAMPTZ;

-- Email templates
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.orgs(id),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved filters
CREATE TABLE public.saved_filters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  filters JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity logs
CREATE TABLE public.activity_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Immediate Next Steps

1. **Stripe Connect** - Most critical for monetization
2. **Edit Operations** - Basic CRUD completion
3. **Offers System** - Complete the application flow
4. **Messaging** - Enable coach-parent communication

These four items would make the platform minimally viable for real use.
