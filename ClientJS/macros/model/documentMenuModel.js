Ext.define('Macros.model.documentMenuModel', {
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
