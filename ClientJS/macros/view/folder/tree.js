Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    store: 'foldertreeStore',
    model: 'foldertreeModel',

    initComponent: function() {

       //this.on("itemclick", this.itemclick);

        this.callParent(arguments);
    },

   itemclick:function(node,opts){
    //debugger;
       var id = opts.data.id;
       this.store.loadChildren(id);
       alert("expand "+node.id);
    }
});