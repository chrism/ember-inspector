var ViewTreeItemController = Ember.ObjectController.extend({
  needs: ['viewTree'],

  hasView: Ember.computed.not('model.value.isVirtual'),
  hasElement: Ember.computed.not('model.value.isVirtual'),

  isCurrent: function() {
    return this.get('controllers.viewTree.pinnedObjectId') === this.get('model.value.objectId');
  }.property('controllers.viewTree.pinnedObjectId', 'model.value.objectId'),

  hasController: function() {
    return !!this.get('model.value.controller');
  }.property('model.value.controller'),

  hasModel: function() {
    return !!this.get('model.value.model');
  }.property('model.value.model'),

  modelInspectable: function() {
    return this.get('hasModel') && this.get('value.model.type') === 'type-ember-object';
  }.property('hasModel', 'value.model.type'),

  style: function() {
    return 'padding-left: ' + ((this.get('numParents') * 10) + 5) + 'px';
  }.property('numParents'),

  numParents: function() {
    var numParents = this.get('target.target.numParents');
    if (numParents === undefined) {
      numParents = -1;
    }
    return numParents + 1;
  }.property("target.target.numParents"),

  actions: {
    inspectView: function() {
      if (this.get('hasView')) {
        this.get('target').send('inspect', this.get('value.objectId'));
      }
    },
    inspectElement: function(objectId) {
      if (!objectId && this.get('hasElement')) {
        objectId = this.get('value.objectId');
      }

      if (objectId) {
        this.get('target').send('inspectElement', objectId);
      }
    },
    inspectModel: function(objectId) {
      if (this.get('modelInspectable')) {
        this.get('target').send('inspect', objectId);
      }
    }
  }

});

export default ViewTreeItemController;
