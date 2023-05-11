

import { useEffect, useState, useReducer } from 'react'
import Card from './components/Card'
import ModeSwitcher from './components/ModeSwitcher'
import Pagination from './components/Pagination'
import SearchBar from './components/SearchBar'

function dataReducer(prev, action) {
	let val = action.value
	let type = action.type

	switch (type) {
		case 'SET_DATA':
			return ({
				...prev,
				data: val,
				cards: val,
				shownCards: val.slice(0,15),
				pages: Math.ceil(val.length / 16),
			})
		case 'UPD_PAGE':
			return ({
				...prev,
				shownCards: prev.cards.slice((val-1)*15,val*15),
			})
		case 'FIL_DATA':
			let filData = prev.data.filter(item=>
					item.name.includes(val))
			let nCards = Math.ceil(filData.length / 16)
			return ({
				...prev,
				cards: filData,
				shownCards: filData.slice(0,15),
				pages: nCards?nCards:1,
				isSearch: Boolean(val)
			})
	}
}


export default function App() {

	const [ set, dispatch ] = useReducer(dataReducer, {
		data: [],
		cards: [],
		shownCards: [],
		pages: 0,
		isSearch: false
	})
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(()=>{
		setIsLoading(true)
		fetch('https://akabab.github.io/starwars-api/api/all.json')
			.then(res=>res.json())
			.then(obj=>{
				setIsLoading(false)
				dispatch({type:'SET_DATA', value: obj})
			})
	}, [])

	function updPage(pg) {
		dispatch({type: 'UPD_PAGE', value: pg})
	}

	function filterItems(value) {
		dispatch({type: 'FIL_DATA', value})
	}

	return (
		<div className='app'>
			<div 
				className='switcher-container'>
				<ModeSwitcher />
			</div>
			<div className='app-searchbar'>
				<SearchBar 
					callback={filterItems} /> 
				{isLoading && 
					<div className='app-searchbar_loader'>
					</div>
				}
				{set.isSearch && 				
					<div className='app-searchbar_matches'>
						{`${set.shownCards.length} 
						matches found...`}
					</div>
				}
			</div>
			<div className='app-pagination'>
				<Pagination 
					nPages={set.pages} 
					nItems={7} 
					callback={updPage} />
			</div>
			<div className='starw-div'>
				{set.shownCards.map(item=>
					<Card 
						key={item.id}
						id={item.id}
						name={item.name}
						specie={item.species}
						origin={item.homeworld}
						gender={item.gender}
						image={item.image} />)}
			</div>
		</div>
	)
}