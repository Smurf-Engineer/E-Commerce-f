/**
 * ArtworkSpecs Screen - Created by gustavomedina on 05/06/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import messages from './messages'
import {
  Container,
  Text,
  Subtitle,
  MainTitle,
  ContentContainer,
  StyledImage,
  LineCopy
} from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class ArtworkSpecs extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Text>
            <FormattedMessage {...messages.title} />
          </Text>
          <Subtitle>
            <FormattedMessage {...messages.subtitle} />
          </Subtitle>
          <MainTitle>
            <FormattedMessage {...messages.maintitle} />
          </MainTitle>
          <ContentContainer>
            <StyledImage
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/vector.svg'
              }
            />
            <FormattedMessage {...messages.vectorWork} />
          </ContentContainer>
          <ContentContainer>
            <StyledImage
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/raster.png'
              }
            />
            <FormattedMessage {...messages.rasterWork} />
          </ContentContainer>
          <LineCopy />
        </Container>
      </Layout>
    )
  }
}

const ArtworkSpecsEnhance = compose(injectIntl)(ArtworkSpecs)

export default ArtworkSpecsEnhance
