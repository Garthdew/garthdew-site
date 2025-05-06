module.exports = function(eleventyConfig) {
  // Blog collection: any blog/**/index.md file
  eleventyConfig.addCollection("blog", function (collectionApi) {
    const allFiles = collectionApi.getAll();
    console.log("All input files:", allFiles.map(f => f.inputPath));

    const posts = collectionApi.getFilteredByGlob("./blog/**/index.md");
    console.log("Blog collection matches:", posts.map(f => f.inputPath));

    return posts;
  });

  // Passthrough for all common blog images
  eleventyConfig.addPassthroughCopy("blog/**/*.{jpg,jpeg,png,webp,gif}");

  eleventyConfig.addPassthroughCopy({ "static": "/" });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    }
  };
};
