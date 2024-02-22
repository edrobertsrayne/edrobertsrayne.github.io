let tailwindConfig =
  process.env.HUGO_FILE_TAILWIND_CONFIG_JS || "./tailwind.config.js";
const tailwind = require("tailwindcss")(tailwindConfig);
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your Hugo project
  content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
  // Include any special characters you're using in your class names here
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  // eslint-disable-next-line no-process-env
  plugins: [
    tailwind,
    ...(process.env.HUGO_ENVIRONMENT === "production"
      ? [autoprefixer, purgecss]
      : []),
  ],
};
