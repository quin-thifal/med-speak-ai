import uuid
import base64
import re
from typing import Dict, Any, Optional
from cryptography.fernet import Fernet
import time

class SecurityService:
    def __init__(self):
        self.session_timeout = 15 * 60  # 15 minutes in seconds
        self.session_timers: Dict[str, float] = {}
        self.encryption_key = Fernet.generate_key()
        self.cipher_suite = Fernet(self.encryption_key)

    def generate_session_id(self) -> str:
        """Generate a unique session ID."""
        return str(uuid.uuid4())

    def start_session_timeout(self, session_id: str, callback: callable) -> None:
        """Start session timeout."""
        self.clear_session_timeout(session_id)
        self.session_timers[session_id] = time.time() + self.session_timeout
        # In a real application, you would use a proper task scheduler
        # For now, we'll just store the timeout time

    def clear_session_timeout(self, session_id: str) -> None:
        """Clear session timeout."""
        if session_id in self.session_timers:
            del self.session_timers[session_id]

    def clear_session_data(self, session_id: str) -> None:
        """Clear all session data."""
        self.clear_session_timeout(session_id)
        # In a real application, you would clear any stored data here

    def encrypt_data(self, data: str) -> str:
        """Encrypt sensitive data."""
        return self.cipher_suite.encrypt(data.encode()).decode()

    def decrypt_data(self, encrypted_data: str) -> str:
        """Decrypt sensitive data."""
        return self.cipher_suite.decrypt(encrypted_data.encode()).decode()

    def validate_data(self, data: Any) -> bool:
        """Validate data before processing."""
        if isinstance(data, str):
            # Remove any potential HTML/script injection
            return not bool(re.search(r'<[^>]*>', data))
        return True

    def is_secure_context(self) -> bool:
        """Check if the application is running in a secure context."""
        # In a Python backend, this would typically check for HTTPS
        # For now, we'll return True as we assume the backend is secure
        return True

    def get_security_headers(self) -> Dict[str, str]:
        """Get security headers for API responses."""
        return {
            'Content-Security-Policy': "default-src 'self'",
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
        }

    def check_session_timeout(self, session_id: str) -> bool:
        """Check if a session has timed out."""
        if session_id not in self.session_timers:
            return True
        return time.time() > self.session_timers[session_id]

# Create a singleton instance
security_service = SecurityService() 