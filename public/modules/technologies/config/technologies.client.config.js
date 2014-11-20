'use strict';

// Configuring the Articles module
angular.module('technologies').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Technologies', 'technologies', 'dropdown', '/technologies(/create)?');
		Menus.addSubMenuItem('topbar', 'technologies', 'List Technologies', 'technologies');
		Menus.addSubMenuItem('topbar', 'technologies', 'New Technology', 'technologies/create');
	}
]);