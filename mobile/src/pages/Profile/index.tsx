import React from 'react';
import styled from 'styled-components/native'
import { WebView } from 'react-native-webview'

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username')

  return (
    <Container source={{ uri: `https://github.com/${githubUsername}` }} />
  );
}

const Container = styled(WebView)`
  flex: 1
`
