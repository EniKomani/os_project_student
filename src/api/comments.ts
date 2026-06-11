import { apiRequest } from "./Api";
import { Comment } from "./types/comment";

export async function fetchComments(limit = 10) {
  const response = await apiRequest<void, Comment[]>({
    url: "comments",
    method: "GET",
    params: { _limit: limit },
  });

  return response.data;
}
