import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()

def conexcion():
    return sqlite3.connect(os.getenv("SQLITE_DB"))
