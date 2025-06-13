import { Leaf , DOM , log } from "../Meh/Meh.js" ;

const time = Leaf ( "" ) ;

setInterval
(
	() : void => { time.$ = new Date() .toLocaleTimeString () },
	1000
) ;


const anm = [ "🐭", "🐄" ,"🐯" , "🐇", "🐉", "🐍", "🐎", "🐏", "🐵", "🐓", "🐶", "🐗" ] ;
const to_anm = ( s : string ) : string =>
(
	s.replace ( /\d/g , m => anm [ + m ] ?? m )
);

const anmtime = time.cvr ( time => to_anm ( time ) ) ;

DOM.add ( time , "#Mehhh" ) ;
DOM.add ( anmtime , "#Mehhh" ) ;

