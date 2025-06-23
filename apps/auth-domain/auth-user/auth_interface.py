# Formato esperado de los mensajes Kafka

def parse_request_message(message):
    # Se espera un dict con el campo 'token'
    return message.get("token", "")

def build_response_message(result):
    if result["valid"]:
        return {
            "status": "success",
            "payload": result["payload"]
        }
    else:
        return {
            "status": "error",
            "message": result["error"]
        }
