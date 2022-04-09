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
import { githubUser } from "./interfaces/githubUser";
import { reposUser } from "./interfaces/reposUser";
import { resposStarred } from "./interfaces/resposStarred";

export default function App() {
  const [user, userSet] = useState<githubUser>();
  const [reposi, repoSet] = useState<reposUser[]>([]);
  const [starreds, starreSet] = useState<resposStarred[]>([]);
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

  async function userStarred() {
    try {
      const response = await api.get<resposStarred[]>(
        `/users/${userName}/starred?client_id=${dataApi.client_id}&client_secret=${dataApi.client_secret}`
      );

      starreSet(response.data);
    } catch (err: any) {
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
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={user?.avatar_url} />
          <Card.Body>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.bio}</Card.Text>
            <Stack
              className="justify-content-center"
              direction="horizontal"
              gap={3}
            >
              <Button onClick={userStarred} variant="primary">
                Starred
              </Button>
            </Stack>{" "}
          </Card.Body>
        </Card>
      </div>
      <Container>
        <Row className="justify-content-between">
          <UserRepositoryGit nameUser={userName} />
          <Col md="auto" className="justify-content-center">
            <h3>Starred</h3>{" "}
            {starreds?.map((starred, i) => (
              <>
                <li key={i}>{starred?.name}</li>
              </>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
