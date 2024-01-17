// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").click();
  if (email) {
    cy.get("#mail").type(email);
  }
  if (password) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addNewBook", (title, description, authors, favorite) => {
  let bookExists = false;

  cy.get("body").then(($body) => {
    if ($body.find(".card-title").length) {
      cy.get(".card-title")
        .each(($title) => {
          if ($title.text().includes(title)) {
            bookExists = true;
            return false;
          }
        })
        .then(() => {
          if (!bookExists) {
            addItem(title, description, authors, favorite);
          } else {
            cy.log(`Книга с названием "${title}" уже существует.`);
          }
        });
    } else {
      addItem(title, description, authors, favorite);
    }
  });
});

function addItem(title, description, authors, favorite) {
  cy.contains("Add new").click();
  if (title) {
    cy.get("#title").type(title);
  }
  if (description) {
    cy.get("#description").type(description);
  }
  if (authors) {
    cy.get("#authors").type(authors);
  }
  if (favorite) {
    cy.contains("add to favorite").click();
  }
  cy.contains("Submit").click();
}

Cypress.Commands.add("goToFavorites", () => {
  cy.contains("Favorites").click();
});

Cypress.Commands.add("deleteBookFromFavorites", (bookTitle) => {
  cy.contains(".card-title", bookTitle)
    .parents(".card-body")
    .next()
    .then(($actions) => {
      if ($actions.find("button:contains('Delete from favorite')").length) {
        cy.wrap($actions).contains("button", "Delete from favorite").click();
      } else {
        if ($actions.find("button:contains('Add to favorite')").length) {
          cy.log(`Книга "${bookTitle}" уже удалена из избранных`);
        } else {
          cy.log(
            `У книги "${bookTitle}" отсутствуют кнопки для управления избранным.`
          );
        }
      }
    });
});

Cypress.Commands.add("addBookToFavorites", (bookTitle) => {
  cy.contains(".card-title", bookTitle)
    .parents(".card-body")
    .next()
    .then(($actions) => {
      if ($actions.find("button:contains('Add to favorite')").length) {
        cy.wrap($actions).contains("button", "Add to favorite").click();
      } else {
        if ($actions.find("button:contains('Delete from favorite')").length) {
          cy.log(`Книга "${bookTitle}" уже добавлена в избранное.`);
        } else {
          cy.log(
            `У книги "${bookTitle}" отсутствуют кнопки для управления избранным.`
          );
        }
      }
    });
});

Cypress.Commands.add("clickBookCardByTitle", (title) => {
  cy.contains(".card-title", title).click();
});


