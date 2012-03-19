/**
 * Created by JetBrains WebStorm.
 * User: tropper
 * Date: 08.03.12
 * Time: 10:10
 * To change this template use File | Settings | File Templates.
 */
Ext.Loader.setPath('Ext.app', 'views');

Ext.require([
    'Ext.layout.container.*',
    'Ext.resizer.Splitter',
    'Ext.fx.target.Element',
    'Ext.fx.target.Component',
    'Ext.window.Window',
    'Macros.app.SearchForm'
]);
var mainWin = null;
Ext.onReady(function(){


    $("<div id='macros'></div>").insertBefore("#s4-mainarea");
    //$('#macros').hide();

    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    //var win = new Window(...);
    //win.restoreState();
/*
    mainWin = Ext.create('Macros.app.Window',
        {
            style: {
                border: 0,
                padding: 0
            },
            //maximizable : true,
            height: 800,
            //width: 1000,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'macrosWindow'
            }
          });
  */
   mainWin = Ext.create('Macros.app.Panel',{renderTo:'macros'});


    //mainWin.hide();
    var rib = Ext.create('Macros.app.ribbonGroup',{renderTo:'ribbon'});

    //Ext.create('Macros.app.Panel');
    //Ext.create('Macros.app.SearchForm',{renderTo:'test'});




});

var macros = {};
macros.openSearch = function()
{
    //debugger;
    //mainWin.restore();


    mainWin.show();
    //mainWin.alignTo("s4-mainarea","tl");
    //mainWin.setWidth(Ext.getBody().getViewSize().width);//,Ext.getBody().getViewSize().height);
    //mainWin.setHeight(600);
    //mainWin.setWidth('auto');

    //main.maximize();
};