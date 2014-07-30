var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	git = require('gulp-git');

gulp.task('test', function () {
	var mochaRun = mocha({
			reporter: 'nyan',
			ui: 'tdd'
		});

	return gulp
		.src('test/**/*.js')
		.pipe(mochaRun);
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

gulp.task('default', function(){
	gulp.run('push');
});