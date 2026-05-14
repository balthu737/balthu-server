import json
from redis_db import conexion

class RedisQuerys:
    def __init__(self, key):
        self.key = key
        self.r = conexion()
    def _leer(self):
        data = self.r.get(self.key)
        if data is None:
            return []
        return json.loads(data)["tareas"]
    def _guardar(self, tareas):
        self.r.set(self.key, json.dumps({"tareas": tareas}))
    def get_all(self):
        return self._leer()
    def crear(self, nombre, prioridad):
        tareas = self._leer()
        nuevo_id = max((t["id"] for t in tareas), default=0) + 1
        nueva = {"id": nuevo_id, "nombre": nombre, "prioridad": prioridad, "estado": "pendiente"}
        tareas.append(nueva)
        self._guardar(tareas)
        return nueva
    def actualizar(self, tarea_id):
        tareas = self._leer()
        for t in tareas:
            if t["id"] == tarea_id:
                t["estado"] = "pendiente" if t["estado"] == "hecho" else "hecho"
                self._guardar(tareas)
                return t
                return t
        return None
    def eliminar(self, tarea_id):
        tareas = self._leer()
        nueva_lista = [t for t in tareas if t["id"] != tarea_id]
        if len(nueva_lista) == len(tareas):
            return False
        self._guardar(nueva_lista)
        return True