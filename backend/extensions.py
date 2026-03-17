from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_talisman import Talisman

cors = CORS()

talisman = Talisman()

prod_csp = {
    'default-src': "'self'",
    'style-src': ["'self'", "'unsafe-inline'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'connect-src': ["'self'", "https://drugstore-webapp.onrender.com"],
}

dev_csp = {
    'default-src': "'self'",
    'style-src': ["'self'", "'unsafe-inline'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'connect-src': ["'self'", "http://127.0.0.1:5000", "http://localhost:5000"],
}

bcrypt = Bcrypt()