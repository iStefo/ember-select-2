import Ember from 'ember';
import config from '../config/environment';

var ApplicationController = Ember.Controller.extend({
	version: config.version
});

export default ApplicationController;