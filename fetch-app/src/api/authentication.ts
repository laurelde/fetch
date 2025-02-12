import { fetchPost } from "../helpers/apiHelper";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export async function login(name, email) {
  let body = {
    name: name,
    email: email,
  };
  let url = baseUrl + "/auth/login";
  console.log(`Login Fetch Call URI: ${url}`);
  return await fetchPost(url, body, false);
}

export async function logout() {
  let url = baseUrl + "/auth/logout";
  console.log(`Logout Fetch Call URI: ${url}`);
  return await fetchPost(url, null, false);

}
