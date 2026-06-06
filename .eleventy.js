module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("dateDisplay", function(dateObj) {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("isoDate", function(dateObj) {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};