from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, data):
        self.username = data.get("username")
        self.password_hash = generate_password_hash(data.get("password"))

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {"username": self.username, "password_hash": self.password_hash}