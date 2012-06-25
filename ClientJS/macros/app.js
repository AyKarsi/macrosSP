Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Macros', '/macros');
Ext.require('Macros.view.ribbon.ribbonGroup');
Ext.require('Macros.view.ribbon.ribbonAction');
Ext.require('Macros.view.main.tabPanel');

Ext.onReady(function(){


});




$(document).ready(function(){

    $("#s4-mainarea").after("<div id='macrosarea'></div>");

});


var macrosApp = {};
Ext.application({
//var Macros = Ext.create('Ext.app.Application',{
    name: 'Macros',
    appFolder: '/macros',
    stores:[
        'users',
        'foldertreeStore'

    ],

    models:[
        'user',
        'foldertreeModel'

    ],
    mainPanel:null,
    launch: function() {
        this.mainPanel= Ext.create('Ext.panel.Panel', {
            id:"macrosPanel",
            renderTo:'macrosarea',
            height:Ext.getBody().getViewSize().height - Ext.get('s4-ribbonrow').getViewSize().height ,
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

        this.mainPanel.setVisible(false);
        // this reference is needed for the ribbonbindings
        macrosApp = this;



    },
    controllers: [
        'folderController',
        'userController',
        'ribbonController'


    ]
});