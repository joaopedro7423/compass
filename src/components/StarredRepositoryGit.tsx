import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { resposStarred } from "../interfaces/IResposStarred";
import { api, dataApi } from "../Services/api";

interface props {
  nameUser: string;
}

export function StarredRepositoryGit({ nameUser }: props) {
  const [starreds, starreSet] = useState<resposStarred[]>([]);

  async function userStarred() {
    try {
      const response = await api.get<resposStarred[]>(
        `/users/${nameUser}/starred?client_id=${dataApi.client_id}&client_secret=${dataApi.client_secret}`
      );

      starreSet(response.data);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }
  return (
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
