module.exports = function(eleventyConfig) {
  // Collect all blog posts (folders with index.md)
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./blog/**/index.md");
  });

  // Copy images in blog post folders to _site
  eleventyConfig.addPassthroughCopy("blog/**/image.jpg");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    }
  };
};
