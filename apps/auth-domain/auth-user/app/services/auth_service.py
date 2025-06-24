def validate_user(email: str, password: str) -> bool:
    # Lógica simulada. En producción, consulta la base de datos.
    if email == "user@example.com" and password == "123456":
        return True
    return False
