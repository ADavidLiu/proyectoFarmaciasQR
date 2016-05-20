$(document).ready(function () {
    var resultado = $(".resultado-wrapper").html();
    var resultados = $(".resultados");
    var notificaciones = $(".notificaciones");
    var btnResultados = $("div.btnResultados");
    var btnNotificaciones = $("div.btnNotificaciones");
    var numPacientesCampo = $(".numPacientes h2");
    var numPacientes = 0;

    // Oculta el primer elemento de referencia
    $(".resultado-wrapper").remove();
    // Asigna el primer valor 0 al número de pacientes en espera dentro de la farmacia
    numPacientesCampo.text(numPacientes);

    function calcularFecha(prioridad, fecha) {
        var fechaConsulta = new Date(fecha);
        var diasNivel = parseInt(prioridad) - 1;
        var diaConsulta = fechaConsulta.getDate();
        var mesConsulta = fechaConsulta.getMonth();
        var anoConsulta = fechaConsulta.getFullYear();

        var fechaIngreso = new Date(anoConsulta, mesConsulta, diaConsulta + diasNivel);

        return fechaIngreso;
    }

    function determinarEntrada(fechaIngreso) {
        var fechaActual = new Date();
        if (fechaIngreso.getDate() == fechaActual.getDate()) {
            console.log("fecha actual: " + fechaActual + "\nfecha ingreso: " + fechaIngreso);
            return true;
        } else {
            console.log("fecha actual: " + fechaActual + "\nfecha ingreso: " + fechaIngreso);
            return false;
        }
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

    function insertarPacienteFarmacia(campos) {
        $.post("php/insertarPacienteFarmacia.php", {
            nombre1: campos[0],
            nombre2: campos[1],
            apellido1: campos[2],
            apellido2: campos[3],
            id: campos[4],
            edad: campos[5],
            prioridad: campos[6],
            autorizacion: campos[7],
            fechaConsulta: campos[9],
            entregado: campos[11],
            medicamentos: campos[8],
            indicaciones: campos[10]
        }, function (resultado) {
            console.log("Agregado...");
            console.log(resultado);
        });
    }

    function insertarPacienteEspera(email, medicamentos) {
        $.post("php/insertarPacienteEspera.php", {
            emailIn: email,
            medicamentosIn: medicamentos
        }, function () {
            alert("Procesado");
        });
    }

    function eliminarPacienteFarmacia(autorizacion) {
        $.post("php/eliminarPacienteFarmacia.php", {
            autorizacionIn: autorizacion
        }, function (resultado) {
            console.log(resultado);
        });
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
        var entregado = $(".resultados .resultado:last-child #entregado");

        var campos = [nombre1, nombre2, apellido1, apellido2, id, edad, prioridad, autorizacion, medicamentos, fechaConsulta, dosis, entregado];

        for (i = 0; i < campos.length; i++) {
            campos[i].text(resultadoCadena[i]);
        }

        actualizarNumPacientes(1);

        $(".resultados .resultado:last-child .botones .entregar").click(function () {
            // Eliminar de la interfaz.
            eliminarPaciente($(this));
            // Eliminar de la base de datos.
            eliminarPacienteFarmacia(resultadoCadena[7]);
        });

        $(".resultados .resultado:last-child .botones .aplazar").click(function () {
            // Añadirlo a la base de datos de pacientes en espera de un email de notificación.
            var emailEspera = $(".resultados .resultado:last-child input#emailEspera");
            console.log("Email en espera: " + emailEspera.val());
            insertarPacienteEspera(emailEspera.val(), resultadoCadena[8]);
            // Eliminar de la interfaz.
            eliminarPaciente($(this));
            // Eliminar de la base de datos.
            eliminarPacienteFarmacia(resultadoCadena[7]);
        });
    }

    setInterval(function () {
        $.post("php/consultarPacientes.php", {}, function (pacientes) {
            for (i = 0; i < pacientes[0].numPacientes; i++) {
                var info = [pacientes[i].nombre1, pacientes[i].nombre2, pacientes[i].apellido1, pacientes[i].apellido2, pacientes[i].id, pacientes[i].edad, pacientes[i].prioridad, pacientes[i].autorizacion, pacientes[i].medicamentos, pacientes[i].fechaConsulta,
                pacientes[i].indicaciones];
                agregarPaciente(info);
            }
        });
    }, 2000); // Cada 2 segundos

    var btnEnviar = $(".btnEnviar");
    var inputMedicamento = $(".notificaciones input");
    var emails = [];

    btnEnviar.click(function () {
        var obtenerEmails = $.post("php/obtenerEmails.php", {
            medicamento: inputMedicamento.val()
        }, function (info) {
            for (i = 0; i < info[0].numPacientes; i++) {
                var email = info[i].email;
                emails.push(email);
            }
        });

        obtenerEmails.done(function () {
            console.log(emails);
            $.post("php/enviarEmail.php", {
                emailsIn: emails,
                medicamento: inputMedicamento.val()
            }, function (info) {
                alert(info);
            });
        });
    });

    // Ocultar inicialmente la sección de notificaciones
    notificaciones.hide();

    function cambiarSeccion(seccionNueva, seccionAntigua) {
        seccionAntigua.fadeOut("fast", function () {
            seccionNueva.fadeIn("fast");
        });
    }

    btnNotificaciones.click(function () {
        cambiarSeccion(notificaciones, resultados);
    });

    btnResultados.click(function () {
        cambiarSeccion(resultados, notificaciones);
    });

    var arg = {
        resultFunction: function (result) {
            var codigo = result.code;
            var resultadoCadena = codigo.split("|");
            var fechaIngreso = calcularFecha(resultadoCadena[6], resultadoCadena[9]);
            console.log("fecha ingreso enviada: " + fechaIngreso);
            if (determinarEntrada(fechaIngreso)) {
                // Agregar a la interfaz.
                //agregarPaciente(resultadoCadena);

                // Agregar a la base de datos.
                insertarPacienteFarmacia(resultadoCadena);
                // Abre la puerta de la farmacia
                $.post("php/comunicacionArduino.php", {
                    mensaje: 1 // 1 - Abrir
                }, function (resultado) {
                    console.log(resultado); // Debería imprimir '1'
                });
            } else {
                alert("Hoy no es su día asignado para reclamar su(s) medicamento(s)");
            }
        }
    };
    $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery.play();
});