const Page = require("../models/pageModel");

const addPages = async (req, res) => {
  try {
    const { book, title, body, pageNumber } = req.body;
    if (!book || !title || !body || !pageNumber) {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    const page = await Page.create({
      book,
      title,
      body,
      pageNumber,
    });
    return res.status(200).json({
      page,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getBookPages = async (req, res) => {
  try {
    const book = req.query.book;
    const pageNumber = req.query.pageNumber;
    if (!book || !pageNumber) {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    const query = { book: book, pageNumber: pageNumber };
    const bookPage = await Page.findOne(query);
    if (!bookPage) {
      return res.status(400).json({
        message: "this book page doesn't exist",
      });
    }
    return res.status(200).json({
      bookPage,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { addPages, getBookPages };
