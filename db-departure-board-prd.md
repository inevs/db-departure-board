# Product Requirement Document: DB Departure Board Dashboard

## 1. Product Overview

### 1.1 Purpose
A web-based dashboard displaying real-time Deutsche Bahn train departures for a company lobby, designed for training attendees to check train schedules throughout the day.

### 1.2 Key Characteristics
- **Public display** with no user interaction
- **Admin-configured** via YAML configuration file
- **Read-only** departure information display
- **Automatic refresh** and pagination

## 2. User Context

### 2.1 Primary Users
Training attendees in a company lobby who need to check train departure times to plan their journey home.

### 2.2 Viewing Environment
- **Location**: Company lobby
- **Display Type**: Wall-mounted or standing display
- **Viewing Distance**: Across lobby (requires large, clear text)
- **Interaction**: None (passive viewing only)

## 3. Functional Requirements

### 3.1 Core Display Information

Each departure must show:
1. **Train Type & Number** (combined format, e.g., "ICE 234", "RE 5678", "S3")
2. **Destination** (German city/station names)
3. **Departure Time** (24-hour format, e.g., "13:45")
4. **Delay Information** (original time with "+X Min" in red)
5. **Platform/Track Number** (e.g., "Gleis 7")

### 3.2 Data Source
- **API**: Deutsche Bahn OpenData API (free tier)
- **Coverage**: Deutsche Bahn trains within Germany only
- **Station**: Single station (configured via config file)

### 3.3 Display Logic

#### Time Window
- Show departures for the next 4-5 hours (configurable)
- Remove departed trains immediately after scheduled departure time

#### Pagination
- Display 10-15 departures per page (configurable)
- Auto-switch pages every 2 minutes if more departures exist
- Sort by departure time (earliest first)

#### Data Refresh
- Refresh departure data every 5 minutes
- Show "Last updated: [timestamp]" if data fetch fails
- Continue displaying last known data during connection failures

#### Special Cases
- No departures available: Show "No departures in the next 5 hours"
- Service disruptions: Display prominently (see section 3.5)

### 3.4 Layout Structure

```
[Station Name]          [Date/Time]           [Company Logo]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZUG     ZEIT    ZIEL              GLEIS   HINWEISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ICE 573  12:39  MÜNCHEN HBF         7     Pünktlich
RE 4365  12:52  NÜRNBERG HBF        3     +5 Min
S3       13:05  MAMMENDORF          2     Pünktlich
...
```

### 3.5 Status Display ("HINWEISE" Column)

Display combinations of:
- **Pünktlich** - On time (green or default color)
- **+X Min** - Delays (red)
- **Ausfall** - Cancelled (red, possibly with strikethrough)
- **Gleis X statt Y** - Platform changes (red)
- **SEV** - Bus replacement service (prominent display)

## 4. Visual Design Requirements

### 4.1 Style
- Based on classic train station departure boards
- Black background with high contrast text
- Amber/yellow color scheme adapted for German conventions

### 4.2 Typography
- Large, clear monospace or sans-serif font
- Readable from across a lobby
- High contrast for visibility

### 4.3 Color Scheme
- Background: Black (#000000)
- Default text: Amber/Yellow (#FFBB00)
- Delays/Issues: Red (#FF0000)
- On-time status: Green (#00FF00) or default amber

### 4.4 Resolution
- Fixed layout optimized for 1920x1080 (Full HD)
- No responsive scaling needed

## 5. Configuration File (config.yaml)

### 5.1 Required Settings
```yaml
# Station configuration
station_id: "8000001"  # DB station ID
station_name: "Berlin Hbf"  # Display name

# Time settings
time_window_hours: 5  # How many hours ahead to show
refresh_interval_minutes: 5  # Data refresh frequency

# Display settings
departures_per_page: 12  # Number of departures per page
page_switch_interval_seconds: 120  # Auto-pagination interval

# Language
display_language: "de"  # German (de) or English (en)

# Filtering
train_types:  # Leave empty for all, or specify: ["ICE", "IC", "RE", "RB", "S"]
  - all

# Company branding
company_logo_path: "./assets/logo.png"  # Path to company logo
```

### 5.2 Error Handling
- Application fails to start with clear error messages for invalid configuration
- All settings must be valid; no fallback to defaults

## 6. Technical Requirements

### 6.1 Platform
- Web-based application
- Compatible with modern browsers (Chrome, Firefox, Edge)
- No browser-specific features required

### 6.2 Performance
- Page load time: < 3 seconds
- Smooth page transitions
- No flickering during data updates

### 6.3 Deployment
- Static web application
- Can run on any web server
- No database required (all data from API)

## 7. Error Handling

### 7.1 Connection Failures
- Display last known data with "Last updated" timestamp
- No error popups or disruptive messages
- Automatic recovery when connection restored

### 7.2 API Errors
- Log errors for admin review
- Continue showing cached data
- Clear visual indicator of data staleness

## 8. Non-Functional Requirements

### 8.1 Reliability
- 24/7 operation capability
- Graceful handling of API limits
- No memory leaks over extended operation

### 8.2 Maintainability
- Clear code documentation
- Simple YAML configuration
- Logging for troubleshooting

### 8.3 Security
- Read-only API access
- No user data collection
- No authentication required for viewing

## 9. Out of Scope

- User interaction/touch controls
- Mobile responsive design
- Journey planning features
- Ticket purchasing
- Multi-station display
- Historical departure data
- Arrival information

## 10. Delivery Requirements

### 10.1 Deliverables
1. Web application source code
2. Configuration file template
3. Deployment instructions
4. Admin documentation for configuration
5. Logo/asset integration guidelines

### 10.2 Documentation
- How to obtain DB API access
- Configuration file parameters
- Troubleshooting guide
- Browser kiosk mode setup instructions