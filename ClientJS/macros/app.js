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

        Ext.create('Ext.panel.Panel', {

            renderTo:'s4-mainarea',
            height:Ext.getBody().getViewSize().height - Ext.get('topDings').getViewSize().height ,
            layout: {
                type: 'border',
                align: 'left'
            },
            items: [
                {
                    xtype:'box',
                    html:'Macros',
                    region:'north'

                },
                {
                    xtype:'foldertree',
                    title:'folder',
                    flex:1,
                    region:'west',
                    layout: 'fit',
                    split: true
                    //height:'100%'
                },
                {
                    xtype:'tabs',
                    id:'maintabs',
                    region:'center',
                    width:400,
                    flex:1,
                    height:200
                    //split: true,
                    //height:'100%'

                }
            ]
        });




    },
    controllers: [
        'folder',
        'user',
        'ribbon'


    ]
});