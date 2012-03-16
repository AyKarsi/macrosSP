/**
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
            var id = rec.get("id");
            var text = rec.get("text");
            alert(id + " " + text);
        }
    }
});
