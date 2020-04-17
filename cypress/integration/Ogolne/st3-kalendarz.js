/*Operacje wykonywane na kalendarzu:
dodanie zadania, 
zmiana widoku na dzien; tydzien; miesiac; tygodnia na pn-pt */

/// <reference types="Cypress" />



describe('Operacje wykonywane na kalendarzu', () => {

    // ustalenie dzisiejszego dnia
    var today = new Date();
    var godz = String(today.getHours());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    var godzstart = godz + ':00';
    var godzkoniec = godz + ':30';

    // ustalenie jutrzejszego dnia
    var tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    var dd2 = String(tomorrow.getDate()).padStart(2, '0');
    var tomorrow = dd2 + '.' + mm + '.' + yyyy;

    // ustalenie godziny

    // przekierowanie na strone kalendarza
    beforeEach('Przekierowanie do kalendarza', () => {
        cy.visit('http://local-st.pl/Calendar/index/#' + today)
        cy.stlogin() 
        cy.contains('Kalendarz dla: admin admin')
        cy.url().should('contain', today)

    })  

    // Dodanie zadania w kalendarzu
    it('1. Dodanie zadania', () => {
        cy.get('.btn-success').click()              //wejscie w formularz
        cy.contains('Dodawanie nowego zadania')     //assert ze w formularzu
        cy.get('div.col-sm-6 > .select2 > .selection > .select2-selection').type('a')
        // cy.wait(2000)   /*
        //                 Dodanie sposobu na ominiecie cy.wait()
        //                 assert, ze znaczek ladowania przy wpisywaniu wartosci do pola zniknal
        //                 assert, ze lista jest rozwinieta 
        //                 (na razie jest informacja, że rozwinieta,
        //                 mimo to nie klika)
        //                 */    

        
        cy.get('li[role="option"]', {timeout: 7000})
        .should('be.visible')       //assert ze rozwinieta lista jest widoczna
        cy.get('li.select2-results__option').should('be.visible')
        .first().click()        //wybranie pierwszego wygenerowanego rekordu
        // cy.pause()

        // pole typ zadania
        cy.get('#aktywnosci_lista').click() 
        cy.get('#Zadania_zadania_id > option').eq(2)    //znajduje 2 element z listy
        .then(($wart) => {                           
            var zaw = $wart.text()                      //przydziela zawartosc tekstowa elementu
            cy.get('#Zadania_zadania_id').select(zaw)   //wybiera element na podstawie tekstu
        })
        
        // ustalanie dat i godzin
        cy.get('#zadanie_datestart').type(tomorrow)     //data startu
        cy.get('#zadanie_dateend').type(tomorrow)       //data konca
        cy.get('#zadanie_timestart').type(godzstart)    //godzina startu
        cy.get('#zadanie_timeend').type(godzkoniec)     //godzina zakonczenia

        // zapisanie zadania
        cy.get('#zadania_button_submit').click()
        
        // assert ze bez bledow
        cy.wait(1000)
        cy.contains('Dodawanie nowego zadania').should('not.be.visible')    //wymuszone czekanie,
                                                                            //powinno czekać na załadowanie

    })


    // // manewrowanie po kalendarzu
    // it('2. Manewrowanie po kalendarzu', () => {
        
    // })
})