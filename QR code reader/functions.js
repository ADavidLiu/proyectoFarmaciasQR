$(document).ready(function () {
    var nombre1 = $("#nombre1");
    var nombre2 = $("#nombre2");
    var apellido1 = $("#apellido1");
    var apellido2 = $("#apellido2");
    var edad = $("#edad");
    var id = $("#id");
    var medicamentos = $("#medicamentos");
    var prioridad = $("#prioridad");
    var fechaConsulta = $("#fecha");
    var autorizacion = $("#autorizacion");
    var dosis = $("#dosis");

    /*function isFinDeSemana(dia) {
        if (dia == 6 || dia == 0) {
            return true;
        } else {
            return false;
        }
    }

    function calcularFecha(prioridad, fechaConsulta) {
        var diaConsulta = fechaConsulta.getDay();
        var diaIngreso = dia + prioridad;
        diaIngreso.setDate();
    }*/

    var campos = [nombre1, nombre2, apellido1, apellido2, id, edad, prioridad, autorizacion, medicamentos, fechaConsulta, dosis];

    var arg = {
        resultFunction: function (result) {
            var codigo = result.code;
            var resultado = codigo.split("|");
            for (i = 0; i < campos.length; i++) {
                campos[i].text(resultado[i]);
            }
        }
    };

    var decoder = new WebCodeCamJS("canvas").init(arg);
    //decoder.buildSelectMenu('#camera-select', 0).init(args);
    decoder.play();

    function decodeLocalImage() {
        decoder.decodeLocalImage();
    }

    $("input[type='button']").click(function () {
        decoder = new WebCodeCamJS("canvas").init(arg);
        decodeLocalImage();
    });
});