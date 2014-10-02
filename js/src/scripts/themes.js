
(function () {

  var ThemableFormBuilder = function () {
    Formbuilder.prototype.constructor.apply(this, arguments);
    this.providers = {
      'bootstrap3': {},
      'debug': {}
    };
  };

  ThemableFormBuilder.prototype = Object.create(Formbuilder.prototype);

  ThemableFormBuilder.prototype.export = function (fields, themeName) {
    if (this.providers[themeName]) {
      var html = this.buildForm(themeName, fields);
      html = html + '<pre><code>' + JSON.stringify(fields, null, 2)+ '</code></pre>';
      var nuWindow = window.open('', _.uniqueId('preview_'), "width=700, height=600, location=no");
      nuWindow.document.open();
      nuWindow.document.write(html);
      nuWindow.document.close();
    }
  };

  ThemableFormBuilder.prototype.buildForm = function (themeName, fields) {
    return '<h1>Hello World</h1>';
  };

  window.ThemableFormBuilder = ThemableFormBuilder;


}.call(this));

