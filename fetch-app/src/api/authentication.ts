import { fetchPost } from "../helpers/apiHelper";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export async function login(name, email) {
  let body = {
    name: name,
    email: email,
  };
  let url = baseUrl + "/auth/login";
  return await fetchPost(url, body, false);
}

export async function logout() {
  let url = baseUrl + "/auth/logout";
  return await fetchPost(url, null, false);

}
