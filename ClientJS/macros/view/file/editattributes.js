Ext.define('Macros.view.file.editattributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileeditattributes',
    title : 'Edit File Attributes',
    closable:true,
    fileid:'',


    initComponent: function() {

        var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=editfileattr&id='+ this.fileid;
        //this.src = url;
        this.src = "http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/docops.cfg&p=form&MaskName=freattr&fileid={0}&adddata=&docclass=1&attrclass=3";
        this.src = this.src.replace("{0}", this.fileid);

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});