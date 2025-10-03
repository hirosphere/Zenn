
/* */

type Attrs < E > =
{
	[
		prop in keyof E  as
			E [ prop ] extends	number | string | boolean ?
				prop : never
	
	] : E [ prop ]
} ;

( e : Attrs < HTMLInputElement > ) =>
{
	e.CDATA_SECTION_NODE ;
	e.innerText = "xxxxx" ;
}

( e : Omit < Readonly < HTMLElement > , "readonly" > ) =>
{
}

