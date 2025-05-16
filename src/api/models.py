from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    user_name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    user_bio: Mapped[str] = mapped_column(String(520), nullable=True)
    user_image: Mapped[str] = mapped_column(String(520), nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    favorites: Mapped[list["Favorites"]] = relationship(back_populates = "user_favorites")
    watch_later: Mapped[list["Watches"]] = relationship(back_populates = "user_watches")


    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "user_name": self.user_name,
            "user_bio": self.user_bio,
            "user_image": self.user_image
            # do not serialize the password, its a security breach
        }    
    
class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    user_name: Mapped[str] = mapped_column(ForeignKey("user.user_name"))
    user_favorites: Mapped["User"] = relationship(back_populates = "favorites")

    review_id: Mapped[int] = mapped_column(ForeignKey("reviews.id"))
    fav_review: Mapped["Reviews"] = relationship(back_populates = "favorites")

    comment_id: Mapped[int] = mapped_column(ForeignKey("comments.id"))
    fav_comment: Mapped["Comments"] = relationship(back_populates = "favorites")

    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"))
    tag_user: Mapped["Tags"] = relationship(back_populates = "favorites")

    show_id: Mapped[int] = mapped_column(ForeignKey("shows.id"))
    fav_show: Mapped["Shows"] = relationship(back_populates = "favorites")
    

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "review_id": self.review_id,
            "comment_id": self.comment_id,
            "tag_id": self.tag_id,
            "show_id": self.show_id
        }

class Reviews(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    review: Mapped[str] = mapped_column(String(520), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "review": self.review,
        }
    
class Comments(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    comment: Mapped[str] = mapped_column(String(520), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "comment": self.comment,
        }

class Tags(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    review_tag: Mapped[str] = mapped_column(String(520), nullable=False)
    comment_tag: Mapped[str] = mapped_column(String(520), nullable=False)
    show_tag: Mapped[str] = mapped_column(String(520), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "review_tag": self.review_tag,
            "comment_tag": self.comment_tag,
            "show_tag": self.show_tag
        }
    
class Shows(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(520), nullable=False)
    season: Mapped[str] = mapped_column(String(520), nullable=False)
    episode: Mapped[str] = mapped_column(String(520), nullable=False)
    discription: Mapped[str] = mapped_column(String(520), nullable=False)
    rating: Mapped[str] = mapped_column(String(520), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "season": self.season,
            "episode": self.episode,
            "discription": self.discription,
            "rating": self.rating
        }
    
class Watches(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    user_name: Mapped[str] = mapped_column(ForeignKey("user.user_name"))
    user_watches: Mapped["User"] = relationship(back_populates = "watch_later")

    watch_later_id: Mapped[int] = mapped_column(ForeignKey("shows.id"))
    watch_show_later: Mapped["Shows"] = relationship(back_populates = "watch_later")

    continue_watching_id: Mapped[int] = mapped_column(ForeignKey("shows.id"))
    watch_show_again: Mapped["Shows"] = relationship(back_populates = "watch_later")

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "watch_later_id": self.watch_later_id,
            "continue_watching_id": self.continue_watching_id
        }
