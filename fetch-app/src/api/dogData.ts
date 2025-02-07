import { fetchGet, fetchPost } from "../helpers/apiHelper";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export async function getBreeds() {
  let url = baseUrl + "/dogs/breeds";
  return await fetchGet(url);
}

export async function getDogIds(breeds, zipCodes, ageMin, ageMax, size, from, sortField, sortDir) {
  let url = baseUrl + "/dogs/search";
  return await fetchGet(url);
}

export async function getDogProfiles(ids) {
  let url = baseUrl + "/dogs";
  return await fetchPost(url, ids);
}