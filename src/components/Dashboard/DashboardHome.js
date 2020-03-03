import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// action
import getReview from '../../state/actions/index';
// component
import ReviewCard from './ReviewCard';
// styles
import { Flex, Button, Avatar } from '@chakra-ui/core';

const DashboardHome = ({ data, getReview, history, isLoading }) => {
	// pull review data
	useEffect(() => {
		getReview();
	}, [getReview]);

	// use to navigate to review form
	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
	};

	return (
		<>
			<Flex maxWidth='1440px' pl='45px' direction='column' wrap='wrap'>
				<Flex
					px='45px'
					w='95%'
					background='#FFFFFF'
					top='0'
					position='fixed'
					overflow='hidden'
					zIndex='999'
					direction='column'
				>
					<Flex align='center' pt='1.5%'>
						<Avatar
							marginRight='2%'
							size='xl'
							src='https://bit.ly/broken-link'
						/>
						<h1> Allay </h1>
					</Flex>
					<Flex align='center' pr='25px' justify='flex-end' padding='1.5% 0'>
						<Button
							variantColor='teal'
							size='sm'
							isLoading={isLoading}
							onClick={navToReviewForm}
						>
							Add A Review
						</Button>
					</Flex>
				</Flex>
				<Flex marginTop='10%' direction='column'>
					<Flex align='center' justify='flex-start' padding='1.5% 0'>
						<h3> Recent Posts </h3>
					</Flex>
					<Flex height='100%' direction='column'>
						{data.map(review => (
							<ReviewCard key={review.id} review={review} history={history} />
						))}
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.review.fetchingData,
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(DashboardHome);