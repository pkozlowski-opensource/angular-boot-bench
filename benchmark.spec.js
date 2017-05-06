var benchpress = require('@angular/benchpress');
var runner = new benchpress.Runner([
  //use protractor as Webdriver client
  benchpress.SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS,
  //use RegressionSlopeValidator to validate samples
  {provide: benchpress.Validator, useExisting: benchpress.RegressionSlopeValidator},
  //use 10 samples to calculate slope regression
  {provide: benchpress.RegressionSlopeValidator.SAMPLE_SIZE, useValue: 20},
  //use the script metric to calculate slope regression
  {provide: benchpress.RegressionSlopeValidator.METRIC, useValue: 'scriptTime'},
  {provide: benchpress.Options.FORCE_GC, useValue: true}
]);

describe('deep tree baseline', function() {
  it('should be fast!', function(done) {
    //Tells protractor this isn't an Angular 1 application
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:5000/');
    /*
     * Tell benchpress to click the buttons to destroy and re-create the tree for each sample.
     * Benchpress will log the collected metrics after each sample is collected, and will stop
     * sampling as soon as the calculated regression slope for last 20 samples is stable.
     */
    runner.sample({
      id: 'load',
      execute: function() {
        /*
         * Will call querySelector in the browser, but benchpress is smart enough to ignore injected
         * script.
         */
        $('#show').click();
        $('#hide').click();
      },
      providers: []
    }).then(done, done.fail);
  });
});