from flask import jsonify, Blueprint, request
import requests
import json
from dotenv import load_dotenv
import os
from models import Request

load_dotenv()

empresa_bp = Blueprint("empresa", __name__)
sql = Request()

@empresa_bp.route("/empresa", methods=["GET"])
def home():
    return jsonify({"message": "La API de la empresa Funciona correctamente"})

