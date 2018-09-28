(function (window, document) {
    "use strict";
    window.addEventListener("load", function () {
        var bearbeitet;

        function verschiebeRunter(e) {
            e.preventDefault();
            var a = e.target;
            var li = a.parentElement;
            if (a.nodeName.toLowerCase() === "a" && a.innerHTML.toLowerCase() === "verschieben") {
                ul[1].appendChild(li);
            }
        }

        function verschiebeHoch(e) {
            e.preventDefault();
            var a = e.target;
            var li = a.parentElement;
            if (a.nodeName.toLowerCase() === "a" && a.innerHTML.toLowerCase() === "verschieben") {
                ul[0].appendChild(li);
            }
        }

        function bearbeiten(e) {
            e.preventDefault();
            var a = e.target;
            var li = a.parentElement;
            if (a.nodeName.toLowerCase() === "a" && a.innerHTML.toLowerCase() === "bearbeiten") {
                console.log(li.childNodes);
                var eintrag = document.getElementById("eintrag");
                var txt = li.childNodes[4].nodeValue.trim();
                eintrag.value = txt;
                div_bearbeiten.style.display = "block";
                bearbeitet = li; //Pointer auf li das bearbeitet wird
            }
        }

        var div_bearbeiten = document.getElementById("bearbeiten");
        div_bearbeiten.style.display = "none";

        var ul = document.getElementsByTagName("ul");
        ul[0].addEventListener("click", verschiebeRunter);
        ul[1].addEventListener("click", verschiebeHoch);

        ul[0].addEventListener("click", bearbeiten);
        ul[1].addEventListener("click", bearbeiten);

        document.getElementById("aendern").addEventListener("click", function (e) {
            e.preventDefault();
            var eintrag = document.getElementById("eintrag");
            bearbeitet.childNodes[4].nodeValue = " " + eintrag.value.trim();
            eintrag.value = "";
            div_bearbeiten.style.display = "none";
        });

        document.getElementById("neu").addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.nodeName.toLowerCase() === "input") {
                //Einen Listenpunkt aus dem Dokument als Verweis/Pointer/JS-Objekt einlesen
                var li = ul[0].getElementsByTagName("li")[0];
                //Dieses JS-Objekt clonen, kopie erzeugen, true
                //bedeutet tiefe Kopie also alle Kinder mit kopieren
                //Der Listenpunkt wurde 1 zu 1 kopiert ist aber ein neues
                //Element das über dem Dokument schwebt
                li = li.cloneNode(true);
                var neu = document.getElementById("neuerEintrag");
                //Beim neue erzeugten Listenpunkt den Text austauschen
                /* Funktioniert noch nicht in allen Browser: */
                //li.childNodes[4].replaceWith(" "+neu.value.trim());
                li.childNodes[4].nodeValue = " " + neu.value.trim();
                /* 
                // <li></li>
                var li = document.createElement("li");
                // " "
                var txt = document.createTextNode(" "); 
                // <li> </li>
                li.appendChild(txt);
                // <a></a>
                var a = document.createElement("a");
                // "Bearbeiten"
                txt = document.createTextNode("Bearbeiten"); 
                // <a>Bearbeiten</a>
                a.appendChild(txt);   
                // <a href="#">Bearbeiten</a>
                a.setAttribute("href", "#");   
                // <li><a href="#">Bearbeiten</a></li>        
                li.appendChild(a);
                // " | "
                li.appendChild(document.createTextNode(" | "));
                // <li><a href="#">Bearbeiten</a></li> |   
                
                // <a></a>
                a = document.createElement("a");
                // <a>Verschieben</a>
                txt = document.createTextNode("Verschieben");
                // <a>Verschieben</a>
                a.appendChild(txt);
                // <a href="#">Verschieben</a>
                a.setAttribute("href", "#");  
                // <li><a href="#">Bearbeiten</a></li> | <a href="#">Verschieben</a>
                li.appendChild(a);
                // Neuer Text foobar
                var neu = document.getElementById("neuerEintrag");
                txt = document.createTextNode(" "+neu.value.trim());
                // <li><a href="#">Bearbeiten</a></li> | <a href="#">Verschieben</a> foobar
                li.appendChild(txt);
                 */

                //Hier wählen wir die Liste in die eingetragen wird
                //und vergeben die Klasse oben oder unten                
                switch (e.target.value.toLowerCase()) {
                    case "oben eintragen":
                        ul[0].appendChild(li);
                        li.classList.add("oben");
                        break;
                    case "unten eintragen":
                        ul[1].appendChild(li);
                        li.classList.add("unten");
                        break;
                }
                neu.value = "";
            }
        });
    });
}(window, document));


