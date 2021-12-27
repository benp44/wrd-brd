describe("letter box", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("always contains uppercase letters", () => {
        cy.get("#letter-box-0-0").type("a");
        cy.get("#letter-box-0-0").should("have.value", "A");
    });

    it("replaces content when key pressed", () => {
        cy.get("#letter-box-0-0").type("a");
        cy.get("#letter-box-0-0").should("have.value", "A");
        cy.get("#letter-box-0-0").type("b");
        cy.get("#letter-box-0-0").should("have.value", "B");
    });
});
