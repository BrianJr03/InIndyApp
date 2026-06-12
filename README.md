# InIndy

Indianapolis has a lot going on... trail runs, park picnics, pickup games, neighborhood meetups, etc. Unfortunately, there is no single place to find it all. InIndy is a community app for people who want to get outside and connect with others in their neighborhood. Post an activity, see what's happening nearby, join a group, and show up.

Available on Android and iOS.

---

## Features

**Explore**
- Browse activities happening across Indianapolis neighborhoods
- Filter by your neighborhood or a specific group
- See who's going and RSVP to activities you want to join

**Post an Activity**
- Share a run, hike, picnic, game night, or anything in between
- Add photos, a location, date and time, and activity tags
- Post to your neighborhood feed or a private group

**Groups**
- Create and manage groups for your regular crew
- Invite members, post group-only activities, and see who's in
- Search and join open groups across the city

**Me**
- Your personal hub — all your past and upcoming posts in one place
- Edit your profile, neighborhood, and interests
- See your activity history

**Neighborhoods**
- Broad Ripple, Fountain Square, Mass Ave, Irvington, Downtown, and 40+ more Indianapolis neighborhoods
- Posts are tied to neighborhoods so you always know where things are happening

---

## Tech Stack

**Mobile**
- Kotlin Multiplatform (KMP) + Compose Multiplatform — shared UI and logic across Android and iOS
- MVI architecture — sealed `UiState`, unidirectional data flow, `onIntent()`
- Koin — dependency injection
- Ktor — HTTP client
- Coil 3 — image loading
- SQLDelight — local database (configured, used for caching)
- DataStore — user preferences persistence
- AndroidX FileProvider — secure file URI handling for camera/gallery

**Backend**
- Supabase — Postgres database, Auth, Realtime, Edge Functions, Row Level Security
- PostGIS — geo queries on neighborhoods
- Supabase Edge Functions (Deno/TypeScript) — serverless functions for R2 signed URL generation

**Media**
- Cloudflare R2 — object storage for post images, avatars, group covers
- Cloudflare CDN — public image serving

**Auth**
- Supabase Auth — email magic link (MVP)
- PKCE flow — deep link callback handling on both Android and iOS
- Google + Apple sign-in stubbed for post-MVP
