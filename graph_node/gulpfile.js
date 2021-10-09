var webpackConfig = require('./webpack.config.js');

var gulp = require('gulp');
var path = require('path');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var zip = require('gulp-zip');
var archiver = require('archiver');
var minimist = require('minimist');

var knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
};

var option = minimist(process.argv.slice(2), knownOptions);

var low = require('lowdb');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Q = require('q');
var crypto = require('crypto');
var projConfig = require('./proj.config.js');

var srcPath = __dirname + '/src/';
var distPath = __dirname + '/dist/';

const db = low('./db.json');
db.defaults({
  img: []
}).value();

const tinifyDb = low('./tinifydb.json');
tinifyDb.defaults({
  img: []
}).value();

/*
  for console
 */
var colors = require('colors/safe');

/*
  use for tasks
 */
var request = require('request');
var fs = require('fs');

function checkTaskFinish(restCount, callback){
  if(restCount === 0 && callback){
    callback();
  }
}

gulp.task('webpack', function(callback){
  webpack(webpackConfig, function(err, stats){
    if(err){
      throw new gutil.PluginError('webpack', error);
    }
    gutil.log('[webpack]', stats.toString());
    if(callback){
      callback();
    }
  });
});

gulp.task('webpack-dev-server', function(callback){
  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    //
  }).listen(8080, 'localhost', function(err){
    if(err){
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    if(callback){
      callback();
    }
  });
});

/*
  use for tinify image
 */
function tinifyImage(){
  var defferred = Q.defer();
  var promise = defferred.promise;
  var callback = function(){
    defferred.resolve();
  };
  var imgPath = srcPath + 'img/';
  gutil.log(colors.cyan('start tinify image...'));
  var tinify = require('tinify');
  tinify.key = 'm-b0v3QMxNAPzA82P7e0XcK9I_xEpVba';
  fs.access(imgPath, function(err){
    if(err){
      gutil.log(colors.red('Access illegal url: '+ imgPath));
    }else{
      fs.readdir(imgPath, function(err, files){
        if(err){
          gutil.log(colors.red('Cannot read url: '+ imgPath));
          return;
        }
        var fileCount = 0;
        var toTinifyImgNames = [];
        files.forEach(function(name, i){
          var extName = name.substr(name.lastIndexOf('.') + 1);
          if(name.indexOf('.') != 0 && extName == 'png'){
            fileCount++;
            toTinifyImgNames.push(name);
          }
        });
        checkTaskFinish(fileCount, callback);
        toTinifyImgNames.forEach(function(name, i){
          var filePath = imgPath + name;
          var rs = fs.createReadStream(filePath);
          var hash = crypto.createHash('md5');
          rs.on('data', hash.update.bind(hash));
          rs.on('end', function(){
            var md5 = hash.digest('hex');
            if(tinifyDb.get('img').find({
              md5: md5,
              name: name
            }).value()){
              gutil.log('already tinified: ' + name);
              checkTaskFinish(--fileCount, callback);
            }else{
              tinify.fromFile(filePath).toFile(filePath, function(err){
                if(err){
                  console.log(err);
                }else{
                  var rs = fs.createReadStream(filePath);
                  var hash = crypto.createHash('md5');
                  rs.on('data', hash.update.bind(hash));
                  rs.on('end', function(){
                    var md5 = hash.digest('hex');
                    tinifyDb.get('img').remove({
                      name: name
                    }).value();
                    tinifyDb.get('img').push({
                      md5: md5,
                      name: name
                    }).value();
                    db.write();
                    gutil.log(colors.green('tinify success: ' + name));
                    checkTaskFinish(--fileCount, callback);
                  });
                }
              });
            }
          });
        });
      });
    }
  });
  return promise;
}

/*
  use for upload image
 */
function uploadImg(callback){
  var imgPath = srcPath + 'img/';
  gutil.log(colors.cyan('start upload image...'));
  if(projConfig.useCDNImg){
    fs.access(imgPath, function(err){
      if(err){
        gutil.log(colors.red('Access illegal url: '+ imgPath));
      }else{
        fs.readdir(imgPath, function(err, files){
          if(err){
            gutil.log(colors.red('Cannot read url: '+ imgPath));
            return;
          }
          var fileCount = 0;
          var toUploadImgNames = [];
          files.forEach(function(name, i){
            var extName = name.substr(name.lastIndexOf('.') + 1);
            if(name.indexOf('.') != 0 && (extName == 'png' || extName == 'jpg')){
              fileCount++;
              toUploadImgNames.push(name);
            }
          });
          checkTaskFinish(fileCount, callback);
          toUploadImgNames.forEach(function(name, i){
            var filePath = imgPath + name;
            var rs = fs.createReadStream(filePath);
            var hash = crypto.createHash('md5');
            rs.on('data', hash.update.bind(hash));
            rs.on('end', function(){
              var md5 = hash.digest('hex');
              if(db.get('img').find({
                md5: md5,
                name: name
              }).value()){
                gutil.log('already uploaded: ' + name);
                checkTaskFinish(--fileCount, callback);
              }else{
                var r = request.post('http://10.187.139.235/util/upload.action', function optionalCallback(err, httpResponse, body) {
                  if(err){
                    gutil.log(colors.red('upload error: ' + name));
                    gutil.log(colors.red(err));
                  }
                  if(body){
                    var result = JSON.parse(body);
                    if(typeof result =='object'){
                      for(var filename in result){
                        db.get('img').remove({
                          name: filename
                        }).value();
                        db.get('img').push({
                          md5: md5,
                          name: filename,
                          url: result[filename]
                        }).value();
                        db.write();
                        gutil.log(colors.green('upload success: ' + name));
                        checkTaskFinish(--fileCount, callback);
                      }
                    }
                  }
                });
                var form = r.form();
                form.append('upload', fs.createReadStream(filePath));
                gutil.log('uploading: ' + name);
              }
            });
          });
        });
      }
    });
  }else{
    gulp.src(imgPath + '*.*')
      .pipe(gulp.dest(distPath + 'img/'))
      .on('finish', function(){
        callback();
      });
  }
}
gulp.task('uploadimg', function(callback){
  if(option.env === 'deploy'){
    tinifyImage().then(function(){
      uploadImg(callback);
    });
  }else{
    uploadImg(callback);
  }
});

var relatedPathReg = new RegExp('[\./]*img/', 'g');
var imgPathReg = new RegExp('[\./]*img/([^\\\)"\']*)', 'g');

function replaceCdn(srcPath, distPath){
  var defferred = Q.defer();
  var pipe = gulp.src(srcPath);
  if(projConfig.useCDNImg){
    pipe.pipe(replace(imgPathReg, function(s, filename){
      var imgFileName = s.replace(relatedPathReg, '');
      var imgUrlInfo = db.get('img').find({
        name: imgFileName
      }).value();
      if(imgUrlInfo && imgUrlInfo.url){
        return imgUrlInfo.url;
      }else{
        gutil.log(colors.red('Cannot find image: ' + imgFileName));
        return s;
      }
    }));
  }
  pipe.pipe(gulp.dest(distPath))
    .on('finish', function(){
      defferred.resolve();
      gutil.log('finish replace ' + srcPath);
    });
  return defferred.promise;
}

gulp.task('replace-cdn', ['webpack', 'uploadimg'], function(callback){
  var promiseList = [];
  fs.access(srcPath, function(err){
    if(err){
      gutil.log(colors.red('Access illegal url: '+ srcPath));
    }else{
      // repalce html files
      gutil.log(colors.cyan('start replace html image url...'));
      promiseList.push(replaceCdn(srcPath + '*.html', distPath));
      // replace css files
      gutil.log(colors.cyan('start replace css image url...'));
      promiseList.push(replaceCdn(srcPath + 'css/*.css', distPath + 'css/'));
      // replace js files
      gutil.log(colors.cyan('start replace js image url...'));
      promiseList.push(replaceCdn(distPath + 'js/*.js', distPath + 'js/'));
    }
    Q.allSettled(promiseList).then(function(){
      callback();
    });
  });
});

let exportFile = function(isDebug){
  var jsminDeferred = Q.defer();
  var cssminDeferred = Q.defer();
  let pipe = gulp.src(distPath + 'js/*.js');
  if(!isDebug){
    pipe.pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'));
  }
  pipe
    .pipe(gulp.dest(distPath + 'js/'))
    .on('finish', function(){
      jsminDeferred.resolve();
    });
  if(projConfig.mergeCss){
    cssminDeferred.resolve();
  }else{
    gulp.src(distPath + 'css/*.css')
      .pipe(minify())
      .pipe(gulp.dest(distPath + 'css/'))
      .on('finish', function(){
        cssminDeferred.resolve();
      });
  }
  return Q.allSettled([cssminDeferred, jsminDeferred]);
};

gulp.task('default', ['replace-cdn'], function(){
  if(option.env == 'deploy'){
    exportFile(false).then(function(){
      var output = fs.createWriteStream(path.resolve(__dirname, 'deploy.zip'));
      var archive = archiver('zip');
      archive.on('error', function(err){
        throw err;
      });
      archive.on('close', function(){
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        done();
      });
      archive.pipe(output);
      archive.glob('dist/**/*', {
        cwd: __dirname,
        ignore: ['**/*.map']
      }, {});
      archive.finalize();
    });
  }else{
    return exportFile(true);
  }
});