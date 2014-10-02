
(function () {

  var ThemableFormBuilder = function () {
    Formbuilder.prototype.constructor.apply(this, arguments);
    this.providers = {
      'bootstrap3': {},
      'debug': {}
    };
    this.mainView.undelegateEvents();
    var nuEvents = _.assign(this.mainView.events, {
      'click .js-preview-form': _.bind(this.previewForm, this)
    });
    this.mainView.delegateEvents(nuEvents);
  };

  ThemableFormBuilder.prototype = Object.create(Formbuilder.prototype);

  ThemableFormBuilder.prototype.previewForm = function () {
    var view = this.mainView;
    view.saveForm();
    var fields = view.collection.toJSON();
    this.export(fields, 'bootstrap3');
  };

  ThemableFormBuilder.prototype.export = function (fields, themeName) {
    if (this.providers[themeName]) {
      var html = this.buildForm(themeName, fields);
      var nuWindow = window.open('', _.uniqueId('preview_'), "left=300, top=0, width=700, height=600, location=no");
      nuWindow.document.open();
      nuWindow.document.write(html);
      nuWindow.document.close();
    }
  };

  ThemableFormBuilder.prototype.buildForm = function (themeName, fields) {
    var html = '';
    var renderFields = function (fields) {
      return _.map(fields, function (field) {
        field.field_id = _.uniqueId('f_');
        var fieldtype = field.field_type;
        fieldtype = 'text'; // testing
        var tpl = [themeName, 'fields', fieldtype].join('/');
        return Formbuilder.themes[tpl](field);
      });
    };
    switch (themeName) {
      case 'debug':
        html = '<h1>Debug View</h1>';
        html += '<pre><code>' + JSON.stringify(fields, null, 2) + '</code></pre>';
        break;
      default:
        html = Formbuilder.themes['page']({
          current_theme: themeName,
          layout: 'layout-1col',
          form_fields: renderFields(fields)
        });
        break;
    }
    return html;
  };

  window.ThemableFormBuilder = ThemableFormBuilder;


}.call(this));

