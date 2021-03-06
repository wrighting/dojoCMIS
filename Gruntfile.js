module.exports = function (grunt) {
	grunt.loadNpmTasks('intern-geezer');

	var req = (function () {
		this.dojoConfig = {
			async: true,
			baseUrl: __dirname,
			packages: [
				{ name: 'intern', location: 'node_modules/intern-geezer' },
				{ name: 'when', location: 'node_modules/when', main: 'when' },
				{ name: 'dojo', location: 'node_modules/intern-geezer/node_modules/dojo' },
				{ name: 'wrighting', location: './src/main/resources/wrighting' }
			],
			map: {
				'*': {
					'intern/dojo': 'intern/node_modules/dojo'
				}
			}
		};
		require('intern-geezer/node_modules/dojo/dojo');
		return this.require;
	})();

	grunt.initConfig({
		intern: {
			local: {
				options: {
					runType: 'runner',
					config: 'dojoCMIS/src/grunt/tests/intern.local',
					reporters: ['runner']
				}
			},
			remote: {
				options: {
					runType: 'runner',
					config: 'dojoCMIS/src/grunt/tests/intern',
					reporters: ['runner']
				}
			},
			proxy: {
				options: {
					runType: 'runner',
					proxyOnly: true,
					config: 'src/grunt/tests/intern.proxy',
					reporters: ['runner']
				}
			},
			node: {
				options: {
					runType: 'client',
					config: 'dojoCMIS/src/grunt/tests/intern',
					reporters: ['console']
				}
			}
		}
	});

	var servicesServer;
	grunt.registerTask('proxy', function () {
		var done = this.async();
		req(['dojoCMIS/src/grunt/tests/services/main'], function (services) {
			services.start().then(function (server) {
				servicesServer = server;
				done(true);
			});
		});
	});

	grunt.registerTask('test', function (target) {
		if (!target || target === 'coverage') {
			target = 'remote';
		}

		function addReporter(reporter) {
			var property = 'intern.' + target + '.options.reporters',
				value = grunt.config.get(property);

			if (value.indexOf(reporter) !== -1) {
				return;
			}

			value.push(reporter);
			grunt.config.set(property, value);
		}
		if (this.flags.coverage) {
			addReporter('lcovhtml');
		}

		if (this.flags.console) {
			addReporter('console');
		}

		if (target !== 'node') {
			grunt.task.run('proxy');
		}
		grunt.task.run('intern:' + target);
	});
};

