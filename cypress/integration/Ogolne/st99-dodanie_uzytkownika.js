
// import funkcji zwiazanych z logowaniem z pliku ./logowanie.js
import {logowanie} from './logowanie.js'


describe('dodanie uzytkownika z poziomu administratora', function() {
    it('logowanie do serwisu', function() {

        // logowanie na konto
        let val = logowanie();
        cy.url().should('eq', 'https://dev-c.salestracker24.com/')

        // wejscie w panel administratora
        cy.get('a[href^="/Admin/index"]').click()
        

        // przejscie do dodania uzytkownika
        cy.get('a[href^="/users/create"]').click()

        // wypelnienie formularza
        cy.get('select[name="Users[rodzaj_konta]"]').select('Testowe')
        cy.get('#Users_email').type('emailtestowy@domenast.test')
        cy.get('#Users_external_id').type('123')
        cy.get('#Users_name').type('imie testowe')
        cy.get('#Users_surname').type('nazwisko testowe')
        cy.get('#Users_grupa_id').select('Centrala')
        cy.get('.select2-selection__rendered').type('tag')
        cy.get('#Users_phone').type('123456789')
        cy.get('#Users_paymentprofile_id').select('Domyślny')


        // cy.get('#Users_pbx_login').type('1234')
        // cy.get('#Users_lead_scoring_id').select('')
        // cy.get('#Users_karta_uzytkownika_id').select('Pilot WWS - archiwum')
        // cy.get('').should()
        // cy.get('').select('')
        // cy.get('').select('')
        // cy.get('').select('')
        // cy.get('').select('')
        // cy.get('action-select').select('element do wybrania')



    })

    // it('sciezka do formularza', function(){
    //     cy.get('a[href^="/Admin/index"]').click()
    // })
})

