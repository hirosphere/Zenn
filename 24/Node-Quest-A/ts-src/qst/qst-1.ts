import Express from "express";

const HTTPServer = ( i : { port : number } ) =>
{
	const app : Express.Express = Express();

	app.get( "*", ( req, res ) => res.send( "なにもsend" ) );

	app.listen( i.port, () => console.log( `${ i.port }番でHTTPサーバーを開始。` ) );
}


/**  **/

process.stdin.setEncoding( "utf-8" );

const ondata = ( data : string ) =>
{
	if( data.match( /^q/ ) )
	{
		console.log( "潔く終了。" );
		process.exit();
	}
};

process.stdin.on( "data", ondata );

HTTPServer( { port: 31111 } );
