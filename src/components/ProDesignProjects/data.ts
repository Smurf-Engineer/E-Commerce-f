/**
 * ProDesignProjects Queries
 */

import gql from 'graphql-tag'

export const getProDesignProjects = gql`
  query getProDesignProjects(
      $limit: Int,
      $offset: Int,
      $order: String,
      $orderAs: String
    ) {
      projectsResult: getProDesignProjects(
        limit: $limit,
        offset: $offset,
        order: $order,
        orderAs: $orderAs
      ) {
      fullCount
      projects {
        id
        createdAt: created_at
        name
        updatedAt: updated_at
        status
        totalNotifications: total_notifications
        designs {
          shortId: short_id
          notifications
        }
      }
    }
  }
`
