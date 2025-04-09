const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!isValid(username)) {
    // Add the new user to the users array
    users.push({"username": username, "password": password});
    return res.status(200).json({message: "Customer successfully registered. Now you can login"});
  } else {
      return res.status(404).json({message: "Customer already exists!"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return  res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  
  const isbn = req.params.isbn;
  // for (let index = 1; index < 11; index++) {
    for (const [key, value] of Object.entries(books)) {
      if (key === isbn) {
        let filtered_books = books[key];
        return  res.send(filtered_books);
      }
      
    }
    
  // }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  for (let index = 1; index < 11; index++) {
    for (const [key, value] of Object.entries(books[index])) {
      if (value === author) {
        let filtered_books = books[index];
        return  res.send(filtered_books);
      }
      
    }
    
  }
  
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  for (let index = 1; index < 11; index++) {
    for (const [key, value] of Object.entries(books[index])) {
      if (value === title) {
        let filtered_books = books[index];
        return  res.send(filtered_books);
      }
      
    }
    
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
   for (const [key, value] of Object.entries(books)) {
    if (key === isbn) {
      let filtered_books = books[key].reviews;
      return  res.send(filtered_books);
    }
    
  }
});
public_users.get('/',async function (req, res) {
  //Write your code here
  try {
    const bookData = await Promise((resolve) => {
      const allBooks = Object.values(books);
      resolve(allBooks);
    },3000);
    return  res.status(200).json(bookData);

  } catch (error) {
    return  res.status(500).json({message:"Error"});
  }
});
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  try {
    const bookData = await Promise((resolve) => {
      const isbn = req.params.isbn;
      const allDetailBook = books[isbn];
      resolve(allDetailBook);
    },3000);
    if(bookData)
      return  res.status(200).json(allDetailBook);
    return  res.status(404).json({message:"Error"});


  } catch (error) {
    return  res.status(500).json({message:"Error"});
  }
});
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  try {
    const bookData = await Promise((resolve) => {
      const author = req.params.author;
      const allBooks = Object.values(books);
      const detailBook = allBooks.filter((book)=>book.author.toLocaleLowerCase().match(author));
      resolve(detailBook);
    },3000);
    if(bookData)
      return  res.status(200).json(allDetailBook);
    return  res.status(404).json({message:"Error"});


  } catch (error) {
    return  res.status(500).json({message:"Error"});
  }
});
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  try {
    const bookData = await Promise((resolve) => {
      const title = req.params.author;
      const allBooks = Object.values(books);
      const detailBook = allBooks.filter((book)=>book.title.toLocaleLowerCase().match(title));
      // const allDetailBook = books[isbn];
      resolve(detailBook);
    },3000);
    if(bookData)
      return  res.status(200).json(allDetailBook);
    return  res.status(404).json({message:"Error"});


  } catch (error) {
    return  res.status(500).json({message:"Error"});
  }
});
module.exports.general = public_users;
