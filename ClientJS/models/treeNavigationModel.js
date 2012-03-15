/**
 * Created by JetBrains WebStorm.
 * User: tropper
 * Date: 12.03.12
 * Time: 11:58
 * To change this template use File | Settings | File Templates.
 */
var treeNavigationModel = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [
            { text: "Projekte", leaf: false,
                children:[
                    { text: "Bauprojekt", leaf: false,
                        children:[
                            { text: "Grafiken", leaf: true },
                            { text: "Veträge", leaf: true},
                            { text: "Dokumentation", leaf: true},
                            { text: "Beratung", leaf: true}
                        ]},
                    { text: "Kaufprojekt", leaf: false}
                ]},
            { text: "homework", expanded: true, children: [
                { text: "book report", leaf: true },
                { text: "alegrbra", leaf: true}
            ] },
            { text: "buy lottery tickets", leaf: true }
        ]
    }
});