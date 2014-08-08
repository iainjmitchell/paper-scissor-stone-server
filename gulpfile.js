var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	git = require('gulp-git'),
	qunit = require('gulp-qunit');

gulp.task('test', function () {
	var mochaRun = mocha({
			reporter: 'nyan',
			ui: 'bdd'
		});

	return gulp
		.src('test/**/*.js')
		.pipe(mochaRun);
});

qunit = require('gulp-qunit');

gulp.task('public-test', function() {
    return gulp.src('./public-test/**/*.html')
        .pipe(qunit());
});

gulp.task('push', ['test'], function(){
	var commitMessage = gulp.env.m || 'refactoring Yo!';
	console.log('Tests passed! Pushing code...');
	return gulp
		.src('./.')
		.pipe(git.add())
		.pipe(git.commit(commitMessage))
		.pipe(git.push());
});

gulp.task('deploy', ['test'], function(){
	console.log('Tests passed! Deploying...');
	return gulp
		.src('./.')
		.pipe(git.push('heroku'));
});

gulp.task('default', function(){
	gulp.run('push');
});