class SecurityService {
  private sessionTimeout: number = 15 * 60 * 1000; // 15 minutes
  private sessionTimer: NodeJS.Timeout | null = null;
  private encryptionKey: string = 'healthcare-secure-key'; // In production, this should be properly managed

  // Generate a unique session ID
  generateSessionId(): string {
    return crypto.randomUUID();
  }

  // Start session timeout
  startSessionTimeout(callback: () => void) {
    this.clearSessionTimeout();
    this.sessionTimer = setTimeout(() => {
      callback();
      this.clearSessionData();
    }, this.sessionTimeout);
  }

  // Clear session timeout
  clearSessionTimeout() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  // Clear all session data
  clearSessionData() {
    // Clear any stored patient data
    localStorage.clear();
    sessionStorage.clear();
  }

  // Encrypt sensitive data
  encryptData(data: string): string {
    // In production, use proper encryption
    return btoa(data);
  }

  // Decrypt sensitive data
  decryptData(encryptedData: string): string {
    // In production, use proper decryption
    return atob(encryptedData);
  }

  // Validate data before processing
  validateData(data: any): boolean {
    // Remove any potential HTML/script injection
    if (typeof data === 'string') {
      return !/<[^>]*>/g.test(data);
    }
    return true;
  }

  // Check if the application is running in a secure context
  isSecureContext(): boolean {
    return window.isSecureContext;
  }

  // Get security headers for API requests
  getSecurityHeaders(): Record<string, string> {
    return {
      'Content-Security-Policy': "default-src 'self'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    };
  }
}

export const securityService = new SecurityService(); 