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
export declare class Configuration {
    private readonly data;
    constructor(data: ConfigurationData);
    /**
     * Validate configuration data according to business rules
     */
    private validateConfiguration;
    get stationId(): string;
    get stationName(): string;
    get timeWindowHours(): number;
    get refreshIntervalMinutes(): number;
    get departuresPerPage(): number;
    get pageSwitchIntervalSeconds(): number;
    get displayLanguage(): string;
    get trainTypes(): string[];
    get companyLogoPath(): string;
    /**
     * Convert configuration to JSON for debugging/logging
     */
    toJSON(): ConfigurationData;
    /**
     * Check if all train types should be shown
     */
    showAllTrainTypes(): boolean;
    /**
     * Get refresh interval in milliseconds
     */
    getRefreshIntervalMs(): number;
    /**
     * Get page switch interval in milliseconds
     */
    getPageSwitchIntervalMs(): number;
}
/**
 * Custom error for configuration validation failures
 */
export declare class ConfigurationValidationError extends Error {
    readonly validationErrors: string[];
    constructor(errors: string[]);
}
//# sourceMappingURL=Configuration.d.ts.map