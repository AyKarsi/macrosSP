Ext.define('Macros.view.ribbon.folderRibbon', {
    extend: 'Ext.Container',
    layout:'hbox',
    objectData: null,
    initComponent: function(config)
    {
        Ext.apply(this, {
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
            }]

    });
        this.callParent(config);
    }

});