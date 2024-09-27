
function next( d, pos, prev )
{
	const p = d[ pos ];
	if( p instanceof Array )
	{
		return next( p, pos )
	}
}
