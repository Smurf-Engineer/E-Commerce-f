/**
 * ProfileData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import { Container, Text, Currency, FlagIcon } from './styledComponents'
import { IProfileSettings } from '../../../types/common'

interface Props {
  profile: IProfileSettings
}

const ProfileData = ({ profile }: Props) => {
  const firstName = get(profile, 'user.firstName', '')
  const lastName = get(profile, 'user.lastName', '')
  const email = get(profile, 'user.email', '')
  const phone = get(profile, 'user.phone', '')
  const flagIcon = get(profile, 'regionsOptions.region.icon', '')
  const currency = get(profile, 'regionsOptions.currency.currency', '')
  return (
    <Container>
      <Text>{`${firstName} ${lastName}`}</Text>
      <Text>{`${email}`}</Text>
      {phone && <Text>{`${phone}`}</Text>}
      <Currency>
        <FlagIcon src={flagIcon} />
        <Text>{currency}</Text>
      </Currency>
    </Container>
  )
}

export default ProfileData
