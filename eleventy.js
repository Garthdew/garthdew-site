module.exports = function(eleventyConfig) {
  // Collect blog posts from folders (e.g., blog/blog1/index.md)
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./blog/**/index.md");
  });

  // Allow passthrough of images inside blog folders (optional)
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
