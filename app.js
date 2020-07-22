var app=new Vue({
     el:'#root',
	data:
	{
     showingModal:false,
     showingEditModal:false,
     showingDltModal:false,
     SuccessMessage:"some successMessage",
      ErrorMessage:"some errorMessage",
      users:[],
      newUser:{username:"",email:"",mobile:""},
      clickUser:{}

	},
	mounted: function(){
		this.getAllUsers();

	},
	methods:{
               getAllUsers: function()
               {

               	axios.get("http://localhost/vuephpcrud/api.php?action=read")
               	.then(function(response){

               		if(response.data.error)
               		{
               			app.ErrorMessage=response.data.error;
               		}
               		else
               		{
               			app.users=response.data.users;

               			
               			 
               		}

               	});
               },

               selectUser: function(user)
               {
                    app.clickUser=user;
               },

               saveUser:function()
               {
                      var formdata=app.toFormData(app.newUser);

                    axios.post("http://localhost/vuephpcrud/api.php?action=create",formdata)
                    .then(function(response){

                         app.newUser={uername:"",email:"",mobile:" "};

                         if(response.data.error)
                         {
                              app.ErrorMessage=response.data.error;
                         }
                         else
                         {
                              app.getAllUsers();

                              
                               
                         }

                    });

               },

                updateUser:function()
               {   
                      var formdata=app.toFormData(app.clickUser);

                    axios.post("http://localhost/vuephpcrud/api.php?action=update",formdata)
                    .then(function(response){

                         app.clickUser={};

                         if(response.data.error)
                         {
                              app.ErrorMessage=response.data.error;
                         }
                         else
                         {
                              app.SuccessMessage=response.data.message;
                              app.getAllUsers();

                              
                               
                         }

                    });

               },


           deleteUser:function()
                  {   
                   
                      var formdata=app.toFormData(app.clickUser);
                    axios.post("http://localhost/vuephpcrud/api.php?action=delete",formdata)
                    .then(function(response){

                         app.clickUser={};

                         if(response.data.error)
                         {
                              app.ErrorMessage=response.data.error;
                         }
                         else
                         {
                              app.SuccessMessage=response.data.message;
                              app.getAllUsers(); 
                               
                         }

                    });

               },
               toFormData:function(obj)
               {
                    var form_data=new FormData();
                    for(var key in obj)
                    {
                     form_data.append(key,obj[key]);
                    }
                    return form_data;
               }

	}
});