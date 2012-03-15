Ext.define('Ext.macros.SearchResults', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.searchresult',
    height: 300,
    myData: searchResult,

    initComponent: function(){

        var store = this.myData;

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'title',
                text   : 'title',
                //width: 120,
                flex: 1,
                sortable : true,
                dataIndex: 'title'
            },{
                text   : 'version_maj',
                width    : 75,
                sortable : true,
                dataIndex: 'version_maj'
            },{
                text   : '% lastmodifiedat',
                width    : 75,
                sortable : true,
                dataIndex: 'lastmodifiedat'
            }]
        });

        this.callParent(arguments);
    }
});