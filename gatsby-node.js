/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/posts${node.frontmatter.slug}`,
      component: path.resolve('./src/components/postLayout.js'),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
