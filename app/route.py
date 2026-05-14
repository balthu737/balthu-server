from flask import jsonify, Blueprint, request
import requests
import json
from dotenv import load_dotenv
import os
from models import Request

load_dotenv()

api = Blueprint("api", __name__)
sql = Request()

@api.route("/", methods=["GET"])
def home():
    print("Hola mundo")
    return jsonify({"message": "La API Funciona correctamente"})

