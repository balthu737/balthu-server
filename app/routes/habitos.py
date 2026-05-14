from flask import jsonify, Blueprint, request
import requests
import json
from dotenv import load_dotenv
import os
from models import Request

load_dotenv()

habitos_bp = Blueprint("habitos", __name__)
sql = Request()

@habitos_bp.route("/habitos", methods=["GET"])
def home():
    return jsonify({"message": "La API del habit tracker Funciona correctamente"})

