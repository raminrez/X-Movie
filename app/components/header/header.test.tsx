import { render, within, screen, userEvent, faker } from "test-utils";

import Header from ".";

test("should render the links", () => {
  render(<Header />);

  const logo = screen.getByRole("link", {
    name: /xmovies/i,
  });

  within(logo).getByRole("heading", { hidden: true });

  screen.getByRole("link", { name: /favorite/i });
  screen.getByRole("link", { name: /watch list/i });
});

test("should render the search field and submit buttons", () => {
  render(<Header />);

  screen.getByRole("search", { name: /search movies/i });
  const submitButtons = screen.getAllByRole("button", { name: /search/i });
  expect(submitButtons).toHaveLength(2);
});

test("search field should get the values and show it", async () => {
  render(<Header />);
  const user = userEvent.setup();
  const useEntry = faker.word.verb(2);

  const input = screen.getByRole("search", { name: /search movies/i });
  await user.type(input, useEntry);

  screen.getByDisplayValue(useEntry);
});
