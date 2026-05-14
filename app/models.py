from db import conexcion

class Request():
    def __init__(self):
        self.name = ""
    def crear_tablas(self):
        conn = conexcion()
        cursor = conn.cursor()
        query = """
CREATE TABLE IF NOT EXISTS finanzas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    monto REAL NOT NULL,
    descripcion TEXT NOT NULL,
    cat TEXT NOT NULL DEFAULT 'Otro',
    mov TEXT NOT NULL DEFAULT 'gasto',
    tipo TEXT NOT NULL DEFAULT 'efectivo',
    fecha TEXT NOT NULL,
    emoji TEXT NOT NULL DEFAULT '💸'
)
"""
        cursor.executescript(query)
        conn.commit()
        cursor.close()
        conn.close()
    
    def post(self, monto, descripcion, cat, mov, tipo, fecha):
        conn = conexcion()
        cursor = conn.cursor()
        query = """
        INSERT INTO finanzas (monto, descripcion, cat, mov, tipo, fecha)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        cursor.execute(query, (monto, descripcion, cat, mov, tipo, fecha))
        conn.commit()
        cursor.close()
        conn.close()
    
    def get(self):
        conn = conexcion()
        cursor = conn.cursor()
        query = """
        SELECT * FROM finanzas
        """
        cursor.execute(query)
        columnas = [col[0] for col in cursor.description]
        data = [dict(zip(columnas, row)) for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return data 
    
