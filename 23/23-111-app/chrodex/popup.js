// import { name, log } from "./common.js";
// log( name );


const ge = ( id ) => document.getElementById( id );

{
	const logout = ge( "log" );
	const b1 = ge( "getgroups" );

	const act1 = async () =>
	{
		//logout.value = chrome.tabs.create( { url: "http://localhost/Labo/22/f5-x/book/?page=" } );

		const groups = await chrome.tabGroups.query( {} );
	
		logout.value = groups.map( g => `${ g.id } ${ g.title } ${ g.color } ${ g.collapsed } ${ g.constructor.name }` ).join( "\n" );

	};

	act1();

	b1.onclick = act1;
}

{
	const logout = ge( "log" );
	const bu = ge( "newtab" );
	const newtab = () =>
	{
		const tab1 = chrome.tabs.create( {} );
		const tab2 = chrome.tabs.create( {} );
		logout.value = "New Tab " + tab1.id;

		// chrome.tabs.group( { groupId: chrome.tabs.TAB_GROUP_ID_NONE, tabIds: [ tab.id ] } );
		chrome.tabs.group( { tabIds: [ tab1.id, tab2.id ] } );
	};	

	bu.onclick = newtab;
}


