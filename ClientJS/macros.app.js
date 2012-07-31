var proxyUrl  = "http://localhost:88/Proxy/Default.aspx";
var macrosExeServerUrl = "http://wega.mi-m.de/edms/exe/";
var isInSharePoint = false;

Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Macros', '/macros');
Ext.require('Macros.view.ribbon.ribbonGroup');
Ext.require('Macros.view.ribbon.ribbonAction');
Ext.require('Macros.view.main.tabPanel');

Ext.require('Macros.controller.fileController');
Ext.require('Macros.store.documentMenuStore');
Ext.require('Macros.store.foldertreeStore');



Ext.require('Macros.model.documentMenuModel');
Ext.require('Macros.model.foldertreeModel');


Ext.require('Macros.store.users');




Ext.require('Macros.view.file.attributes');
Ext.require('Macros.view.file.editattributes');
Ext.require('Macros.view.ribbon.fileRibbon');




Ext.onReady(function(){

    console.log("ext.ready");


});
$(document).ready(function(){
    $("#s4-mainarea").after("<div id='macrosarea'></div>");
    console.log("jquery.ready");
});

var macrosApp = {};
Ext.application({
    name: 'Macros',
    appFolder: '/macros',
    stores:[
        'users',
        'foldertreeStore'
    ],
    models:[
        'user',
        'foldertreeModel'
    ],
    mainPanel:null,
    launch: function() {
        console.log("launch;")
        // alert(Ext.get('s4-ribbonrow').getViewSize().height);

        var adjustHeight = function(){
            var ribbonHeight = Ext.get('s4-ribbonrow').getViewSize().height;
            var otherRibbon = Ext.get('ribbon');
            if (otherRibbon != null)
                ribbonHeight += otherRibbon.getViewSize().height;
            return 150;
        };

        var ribbonHeight = adjustHeight();
        this.mainPanel= Ext.create('Ext.panel.Panel', {
            id:"macrosPanel",
            renderTo:'macrosarea',
            height:Ext.getBody().getViewSize().height - ribbonHeight ,
            layout: {
                type: 'border',
                align: 'left'
            },
            adjustHeight: function() {
                var ribbonHeight = Ext.get('s4-ribbonrow').getViewSize().height;
                var otherRibbon = Ext.get('ribbon');
                if (otherRibbon != null)
                    ribbonHeight += otherRibbon.getViewSize().height;
                ribbonHeight = 135;
                this.height = Ext.getBody().getViewSize().height - ribbonHeight;
                //this.height = $("body").height() - ribbonHeight +;
                },
            items: [
                {
                    xtype:'box',
                    html:'<div style="padding-right:10px;font-size:18px; padding-top:10px;padding-bottom:10px;background-color:white">myDMS</div>',
                    region:'north'

                },
                {
                    xtype:'foldertree',
                    title:'',
                    flex:1,
                    region:'west',
                    layout: 'fit',
                    split: true
                    //height:'100%'
                },
                {
                    xtype:'tabs',
                    id:'maintabs',
                    region:'center',
                    width:400,
                    flex:1,
                    height:200
                    //split: true,
                    //height:'100%'

                }
            ]
        });

        this.mainPanel.setVisible(false);
        // this reference is needed for the ribbonbindings
        macrosApp = this;



    },
    controllers: [
        'folderController',
        'userController',
        'ribbonController'


    ]
});

Ext.EventManager.onWindowResize(function () {

    if (macrosApp.mainPanel == null)
        return;
    macrosApp.mainPanel.adjustHeight();
    macrosApp.mainPanel.doLayout();
});var SpRibbonBinding =
{
    callRibbonAction : function(ribbonName, actionName)
    {
        var ribController = macrosApp.getController("ribbonController");
        var ribbonGroup = ribController.getRibbonGroup(ribbonName);
        Ext.each(ribbonGroup.items.items, function(item){
            if (item.name == actionName){
                // exectue the handle
                if (item.handler == null){
                    console.log(ribbonName + "ribbon has no handle defined on action "+ actionName);
                }
                else {
                    item.handler();
                }
            }
        });
    },

    // needs to be called very late, to make sure that all ribbons are present..
    // might possibly fail with other ribbons..
    ensureRibbonBinding:function() {

        if (!isInSharePoint)
            return;

        //$('.ms-cui-tts li').unbind("click.macrosRibbon");
        // only bind the click event to non macros ribbon groups
        //$('.ms-cui-tts li:not([id^="Ribbon.Ma"])').bind("click.macrosRibbon",function(a,b,c){
        $('.ms-cui-tts li').bind("click.macrosRibbon",function(event){

            debugger;
            var ribbonId = event.currentTarget.id.replace("-title","");
            var ribController = macrosApp.getController("ribbonController");
            ribController.toggle(ribbonId);
        });



    },
    hideApp: function() {
        //this.ensureRibbonBinding();
        var macrosPanel = Ext.getCmp("macrosPanel");
        if (macrosPanel == null)
        {
            console.log("macrosPanel is undefined");
            return;
        }
        Ext.getCmp("macrosPanel").setVisible(false);
        $("#s4-mainarea").show();
    }

};


// vim: sw=2:ts=2:nu:nospell:fdc=2:expandtab
/**
 * @class Ext.ux.SimpleIFrame
 * @extends Ext.Panel
 *
 * A simple ExtJS 4 (and v4.1) implementaton of an iframe providing basic functionality.
 * For example:
 *
 * var panel=Ext.create('Ext.ux.SimpleIFrame', {
 *   border: false,
 *   src: 'http://localhost'
 * });
 * panel.setSrc('http://www.sencha.com');
 * panel.reset();
 * panel.reload();
 * panel.getSrc();
 * panel.update('<div><b>Some Content....</b></div>');
 * panel.destroy();
 *
 * @author    Conor Armstrong
 * @copyright (c) 2012 Conor Armstrong
 * @date      08 June 2012
 * @version   0.3
 *
 * @license Ext.ux.SimpleIFrame.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. Commercial use is permitted to the extent that the
 * code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * <p>License details: <a href="http://www.gnu.org/licenses/lgpl.html"
 * target="_blank">http://www.gnu.org/licenses/lgpl.html</a></p>
 *
 */

Ext.require([
    'Ext.panel.*'
]);

Ext.define('Ext.ux.SimpleIFrame', {
    extend: 'Ext.Panel',
    alias: 'widget.simpleiframe',
    src: 'about:blank',
    loadingText: 'Loading ...',
    initComponent: function(){
        this.updateHTML();
        this.callParent(arguments);

    },
    afterLayout:function() {
        //alert("afterRender");

        //var iframe = this.getDocument();
        ///debugger;
        $("#iframe-"+this.id).load(function() {
          //alert("the iframe is being loaded..");
          this.onFrameContentChange();
        });


    },
    updateHTML: function() {
        this.html='<iframe id="iframe-'+this.id+'"'+
            ' style="overflow:auto;width:100%;height:100%;"'+
            ' frameborder="0" '+
            ' src="'+this.src+'"'+
            '></iframe>';
    },
    onFrameContentChange:function() {

        alert("onFrameContentChange");
    },
    reload: function() {
        this.setSrc(this.src);


    },
    reset: function() {
        var iframe=this.getDOM();
        var iframeParent=iframe.parentNode;
        if (iframe && iframeParent) {
            iframe.src='about:blank';
            iframe.parentNode.removeChild(iframe);
        }

        iframe=document.createElement('iframe');
        iframe.frameBorder=0;
        iframe.src=this.src;
        iframe.id='iframe-'+this.id;
        iframe.style.overflow='auto';
        iframe.style.width='100%';
        iframe.style.height='100%';
        iframeParent.appendChild(iframe);

    },
    setSrc: function(src, loadingText) {
        this.src=src;
        var iframe=this.getDOM();
        if (iframe) {
            iframe.src=src;
        }
    },
    getSrc: function() {
        return this.src;
    },
    getDOM: function() {
        return document.getElementById('iframe-'+this.id);
    },
    getDocument: function() {
        var iframe=this.getDOM();
        iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
        return iframe.document;
    },
    destroy: function() {
        var iframe=this.getDOM();
        if (iframe && iframe.parentNode) {
            iframe.src='about:blank';
            iframe.parentNode.removeChild(iframe);
        }
        this.callParent(arguments);
    },

    //call this to manually change content.
    //don't call until component is rendered!!!
    update: function(content) {
        this.setSrc('about:blank');
        try {
            var doc=this.getDocument();
            doc.open();
            doc.write(content);
            doc.close();
        } catch(err) {
            // reset if any permission issues
            this.reset();
            var doc=this.getDocument();
            doc.open();
            doc.write(content);
            doc.close();
        }
    }
});Ext.define('Macros.view.file.attributes' ,{
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
});Ext.define('Macros.view.file.editattributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileeditattributes',
    title : 'Edit File Attributes',
    closable:true,
    fileid:'',


    initComponent: function() {

        var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=editfileattr&id='+ this.fileid;
        //this.src = url;
        this.src = macrosExeServerUrl + "eb.exe?cfgs=../cfgs/docops.cfg&p=form&MaskName=freattr&fileid={0}&adddata=&docclass=1&attrclass=3";
        this.src = this.src.replace("{0}", this.fileid);

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',
    closable:true,

    initComponent: function() {

        this.columns = [
            {header: 'Titel',  dataIndex: 'title',  flex: 1},
            {header: 'Geändert am', dataIndex: 'lastmodifiedat', flex: 1},
            {header: 'Erstellt am am', dataIndex: 'createdat', flex: 1},
            {header: 'Autor', dataIndex: 'author', flex: 1},
            {header: 'fileid', dataIndex: 'fileid', flex: 1}
        ];
        this.callParent(arguments);
    }
});Ext.define('Macros.view.folder.tree' ,{
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
});Ext.define('Macros.view.folder.tree' ,{
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
});Ext.define('Macros.view.main.tabPanel' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.tabs'


});Ext.define('Macros.view.ribbon.fileRibbon', {
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




});Ext.define('Macros.view.ribbon.folderRibbon', {
    extend: 'Ext.Container',
    layout:'hbox',
    objectData: null,
    initComponent: function(config)
    {
        Ext.apply(this, {
        items:[
            {
                xtype:'ribbonAction',
                text: "Anzeigen",
                handler: function() {
                    alert("click");
                }
            },
            {
                xtype:'ribbonAction',
                text: "Suchen",
                handler: null
            },
            {
                xtype:'ribbonAction',
                text: "Unterordner anlegen",
                handler: null
            }]

    });
        this.callParent(config);
    }

});Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    ribbonGroup: null,
    handler: null,

    setText:function(text){
        if (isInSharePoint){
            $("[title='"+this.name+"'] .ms-cui-ctl-largelabel").html(text);
        }
        else{
            var btn = this.items.items[0];
            btn.setText(text);
        }

    },
    setVisible:function(visible){
        if (isInSharePoint){
            if (visible)
                $("[title='"+this.name+"']").show();
            else
                $("[title='"+this.name+"']").hide();
        }
        else{
            var btn = this.items.items[0];
            btn.setVisible(visible);
        }

    },
    handler: function(){
        var btn = this.items.items[0];
        return btn.handler
    },

    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler,
                        ribbonGroup:this.ribbonGroup
                        })
                    ]
            }
        );
        this.callParent(arguments);
    }});Ext.define('Macros.view.ribbon.ribbonGroup', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonGroup',
    layout:'hbox',
    objectData: null,
    initComponent: function () {

        this.callParent(arguments);
    }});Ext.define('Macros.view.user.edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    title : 'Edit User',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});Ext.define('Macros.view.user.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    title : 'All Users',
    store: 'users',
    model: 'user',

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];



        this.callParent(arguments);
    }
});Ext.define('Macros.model.documentMenuModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'doctemplate', type: 'string' , mapping:'doctemplate@text'},
        { name: 'doctemplate_url', type: 'string' , mapping:'doctemplate'},
        { name: 'projectdata', type: 'string' , mapping:'projectdata@text'},
        { name: 'projectdata_url', type: 'string' , mapping:'projectdata'},
        { name: 'display', type: 'string' , mapping:'display@text'},
        { name: 'display_url', type: 'string' , mapping:'display'},
        { name: 'displayarchived', type: 'string' , mapping:'displayarchived@text'},
        { name: 'displayarchived_url', type: 'string' , mapping:'displayarchived'},
        { name: 'checkout', type: 'string' , mapping:'checkout@text'},
        { name: 'checkout_url', type: 'string' , mapping:'checkout'},
        { name: 'checkoutback', type: 'string' , mapping:'checkoutback@text'},
        { name: 'checkoutback_url', type: 'string' , mapping:'checkoutback'},
        { name: 'docedit', type: 'string' , mapping:'docedit@text'},
        { name: 'docedit_url', type: 'string' , mapping:'docedit'},
        { name: 'checkin', type: 'string' , mapping:'checkin@text'},
        { name: 'checkin_url', type: 'string' , mapping:'checkin'},
        { name: 'reattr', type: 'string' , mapping:'reattr@text'},
        { name: 'reattr_url', type: 'string' , mapping:'reattr'},
        { name: 'move', type: 'string' , mapping:'move@text'},
        { name: 'move_url', type: 'string' , mapping:'move'},
        { name: 'delete', type: 'string' , mapping:'delete@text'},
        { name: 'delete_url', type: 'string' , mapping:'delete'}

    ]
});
Ext.define('Macros.model.fileModel', {
    extend: 'Ext.data.Model',
    fields: ['title', 'author', 'fileid', 'createdat','lastmodifiedat' ]

});

/*
<results>

  <record>
    <title>Eine Referenz in in Test</title>
    <pcomment></pcomment>
    <lastmodifiedat>28.03.2012 08:12</lastmodifiedat>
    <createdat>28.03.2012 08:12</createdat>
    <author>Ehring, Thomas</author>
    <infotype>Standard</infotype>
    <keywords></keywords>
    <filename></filename>
    <businessarea></businessarea>
    <treecode></treecode>
    <version_maj>0.1</version_maj>
    <fileid>f0fef700c-789d-11e1-86e6-f0c99bbca093</fileid>
    <objectdescription></objectdescription>
    <documentnr></documentnr>
    <remarks></remarks>
    <pstatus>im Probeeinsatz</pstatus>
    <docclass>Versionsdokument</docclass>
    <attrclass>Objektverwaltung</attrclass>
    <createdby>Grombach, Karsten</createdby>
    <createdbyproxy></createdbyproxy>
    <lastmodifiedby>Grombach, Karsten</lastmodifiedby>
    <lastmodifiedbyproxy></lastmodifiedbyproxy>
    <checkedoutby></checkedoutby>
    <checkedoutbyproxy></checkedoutbyproxy>
    <archivedat></archivedat>
    <archivedby></archivedby>
    <validdate>07.04.2012</validdate>
    <validmode></validmode>
    <numberfield1></numberfield1>
    <numberfield2></numberfield2>
    <numberfield3>Objektverwaltung</numberfield3>
    <eurofield1></eurofield1>
    <businesspartner></businesspartner>
    <textfield1></textfield1>
    <textfield2></textfield2>
    <textfield3></textfield3>
    <memofield1></memofield1>
    <multifield1></multifield1>
    <date1></date1>
    <date2></date2>
    <date3></date3>
    <checkbox1></checkbox1>
    <checkbox2></checkbox2>
    <createdat2></createdat2>
    <releasedat></releasedat>
    <releasedby></releasedby>
    <releasedbyproxy></releasedbyproxy>
    <movedat></movedat>
    <movedby></movedby>
    <movedbyproxy></movedbyproxy>
  </record>
</results>
*/Ext.define('Macros.model.foldertreeModel', {
   // alias : 'widget.foldertreeModel',
    //extend: 'Ext.data.NodeInterface',
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'text', type: 'string', mapping:'path'},
        { name: 'leaf', type: 'boolean', mapping: 'Leaf' },
        { name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false },
        { name: 'Properties'},
        { name: 'expanded', defaultValue: false }
    ]
});Ext.define('Macros.model.user', {
    extend: 'Ext.data.Model',
    fields: ['name', 'email']

});Ext.define('Macros.store.documentMenuStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.documentMenuModel',
    autoLoad:true,
    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=documentmenu',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
    entityid: "0",

    loadById: function(entitiyid){
        this.entityid=entitiyid;
        this.proxy.url = proxyUrl+'?entity=folder&id='+this.entityid;

        this.load();
    },

    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=folder&id=0',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});Ext.define('Macros.store.foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Macros.model.foldertreeModel',
    autoLoad:true,
    defaultRootId: 0,
    expaned:true,
    root: {
        expanded: true,
        text: "Ordner",
        id: 0,
        leaf: false
    },
    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=foldertree',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            root: 'results',
            record: 'record',
            idProperty: 'id'
        }
    })
});


Ext.define('Macros.store.__foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    //model:'Macros.model.foldertreeModel',
    root: {
        expanded: true,
        children: [
            { text: "Ordner",
                leaf: false,
                expanded: true,
                children:[
                    { text: "Test", leaf: false,
                        expanded: true,
                        id:"8",
                        children:[
                            { text: "Test2",
                                leaf: true,
                                id:"10"
                            },
                            { text: "Test3",
                                leaf: true,
                                id:"11"
                            },
                            { text: "Test4",
                                leaf: true,
                                id:"13"
                            },
                            { text: "Test5",
                                leaf: true,
                                id:"14"
                            }
                        ]},
                    { text: "Kaufprojekt", leaf: false}
                ]},
            { text: "Fonds",
                expanded: true,
                id:"7"
            },
            { text: "News", leaf: true },
            { text: "Vorlagen", leaf: true }
        ]
    }
});Ext.define('Macros.store.users', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.user',
    data: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ]
});
Ext.define('Macros.controller.fileController', {
    extend: 'Ext.app.Controller',

    views: [
        'file.list'
    ],
    stores: [
        'filesStore'
    ],
    models: [
        'fileModel'
    ],
    currentFile: null,
    init: function() {
        this.control({
            'filelist': {
                itemdblclick: this.editFile,
                itemclick: function(grid, record){
                    this.currentFile = record;
                    var ribbon = this.application.getController('ribbonController');
                    ribbon.toggle('Ribbon.MacrosFile');
                }
            }
        });
    },
    editFile: function(grid, record) {
        alert("file click");
        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    },

    openFile: function(fileId){
        var fileid = this.currentFile.data.fileid;
        //var url = macrosExeServerUrl + "miidoccgi.exe?getfile&dokid="+fileId+"&arbeitsmittel=1";
        var url = macrosExeServerUrl + "ebcheckout.exe?getserverfile&fileid="+fileId+"&readonly=1"
        window.open(url,'Download');
    },
    getFolderFiles:function(folderId, title){

        var idKey= 'dmsfolder'+folderId;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",idKey);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('filelist',{key:idKey, title:title});
            tabPanel.add(view);
        }
        tabPanel.setActiveTab(view);
        view.store.loadById(folderId);
        tabPanel.setActiveTab(view);
        tabPanel.doLayout();

        var ribbon = this.application.getController('ribbonController');
        ribbon.toggle('Ribbon.MacrosFolder');
        this.init();
    },
    openFileAttributes:function() {

        var title = this.currentFile.get('title');
        var id = title;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",id);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('fileattributes',{title:title, fileid: this.currentFile.data.fileid});

            tabPanel.add(view);
        }

        tabPanel.setActiveTab(view);
        tabPanel.doLayout();
    },
    editFileAttributes : function() {
        var title = this.currentFile.get('title');
        var id = title;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",id);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('fileeditattributes',{title:title, fileid: this.currentFile.data.fileid});

            tabPanel.add(view);
        }

        tabPanel.setActiveTab(view);
        tabPanel.doLayout();

    }


});

Ext.define('Macros.controller.folderController', {
    extend: 'Ext.app.Controller',

    views: [
        'folder.tree'
    ],
    stores: [
        'foldertreeStore'
    ],
    models: [
        'foldertreeModel'
    ],
    init: function() {

        this.control({
            'foldertree':
            {
                itemclick: this.getFolderFiles
            }
        });
    },
    getFolderFiles: function(grid, record) {


        var fc = this.application.getController('fileController');
        fc.getFolderFiles(record.data.id, record.data.text);

    }
});

Ext.define('Macros.controller.ribbonController', {
    extend: 'Ext.app.Controller',
    getRibbonGroup:function(ribbonGroupName){
        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
               return ribbon;
            }
        }
        return null;
    },
    toggle:function(ribbonGroupName, objectData){



        console.log("toggle ribbon " + ribbonGroupName);

        $("[id='Ribbon.MacrosFolder-title']").hide();
        $("[id='Ribbon.MacrosFile-title']").hide();


        if (ribbonGroupName.indexOf("Ribbon.Macros")< 0){
            console.log("toggling sharepoint ootb ribbon");
            SelectRibbonTab(ribbonGroupName, false);

            this.ensureRibbonBinding();

            //SpRibbonBinding.hideApp();
            Ext.getCmp("macrosPanel").setVisible(false);
            $("#s4-mainarea").show();
            return;
        }


        Ext.getCmp("macrosPanel").setVisible(true);
        //$("#macrosarea").show();
        $("#s4-mainarea").hide();




        if (isInSharePoint){

            //SpRibbonBinding.toggle(ribbonGroupName);
            //return;
        }

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.spRibbonName==ribbonGroupName){

                if (isInSharePoint){
                    SelectRibbonTab(ribbon.spRibbonName, true);
                }
                else {
                    ribbon.show();
                }

                if (objectData != null)
                    ribbon.objectData = objectData;

                if(ribbonGroupName == "Ribbon.MacrosFile"){
                    var fc = this.application.getController('fileController');
                    if (fc.currentFile != null)
                        ribbon.loadFileRibbonMenu(fc.currentFile.data.fileid);
                }

            }
            else
                ribbon.hide();
            console.log("searching: "+ribbon.spRibbonName+"->bound events "+  $('.ms-cui-tts li').data('events'));
        }
        setTimeout(this.ensureRibbonBinding,1000);

        $("[id='Ribbon.MacrosFolder-title']").hide();
        $("[id='Ribbon.MacrosFile-title']").hide();
        $("[id='"+ribbonGroupName+"-title']").show();

    },
    refs :[{
        selector: '#macrosPanel',
        ref: 'MacrosArea'}
    ],

    ribbons:[],

    ensureRibbonBinding:function() {
        console.log("ensuring ribbon bindings. Ribbons: "+ $('.ms-cui-tts li').length);
        //SpRibbonBinding.ensureRibbonBinding();
        //$('.ms-cui-tts li').unbind("click.macrosRibbon");
        // only bind the click event to non macros ribbon groups
        //$('.ms-cui-tts li:not([id^="Ribbon.Ma"])').bind("click.macrosRibbon",function(a,b,c){
        $('.ms-cui-tts li').unbind("click.macrosRibbon");
        $('.ms-cui-tts li').bind("click.macrosRibbon",Ext.bind(function(event){
            var ribbonId = event.currentTarget.id.replace("-title","");
            var ribController = macrosApp.getController("ribbonController");
            ribController.toggle(ribbonId);
        },this));

        console.log("->bound events "+  $('.ms-cui-tts li').data('events'));

    },


    clickSearch : function(){
        //debugger;
        //this.init();
        Ext.getCmp("macrosPanel").setVisible(true);
        $("#s4-mainarea").hide();
        Ext.getCmp("macrosPanel").doLayout();
    },

    init: function() {
        var renderToDiv = 'ribbon'
        if (isInSharePoint)
        {
            // dont render it in sharepoint
            renderToDiv = null;
        }

        var startRibbon = Ext.widget('ribbonGroup',{renderTo:renderToDiv,
            id:'start',
            spRibbonName : "Ribbon.MacrosMain",
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    name: 'search',
                    handler: this.clickSearch,
                    spRibbonName : "Ribbon.MacrosMain"

                }
            ]
        });

        this.ribbons.push(startRibbon);
        var folderRibbon = Ext.create('Macros.view.ribbon.folderRibbon',
                {   id:'folder',
                    renderTo:renderToDiv,
                    spRibbonName : "Ribbon.MacrosFolder"
                }
        );
        this.ribbons.push(folderRibbon);

        var docRibbon = Ext.create('Macros.view.ribbon.fileRibbon',
            {   id:'file',
                renderTo:renderToDiv,
                spRibbonName : "Ribbon.MacrosFile"
            }
        );
        this.ribbons.push(docRibbon);

        this.ensureRibbonBinding();


        //this.toggle('Ribbon.MacrosMain');


    }
});


Ext.define('Macros.controller.userController', {
    extend: 'Ext.app.Controller',

    views: [
        'user.list',
        'user.edit'
    ],
    stores: [
        'users'

    ],
    models: [
        'user'
    ],
    init: function() {
        this.control({
            'userlist': {
                itemdblclick: this.editUser
            }
        });
    },
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');

        view.down('form').loadRecord(record);
    }
});
