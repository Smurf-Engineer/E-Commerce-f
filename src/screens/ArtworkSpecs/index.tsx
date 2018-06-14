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
  LineCopy,
  SecondaryTitle,
  SectionText,
  ThirdTitle,
  FlatLockText,
  StyledFlatLockImage,
  DesignText,
  ColorWrapper
} from './styledComponents'
import Layout from '../../components/MainLayout'
import ColorList from '../../screens/DesignerTool/DesignCenterCustomize/ColorList'

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
            <DesignText>
              <FormattedMessage {...messages.vectorWork} />
            </DesignText>
          </ContentContainer>
          <ContentContainer>
            <StyledImage
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/artwork/raster.webp'
              }
            />
            <DesignText>
              <FormattedMessage {...messages.rasterWork} />
            </DesignText>
          </ContentContainer>
          <LineCopy />
          <SecondaryTitle>
            <FormattedMessage {...messages.whatType} />
          </SecondaryTitle>
          <SectionText
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(messages.completeText)
            }}
          />
          <LineCopy />
          <ThirdTitle>
            <FormattedMessage {...messages.colorChart} />
          </ThirdTitle>
          <ColorWrapper>
            <ColorList height={'100%'} onSelectColor={(col: string) => {}} />
          </ColorWrapper>
          <LineCopy />
          <ThirdTitle>
            <FormattedMessage {...messages.flatLock} />
          </ThirdTitle>
          <FlatLockText>
            <FormattedMessage {...messages.flatLockText} />
          </FlatLockText>
          <StyledFlatLockImage
            src={
              'https://storage.googleapis.com/jakroo-storage/screens/artwork/FSCW.webp'
            }
          />
        </Container>
      </Layout>
    )
  }
}

const ArtworkSpecsEnhance = compose(injectIntl)(ArtworkSpecs)

export default ArtworkSpecsEnhance
