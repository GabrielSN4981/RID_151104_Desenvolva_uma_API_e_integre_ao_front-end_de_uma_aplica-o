import AppError from "@shared/errors/AppError.js";
import { booksRepositories } from "../database/repositories/BooksRepositories.js";
import type { Book } from "../database/entities/Book.js";

interface IShoWBook {
  id: number;
}

export default class ShowBookService {
  async execute({ id }: IShoWBook): Promise<Book> {
    const book = await booksRepositories.findByID(id);

    if (!book) {
      throw new AppError("Livro não encontrado.", 404);
    }
    return book;
  }
}
