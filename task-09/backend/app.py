from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, db
from werkzeug.security import generate_password_hash, check_password_hash
from models import Review, Bookmark, User

app = Flask(__name__)
CORS(app)
init_db(app)

@app.route('/reviews/<int:movie_id>', methods=['GET'])
def get_reviews(movie_id):
    reviews = Review.query.filter_by(movie_id=movie_id).all()
    return jsonify([{
        'id': review.id,
        'movie_id': review.movie_id,
        'user_id': review.user_id,
        'review_text': review.review_text,
        'rating': review.rating,
        'created_at': review.created_at
    } for review in reviews])

@app.route('/reviews', methods=['POST'])
def add_review():
    data = request.json
    new_review = Review(
        movie_id=data['movie_id'],
        user_id=data['user_id'],
        review_text=data['review_text'],
        rating=data['rating']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully'}), 201

@app.route('/bookmark', methods=['POST'])
def toggle_bookmark():
    data = request.json
    user_id = 1 
    movie_id = data.get('movie_id')

    
    bookmark = Bookmark.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if bookmark:
        db.session.delete(bookmark)
        db.session.commit()
        return jsonify({"success": True, "message": "Bookmark removed"})
    else:
        new_bookmark = Bookmark(user_id=user_id, movie_id=movie_id)
        db.session.add(new_bookmark)
        db.session.commit()
        return jsonify({"success": True, "message": "Bookmark added"})
    
@app.route('/watchlist', methods=['GET'])
def get_watchlist():
    user_id = 1  
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()

    
    movie_ids = [bookmark.movie_id for bookmark in bookmarks]
    return jsonify({"success": True, "movies": movie_ids})



@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400

    
    password_hash = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

    return jsonify({'success': True, 'message': 'Login successful', 'user_id': user.id}), 200

@app.route('/check_user', methods=['POST'])
def check_user():
    data = request.json
    email = data['email']
    user_exists = User.query.filter_by(email=email).first() is not None
    return jsonify({'exists': user_exists}), 200


if __name__ == '__main__':
    app.run(debug=True)
