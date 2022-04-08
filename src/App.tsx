import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, Card, Form, Stack } from "react-bootstrap";

const api = {
  baseUrl: "https://api.github.com",
  client_id: "4d5a9733c9cdfa78abf5",
  client_secret: "e015583a2102d84217169324035347b8933c5dd2",
};

interface githubUser {
  avatar_url: string;
  bio: string | any;
  blog: string;
  company: string;
  created_at: string;
  email: string | any;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: any;
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
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: any;
  type: string;
  updated_at: string;
  url: string;
}

interface reposUser {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string | any;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | any;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: any;
  allow_forking: boolean;
  is_template: boolean;
  topics: any[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

interface resposStarred {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: "User";
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: any;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  topics: any[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export default function App() {
  const [user, userSet] = useState<githubUser>();
  const [repos, repoSet] = useState<reposUser[]>([]);
  const [starreds, starreSet] = useState<resposStarred[]>([]);

  useEffect(() => {
    async function userHub() {
      const response = await axios.get<githubUser>(
        api.baseUrl + "/users/joaopedro7423"
      );
      userSet(response.data);
    }

    userHub();
  }, []);

  async function userRepo() {
    const response = await axios.get<reposUser[]>(
      api.baseUrl + "/users/joaopedro7423/repos"
    );

    repoSet(response.data);
  }

  async function userStarred() {
    const response = await axios.get<resposStarred[]>(
      api.baseUrl + "/users/joaopedro7423/starred"
    );

    starreSet(response.data);
  }

  return (
    <>
      <Form.Control
        className="me-auto m-auto p-2"
        placeholder="Add your item here..."
      />
      <div className="App justify-content-center align-itens-center d-flex">
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
              <Button onClick={userRepo} variant="primary">
                Repos
              </Button>
              <div className="vr" />
              <Button onClick={userStarred} variant="primary">
                Starred
              </Button>
            </Stack>{" "}
          </Card.Body>
        </Card>
      </div>
      {repos?.map((repo, i) => (
        <>
          <p key={i}>{repo?.name}</p>
        </>
      ))}

      {starreds?.map((starred, i) => (
        <>
          <p key={i}>{starred?.name}</p>
        </>
      ))}
    </>
  );
}
