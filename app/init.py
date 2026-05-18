from flask import Flask
from flask_cors import CORS
import os
import logging
from route import api
from routes.empresa import empresa_bp
from routes.estudio import estudio_bp
from routes.finanzas import finanzas_bp
from routes.habitos import habitos_bp
from routes.rutinas import rutina_bp
from routes.server import server_bp
from routes.tareas import tarea_bp
from models import Request

sql = Request()

def app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api)
    app.register_blueprint(empresa_bp)
    app.register_blueprint(estudio_bp)
    app.register_blueprint(finanzas_bp)
    app.register_blueprint(habitos_bp)
    app.register_blueprint(rutina_bp)
    app.register_blueprint(server_bp)
    app.register_blueprint(tarea_bp)
    with app.app_context():
        sql.crear_tablas()
    return app

a = app()
a.run(host="0.0.0.0", port=5000, debug=True)