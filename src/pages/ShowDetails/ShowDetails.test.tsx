import { render, screen, waitFor } from "@testing-library/react";
import { DetailedShow } from "../../services/show.service";
import ShowDetails from "./ShowDetails";
import { Params } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useParams: (): Readonly<Params<string>> => ({ showId: "123" }),
}));

function createFetchResponse<T>(data: T) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

const show: DetailedShow = {
  id: 1,
  name: "Show name",
  image: {
    medium: "https://example.com/image.jpg",
    original: "https://example.com/image.jpg",
  },
  summary: "<b>This is the summary</b>",
  genres: ["Drama", "Action"],
  averageRuntime: 60,
  premiered: "2020-01-01",
  ended: "2023-01-01",
  _embedded: {
    cast: [
      {
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
      },
    ],
  },
};

describe("ShowDetails", () => {
  it("should render the show's title, subtitle and summary", async () => {
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse(show));

    render(<ShowDetails />);

    await waitFor(() =>
      expect(screen.getByText("Show name")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("Drama, Action • 60 min • 2020–2023")
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.getByText(
          (content, element) =>
            content === "This is the summary" &&
            element?.tagName.toLowerCase() === "b"
        )
      ).toBeInTheDocument()
    );
  });
});
