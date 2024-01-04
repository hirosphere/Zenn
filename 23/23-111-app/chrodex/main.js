
console.log( "拡張始動！！", new Date().toLocaleString() );

const tablist = async () =>
{
	console.log( "タブのリスト" );
	console.log( new Date().toLocaleString() );

	const tabs = await chrome.tabs.query( {} );
	tabs.forEach( tab => {
		console.log( tab.id, tab.active );
		console.log( tab.title );
		console.log( tab.url );
		console.log( "---" );
	});
};


const tabgrouplist = async () =>
{
	console.log( "タブグループのリスト" );
	console.log( new Date().toLocaleString() );

	const l = gr =>
	{
		console.log( gr.id );
		console.log( gr.title, gr.color );
	};

	chrome.tabGroups.query( {}, list => list.forEach( l ) );
};

chrome.action.onClicked.addListener( tabgrouplist );

