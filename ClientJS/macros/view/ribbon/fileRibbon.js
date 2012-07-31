Ext.define('Macros.view.ribbon.fileRibbon', {
    extend: 'Ext.Container',
    layout:'hbox',
    objectData: null,
    initComponent: function(config)
    {

        Ext.apply(this, {

            items:[
                {
                    xtype:'ribbonAction',
                    name:'doctemplate',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name:'projectdata',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name:'display',
                    ribbonGroup:this,
                    handler: this.openFile
                },
                {
                    xtype:'ribbonAction',
                    name:'displayarchived',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name:'checkout',
                    ribbonGroup:this
                }
                ,
                {
                    xtype:'ribbonAction',
                    name:'checkoutback',
                    ribbonGroup:this
                }
                ,
                {
                    xtype:'ribbonAction',
                    name:'checkin',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name: "reattr",
                    ribbonGroup:this,
                    handler: this.editFileAttributes
                },
                {
                    xtype:'ribbonAction',
                    name: "move",
                    ribbonGroup:this,
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    name: "delete",
                    ribbonGroup:this,
                    handler: null
                }
            ]
        });
        this.callParent(config);
    },
    loadFileRibbonMenu : function (fileid) {

        Ext.each(this.items.items, function(item,index,items){
            item.setVisible(false);
        });

        var docStore = new Macros.store.documentMenuStore();
        docStore.load({
            params: {id:fileid},
            callback: Ext.bind(function(records,operation,success){
                var menuItem = records[0].data;
                Ext.each(this.items.items, function(item){

                    if (menuItem[item.name+'_url'] != null && menuItem[item.name+'_url'] != ""  ){
                        item.setText(menuItem[item.name]);
                        item.setVisible(true);
                        item.url = menuItem[item.name+'_url'];
                    }

                });
                this.doLayout();

            },this)
        });

    },
    openFileAttributes: function() {
        var ctrl =macrosApp.getController("fileController");
        return ctrl.openFileAttributes();
    },
    editFileAttributes : function() {
        var ctrl =macrosApp.getController("fileController");
        return ctrl.editFileAttributes();
    },
    openFile: function() {
        var ctrl =macrosApp.getController("fileController");
        return ctrl.openFile();

    }




});