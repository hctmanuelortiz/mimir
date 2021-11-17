import { Template } from "meteor/templating"; // esto se importa para conectar con el nombre de los templates

import { TasksCollection } from "../api/TasksCollection";

import "./App.html"; // hay que importar la vista donde vamos a trabajar.

import "./Task.js";

import "./home.html";

import "./Login.html";

// VER ESTO: https://blaze-tutorial.meteor.com/simple-todos/06-filter-tasks.html

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

const getTasksFilter = () => {
    const user = getUser();
  
    const hideCompletedFilter = { isChecked: { $ne: true } };
  
    const userFilter = user ? { userId: user._id } : {};
  
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  
    return { userFilter, pendingOnlyFilter };
  }

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.helpers({

  // Template.*nombre del template*. helpers que no se que es.
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
      sort: { createdAt: -1 },
    }).fetch();
  },
  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
  incompleteCount() {
    if (!isUserLogged()) {
      return '';
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  }
});

/*
    Adjuntar eventos a plantillas
Los detectores de eventos se agregan a las plantillas de la misma manera que los ayudantes: 
llamando Template.templateName.events(...)con un diccionario.
 Las claves describen el evento que se va a escuchar y
  los valores son controladores de eventos a los que se llama cuando ocurre el evento.

En nuestro caso anterior, 
estamos escuchando el submitevento en cualquier elemento que coincida con el selector
 de CSS .task-form. Cuando este evento es activado por el usuario presionando enter dentro 
 del campo de entrada, o el botón de enviar, se llama a nuestra función de controlador de eventos.

El controlador de eventos recibe un argumento llamado eventque
 tiene información sobre el evento que se desencadenó. En este caso event.targetes nuestro 
 elemento de formulario, y podemos obtener el valor de nuestra entrada con event.target.text.value. 
 Puede ver todas las demás propiedades del objeto de evento agregando un console.log(event)e 
 inspeccionando el objeto en la consola de su navegador.

Finalmente, en la última línea del controlador de eventos, 
necesitamos borrar la entrada para prepararnos para otra nueva tarea.
 */

/*
4.4: Obtener datos en controladores de eventos
Dentro de los controladores de eventos, se thisrefiere a un objeto de tarea individual.
 En una colección, cada documento insertado tiene un _idcampo único que se puede usar 
 para hacer referencia a ese documento específico. Podemos obtener el _id 
 de la tarea actual this._idasí como cualquier otro campo que esté disponible
  en el lado del cliente. Una vez que tenemos el _id, podemos usar, actualizar y 
  eliminar la tarea relevante, y así es como nuestro código actualiza y 
  elimina una tarea en nuestra aplicación.

*/

Template.form.events({
  "click #hide-completed-button"(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
  "click .toggle-checked"() {
    // Set the checked property to the opposite of its current value
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked },
    });
  },
  "click .delete"() {
    TasksCollection.remove(this._id);
  },
  "submit .task-form"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    TasksCollection.insert({
        text,
        userId: getUser()._id,
        createdAt: new Date(), // current time
      });

    // Clear form
    target.text.value = "";
  },
  'click .user'() {
    Meteor.logout();
  }
});
