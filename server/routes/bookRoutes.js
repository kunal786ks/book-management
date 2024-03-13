const express = require("express");
const {
  addBook,
  lendBook,
  allBooks,
  returnBook,
  allLendBooks,
  removebook,
  searchBook,
} = require("../controller/bookController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/multerService");

const router = express.Router();

router.post("/add-book", protect, upload.single("bookCover"), addBook);
router.put("/lend-book/:bookId", protect, lendBook);
router.get("/all-books", protect, allBooks);
router.put("/return-book/:bookId", protect, returnBook);
router.get("/lend-books",protect,allLendBooks)
router.delete("/delete-book/:bookId",protect,removebook)
router.get('/search-book',protect,searchBook)
module.exports = router;
