from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_talisman import Talisman

cors = CORS()
bcrypt = Bcrypt()
talisman = Talisman()


CDN_STYLES  = [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.jsdelivr.net",        # Bootstrap CSS
    "https://cdnjs.cloudflare.com",    # other CDN styles
    "https://fonts.googleapis.com",    # Google Fonts CSS
]

CDN_SCRIPTS = [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.jsdelivr.net",        # Bootstrap JS
    "https://cdnjs.cloudflare.com",
    "https://code.jquery.com",         # jQuery
]

CDN_FONTS = [
    "'self'",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",       # actual font files served from here
    "data:",
]

CDN_IMAGES = [
    "'self'",
    "data:",                           # base64 images
    "blob:",                           # blob URLs
]

# ── Dev CSP ───────────────────────────────────────────────────────────────
dev_csp = {
    'default-src': "'self'",
    'style-src'  : CDN_STYLES,
    'script-src' : CDN_SCRIPTS,
    'font-src'   : CDN_FONTS,
    'img-src'    : CDN_IMAGES,
    'connect-src': [
        "'self'",
        "http://127.0.0.1:5000",       # Flask backend
        "http://localhost:5000",
        "http://127.0.0.1:3000",       # frontend dev server
        "http://localhost:3000",
        "http://127.0.0.1:5500",       # VS Code Live Server
        "http://localhost:5500",
    ]
}

# ── Prod CSP ──────────────────────────────────────────────────────────────
prod_csp = {
    'default-src': "'self'",
    'style-src'  : CDN_STYLES,
    'script-src' : CDN_SCRIPTS,
    'font-src'   : CDN_FONTS,
    'img-src'    : CDN_IMAGES,
    'connect-src': [
        "'self'",
        "https://drugstore-webapp.onrender.com",
    ]
}