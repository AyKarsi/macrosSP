var proxyUrl  = "http://localhost:88/Proxy/Default.aspx";
var isInSharePoint = false;

Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Macros', '/macros');
Ext.require('Macros.view.ribbon.ribbonGroup');
Ext.require('Macros.view.ribbon.ribbonAction');
Ext.require('Macros.view.file.attributes');
Ext.require('Macros.view.file.editattributes');
Ext.require('Macros.view.main.tabPanel');