import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import SEOHead from '../components/seo-head'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import Input from '../components/input'

const BlogIndex = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const posts = get(props, 'data.allContentfulBlogPost.nodes')

  const filteredPosts = posts.filter(p => {
    return (
      p.title.toLowerCase().includes(searchQuery) ||
      p.tags.join('').toLowerCase().includes(searchQuery)
    )
  })

  return (
    <Layout location={props.location}>
      <Hero title="Blogs" />
      <Input onChange={(e) => setSearchQuery(e.target.value?.toLowerCase())}/>
      <ArticlePreview posts={filteredPosts} />
    </Layout>
  )
}

export default BlogIndex

export const Head = () => {
  return <SEOHead title="Blog" />
}

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
  }
`
