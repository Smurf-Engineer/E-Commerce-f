/**
 * ArtworkSpecs Screen - Created by gustavomedina on 05/06/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import zenscroll from 'zenscroll'
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
import { getColorsQuery } from './data'
import { Colors, QueryProps } from '../../types/common'

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  colorsList: ColorsData
}

export class ArtworkSpecs extends React.Component<Props, {}> {
  componentWillMount() {
    if (window && zenscroll) {
      zenscroll.toY(0, 0)
    }
  }
  render() {
    const {
      intl,
      history,
      colorsList,
      intl: { formatMessage }
    } = this.props
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
              <ColorList height={'100%'} {...{ formatMessage, colorsList }} />
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

const ArtworkSpecsEnhance = compose(
  injectIntl,
  graphql(getColorsQuery, { name: 'colorsList' }),

)(ArtworkSpecs)

export default ArtworkSpecsEnhance
