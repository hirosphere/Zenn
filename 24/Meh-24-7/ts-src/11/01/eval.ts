import { Exist, Leaf, ef, root, log, util } from "../../meh/index.js";

export const Eval = ( com : Exist ) =>
{
	const self = new Exist( com );

	// log( util.df1( "{hh}" ) );
	util.df2;

	// const code = "util.df1( '{YYYY}/{MM}/{DD} {hh}:{mm}:{ss}' )";
	const code = "const d = util.df2();\n`${ d.YYYY }/${ d.MM }/${ d.DD } ${ d.B } ${ d.hh }:${ d.mm}:${ d.ss }`";

	const doc =
	{
		code: new Leaf.String( self, code ),
		output: new Leaf.String( self, "Output " ),
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
							catch( err ) { doc.output.value = String( err as object ); }
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
