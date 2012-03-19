Ext.define('Macros.controller.main', {
    extend: 'Ext.app.Controller',

    views: [
        'user.list'
    ],

    init: function() {
        this.control({
            'userlist': {
                itemdblclick: this.editUser
            }
        });
    },

    editUser: function(grid, record) {
        console.log('Double clicked on ' + record.get('name'));
    }
});
