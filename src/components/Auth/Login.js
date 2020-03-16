import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga'; // for google analytics
// actions
import login from '../../state/actions/index';
// styles
import CustomSpinner from '../CustomSpinner.js';
import SignupLoginInput from '../InputFields/SignupLoginInput.js';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/core';

const Login = ({ login, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  function validateUsername(value) {
    let error;
    if (!value) {
      error = 'Username is required';
    } else if (value.length < 8) {
      error = 'Username must be at least 8 characters';
    }
    return error || true;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
    return error || true;
  }

  const submitForm = creds => {
    // action function here
    login(creds).then(() => history.push('/dashboard'));
    ReactGA.event({
      category: 'User',
      action: `Button Login`
    });
  };

  const gaSignup = () => {
    ReactGA.event({
      category: 'User',
      action: `Link Don't have an account`
    });
  };

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='100%' h='100vh'>
        <Flex>
          <CustomSpinner />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex background='#E5E5E5' w='100%' minH='100vh' justify='center'>
      <Flex maxW='1440px' w='100%'>
        <Flex w='40%' justify='center' align='center'>
          <Text fontSize='64px' fontWeight='600' lineHeight='92px'>
            Allay - <br />
            Together, we are <br />
            stronger.
          </Text>
        </Flex>
        <Flex w='60%' justify='center' align='center'>
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex
              w='487px'
              //   h='40%'
              p='5'
              flexDir='column'
              background='#FFFFFF'
              rounded='6px'
              justify='center'
            >
              <FormControl isInvalid={errors.username}>
                <Flex as='h2' mx='1' my='2%'>
                  Lets get started!
                </Flex>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Username</FormLabel>
                  <SignupLoginInput
                    type='text'
                    name='username'
                    label='Username'
                    autoCapitalize='none'
                    ref={register({ validate: validateUsername })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <Flex mx='1%' my='4%' flexDir='column'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <SignupLoginInput
                      type={show ? 'text' : 'password'}
                      name='password'
                      label='Password'
                      autoCapitalize='none'
                      ref={register({ validate: validatePassword })}
                    />
                    <InputRightElement width='4.5rem' py='32px'>
                      <Button
                        h='1.75rem'
                        color='rgba(72, 72, 72, 0.1)'
                        border='none'
                        size='sm'
                        onClick={handleClick}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>
              <Button
                border='none'
                h='64px'
                mx='1%'
                my='5%'
                rounded='6px'
                size='lg'
                variantColor='teal'
                isLoading={formState.isSubmitting}
                type='submit'
              >
                Login
              </Button>
              <Flex m='15px' justify='center' fontWeight='light'>
                <Link to='/signup' onClick={gaSignup}>
                  Don't have an account?
                </Link>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, login)(Login);
