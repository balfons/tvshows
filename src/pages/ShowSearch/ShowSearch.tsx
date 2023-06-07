import { useCallback, useEffect, useMemo, useState } from "react";
import { Show, searchShows } from "../../services/show.service";
import "./ShowSearch.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import { debounce } from "../../helpers/debounce.helper";
import ShowCard from "../../components/ShowCard/ShowCard";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function ShowSearch() {
  const [shows, setShows] = useState<Show[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const searchShow = useCallback(async (query: string) => {
    setIsLoading(true);

    try {
      const response = await searchShows(query);
      const showsResponse = response.map((showItem) => showItem.show);
      setShows(showsResponse);
      setIsLoading(false);
    } catch (error) {
      toast.error("Search failed, please try again later.");
      setIsLoading(false);
    }
  }, []);

  const debouncedSearchShow = useMemo(() => {
    return debounce(searchShow, 1000);
  }, [searchShow]);

  useEffect(() => {
    const searchQuery = searchParams.get("search");

    if (searchQuery !== null) {
      debouncedSearchShow(searchQuery ?? "");
    }
  }, [debouncedSearchShow, searchParams]);

  return (
    <>
      <div className="search-page">
        <h1 className="search-page__title">Search TV shows 📺</h1>
        <div className="search-page__input">
          <SearchInput
            value={searchParams.get("search") ?? ""}
            onChange={(value) => setSearchParams({ search: value })}
          />
        </div>

        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div className="search-page__results">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show}></ShowCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ShowSearch;
