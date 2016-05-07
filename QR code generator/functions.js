$(document).ready(function () {
    var nombre1 = $("input#nombre1");
    var nombre2 = $("input#nombre2");
    var apellido1 = $("input#apellido1");
    var apellido2 = $("input#apellido2");
    var identificacion = $("input#identificacion");
    var edad = $("input#edad");
    var prioridad = $("input#prioridad");
    var autorizacion = $("input#autorizacion");
    var medicamentos = $("input#medicamentos");
    var dosificacion = $("textarea#dosificacion");

    var Paciente = function (nombre1, nombre2, apellido1, apellido2, identificacion, edad, prioridad, autorizacion, medicamentos, fechaConsulta, dosificacion) {
        this.nombre1 = nombre1;
        this.nombre2 = nombre2;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.identificacion = identificacion;
        this.edad = edad;
        this.prioridad = prioridad;
        this.medicamentos = medicamentos;
        this.autorizacion = autorizacion;
        this.fechaConsulta = fechaConsulta;
        this.dosificacion = dosificacion;

        this.generarCodigo = function () {
            $("div#qrcode").qrcode(nombre1 + "|" + nombre2 + "|" + apellido1 + "|" + apellido2 + "|" + identificacion + "|" + edad + "|" + prioridad + "|" + autorizacion + "|" + medicamentos + "|" + fechaConsulta + "|" + dosificacion);
        }
    }

    $("div#crear").on("click", function () {
        $("input#email").val("");
        var paciente = new Paciente(nombre1.val(), nombre2.val(), apellido1.val(), apellido2.val(), identificacion.val(), edad.val(), prioridad.val(), autorizacion.val(), medicamentos.val(), new Date($.now()), dosificacion.val());
        $("div#qrcode").empty();
        paciente.generarCodigo();
        /*var canvas = $("canvas");
        var ctx = canvas.get(0).getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = "10";
        ctx.strokeStyle = "white";
        ctx.rect(0, 0, 256, 256);
        ctx.stroke();*/
        $("#qrcode-wrapper").addClass("agregarPadding");
        $("#formulario").css({
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        });
        $("#enviarEmail").css("display", "block");
    });

    $("div#enviar").click(function () {
        $canvasqr = $("canvas");
        var email = $("input#email").val();
        var codigoqr = new Image();
        codigoqr.src = $canvasqr[0].toDataURL();
        $.post("php/enviarEmail.php", {
            destinatario: email,
            codigo: $canvasqr[0].toDataURL(),
            nombre1: nombre1.val(),
            nombre2: nombre2.val(),
            apellido1: apellido1.val(),
            apellido2: apellido2.val(),
            edad: edad.val(),
            prioridad: prioridad.val(),
            id: identificacion.val(),
            dosis: dosificacion.val()
        }, function (data) {
            alert(data);
        });
    });
});