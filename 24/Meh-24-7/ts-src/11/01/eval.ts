import { Exist, Leaf, ef, root, log } from "../../meh/index.js";

export const Eval = ( com : Exist ) =>
{
	const self = new Exist( com );

	const doc =
	{
		code: new Leaf.String( self, "new Date()" ),
		output: new Leaf.String( self, "Output" ),
		input: new Leaf.String( self, "Input" ),
	};

	return ef.article
	(
		{
			style:
			{
				display: "flex",
				flexFlow: "column",
				width: "50%",
				gap: "1px",
			}
		},

		ef.h2( "Eval" ),

		ef.section
		(
			ef.button
			(
				{
					acts:
					{
						click: ( ev ) =>
						{
							try { doc.output.value = eval( doc.code.value ) }
							catch( err ) { doc.output.value = String( err as Error ); }
							log( ev.clientX )
						},
					}
				},
				"Eval",
			),
		),

		textarea( doc.code ),
		textarea( doc.output ),
		textarea( doc.input ),
	);
};

const textarea = ( value: Leaf.String ) => ef.textarea
(
	{
		style:
		{
			display: "block",
			height: "6em",
			backgroundColor: "hsl( 0, 0%, 20% )",
			color: "hsl( 0, 0%, 90% )",
			fontFamily: "courier",
			fontSize: "0.94rem",
		},
		props:
		{
			value
		},
		acts:
		{
			change( ev )
			{
				if( ev.target instanceof HTMLTextAreaElement )
				{
					value.set( ev.target.value );
				}
			}
		}
	}
);
