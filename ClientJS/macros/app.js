Ext.onReady(function(){
    //Ext.Loader.setConfig({enabled:true});
});
Ext.application({
    name: 'Macros',

    stores:[
        'users',
        'foldertreeStore'

    ],

    models:[
        'user',
        'foldertreeModel'

    ],

    launch: function() {

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'foldertree'
                }
            ]
        });
    },
    controllers: [
        'folder',
        'user'

    ]
});