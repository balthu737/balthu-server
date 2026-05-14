from flask import jsonify, Blueprint, request
import requests
import json
from dotenv import load_dotenv
import os
from models import Request

load_dotenv()

rutina_bp = Blueprint("rutina", __name__)
sql = Request()

@rutina_bp.route("/rutina", methods=["GET"])
def home():
    return jsonify({"message": "La API de la rutina Funciona correctamente"})

