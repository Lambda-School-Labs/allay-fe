import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga' // for google analytics
//redux
import { connect } from 'react-redux'
//styles
import {
  Flex,
  Button,
  Text,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  useDisclosure,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
} from '@chakra-ui/core'
//import modal
import Blocked from '../Reusable/BlockedModal'
//import user
import { getUser } from '../../state/actions/userActions'

function NavBar({
  history,
  isLoading,
  isBlocked,
  setSearchResults,
  trackFilters,
  setTrackFilters,
  typeFilters,
  setTypeFilters,
  getUser,
  match,
  userData,
}) {
  const userId = window.localStorage.getItem('userId')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  // use to navigate to review form
  const navToReviewForm = () => {
    history.push('/dashboard/add-review')
    ReactGA.event({
      category: 'Review',
      action: `Add new review`,
    })
  }

  const profile_id = localStorage.getItem('userId')
  const logout = () => {
    localStorage.clear('token')
    localStorage.clear('userId')
    history.push('/')
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setSearchResults(event.target.value)
  }

  // We could get this fronm the DB if we had endpoints
  const types = [
    { id: 1, criteria: 'type', name: 'Interview' },
    { id: 2, criteria: 'type', name: 'Company' },
  ]

  const tracks = [
    { id: 1, criteria: 'track', name: 'WEB' },
    { id: 2, criteria: 'track', name: 'UX' },
    { id: 3, criteria: 'track', name: 'DS' },
    { id: 4, criteria: 'track', name: 'IOS' },
    { id: 5, criteria: 'track', name: 'AND' },
  ]

  const handleType = (name) => {
    typeFilters.includes(name)
    setTypeFilters(typeFilters.filter((item) => item !== name))
    setTypeFilters([...typeFilters, name])
  }
  const removeType = (name) => {
    trackFilters.includes(name)
    setTypeFilters(typeFilters.filter((item) => item !== name))
  }

  const handleTrack = (name) => {
    trackFilters.includes(name)
    setTrackFilters(trackFilters.filter((item) => item !== name))
    setTrackFilters([...trackFilters, name])
  }
  const removeTrack = (name) => {
    trackFilters.includes(name)
    setTrackFilters(trackFilters.filter((item) => item !== name))
  }
  console.log(tracks)

  useEffect(() => {
    getUser(userId)
  }, [])
  console.log(getUser)
  return (
    <Flex
      maxW="1440px"
      w="100%"
      px="40px"
      background="#FFFFFF"
      top="0"
      position="fixed"
      zIndex="999"
      direction="column"
    >
      <Flex align="center" justify="space-between" pt="1%">
        <Flex align="center">
          <h1> Allay </h1>
        </Flex>

        {/* Profile Icon */}
        <Flex>
          {userData.profile_image === 'h' ? (
            <Image
              size="50px"
              style={{ opacity: '0.6' }}
              src={require('../../icons/user.svg')}
            />
          ) : (
            <Image
              size="50px"
              style={{ opacity: '0.6', borderRadius: '50%' }}
              src={userData.profile_image}
            />
          )}
        </Flex>

        <Flex>
          {/* Hamburger Menu */}
          <Box
            ref={btnRef}
            cursor="pointer"
            onClick={onOpen}
            data-cy="hamburger"
          >
            <Image
              size="40px"
              src={require('../../icons/hamburger-blue.svg')}
            />
          </Box>
          <Drawer
            isOpen={isOpen}
            placement="right"
            size="xs"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg="#344CD0">
              <DrawerCloseButton
                color="white"
                border="none"
                bg="#344CD0"
                fontSize="2em"
              />
              <DrawerHeader>
                <Flex justifyContent="center" mt="15%">
                  <Image
                    size="150px"
                    src={require('../../icons/user-logout.svg')}
                  />
                </Flex>
                <Flex
                  justifyContent="center"
                  mt="5%"
                  color="white"
                  fontWeight="light"
                  fontSize="1.5em"
                >
                  Hi, {localStorage.getItem('name')}
                </Flex>
              </DrawerHeader>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
                to={`/profile/${profile_id}`}
              >
                {' '}
                <Flex
                  background="#FFFFFF"
                  mt="3%"
                  color="#494B5B"
                  border="none"
                  py="4%"
                  cursor="pointer"
                  align="center"
                  justifyContent="center"
                  isLoading={isLoading}
                  data-cy="signOut"
                >
                  <Text fontSize="1.8em">Go to Profile</Text>
                </Flex>
              </Link>
              <Flex
                background="#FFFFFF"
                mt="3%"
                color="#494B5B"
                border="none"
                py="4%"
                cursor="pointer"
                align="center"
                justifyContent="center"
                isLoading={isLoading}
                onClick={logout}
                data-cy="signOut"
              >
                <Image
                  size="40px"
                  mr="7%"
                  src={require('../../icons/logout-gray.svg')}
                />
                <Text fontSize="1.8em">Sign out</Text>
              </Flex>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>

      {/* Search Bar */}
      <Flex align="center" justify="space-between" pt="1%">
        <InputGroup w="30%">
          <InputRightElement
            children={<Icon name="search-2" color="#344CD0" />}
          />
          <Input
            width="100%"
            placeholder="Search by company"
            name="searchbar"
            type="text"
            rounded="20px"
            borderColor="rgba(149, 149, 149, 0.2)"
            borderWidth="1px"
            onChange={handleInputChange}
          />
        </InputGroup>
        {isBlocked ? (
          <Blocked />
        ) : (
          <Button
            background="#344CD0"
            color="#FFFFFF"
            rounded="6px"
            border="none"
            size="lg"
            isLoading={isLoading}
            onClick={navToReviewForm}
            data-cy="addReviewButton"
          >
            Add Review
          </Button>
        )}
      </Flex>

      {/* Filtered Search Buttons */}
      <Flex
        align="space-around"
        justify="space-around"
        p="1%"
        width="100%"
        margin="0 auto"
      >
        <Menu closeOnSelect={false}>
          <MenuButton
            w="309px"
            h="55px"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              borderRadius: '50px',
              outline: 'none',
            }}
          >
            Filter by review type <i class="fas fa-arrow-down"></i>
          </MenuButton>
          <MenuList minWidth="240px">
            {types.map((type) => (
              <MenuOptionGroup onChange={() => handleType(type.name)}>
                <MenuItemOption value={type.name}>{type.name}</MenuItemOption>
                <Button onClick={() => removeType(type.name)}>X</Button>
              </MenuOptionGroup>
            ))}
          </MenuList>
        </Menu>
        <Menu closeOnSelect={false}>
          <MenuButton
            w="209px"
            h="55px"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              borderRadius: '50px',
              outline: 'none',
            }}
          >
            Filter by field <i class="fas fa-arrow-down"></i>
          </MenuButton>
          <MenuList minWidth="240px">
            {tracks.map((track) => (
              <MenuOptionGroup onChange={() => handleTrack(track.name)}>
                <MenuItemOption value={track.name}>{track.name}</MenuItemOption>
                <Button onClick={() => removeTrack(track.name)}>X</Button>
              </MenuOptionGroup>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

const mapStateToProps = (state) => {
  return {
    isBlocked: state.auth.isBlocked,
    userData: state.user.userData,
  }
}

export default connect(mapStateToProps, { getUser })(NavBar)
