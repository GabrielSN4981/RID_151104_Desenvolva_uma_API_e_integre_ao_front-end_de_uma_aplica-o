import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";
import { useNavigate } from "react-router-dom";

const LivrosEdicao = () => {
  const navigate = useNavigate();

  let { livroId } = useParams();

  const [livro, setLivro] = useState({
    id: "",
    title: "",
    num_pages: "",
    isbn: "",
    publisher: "",
  });

  async function getLivro() {
    const { data } = await LivrosService.getLivro(livroId);
    setLivro(data);
  }

  async function editLivro() {
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
      try {
        const data = await LivrosService.updateLivro(livroId, body);
        alert("Livro atualizado com sucesso!");
        setLivro(data);
        navigate("/livros");
      } catch ({ response: { data, status } }) {
        alert(`${status} - ${data.message}`);
      }
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                onChange={(event) => {
                  setLivro({ ...livro, id: event.target.value });
                }}
                value={livro.id || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, title: event.target.value });
                }}
                value={livro.title || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, num_pages: event.target.value });
                }}
                value={livro.num_pages || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
                value={livro.isbn || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, publisher: event.target.value });
                }}
                value={livro.publisher || ""}
              ></input>
            </div>
            <div className="form-group">
              <button
                type="button"
                onClick={() => {
                  editLivro();
                }}
              >
                Atualizar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
