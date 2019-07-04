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
import WithLoading from '../../components/WithLoading'
import {
  Container,
  Title,
  Row,
  ColumnTitle,
  SportTyle,
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

    const sportsList = sports.map(({ id, name, navbar, route }, index) => {
      return (
        <Row key={index}>
          <SportTyle
            fontSize={'16px'}
            id={name}
            onClick={this.handleRedirect(id, route)}
          >
            {name}
          </SportTyle>
          <ColumnTitle align="center">
            <SwitchWrapper>
              <StyledSwitch
                key={id}
                checked={navbar}
                onChange={this.handleActivateSport(id)}
              />
            </SwitchWrapper>
          </ColumnTitle>
        </Row>
      )
    })

    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <>
          <Row color={DARKER_GRAY}>
            <ColumnTitle>
              <FormattedMessage {...messages.nameLabel} />
            </ColumnTitle>
            <ColumnTitle align="center">
              <FormattedMessage {...messages.mainNavigationLabel} />
            </ColumnTitle>
          </Row>
          <Row>
            <SportTyle fontSize={'16px'} onClick={this.handleRedirect()}>
              <FormattedMessage {...messages.homepageLabel} />
            </SportTyle>
          </Row>
          {sportsList}
        </>
      </Container>
    )
  }

  handleRedirect = (sportId?: number, sportRoute?: string) => ({
    currentTarget
  }: React.MouseEvent<HTMLDivElement>) => {
    const { history } = this.props
    const { id: sportName } = currentTarget
    history.push(`/admin/homepage/${sportRoute || ''}`, { sportId, sportName })
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
  ActivateInNavbarMutation,
  WithLoading
)(EditNavigationAdmin)

export default EditNavigationAdminEnhance
