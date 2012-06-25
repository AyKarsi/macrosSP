Ext.define('Macros.view.file.editattributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileeditattributes',
    title : 'Edit File Attributes',
    closable:true,


    initComponent: function() {

        var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=editfileattr&id='+ fileId;
        this.src = url;

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});