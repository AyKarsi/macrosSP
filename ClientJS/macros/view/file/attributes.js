Ext.define('Macros.view.file.attributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileattributes',
    title : 'File Attributes',
    fileid: '',
    closable:true,


    initComponent: function() {

        //var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=getfileattr&id='+ this.fileid;
        this.src = url;

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});