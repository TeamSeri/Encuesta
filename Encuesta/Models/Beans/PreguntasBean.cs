using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Daos
{
    public class PreguntasBean
    {
        public int iIdPregunta { get; set; }
        public int iNumeroPregunta { get; set; }
        public string sContenidoPregunta { get; set; }
        public string sTipo { get; set; }
        public string sMensaje { get; set; }
    }
}