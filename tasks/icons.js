var yaml    = require('js-yaml');
var read    = require('fs').readFileSync;
var easysvg = require('easy-svg');

function icons (deferred, previous, ctx) {

    var sitedata = yaml.safeLoad(read(ctx.path.make('easy-svg.yml'), 'utf8'));

    /**
     * SVG icons used on the site, but not in yaml
     * // todo -  crossbow plugin to build a manifest of each icon used
     * @type {string[]}
     */
    var globals  = [
        'logo', 'wordmark', 'github', 'twitter', 'circle-play', 'code', 'menu', 'list', 'cross',
        'slack',
        'evo-1', 'evo-2', 'evo-3',
        'typeface-reg', 'typeface-bold', 'typeface-thin',
        'logo-rotate','logo-recolour','logo-distort','logo-alter', 'logo-multiply', 'logo-outline'
    ];

    /**
     * Create file paths for each
     * @type {Array}
     */
    var usedsvgs = sitedata.icons
        .map(function (item) { return item.icon; })
        .concat(globals)
        .map(function (item) { return "img/svg/" + item + ".svg" });

    ctx.vfs.src(usedsvgs)
        .pipe(easysvg.stream())
        .pipe(ctx.vfs.dest("img/icons"))
        .on('end', deferred.resolve)
        .on('error', deferred.reject);
}

module.exports.tasks = [icons];
