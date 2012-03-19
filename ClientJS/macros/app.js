Ext.application({
    name: 'Macros',

    //appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'userlist'


                }
            ]
        });
    },
    controllers: [
        'main'
    ]
});