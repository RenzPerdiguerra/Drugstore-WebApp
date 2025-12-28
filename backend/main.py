from flask import Flask
from backend.extensions import bcrypt, cors
from backend.controller.products_controller import products_bp
from backend.controller.auth_controller import auth_bp
from backend.controller.orders_controller import orders_bp

def create_app():
    app = Flask(__name__)
    cors.init_app(app)
    bcrypt.init_app(app)
    
    app.register_blueprint(products_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    return app


if __name__ == '__main__':
    app = create_app()
    print("Starting Flask Server for Drugstore Point-of-Sale System")
    app.run(debug=True) # allows restart while changes are made
    