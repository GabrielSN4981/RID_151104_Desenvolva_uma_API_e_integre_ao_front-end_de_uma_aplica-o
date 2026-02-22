import booksRouter from "@modules/books/routes/BookRoutes.js";
import { Router } from "express";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({ message: "Hello Dev!" });
});

routes.use("/livros", booksRouter);

export default routes;
