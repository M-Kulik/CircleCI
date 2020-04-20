// logowanie do serwisu istniejacego uzytkownika
/// <reference types="Cypress" />

// export function logowanie() {
//     cy.visit("https://dev-c.salestracker24.com/users/login")
//     cy.get('.js-login-email').type('info@salestracker24.com')
//     cy.get('#LoginForm_password').type('test')
//     cy.get('.btn-primary').click()
// }


// Scenariusz testowy logowania do istniejacego konta
describe('Logowanie do konta', () => {
    beforeEach('przekierowanie na strone', () => {
         cy.visit('http://local-st.pl')
         cy.url().should('contains', 'users/login')
    })


    // Uzytkownik znajduje sie pod odpowiednim adresem
    it('1. Uzytkownik jest na stronie logowania', () => {
        cy.url().should('contains', 'users/login')
        cy.contains('Logowanie')
        .get('#LoginForm_email')
        .get('#LoginForm_password')
        .get('.col-xs-12 > .btn') 
        cy.get('.col-xs-12 > .btn').should('be.enabled')
    })
    
    // Uzytkownik ma mozliwosc odzyskac haslo
    it('3. Użytkownik może zrestartowac haslo', () => {
        cy.get('.login-reset-pass > .btn').click()
        .url().should('eq', 'http://local-st.pl/users/resethasla')
        cy.contains('Resetowanie hasła')
        .get('#Users_resethasloemail')
        cy.get('.col-xs-12 > .btn').should('be.enabled')
    })       
    
    // Uzytkownik moze zalogowac sie z poprawnie podanymi danymi
    it('4. Uzytkownik moze sie poprawnie zalogowac', () => {
        cy.url().should('contains', 'users/login')
        cy.get('#LoginForm_email').type('info@salestracker24.com')
        .get('#LoginForm_password').type('Test1!')
        .get('.col-xs-12 > .btn').should('be.enabled')
        .get('.col-xs-12 > .btn').click()
        cy.contains('SERWIS TESTOWY')
    })

    // System wymaga prawidlowego hasla przy poprawnym mailu
    it('5. System wymaga hasla', () => {
        cy.get('#LoginForm_email').type('info@salestracker24.com')
        .get('#LoginForm_password').type('blednehaslo')
        .get('.col-xs-12 > .btn').click()
        cy.contains('Nieprawidłowa nazwa użytkownika lub hasło')
    })

    // System wymaga prawidlowego maila przy poprawnym hasle
    it('6. System wymaga maila', () => {
        cy.get('#LoginForm_email').type('bledny@salestracker24.com')
        .get('#LoginForm_password').type('Test1!')
        .get('.col-xs-12 > .btn').click()
        cy.contains('Nieprawidłowa nazwa użytkownika lub hasło')
    })
})
