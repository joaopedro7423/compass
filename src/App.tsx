import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Toast,
} from "react-bootstrap";
import { api, dataApi } from "./Services/api";
import UserRepositoryGit from "./components/UserRepositoryGit";
import { githubUser } from "./interfaces/IGithubUser";
import { reposUser } from "./interfaces/IReposUser";
import { resposStarred } from "./interfaces/IResposStarred";
import { StarredRepositoryGit } from "./components/StarredRepositoryGit";

export default function App() {
  const [user, userSet] = useState<githubUser>();
  const [reposi, repoSet] = useState<reposUser[]>([]);
  const [userName, userNameSet] = useState<string>("");

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

  async function userRepo() {
    try {
      const response = await api.get<reposUser[]>(
        `/users/${userName}/repos?client_id=${dataApi.client_id}&client_secret=${dataApi.client_secret}`
      );

      repoSet(response.data);
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.message);
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    userHub(userName);
  };

  return (
    <>
      <Container>
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
      </Container>
      <br />
      <div className="justify-content-center align-itens-center d-flex">
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
      <Container>
        <Row className="justify-content-between">
          <UserRepositoryGit nameUser={userName} />
          <StarredRepositoryGit nameUser={userName} />
        </Row>
      </Container>
    </>
  );
}
