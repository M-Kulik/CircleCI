// /// <reference types="Cypress" />


describe('zablokowanie konta i zmiana hasla', function() {

// System blokuje dostep przy zbyt duzej ilosci blednych prob
    it('1. Blokowanie konta przy blednym hasle', () => {
        cy.visit('http://local-st.pl/users/login')
        cy.get('#LoginForm_email').type('info@salestracker24.com')
        .get('#LoginForm_password').type('blednehaslo')
        // wymuszenie zablokowania
        cy.get('.col-xs-12 > .btn').click({ force: true })
        cy.get('.col-xs-12 > .btn').click({ force: true })
        cy.get('.col-xs-12 > .btn').click({ force: true })
        cy.get('.col-xs-12 > .btn').click({ force: true })
        cy.get('.col-xs-12 > .btn').click({ force: true })
        // assert przycisk zaloguj zablokowany
        cy.get('.col-xs-12 > .btn').should('be.disabled')
        // assert informacja o zablokowaniu konta
        cy.contains('li', 'Przekroczono liczbę nieudanych prób logowania. Konto zostało zablokowane.')
    })

    // System nie pozwala sie zalogowac przy zablokowanym koncie z poprawnymi danymi
    it('2. Konto zablokowane', () => { 
        cy.visit('http://local-st.pl/users/login')
        // assert przycisk dostepny  
        cy.get('.col-xs-12 > .btn').should('be.enabled')
        cy.get('#LoginForm_email').type('info@salestracker24.com')
        .get('#LoginForm_password').type('Test1!')
        cy.get('.col-xs-12 > .btn').click()
        // assert przycisk zablokowany
        cy.get('.col-xs-12 > .btn').should('be.disabled')
        // assert informacja o zablokowaniu konta
        cy.contains('li', 'Przekroczono liczbę nieudanych prób logowania. Konto zostało zablokowane.')
    })

    // usuwanie zawartości skrzynki przed wysłaniem maila z przypomnieniem hasła
    it('3. Usuwanie zawartości skrzynki', function(){
        cy.visit('http://local-st.pl:1080/')
        cy.get('a[title="Clear all messages"]').click()
    })

    // wprowadzanie adresu do zresetowania hasla
    it('4. Nawigacja na stronie salestracker', function() {
        cy.visit('http://local-st.pl/users/login')
        cy.get('.js-reset-pass').click()
        cy.url().should('eq', 'http://local-st.pl/users/resethasla')
        cy.get('#Users_resethasloemail').type('info@salestracker24.com')
        cy.get('.col-xs-12 > .btn').click()
    })

    // sprawdzanie skrzynki pocztowej
    it('5. Skrzynka pocztowa', function(){
        cy.visit('http://local-st.pl:1080/messages/1.html')
        cy.get('strong > a').click()
        cy.url().should('contain', 'http://local-st.pl/users/resethasla')
    

    // wprowadza zmienione haslo
        cy.get('#Users_password').type('Test1!')
        cy.get('.btn-success').click()
    })  

    // zalogowanie z nowym hasłem
    it('6. Resetowanie hasła', function(){
        cy.visit('http://local-st.pl/users/login')
        cy.get('#LoginForm_email').type('info@salestracker24.com')
        cy.get('#LoginForm_password').type('Test1!')
        cy.get('.col-xs-12 > .btn').click()
        cy.contains('SERWIS TESTOWY')
    })

})