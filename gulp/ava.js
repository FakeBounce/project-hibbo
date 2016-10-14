import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('ava', done => {
  childProcess
    .spawn('npm.cmd', ['run', 'ava'], { stdio: 'inherit' })
    .on('close', done);
});
