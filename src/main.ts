/**
 * DB Departure Board - Main Entry Point
 * 
 * This is the main application entry point following Clean Architecture principles.
 * It initializes the application and coordinates between different layers.
 */

// Import domain models (to be created)
// import { DepartureBoard } from '../domain/DepartureBoard';
// import { Configuration } from '../domain/Configuration';

// Import services (to be created)
// import { ConfigurationService } from '../services/ConfigurationService';
// import { DBApiService } from '../services/DBApiService';

// Import presentation layer (to be created)
// import { DepartureBoardRenderer } from '../presentation/DepartureBoardRenderer';

/**
 * Application class that orchestrates the entire departure board system
 */
class DepartureBoardApp {
    private isInitialized: boolean = false;

    constructor() {
        console.log('DB Departure Board Application Starting...');
    }

    /**
     * Initialize the application
     */
    public async initialize(): Promise<void> {
        try {
            console.log('Initializing departure board...');
            
            // For now, just update the time to show the app is working
            this.updateCurrentTime();
            
            // Start time update interval
            setInterval(() => {
                this.updateCurrentTime();
            }, 1000);

            // Show initial status
            this.showInitialStatus();

            this.isInitialized = true;
            console.log('Departure board initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize departure board:', error);
            this.showError('Fehler beim Initialisieren der Anzeigetafel');
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
        // Main application logic will be implemented here
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