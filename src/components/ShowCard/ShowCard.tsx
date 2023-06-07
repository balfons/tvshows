import { Link } from "react-router-dom";
import { Show } from "../../services/show.service";
import "./ShowCard.css";

type ShowCardProps = {
  show: Show;
};

const ShowCard = (props: ShowCardProps) => {
  return (
    <>
      <Link to={`/${props.show.id}`}>
        <div className="tv-show-card">
          <img src={props.show.image?.medium} alt={props.show.name} />
          <div className="tv-show-card__info">{props.show.name}</div>
        </div>
      </Link>
    </>
  );
};

export default ShowCard;
