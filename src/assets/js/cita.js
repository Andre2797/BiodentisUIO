let frm = document.getElementById('formulario');
let eliminar = document.getElementById('btnEliminar');
let idedit = "";
let citasnew;
let citafacenew;

async function cita() {

  var request = new Request('https://biodentis.herokuapp.com/messenger/reservas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  var request2 = new Request('https://biodentis.herokuapp.com/messenger/citasFacebook', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const res = await (fetch(request));
  const citasinformato = await res.json();
  console.log("RESERVAS", citasinformato)
  const res2 = await (fetch(request2));
  const citasinformatoface = await res2.json();
  console.log("RESERVAS FACEBOOK", citasinformatoface)

  citasnew = citasinformato.map(item => {
    const cita = {};
    cita.title = item.motivo
    fechahora = new Date(item.fecha)

    console.log("fecha modificando..", fechahora)
    cita.start = fechahora
    return cita;
  })

  citafacenew = citasinformatoface.map(item => {
    const citaface = {}
    fecha = new Date(item.fecha)
    console.log(item)

    var arrarhora = []
    arrarhora = item.hora.split(":")

    console.log(arrarhora)
    fecha.setHours(arrarhora[0])
    fecha.setHours(fecha.getHours() - 5);
    fecha.setMinutes(arrarhora[1])
    console.log("nueva fecha", new Date(fecha).toUTCString())


    citaface.title = item.nombre
    citaface.start = fecha
    return citaface;
  })
  citafacenew.forEach(element => {
    citasnew.push(element)
  });
  console.log(citasnew)
  console.log(citafacenew)

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],

    header: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth, timeGridWeek, listWeek'
    },
    locale: 'es',
    timeZone: "America/Guayaquil",
    defaultView: 'dayGridMonth',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    dateClick: function (info) {
      /* frm.reset(); */
      /* eliminar.classList.add('d-none'); */

      console.log(citasinformato)
      document.getElementById('start').value = info.dateStr;
      document.getElementById('nombre').value;
      document.getElementById('apellido').value;
      document.getElementById('btnAccion').textContent = 'RESERVAR';
      document.getElementById('titulo').textContent = 'Registrar Cita';
      $("#modalAbandonedCart").modal('show');


    },

    eventClick: async function (info) {
      console.log(info.event.start)
      console.log(moment(info.event.start).format('YYYY-MM-DD HH:mm'))
      var request = new Request('https://biodentis.herokuapp.com/messenger/reservaedit/' + info.event.start, {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json'
        }

      });


      const res = await (fetch(request));
      const citasinformato = await res.json();
      console.log(moment(info.event.start).format('DD/MM/YYYY HH:mm'))
      console.log("RESERVA ID", citasinformato)
      idedit = citasinformato._id;
      document.getElementById('nombreedit').value = citasinformato.nombre;
      document.getElementById('apellidoedit').value = citasinformato.apellido;
      document.getElementById('titleedit').value = citasinformato.motivo;
      document.getElementById('startedit').value = moment(info.event.start).format('YYYY-MM-DDThh:mm')





      document.getElementById('btnAccionedit').textContent = 'MODIFICAR';
      document.getElementById('tituloedit').textContent = 'Actualizar Reserva';
      document.querySelector("#btnEliminaredit").classList.remove('d-none');
      $("#modalEdit").modal('show');

    },
    events: citasnew

  });

  calendar.render();
  document.querySelector("#formulario").addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const start = document.getElementById('start').value;
    const nombre = document.getElementById('nombre').value;
    console.log("NOMBRE EDIT", nombre)
    const apellido = document.getElementById('apellido').value;
    if (title == '' || start == '' || nombre == '' || apellido == '') {
      Swal.fire(
        'Avisos?',
        'Todo los campos son obligatorios',
        'warning'
      )
    } else {

      let bodyReserva = {

      }
      console.log("FECHA LOCALIZADA", moment(start.toLocaleString('ln', {
        timeZone: 'America/New_York'
      })).format('YYYY-MM-DD HH:mm'))
      bodyReserva.nombre = nombre;
      bodyReserva.apellido = apellido;
      bodyReserva.fecha = start.toLocaleString('ln', {
        timeZone: 'America/New_York'
      });
      bodyReserva.motivo = title;
      console.log("BODY FECHA", bodyReserva.fecha)

      var request = new Request('https://biodentis.herokuapp.com/messenger/crearReserva', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyReserva),
      });
      fetch(request).then(response => console.log(response))
        ;

      console.log(JSON.stringify(bodyReserva))
      $("#modalAbandonedCart").modal('hide');
      Swal.fire(
        'Cita Creada con exito',
        'Precione OK para continuar',
        'success'
      ).then(function () {
        location.reload();
    })

    }
  });

  document.querySelector("#formularioedit").addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('titleedit').value;
    const start = document.getElementById('startedit').value;
    const nombre = document.getElementById('nombreedit').value;
    const apellido = document.getElementById('apellidoedit').value;
    if (title == '' || start == '' || nombre == '' || apellido == '') {
      Swal.fire(
        'Avisos?',
        'Todo los campos son obligatorios',
        'warning'
      )
    } else {

      let bodyReserva = {

      }

      bodyReserva.nombre = nombre;
      bodyReserva.apellido = apellido;
      bodyReserva.fecha = start;
      bodyReserva.motivo = title;


      var request = new Request('https://biodentis.herokuapp.com/messenger/cambioDatosReserva/' + idedit, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyReserva),
      });
      fetch(request).then(response => console.log(response))
        ;
      $("#modalEdit").modal('hide');
      Swal.fire(
        'Cita Modificada con exito',
        'Precione OK para continuar',
        'success'
      ).then(function () {
        location.reload();
    })
      
      

      
    }
  });



  document.querySelector("#btnEliminaredit").addEventListener('click', function () {
    $("#modalEdit").modal('hide');
    Swal.fire({
      title: 'Advertencia?',
      text: "Esta seguro de eliminar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI. Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        var request = new Request('https://biodentis.herokuapp.com/messenger/eliminarReserva/' + idedit, {
          method: 'DELETE',

          headers: {
            'Content-Type': 'application/json'
          }
        });
        fetch(request).then(response => location.reload());


        
        
      }
      
    })
    
  });
  var selectsucu = document.getElementById('sucu');
  var idSucu='';
  var idOdo='';
  selectsucu.addEventListener('change',
    function () {
      var selectedOption = this.options[selectsucu.selectedIndex];
      console.log(selectedOption.value);
      idSucu=selectedOption.value
    });
    var selectodo = document.getElementById('odo');
    selectodo.addEventListener('change',
    function () {
      var selectedOption = this.options[selectsucu.selectedIndex];
      console.log(selectedOption.value);
      idOdo=selectedOption.value
    });
  document.querySelector("#btnAsistir").addEventListener('click', function () {
    document.querySelector("#formularioedit").addEventListener('click', (e) => {
      e.preventDefault();
      const title = document.getElementById('titleedit').value;
      const start = document.getElementById('startedit').value;
      const nombre = document.getElementById('nombreedit').value;
      const apellido = document.getElementById('apellidoedit').value;

      
      if (title == '' || start == '' || nombre == '' || apellido == '') {
        Swal.fire(
          'Avisos?',
          'Todo los campos son obligatorios',
          'warning'
        )
      } else {

        let bodyReserva = {

        }

        bodyReserva.nombre = nombre;
        bodyReserva.apellido = apellido;
        bodyReserva.fecha = start;
        bodyReserva.motivo = title;
        bodyReserva.sucursal=idSucu;
        bodyReserva.odontologo=idOdo;

        console.log(bodyReserva)
        var request = new Request('https://biodentis.herokuapp.com/messenger/crearCita', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyReserva),
        });
        fetch(request).then(response => console.log(response))
          ;
        $("#modalEdit").modal('hide');
        $("#modalAsistir").modal('show');
       
      }
    });
 

  });
};
module.exports = {cita};


