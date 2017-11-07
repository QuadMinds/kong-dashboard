var HomePage = require('../../util/home-page');
var Sidebar = require('../../util/sidebar');
var PluginPage = require('../../util/PluginPage');
var ListPluginsPage = require('../../util/list-plugins-page');
var KongDashboard = require('../../util/kong-dashboard-handler');
var Kong = require('../../util/KongClient');
var PropertyInput = require('../../util/PropertyInput');
var ObjectProperties = require('../../util/ObjectProperties');

var kd = new KongDashboard();

describe('File Log plugin testing', () => {

  beforeAll((done) => {
    kd.start({'--kong-url': 'http://127.0.0.1:8001'}, () => {
      done();
    });
  });

  afterAll((done) => {
    kd.stop(done);
  });

  beforeEach((done) => {
    Kong.deleteAllPlugins().then(done);
  });

  it("should error when path isn't set", (done) => {
    HomePage.visit();
    Sidebar.clickOn('Plugins');
    ListPluginsPage.clickAddButton();
    ObjectProperties.fillAndSubmit({'name': 'file-log'}).then(() => {
      expect(PropertyInput.isInvalid('config-path')).toBeTruthy();
      done();
    });
  });

});
