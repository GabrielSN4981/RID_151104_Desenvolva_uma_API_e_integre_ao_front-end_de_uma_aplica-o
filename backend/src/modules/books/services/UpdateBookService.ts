import AppError from "@shared/errors/AppError.js";
import type { Book } from "../database/entities/Book.js";
import { booksRepositories } from "../database/repositories/BooksRepositories.js";

interface IUpdateBook {
  id: number;
  title: string;
  num_pages: number;
  isbn: string;
  publisher: string;
}

export default class UpdateBookService {
  async execute({
    id,
    title,
    num_pages,
    isbn,
    publisher,
  }: IUpdateBook): Promise<Book> {
    const book = await booksRepositories.findByID(id);
    if (!book) {
      throw new AppError("Livro não encontrado.", 404);
    }

    const bookExists = await booksRepositories.findByTitle(title);
    if (bookExists) {
      throw new AppError("Já existe um livro com este título.", 409);
    }

    const bookISBN = await booksRepositories.findByISBN(isbn);
    if (bookISBN) {
      throw new AppError("Já existe um livro com este ISBN.", 409);
    }

    book.title = title;
    book.num_pages = num_pages;
    book.isbn = isbn;
    book.publisher = publisher;

    await booksRepositories.save(book);
    return book;
  }
}
