"use client";
import React from "react";

async function submitReview(event, id) {
  event.preventDefault();

  const reviewData = {
    movie_id: id, 
    user_id: 1, 
    review_text: event.target.reviewText.value,
    rating: event.target.rating.value,
  };

  const response = await fetch('http://localhost:5000/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (response.ok) {
    alert('Review submitted!');
  } else {
    alert('Failed to submit review');
  }
}

function Review({ id }) {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    async function fetchReviews() {
      const response = await fetch(`http://localhost:5000/reviews/${id}`);
      const data = await response.json();
      setReviews(data);
    }
    fetchReviews();
  }, [id]);

  return (
    <div className="w-1/2">
      <form onSubmit={(event) => submitReview(event, id)} className="flex flex-col mt-8">
        <h1 className="text-xl mb-3">Write a Review</h1>
        <input
          type="text"
          name="reviewText"
          id="reviewText"
          placeholder="Write your review here"
          className="mb-4 rounded text-black"
          required
        />
        <select name="rating" className="mb-4 rounded text-black w-1/6" required>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded w-1/5">Submit</button>
      </form>
      <div>
      <h1 className="text-[20px] mt-6 mb-2">Reviews</h1>
        <ul >
          {reviews.map((review) => (
            <li key={review.id} className="border-t border-b">
              <div className="flex flex-row gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              <h1>review by <strong>Sunil</strong></h1>
              </div>
              <p>{review.review_text}</p>
              <p>{review.rating} Stars</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Review;
