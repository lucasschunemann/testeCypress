describe("Agenda de Contatos", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  before(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
    cy.get("button.adicionar").click();
    cy.get('input[placeholder="Nome"]').type("Nome Teste");
    cy.get('input[placeholder="E-mail"]').type("teste@email.com");
    cy.get('input[placeholder="Telefone"]').type("123456789");
    cy.get('button[type="submit"]').click();
  });

  it("Deve alterar um contato existente", () => {
    cy.contains("li", "Nome Teste")
      .parents(".contato")
      .within(() => {
        cy.get("button.edit").click();
      });

    cy.get('input[placeholder="Nome"]').clear().type("Nome Alterado");
    cy.get('input[placeholder="E-mail"]').clear().type("alterado@email.com");
    cy.get('input[placeholder="Telefone"]').clear().type("987654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Nome Alterado").should("be.visible");
  });

  it("Deve adicionar um novo contato", () => {
    cy.get("button.adicionar").click();
    cy.get('input[placeholder="Nome"]').type("Nome Teste");
    cy.get('input[placeholder="E-mail"]').type("teste@email.com");
    cy.get('input[placeholder="Telefone"]').type("123456789");
    cy.get('button[type="submit"]').click();
    cy.contains("Nome Teste").should("be.visible");
  });

  it("Deve remover um contato existente", () => {
    cy.contains("li", "Nome Alterado")
      .parents(".contato")
      .within(() => {
        cy.get("button.delete").click();
      });

    cy.contains("Nome Alterado").should("not.exist");
  });
});
