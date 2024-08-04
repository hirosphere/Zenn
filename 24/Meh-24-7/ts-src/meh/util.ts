
namespace df
{
	const tbl : { [ key : string ] : ( date : Date ) => string } =
	{
		YYYY: date => String( date.getFullYear() ),
		MM: date => String( date.getMonth() + 1 ).padStart( 2, "00 " ),
		DD: date => String( date.getDate() ).padStart( 2, "00 " ),
		B: date => bi[ date.getDay() ],

		hh: date => String( date.getHours() ).padStart( 2, "00" ),
		mm: date => String( date.getMinutes() ).padStart( 2, "00" ),
		ss: date => String( date.getSeconds() ).padStart( 2, "00" ),
	};

	const bi = [ "日", "月", "火", "水", "木", "金", "土" ];

	export const df1 = ( format : string, date : Date = new Date() ) : string =>
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
	
	class DF
	{
		constructor( public date : Date = new Date() ) {}

		public get YYYY() : string { return String( this.date.getFullYear() ); }
		public get MM() : string { return String( this.date.getMonth() + 1 ).padStart( 2, "00" ); }
		public get DD() : string { return String( this.date.getDate() ).padStart( 2, "00" ); }
		public get B() : string { return bi[ this.date.getDay() ]; }

		public get hh() : string { return String( this.date.getHours() ).padStart( 2, "00" ) }
		public get mm() : string { return String( this.date.getMinutes() ).padStart( 2, "00" ) }
		public get ss() : string { return String( this.date.getSeconds() ).padStart( 2, "00" ) }
	}

	export const df2 = ( date : Date = new Date() ) : DF => new DF( date );
}

export const util =
{
	... df,
};
