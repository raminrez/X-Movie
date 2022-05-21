import { render, screen, faker } from "test-utils";

import MovieGrid from ".";

test("Movie grid test", () => {
  const items: MovieSample[] = [
    {
      id: faker.datatype.number(6),
      title: faker.word.verb(8),
      poster_path: faker.image.cats(),
      release_date: "2020",
    },
    {
      id: faker.datatype.number(6),
      title: faker.word.verb(5),
      poster_path: faker.image.cats(),
      release_date: "2021",
    },
  ];

  render(<MovieGrid list={items} />);

  screen.getByRole("img", {
    name: items[0].title,
  });
  screen.getByRole("img", {
    name: items[1].title,
  });

  expect(screen.getAllByRole("link")).toHaveLength(items.length);

  screen.getByRole("heading", {
    name: `${items[0].title} (${items[0].release_date})`,
  });
});
