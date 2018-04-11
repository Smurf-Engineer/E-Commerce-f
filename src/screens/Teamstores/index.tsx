/**
 * Teamstores Screen - Created by cazarez on 10/04/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import { ReducersObject } from '../../store/rootReducer'
import * as teamstoresActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  ImageContainer,
  SearchBackground,
  SearchContainer,
  TeamStoreText,
  ButtonRow
} from './styledComponents'
import Layout from '../../components/MainLayout'
import SearchBar from '../../components/SearchBar'
import teamstoreImage from '../../assets/uhc_ladies.jpg'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class Teamstores extends React.Component<Props, {}> {
  render() {
    const { history, intl } = this.props
    return (
      <Layout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
          <SearchContainer>
            <SearchBackground src={teamstoreImage} />
            <TeamStoreText>
              {intl.formatMessage(messages.teamStoresLegend)}
            </TeamStoreText>
            <SearchBar
              search={''}
              formatMessage={intl.formatMessage}
              searchWidth={'100%'}
            />
            <ButtonRow>
              <Button>{intl.formatMessage(messages.myTeamsButtonLabel)}</Button>
            </ButtonRow>
          </SearchContainer>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('teamstores').toJS()

const TeamstoresEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...teamstoresActions })
)(Teamstores)

export default TeamstoresEnhance
