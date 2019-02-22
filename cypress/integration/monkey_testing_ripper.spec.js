describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
		cy.contains('Ingresar').click()
        cy.wait(1000);
        //randomClick(10);
		randomEvent(10);
    })
})

function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {			
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick(monkeysLeft), 1000);
        });
    }   
}


function randomEvent(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    
	function evento(){
		var tags=['a','input[type="checkbox"]','button','input[type="text"]'];
		return tags[getRandomInt(0,4)];
	};

    var monkeysLeft = monkeysLeft;
	var elemento=evento();
    if(monkeysLeft > 0) {
        cy.get(elemento).then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
			
            if(!Cypress.dom.isHidden(randomLink)) {
             
				switch(elemento) {
					case 'input[type="checkbox"]':
					case 'button':
					case 'a':
						cy.wrap(randomLink).click({force: true});	
					break;
					case 'input[type="password"]':
						cy.wrap(randomLink).click().type('texto al azar');	
					break;
					
					default:
					
					}
							
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomEvent(monkeysLeft), 5000);
        });
    }   
}