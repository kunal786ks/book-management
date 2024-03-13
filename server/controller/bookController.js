const { replaceSpacesWithPercent20 } = require("../middleware/imageService");
const Book = require("../models/bookModel");

const addBook = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== 1) {
      return res.status(400).json({
        message: "only librarian can add book",
      });
    }
    const { title, author, bookDescription, stock, category } = req.body;
    if (!title || !author || !bookDescription) {
      return res.status(400).json({
        message: "Bad  f request",
      });
    }
    let bookAlreadyExists = await Book.findOne({ title });
    if (bookAlreadyExists) {
      bookAlreadyExists.stock += parseInt(stock);
      await bookAlreadyExists.save();
      return res.status(201).json({
        message: "You updated the stock coz this is already exists",
        bookAlreadyExists,
      });
    }
    let image_url;
    if (req.file?.filename) {
      image_url = replaceSpacesWithPercent20(`/images/${req.file?.filename}`);
    }
    const bookAdded = await Book.create({
      title,
      bookCover: image_url,
      author,
      bookDescription,
      stock,
      category,
    });
    return res.status(201).json({
      bookAdded,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// const lendBook=async(req,res)=>{
//     try {
//         const id=req.params.bookId;
//         let findBook=await Book.findById(id);
//         if(!findBook){
//             return res.status(400).json({
//                 message:"Book doesn't exists"
//             })
//         }
//         if(findBook.stock<=0){
//             return res.status(400).json({
//                 message:"this book is not present wright now"
//             })
//         }
//         findBook.stock-=1
//         findBook.borrower=req.user._id;
//         findBook.status="borrowed"
//         await findBook.save();
//         return res.status(200).json({
//             findBook
//         })
//     } catch (error) {
//         throw new Error(error)
//     }
// }
const lendBook = async (req, res) => {
  try {
    const id = req.params.bookId;
    const userId = req.user._id;
    const findBook = await Book.findById(id);
    if (!findBook) {
      return res.status(400).json({
        message: "Book doesn't exist",
      });
    }
    if (findBook.stock <= 0) {
      return res.status(400).json({
        message: "This book is not available right now",
      });
    }
    const isAlreadyBorrowed = findBook.borrower.findIndex((borrower) =>
      borrower.id.equals(userId)
    );
    if (isAlreadyBorrowed === -1) {
      findBook.borrower.push({ id: userId, status: "borrowed" });
    } else {
      const status = findBook.borrower[isAlreadyBorrowed].status;
      if (status === "borrowed") {
        return res.status(400).json({
          message: "You already borrowed this book",
        });
      }
      findBook.borrower[isAlreadyBorrowed].status = "borrowed";
    }
    findBook.stock -= 1;
    await findBook.save();
    return res.status(200).json({
      findBook,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const id = req.params.bookId;
    const { rating } = req.body;
    const bookFind = await Book.findById(id);
    const userId = req.user?._id;
    if (!bookFind) {
      return res.status(200).json({
        message: "book doesn't exists",
      });
    }
    if (rating) {
      bookFind.rating = (bookFind.rating + parseInt(rating)) / 2;
    }
    const isBorrower = bookFind.borrower?.findIndex(
      (borrower) => borrower.id.equals(userId) && borrower.status === "borrowed"
    );
    if (isBorrower === -1) {
      return res.status(400).json({
        message: "you are not allowed for this action",
      });
    }
    bookFind.borrower[isBorrower].status = "returned";
    bookFind.stock += 1;
    await bookFind.save();
    return res.status(201).json({
      message: "book returned",
      bookFind,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const allBooks = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== 1) {
      return res.status(400).json({
        message: "you are not allowed for this",
      });
    }
    const allBooks = await Book.find().populate("borrower.id", "-password");
    return res.status(200).json({
      allBooks,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const allLendBooks = async (req, res) => {
  try {
    const user = req?.user;
    if (user?.role !== 1) {
      return res.status(400).json({
        message: "unauthorized action",
      });
    }
    const allBooks = await Book.findOne({ status: "borrowed" }).populate(
      "borrower.id",
      "-password"
    );
    return res.status(200).json({
      message: "all the lended books",
      allBooks,
    });
  } catch (error) {
    throw new Error(error);
  }
}; //this is not a need now

const searchBook = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { author: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const books = await Book.find(keyword);
    return res.status(200).json({
      books,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const removebook = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== 1) {
      return res.status(400).json({
        message: "unauthorized action",
      });
    }
    const id = req.params.bookId;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(400).json({
        message: "book doesn't exists",
      });
    }
    book.borrower?.map((book) => {
      if (book.status === "borrowed") {
        return res.status(400).json({
          message:
            "this book can't be deleted because some books are not returned",
        });
      }
    });
    return res.status(201).json({
      message: "book deleted successfully",
      book,
    });
  } catch (error) {
    throw new Error(error);
  }
}; // work on this
module.exports = {
  addBook,
  lendBook,
  allBooks,
  returnBook,
  allLendBooks,
  removebook,
  searchBook,
};
