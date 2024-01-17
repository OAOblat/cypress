beforeEach(() => {
  cy.visit("/");
  cy.login("test@test.com", "test").wait(1000);
  cy.fixture("books").as("books");
});

describe("Тестирование раздела Favorites", () => {
  it("Добавление книги в избранное", function () {
    const firstBook = this.books.books[0];
    cy.addNewBook(firstBook.title, null, firstBook.authors);
    cy.addBookToFavorites(firstBook.title);
    cy.goToFavorites();
    cy.contains(firstBook.title).should("be.visible");
  });

  it("Удаление книги из избранного через раздел Favorites", function () {
    const secondBook = this.books.books[1];
    cy.addNewBook(secondBook.title, null, secondBook.authors);
    cy.addBookToFavorites(secondBook.title);
    cy.goToFavorites();
    cy.deleteBookFromFavorites(secondBook.title);
    cy.contains(secondBook.title).should("not.exist");
  });

  it("Открытие страницы книги через раздел Favorites", function () {
    const thirdBook = this.books.books[2];
    cy.addNewBook(thirdBook.title, null, thirdBook.authors);
    cy.addBookToFavorites(thirdBook.title);
    cy.goToFavorites();
    cy.clickBookCardByTitle(thirdBook.title);
    cy.contains("h2", thirdBook.title)
      .parents("div")
      .contains("button", "Dowload book")
      .should("be.visible");
  });
});
