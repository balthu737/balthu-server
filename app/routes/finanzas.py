from flask import jsonify, Blueprint, request
from models import Request

finanzas_bp = Blueprint("finanzas", __name__)
sql = Request()

@finanzas_bp.route("/finanzas", methods=["GET"])
def home():
    return jsonify({"message": "/finanzas funciona"}), 200

@finanzas_bp.route("/finanzas/añadir", methods=["POST"])
def gasto():
    try:
        data = request.get_json()
        sql.post(
            data["monto"],
            data["desc"],
            data["cat"],
            data["mov"],
            data["tipo"],
            data["fecha"]
        )
        return jsonify({"message": "El gasto se registro con exito"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": f'No se pudo registrar por esto: {e}'}), 400

@finanzas_bp.route("/finanzas/carga", methods=["GET"])
def gasto_get():
    try:
        data = sql.get()
        return jsonify({"message": data}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": f'No se pudo realizar por esto {e}'}), 400

