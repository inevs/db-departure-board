/**
 * DB Departure Board - Main Entry Point
 * 
 * This is the main application entry point following Clean Architecture principles.
 * It initializes the application and coordinates between different layers.
 */

// Import domain models
import { Configuration } from './domain/Configuration';

// Import services
import { ConfigurationService, ConfigurationLoadError } from './services/ConfigurationService';

// Import presentation layer (to be created)
// import { DepartureBoardRenderer } from '../presentation/DepartureBoardRenderer';

/**
 * Application class that orchestrates the entire departure board system
 */
class DepartureBoardApp {
    private isInitialized: boolean = false;
    private configuration: Configuration | null = null;
    private configurationService: ConfigurationService;

    constructor() {
        console.log('DB Departure Board Application Starting...');
        this.configurationService = ConfigurationService.getInstance();
    }

    /**
     * Initialize the application
     */
    public async initialize(): Promise<void> {
        try {
            console.log('Initializing departure board...');
            
            // Step 1: Load and validate configuration
            await this.loadConfiguration();
            
            // Step 2: Update UI with configuration data
            this.updateUIWithConfiguration();
            
            // Step 3: Initialize time display
            this.updateCurrentTime();
            
            // Step 4: Start time update interval
            setInterval(() => {
                this.updateCurrentTime();
            }, 1000);

            // Step 5: Show initial status
            this.showInitialStatus();

            this.isInitialized = true;
            console.log('Departure board initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize departure board:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Load and validate configuration
     */
    private async loadConfiguration(): Promise<void> {
        try {
            console.log('Loading configuration...');
            this.configuration = await this.configurationService.loadConfiguration();
            console.log('Configuration loaded:', {
                station: this.configuration.stationName,
                refreshInterval: this.configuration.refreshIntervalMinutes,
                departuresPerPage: this.configuration.departuresPerPage
            });
        } catch (error) {
            if (error instanceof ConfigurationLoadError) {
                throw error; // Re-throw configuration errors as-is
            }
            throw new Error(`Failed to load configuration: ${error}`);
        }
    }

    /**
     * Update UI elements with configuration data
     */
    private updateUIWithConfiguration(): void {
        if (!this.configuration) {
            throw new Error('Configuration not loaded');
        }

        // Update station name
        const stationNameElement = document.getElementById('station-name');
        if (stationNameElement) {
            stationNameElement.textContent = this.configuration.stationName;
        }

        // Update company logo
        const logoElement = document.getElementById('company-logo') as HTMLImageElement;
        if (logoElement) {
            logoElement.src = this.configuration.companyLogoPath;
            logoElement.onerror = () => {
                console.warn(`Could not load company logo from: ${this.configuration!.companyLogoPath}`);
                logoElement.style.display = 'none';
            };
        }

        console.log('UI updated with configuration data');
    }

    /**
     * Handle initialization errors with user-friendly messages
     */
    private handleInitializationError(error: unknown): void {
        let userMessage: string;
        let technicalMessage: string;

        if (error instanceof ConfigurationLoadError) {
            userMessage = 'Konfigurationsfehler - Bitte Administrator kontaktieren';
            technicalMessage = error.message;
        } else if (error instanceof Error) {
            userMessage = 'Initialisierungsfehler - Anwendung kann nicht gestartet werden';
            technicalMessage = error.message;
        } else {
            userMessage = 'Unbekannter Fehler beim Starten der Anwendung';
            technicalMessage = String(error);
        }

        // Show user-friendly error
        this.showError(userMessage);

        // Show technical details in footer for debugging
        const lastUpdatedElement = document.getElementById('last-updated');
        if (lastUpdatedElement) {
            lastUpdatedElement.innerHTML = `
                <span style="color: #FF0000; font-size: 14px;">
                    Fehlerdetails: ${technicalMessage}
                </span>
            `;
        }
    }

    /**
     * Update the current time display
     */
    private updateCurrentTime(): void {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');

        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
    }

    /**
     * Show initial loading status
     */
    private showInitialStatus(): void {
        const container = document.getElementById('departures-container');
        const lastUpdated = document.getElementById('last-updated');

        if (container) {
            container.innerHTML = `
                <div class="loading">
                    Lade Abfahrtsdaten...
                </div>
            `;
        }

        if (lastUpdated) {
            const now = new Date();
            lastUpdated.textContent = `Zuletzt aktualisiert: ${now.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            })}`;
        }
    }

    /**
     * Show error message
     */
    private showError(message: string): void {
        const container = document.getElementById('departures-container');
        if (container) {
            container.innerHTML = `
                <div class="loading" style="color: #FF0000;">
                    ${message}
                </div>
            `;
        }
    }

    /**
     * Start the main application loop
     */
    public start(): void {
        if (!this.isInitialized) {
            console.error('Application not initialized. Call initialize() first.');
            return;
        }

        console.log('Departure board application started');
        console.log('Configuration in use:', this.configuration?.toJSON());
        // Main application logic will be implemented here
    }

    /**
     * Get the current configuration (for debugging/testing)
     */
    public getConfiguration(): Configuration | null {
        return this.configuration;
    }
}

/**
 * Application startup
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded - Starting application...');
    
    const app = new DepartureBoardApp();
    
    try {
        await app.initialize();
        app.start();
    } catch (error) {
        console.error('Failed to start application:', error);
    }
});

// Export for potential testing
export { DepartureBoardApp };