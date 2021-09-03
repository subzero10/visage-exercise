import axios from "axios";

export async function getCandidates(page, size) {
  return await axios.get(`api/candidates?page=${page}&size=${size}`);
}

export async function createCandidate(candidate) {
  return await axios.post("api/candidate", { candidate });
}
