import { faker } from '@faker-js/faker';

describe('Calculatrice - Tests Fonctionnels Complets', () => {
    
    // Avant chaque test, on visite la page de la calculatrice
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    // --- 1. Vérification de l'interface ---
    it('affiche correctement le titre de la calculatrice', () => {
        cy.contains('Ma Calculatrice Professionnelle').should('be.visible');
    });

    // --- 2. Tests des opérations mathématiques ---
    it('additionne 7 et 3 (Opération simple)', () => {
        cy.get('#input-a').type('7');
        cy.get('#input-b').type('3');
        cy.get('#btn-add').click();
        cy.get('#output').should('have.text', '10');
    });

    it('soustrait 5 de 12 (Logique TODO complétée)', () => {
        cy.get('#input-a').type('12');
        cy.get('#input-b').type('5');
        cy.get('#btn-sub').click();
        cy.get('#output').should('have.text', '7');
    });

    it('divise 12 par 3 (Logique TODO complétée)', () => {
        cy.get('#input-a').type('12');
        cy.get('#input-b').type('3');
        cy.get('#btn-div').click();
        cy.get('#output').should('have.text', '4');
    });

    it('affiche "Erreur" lors d\'une division par zéro', () => {
        cy.get('#input-a').type('10');
        cy.get('#input-b').type('0');
        cy.get('#btn-div').click();
        cy.get('#output').should('have.text', 'Erreur');
    });

    // --- 3. Tests Métier Avancés (Email Corporate) avec Faker ---
    
    it('Email valide (@company.com) -> Calcul autorisé', () => {
        // Génération de données aléatoires réalistes
        const prenom = faker.person.firstName();
        const nom = faker.person.lastName();
        // Force un email avec le bon domaine
        const emailValide = faker.internet.email({ firstName: prenom, lastName: nom, provider: 'company.com' });

        // Interaction
        cy.get('#input-nom-complet').type(`${prenom} ${nom}`);
        cy.get('#input-email').type(emailValide);

        // Vérification visuelle du statut
        cy.get('#email-status')
          .should('contain', 'Email valide')
          .and('have.css', 'color', 'rgb(0, 128, 0)'); // Vert

        // Test d'une opération (Multiplication)
        cy.get('#input-a').type('4');
        cy.get('#input-b').type('2');
        cy.get('#btn-mul').click();

        // Validation du résultat
        cy.get('#output').should('have.text', '8');
    });

    it('Email invalide (Gmail/Yahoo...) -> Blocage de l\'addition', () => {
        // Génération d'un email quelconque (probabilité quasi nulle d'être @company.com)
        const emailInvalide = faker.internet.email({ provider: 'gmail.com' });

        cy.get('#input-email').type(emailInvalide);

        // Vérification immédiate du message d'erreur
        cy.get('#email-status')
          .should('contain', 'Doit se terminer par @company.com')
          .and('have.css', 'color', 'rgb(255, 0, 0)'); // Rouge

        // Tentative d'addition
        cy.get('#input-a').type('5');
        cy.get('#input-b').type('5');
        cy.get('#btn-add').click();

        // Le calcul ne doit PAS se faire, l'erreur doit s'afficher
        cy.get('#output').should('contain', 'Erreur: Email invalide');
    });
});
