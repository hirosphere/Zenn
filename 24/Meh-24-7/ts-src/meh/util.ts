
namespace df
{
	const tbl : { [ key : string ] : ( date : Date ) => string } =
	{
		YYYY: date => String( date.getFullYear() ),
		MM: date => String( date.getMonth() + 1 ).padStart( 2, "00 " ),
		DD: date => String( date.getDate() ).padStart( 2, "00 " ),

		hh: date => String( date.getHours() ).padStart( 2, "00" ),
		mm: date => String( date.getMinutes() ).padStart( 2, "00" ),
		ss: date => String( date.getSeconds() ).padStart( 2, "00" ),
	};

	export const main = ( format : string, date : Date = new Date() ) : string =>
	{
		// return date.toLocaleDateString( "ja-JP" );
		return format.replace
		(
			/\{([A-Za-z]+)\}/g,
			
			( all, name ) =>
			{
				console.log( name );
				return tbl[ name ]?.( date ) ?? "..";
			}
		)
	};
}

export const util =
{
	dateformat : df.main,
};
