module.exports = {
  name: 'ember-select-2',

  included: function(app) {
    this._super.included(app);
 
    app.import(app.bowerDirectory + '/select2/select2.js');
    app.import(app.bowerDirectory + '/select2/select2.css');
    app.import(app.bowerDirectory + '/select2/select2.png', { destDir: 'assets' });
    app.import(app.bowerDirectory + '/select2/select2x2.png', { destDir: 'assets' });
    app.import(app.bowerDirectory + '/select2/select2-spinner.gif', { destDir: 'assets' });
  }
};
