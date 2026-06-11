import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPhotos } from "@api/photos";
import { Photo } from "@api/types/photo";
import Spinner from "@components/shared/Spinner/Spinner";

const getPhotoThumbnailSrc = (photo: Photo) => {
  if (photo.thumbnailUrl.includes("via.placeholder.com")) {
    return `https://picsum.photos/seed/${photo.id}/150/150`;
  }

  return photo.thumbnailUrl;
};

const GalleryPhoto = ({ photo }: { photo: Photo }) => {
  const [src, setSrc] = useState(() => getPhotoThumbnailSrc(photo));

  return (
    <figure className="overflow-hidden bg-white rounded-lg shadow dark:bg-slate-800">
      <img
        src={src}
        alt={photo.title}
        className="object-cover w-full aspect-square"
        onError={() => {
          const fallback = `https://picsum.photos/seed/${photo.id}/150/150`;

          if (src !== fallback) {
            setSrc(fallback);
          }
        }}
      />
      <figcaption className="p-2 text-xs font-medium truncate dark:text-white">
        {photo.title}
      </figcaption>
    </figure>
  );
};

export const Gallery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos"],
    queryFn: () => fetchPhotos(12),
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
          Gallery
        </h1>
        <p className="mt-6 text-lg font-semibold text-red-600">
          Failed to load photos. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto">
      <h1 className="w-full mb-6 text-4xl font-bold text-left dark:text-white">
        Gallery
      </h1>
      <div className="grid grid-cols-2 gap-4 pb-6 md:grid-cols-3 lg:grid-cols-4">
        {data?.map(photo => (
          <GalleryPhoto key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};
