from flask import jsonify, Blueprint, request
from dotenv import load_dotenv
from models import Request
from core.services import get_services
from core.stats import get_stats
from core.sysinfo import get_sysinfo

load_dotenv()

server_bp = Blueprint("server", __name__)
sql = Request()

@server_bp.route("/server", methods=["GET"])
def home():
    return jsonify({"message": "La API del server Funciona correctamente"})

@server_bp.route("/server/data", methods=["GET"])
def data():
    try:
        return jsonify({
            "message": "Los datos se cargan correctamente",
            "stats": get_stats(),
            "services": get_services(),
            "terminal": get_sysinfo()
        })
    except Exception as e:
        return jsonify({"message": f'Hay un error: {e}'})