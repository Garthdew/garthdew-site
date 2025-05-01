module.exports = function(eleventyConfig) {
  // Debug: log all markdown files Eleventy sees
  eleventyConfig.addCollection("blog", function (collectionApi) {
    const allFiles = collectionApi.getAll();
    console.log("All input files:", allFiles.map(f => f.inputPath));

    const posts = collectionApi.getFilteredByGlob("./blog/**/index.md");
    console.log("Blog collection matches:", posts.map(f => f.inputPath));

    return posts;
  });

  // Allow images to be passed through from blog folders (optional)
  eleventyConfig.addPassthroughCopy("blog/**/image.jpg");

  return {
    dir: {
  input: ".",
  layouts: "_layouts",
  output: "_site"
  }
  };
};
