require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Gatsby Contentful Starter",
    description: "Official Contentful Gatsby Starter",
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        host: process.env.CONTENTFUL_HOST
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
          name: 'pages',
          engine: 'flexsearch',
          query: `
            query {
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
          `,
          ref: 'slug',
          index: ['title', 'tags'],
          store: ['title', 'tags', 'publishDate', 'description', 'layout', 'placeholder', 'width', 'height'],
          normalizer: ({ data }) =>
          data.allContentfulBlogPost.nodes.map(node => ({
              title: node.title,
              slug: node.slug,
              publishDate: node.publishDate,
              tags: node.tags,
              description: node.description.raw,
              layout: node.heroImage.gatsbyImage.layout,
              placeholder: node.heroImage.gatsbyImage.placeholder,
              width: node.heroImage.gatsbyImage.width,
              height: node.heroImage.gatsbyImage.height,
          })),
      }
    },
  ],
};
