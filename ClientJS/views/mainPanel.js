Ext.define('Macros.app.Panel', {
    extend: 'Ext.panel.Panel',
    alias:'widget.macrosWindow',
    layout:'box',
    height:100,
    initComponent: function () {

        Ext.apply(this, {
            layout: {
                type: 'vbox',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [
                {
                id: 'app-header',
                xtype: 'container',
                height: 40,
                width: 600,
                html: 'Macros SharePoint DMS Integration'
            },

            {
                xtype: 'panel',
                layout: 'hbox',
                height:600,
                items :[
                        /*{
                        xtype:'macrosOptions',
                        //id: 'app-options',
                        title: 'Options'
                   /*     region: 'center',
                        height:600,
                        width: 500, //0.25 * Ext.getBody().getViewSize().width,
                        minWidth: 150,
                        //maxWidth: 400,
                        //split: true,
                        //collapsible: true
                    },*/
                    {
                        xtype:'tabpanel',
                        id:'app-tabs',
                        height:700,
                        width: 600, //0.75 * Ext.getBody().getViewSize().width,
                        region: 'center',
                        title:'tabss.'/*,
                        items:[]*/
                    }
                ]
            }]

        });
        this.callParent(arguments);
        // superclass.initComponent...
    }


});
