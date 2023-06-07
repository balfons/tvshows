import { render, screen } from "../../helpers/test.helper";
import { CastMember } from "../../services/show.service";
import CastMemberCard from "./CastMemberCard";

describe("CastMemberCard", async () => {
  it("should render the cast member's name and character name", () => {
    const castMember: CastMember = {
      person: {
        name: "John Doe",
        id: 1,
        image: {
          medium: "https://example.com/image.jpg",
          original: "https://example.com/image.jpg",
        },
      },
      character: {
        name: "Johns caracter",
      },
    };

    render(<CastMemberCard castMember={castMember} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Johns caracter")).toBeInTheDocument();
  });
});
