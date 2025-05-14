from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    user_name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "user_name": self.user_name
            # do not serialize the password, its a security breach
        }    
    
class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    watch_later: Mapped[str] = mapped_column(String(520), nullable=False)
    continue_watching: Mapped[str] = mapped_column(String(520), nullable=False)
    rated_show: Mapped[str] = mapped_column(String(520), nullable=False)
    liked_review: Mapped[str] = mapped_column(String(520), nullable=False)
    liked_comment:Mapped[str] = mapped_column(String(520), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "watch_later": self.watch_later,
            "continue_watching": self.continue_watching,
            "rated_show": self.rated_show,
            "liked_review": self.liked_review,
            "liked_comment": self.liked_comment
            # do not serialize the password, its a security breach
        }

class Review(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    review: Mapped[str] = mapped_column(String(520), nullable=False)
    comment: Mapped[str] = mapped_column(String(520), nullable=False)
    share_content: Mapped[str] = mapped_column(String(520), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "review": self.review,
            "comment": self.comment,
            "share_content": self.share_content
            # do not serialize the password, its a security breach
        }


    

