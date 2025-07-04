/**
 * Domain model for application configuration
 * 
 * This represents the configuration structure as defined in CLAUDE.md
 * All validation logic is contained within this domain entity
 */

export interface ConfigurationData {
    station_id: string;
    station_name: string;
    time_window_hours: number;
    refresh_interval_minutes: number;
    departures_per_page: number;
    page_switch_interval_seconds: number;
    display_language: string;
    train_types: string[];
    company_logo_path: string;
}

export class Configuration {
    private readonly data: ConfigurationData;

    constructor(data: ConfigurationData) {
        this.validateConfiguration(data);
        this.data = { ...data };
    }

    /**
     * Validate configuration data according to business rules
     */
    private validateConfiguration(data: ConfigurationData): void {
        const errors: string[] = [];

        // Station ID validation
        if (!data.station_id || typeof data.station_id !== 'string' || data.station_id.trim().length === 0) {
            errors.push('station_id must be a non-empty string');
        }

        // Station name validation
        if (!data.station_name || typeof data.station_name !== 'string' || data.station_name.trim().length === 0) {
            errors.push('station_name must be a non-empty string');
        }

        // Time window hours validation
        if (typeof data.time_window_hours !== 'number' || data.time_window_hours < 1 || data.time_window_hours > 24) {
            errors.push('time_window_hours must be a number between 1 and 24');
        }

        // Refresh interval validation
        if (typeof data.refresh_interval_minutes !== 'number' || data.refresh_interval_minutes < 1 || data.refresh_interval_minutes > 60) {
            errors.push('refresh_interval_minutes must be a number between 1 and 60');
        }

        // Departures per page validation
        if (typeof data.departures_per_page !== 'number' || data.departures_per_page < 1 || data.departures_per_page > 50) {
            errors.push('departures_per_page must be a number between 1 and 50');
        }

        // Page switch interval validation
        if (typeof data.page_switch_interval_seconds !== 'number' || data.page_switch_interval_seconds < 30 || data.page_switch_interval_seconds > 600) {
            errors.push('page_switch_interval_seconds must be a number between 30 and 600');
        }

        // Display language validation
        const supportedLanguages = ['de', 'en'];
        if (!data.display_language || !supportedLanguages.includes(data.display_language)) {
            errors.push(`display_language must be one of: ${supportedLanguages.join(', ')}`);
        }

        // Train types validation
        if (!Array.isArray(data.train_types) || data.train_types.length === 0) {
            errors.push('train_types must be a non-empty array');
        } else {
            const validTrainTypes = ['all', 'ICE', 'IC', 'EC', 'RE', 'RB', 'S'];
            const invalidTypes = data.train_types.filter(type => !validTrainTypes.includes(type));
            if (invalidTypes.length > 0) {
                errors.push(`Invalid train types: ${invalidTypes.join(', ')}. Valid types: ${validTrainTypes.join(', ')}`);
            }
        }

        // Company logo path validation
        if (!data.company_logo_path || typeof data.company_logo_path !== 'string' || data.company_logo_path.trim().length === 0) {
            errors.push('company_logo_path must be a non-empty string');
        }

        if (errors.length > 0) {
            throw new ConfigurationValidationError(errors);
        }
    }

    // Getters for accessing configuration data
    get stationId(): string {
        return this.data.station_id;
    }

    get stationName(): string {
        return this.data.station_name;
    }

    get timeWindowHours(): number {
        return this.data.time_window_hours;
    }

    get refreshIntervalMinutes(): number {
        return this.data.refresh_interval_minutes;
    }

    get departuresPerPage(): number {
        return this.data.departures_per_page;
    }

    get pageSwitchIntervalSeconds(): number {
        return this.data.page_switch_interval_seconds;
    }

    get displayLanguage(): string {
        return this.data.display_language;
    }

    get trainTypes(): string[] {
        return [...this.data.train_types];
    }

    get companyLogoPath(): string {
        return this.data.company_logo_path;
    }

    /**
     * Convert configuration to JSON for debugging/logging
     */
    toJSON(): ConfigurationData {
        return { ...this.data };
    }

    /**
     * Check if all train types should be shown
     */
    showAllTrainTypes(): boolean {
        return this.data.train_types.includes('all');
    }

    /**
     * Get refresh interval in milliseconds
     */
    getRefreshIntervalMs(): number {
        return this.data.refresh_interval_minutes * 60 * 1000;
    }

    /**
     * Get page switch interval in milliseconds
     */
    getPageSwitchIntervalMs(): number {
        return this.data.page_switch_interval_seconds * 1000;
    }
}

/**
 * Custom error for configuration validation failures
 */
export class ConfigurationValidationError extends Error {
    public readonly validationErrors: string[];

    constructor(errors: string[]) {
        const message = `Configuration validation failed:\n- ${errors.join('\n- ')}`;
        super(message);
        this.name = 'ConfigurationValidationError';
        this.validationErrors = errors;
    }
}