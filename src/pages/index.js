import React from 'react'
import { graphql } from 'gatsby'
// import get from 'lodash/get'

import SEOHead from '../components/seo-head'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import Input from '../components/input'
import { useFlexSearch } from 'react-use-flexsearch';

const unFlattenResults = results =>
  results.map(post => {
      const { title, slug, tags, publishDate, description, layout, placeholder, width, height } = post;
      return { title, slug, publishDate, tags, heroImage: { gatsbyImage: { layout, placeholder, width, height } }, description: { raw: description } };
  });

const isBrowser = () => typeof window !== "undefined"

const BlogIndex = ({
  data: {
    localSearchPages: { index, store },
    allContentfulBlogPost: { nodes },
    location
},
}) => {
  const { search } = isBrowser() ? window.location : { search: '' };
  const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = React.useState(query || '');
  
  const results = useFlexSearch(searchQuery, index, store);
  const posts = searchQuery ? unFlattenResults(results) : nodes

  return (
    <Layout location={location}>
      <Hero title="Blogs" />
      <Input searchQuery={searchQuery} onChange={(e) => setSearchQuery(e.target.value?.toLowerCase())}/>
      <ArticlePreview posts={posts} />
    </Layout>
  )
}

export default BlogIndex

export const Head = () => {
  return <SEOHead title="Blog" />
}

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
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
