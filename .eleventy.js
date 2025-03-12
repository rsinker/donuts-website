const dayjs = require("dayjs");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

module.exports = function (config) {
    // Ensure the images/screenshots folder is copied to the output directory
    config.addPassthroughCopy("images/screenshots");

    // Add a shortcode to list all images in the images/screenshots directory
    config.addShortcode("listScreenshots", function () {
        const screenshotsDir = path.join(__dirname, "_site/images/screenshots");
        const files = fs.readdirSync(screenshotsDir);
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

        return images.map(image => `<img src="/images/screenshots/${image}" alt="${image}">`).join("");
    });

    config.addDataExtension("yaml", (contents) => yaml.load(contents));

    // Pass-through images
    config.addPassthroughCopy("./_site/images");

    // Add Date filters
    config.addFilter("date", (dateObj) => {
        return dayjs(dateObj).format("MMMM D, YYYY");
    });

    config.addFilter("sitemapDate", (dateObj) => {
        return dayjs(dateObj).toISOString();
    });

    config.addFilter("year", () => {
        return dayjs().format("YYYY");
    });

    // Add pages collection
    config.addCollection("pages", function (collections) {
        return collections.getFilteredByTag("page").sort(function (a, b) {
            return a.data.order - b.data.order;
        });
    });

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: "_site",
            data: "_data",
            includes: "_includes",
            layouts: "_layouts",
            output: "dist",
        },
    };
};
