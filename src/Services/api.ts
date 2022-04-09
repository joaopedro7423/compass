import axios from "axios";

//pré configuração para requisições do axios
export const dataApi = {
  baseUrl: "https://api.github.com",
  client_id: "716b1c2ab83566d8f2c7",
  client_secret: "1e8b023270f398ac502b074832221166b21e04d6 ",
};
//criando o axios já com a base incluida quando envocada
export const api = axios.create({
  baseURL: dataApi.baseUrl,
});
