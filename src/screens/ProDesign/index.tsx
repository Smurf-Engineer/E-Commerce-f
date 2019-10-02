/**
 * ProDesign Screen - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as proDesignActions from './actions'
import colorIcon from '../../assets/color_white.svg'
import get from 'lodash/get'
import uploadIcon from '../../assets/upload_white.svg'
import Render3D from '../../components/Render3D'
import AddProDesignModal from '../../components/AddProDesignModal'
import { GetProductsByIdQuery, saveProDesignMutation } from './data'
import messages from './messages'
import AntdTabs from 'antd/lib/tabs'
import message from 'antd/lib/message'
import Tab from './Tab'
import { connect } from 'react-redux'
import { compose, withApollo, graphql } from 'react-apollo'
import { uploadProDesign } from './api'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout,
  StyledTabs,
  Render3DContainer,
  StyledButton,
  ButtonWrapper
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import UploadTab from './UploadTab'
import ColorTab from './ColorTab'
import { UPLOAD, COLOR } from './constants'
import {
  ProductSearchResult,
  Product,
  QueryProps,
  StitchingColor,
  ColorAccessories
} from '../../types/common'

const { TabPane } = AntdTabs

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
}

interface Data extends QueryProps {
  productFromCode: ProductTypes
}

interface Props {
  intl: InjectedIntl
  selectedKey: string
  productSearchResults: ProductSearchResult[]
  data: Data
  productCode: string
  actualImage: string
  uploadingFile: boolean
  fileName: string
  colorSectionIndex: number
  colorAccessories: ColorAccessories
  users: string[]
  designName: string
  legacyNumber: string
  selectedUser: string
  saveModalOpen: boolean
  savingDesign: boolean
  onTabClickAction: (selectedKey: string) => void
  setSearchProductAction: (product: ProductSearchResult[]) => void
  setProductCodeAction: (productCode: string) => void
  uploadProDesignAction: (file: any, name: string) => void
  goToColorSectionAction: (index: number) => void
  setStitchingColorAction: (stitchingColor: StitchingColor) => void
  setColorAction: (color: string, id: string) => void
  setUsersAction: (users: string[]) => void
  setSelectedUserAction: (email: string) => void
  setInputValueAction: (id: string, value: string) => void
  saveDesign: (variables: {}) => void
  setSaveModalOpenAction: () => void
  setSavingDesignAction: (saving: boolean) => void
}
export class ProDesign extends React.Component<Props, {}> {
  render3D: any
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  saveDesign = async () => {
    const {
      saveDesign,
      colorAccessories: {
        stitching,
        stitchingName,
        zipperColor,
        bibColor,
        bindingColor
      },
      selectedUser,
      designName,
      legacyNumber,
      productCode,
      setSaveModalOpenAction,
      setSavingDesignAction,
      actualImage,
      data
    } = this.props
    try {
      const product = get(data, 'productFromCode')
      setSavingDesignAction(true)
      if (this.render3D) {
        const thumbnail = await this.render3D
          .getWrappedInstance()
          .saveProDesignThumbnail()

        const design = {
          stitching: product.flatlock && stitching,
          stitching_name: product.flatlock && stitchingName,
          zipper_color: product.zipper && zipperColor,
          bib_color: product.bibBrace && bibColor,
          binding_color: product.binding && bindingColor,
          name: designName,
          email: selectedUser,
          product_code: productCode,
          image: thumbnail,
          legacy: legacyNumber,
          output_png: actualImage
        }

        await saveDesign({
          variables: { design }
        })
      }
      setSavingDesignAction(false)
      setSaveModalOpenAction()
    } catch (error) {
      message.error(error.message)
      setSavingDesignAction(false)
    }
  }
  render() {
    const {
      intl,
      onTabClickAction,
      selectedKey,
      setSearchProductAction,
      productSearchResults,
      setProductCodeAction,
      data,
      productCode,
      uploadProDesignAction,
      actualImage,
      uploadingFile,
      fileName,
      colorSectionIndex,
      goToColorSectionAction,
      setStitchingColorAction,
      colorAccessories,
      colorAccessories: { stitching },
      setColorAction,
      setUsersAction,
      users,
      setSelectedUserAction,
      setInputValueAction,
      designName,
      legacyNumber,
      selectedUser,
      setSaveModalOpenAction,
      saveModalOpen,
      savingDesign
    } = this.props
    const { formatMessage } = intl
    const product = get(data, 'productFromCode')
    const loading = get(data, 'loading')
    const colorsResult = get(data, 'colorsResult', '')
    const saveDisabled = !product || !actualImage

    const tabs = (
      <StyledTabs activeKey={selectedKey} onTabClick={onTabClickAction}>
        <TabPane tab={<Tab label={UPLOAD} icon={uploadIcon} />} key={UPLOAD}>
          <UploadTab
            {...{
              formatMessage,
              productSearchResults,
              productCode,
              uploadingFile,
              fileName
            }}
            setSearchProduct={setSearchProductAction}
            setProductCode={setProductCodeAction}
            onUploadFile={uploadProDesignAction}
          />
        </TabPane>
        <TabPane tab={<Tab label={COLOR} icon={colorIcon} />} key={COLOR}>
          <ColorTab
            index={colorSectionIndex}
            {...{
              formatMessage,
              colorsResult,
              colorAccessories,
              product
            }}
            goToColorSection={goToColorSectionAction}
            onSelectStitchingColor={setStitchingColorAction}
            onSelectColor={setColorAction}
          />
        </TabPane>
      </StyledTabs>
    )

    const addProDesignModal = (
      <AddProDesignModal
        visible={saveModalOpen}
        {...{
          formatMessage,
          users,
          designName,
          legacyNumber,
          selectedUser,
          savingDesign
        }}
        setUsers={setUsersAction}
        setSelectedUser={setSelectedUserAction}
        handleOnInputChange={setInputValueAction}
        onSaveDesign={this.saveDesign}
        requestClose={setSaveModalOpenAction}
      />
    )
    return (
      <Container>
        <Helmet title={formatMessage(messages.title)} />
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.handleOnPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Layout>
          {tabs}
          <Render3DContainer>
            {product && !loading && (
              <Render3D
                customProduct={true}
                isProduct={true}
                designId={0}
                {...{ product, actualImage, colorAccessories }}
                stitchingValue={stitching}
                ref={(render3D: any) => (this.render3D = render3D)}
              />
            )}
          </Render3DContainer>
          <ButtonWrapper disabled={saveDisabled}>
            <StyledButton
              type="primary"
              disabled={saveDisabled}
              onClick={setSaveModalOpenAction}
            >
              {formatMessage(messages.saveDesign)}
            </StyledButton>
          </ButtonWrapper>
        </Layout>
        {addProDesignModal}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const proDesign = state.get('proDesign').toJS()
  return {
    ...proDesign
  }
}

type OwnProps = {
  productCode?: string
}

const ProDesignEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...proDesignActions,
      uploadProDesignAction: uploadProDesign
    }
  ),
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const { productCode } = ownprops
      return {
        variables: {
          code: productCode
        },
        skip: !productCode,
        fetchPolicy: 'network-only'
      }
    }
  }),
  saveProDesignMutation
)(ProDesign)

export default ProDesignEnhance
