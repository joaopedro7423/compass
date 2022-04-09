import { useState } from "react";
import { Button, Card, Container, Form, Row, Stack } from "react-bootstrap";
import { api, dataApi } from "./Services/api";
import UserRepositoryGit from "./components/UserRepositoryGit";
import { githubUser } from "./interfaces/IGithubUser";
import { StarredRepositoryGit } from "./components/StarredRepositoryGit";

export default function App() {
  const [user, userSet] = useState<githubUser>(); //seta para apresentar o usuario ao card
  const [userName, userNameSet] = useState<string>(""); //seta as info do usuario

  //função para buscar o usuario
  async function userHub(username: any) {
    try {
      const response = await api.get<githubUser>(
        `/users/${username}?client_id=${dataApi.client_id}&client_secret=${dataApi.client_secret}`
      );
      userSet(response.data);
    } catch (err: any) {
      console.log();
      alert(err.response.data.message);
    }
  }

  //recebe o usuario digitado no input
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //envoca a função a cima
    userHub(userName);
  };

  return (
    <Container>
      {/* formulario para recolher o usuário */}
      <Form onSubmit={submitForm} className="rounded">
        <Form.Group className="mb-3" controlId="formUserGit">
          <Form.Label>Informe um usuário do github:</Form.Label>
          <Form.Control
            onChange={(e) => userNameSet(e.target.value)}
            className="p-2"
            placeholder="Ex: joaopedro7423"
          />
        </Form.Group>
        <Button type="submit" className="w-100">
          Pesquisar
        </Button>
      </Form>
      <br />
      <div className="justify-content-center align-itens-center d-flex">
        {/* card para apresentar o usuário */}
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={user?.avatar_url} />
          <Card.Body>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.bio}</Card.Text>
            <Stack
              className="justify-content-center"
              direction="horizontal"
              gap={3}
            ></Stack>{" "}
          </Card.Body>
        </Card>
      </div>

      <Row className="justify-content-between">
        {/* List para apresentar os repositorios do usuário */}
        <UserRepositoryGit nameUser={userName} />
        {/* List para apresentar os repositorios que o usuário está seguindo */}
        <StarredRepositoryGit nameUser={userName} />
      </Row>
    </Container>
  );
}
