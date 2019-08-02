/**
 * ProductsInternalsAdmin Queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getProductInternalsInfoQuery = gql`
  query getProductInternalsInfo {
    productInternalsInfo: getProductInternalsInfo {
      basicColors {
        name
      }
      frontZipperColors {
        name
      }
      products
      genders {
        gender: product_internals_gender
      }
      sizes {
        name
      }
      fitStyles {
        info: product_internals_name
      }
      colors {
        name
      }
      collections {
        name
      }
    }
  }
`

export const updateProductInternal = graphql(
  gql`
    mutation updateProductInternal($productInternal: ProductInternalInput!) {
      updateProductInternal(productInternal: $productInternal) {
        id
        internalId: internal_id
        productCode: product_code
        gender
        size
        fitStyle: fit_style
        color
        pocketZipper: pocket_zipper
        frontZipper: front_zipper
        binding
        bibBrace: bib_brace
        collection
      }
    }
  `,
  {
    name: 'updateProduct'
  }
)

export const addProductInternal = graphql(
  gql`
    mutation addProductInternal($productInternal: ProductInternalInput!) {
      addProductInternal(productInternal: $productInternal) {
        id
        internalId: internal_id
        productCode: product_code
        gender
        size
        fitStyle: fit_style
        color
        pocketZipper: pocket_zipper
        frontZipper: front_zipper
        binding
        bibBrace: bib_brace
        collection
      }
    }
  `,
  {
    name: 'addProduct'
  }
)

export const deleteProductInternal = graphql(
  gql`
    mutation deleteProductInternal($id: Int!) {
      deleteProductInternal(id: $id) {
        message
      }
    }
  `,
  {
    name: 'deleteProduct'
  }
)
