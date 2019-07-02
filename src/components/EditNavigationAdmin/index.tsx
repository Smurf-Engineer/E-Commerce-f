/**
 * MainNavigationAdmin Component - Created by carloscazarez on 29/06/19.
 */
import * as React from 'react'
import { compose, QueryProps, graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { History } from 'history'
import message from 'antd/lib/message'
import messages from './messages'
import { GetSportsQuery, ActivateInNavbarMutation } from './data'
import { DARKER_GRAY } from '../../theme/colors'
import {
  Container,
  Title,
  Row,
  ColumnTitle,
  SportTyle,
  Divider,
  SwitchWrapper,
  StyledSwitch
} from './styledComponents'
import { SportType } from '../../types/common'

interface Data extends QueryProps {
  sports: [SportType]
}
interface Props {
  history: History
  data: Data
  activateInMenu: (variables: {}) => void
}

class EditNavigationAdmin extends React.Component<Props, {}> {
  render() {
    const {
      data: { sports }
    } = this.props

    const sportsList =
      sports &&
      sports.map(({ id: checkId, name, navbar }, index) => {
        return (
          <div key={index}>
            <Row>
              <SportTyle
                fontSize={'16px'}
                id={name}
                onClick={this.handleRedirect}
              >
                {name}
              </SportTyle>
              <ColumnTitle align="center">
                <SwitchWrapper>
                  <StyledSwitch
                    key={checkId}
                    checked={navbar}
                    onChange={this.handleActivateSport(checkId)}
                  />
                </SwitchWrapper>
              </ColumnTitle>
            </Row>
            <Divider />
          </div>
        )
      })

    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <>
          <Row>
            <ColumnTitle>
              <FormattedMessage {...messages.nameLabel} />
            </ColumnTitle>
            <ColumnTitle align="center">
              <FormattedMessage {...messages.mainNavigationLabel} />
            </ColumnTitle>
          </Row>
          <Divider color={DARKER_GRAY} />
          <Row>
            <SportTyle
              fontSize={'16px'}
              id="main"
              onClick={this.handleRedirect}
            >
              <FormattedMessage {...messages.homepageLabel} />
            </SportTyle>
          </Row>
          <Divider />
          {sportsList}
        </>
      </Container>
    )
  }

  handleRedirect = ({ currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const { history } = this.props
    const { id: routeID } = currentTarget
    console.log(routeID)
    history.push(`/admin/homepage/${routeID}`)
  }

  handleActivateSport = (id: number) => async () => {
    try {
      const { activateInMenu } = this.props
      await activateInMenu({
        variables: { id }
      })
    } catch (error) {
      message.error(error.message)
    }
  }
}
const EditNavigationAdminEnhance = compose(
  graphql<Data>(GetSportsQuery),
  ActivateInNavbarMutation
)(EditNavigationAdmin)

export default EditNavigationAdminEnhance
