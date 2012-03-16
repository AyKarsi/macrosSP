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
Ext.define('Macros.app.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    handler: null,
    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler
                        })/*,
                        {
                            xtype: 'box',
                            autoEl: {
                                tag:'a',
                                href:'#',
                                html:'link'
                            }
                        }*/
                    ]
            }
        );
        this.callParent(arguments);
    }});Ext.define('Macros.app.ribbonGroup', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonGroup',
    layout:'hbox',
    initComponent: function () {
        Ext.apply(this, {
                items:[
                    {
                        xtype:'ribbonAction',
                        text: "Suchen",
                        handler: macros.openSearch
                    },
                    {
                        xtype:'ribbonAction',
                        text: "Hilfe",
                        handler: macros.openSearch
                    }
                ]
            }
        );
        this.callParent(arguments);
    }});Ext.define('Macros.app.SearchForm', {
    extend: 'Ext.form.FormPanel',
    //extend: 'Ext.panel.Panel',
    alias: 'widget.searchform',

    submitSearch:function() {

        var tabber = Ext.ComponentMgr.get('app-tabs');
        var newTab = tabber.add({
            title:'Search Results',
            xtype:'searchresult',
            closable : true
        });
        tabber.setActiveTab(newTab);
    },

    initComponent: function () {

        Ext.apply(this, {
                title:'Search this..',
                items:[
                    new Ext.form.TextField({
                        id:"DocTitle",
                        fieldLabel:"Titel",
                        width:275,
                        allowBlank:false,
                        blankText:"Please enter a to address"
                    }),
                    new Ext.form.TextField({
                        id:"Author",
                        fieldLabel:"Autor",
                        width:275,
                        allowBlank:false,
                        blankText:"Please enter a to address"
                    }),
                    new Ext.form.TextField({
                        id:"Comment",
                        fieldLabel:"Kommentar",
                        width:275,
                        allowBlank:false,
                        blankText:"Please enter a to address"
                    })
                ],
                buttons:[{
                    text:'Go!',
                    handler:this.submitSearch

                }]
            }
        );
        this.callParent(arguments);
    }});Ext.define('Ext.macros.SearchResults', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.searchresult',
    height: 300,
    myData: searchResult,

    initComponent: function(){

        var store = this.myData;

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'title',
                text   : 'title',
                //width: 120,
                flex: 1,
                sortable : true,
                dataIndex: 'title'
            },{
                text   : 'version_maj',
                width    : 75,
                sortable : true,
                dataIndex: 'version_maj'
            },{
                text   : '% lastmodifiedat',
                width    : 75,
                sortable : true,
                dataIndex: 'lastmodifiedat'
            }]
        });

        this.callParent(arguments);
    }
});/**
 * Created by JetBrains WebStorm.
 * User: tropper
 * Date: 12.03.12
 * Time: 12:00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext.macros.TreeNavigation', {

    extend: 'Ext.tree.Panel',
    alias: 'widget.treenavigation',
    height: 'auto',
    store: treeNavigationModel,

    initComponent: function(){



        Ext.apply(this, {



        });

        this.callParent(arguments);
    },
    listeners:{
        itemclick: function(view,rec,item,index,eventObj)
        {
            debugger;
            var id = rec.get("id");
            var text = rec.get("text");
            //alert(id + " " + text);
        }
    }
});
Ext.define('Macros.app.Window', {
    extend: 'Ext.window.Window',
    renderTo: Ext.getBody(),
    closeAction:'hide'
});
