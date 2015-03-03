module.exports = {
  name: 'ember-select-2',

  included: function(app) {
    this._super.included(app);

    var config = this.project.config(app.env);
    var includeSelect2Assets = (
      config.includeSelect2Assets === undefined || config.includeSelect2Assets
    );

    app.import(app.bowerDirectory + '/select2/select2.js');

    if (includeSelect2Assets) {
      app.import(app.bowerDirectory + '/select2/select2.css');
      app.import(app.bowerDirectory + '/select2/select2.png', { destDir: 'assets' });
      app.import(app.bowerDirectory + '/select2/select2x2.png', { destDir: 'assets' });
      app.import(app.bowerDirectory + '/select2/select2-spinner.gif', { destDir: 'assets' });
    }
  }
};
