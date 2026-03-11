from flask import Flask, send_from_directory
import os
from backend.extensions import bcrypt, cors
from backend.controller.products_controller import products_bp
from backend.controller.auth_controller import auth_bp
from backend.controller.orders_controller import orders_bp
from backend.controller.emp_controller import emp_bp

def create_app():
    app = Flask(__name__,
        static_folder=os.path.join(os.path.dirname(__file__), '..'),
        static_url_path=''
    )
    
    # Extensions init
    cors.init_app(app)
    bcrypt.init_app(app)
    
    # JWT config
    app.config['JWT_SECRET'] = 'replace_with_a_long_random_secret'
    app.config['JWT_ALGORITHM'] = 'HS256'
    app.config['JWT_ACCESS_TTL_MINUTES'] = 60  # token lifetime
    
    # Add CSP after_request hook for localStorage security
    @app.after_request
    def apply_csp(response):
        response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'"
        return response
    
    # Register controller blueprints
    app.register_blueprint(products_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(emp_bp)
    
    
    # Serve index.html at root
    @app.route('/')
    def index():
        return send_from_directory(
            os.path.join(app.root_path, '..'),
            'index.html'
        )
    
    # Serve everything in public/
    @app.route('/frontend/public/<path:filename>')
    def public_files(filename):
        return send_from_directory(
            os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public'),
            filename
        )
    
    return app


if __name__ == '__main__':
    app = create_app()
    print("Starting Flask Server for Drugstore Point-of-Sale System")
    app.run(debug=True) # allows restart while changes are made