import { useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { LivrosService } from "../../api/LivrosService";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState([]);

  async function getLivro() {
    const { data } = await LivrosService.getLivros();
    setLivro(data);
  }

  async function createLivro() {
    const body = {
      title: livro.title,
      num_pages: Number(livro.num_pages),
      isbn: livro.isbn,
      publisher: livro.publisher,
    };
    if (
      livro.title != undefined &&
      livro.title != "" &&
      livro.num_pages != undefined &&
      livro.num_pages != "" &&
      livro.isbn != undefined &&
      livro.isbn != "" &&
      livro.publisher != undefined &&
      livro.publisher != ""
    ) {
      await LivrosService.createLivro(body)
        .then((response) => {
          alert(response.data);
          document.getElementById("formulario").reset();
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }

    getLivro();
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                id="titulo"
                required
                onChange={(event) => {
                  setLivro({ ...livro, title: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                id="num"
                required
                onChange={(event) => {
                  setLivro({ ...livro, num_pages: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                id="isbn"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                id="editora"
                required
                onChange={(event) => {
                  setLivro({ ...livro, publisher: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={() => {
                  createLivro();
                }}
              >
                Cadastrar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
