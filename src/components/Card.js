
import { useEffect, useState } from 'react'
import './Card.css'

export default function Card({id, name, specie, origin, gender, image}) {

	const [ img, setImg ] = useState('')

	useEffect(()=>{

		if (!image) return

		fetch(image)
			.then(res=>res.blob())
			.then(blb=>{
				let url = URL.createObjectURL(blb)
				setImg(url)
			})

	}, [])


	return (
		<div className='card'>
			<span className='card-number'>#{id}</span>
			{img ? 
				<img className='card-img' src={img} />
				:
				<div className='card-loader'></div>
			}
			<div className='card-info'>
				<span 
					className='card-info_name'>
					{name}
				</span>
				<span 
					className='card-info_spec'>
					<b>Species:</b> {specie}
				</span>
				<span 
					className='card-info_gend'>
					<b>Gender:</b> {gender}
				</span>
				<span 
					className='card-info_home'>
					<b>Homeworld:</b> {origin}
				</span>
			</div>
		</div>
	)

}