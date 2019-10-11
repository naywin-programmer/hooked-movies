import React, {useState} from 'react'
import {
	InputGroup, Input,
	InputGroupAddon, InputGroupText
} from 'reactstrap'
import Octicon, {getIconByName} from '@primer/octicons-react'


export default function SearchBar(props) {
	let [input, setInput] = useState("")

	let handleInput = (e) => {
		setInput(e.target.value)
		props.search(e.target.value)
	}

	let clearInput = () => {setInput("")}

	let handleClick = (e) => {
		e.preventDefault()
		props.clickSearch()
		clearInput()
	}

	return (
		<InputGroup>
			<Input onChange={handleInput} value={input} placeholder="Search..." autoFocus={true} />
			<InputGroupAddon addonType="append">
				<InputGroupText onClick={handleClick}>
					<Octicon icon={getIconByName('search')} />
				</InputGroupText>
			</InputGroupAddon>
		</InputGroup>
	)
}