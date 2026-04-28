# Freshman Product Capability Brief

This document is a factual feature outline for marketing handoff.
Scope:
- `app/` (mobile app)
- `freshman-web-app/` (web app)

## Product Positioning (Operational)

Freshman currently operates as a two-surface learning product:
- **Mobile app (`app/`)**: daily study execution, drills, tests, and on-the-go revision.
- **Web app (`freshman-web-app/`)**: desktop workspace for reading sources, highlighting, and AI tutor interactions.

## Mobile App (`app/`) — What It Does

## 1) Core Navigation Experience
- Tab-based app structure with dedicated areas: `Feed`, `Library`, `Create`, `Revision`, and `Tests`.
- Auth-gated main experience (users are redirected to onboarding if not signed in).
- Push notification identity integration (OneSignal login with user ID).

## 2) Content Creation and Ingestion
- Upload workflows for:
  - Notes
  - Textbooks
  - Past papers
- Flashcard deck creation flow.
- Subject creation and organization.
- Upload processing tracking ("uploads in progress" state and count).

## 3) Daily Feed and Recall Loop
- Swipe-based feed cards for revision with difficulty feedback (`easy`, `medium`, `hard`).
- Session progression, completion tracking, and score/mix summary.
- Built-in walkthrough for first-time feed usage.
- Completion state with celebratory UX (confetti).
- Free-plan gating in feed after limited card count, with upgrade prompt.

## 4) Testing and Assessment Modes
- Test hub with separate buckets for:
  - Quizzes
  - Active Recall tests
  - Mock Exams
  - Past Papers
- Flows for creating, taking, reviewing, and summarizing tests.
- Exam setup flows (selection, duration, chapters/notes, answer/review/results screens).

## 5) Library and Study Materials
- Browsable collections for notes, books, subjects, and flashcards.
- Note and chapter-level study views.
- Search and listing screens for learning assets.

## 6) Sharing and Distribution
- Share flows for:
  - Notes
  - Flashcards
  - Past papers
  - Books
- Deep-link share routes for opening shared resources by code.

## 7) Onboarding and Personalization
- Multi-step onboarding covering:
  - Account creation and verification
  - Language and theme preferences
  - Study goals and study methods
  - Revision method and exam prep preferences
  - Introductory feature walkthroughs
- Localization coverage with multiple language files (`en`, `es`, `fr`, `de`).

## 8) Subscription and Monetization
- Paywall entry points throughout feature-gated flows.
- Free-vs-premium usage restrictions in create/feed experiences.
- Subscription/paywall screens and post-subscription state handling.

## 9) User Account and Settings
- Profile and settings surfaces for account details and preferences.
- Appearance, language, notifications, logout, and account-related actions.

## 10) Analytics and Instrumentation
- Mixpanel event tracking for feed behavior and lifecycle events.
- Review prompt triggering tied to meaningful moments.

## Web App (`freshman-web-app/`) — What It Does

## 1) Core Workspace Experience
- Desktop-oriented workspace shell with:
  - Left navigation/sidebar
  - Central reader/work area
  - Right context/sidebar panel
- Global source search modal and source switching.
- Empty state when no active source is selected.

## 2) Source Types and Reading Modes
- Supports multiple source types in workspace:
  - PDF/document rendering (`PdfReader`)
  - Text document rendering (`DocumentTextReader`)
  - URL/web content reading (`UrlReader`)
  - Internal note rendering (`NoteReader` for mock/internal flows)
- Reader mode switching logic by source type.

## 3) Highlights and Selection Workflows
- Text highlighting on supported reader types.
- Highlight creation/removal/refresh flows.
- Sidebar-linked highlight navigation (jump/scroll to source location).
- Highlight chat modal for discussions anchored to selected content.

## 4) AI Tutor and Voice Interaction Layer
- Voice session provider and voice-triggered interaction controls.
- Recording controls and voice session banner.
- Voice turn/session APIs and associated pipeline modules.
- Tutor persona naming support (`tutorName`, default fallback in UI).

## 5) Source Lifecycle and Data Operations
- Source ingestion APIs for:
  - File upload
  - URL ingestion
  - Source listing and retrieval
  - Signed URL generation
  - Source text/highlight retrieval
- Source indexing status support in data model/workflow.

## 6) Onboarding and Auth
- Web onboarding sequence with steps for:
  - Language
  - Goals
  - Study method
  - Revision method
  - Exam prep
  - Profile and academic profile
  - Hear-about and pricing
  - Completion
- Auth pages and callback handling (`login`, `signup`, auth callback, post-auth API route).

## 7) Billing, Pricing, and Account Management
- Stripe integration routes for:
  - Checkout session creation
  - Portal session creation
  - Webhook handling
  - Subscription status and apply-code APIs
- Usage limits and billing enforcement modules.
- Account management modals (settings, profile, logout, delete account).

## 8) UI Utility Workflows
- Workspace modals for:
  - Uploading documents
  - Search notes
  - Renaming/deleting notes
  - Pricing and profile
  - Highlight and voice-related actions
- Bottom toolbar mode switching (voice/highlight depending on source type).

## 9) Observability and Analytics
- Mixpanel web init/identify/session tracking in workspace shell.
- Session-level instrumentation tied to user identity and plan.

## Shared Cross-Platform Product Themes

These are present across both codebases and can be framed as unified product pillars:
- **AI-assisted study from user-owned materials** (notes, documents, papers).
- **Active recall and testing as primary learning mechanism**.
- **Freemium-to-premium monetization with clear usage limits**.
- **Structured onboarding and personalization**.
- **Account + subscription management backed by Supabase/Stripe stack**.
- **Tracking and analytics instrumentation for product usage behavior**.

## Platform Distinction (For Marketers)

Use this as a simple delineation:
- **Mobile app (`app/`)**: execution layer for daily study behavior (feed, tests, revision loops, quick interactions).
- **Web app (`freshman-web-app/`)**: deep study workspace layer (reader, source management, highlights, AI/voice tutoring).

## Known Messaging Constraints (Important for Copy Team)

- Avoid making unsupported absolute claims (e.g., "guaranteed grades").
- Position as a two-surface system, not two unrelated products.
- Keep Android messaging careful: mobile codebase includes Android support paths, but launch status should match real release plan.
- Premium messaging should align with actual gating points (feed limits, feature restrictions, paywall routes).

