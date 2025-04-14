const { notify } = require("jquery");

define([
  "core/js/adapt",
  "core/js/notify"
  
], function(Adapt, Notify) {
   
  const notifyView = Backbone.View.extend({  
    
   
    className:'notify',
    
    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);      
      this.render();
    },
    render: function() {    
     
      _.defer(this.postRender.bind(this));
    },

    postRender: function() {
      // this.$el.parents('.component').addClass('has-notify');
      const data = this.model.toJSON();    
      document.addEventListener('click',function(event){
        const clickedItem = event.target.closest(".notify");
        if (clickedItem){
          return  notifyView.prototype.showNotify(data,event.target);
        }
      }); 
      $(".notify").on('click',function(e){
        notifyView.prototype.showNotify(data,e);
      }) ;
      
      
     
    },
    showNotify:function(data,e){
      data = data["_notifyAnywhere"];

      data.forEach(element => {
        if(element.id != e.id){

        }else{
          let popObject ={
            title:"",
            body:""
          }
          popObject.title =element.title;
          popObject.body = element.body;

          Notify.popup(popObject);
        }
      });
    }
    
  }); 
  Adapt.on('componentView:postRender', function (view) {
    const notify = view.model.get('_notifyAnywhere');

    if (!notify) return;

    new notifyView({
      model: view.model
     
    });
  });
 
});