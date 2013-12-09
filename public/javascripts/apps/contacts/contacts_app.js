SuperAppManager.module('ContactsApp', function (ContactsApp, SuperAppManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            //"contacts": "listContacts",
            //Contacts is replaced by contacts/(anything)
            "contacts(?filter=:criterion)": "listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"

        }
    });

    var API = {
        listContacts: function (criterion) {
            SuperAppManager.ContactsApp.List.Controller.listContacts(criterion);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "contacts");
        },

        showContact: function (id) {
            ContactsApp.Show.Controller.showContact(id);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "contacts");
        },

        editContact: function (id) {
            ContactsApp.Edit.Controller.editContact(id);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "contacts");
        }
    };


    SuperAppManager.on("contacts:list", function () {
        SuperAppManager.navigate("contacts");
        API.listContacts();
    });

    SuperAppManager.on("contact:show", function (id) {
        //only impacting the URL in the address bar
        SuperAppManager.navigate("contacts/" + id);
        //actually redirecting page to display correct contect
        API.showContact(id);
    });

    SuperAppManager.on("contact:edit", function (id) {
        SuperAppManager.navigate("contacts/" + id + "/edit");
        API.editContact(id);
    });

    //Event listener to update the URL fragment when filtering
    SuperAppManager.on("contacts:filter", function (criterion) {
        if (criterion) {
            //If we have a filtering criterion, we add it as a query string to the URL fragment
            SuperAppManager.navigate("contacts?filter=" + criterion);
        }
        else {
            SuperAppManager.navigate("contacts");
        }
    });

    SuperAppManager.addInitializer(function () {
        new ContactsApp.Router({
            controller: API
        });
    });
});

