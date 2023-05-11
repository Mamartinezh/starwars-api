
import { useState } from 'react'
import './ModeSwitcher.css'


export default function ModeSwitcher() {

	const [ isOn, setIsOn ] = useState(false)

	function onOff() {
		setIsOn(!isOn)
		document.documentElement.classList.toggle('light-mode')
	}

	return (

		<div 
			onClick={onOff}
			className={`switcher ${isOn && 'active'}`}>
			<i className="fa-solid fa-moon"></i>
			<i className="fa-sharp fa-solid fa-sun"></i>
		</div>

	)

}