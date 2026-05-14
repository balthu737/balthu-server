from flask import jsonify, Blueprint, request
from dotenv import load_dotenv
from models_redis import RedisQuerys

load_dotenv()

tarea_bp = Blueprint("tarea", __name__)
key = "tareas"
redis = RedisQuerys(key=key)

@tarea_bp.route("/tarea", methods=["GET"])
def home():
    return jsonify({"message": "La API del to-do Funciona correctamente"}), 200

@tarea_bp.route("/tarea/carga", methods=["GET"])
def carga():
    try:
        tareas = redis.get_all()
        return jsonify({"message": tareas}), 200
    except Exception as e:
        return jsonify({"messasge": f'El error es: {e}'}), 400

@tarea_bp.route("/tarea/añadir", methods=["POST"])
def crear():
    try:
        data = request.get_json()
        redis.crear(
            data["nombre"],
            data["prioridad"]
        )
        return jsonify({"message": "La tarea fue creada con exito"}), 200
    except Exception as e:
        return jsonify({"message": f'El error es {e}'}), 400

@tarea_bp.route("/tarea/<int:tarea_id>", methods=["DELETE"])
def eliminar(tarea_id):
    try:
        delete = redis.eliminar(tarea_id)
        if not delete:
            return jsonify({"message": "No existe la tarea"}), 400
        return jsonify({"message": "Tarea eliminada"}), 200
    except Exception as e:
        return jsonify({"message": f'Error al eliminar: {e}'}), 400

@tarea_bp.route("/tarea/<int:tarea_id>", methods=["PATCH"])
def actualizar(tarea_id):
    try:
        tarea = redis.actualizar(tarea_id)
        if not tarea:
            return jsonify({"message": "Tarea no encontrada"}), 404
        return jsonify({"message": "Se actualizo correctamente"}), 200
    except Exception as e:
        return jsonify({"message": f'El error es: {e}'}), 400