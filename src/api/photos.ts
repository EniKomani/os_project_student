import { apiRequest } from "./Api";
import { Photo } from "./types/photo";

export async function fetchPhotos(limit = 12) {
  const response = await apiRequest<void, Photo[]>({
    url: "photos",
    method: "GET",
    params: { _limit: limit },
  });

  return response.data;
}
