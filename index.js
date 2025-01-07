const mongoose = require("mongoose");
const db = require("./db");
const Maker = require("./models/makers");
const Car = require("./models/cars");
const Movie = require("./models/movies");
const User = require("./models/users");
async function addMaker(makerData) {
  try {
    const maker = new Maker(makerData);
    const newMaker = await maker.save();
    console.log("new Maker created", newMaker);
    const carData = { model: "Car Model XL", year: 2022, maker: newMaker.id };
    const car = new Car(carData);
    const newCar = await car.save();
    console.log("New Car", newCar);
  } catch (error) {
    throw error;
  }
}
const makerData = {
  model: "Toyota",
  logo: "maker_logo_url1",
  tagline: "Quality Cars",
};

addMaker(makerData);

//Retrieve a car and populate with the maker
async function getCarWithMakerDetails(carId) {
  try {
    const carWithMaker = await Car.findById(carId).populate("maker");
    console.log("Car with maker details", carWithMaker);
  } catch (error) {
    throw error;
  }
}

//getCarWithMakerDetails("67780ee29ac1bb2af7539e4e");
const newMovieData = {
  title: "Squid Game",
  releaseYear: 2024,
  genre: ["Sci-Fi", "Thriller"],
  director: "Christopher Nolan",
  actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  language: "Korean",
  country: "South Korea",
  rating: 9,
  plot: "its a game a simple game where you win or you will die.",
  awards: "Oscar for Best Cinematography",
  posterUrl: "https://example.com/inception.jpg",
  trailerUrl: "https://example.com/inception-trailer.mp4",
};

//Adding a New Movie
async function addMovie(movieData) {
  try {
    const movie = new Movie(movieData);
    const savedMovie = await movie.save();
    console.log("New Movie Added", savedMovie);
  } catch (error) {
    throw error;
  }
}
addMovie(newMovieData);

//Creating a new User
// const newUserData = {
//   email: "avinash@example.com",
//   password: "123",
//   username: "esha",
//   profilePictureUrl: "profile_pic_url.jpg",

//   nickname: "shu",
//   phoneNumber: "8858098557",
// };
async function addUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log("new User Saved", savedUser);
  } catch (error) {
    throw error;
  }
}
// addUser(newUserData);

// Creating  a function to add a review to a movie
async function addReview(movieId, userId, reviewText) {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not Found");
    }
    const review = {
      user: userId,
      text: reviewText,
    };
    movie.reviews.push(review);
    const updatedMovie = await movie.save();
    console.log("Review Added Succesfully", updatedMovie);
  } catch (error) {
    throw error;
  }
}
// addReview(
//   "67796c515a56f1a881bfd62e",
//   "67796d8b7a3a736606dc2129",
//   "A VERY GOOD MOVIE"
// );

//Creating a Function to add a Rating to a Movie
async function addRating(movieId, userId, ratingScore) {
  try {
    ratingScore = Number(ratingScore);
    if (isNaN(ratingScore)) {
      throw new Error("Invalid rating Score.Must be a number ");
    }
    if (ratingScore < 0 || ratingScore > 10) {
      throw new Error("Rating score must be between 0 and 10");
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    const existingRating = movie.ratings.find(
      (rating) => rating.user.toString() === userId
    );
    if (existingRating) {
      existingRating.score = ratingScore;
    } else {
      const rating = {
        user: userId,
        score: ratingScore,
      };
      movie.ratings.push(rating);
      const updatedReview = await movie.save();
      console.log("Review added Successfully", updatedReview);
    }
  } catch (error) {
    throw error;
  }
}
addRating("67796c515a56f1a881bfd62e", "6779746d5c4b8e09afe8ffde", 7);

//GET TOP RATING AND REVIEWS-Create a function to retrieve the top 5 ratings and reviews of a movie:
async function getTopRatingsAndReviews(movieId) {
  try {
    const movie = await Movie.findById(movieId).populate("reviews");
    movie.ratings.sort((a, b) => b.score - a.score);
    const topRatingsAndReviews = movie.ratings.slice(0, 5).map((rating) => {
      const review = movie.reviews.find(
        (review) => review.user.toString() === rating.user.toString()
      );
      return {
        rating: rating.score,
        review: review ? review.text : "No review available",
      };
    });
    console.log("top rating and review are ", topRatingsAndReviews);
  } catch (error) {
    throw error;
  }
}
getTopRatingsAndReviews("67796c515a56f1a881bfd62e");
// console.log("top rating and review are ", topRatingsAndReviews);
