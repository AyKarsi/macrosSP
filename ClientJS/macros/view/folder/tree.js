Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    model: 'Macros.model.foldertreeModel',
    store: 'foldertreeStore',
    clearOnLoad:false,
    style: {
                "background-color": "green",
                "color": "green"
    },
    cls: 'macrosFoldertree',
    initComponent: function() {
       this.callParent(arguments);
        this.on("load",function(treeStore, records, successful, operation) {


            Ext.each(successful,function(item){
                console.log(item.nodeId);
                item.cls="subitem";
            });

            //var id = 8; // This is the ID of the node that somehow you know in advance
            //var node = treeStore.getNodeById(id);

            ///treePanel.expandPath(node.getPath());
        });

    },

   itemclick:function(node,opts){
       this.store.load({
           node:opts.data

           ,callback:function(a,b,c){
               debugger;
               console.log("callback");
           }
       })
    }
});