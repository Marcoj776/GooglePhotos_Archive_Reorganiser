const fs = require('fs');
const path = require('path');

function filewalkAndDelete(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return console.log("done")//done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    results.push(file);

                    filewalkAndDelete(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (path.extname(file) === '.html') {
                        fs.unlinkSync(file)
                        console.log(file, " deleted")
                    }
                    if (path.extname(file) === '.json') {
                        fs.unlinkSync(file)
                        console.log(file, " deleted")
                    }
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

filewalkAndDelete("./", function(err, data){
  if(err){
      throw err;
  }
  console.log(data);
});

function filewalkAndmove(dir, done) {

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                if (stat && stat.isDirectory()) {
                    //console.log(stat)
                    filewalkAndmove(file, function(err, res){
                    });
                } /* else {
                    mvFile('D:\\Pictures\\GPhotos 2020 and before', file)
                } */
            });
        });
    });
};

function mvFile(topDir, _file) {
    if (path.basename(_file) == 'app.js' || path.basename(_file) == 'desktop.ini') {
        return
    }
    let parent = path.basename(path.dirname(_file))
    let newPath = path.resolve(topDir,parent,path.basename(_file))
    fs.rename(_file, newPath, (err) => {
        if (err) throw err;
      })
}

filewalkAndmove("./", function(err, data){
  if(err){
      throw err;
  }
  console.log(data);
});
