FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Esto le dice a Python que "app/" es parte del path
ENV PYTHONPATH=/app

# Compilación de los archivos gRPC
RUN python -m grpc_tools.protoc -I./proto --python_out=./app --grpc_python_out=./app ./proto/user_profile.proto

# Ejecutar el servidor desde la carpeta app
CMD ["python", "app/server.py"]
