from flask import jsonify, Blueprint, request
import requests
import json
from dotenv import load_dotenv
import os
from models import Request

load_dotenv()

server_bp = Blueprint("server", __name__)
sql = Request()

@server_bp.route("/server", methods=["GET"])
def home():
    return jsonify({"message": "La API del server Funciona correctamente"})

