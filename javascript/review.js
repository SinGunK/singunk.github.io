document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const gameKey = document.body.getAttribute('data-game-key');

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem(gameKey)) || [];
        reviews.forEach((review, index) => addReviewToList(review, index));
    }

    function addReviewToList(review, index) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <strong>${review.username}</strong> (${review.rating}):<br>${review.text}
            <button class="delete-review" data-index="${index}">삭제</button>
        `;
        reviewsList.appendChild(reviewItem);

        reviewItem.querySelector('.delete-review').addEventListener('click', function() {
            deleteReview(index);
        });
    }

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('review').value;

        const review = {
            username: username,
            rating: rating,
            text: reviewText
        };

        const reviews = JSON.parse(localStorage.getItem(gameKey)) || [];
        reviews.push(review);
        localStorage.setItem(gameKey, JSON.stringify(reviews));

        addReviewToList(review, reviews.length - 1);

        reviewForm.reset();
    });

    function deleteReview(index) {
        const reviews = JSON.parse(localStorage.getItem(gameKey)) || [];
        reviews.splice(index, 1);
        localStorage.setItem(gameKey, JSON.stringify(reviews));
        renderReviews();
    }

    function renderReviews() {
        reviewsList.innerHTML = ''; 
        loadReviews();
    }

    loadReviews();
});
