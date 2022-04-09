import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { reposUser } from "../interfaces/reposUser";
import { api, dataApi } from "../Services/api";

interface props {
  nameUser: string;
}

export default function UserRepositoryGit({ nameUser }: props) {
  const [reposi, repoSet] = useState<reposUser[]>([]);

  async function userRepo() {
    try {
      const response = await api.get<reposUser[]>(
        `/users/${nameUser}/repos?client_id=${dataApi.client_id}&client_secret=${dataApi.client_secret}`
      );
      repoSet(response.data);
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.message);
    }
  }
  return (
    <Col md={4}>
      {" "}
      <h3>Repositorios</h3>
      <Button className="w-100" onClick={userRepo} variant="primary">
        Repos
      </Button>
      {reposi?.map((repo, i) => (
        <li key={i}>{repo?.name}</li>
      ))}
    </Col>
  );
}
