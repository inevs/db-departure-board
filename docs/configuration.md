# Configuration Documentation

## Overview

The DB Departure Board application is configured using a YAML file (`config.yaml`) that defines all operational parameters. The configuration system provides comprehensive validation and clear error messages for incorrect values.

## Configuration File Location

The configuration file must be located at the project root as `config.yaml`.

## Configuration Options

### Basic Settings

#### `station_id` (required)
- **Type**: String
- **Description**: Deutsche Bahn station identifier
- **Example**: `"8000105"` (Frankfurt Hbf)
- **Validation**: Must be a non-empty string

#### `station_name` (required)
- **Type**: String  
- **Description**: Display name for the station shown in the header
- **Example**: `"Frankfurt Hbf"`
- **Validation**: Must be a non-empty string

### Time and Refresh Settings

#### `time_window_hours` (required)
- **Type**: Number
- **Description**: Number of hours to show departures for
- **Range**: 1-24 hours
- **Example**: `5`
- **Validation**: Must be between 1 and 24

#### `refresh_interval_minutes` (required)
- **Type**: Number
- **Description**: How often to refresh departure data
- **Range**: 1-60 minutes
- **Example**: `5`
- **Validation**: Must be between 1 and 60

### Display Settings

#### `departures_per_page` (required)
- **Type**: Number
- **Description**: Maximum number of departures to show per page
- **Range**: 1-50 departures
- **Example**: `12`
- **Validation**: Must be between 1 and 50

#### `page_switch_interval_seconds` (required)
- **Type**: Number
- **Description**: Time to wait before switching to next page (if multiple pages exist)
- **Range**: 30-600 seconds
- **Example**: `120`
- **Validation**: Must be between 30 and 600

#### `display_language` (required)
- **Type**: String
- **Description**: Language for UI text and date/time formatting
- **Allowed Values**: `"de"`, `"en"`
- **Example**: `"de"`
- **Validation**: Must be one of the supported languages

### Train Filter Settings

#### `train_types` (required)
- **Type**: Array of strings
- **Description**: Which train types to display
- **Allowed Values**: 
  - `"all"` - Show all train types
  - `"ICE"` - High-speed trains
  - `"IC"` - InterCity trains
  - `"EC"` - EuroCity trains
  - `"RE"` - Regional Express
  - `"RB"` - Regional trains
  - `"S"` - S-Bahn (suburban trains)
- **Example**: `["all"]` or `["ICE", "IC", "RE"]`
- **Validation**: Must be a non-empty array with valid train type values

### Visual Settings

#### `company_logo_path` (required)
- **Type**: String
- **Description**: Path to company logo image file
- **Example**: `"./assets/logo.png"`
- **Validation**: Must be a non-empty string
- **Note**: Logo will be hidden if file cannot be loaded

## Complete Example Configuration

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

## Error Handling

The configuration system provides detailed error messages for common issues:

### File Not Found
```
Configuration file missing: ./config.yaml
  • Make sure the config.yaml file exists in the project root
  • Check the file path and permissions
```

### Invalid YAML Syntax
```
Configuration file has invalid YAML syntax: ./config.yaml
  • Invalid YAML syntax: end of the stream or a document separator is expected
  • Check for proper indentation and syntax in the YAML file
```

### Validation Errors
```
Configuration validation failed in ./config.yaml:
  • time_window_hours must be a number between 1 and 24
  • display_language must be one of: de, en
  • Invalid train types: INVALID. Valid types: all, ICE, IC, EC, RE, RB, S
```

## Common Station IDs

Here are some common Deutsche Bahn station IDs for reference:

- **8000105** - Frankfurt (Main) Hbf
- **8000261** - München Hbf
- **8000096** - Düsseldorf Hbf
- **8000152** - Hamburg Hbf
- **8000207** - Köln Hbf
- **8011160** - Berlin Hbf

## Troubleshooting

### Application Won't Start
1. Check that `config.yaml` exists in the project root
2. Validate YAML syntax using an online YAML validator
3. Ensure all required fields are present
4. Check that values are within allowed ranges

### Logo Not Showing
1. Verify the logo file exists at the specified path
2. Check that the path is relative to the project root
3. Ensure the image format is supported (PNG, JPG, SVG)

### Invalid Station Data
1. Verify the `station_id` is correct for your desired station
2. Check Deutsche Bahn's station database for valid IDs
3. Ensure the station supports departure data in the API

## Performance Considerations

- **Refresh Interval**: Very frequent refreshes (< 2 minutes) may hit API rate limits
- **Departures Per Page**: Large numbers (> 20) may impact readability
- **Time Window**: Longer windows (> 8 hours) may return too much data

## Security Notes

- Configuration files should not contain sensitive API keys
- Ensure proper file permissions on the config file
- Logo paths should not reference external URLs for security reasons