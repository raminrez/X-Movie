declare type Images = {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
};

declare type Image = {
  id?: string | number;
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};
