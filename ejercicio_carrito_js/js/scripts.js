var datos = [];
datos[0] = ["Calcetines Rotos", 16, "img/libro1.jpg"];
datos[1] = ["Patria", 15.9, "img/libro2.jpg"];
datos[2] = ["Los Ritos Del Agua", 21.8, "img/libro3.jpg"];
datos[3] = ["El Extraño Verano de Tom Harvey", 20, "img/libro4.jpg"];
datos[4] = ["La Habitación en Llamas", 21.5, "img/libro5.jpg"];
datos[5] = ["El secreto de Ile-de-sein", 16.5, "img/libro6.jpg"];
datos[6] = ["Ocho días de Marzo", 15.9, "img/libro7.jpg"];
datos[7] = ["Cinco dias de Octubre", 15.9, "img/libro8.jpg"];
var salida = "";
var compra = [];

function carrito() {
    for (i = 0; i < datos.length; i++) {
        if (i == 0) {
            salida += '<div class="row">';
        }
        else if ((i % 4) == 0) {
            salida += '</div> <div class="row">';
        };
        salida += '<div class="col-md-3 producto"> <img src=' + datos[i][2] + ' class="imgBook img-rounded"><h3 class="tituloBook text-primary text-center">' + datos[i][0] + '</h3> <p class="precioBook"><b> Precio:</b> ' + datos[i][1] + ' € </p> <button onclick = "addCart(this,' + i + ')" type="button" class= "botonAdd btn btn-primary active btn-default">Comprar</button></div>';
        document.getElementById("hello").innerHTML = salida;
    };
    if (i != 0) {
        salida += "</div>";
    };
};

function addCart(boton, libro) {
    compra.push([libro, 1, boton]);
    boton.disabled = true;
    refreshCarrito();
};

function cantidad(posicion, incremento) {
    compra[posicion][1] += incremento;
    if (compra[posicion][1] < 1) {
        compra[posicion][1] = 1;
    };
    refreshCarrito();
};

function refreshCarrito() {
    tablaCompra();
    calcular();
};

function tablaCompra() {
    var imprimir = "";
    for (i = 0; i < compra.length; i++) {
        var x = compra[i][0];
        imprimir += "<tr><td>" + (i + 1) + "</td><td>" + datos[x][0] + "</td><td><button onclick = 'cantidad(" + i + ", -1 )'>-</button>" + compra[i][1] + "<button onclick = 'cantidad(" + i + ", 1 )'>+</button></td><td>" + datos[x][1] + " €</td><td><button onclick= 'borrarCart(" + i + ")' >Eliminar</button></td></tr>"
    };
    document.getElementById("tabla-compra").innerHTML = imprimir;
};

//Esta funcion hace remove en el boton eliminar. k = i y splice es la funcion para 

function borrarCart(k) {
    compra[k][2].disabled = false;
    compra.splice(k, 1);
    refreshCarrito();
}
carrito();


//Esta funcion Calcular hace todo el calculo de los importes de IVA, Dto y libros y hace el sumatorio en Importe Total. He utilizado operadores ternary para calcular la tasa, donde la variable numero = a la cantidad de libros que tiene compra. En compraTotal suma = el precio de la posicion multiplicado por la cantidad.
function calcular() {
    var importeCompra = compraTotal();
    var tasaDto = calculaDto();
    var importeTasa = importeCompra * tasaDto/100;
    var importeIva = (importeCompra-importeTasa) * 0.21;
    var importeTotal = importeCompra - importeTasa + importeIva;
    document.getElementById("precioCompra").innerHTML = importeCompra.toFixed(2) + " €";
    document.getElementById("iva").innerHTML = importeIva.toFixed(2) + " €";
    document.getElementById("descuento").innerHTML = importeTasa.toFixed(2) + " € ("+tasaDto+" %)";
    document.getElementById("total").innerHTML = importeTotal.toFixed(2) + " €";
    
    function compraTotal() {
        var suma = 0;
        for (i = 0; i < compra.length; i++) {
            suma += datos[compra[i][0]][1] * compra[i][1];
        };
        return suma;
    };
    
    function calculaDto (){
        var numero= 0;
        for(i=0; i<compra.length; i++){
            numero += compra[i][1];
        };
        //operador Ternario
        var tasa = numero>7?10:(numero>5?7.5:(numero>3?5:0));
        return tasa;
    }
    
};