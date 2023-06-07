import { useParams } from "react-router-dom";
import "./ShowDetails.css";
import { useEffect, useState } from "react";
import { DetailedShow, getShow } from "../../services/show.service";
import CastMemberCard from "../../components/CastMemberCard/CastMemberCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";

function ShowDetails() {
  const { showId } = useParams();
  const [show, setShow] = useState<DetailedShow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = `TV Shows - ${show?.name ?? ""}`;
  }, [show]);

  useEffect(() => {
    const fetchShow = async (id: string) => {
      try {
        setIsLoading(true);
        const show = await getShow(id);
        setShow(show);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to load show details, please try again later.");
      }
    };

    if (showId) {
      fetchShow(showId);
    }
  }, [showId]);

  const getShowSubtitle = () => {
    if (!show) {
      return "";
    }

    const subtitle = [];

    if (show.genres.length > 0) {
      subtitle.push(show.genres.join(", "));
    }

    if (show.averageRuntime) {
      subtitle.push(`${show.averageRuntime} min`);
    }

    if (show.premiered) {
      const premieredYear = new Date(show.premiered).getFullYear();
      const endedYear = show.ended ? new Date(show.ended).getFullYear() : null;
      subtitle.push(`${premieredYear}–${endedYear ?? "Present"}`);
    }
    return subtitle.join(" • ");
  };

  return (
    <>
      <div className="show-details-page">
        {isLoading && <LoadingSpinner />}

        {!isLoading && (
          <div className="show-details-page__info">
            <div className="show-details-page__info__image">
              <img src={show?.image.original} alt={show?.name} />
            </div>
            <div className="show-details-page__info__summary">
              <h1 className="show-title">{show?.name}</h1>
              <p className="show-subtitle">{getShowSubtitle()}</p>
              <p
                className="show-summary"
                dangerouslySetInnerHTML={{ __html: show?.summary ?? "" }}
              ></p>

              {(show?._embedded?.cast ?? []).length > 0 && (
                <div className="show-cast">
                  <h2>Cast</h2>
                  <div className="cast-members">
                    {(show?._embedded?.cast ?? [])
                      .slice(0, 4)
                      .map((castMember) => (
                        <CastMemberCard
                          castMember={castMember}
                          key={castMember.person.id}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowDetails;
