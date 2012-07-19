


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
        // alert(Ext.get('s4-ribbonrow').getViewSize().height);

        var adjustHeight = function(){
            var ribbonHeight = Ext.get('s4-ribbonrow').getViewSize().height;
            var otherRibbon = Ext.get('ribbon');
            if (otherRibbon != null)
                ribbonHeight += otherRibbon.getViewSize().height;
            return 150;
        };

        var ribbonHeight = adjustHeight();


        this.mainPanel= Ext.create('Ext.panel.Panel', {
            id:"macrosPanel",
            renderTo:'macrosarea',
            height:Ext.getBody().getViewSize().height - ribbonHeight ,
            layout: {
                type: 'border',
                align: 'left'
            },
            adjustHeight: function() {
                var ribbonHeight = Ext.get('s4-ribbonrow').getViewSize().height;
                var otherRibbon = Ext.get('ribbon');
                if (otherRibbon != null)
                    ribbonHeight += otherRibbon.getViewSize().height;
                ribbonHeight = 135;
                this.height = Ext.getBody().getViewSize().height - ribbonHeight;
                //this.height = $("body").height() - ribbonHeight +;
                },
            items: [
                {
                    xtype:'box',
                    html:'Macros DMS',
                    region:'north'

                },
                {
                    xtype:'foldertree',
                    title:'',
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

Ext.EventManager.onWindowResize(function () {

    if (macrosApp.mainPanel == null)
        return;
    macrosApp.mainPanel.adjustHeight();
    macrosApp.mainPanel.doLayout();
});