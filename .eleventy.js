const sass = require('./config/sass-process');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItTocDoneRight = require('markdown-it-toc-done-right');
const markdownItClass = require('@toycode/markdown-it-class');

module.exports = config => {
    //Watching sass directory
    sass('./sass/main.scss', './_site/style/index.css');

    //Passing assets as is to _site directory
    const assets = [
        'medias',
        'script'
    ]
    assets.forEach(asset => config.addPassthroughCopy(asset));

    //Markdown settings with plugins
    const uslugify = s => require('uslug')(s);
    config.setLibrary('md', markdownIt ({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        slugify: uslugify,
        level: [1, 2]
    }).use(markdownItTocDoneRight, {
        slugify: uslugify,
        listType: 'ul',
        level: [1, 2],
        containerClass: 'auto-toc'
    }).use(markdownItClass, {
        h1: 'anchors',
        h2: 'anchors'   
    }));

    //Shortcodes
    //None for now...

    config.setWatchJavaScriptDependencies(false);

    return {
        dir: {
            input: '.',
            output: '_site'
        },
        pathPrefix: '/',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', 'liquid']
    }
}