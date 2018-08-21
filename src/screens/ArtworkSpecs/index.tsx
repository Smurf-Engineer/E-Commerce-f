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
  SectionContainer,
  ColorChartContainer,
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
import vector from '../../assets/vector.svg'
import raster from '../../assets/raster.png'
import fsc from '../../assets/fsc.png'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class ArtworkSpecs extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <SectionContainer>
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
              <StyledImage src={vector} />
              <DesignText>
                <FormattedMessage {...messages.vectorWork} />
              </DesignText>
            </ContentContainer>
            <ContentContainer>
              <StyledImage src={raster} />
              <DesignText>
                <FormattedMessage {...messages.rasterWork} />
              </DesignText>
            </ContentContainer>
          </SectionContainer>
          <LineCopy />
          <SectionContainer>
            <SecondaryTitle>
              <FormattedMessage {...messages.whatType} />
            </SecondaryTitle>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.completeText)
              }}
            />
          </SectionContainer>
          <LineCopy />
          <ColorChartContainer>
            <ThirdTitle>
              <FormattedMessage {...messages.colorChart} />
            </ThirdTitle>
            <ColorWrapper>
              <ColorList height={'100%'} onSelectColor={(col: string) => {}} />
            </ColorWrapper>
          </ColorChartContainer>
          <LineCopy />
          <SectionContainer>
            <ThirdTitle>
              <FormattedMessage {...messages.flatLock} />
            </ThirdTitle>
            <FlatLockText>
              <FormattedMessage {...messages.flatLockText} />
            </FlatLockText>
            <StyledFlatLockImage src={fsc} />
          </SectionContainer>
        </Container>
      </Layout>
    )
  }
}

const ArtworkSpecsEnhance = compose(injectIntl)(ArtworkSpecs)

export default ArtworkSpecsEnhance
