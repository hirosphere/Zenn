import { ef, each, root, log } from "../../meh/index.js";
// import * as data from "./data/items.js";
import * as m from "./modes.js";

export const App = ( model : m.App ) =>
{
	return ef.main
	(
		ef.h1( "Poke Search V-1.1" ),
		InputBox(),
		Items( model ),
	);
}

const InputBox = () =>
{
	return ef.div
	(
		{
			class: "searchbox wrapper"
		},
		ef.input
		(
			{ class: "input" },
		),
	);
};

const Items = ( app : m.App ) =>
{
	return ef.div
	(
		{ class: "pokemonList" },
		... Array.from( app.items, ( model ) => Item( model ) ),
	);
};

const Item = ( model : m.Item ) =>
{
	return ef.div
	(
		{ class: "item" },

		ef.div( { class: "id" }, model.id ),
		ef.div
		(
			ef.span
			(
				model.一致前,
				ef.mark( model.一致 ),
				model.一致後,
			),
		),
		ef.div( model.ja ),
	)
};
