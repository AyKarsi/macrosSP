Ext.define('Macros.app.Panel', {
    extend: 'Ext.panel.Panel',
    alias:'widget.macrosWindow',
    width: 1000,
    height:700,
    //renderTo: 's4-mainarea',
    maximize:function(window , eOpts )
    {
        alert("mx");

    },
    initComponent: function () {

        Ext.apply(this, {
            layout: {
                type: 'vbox',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [{
                id: 'app-header',
                xtype: 'box',
                height: 40,
                width: 900,
                html: 'Macros SharePoint DMS Integration'
            },
                {

                    xtype: 'container',
                    layout: 'border',
                    height:600,
                    width: 900,
                    items :[
                        {
                            id: 'app-options',
                            title: 'Options',
                            region: 'west',
                            width: 300,
                            minWidth: 150,
                            maxWidth: 400,
                            split: true,
                            collapsible: true,
                            layout: 'accordion',
                            items: [{
                                html: '1234',
                                title:'Search',
                                xtype:'searchform',
                                autoScroll: true,
                                border: false,
                                iconCls: 'nav'
                            },{
                                title:'Navigation',
                                //xtype:'searchform',
                                xtype:'treenavigation',
                                border: false,
                                autoScroll: true,
                                iconCls: 'settings'
                            },{
                                title:'Settings',
                                html: '1234',
                                border: false,
                                autoScroll: true,
                                iconCls: 'settings'
                            }
                            ]
                        },
                        {
                            xtype:'tabpanel',
                            id:'app-tabs',
                            height:700,
                            width:500,
                            region: 'center',
                            title:'tabss.',
                            items:[]
                        }
                    ]
                }]

        });
        this.callParent(arguments);
        // superclass.initComponent...
    }


});
