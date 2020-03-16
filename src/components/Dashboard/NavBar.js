import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import {
	Flex,
	Button,
	Avatar,
	Input,
	InputGroup,
	InputRightElement,
	Icon,
	RadioButtonGroup
} from '@chakra-ui/core';

export default function NavBar({
	history,
	isLoading,
	setSearchResults,
	filters,
	setFilters
}) {
	// use to navigate to review form
	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
		ReactGA.event({
			category: 'Review',
			action: `Add new review`
		});
	};

	const handleInputChange = event => {
		event.preventDefault();
		setSearchResults(event.target.value);
	};

	// temporary object until setup in db
	const tracks = [
		{ id: 1, prefix: 'WEB' },
		{ id: 2, prefix: 'UX' },
		{ id: 3, prefix: 'DS' },
		{ id: 4, prefix: 'IOS' },
		{ id: 5, prefix: 'AND' }
	];

	const [selectedTracks, setSelectedTracks] = useState(tracks);

	useEffect(() => {
		const newArray = tracks.map(track => ({ ...track, selected: false }));
		setSelectedTracks(newArray);
	}, []);

	const handleFilter = e => {
		filters === e.id ? setFilters() : setFilters(e.id);
		e.selected = !e.selected;
	};

	console.log('filters', filters);

	return (
		<Flex
			maxW='1440px'
			w='100%'
			px='40px'
			background='#FFFFFF'
			top='0'
			position='fixed'
			overflow='hidden'
			zIndex='999'
			direction='column'
		>
			<Flex align='center' justify='space-between' pt='2%'>
				<Flex align='center'>
					<Avatar mr='12%' size='xl' src='https://bit.ly/broken-link' />
					<h1> Allay </h1>
				</Flex>
			</Flex>
			<Flex align='center' justify='space-between' pt='2%'>
				<InputGroup w='40%'>
					<InputRightElement
						children={<Icon name='search-2' color='#344CD0' />}
					/>
					<Input
						width='100%'
						placeholder='Search'
						type='text'
						rounded='20px'
						borderColor='rgba(149, 149, 149, 0.2)'
						borderWidth='1px'
						onChange={handleInputChange}
					/>
				</InputGroup>
				<RadioButtonGroup onChange={handleFilter} isInline>
					{selectedTracks.map(track => (
						<Button
							variantColor={track.selected ? 'blue' : 'gray'}
							value={track}
						>
							{track.prefix}
						</Button>
					))}
				</RadioButtonGroup>
				<Button
					background='#344CD0'
					color='#FFFFFF'
					rounded='6px'
					border='none'
					size='lg'
					isLoading={isLoading}
					onClick={navToReviewForm}
				>
					Add Review
				</Button>
			</Flex>
			<Flex align='center' justify='flex-start'>
				{window.location.href.includes('dashboard/') ? (
					<Flex as='h2' my='1%' display='none'>
						Recent Posts
					</Flex>
				) : (
					<Flex as='h2' mt='1%'>
						Recent Posts
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}
