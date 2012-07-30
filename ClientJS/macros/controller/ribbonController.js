Ext.define('Macros.controller.ribbonController', {
    extend: 'Ext.app.Controller',
    initialized: false,
    init:function(){
        if (this.initialized)
            return;
        $('.ms-cui-tts li').click(function(){SpRibbonBinding.hideApp()});
        this.initialized = true;

        //$("[id^='Ribbon.Macros']").append("<li class='macrosLogo' style='float:right'><img src='https://macros-sp-dev.s3.amazonaws.com/MacrosSP/macrosLogo.gif' /></li>");

    },

    toggle:function(ribbonGroupName, objectData){


        if (isInSharePoint){

            SpRibbonBinding.toggle(ribbonGroupName);
            return;
        }

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
                ribbon.show();
                if (objectData != null)
                    ribbon.objectData = objectData;

                if(ribbonGroupName == "file"){
                    var fc = this.application.getController('fileController');
                    ribbon.loadFileRibbonMenu(fc.currentFile.data.fileid);
                }

            }
            else
                ribbon.hide();
        }
    },
    refs :[{
        selector: '#macrosPanel',
        ref: 'MacrosArea'}
    ],

    ribbons:[],



    clickSearch : function(){
        //debugger;
        //this.init();
        Ext.getCmp("macrosPanel").setVisible(true);
        $("#s4-mainarea").hide();
    },



    init: function() {


        if (isInSharePoint)
        {
            // ribbon binding is done in sharepoint
            return;
        }

        var startRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'start',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: this.clickSearch,
                    spRibbonName : "Ribbon.MacrosFile",
                    ribbonSelector : "Ribbon\\\\.MacrosFile"
                }
            ]
        });




        this.ribbons.push(startRibbon);

        var folderRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'folder',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Anzeigen",
                    handler: function() {
                        alert("click");
                    }
                },
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    text: "Unterordner anlegen",
                    handler: null
                }
            ]

        });
        this.ribbons.push(folderRibbon);

        var docRibbon = Ext.create('Macros.view.ribbon.documentRibbon',{id:'file',renderTo:'ribbon'});
        this.ribbons.push(docRibbon);

        this.toggle('start');


    }
});


