const mongoose = require("mongoose");

const bookStatus = ["borrowed", "returned", "added", "deleted"];

const bookScehma = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    bookCover: {
      type: String,
      default: "/images/default_book_image",
    },
    author: {
      type: String,
      required: true,
    },
    bookDescription: {
      type: String,
      required: true,
    },
    borrower: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: bookStatus,
          default: "added",
        }
      },
    ],
    stock: {
      type: Number,
      default: 10,
    },
    rating: {
      type: Number,
      default: 3,
    },
    category: {
      type: String,
      default: "Fantasy",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookScehma);

module.exports = Book;
