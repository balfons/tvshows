import { CastMember } from "../../services/show.service";
import "./CastMemberCard.css";

type CastMemberCardProps = {
  castMember: CastMember;
};

const CastMemberCard = ({ castMember }: CastMemberCardProps) => {
  return (
    <div className="cast-member-card">
      <img src={castMember.person.image?.medium} alt={castMember.person.name} />
      <div className="cast-member-card__info">
        <div className="cast-member-card__info__name">
          {castMember.person.name}
        </div>
        <div className="cast-member-card__info__character">
          {castMember.character.name}
        </div>
      </div>
    </div>
  );
};

export default CastMemberCard;
