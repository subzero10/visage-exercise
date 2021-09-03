import axios from "axios";

export async function storeFile(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);
  return await axios.post(`/api/resume`, formData, { onUploadProgress });
}
