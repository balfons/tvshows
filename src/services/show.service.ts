const baseUrl = "https://api.tvmaze.com";

export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  genres: string[];
  summary: string;
  premiered: string;
  ended: string;
  averageRuntime: number;
}

export interface DetailedShow extends Show {
  _embedded: {
    cast: CastMember[];
  };
}

export interface CastMember {
  person: {
    name: string;
    id: number;
    image: {
      medium: string;
      original: string;
    };
  };
  character: {
    name: string;
  };
}

interface SearchShowsResponsItem {
  score: number;
  show: Show;
}

export const searchShows = async (
  query: string
): Promise<SearchShowsResponsItem[]> => {
  const res = await fetch(`${baseUrl}/search/shows?q=${query}`);
  return await res.json();
};

export const getShow = async (id: string): Promise<DetailedShow> => {
  const res = await fetch(`${baseUrl}/shows/${id}?embed=cast`);
  return await res.json();
};
