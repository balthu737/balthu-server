import platform
import shutil

def get_stats():
    if platform.system() != "Linux":
        return [
            {"num": "11%",  "unit": "DISCO USADO",    "bar": 11},
            {"num": "5%",   "unit": "RAM USADA",      "bar": 5},
            {"num": "25GB", "unit": "ALMACENAMIENTO", "bar": 44},
        ]

    with open("/host/proc/meminfo") as f:
        mem = {line.split(":")[0]: int(line.split()[1]) for line in f}
    ram_used_pct = (1 - mem["MemAvailable"] / mem["MemTotal"]) * 100

    disk = shutil.disk_usage("/host/rootfs")
    disk_total_gb = disk.total / 1e9
    disk_used_pct = (disk.used / disk.total) * 100

    return [
        {"num": f"{disk_used_pct:.0f}%",  "unit": "DISCO USADO",    "bar": round(disk_used_pct)},
        {"num": f"{ram_used_pct:.0f}%",   "unit": "RAM USADA",      "bar": round(ram_used_pct)},
        {"num": f"{disk_total_gb:.0f}GB", "unit": "ALMACENAMIENTO", "bar": round(disk_used_pct)},
    ]