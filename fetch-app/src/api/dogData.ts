import { fetchGet } from "../helpers/apiHelper";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export async function getBreeds() {
  let url = baseUrl + "/dogs/breeds";
  console.log(`Login Fetch Call URI: ${url}`);
  return await fetchGet(url);
}
