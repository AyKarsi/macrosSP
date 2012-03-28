Ext.define('Macros.controller.ribbon', {
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



    toggle:function(ribbonGroupName){

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName)
                ribbon.show();
            else
                ribbon.hide();
        }
    },

    ribbons:[],

    init: function() {


        var startRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'start',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: null
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
        var fileRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'file',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Loeschen",
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    text: "Verschieben",
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


