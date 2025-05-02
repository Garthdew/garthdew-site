module.exports = function(eleventyConfig) {
  // Debug: log all markdown files Eleventy sees
  eleventyConfig.addCollection("blog", function (collectionApi) {
    const allFiles = collectionApi.getAll();
    console.log("All input files:", allFiles.map(f => f.inputPath));

    const posts = collectionApi.getFilteredByGlob("./blog/**/index.md");
    console.log("Blog collection matches:", posts.map(f => f.inputPath));

    return posts;
  });

  // Allow passthrough of images inside blog folders (optional)
  eleventyConfig.addPassthroughCopy("blog/**/image.jpg");

  eleventyConfig.addPassthroughCopy("profile.jpg");

  return {
    dir: {
      input: ".",
      layouts: "_layouts",
      includes: "_includes", // ✅ This line was missing
      output: "_site"
    }
  };
};
