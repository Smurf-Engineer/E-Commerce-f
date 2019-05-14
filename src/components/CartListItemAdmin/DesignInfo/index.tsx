/**
 * CartListItemAdmin Component - Created by eduardoquintero on /05/19.
 */
import * as React from 'react'
import {
  DesignInfoContainer,
  DesignInfoTitle,
  DesignInfoSubtitle,
  DesignInfoBox
} from './styledComponents'
import messages from '../../ProductInfo/messages'

interface Props {
  cartItem: any
  formatMessage: (messageDescriptor: any) => string
}

class ItemDetails extends React.Component<Props, {}> {
  render() {
    const { formatMessage, cartItem } = this.props
    return (
      <DesignInfoContainer>
        <DesignInfoBox>
          <DesignInfoTitle> {formatMessage(messages.flatlock)}</DesignInfoTitle>
          <DesignInfoSubtitle>{cartItem.flatlock || '-'} </DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.flatlockCode)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>
            {cartItem.flatlockCode || '-'}
          </DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.zipperColor)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>{cartItem.zipperColor || '-'}</DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.bindingColor)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>
            {cartItem.bindingColor || '-'}
          </DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.bibbraceColor)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>
            {cartItem.bibBraceColor || '-'}
          </DesignInfoSubtitle>
        </DesignInfoBox>
      </DesignInfoContainer>
    )
  }
}

export default ItemDetails
