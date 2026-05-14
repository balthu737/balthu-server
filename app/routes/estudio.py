from flask import jsonify, Blueprint, request
import requests
import json
from dotenv import load_dotenv
import os
from models import Request

load_dotenv()

estudio_bp = Blueprint("estudio", __name__)
sql = Request()

@estudio_bp.route("/estudio", methods=["GET"])
def home():
    return jsonify({"message": "La API de obsidian Funciona correctamente"})

