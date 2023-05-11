
import { useEffect, useState } from 'react'
import './Pagination.css'

export default function pagination({nPages=0, nItems=7, callback=null}) {

	const [ page, setPage ] = useState(1)
	const [ pages, setPages ] = useState([])

	useEffect(()=>{
		calPages(page)
	}, [nPages, nItems])

	function calPages(nPage) {
		if (nPage < 1 || nPage > nPages) return
		let pgs = []
		if (nPages < nItems	+ 1) {
			pgs = [...Array(nPages + 1).keys()].slice(1) 
		}
		else if (nPage < nItems - 2) {
			pgs = [...Array(nItems - 1).keys()].slice(1)
			pgs = [...pgs, '...', nPages]
		}
		else if (nPage < nPages - (nItems - 3)) {
			let add = nPage-Math.ceil((nItems - 5) / 2)
			pgs = [...Array(nItems-4).keys()]
			pgs = pgs.map(id=>id+add)
			pgs = [1,'...', ...pgs, '...', nPages]
		}
		else {
			pgs = [...Array(nPages).keys()]
			pgs = pgs.slice(nPages - (nItems - 3))
			pgs = [1, '...', ...pgs, nPages]
		}
		setPage(nPage)
		setPages(pgs)
		if (callback && nPage !== page) callback(nPage)
	}

	return (
		<div className='pagination'>
			<i 
			onClick={()=>calPages(page-1)}
			className={`fa-solid fa-chevron-left 
				${page===1 && 'disabled'}`}></i>
			<div className='pagination-pages'>
				{pages.map((pg,id)=>
					<div 
					key={id}
					className={pg === '...' ? 'dots' :  
						`pagination-pages_page 
						${page == pg ? 'active-page' : ''}`}
					onClick={pg !== '...' ? 
						()=>calPages(pg) : null}>
					{pg}
					</div>
				)}
			</div>
			<i 
			onClick={()=>calPages(page+1)}
			className={`fa-solid fa-chevron-right 
				${page===nPages && 'disabled'}`}></i>	
		</div>
	)

}