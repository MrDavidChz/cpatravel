$().ready(function(){
   $('#modal_dialog').css('width','101%');
});
 /**
  *Funcion para guardar los registros de proyectos utilizando a api correspondiente 
  *@param object [description ]
  *@return void
  */
    function save_register(object){

      var fomulario = $(object).attr('form');

        if (fomulario == 'form-proyectos') {

            var url = domain('proyecto/create');
            var fields = {
              'id_empresa'  : $('#id_empresa').val()
              ,'nombre'     : $('#nombre').val()
              ,'proyecto'   : $('#proyecto').val()
              ,'status'     : $('#status').val()
            }
            // se manda a llamar la funcion que se creo.
            create_register(url,fields,function(json){
              
                carga_vista_html('proyecto');

            });

        }
        if (fomulario == 'form-subproyectos') {

            var url = domain('subproyectos/create');
              var fields = {
                'id_proyecto'     : $('#id_proyecto').val(),
                'nombre'          : $('#sub_nombre').val(),
                'sub_proyecto'    : $('#sub_proyecto').val(),
                'status'          : $('#sub_status').val()
              }
              create_register(url,fields,function(json){
                  carga_vista_html('proyecto');

              });

        }
        if (fomulario == 'form-viajes') {
          
              var url = domain('viajes');
              var fields = {
                'id_proyecto'     : $('#id_proyecto').val(),
                'id_subproyecto'  : $('#id_subproyecto').val(),
                'nombre'          : $('#viaje_nombre').val(),
                'viaje'           : $('#viaje').val(),
                'status'          : $('#viaje_status').val()
              }
              create_register(url,fields,function(json){
                  carga_vista_html('proyecto');
              });
              
        }

    }
  /**
   *Funcion para la actualizacion de los datos de los proyectos, subproyectos y/o viajes
   *@return json
   */
   function actualizar(object){

      var fomulario = $(object).attr('form');

        if (fomulario == 'form-proyectos') {

            var url = domain('proyecto/actualizar');
            var fields = {
              'id_proyecto' : $('#id_proyecto').val()
              ,'nombre'     : $('#nombre').val()
              ,'proyecto'   : $('#proyecto').val()
              ,'status'     : $('#status').val()
            }
            // se manda a llamar la funcion que se creo.
            update_register(url,fields,function(json){
                carga_vista_html('proyecto','business/process');
            });

        }
        if (fomulario == 'form-subproyectos') {

            var url = domain('subproyectos/actualizar');
              var fields = {
                'id_subproyecto'  : $('#id_subproyecto').val()
                ,'nombre'          : $('#sub_nombre').val()
                ,'sub_proyecto'    : $('#sub_proyecto').val()
                ,'status'          : $('#sub_status').val()
              }
              update_register(url,fields,function(json){
                  carga_vista_html('proyecto','business/process');

              });

        }
        if (fomulario == 'form-viajes') {
          
              var url = domain('viajes/actualizar');
              var fields = {
                'id_viaje'        : $('#id_viaje').val()
                ,'nombre'          : $('#viaje_nombre').val()
                ,'viaje'           : $('#viaje').val()
                ,'status'          : $('#viaje_status').val()
              }
              update_register(url,fields,function(json){
                  carga_vista_html('proyecto','business/process');
              });
              
        }


   }
  /**
   *Funcion para mostrar el div de subproyectos
   *@param
   *@return
   */
   function show_div_subproyecto(object){

      $('#div_subproyecto').show('slow');
      $('#div_proyecto').hide('slow');
      $('#add-show').hide('slow');
      $('#add-show-viaje').show('slow');
   }
   /**
    *Funcion para la crear un subproyecto
    *@return void
    */
    function add_proyectos(){

      clear_values(['id_proyecto','id_subproyecto','id_viaje','nombre','proyecto','status']);
      $('.save_register').show('slow');
      $('.actualizar').hide('slow');

    }
   /**
    *Funcion para la crear un subproyecto
    *@return void
    */
    function add_subproyectos(){

      clear_values(['id_subproyecto','sub_nombre','sub_proyecto','sub_status']);
      show_div_subproyecto();
      $('.save_register').show('slow');
      $('.actualizar').hide('slow');

    }
    /**
     *Funcion para la agregar un viaje
     *@return void
     */
     function add_viajes(){

        show_div_viaje();
        clear_values(['id_viaje','viaje_nombre','viaje','viaje_status']);
        $('.save_register').show('slow');
        $('.actualizar').hide('slow');
      
    }
   /**
    *Funcion para mostrar y limpiar los datos de viajes
    *@param
    *@return void
    */
    function show_div_viaje(object){

        $('#div_viajes').show('slow');
        $('#div_proyecto').hide('slow');
        $('#div_subproyecto').hide('slow');
    
    }

  /**
   *Metodo para obtener el registro en particular de subproyecto
   *@param object
   *@return
   */
   function select_proyect(object){

      var id_proyecto = $(object).attr('id_proyecto');
      $('#id_proyecto').val(id_proyecto);
      var url = domain('proyecto/showById');
      var fields = {'id_proyecto' : id_proyecto}
      //se manda a llamar el metodo para la cnsulta de los datos
      detalles_register(url,fields,function(json){

          get_values(json.result);
          $('.nombre_proyecto').text( json.result.nombre );
          $('#add-show').show('slow');
          $('#div_proyecto').show('slow');
          $('#div_subproyecto').hide('slow');
          $('#div_viajes').hide('slow');
          $('.save_register').hide();
          $('.actualizar').show('slow');

      });

   }
   /**
    *Metodo donde se crea el subproyecto
    *@param object [ description ]
    *@return void
    */
    function select_subproyect( object ){

        var url = domain('subproyectos');
        var fields = {
          'id_subproyecto'  : $(object).attr('id_subproyecto'),
          'id_proyecto'     : $('#id_proyecto').val()
        }

        detalles_register(url,fields,function(json){

          var subproyectos = {
              'id_proyecto'     : json.result.id_proyecto
              ,'id_subproyecto' : json.result.id_subproyecto
              ,'sub_nombre'     : json.result.nombre
              ,'sub_proyecto'   : json.result.sub_proyecto
              ,'sub_status'     : json.result.status
          };
          get_values( subproyectos );
          $('.nombre_sub_proyecto').text(json.result.nombre);
          $('#add-show-viaje').show('slow');
          show_div_subproyecto();
          $('#div_proyecto').hide('slow');
          $('#div_viajes').hide('slow');

        });        

    }
    /**
     *Funcion para llamar los datos de los viajes
     *@param object  [description]
     *@return void
     */
     function select_viaje(object){

          var url = domain('viajes');
          var fields ={
            'id_viaje'       : $(object).attr('id_viaje')
            ,'id_proyecto'   : $('#id_proyecto').val()
            ,'id_subproyecto': $('#id_subproyecto').val()
          }

          detalles_register(url,fields,function(json){

                var viajes = {
                  'id_viaje'        : json.result[0].id_viaje
                  ,'viaje_nombre'   : json.result[0].nombre
                  ,'viaje'          : json.result[0].viaje
                  ,'viaje_status'   : json.result[0].status
                };               
                get_values(viajes);
                show_div_viaje();
                $('#div_proyecto').hide('slow');
                $('#div_subproyecto').hide('slow');
                $('.save_register').hide();
                $('.actualizar').show('slow');

          });

     }
    /**
     *Funcion para cargar el detalle del id_solicitud
     *@param object [description]
     *@return json
     */
     function detail_solicitud( id_solicitud ){

        //carga_vista_html('solicitud');
        $('#button_back_general').attr('disabled',false);
        $('#button_back_general').removeAttr('onclick');
        $('#button_back_general').attr('onclick','carga_vista_html("solicitud/pendientes")');
        var fields = {'id_solicitud': id_solicitud,'vista':'solicitud'};
        carga_vista_detalle(fields);


     }
     /**
      *Funcion para pintar los datos en el formulario
      *@param object [description]
      *@return void
      */
     function carga_vista_detalle( fields ){

        var url = domain(fields.vista);
        var data = {'id_solicitud': fields.id_solicitud};
         $('#button_back_general').attr('disabled',false);

          requestAjaxSend(url,data,function(json){
             loader_hide_msj();
             $('#container-views').html('');
             $('#container-views').html(json);
             $('#id_solicitud').val(fields.id_solicitud);
          },function(header){
                header.setRequestHeader("usuario",$('#id_usuario').val() );
                header.setRequestHeader("token", $('#token').val() );
                header.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
                loader_msj();
          },false,false,false,'GET',"HTML",false);


     }
   /**
    *Funcion de javascript para hacer el filtro del estatus.
    *@return json
    */
    function filtro_estatus(){

      var url = domain('solicitud/filtro'); //Web\SolicitudViajeController@filtro_estatus
      var fields = { 'estatus' : $('#filtro_estatus').val() };
      console.log('Registros enviados al controller '+url);
      console.log(fields);
      //se manda a llamar una funcion de ajax para hacer la consulta
      requestAjaxSend(url,fields,function(json){
              
              loader_hide_msj();
              $('#container-views').html('');
              $('#container-views').html(json);
              $('#filtro_estatus').val(fields.estatus);
          },function(header){
                header.setRequestHeader("usuario",$('#id_usuario').val() );
                header.setRequestHeader("token", $('#token').val() );
                header.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
                loader_msj();
          },false,false,false,'GET',"HTML",false);

    }
    /**
     *Funcion del grid de solicitudes para cancelar la solicitud
     *@param json [description]
     *@return html
     */
     function cancel_solicitud( fields ){

        //buildSweetAlertOptions( "Cancelar Solicitud", "¿Estas Seguro de Realizar esta accion?", function(){
            var url = domain('solicitud/cancel');
            //se manda a llamar una funcion del js master para la actualizacion del estatus
            update_register(url,fields,function(json){
                carga_vista_html('solicitud/pendientes','authorization');
            });


        //} );

     }