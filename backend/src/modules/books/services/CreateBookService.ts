import AppError from "@shared/errors/AppError.js";
import type { Book } from "../database/entities/Book.js";
import { booksRepositories } from "../database/repositories/BooksRepositories.js";

interface ICreateBook {
  title: string;
  num_pages: number;
  isbn: string;
  publisher: string;
}

export default class CreateBookService {
  async execute({
    title,
    num_pages,
    isbn,
    publisher,
  }: ICreateBook): Promise<Book> {
    const bookExists = await booksRepositories.findByTitle(title);

    if (bookExists) {
      throw new AppError("Já existe um livro com este título.", 409);
    }

    const isbnExists = await booksRepositories.findByISBN(isbn);

    if (isbnExists) {
      throw new AppError("Já existe um livro com este ISBN.", 409);
    }

    const book = booksRepositories.create({
      title,
      num_pages,
      isbn,
      publisher,
    });

    await booksRepositories.save(book);

    return book;
  }
}
