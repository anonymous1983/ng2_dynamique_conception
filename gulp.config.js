module.exports = function () {
    var config = {
        sass: {
            input: './src/sass/style.sass',
            output: './src/css'

        },
        allTs: './app/**/*.ts',
        tsOutputPath: './app/',
        indexSass: './src/sass/style.sass',
        allSass: './src/sass/**/*.sass',
        cssOutputPath: './src/css',
        build: {
            prod: {
                HREF: 'http://rsem-pic/dashboard/dashboard-v3/',
                LIB_PATH: 'lib',
                BOWER_PATH: 'bower_components',
                BASE_URL: '/dashboard/dashboard-v3/'
            },
            dev: {
                HREF: '/',
                LIB_PATH: 'node_modules',
                BOWER_PATH: 'bower_components',
                BASE_URL: '/'
            }


        }
    };

    return config;
}