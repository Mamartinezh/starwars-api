

import { useState, useRef } from 'react'
import './SearchBar.css'

export default function SearchBar({callback=null}) {

	const [ value, setValue ] = useState('')
	const tid = useRef(null)

	function handleChange(e) {
		let value = e.target.value
		setValue(value)
		if (tid.current) clearTimeout(tid.current)
		tid.current = setTimeout(()=>{
			tid.current = null
			callback(value)
		}, 1500)
	}

	return (
		<div className='search-div'>
			<input 
				className='search-bar'
				placeholder='Search by name...'
				value={value}
				onChange={handleChange} />
			<i className="fa-solid fa-magnifying-glass"></i>
		</div>
	)

}