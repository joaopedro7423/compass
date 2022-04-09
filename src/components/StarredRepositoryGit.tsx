import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { resposStarred } from "../interfaces/IResposStarred";
import { api, dataApi } from "../Services/api";

interface props {
  nameUser: string;
}
//componente que recebe o nome do usuário como props
export function StarredRepositoryGit({ nameUser }: props) {
  const [starreds, starreSet] = useState<resposStarred[]>([]); //seta para apresentar os repositorios que o usuario esta seguindo

  //função para buscar os repositorios que o usuário esta seguindo
  async function userStarred() {
    try {
      const response = await api.get<resposStarred[]>(
        `/users/${nameUser}/starred?client_id=${dataApi.client_id}&client_secret=${dataApi.client_secret}`
      );
      //seta os repositorios que o usuario esta seguindo
      starreSet(response.data);
    } catch (err: any) {
      //mensagem de erro caso ocorra
      alert(err.response.data.message);
    }
  }
  return (
    //componente do tipo coluna para integrar o row da página principal
    <Col md={4} className="justify-content-center">
      <h3>Starred</h3>{" "}
      <Button className="w-100" onClick={userStarred} variant="primary">
        Starred
      </Button>
      {starreds?.map((starred, i) => (
        <>
          <li key={i}>{starred?.name}</li>
        </>
      ))}
    </Col>
  );
}
