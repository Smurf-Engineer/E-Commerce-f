import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveProject = graphql(
  gql`
    mutation createProDesignProject($proDesignProject: ProDesignProjectInput!) {
      createProDesignProject(proDesignProject: $proDesignProject) {
        message
      }
    }
  `,
  {
    name: 'createProject'
  }
)

export const addProductsProjectMutation = graphql(
  gql`
    mutation addProductsProject($projectId: String!, $products: [String], $admUser: String!) {
      addProductsProject(projectId: $projectId, products: $products, admUser: $admUser) {
        message
      }
    }
  `,
  {
    name: 'addProductsProject'
  }
)

export const renameFile = graphql(
  gql`
    mutation renameFileName($id: Int, $value: String) {
      renameFileName(id: $id, value: $value) {
        message
      }
    }
  `,
  {
    name: 'renameFileName'
  }
)

export const GetColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
    }
  }
`

export const GetColorPalettes = gql`
  query getProDesignPalettes {
    rows: getProDesignPalettes {
      id
      name
      primary: primary_color
      accent1: accent_1
      accent2: accent_2
      accent3: accent_3
      fromAdmin: from_admin
    }
  }
`

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
        showProDesign: show_pro_design
      }
    }
  }
`