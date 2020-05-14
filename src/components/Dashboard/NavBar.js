import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga' // for google analytics
//redux
import { connect } from 'react-redux'
//styles
import {
  Box,
  Flex,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  useDisclosure,
  Stack,
  Badge,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
  MenuItem,
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
  userData,
}) {
  const userId = window.localStorage.getItem('userId')

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
    setSearchResults(event.target.value.toLowerCase())
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
    { id: 4, criteria: 'track', name: 'iOS' },
    { id: 5, criteria: 'track', name: 'Android' },
  ]

  //track badge colors and background color picker
  const trackFontColor = (trackName) => {
    switch (trackName) {
      case 'DS':
        return '#35694F'
        break
      case 'WEB':
        return '#474EA7'
        break
      case 'iOS' || 'IOS':
        return '#8E3D19'
        break
      case 'Android':
        return '#4B3569'
        break
      case 'UX':
        return '#9F3A5A'
        break
      default:
        return
    }
  }
  const trackColorPicker = (trackName) => {
    switch (trackName) {
      case 'DS':
        return '#D3F2CD'
        break
      case 'WEB':
        return '#DBEBFD'
        break
      case 'iOS' || 'IOS':
        return '#F4E6BE'
        break
      case 'Android':
        return '#E9D9FF'
        break
      case 'UX':
        return '#F9E3DE'
        break
      default:
        return
    }
  }
  ///
  //// handle type filter and state for the badge / show
  const [type, setType] = useState([])
  const handleType = (name) => {
    if (typeFilters.includes(name)) {
      setTypeFilters(typeFilters.filter((item) => item !== name))
      setType(type.filter((x) => x !== name))
    } else {
      setTypeFilters(typeFilters.filter((item) => item !== name))
      setTypeFilters([...typeFilters, name])
      setType([...type, name])
    }
  }

  const typeBadge = (name) => {
    return name.map((typeName) => (
      <Badge
        backgroundColor="#d3d3d3"
        color="black"
        p="0px 5px"
        m="5px"
        style={{ borderRadius: '50px' }}
        variantColor="green"
      >
        {typeName}
      </Badge>
    ))
  }
  //// handle track filter and state for the badge color / show

  const [track, setTrack] = useState([])
  const handleTrack = (name) => {
    if (trackFilters.includes(name)) {
      setTrackFilters(trackFilters.filter((item) => item !== name))
      setTrack(track.filter((x) => x !== name))
    } else {
      setTrackFilters(trackFilters.filter((item) => item !== name))
      setTrackFilters([...trackFilters, name])
      setTrack([...track, name])
    }
  }

  const trackBadge = (name) => {
    return name.map((typeName) => (
      <Badge
        p="0px 2px"
        m="2px"
        backgroundColor={trackColorPicker(typeName)}
        color={trackFontColor(typeName)}
        style={{ borderRadius: '50px' }}
        variantColor="green"
      >
        {typeName}
      </Badge>
    ))
  }

  useEffect(() => {
    getUser(userId)
  }, [])

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
      <Flex align="center" justify="space-between" pt="1%" mb="4%" h="100px">
        <Flex color="#344CD0" align="center">
          <h1>Allay</h1>
        </Flex>

        {/* Search bar*/}
        <InputGroup w="40%">
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

        {/* Profile Icon and user menu*/}
        <Flex>
          <Menu position="absolute" height="226px">
            <MenuButton
              as={Image}
              size="50px"
              style={{
                opacity: '0.6',
                borderRadius: userData.profile_image === 'h' ? 'none' : '50%',
              }}
              src={
                userData.profile_image === 'h'
                  ? require('../../icons/user.svg')
                  : userData.profile_image
              }
            />
            <MenuList>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                data-cy="signOut"
                onClick={() => history.push(`/profile/${profile_id}`)}
              >
                Profile
              </MenuItem>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                data-cy="signOut"
                onClick={() => history.push(`/profile/${profile_id}/edit`)}
              >
                Account settings
              </MenuItem>
              <MenuItem
                border="none"
                backgroundColor="#FFF"
                onClick={logout}
                data-cy="signOut"
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Box>
        {/* Filtered Search Buttons */}
        <Flex
          align="center"
          width="100%"
          margin="0 auto"
          justify="space-between"
        >
          <Heading as="h1" size="xl">
            Reviews
          </Heading>
          <Menu margin="3%" closeOnSelect={false}>
            <MenuButton
              outline="none"
              w="309px"
              h="55px"
              bg="#FFFFFF"
              border="2px solid #EAF0FE"
              rounded="50px"
              fontFamily="Muli"
              fontSize="20px"
              fontWeight="bold"
            >
              {type.length > 0 ? typeBadge(type) : 'Filter by review type'}
              <Icon name="triangle-down" color="#344CD0" />
            </MenuButton>
            <MenuList minWidth="240px">
              {types.map((type) => (
                <MenuOptionGroup defaultValue={typeFilters} type="checkbox">
                  <MenuItemOption
                    border="none"
                    backgroundColor="#FFF"
                    value={type.name}
                    onClick={() => handleType(type.name)}
                  >
                    {type.name}
                  </MenuItemOption>
                </MenuOptionGroup>
              ))}
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              outline="none"
              w="240px"
              h="55px"
              bg="#FFFFFF"
              border="2px solid #EAF0FE"
              rounded="50px"
              fontFamily="Muli"
              fontSize="20px"
              fontWeight="bold"
            >
              {track.length > 0 ? trackBadge(track) : 'Filter by field'}
              <Icon name="triangle-down" color="#344CD0" />
            </MenuButton>
            <MenuList minWidth="240px">
              {tracks.map((track) => (
                <MenuOptionGroup defaultValue={trackFilters} type="checkbox">
                  <MenuItemOption
                    border="none"
                    backgroundColor="#FFF"
                    value={track.name}
                    onClick={() => handleTrack(track.name)}
                  >
                    {track.name}
                  </MenuItemOption>
                </MenuOptionGroup>
              ))}
            </MenuList>
          </Menu>
          {isBlocked ? (
            <Blocked />
          ) : (
            <Button
              background="#344CD0"
              color="#FFFFFF"
              rounded="35px"
              ml="50px"
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
      </Box>
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
