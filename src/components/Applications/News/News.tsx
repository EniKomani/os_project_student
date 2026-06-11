import { useQuery } from "@tanstack/react-query";

import { fetchComments } from "@api/comments";
import Spinner from "@components/shared/Spinner/Spinner";

export const News = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(10),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center max-h-full">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto">
        <h1 className="w-full text-4xl font-bold text-left dark:text-white">
          News
        </h1>
        <p className="mt-6 text-lg font-semibold text-red-600">
          Failed to load news. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto">
      <h1 className="w-full mb-6 text-4xl font-bold text-left dark:text-white">
        News
      </h1>
      <div className="flex flex-col gap-4 pb-6">
        {data?.map(comment => (
          <article
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow dark:bg-slate-800"
          >
            <h2 className="text-lg font-bold dark:text-white">
              {comment.name}
            </h2>
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
              {comment.email}
            </p>
            <p className="text-sm dark:text-slate-200">{comment.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
