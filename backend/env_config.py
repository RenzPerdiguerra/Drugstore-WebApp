import os

class Config:
    """Base config shared by all environments."""
    JWT_SECRET             = os.environ.get('JWT_SECRET')
    JWT_ALGORITHM          = os.environ.get('JWT_ALGORITHM', 'HS256')
    JWT_ACCESS_TTL_MINUTES = int(os.environ.get('JWT_ACCESS_TTL_MINUTES', 60))


class DevelopmentConfig(Config):
    """Local development settings."""
    DEBUG        = True
    DATABASE_URL = os.environ.get('DATABASE_URL')
    CORS_ORIGINS = ['http://localhost:5500', 'http://127.0.0.1:5500',
                    'http://localhost:5000', 'http://127.0.0.1:5000']

class ProductionConfig(Config):
    """Render production settings."""
    DEBUG        = False
    DATABASE_URL = os.environ.get('DATABASE_URL')   # must exist on Render
    CORS_ORIGINS = ['https://drugstore-webapp.onrender.com']

# ── Config selector ───────────────────────────────────────────────────────
config = {
    'development' : DevelopmentConfig,
    'production'  : ProductionConfig,
    'default'     : DevelopmentConfig
}

def get_config():
    env = os.environ.get('FLASK_ENV', 'development')
    return config.get(env, config['default'])