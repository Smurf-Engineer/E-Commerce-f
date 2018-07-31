/**
 * WorkAtJakroo Screen - Created by jorge on 31/07/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import messages from './messages'
import {
  Container,
  ImageTitleContainer,
  StyledImg,
  HeaderTextContainer,
  Title,
  HeaderDialog
} from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class WorkAtJakroo extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    const headerImg =
      'https://storage.googleapis.com/jakroo-storage/screens/workat/workatjakroo-header.jpg'

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
        </Container>
      </Layout>
    )
  }
}

const WorkAtJakrooEnhance = compose(injectIntl)(WorkAtJakroo)

export default WorkAtJakrooEnhance
