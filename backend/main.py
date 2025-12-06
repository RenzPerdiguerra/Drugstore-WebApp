from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from backend.controller.products_controller import products_bp

cors = CORS()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    cors.init_app(app)
    bcrypt.init_app(app)
    
    app.register_blueprint(products_bp)
    return app


if __name__ == '__main__':
    app = create_app()
    print("Starting Flask Server for Drugstore Point-of-Sale System")
    app.run(debug=True) # allows restart while changes are made
    