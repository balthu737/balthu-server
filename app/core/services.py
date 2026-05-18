import platform
import docker

# Contenedores que queres monitorear
WATCHED = ["nginx", "mysql", "docker"]

def get_services():
    # En Windows Docker Desktop también funciona, no necesita mock
    try:
        client = docker.from_env()
        services = []

        for name in WATCHED:
            try:
                container = client.containers.get(name)
                status = "on" if container.status == "running" else "off"
            except docker.errors.NotFound:
                status = "off"

            services.append({"name": name, "status": status})

        return services

    except Exception:
        # Si Docker no está disponible por alguna razón
        return [{"name": name, "status": "off"} for name in WATCHED]