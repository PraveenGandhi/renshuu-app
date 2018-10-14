const { RawPlugin,FuseBox, HTMLPlugin,CSSPlugin, EnvPlugin, UglifyESPlugin, WebIndexPlugin } = require("fuse-box");
const { src, task } = require("fuse-box/sparky");
var TypeHelper = require('fuse-box-typechecker').TypeHelper
var autoLoadAureliaLoaders =function() {
    var loader = function(){}
    loader.prototype.init = function(context) {}
    loader.prototype.bundleEnd = function(context) {
        context.source.addContent(`FuseBox.import("fuse-box-aurelia-loader")`);
        context.source.addContent(`FuseBox.import("aurelia-bootstrapper")`);
        // context.source.addContent(`FuseBox.import("socket-io-client")`);
    }
    return new loader();
}
task('typechecker', () => {
    var testWatch = TypeHelper({
        tsConfig: './tsconfig.json',
        name: 'Seed',
        basePath: './',
        tsLint: './tslint.json',
        shortenFilenames: true,
        yellowOnLint: true,
    })
    testWatch.runWatch('./src')
    return true;
});
let run = (production) => {
    let env = {
        FB_AU_LOG: !production,
        devMode: !production
    }
    const fuse = FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target:"browser@es6",
        runAllMatchedPlugins: true,
        plugins: [
            autoLoadAureliaLoaders(),
            production && UglifyESPlugin(),
            CSSPlugin(),
            EnvPlugin(env),
            HTMLPlugin(),
            RawPlugin(['.css', '.woff','.png']),
            WebIndexPlugin({template:'./index.html'})
        ]
    });
    fuse.register('aurelia-semantic-ui', {
        homeDir: 'node_modules/aurelia-semantic-ui/dist/commonjs',
        main: 'index.js',
        instructions: '**/*.{html,css,js}'
    });
    fuse.register('semantic-ui', {
        homeDir: 'node_modules/semantic-ui/dist',
        main: 'semantic.min.js',
        instructions: '**/*.{js}'
    });
    fuse.register('jquery-nicescroll', {
      homeDir: 'node_modules/jquery.nicescroll/dist',
      main: 'jquery.nicescroll.min.js',
      instructions: '+jquery.nicescroll.min.js +zoomico.png'
    });

    fuse.register('socket-io-client', {
        homeDir: 'node_modules/socket.io-client/dist',
        main: 'socket.io.js',
        instructions: '+socket.io.js'
      });
    fuse.bundle("vendor")
        .cache(true)
        .instructions(` 
        + @feathersjs/client
        + fuse-box-css
        + aurelia-bootstrapper
        + fuse-box-aurelia-loader
        + aurelia-framework
        + aurelia-pal-browser
        + aurelia-logging-console
        + aurelia-templating-binding
        + aurelia-templating-resources
        + aurelia-event-aggregator
        + aurelia-history-browser
        + aurelia-templating-router
        + aurelia-semantic-ui
        + jquery-nicescroll
        + socket-io-client`)
        .alias({
            'jQuery': 'jquery'
        })
        .shim({
            jquery: {
                source: 'node_modules/jquery/dist/jquery.js',
                exports: '$'
            }
        });
    if (!production) {
        fuse.bundle('app')
            .watch().hmr({reload : true})
            .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css}]
        `);
        fuse.dev();

    } else {
        fuse.bundle('app')
            .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css}]
        `);
    }
    fuse.run();
};
task('clean', async () => await src('dist/*').clean('dist').exec());
task('copy', async () => {
  await src('./semantic/dist/semantic.min.css').dest('./dist').exec();
  await src('./semantic/dist/themes/default/assets/**').dest('./dist').exec();
});
task("dev",  ['clean','copy'
//, 'typechecker'
], () => run(false));
task("prod", ['clean','copy'], () => run(true));