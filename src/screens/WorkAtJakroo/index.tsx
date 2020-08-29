/**
 * WorkAtJakroo Screen - Created by jorge on 31/07/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import zenscroll from 'zenscroll'
import messages from './messages'
import {
  Container,
  ImageTitleContainer,
  StyledImg,
  HeaderTextContainer,
  Title,
  HeaderDialog,
  ContentSection,
  SectionTitle
} from './styledComponents'
import Layout from '../../components/MainLayout'
import JobOpenings from '../../components/JobOpenings'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

const headerImg =
  'https://storage.googleapis.com/jakroo/screens/workat/workatjakroo-header.jpg'

const jobOpenings = [
  {
    id: 'jrAccountManager',
    header: 'jrAccountManagerHeader',
    content: 'jrAccountManagerContent'
  },
  {
    id: 'accountManagerInsideSales',
    header: 'accountManagerInsideSalesHeader',
    content: 'accountManagerInsideSalesContent'
  },
  {
    id: 'srAccountManager',
    header: 'srAccountManagerHeader',
    content: 'srAccountManagerContent'
  },
  {
    id: 'outsideSalesPacificNW',
    header: 'outsideSalesPacificNWHeader',
    content: 'outsideSalesPacificNWContent'
  },
  {
    id: 'outsideSalesMountain',
    header: 'outsideSalesMountainHeader',
    content: 'outsideSalesMountainContent'
  },
  {
    id: 'outsideSalesSoCAL',
    header: 'outsideSalesSoCALHeader',
    content: 'outsideSalesSoCALContent'
  },
  {
    id: 'outsideSalesEast',
    header: 'outsideSalesEastHeader',
    content: 'outsideSalesEastContent'
  },
  {
    id: 'ptShipperReceiver',
    header: 'ptShipperReceiverHeader',
    content: 'ptShipperReceiverContent'
  },
  {
    id: 'graphicDesigner',
    header: 'graphicDesignerHeader',
    content: 'graphicDesignerContent'
  }
]

export class WorkAtJakroo extends React.Component<Props, {}> {
  componentDidMount() {
    if (window && zenscroll) {
      zenscroll.toY(0, 0)
    }
  }
  render() {
    const { intl, history } = this.props
    const { formatMessage } = intl

    return (
      <Layout {...{ intl, history }}>
        <Container>
          <ImageTitleContainer>
            <StyledImg src={headerImg} />
            <HeaderTextContainer>
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
            </HeaderTextContainer>
            <HeaderDialog>
              <FormattedMessage {...messages.headerDialog} />
            </HeaderDialog>
          </ImageTitleContainer>
          <ContentSection>
            <SectionTitle>
              <FormattedMessage {...messages.currentJobsTitle} />
            </SectionTitle>
            <JobOpenings {...{ jobOpenings, formatMessage }} />
          </ContentSection>
        </Container>
      </Layout>
    )
  }
}

const WorkAtJakrooEnhance = compose(injectIntl)(WorkAtJakroo)

export default WorkAtJakrooEnhance
