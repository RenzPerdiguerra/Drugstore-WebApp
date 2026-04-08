from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_talisman import Talisman

cors = CORS()
bcrypt = Bcrypt()

# CSP Config
talisman = Talisman()

CDN_STYLES  = [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com",
    "https://fonts.googleapis.com",
]

CDN_SCRIPTS = [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com",
    "https://code.jquery.com",
]

CDN_FONTS = [
    "'self'",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://cdn.jsdelivr.net",
    "data:",
]

CDN_IMAGES = [
    "'self'",
    "data:",
    "blob:",
]

dev_csp = {
    'default-src': "'self'",
    'style-src'  : CDN_STYLES,
    'script-src' : CDN_SCRIPTS,
    'font-src'   : CDN_FONTS,
    'img-src'    : CDN_IMAGES,
    'connect-src': [
        "'self'",
        "https://cdn.jsdelivr.net",
        "http://127.0.0.1:5000",
        "http://localhost:5000",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ]
}

prod_csp = {
    'default-src': "'self'",
    'style-src'  : CDN_STYLES,
    'script-src' : CDN_SCRIPTS,
    'font-src'   : CDN_FONTS,
    'img-src'    : CDN_IMAGES,
    'connect-src': [ 
        "'self'",
        "https://drugstore-webapp.onrender.com",
        "https://cdn.jsdelivr.net"
                    ]
}