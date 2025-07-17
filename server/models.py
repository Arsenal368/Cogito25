from dataclasses import dataclass, field
from typing import Optional, Any
from datetime import datetime

@dataclass
class User:
    id: int
    username: str
    password: str
    political_leanings: Optional[Any] = None
    created_at: Optional[datetime] = None

@dataclass
class InsertUser:
    username: str
    password: str
    political_leanings: Optional[Any] = None 