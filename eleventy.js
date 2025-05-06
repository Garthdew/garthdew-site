module.exports = function(eleventyConfig) {
  // Blog collection: any blog/**/index.md file
  eleventyConfig.addCollection("blog", function (collectionApi) {
    const allFiles = collectionApi.getAll();
    console.log("All input files:", allFiles.map(f => f.inputPath));

    const posts = collectionApi.getFilteredByGlob("./blog/**/index.md");
    console.log("Blog collection matches:", posts.map(f => f.inputPath));

    return posts;
  });

  // Passthrough for images inside blog folders (optional)
  eleventyConfig.addPassthroughCopy("blog/**/image.jpg");

  eleventyConfig.addPassthroughCopy("images");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    }
  };
};

git add .
git commit -m "Trigger rebuild for profile.jpg"
git push
