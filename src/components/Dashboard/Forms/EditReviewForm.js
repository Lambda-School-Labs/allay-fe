import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import getReviewById from '../../../state/actions/index.js';
import editReview from '../../../state/actions/index.js';
import ReactGA from 'react-ga';

import { useForm } from 'react-hook-form';

//imported styles
import CustomSpinner from '../../CustomSpinner';
import {
  Flex,
  Input,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogFooter
} from '@chakra-ui/core';

const SingleReview = ({
  review,
  getReviewById,
  editReview,
  match,
  history,
  isLoading
}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const id = match.params.id;
  const [editValue, setEditValue] = useState({
    id: id
  });

  // specifically for the cancel button functionality
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  // validating salary
  function validateSalary(value) {
    let error;
    if (value < 0) {
      error = 'Salary cannot be less than zero.';
    }
    return error || true;
  }

  useEffect(() => {
    getReviewById(id);
  }, [id, getReviewById]);

  console.log(editValue);

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100vh' h='100vh'>
        <CustomSpinner />
      </Flex>
    );
  }

  const submitEdits = () => {
    editReview(review.id, editValue).then(() =>
      history.push('/dashboard')
    );
    ReactGA.event({
      category: 'Edit',
      action: `Submit edit`
    });
  };

  return (
    <Flex w='100%' bg='rgba(72, 72, 72, 0.1)'>
      <Flex
        w='100%'
        justify='center'
        py='6rem'
        px='15rem'
        bg='white'
      >
        <Flex justify='center' align='start' flexDir='column'>
          <h2> Edit Review</h2>
          <form onSubmit={handleSubmit(submitEdits)}>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Tag Line
              </FormLabel>
              <Input
                mb='4'
                h='56px'
                variant='filled'
                rounded='6px'
                name='tagline'
                type='text'
                placeholder={review.tagline}
                ref={register}
                value={editValue.tagline}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' mt='4' color='#525252'>
                Job Title
              </FormLabel>
              <Input
                mb='4'
                h='56px'
                variant='filled'
                rounded='6px'
                name='job_title'
                type='text'
                placeholder={review.job_title}
                ref={register}
                value={editValue.job_title}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Location
              </FormLabel>
              <Input
                mb='4'
                h='56px'
                variant='filled'
                rounded='6px'
                name='job_location'
                type='text'
                placeholder={review.job_location}
                ref={register}
                value={editValue.job_location}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl isInvalid={errors.salary}>
              <FormLabel fontSize='15px' color='#525252'>
                Salary
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  mb='4'
                  h='56px'
                  color='gray.300'
                  fontSize='1.2em'
                  children='$'
                />
                <Input
                  mb='4'
                  h='56px'
                  variant='filled'
                  rounded='6px'
                  name='salary'
                  type='number'
                  placeholder={review.salary}
                  ref={register({ validate: validateSalary })}
                  value={editValue.salary}
                  onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.salary && errors.salary.message}
              </FormErrorMessage>
            </FormControl>

            <Flex as='h3' mb='3'>
              Overall Job Review
              </Flex>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Interview Difficulty
              </FormLabel>
              {/* // change to dropdown */}
              <Select
                h='56px'
                mb='6'
                rounded='6px'
                variant='filled'
                label=''
                name='interview_rating'
                placeholder={review.interview_rating}
                value={editValue.interview_rating}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              >
                <option value={5}>5 - Great</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Ok </option>
                <option value={2}>2 - Poor </option>
                <option value={1}>1 - Very Poor </option>
              </Select>

            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Review
              </FormLabel>
              <Textarea
                mb='4'
                h='144px'
                variant='filled'
                rounded='6px'
                h='200px'
                rowsMax={6}
                name='job_review'
                type='text'
                placeholder={review.job_review}
                ref={register}
                value={editValue.job_review}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px' color='#525252'>
                Job Rating
              </FormLabel>
              {/* // change to dropdown */}
              <Select
                mb='4'
                h='56px'
                variant='filled'
                rounded='6px'
                name='job_rating'
                // id='job_rating'
                // placeholder={review.job_rating}
                ref={register}
                // value={editValue.job_rating}
                onChange={e => setEditValue({ ...editValue, [e.target.name]: e.target.value })}
              >
                <option value={5}>5 - Great</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Ok </option>
                <option value={2}>2 - Poor </option>
                <option value={1}>1 - Very Poor </option>
              </Select>
            </FormControl>

            <ButtonGroup mb='3' mt='3'>
              <Button
                w='500px'
                h='56px'
                type='submit'
                _hover={{ bg: '#979797' }}
                _active={{ bg: '#979797' }}
                bg='#615E5E'
                color='white'
                isLoading={formState.isSubmitting}
                rounded='6x'
                border='none'
              >
                Edit Review
              </Button>
              <Button
                h='56px'
                rounded='6x'
                border='2px solid #615E5E'
                bg='none'
                color='#615E5E'
                onClick={() => setIsOpen(true)}
              >
                Cancel
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Cancel form?
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure? You can't undo this action.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button onClick={() => history.push('/dashboard')} ml={3}>
                      Yes I'm sure
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ButtonGroup>
          </form>
        </Flex>
      </Flex>
    </Flex >
  );
};

const mapStateToProps = state => {
  // console.log(state.review.dataById)
  return {
    review: state.review.dataById
  };
};

export default connect(
  mapStateToProps,
  (getReviewById, editReview))
  (SingleReview);