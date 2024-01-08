import * as txt from "../fixtures/en.json";
const meal = "Avocado Salad";
describe("Test the functionalities of the website", () => {
  beforeEach(() => {
    cy.visit("https://omnifood-psi-gold.vercel.app/");
    cy.url().should("eq", "https://omnifood-psi-gold.vercel.app/");
    cy.get('[alt="Omnifood logo"]').should("be.visible");
  });

  it('Click on "Try for free" and register', () => {
    cy.get('[class="main-nav-link nav-cta"]')
      .should("be.visible")
      .should("contain", txt.tfr["try-for-free"])
      .click();

    cy.fixture("omnifood.json").then((data) => {
      cy.get('[name="full-name"]').type(data.name);
      cy.get('[name="e-mail"]').type(data.email);
    });

    cy.get('[id="select-where"]')
      .select(txt.fnf["family-friends"])
      .should("have.value", txt.fnf.friends);

    cy.get('[class="btn btn--form"]')
      .should("contain", txt.btn["sign-up-btn"])
      .click();
  });

  it('Check "How it works"', () => {
    cy.get('[class="main-nav-link"]')
      .contains(txt.how["how-it-works"])
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("/" + href);
      });

    cy.toBeInViewport('[class="heading-secondary"]').contains(txt.how.sub);
  });

  it('Check "Meals"', () => {
    cy.get('[class="main-nav-link"]')
      .contains(txt.meals.meals)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("/" + href);
      });

    cy.toBeInViewport('[class="heading-secondary"]').contains(txt.meals.sub);

    cy.get('[class="meal"]')
      .should("have.length", 2)
      .eq(1)
      .should("contain", meal);
  });

  it('Check "Testemonials"', () => {
    cy.get('[class="main-nav-link"]')
      .contains(txt.praise.testimonials)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("/" + href);
      });

    cy.toBeInViewport('[class="heading-secondary"]').contains(txt.praise.sub);

    cy.get('[class="gallery-item"]').should("have.length", 12);
  });

  it('Check "Pricing"', () => {
    cy.get('[class="main-nav-link"]')
      .contains(txt.price.price)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("/" + href);
      });

    cy.toBeInViewport('[class="heading-secondary"]').contains(txt.price.sub);

    cy.get('[class="pricing-plan pricing-plan--starter"]').should(
      "contain",
      txt.price.starter
    );
    cy.get('[class="btn btn--full"]').contains(txt.price.register).click();
  });

  it('Click "Learn More"', () => {
    cy.get('[class="btn btn--outline"]')
      .contains(txt.lrn.learn)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("/" + href);
      });

    cy.toBeInViewport('[class="sub-heading"]').contains(
      txt.how["how-it-works"]
    );
  });

  it("Scroll Page", () => {
    cy.get('[class="footer"]').scrollIntoView({ duration: 3000 });
    cy.get('[class="logo-col"]').should("be.visible");
  });
});
