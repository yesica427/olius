import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archivo } from "./archivo.model";


@Injectable({
  providedIn: 'root'
})
export class ShortcutService {

  constructor(private http: HttpClient) { }


  private extractJSON(str) {
    var firstOpen, firstClose, candidate;
    firstOpen = str.indexOf('{', firstOpen + 1);
    do {
      firstClose = str.lastIndexOf('}');
      //console.log('firstOpen: ' + firstOpen, 'firstClose: ' + firstClose);
      if (firstClose <= firstOpen) {
        return null;
      }
      do {
        candidate = str.substring(firstOpen, firstClose + 1);
        //console.log('candidate: ' + candidate);
        try {
          var res = JSON.parse(candidate);
          //console.log('...found');
          return {
            "json": res,
            "inicio": firstOpen,
            "cierre": firstClose + 1
          };
        } catch (e) {

          //console.log('...failed');
        }
        firstClose = str.substr(0, firstClose).lastIndexOf('}');
      } while (firstClose > firstOpen);
      firstOpen = str.indexOf('{', firstOpen + 1);
    } while (firstOpen != -1);
  }

  extraerJsons(str) {

    //console.log(str)

    var primerResult = this.extractJSON(str);

    //console.log(str.length)


    var arregloDeShortcuts = [];
    arregloDeShortcuts.push(primerResult);

    var copiaCadena = str;
    var largoString = str.length;

    var indexCierre = primerResult.cierre;
    var indexCierreGlobal = primerResult.cierre;

    var indexInicio = primerResult.inicio;
    var indexInicioGlobal = primerResult.inicio;

    while (largoString > 73) {

      copiaCadena = copiaCadena.substring(indexCierre);
      //console.log("||||||||||||||||||||||||||||||" + copiaCadena + "|||||||||||||||||||||||")

      largoString = copiaCadena.length;
      //console.log("||||||||||||||||||||||||||||||Largo string: " + largoString + "|||||||||||||||||||||||")
      if (largoString < 73) {
        break;
      }

      var res = this.extractJSON(copiaCadena);

      if (res == null) {
        break;
      }

      indexCierre = res.cierre;

      //console.log(res.inicio)
      //console.log(res.cierre)

      var copiaRes = res;

      //console.log(indexCierreGlobal)

      copiaRes.inicio += indexCierreGlobal;
      copiaRes.cierre += indexCierreGlobal;



      indexCierreGlobal += indexCierre;

      arregloDeShortcuts.push(copiaRes);
    }

    //console.log(arregloDeShortcuts)

    //console.log(JSON.stringify(arregloDeShortcuts[0].json));

    return arregloDeShortcuts;

    // var strNuevo = str;

    // for (let i = 0; i < arregloDeShortcuts.length; i++) {

    //   switch (arregloDeShortcuts[i].json.tipo) {
    //     case "imagen":
    //       strNuevo = strNuevo.replace("<p>" + JSON.stringify(arregloDeShortcuts[i].json) + "</p>", ` <img src="smiley.gif"  height="42" width="42"> `)
    //       break;

    //     case "video":

    //       strNuevo = strNuevo.replace("<p>" + JSON.stringify(arregloDeShortcuts[i].json) + "</p>", `<video width="320" height="240" controls>
    //       <source src="movie.mp4" type="video/mp4">
    //       <source src="movie.ogg" type="video/ogg">
    //       Your browser does not support the video tag.
    //     </video> `)
    //       break;
    //   }

    // }

    //    console.log(strNuevo)


    //console.log(str)
  }

  insertarElementos(str) {

  }

  traerArchivo(id) {
    return this.http.get<Archivo>("http://localhost:8888/archivos/" + id);
  }

}
