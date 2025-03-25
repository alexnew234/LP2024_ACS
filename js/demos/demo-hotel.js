/*
Name: 			Hotel
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	12.0.0
*/

(($ => {
    // Slider
    $('#revolutionSlider').revolution({
		sliderType: 'standard',
		sliderLayout: 'fullwidth',
		delay: 5000,
		gridwidth: 1170,
		gridheight: 530,
		spinner: 'off',
		disableProgressBar: 'on',
		parallax:{
			type:"on",
			levels:[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85],
			origo:"enterpoint",
			speed:400,
			bgparallax:"on",
			disable_onmobile:"off"
		},
		navigation: {
			keyboardNavigation:"off",
			keyboard_direction: "horizontal",
			mouseScrollNavigation:"off",
			onHoverStop:"on",
			touch:{
				touchenabled:"on",
				swipe_threshold: 75,
				swipe_min_touches: 1,
				swipe_direction: "horizontal",
				drag_block_vertical: false
			},
			bullets: {
				enable:true,
				hide_onmobile:true,
				hide_under:778,
				style:"uranus",
				tmp: '<span class="tp-bullet-inner"></span>',
				hide_onleave:false,
				direction:"horizontal",
				h_align:"center",
				v_align:"bottom",
				h_offset:0,
				v_offset:45,
				space:7
			}
		}
	});

    // Header
    const $headerWrapper = $('#headerBookNow');

    if( $(window).width() > 991 ) {
		$headerWrapper.on('mousedown', () => {
			$headerWrapper.addClass('open');
		});

		$(document).mouseup(({target}) => {
			if (!$headerWrapper.is(target) && $headerWrapper.has(target).length === 0 && !$(target).parents('.datepicker').get(0)) {
				$headerWrapper.removeClass('open');
			}
		});
	}






    // DatePicker
// Inicialización de los campos de fecha de llegada y salida en el formulario
	// Asegúrate de que la configuración del idioma esté correcta
	$.fn.datepicker.dates['es'] = {
		days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy",
		clear: "Borrar",
		format: "dd/mm/yyyy",
		titleFormat: "MM yyyy",
		weekStart: 1
	};

	// Inicialización de los campos de fecha de llegada y salida en el formulario
	$('#bookNowArrival, #bookNowDeparture').datepicker({
		autoclose: true,
		language: 'es',  // Aquí se fuerza el idioma español
		format: 'dd/mm/yyyy',
		orientation: 'bottom left',
		container: '#bookFormDetails',
		startDate: "today",  // Fecha mínima (hoy)
		todayHighlight: true  // Resalta el día de hoy
	}).on('changeDate', function(e) {
		// Elimina el resaltado del día actual al seleccionar una nueva fecha
		$('.datepicker-days .today').removeClass('today');

		// Resalta el rango de fechas entre la llegada y la salida
		var arrivalDate = $('#bookNowArrival').datepicker('getDate');
		var departureDate = $('#bookNowDeparture').datepicker('getDate');

    // Si ambas fechas están seleccionadas
    if (arrivalDate && departureDate) {
        var rangeStart = new Date(arrivalDate);
        var rangeEnd = new Date(departureDate);

        // Limpia las fechas anteriores resaltadas
        $('.datepicker-days td').removeClass('highlighted');

        // Recorre todos los días del calendario y resalta los días dentro del rango
        $('.datepicker-days td').each(function() {
            var currentCell = $(this);
            var currentDate = new Date(currentCell.data('date')); // Recupera la fecha de cada celda

            // Compara si la fecha actual está dentro del rango de estancia
            if (currentDate >= rangeStart && currentDate <= rangeEnd) {
                currentCell.addClass('highlighted'); // Resalta la celda
            }
        });
    }

    // Validación de fechas: no permitir salida antes de la llegada
    if (arrivalDate && departureDate && departureDate < arrivalDate) {
        alert('La fecha de salida no puede ser anterior a la fecha de llegada.');
        $('#bookNowDeparture').datepicker('setDate', null); // Limpia la fecha de salida
    }
});



// Inicialización de los campos de fecha de llegada y salida en el encabezado
$('#bookNowArrivalHeader, #bookNowDepartureHeader').datepicker({
    autoclose: true,
    language: 'es',  // Aquí también se fuerza el idioma español
    format: 'dd/mm/yyyy',
    orientation: 'bottom left',
    container: '#header',  // Contenedor del encabezado
    startDate: "today",  // Fecha mínima (hoy)
    todayHighlight: true  // Resalta el día de hoy
}).on('changeDate', function(e) {
    // Elimina el resaltado del día actual al seleccionar una nueva fecha
    $('.datepicker-days .today').removeClass('today');

    // Obtiene las fechas seleccionadas de llegada y salida
    var arrivalDate = $('#bookNowArrivalHeader').datepicker('getDate');
    var departureDate = $('#bookNowDepartureHeader').datepicker('getDate');

    // Validación de la fecha de llegada: no permitir que sea anterior a hoy
    if (arrivalDate && arrivalDate < new Date()) {
        alert('La fecha de llegada no puede ser anterior a la fecha actual.');
        $('#bookNowArrivalHeader').datepicker('setDate', null); // Limpia la fecha de llegada
        return; // Salir de la función para evitar que se siga ejecutando
    }

    // Si ambas fechas están seleccionadas
    if (arrivalDate && departureDate) {
        var rangeStart = new Date(arrivalDate);
        var rangeEnd = new Date(departureDate);

        // Limpia las fechas anteriores resaltadas
        $('.datepicker-days td').removeClass('highlighted');

        // Recorre todos los días del calendario y resalta los días dentro del rango
        $('.datepicker-days td').each(function() {
            var currentCell = $(this);
            var currentDate = new Date(currentCell.data('date')); // Recupera la fecha de cada celda

            // Compara si la fecha actual está dentro del rango de estancia
            if (currentDate >= rangeStart && currentDate <= rangeEnd) {
                currentCell.addClass('highlighted'); // Resalta la celda
            }
        });
    }

    // Validación de la fecha de salida: no permitir que sea anterior a la de llegada
    if (arrivalDate && departureDate && departureDate < arrivalDate) {
        alert('La fecha de salida no puede ser anterior a la fecha de llegada.');
        $('#bookNowDepartureHeader').datepicker('setDate', null); // Limpia la fecha de salida
    }
});


// Deshabilitar autocompletado en los campos de fecha
$('#bookNowArrival, #bookNowDeparture').attr('autocomplete', 'off');



    // Book Form
    $('#bookFormHeader').validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		errorPlacement(error, element) {
			if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
				error.appendTo(element.parent().parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

    $('#bookForm').validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		errorPlacement(error, element) {
			if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
				error.appendTo(element.parent().parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

	
	
})).apply( this, [ jQuery ]);