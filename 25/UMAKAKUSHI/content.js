
function work ( el )
{
	if ( el ?. getAttribute ?. ( "data-testid" ) != "cellInnerDiv" )  return ;
	if ( ! el.textContent?.match ( /高市|早苗|河野|党|自民|エプスタイン|内閣/ ) )  return ;

	const al = el.getElementsByTagName ( "article" )?.[ 0 ]?.querySelectorAll ( "[aria-labelledby]" ) ;
	al && al [ 0 ] && quote ( al [ 0 ] ) ;
}

function quote ( el )
{
	let state ;
	const update = () => el.style.opacity = state ? "100%" : "0%" ;
	update () ;

	const bu = document.createElement ( "button" ) ;
	bu.textContent = "***" ;
	el.parentElement?.insertBefore ( bu , el )
	bu.onclick = () => { state = ! state ; update () ; } ;
}

// 動的変更を監視（新要素追加時にも適用）
const observer = new MutationObserver
(
	mutations => {
		mutations.forEach (
			mutation => {
				mutation.addedNodes.forEach ( node => work ( node ) )
			}
		);		
	}
);
	
// body全体を監視
observer.observe ( document.body, { childList: true, subtree: true } );

