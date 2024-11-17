import { leaf } from "./leaf.js" ;

type Branch < s > =
{
	[ prop in keyof s ] : leaf < s [ prop ] > ;
} &
{
	update() : void ;
	get stat () : s ;
}

const new_branch =
<
	V extends object ,
>
(
	v : V ,
	templ : V

) : Branch < V > =>
{
	const methods =
	{
		update(){},

		get value() : V
		{
			return to_value ( br , templ ) ;
		},
	};
	

	const leafs = Object.entries( templ ).map
	(
		( [ prop  ] ) =>
		[
			prop ,
			leaf
			(
				( v as any ) [ prop ] ?? ( templ as any ) [ prop ] ,
				methods ,
			)
		]
	) ;

	const br : Branch < V > =
	{
		... methods ,
		... Object.fromEntries ( leafs )
	};
	
	return br ;
}

const to_value = < V extends {} >
(
	br : Branch < V > ,
	templ : V

) : V =>
{
	const es = Object.entries ( templ ).map
	(
		( [ prop ] ) => [ prop , ( br as any ) [ prop ] .value ]
	) ;

	return Object.fromEntries ( es );
}










/* */

const hsl_tmpl =
{
	hue : 0 ,
	css : "" ,
}
type hsl = typeof hsl_tmpl ;
type HSL = Branch < hsl > ;
const HSL = ( v : hsl ) : Branch < hsl > =>
{
	return new_branch ( v , hsl_tmpl );
}


const c = HSL ( { hue : 5 , css : "" } ) ;

c.stat.hue == 5 ;

c.hue.value = 5 ;
