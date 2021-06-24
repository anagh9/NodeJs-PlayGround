const router = require("express").Router();
const books = require("./booksDump");
const url = require("url");
const queryString = require("querystring");

// let rawUrl = "https://stackabuse.com/?page=2&limit=3";
// let rawUrl = "https://stackabuse.com/?page=2&limit=3&sort=issn";

// let parseUrl = url.parse(rawUrl);
// let parsedQs = queryString.parse(parseUrl.query);

// console.log(parsedQs.limit);

router.get("/books", (req, res) => {
  res.send(books);
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Books does not exists");

  res.send(book);
});

router.get("/book/title", (req, res) => {
  let title = req.query.title;
  console.log(title);
  //   const { title } = req.params;
  const nameOfBook = books.find((b) => b.title === title);
  if (!nameOfBook) return res.status(404).send("Books Title Not Found");

  res.send(nameOfBook);
});

router.post("/books", (req, res) => {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const bookExist = books.find((b) => b.isbn === isbn);
  if (bookExist) return res.send("Book already exist");

  const book = {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  };
  books.push(book);

  res.send(book);
});

router.put("/books/:id", function (req, res) {
  const { id } = req.params;
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  let book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book does not exist");

  const updateField = (val, prev) => (!val ? prev : val);

  const updatedBook = {
    ...book,
    title: updateField(title, book.title),
    isbn: updateField(isbn, book.isbn),
    pageCount: updateField(pageCount, book.pageCount),
    publishedDate: updateField(publishedDate, book.publishedDate),
    thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
    shortDescription: updateField(shortDescription, book.shortDescription),
    longDescription: updateField(longDescription, book.longDescription),
    status: updateField(status, book.status),
    authors: updateField(authors, book.authors),
    categories: updateField(categories, book.categories),
  };

  const bookIndex = books.findIndex((b) => b.isbn === book.isbn);
  books.splice(bookIndex, 1, updatedBook);

  res.status(200).send(updatedBook);
});

router.delete("/books/:id", function (req, res) {
  const { id } = req.params;

  let book = books.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book does not exist");

  books = books.filter((b) => b.isbn !== id);

  res.send("Success");
});

module.exports = router;
