// Define un conjunto de pruebas (test suite)
describe('Prueba de Navegación Básica', () => {

  // Test 1: Visitar y verificar el título/contenido
it('Debe visitar la página principal de Cypress y verificar su contenido', () => {
    cy.visit('https://www.cypress.io/');
    cy.title().should('include', 'Testing Frameworks for Javascript');
    cy.get('h1').should('be.visible');
});

// Test 2: Navegación por interacción (hacer clic)
it('Debe navegar a la documentación y verificar la URL', () => {
    
    // 1. Visitamos el dominio principal
    cy.visit('https://www.cypress.io/');

    // 2. Hacemos el click para navegar (con la solución de target="_blank" y force) (Daba error sin el force por no visibilidad)
    cy.contains('Documentation')
      .invoke('removeAttr', 'target') 
      .click({ force: true });         
      
    // 3. ENVOLVEMOS los comandos de verificación en el dominio (cy.origin)
    cy.origin('https://docs.cypress.io', () => {
        
        // Verificamos que estamos en el subdominio de documentación.
        cy.url().should('include', 'docs.cypress.io');
        
        // Verificamos que el cuerpo de la nueva página se ha cargado.
        cy.get('body').should('be.visible'); // 👈 ¡CORRECCIÓN APLICADA AQUÍ!
    });
});

});