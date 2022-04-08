import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, Card } from "react-bootstrap";

const api = {
  baseUrl: "https://api.github.com",
  client_id: "4d5a9733c9cdfa78abf5",
  client_secret: "e015583a2102d84217169324035347b8933c5dd2",
};

interface githubUser {
  avatar_url: string;
  bio: string | null;
  blog: string;
  company: string;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: false;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null;
  type: string;
  updated_at: string;
  url: string;
}

export default function App() {
  const [repos, setRepos] = useState<githubUser>();

  useEffect(() => {
    async function userHub() {
      const response = await axios.get<githubUser>(
        api.baseUrl + "/users/joaopedro7423"
      );
      setRepos(response.data);
    }

    userHub();
  }, []);

  return (
    <div className="App justify-content-center align-itens-center d-flex">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={repos?.avatar_url} />
        <Card.Body>
          <Card.Title>{repos?.name}</Card.Title>
          <Card.Text>{repos?.bio}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
