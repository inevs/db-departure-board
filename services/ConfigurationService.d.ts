/**
 * Configuration Service - Handles loading and parsing of YAML configuration
 *
 * This service is responsible for:
 * - Loading configuration from file
 * - Parsing YAML content
 * - Creating validated Configuration domain objects
 * - Providing error handling for configuration issues
 */
import { Configuration } from '../domain/Configuration';
export declare class ConfigurationService {
    private static instance;
    private loadedConfiguration;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): ConfigurationService;
    /**
     * Load configuration from YAML file
     */
    loadConfiguration(configPath?: string): Promise<Configuration>;
    /**
     * Get the currently loaded configuration
     */
    getConfiguration(): Configuration;
    /**
     * Check if configuration has been loaded
     */
    isLoaded(): boolean;
    /**
     * Reload configuration (useful for runtime updates)
     */
    reloadConfiguration(configPath?: string): Promise<Configuration>;
    /**
     * Fetch configuration file content
     */
    private fetchConfigurationFile;
    /**
     * Parse YAML configuration content
     */
    private parseYamlConfiguration;
    /**
     * Create user-friendly error messages
     */
    private createUserFriendlyErrorMessage;
    /**
     * Validate configuration file exists and is readable (for debugging)
     */
    validateConfigurationFile(configPath?: string): Promise<boolean>;
    /**
     * Get default configuration for fallback scenarios
     */
    getDefaultConfiguration(): Configuration;
}
/**
 * Custom error for configuration loading failures
 */
export declare class ConfigurationLoadError extends Error {
    readonly originalError: unknown;
    constructor(message: string, originalError: unknown);
}
//# sourceMappingURL=ConfigurationService.d.ts.map