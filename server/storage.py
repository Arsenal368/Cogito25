from typing import Optional, Dict
from models import User, InsertUser
from datetime import datetime

class MemStorage:
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.current_id: int = 1

    def get_user(self, id: int) -> Optional[User]:
        return self.users.get(id)

    def get_user_by_username(self, username: str) -> Optional[User]:
        return next((user for user in self.users.values() if user.username == username), None)

    def create_user(self, insert_user: InsertUser) -> User:
        user = User(
            id=self.current_id,
            username=insert_user.username,
            password=insert_user.password,
            political_leanings=insert_user.political_leanings,
            created_at=datetime.utcnow()
        )
        self.users[self.current_id] = user
        self.current_id += 1
        return user

storage = MemStorage() 