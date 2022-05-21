beforeEach(() => {
  window.localStorage.clear();
});

describe("Favorites", () => {
  it("should be able to add and remove a movie to/from- favorites", () => {
    cy.visit("/49530");

    cy.findByRole("link", {
      name: /home/i,
    }).should("exist");

    cy.findByRole("button", {
      name: /favorite/i,
    }).click();

    cy.findByRole("link", {
      name: /favorites/i,
    }).click();

    cy.findByRole("heading", {
      name: /favorites/i,
    }).should("exist");

    cy.findByRole("heading", {
      name: /in time \(2011\)/i,
    }).should("exist");

    cy.visit("/49530");

    cy.findByRole("button", {
      name: /favorite/i,
    }).click();

    cy.findByRole("link", {
      name: /favorites/i,
    }).click();

    cy.findByRole("link", {
      name: /go back home/i,
    }).should("exist");
  });
});

describe("Watch list", () => {
  it("should be able to add and remove a movie to/from- watch list", () => {
    cy.visit("/49530");

    cy.findByRole("link", {
      name: /home/i,
    }).should("exist");

    cy.findByRole("button", {
      name: /watch list/i,
    }).click();

    cy.findByRole("link", {
      name: /watch list/i,
    }).click();

    cy.findByRole("heading", {
      name: /watch list/i,
    }).should("exist");

    cy.findByRole("heading", {
      name: /in time \(2011\)/i,
    }).should("exist");

    cy.visit("/49530");

    cy.findByRole("button", {
      name: /watch list/i,
    }).click();

    cy.findByRole("link", {
      name: /watch list/i,
    }).click();

    cy.findByRole("link", {
      name: /go back home/i,
    }).should("exist");
  });
});
