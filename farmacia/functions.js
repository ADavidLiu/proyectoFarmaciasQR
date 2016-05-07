$(document).ready(function () {
    var resultado = $(".resultado-wrapper").html();
    var resultados = $(".resultados");
    var numPacientesCampo = $(".numPacientes h2");
    var numPacientes = 0;

    // Oculta el primer elemento de referencia
    $(".resultado-wrapper").remove();
    // Asigna el primer valor 0 al número de pacientes en espera dentro de la farmacia
    numPacientesCampo.text(numPacientes);

    var diasMeses = [
        enero = 31,
        febrero = 29,
        marzo = 31,
        abril = 30,
        mayo = 31,
        junio = 30,
        julio = 31,
        agosto = 31,
        septiembre = 30,
        octubre = 31,
        noviembre = 30,
        diciembre = 31
    ];

    function calcularFecha(prioridad, fecha) {
        var fechaConsulta = new Date(fecha);
        var diasNivel = parseInt(prioridad) - 1;
        //console.log("fecha consulta: " + fechaConsulta);
        var diaConsulta = fechaConsulta.getDate();
        var mesConsulta = fechaConsulta.getMonth();
        var anoConsulta = fechaConsulta.getFullYear();

        //console.log("dia consulta: " + diaConsulta + "\nmes consulta: " + mesConsulta + "\naño consulta: " + anoConsulta + "\nprioridad: " + prioridad + "\ndia ingreso: " + (diaConsulta + diasNivel));
        
        var fechaIngreso = new Date(anoConsulta, mesConsulta, diaConsulta + diasNivel);
        
        console.log("fecha ingreso: " + fechaIngreso);
    }

    function actualizarNumPacientes(opcion) {
        if (opcion == 1) {
            numPacientes += 1;
        } else {
            numPacientes -= 1;
        }
        numPacientesCampo.text(numPacientes);
    }

    function eliminarPaciente(elemento) {
        elemento.parents(".resultado").fadeOut("fast", function () {
            $(this).remove();
        });
        actualizarNumPacientes(0);
    }

    function agregarPaciente(resultadoCadena) {
        resultados.append(resultado);

        var nombre1 = $(".resultados .resultado:last-child #nombre1");
        var nombre2 = $(".resultados .resultado:last-child #nombre2");
        var apellido1 = $(".resultados .resultado:last-child #apellido1");
        var apellido2 = $(".resultados .resultado:last-child #apellido2");
        var edad = $(".resultados .resultado:last-child #edad");
        var id = $(".resultados .resultado:last-child #id");
        var medicamentos = $(".resultados .resultado:last-child #medicamentos");
        var prioridad = $(".resultados .resultado:last-child #prioridad");
        var fechaConsulta = $(".resultados .resultado:last-child #fecha");
        var autorizacion = $(".resultados .resultado:last-child #autorizacion");
        var dosis = $(".resultados .resultado:last-child #dosis");

        var campos = [nombre1, nombre2, apellido1, apellido2, id, edad, prioridad, autorizacion, medicamentos, fechaConsulta, dosis];

        for (i = 0; i < campos.length; i++) {
            campos[i].text(resultadoCadena[i]);
        }

        actualizarNumPacientes(1);

        $(".resultados .resultado:last-child .botones .entregar").click(function () {
            eliminarPaciente($(this));
            // Aquí va el script de PHP para eliminar al paciente de la base de datos de pacientes dentro de la farmacia.
        });

        $(".resultados .resultado:last-child .botones .aplazar").click(function () {
            eliminarPaciente($(this));
            // Aquí va el script de PHP para insertar al paciente a la base de datos de pacientes en espera de su medicamento y que se les mande un email de aviso.
        });
    }

    var arg = {
        resultFunction: function (result) {
            var codigo = result.code;
            var resultadoCadena = codigo.split("|");
            calcularFecha(resultadoCadena[6], resultadoCadena[9]);
            agregarPaciente(resultadoCadena);
        }
    };
    $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery.play();
});