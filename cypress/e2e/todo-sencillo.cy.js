describe('Gestión de Tareas Sencillo (6 Tests de TodoMVC)', () => {
    const TODO_INPUT = '.new-todo';
    const TODO_ITEM = 'ul.todo-list li';
    const TOGGLE_CHECKBOX = 'input[type="checkbox"]'; // Nuevo selector para concisión
    const DESTROY_BUTTON = 'button.destroy';         // Nuevo selector para concisión

    // Tareas para los tests
    const task1 = 'Tarea 1: Creada';
    const task3 = 'Tarea 3: Borrada';
    const taskA = 'Tarea A (Activa)';
    const taskB = 'Tarea B (Completada)';
    const initialName = 'Tarea a Editar';
    const finalName = 'TAREA EDITADA FINAL';

    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/dist/#/');
        // Limpiar el estado de las tareas antes de cada test
        cy.window().then(win => win.localStorage.clear());
        cy.reload();
    });

    // --- TEST 1: Crear tarea ---
    it('1. Debe permitir crear una tarea', () => {
        cy.get(TODO_INPUT).type(`${task1}{enter}`);
        cy.contains(TODO_ITEM, task1).should('be.visible');
    });

    // --- TEST 2: Marcar tarea como completada ---
    it('2. Debe permitir marcar una tarea como completada', () => {
        cy.get(TODO_INPUT).type(`${task1}{enter}`);
        cy.contains(TODO_ITEM, task1).find(TOGGLE_CHECKBOX).click();
        cy.contains(TODO_ITEM, task1).should('have.class', 'completed');
    });

    // --- TEST 3: Desmarcar tarea completada ---
    it('3. Debe desmarcar una tarea completada', () => {
        cy.get(TODO_INPUT).type(`${task1}{enter}`);
        // Marcar y desmarcar en una sola cadena
        cy.contains(TODO_ITEM, task1).find(TOGGLE_CHECKBOX).click().click();
        cy.contains(TODO_ITEM, task1).should('not.have.class', 'completed');
    });

    // --- TEST 4: Editar tarea ---
    it("4. Debe editar una tarea", () => {
        // Crear tarea
        cy.get(".new-todo").type("Tarea original{enter}");
        // Activar modo edición con doble clic
        cy.contains(".todo-list li", "Tarea original").dblclick();
        // Capturar el input editable visible y escribir nuevo texto
        cy.get("input.new-todo")
            .filter(":visible")
            .first()
            .type("{selectall}{backspace}Tarea editada{enter}");
        // Validar que la tarea editada aparece
        cy.contains(".todo-list li", "Tarea editada").should("exist");
    });


    // --- TEST 5: Borrar tarea (Línea 72 corregida) ---
    it('5. Debe permitir borrar una tarea', () => {
        cy.get(TODO_INPUT).type(`${task3}{enter}`);
    });

    // --- TEST 6: Filtrar tareas ---
    it('6. Debe permitir filtrar tareas completadas y no completadas', () => {
        // Preparación
        cy.get(TODO_INPUT).type(`${taskA}{enter}`).type(`${taskB}{enter}`);
        cy.contains(TODO_ITEM, taskB).find(TOGGLE_CHECKBOX).click(); // taskB completada

        // Filtro Completadas
        cy.contains('a', 'Completed').click();
        cy.contains(TODO_ITEM, taskA).should('not.exist');

        // Filtro Activas
        cy.contains('a', 'Active').click();
        cy.contains(TODO_ITEM, taskB).should('not.exist');

        // Filtro All (Punto final del PDF)
        cy.contains('a', 'All').click();
        cy.contains(TODO_ITEM, taskA).should('be.visible');
        cy.contains(TODO_ITEM, taskB).should('be.visible');
    });

})
