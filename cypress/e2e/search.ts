describe("Search a movie happy path", () => {
  it("should allow you to search and see movie detail", () => {
    cy.visit("/");
    cy.findByRole("search").type("in time");
    cy.findByRole("button", { name: /search/i }).click();
    cy.url().should("include", "/search?q=in+time");

    cy.findByRole("heading", {
      name: /in time \(2011\)/i,
      timeout: 2000,
    }).click();
    cy.url().should("include", "/49530");

    cy.findByRole("link", { name: /home/i, timeout: 2000 }).click();

    cy.findByRole("search").clear().type("arrival");
    cy.findByRole("button", { name: /search/i }).click();

    cy.url().should("include", "/search?q=arrival");
  });

  it("Movie not found", () => {
    cy.visit("/");
    cy.findByRole("search").type("is there any movie like this");
    cy.findByRole("button", { name: /search/i }).click();
    cy.url().should("include", "/search?q=is+there+any+movie+like+this");
    cy.findByRole("heading", {
      name: /movie not found/i,
    }).should("exist");

    cy.findByRole("link", {
      name: /go back home/i,
    }).click();

    cy.findByRole("heading", {
      name: /trending this week/i,
    }).should("exist");
  });

  it("show error if user manipulate the url", () => {
    cy.visit("a453395", { failOnStatusCode: false });
    cy.findByRole("heading", {
      name: /movie id isn't valid/i,
    }).should("exist");
  });
});
