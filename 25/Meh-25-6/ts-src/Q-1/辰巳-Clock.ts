import { leaf , DOM , log } from "../Meh/Meh.js" ;



const anm = [ "🐭", "🐄" ,"🐯" , "🐇", "🐉", "🐍", "🐎", "🐏", "🐒", "🐓", "🐶", "🐗" ] ;
const to_anm = ( s : string ) : string =>
(
	s.replace ( /\d/g , m => anm [ + m ] ?? m )
);

const 辰巳 = () : string =>
{
	const daytick = 24 * 3600 * 1000 ;
	const shift = 9 * 3600 * 1000 ;
	const dayphase = ( ( new Date().getTime() + shift ) % daytick ) / daytick , m = 12 ;
	
	return [
		
		r12 ( dayphase , 1 ) ,
		r12 ( dayphase , 2 ) ,
		r12 ( dayphase , 3 ) ,
		r12 ( dayphase , 4 ) ,
	
	] .join ( ":" ) ;	
}

const r12 = ( dayphase : number , scale : number ) : string =>
{
	const ch = Math.round ( dayphase * 12 ** scale ) % 12 ;
	return anm [ ch >= 12 ? 0 : ch ] ;
}

const time = leaf ( "" ) ;
const anmtime = time.$_conv ( time => to_anm ( time ) ) ;
const shintime = leaf ( "" ) ;

const step = () =>
{
	time.$ = new Date() .toLocaleTimeString () ;
	shintime.$ = 辰巳 () ;

	requestAnimationFrame ( step ) ;
}

requestAnimationFrame ( step ) ;

DOM.add ( [ time , ] , "#Clock" , ) ;
// DOM.add ( anmtime , "#Mehhh" ) ;
DOM.add ( shintime , "#Mehhh" ) ;

