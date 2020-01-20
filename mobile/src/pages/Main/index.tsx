import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import MapView, { Marker, Callout, Region } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import api from '../../services/api'
import socket from '../../services/socket'
import { DevInterface } from '../../../../backend/src/models/Dev'

export default function Main({ navigation }) {
  const [techs, setTechs] = useState('')
  const [devs, setDevs] = useState<DevInterface[]>([])
  const [currentRegion, setCurrentRegion] = useState<Region>(null)

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()

      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })
        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        })
      }
    }

    loadInitialPosition()
  })

  useEffect(() => {
    socket.subscribeToNewDevs((dev: DevInterface) => setDevs([...devs, dev]))
  }, [devs])

  function setupWebSocket() {
    socket.disconnect()

    const { latitude, longitude } = currentRegion

    socket.connect(
      latitude,
      longitude,
      techs
    )
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion

    try {
      const { data } = await api.get<DevInterface[]>('/search', {
        params: {
          latitude,
          longitude,
          techs
        }
      })

      setDevs(data)
      setupWebSocket();
    } catch (error) {
      console.log('algo deu errado')
    }
  }

  function handleRegionChange(region) {
    setCurrentRegion(region)
  }

  if(!currentRegion) {
    return null
  }

  return (
    <>
      <Map
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        {devs.map(dev => (
            <Marker
              key={dev._id}
              coordinate={{
                latitude: dev.location.coordinates[1],
                longitude: dev.location.coordinates[0]
              }}
            >
              <Pin source={{ uri: dev.avatar_url }} />

              <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username })}>
                <Tooltip>
                  <Name>{dev.name}</Name>

                  <Bio>{dev.bio}</Bio>

                  <Techs>{dev.techs.join(', ')}</Techs>
                </Tooltip>
              </Callout>
            </Marker>
          ))}
      </Map>

      <SearchForm
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 4,
            height: 4
          },
          elevation: 2
        }}
      >
        <Input
          autoCorrect={false}
          autoCaptalize="words"
          onChangeText={setTechs}
          placeholderTextColor="#999"
          placeholder="Buscar devs por techs..."
        />

        <Button onPress={loadDevs}>
          <Icon name="my-location" size={20} color="#fff" />
        </Button>
      </SearchForm>
    </>
  );
}

const Map = styled(MapView)`
  flex: 1;
`;

const Pin = styled.Image`
  width: 54px;
  height: 54px;
  border-width: 4px;
  border-color: #fff;
  border-radius: 4px;
`

const Tooltip = styled.View`
  width: 260px;
`

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

const Bio = styled.Text`
  margin-top: 5px;

  color: #666;
`

const Techs = styled.Text`
  margin-top: 5px;
`

const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;

  flex-direction: row;
`

const Input = styled.TextInput`
  height: 50px;
  padding: 0 20px;
  border-radius: 25px;

  flex: 1;

  color: #333;
  font-size: 16px;
  background-color: #fff;
`

const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 25px;

  align-items: center;
  justify-content: center;

  background: #8e4dff;
`
