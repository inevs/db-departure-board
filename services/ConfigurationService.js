/**
 * Configuration Service - Handles loading and parsing of YAML configuration
 *
 * This service is responsible for:
 * - Loading configuration from file
 * - Parsing YAML content
 * - Creating validated Configuration domain objects
 * - Providing error handling for configuration issues
 */
import * as yaml from 'js-yaml';
import { Configuration, ConfigurationValidationError } from '../domain/Configuration';
export class ConfigurationService {
    constructor() {
        this.loadedConfiguration = null;
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!ConfigurationService.instance) {
            ConfigurationService.instance = new ConfigurationService();
        }
        return ConfigurationService.instance;
    }
    /**
     * Load configuration from YAML file
     */
    async loadConfiguration(configPath = './config.yaml') {
        try {
            console.log(`Loading configuration from: ${configPath}`);
            // Fetch the configuration file
            const configText = await this.fetchConfigurationFile(configPath);
            // Parse YAML content
            const configData = this.parseYamlConfiguration(configText);
            // Create and validate configuration object
            const configuration = new Configuration(configData);
            // Cache the loaded configuration
            this.loadedConfiguration = configuration;
            console.log('Configuration loaded successfully:', configuration.toJSON());
            return configuration;
        }
        catch (error) {
            const errorMessage = this.createUserFriendlyErrorMessage(error, configPath);
            console.error('Configuration loading failed:', errorMessage);
            throw new ConfigurationLoadError(errorMessage, error);
        }
    }
    /**
     * Get the currently loaded configuration
     */
    getConfiguration() {
        if (!this.loadedConfiguration) {
            throw new Error('Configuration not loaded. Call loadConfiguration() first.');
        }
        return this.loadedConfiguration;
    }
    /**
     * Check if configuration has been loaded
     */
    isLoaded() {
        return this.loadedConfiguration !== null;
    }
    /**
     * Reload configuration (useful for runtime updates)
     */
    async reloadConfiguration(configPath = './config.yaml') {
        this.loadedConfiguration = null;
        return this.loadConfiguration(configPath);
    }
    /**
     * Fetch configuration file content
     */
    async fetchConfigurationFile(configPath) {
        try {
            const response = await fetch(configPath);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Configuration file not found at: ${configPath}`);
                }
                throw new Error(`Failed to load configuration file: ${response.status} ${response.statusText}`);
            }
            return await response.text();
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('fetch')) {
                throw new Error(`Unable to access configuration file at: ${configPath}. Make sure the file exists and is accessible.`);
            }
            throw error;
        }
    }
    /**
     * Parse YAML configuration content
     */
    parseYamlConfiguration(configText) {
        try {
            const parsed = yaml.load(configText);
            if (!parsed || typeof parsed !== 'object') {
                throw new Error('Configuration file does not contain valid YAML object data');
            }
            return parsed;
        }
        catch (error) {
            if (error instanceof yaml.YAMLException) {
                throw new Error(`Invalid YAML syntax: ${error.message}`);
            }
            throw error;
        }
    }
    /**
     * Create user-friendly error messages
     */
    createUserFriendlyErrorMessage(error, configPath) {
        if (error instanceof ConfigurationValidationError) {
            return `Configuration validation failed in ${configPath}:\n${error.validationErrors.map(e => `  • ${e}`).join('\n')}`;
        }
        if (error instanceof Error) {
            // File not found
            if (error.message.includes('not found')) {
                return `Configuration file missing: ${configPath}\n  • Make sure the config.yaml file exists in the project root\n  • Check the file path and permissions`;
            }
            // YAML parsing errors
            if (error.message.includes('YAML') || error.message.includes('syntax')) {
                return `Configuration file has invalid YAML syntax: ${configPath}\n  • ${error.message}\n  • Check for proper indentation and syntax in the YAML file`;
            }
            // Generic errors
            return `Configuration error: ${error.message}`;
        }
        return `Unknown configuration error occurred while loading ${configPath}`;
    }
    /**
     * Validate configuration file exists and is readable (for debugging)
     */
    async validateConfigurationFile(configPath = './config.yaml') {
        try {
            await this.fetchConfigurationFile(configPath);
            return true;
        }
        catch (error) {
            console.warn(`Configuration file validation failed: ${error}`);
            return false;
        }
    }
    /**
     * Get default configuration for fallback scenarios
     */
    getDefaultConfiguration() {
        const defaultData = {
            station_id: "8000105",
            station_name: "Frankfurt Hbf",
            time_window_hours: 5,
            refresh_interval_minutes: 5,
            departures_per_page: 12,
            page_switch_interval_seconds: 120,
            display_language: "de",
            train_types: ["all"],
            company_logo_path: "./assets/logo.png"
        };
        return new Configuration(defaultData);
    }
}
/**
 * Custom error for configuration loading failures
 */
export class ConfigurationLoadError extends Error {
    constructor(message, originalError) {
        super(message);
        this.name = 'ConfigurationLoadError';
        this.originalError = originalError;
    }
}
//# sourceMappingURL=ConfigurationService.js.map