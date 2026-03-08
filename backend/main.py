from flask import Flask, render_template
from backend.extensions import bcrypt, cors
from backend.controller.products_controller import products_bp
from backend.controller.auth_controller import auth_bp
from backend.controller.orders_controller import orders_bp
from backend.controller.emp_controller import emp_bp

def create_app():
    app = Flask(__name__)
    cors.init_app(app)
    bcrypt.init_app(app)
    
    app.config['JWT_SECRET'] = 'replace_with_a_long_random_secret'
    app.config['JWT_ALGORITHM'] = 'HS256'
    app.config['JWT_ACCESS_TTL_MINUTES'] = 60  # token lifetime
    
    app.register_blueprint(products_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(emp_bp)
    
    @auth_bp.route('/')
    def index():
        return render_template('index.html')
    
    # Add CSP after_request hook for localStorage security
    @app.after_request
    def apply_csp(response):
        response.headers['Content-Security-Policy'] = 'default-src "self"; script-src "self"'
        return response
    
    return app


if __name__ == '__main__':
    app = create_app()
    print("Starting Flask Server for Drugstore Point-of-Sale System")
    app.run(debug=True) # allows restart while changes are made