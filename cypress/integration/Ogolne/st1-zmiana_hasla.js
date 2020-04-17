/// <reference types="Cypress" />


describe('zmiana hasla', function() {

    // usuwanie zawartości skrzynki przed wysłaniem maila z przypomnieniem hasła
    it('usuwanie zawartości skrzynki', function(){
        cy.visit('http://local-st.pl:1080/')
        cy.get('a[title="Clear all messages"]').click()
    })

    // wprowadzanie adresu do zresetowania hasla
    it('nawigacja na stronie salestracker', function() {
        cy.visit('http://local-st.pl/users/login')
        cy.get('.js-reset-pass').click()
        cy.url().should('eq', 'http://local-st.pl/users/resethasla')
        cy.get('#Users_resethasloemail').type('info@salestracker24.com')
        cy.get('.col-xs-12 > .btn').click()

    })

    // sprawdzanie skrzynki pocztowej
    it('skrzynka pocztowa', function(){
        cy.visit('http://local-st.pl:1080/messages/1.html')
        cy.get('strong > a').click()
        cy.url().should('contain', 'http://local-st.pl/users/resethasla')
    

    // wprowadza zmienione haslo
        cy.get('#Users_password').type('Test1!')
        cy.get('.btn-success').click()

    })  

    // zalogowanie z nowym hasłem
    it('resetowanie hasła', function(){
        cy.visit('http://local-st.pl/users/login')
        cy.get('#LoginForm_email').type('info@salestracker24.com')
        cy.get('#LoginForm_password').type('Test1!')
        cy.get('.col-xs-12 > .btn').click()
        cy.contains('SERWIS TESTOWY')
    })

}) 
