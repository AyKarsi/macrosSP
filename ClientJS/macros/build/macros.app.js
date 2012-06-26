


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
});var proxyUrl  = "http://localhost:88/Proxy/Default.aspx";
var isInSharePoint = false;
Ext.Loader.setConfig({enabled:false});



var proxyUrl  = "http://localhost:88/Proxy/Default.aspx";
var isInSharePoint = false;

Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Macros', '/macros');
Ext.require('Macros.view.ribbon.ribbonGroup');
Ext.require('Macros.view.ribbon.ribbonAction');
Ext.require('Macros.view.file.attributes');
Ext.require('Macros.view.file.editattributes');
Ext.require('Macros.view.main.tabPanel');var proxyUrl  = "http://46.137.82.174/sites/macros/_layouts/macros.proxy/Proxy.aspx";
var isInSharePoint = true;
Ext.Loader.setConfig({enabled:false});

var SpRibbonBinding =
{





    initialized: false,
    init:function(){
        if (this.initialized)
            return;
        $('.ms-cui-tts li').click(function(){SpRibbonBinding.hideApp()});
        this.initialized = true;
    },

    toggle: function(ribbonGroup){

        var spRibbonName;
        switch(ribbonGroup)       {
            case "file":
                spRibbonName = "Ribbon.MacrosFile";
                break;
            case "folder":
                spRibbonName = "Ribbon.MacrosFolder";
                break;
            case "main":
                spRibbonName = "Ribbon.MacrosMain";
                break;
        }
        if (spRibbonName)
            SelectRibbonTab(spRibbonName, true);
        else
            console.log("unkown ribbonGroup " + ribbonGroup);

    },

    clickSearch : function() {
        this.init();
        macrosApp.getController("ribbonController").clickSearch();
        $("#s4-mainarea").hide();
    },

    fileViewAttributes : function() {
        this.init();
        macrosApp.getController("fileController").openFileAttributes();
        $("#s4-mainarea").hide();
    },
    fileEditAttributes : function() {
        this.init();
        macrosApp.getController("fileController").editFileAttributes();
        $("#s4-mainarea").hide();
    },
    fileOpen: function() {
        this.init();
        macrosApp.getController("fileController").openFile();
        $("#s4-mainarea").hide();
    },
    hideApp: function() {
        this.init();
        Ext.getCmp("macrosPanel").setVisible(false);
        $("#s4-mainarea").show();
    },
    hideSPMainContent: function() {
        this.init();
        $("#s4-mainarea").hide();
    }


};


