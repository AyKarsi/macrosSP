Ext.define('Macros.controller.ribbonController', {
    extend: 'Ext.app.Controller',
/*
    views: [
        'file.list'
    ],
    stores: [
        'filesStore'
    ],
    models: [
        'fileModel'
    ],*/



    toggle:function(ribbonGroupName, objectData){

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
                ribbon.show();
                if (objectData != null)
                    ribbon.objectData = objectData;
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
        Ext.getCmp("macrosPanel").setVisible(true);
    },



    init: function() {

        //debugger;
        //var macrosarea = this.getMacrosArea();
        //macrosarea.setVisible(false);
        //Ext.getCmp("macrosPanel").setVisible(false)


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
                    handler: this.clickSearch
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
                    handler: null
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
        var fileRibbon = Ext.widget('ribbonGroup',{
            //that: this,
            renderTo:'ribbon',
            id:'file',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Attribute anzeigen",
                    ribbonGroup:fileRibbon,
                    handler: function(){
                             debugger;
                        alert("attribute anzeigen " + this.scope.id);
                    }
                },
                {
                    xtype:'ribbonAction',
                    text: "Reattributen",
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    text: "Weitlerleiten",
                    handler: null
                }
            ]

        });
        this.ribbons.push(fileRibbon);

        this.toggle('start');


     /*   this.control({
            'list': {
                itemdblclick: this.editFile
            }
        });
        */
    }
});


