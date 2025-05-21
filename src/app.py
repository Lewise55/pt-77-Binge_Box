"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favorites, Reviews, Comments, Tags, Shows, Watches
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# setup the flask-JWT-Extended extention
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 7 * 24 * 60 * 60 * 52
jwt = JWTManager(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/user', methods=['GET'])
def handle_get_user():
    users = User.query.all()

    return jsonify(users), 200

@app.route('/user/favorites', methods=['GET'])
def handle_user_favs():
    body = request.get_json()
    user_name = body['user_name']

    user = User.query.filter_by(user_name = user_name)
    favorites = user['favorites']
    watch_later = user['watch_later']

    return jsonify(favorites, watch_later), 200


# Reviews GET/POST/DELETE
@app.route('/reviews', methods=['GET'])
def handle_get_reviews():
    reviews = Reviews.query.all().first()

    return jsonify(reviews), 200

@app.route('/reviews/<int:reviews_id>', methods=['GET'])
def handle_get_each_review(review_id):
    review = Reviews.query.filter_by(id = review_id).first() 

    return jsonify(review), 200

@app.route('/reviews/<int:reviews_id>', methods=['POST'])
def handle_fav_review(review_id):
    body = request.get_json()
    user_name = body['user_name']
    
    review_fav = Favorites(user_name = user_name, review_id = review_id, comment_id = None, tag_id = None, show_id = None)
    db.session.add(review_fav)
    db.session.commit()

    return jsonify('Review favorite has been created'), 200

@app.route('/reviews/<int:reviews_id>', methods=['DELETE'])
def handle_delete_fav_review(review_id):
    body = request.get_json()
    user_name = body['user_name']

    fav = Favorites.query.filter_by(user_name = user_name, review_id = review_id).first()
        
    db.session.delete(fav)
    db.session.commit()

    return jsonify('Review favorite has been removed'), 200


# Comments GET/POST/DELETE
@app.route('/comments', methods=['GET'])
def handle_get_comments():
    comments = Comments.query.all().first()

    return jsonify(comments), 200

@app.route('/comments/<int:comments_id>', methods=['GET'])
def handle_get_each_comment(comment_id):
    comment = Comments.query.filter_by(id = comment_id).first() 

    return jsonify(comment), 200

@app.route('/comments/<int:comments_id>', methods=['POST'])
def handle_fav_comment(comment_id):
    body = request.get_json()
    user_name = body['user_name']
    
    comment_fav = Favorites(user_name = user_name, comment_id = comment_id, review_id = None, tag_id = None, show_id = None)
    db.session.add(comment_fav)
    db.session.commit()

    return jsonify('Comment favorite has been created'), 200

@app.route('/comments/<int:comments_id>', methods=['DELETE'])
def handle_delete_fav_comment(comment_id):
    body = request.get_json()
    user_name = body['user_name']

    fav = Favorites.query.filter_by(user_name = user_name, comment_id = comment_id).first()
        
    db.session.delete(fav)
    db.session.commit()

    return jsonify('Comment favorite has been removed'), 200


# Tags GET/POST/DELETE
@app.route('/tags', methods=['GET'])
def handle_get_tags():
    tags = Tags.query.all().first()

    return jsonify(tags), 200

@app.route('/tags/<int:tags_id>', methods=['GET'])
def handle_get_each_tag(tag_id):
    tag = Tags.query.filter_by(id = tag_id).first() 

    return jsonify(tag), 200

@app.route('/tags/<int:tags_id>', methods=['POST'])
def handle_fav_tag(tag_id):
    body = request.get_json()
    user_name = body['user_name']
    
    tag_fav = Favorites(user_name = user_name, tag_id = tag_id, review_id = None, comment_id = None, show_id = None)
    db.session.add(tag_fav)
    db.session.commit()

    return jsonify('Tag favorite has been created'), 200

@app.route('/tags/<int:tags_id>', methods=['DELETE'])
def handle_delete_fav_tag(tag_id):
    body = request.get_json()
    user_name = body['user_name']

    fav = Favorites.query.filter_by(user_name = user_name, tag_id = tag_id).first()
        
    db.session.delete(fav)
    db.session.commit()

    return jsonify('Tag favorite has been removed'), 200


# Shows GET/POST/DELETE
@app.route('/shows', methods=['GET'])
def handle_get_shows():
    shows = Shows.query.all().first()

    return jsonify(shows), 200

@app.route('/shows/<int:shows_id>', methods=['GET'])
def handle_get_each_show(show_id):
    show = Shows.query.filter_by(id = show_id).first() 

    return jsonify(show), 200

@app.route('/shows/<int:shows_id>', methods=['POST'])
def handle_fav_show(show_id):
    body = request.get_json()
    user_name = body['user_name']
    
    show_fav = Favorites(user_name = user_name, show_id = show_id, review_id = None, comment_id = None, tag_id = None)
    db.session.add(show_fav)
    db.session.commit()

    return jsonify('Show favorite has been created'), 200

@app.route('/shows/<int:shows_id>', methods=['DELETE'])
def handle_delete_fav_show(show_id):
    body = request.get_json()
    user_name = body['user_name']

    fav = Favorites.query.filter_by(user_name = user_name, show_id = show_id).first()
        
    db.session.delete(fav)
    db.session.commit()

    return jsonify('Show favorite has been removed'), 200


# Watch_Later GET/POST/DELETE
@app.route('/shows/<int:shows_id>', methods=['GET'])
def handle_get_watch_later(watch_later_id):
    watch_show_later = Shows.query.filter_by(id = watch_later_id).first() 

    return jsonify(watch_show_later), 200

@app.route('/shows/<int:shows_id>', methods=['POST'])
def handle_save_show(watch_later_id):
    body = request.get_json()
    user_name = body['user_name']
    
    watch_later = Watches(user_name = user_name, watch_later_id = watch_later_id, continue_watching_id = None)
    db.session.add(watch_later)
    db.session.commit()

    return jsonify('Watch later has been created'), 200

@app.route('/shows/<int:shows_id>', methods=['DELETE'])
def handle_delete_saved_show(watch_later_id):
    body = request.get_json()
    user_name = body['user_name']

    watch_later = Watches.query.filter_by(user_name = user_name, watch_later_id = watch_later_id).first()
        
    db.session.delete(watch_later)
    db.session.commit()

    return jsonify('Watch Later has been removed'), 200


# Continue_Watching GET/POST/DELETE
@app.route('/shows/<int:shows_id>', methods=['GET'])
def handle_get_watched_show(continue_watching_id):
    continue_watching = Shows.query.filter_by(id = continue_watching_id).first() 

    return jsonify(continue_watching), 200

@app.route('/shows/<int:shows_id>', methods=['POST'])
def handle_continue_watching(continue_watching_id):
    body = request.get_json()
    user_name = body['user_name']
    
    continue_watching = Watches(user_name = user_name, continue_watching_id = continue_watching_id, watch_later_id = None)
    db.session.add(continue_watching)
    db.session.commit()

    return jsonify('Continue watching has been created'), 200

@app.route('/shows/<int:shows_id>', methods=['DELETE'])
def handle_delete_continue_watching(continue_watching_id):
    body = request.get_json()
    user_name = body['user_name']

    continue_watching = Watches.query.filter_by(user_name = user_name, continue_watching_id = continue_watching_id).first()
        
    db.session.delete(continue_watching)
    db.session.commit()

    return jsonify('Continue watching has been removed'), 200





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
