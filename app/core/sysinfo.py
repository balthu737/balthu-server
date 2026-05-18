import platform
import subprocess

def get_sysinfo():
    if platform.system() != "Linux":
        return [
            {"cmd": "hostname",   "val": "BalthuServer (mock)",        "warn": False},
            {"cmd": "uptime",     "val": "up 0 days, corriendo bien",  "warn": False},
            {"cmd": "disk usage", "val": "11.3% de 24.44GB",           "warn": False},
            {"cmd": "kernel",     "val": "6.8.0-110-generic",          "warn": False},
            {"cmd": "last login", "val": "balthu via SSH · hoy",       "warn": True},
        ]

    def run(cmd):
        return subprocess.check_output(cmd, shell=True).decode().strip()

    hostname = run("hostname")
    uptime   = run("uptime -p")
    kernel   = run("uname -r")

    # Disk desde /host/proc para que coincida con el host
    import shutil
    disk = shutil.disk_usage("/host/rootfs")
    disk_total_gb = disk.total / 1e9
    disk_used_pct = (disk.used / disk.total) * 100
    disk_str = f"{disk_used_pct:.1f}% de {disk_total_gb:.2f}GB"

    try:
        last = run("last -1 -R balthu").splitlines()[0]
    except Exception:
        last = "sin registros"

    return [
        {"cmd": "hostname",   "val": hostname,  "warn": False},
        {"cmd": "uptime",     "val": uptime,    "warn": False},
        {"cmd": "disk usage", "val": disk_str,  "warn": False},
        {"cmd": "kernel",     "val": kernel,    "warn": False},
        {"cmd": "last login", "val": last,      "warn": True},
    ]