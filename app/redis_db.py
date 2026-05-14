import redis
from dotenv import load_dotenv
import os

load_dotenv()

def conexion():
    return redis.Redis(
        host=os.getenv("redis_host"),
        port=os.getenv("redis_port"),
        db=os.getenv("redis_db"),
        decode_responses=True
        )
