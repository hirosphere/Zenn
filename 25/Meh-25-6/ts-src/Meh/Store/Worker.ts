
const bc = new BroadcastChannel ( "BC" ) ;


const log = console.log ;

log ( "Worker 開始" , new Date ().toLocaleString () ) ;


bc.addEventListener
(
	"message" ,
	ev =>
	{
		log ( "Worker" , ev.data ) ;
	}
) ;

