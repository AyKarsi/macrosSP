type views\*.js > macros.views.js
type models\*.js > macros.models.js

type macros.models.js,macros.views.js,init.js,hacks.js > macros.all.js


type macros\controller\*.js > macros\build\macros.controller.js
type macros\view\user\*.js,macros\view\folder\*.js,macros\view\file\*.js > macros\build\macros.views.js
type macros\model\*.js > macros\build\macros.model.js
type macros\store\*.js > macros\build\macros.store.js

type macros\app.js,macros\build\macros.views.js,macros\build\macros.model.js,macros\build\macros.store.js,macros\build\macros.controller.js > macros\macros.app.js

