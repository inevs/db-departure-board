# DB Departure Board - Project Brief

## Overview
Build a web-based departure board dashboard displaying real-time Deutsche Bahn train departures for a company lobby. This is a read-only display with no user interaction, configured by admins via YAML file.

## Core Requirements

### Display Information
Each departure shows:
- Train (e.g., "ICE 234", "RE 5678", "S3")
- Time (24h format: "13:45")
- Destination (German stations)
- Platform ("Gleis 7")
- Status (delays "+5 Min" in red, "Pünktlich", platform changes, cancellations)

### Visual Design
- Classic train station departure board style
- Black background (#000000)
- Amber/yellow text (#FFBB00)
- Red for delays/issues (#FF0000)
- Fixed 1920x1080 resolution
- Large, readable monospace font

### Layout
use @design-mocks/screen.jpg

```
[Station Name]          [Date/Time]           [Company Logo]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZUG     ZEIT    ZIEL              GLEIS   HINWEISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ICE 573  12:39  MÜNCHEN HBF         7     Pünktlich
RE 4365  12:52  NÜRNBERG HBF        3     +5 Min
S3       13:05  MAMMENDORF          2     Ausfall
```

### Behavior
- Show next 4-5 hours of departures (configurable)
- 10-15 departures per page (configurable)
- Auto-switch pages every 2 minutes if more exist
- Refresh data every 5 minutes
- Remove departed trains immediately
- Show "Last updated: [time]" if connection fails
- Display "No departures in the next 5 hours" when empty

### Configuration (config.yaml)
```yaml
station_id: "8000105"
station_name: "Frankfurt Hbf"
time_window_hours: 5
refresh_interval_minutes: 5
departures_per_page: 12
page_switch_interval_seconds: 120
display_language: "de"
train_types: ["all"]
company_logo_path: "./assets/logo.png"
```

### Technical Stack
- Typescript
- npm for package management
- HTML5/CSS3
- Deutsche Bahn OpenData API
- Must run in Chrome, Firefox, Edge

### API Integration
- Use DB OpenData API (free tier)
- Endpoints needed:
  - Departure board: `/freeplan/v1/departureBoard/{id}`
  - Station search: `/freeplan/v1/location/name/{name}`
- Handle rate limits gracefully
- Cache last successful response

### Error Handling
- Invalid config: Fail with clear error message
- API failures: Show cached data with timestamp
- No departures: Show helpful message
- Network issues: Graceful degradation

### Special Cases
- SEV (bus replacement): Prominent display
- Platform changes: Red highlight "Gleis 3 statt 2"
- Cancellations: Red "Ausfall"
- Multiple issues: Combine in status column

## File Structure
- domain specific file structure

## Development Priorities
1. Basic HTML structure with correct layout
2. CSS for departure board styling
3. Config file loading and parsing
4. API integration with mock fallback
5. Display logic and auto-refresh
6. Pagination system
7. Error handling and edge cases
8. Polish and optimization

## Key Constraints
- No user interaction (display only)
- Must be readable from across a lobby
- Immediate departure removal (no fade out)
- German railway conventions (time format, terminology)

## Architectural constraints
- Respect Clean Code principles
- Respect Clean Architecture principles: Separate domain logic from technical aspects

## Testing
- unit test suites with mocking for test isolation
- e2e tests
- test first approach
- small steps
- ensure all tests are green before git commit