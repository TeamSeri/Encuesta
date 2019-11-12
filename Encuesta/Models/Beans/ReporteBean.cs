using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class ReporteBean
    {

        public int iIdReporte { get; set; }
        public string sContenidoReporte { get; set; }
        public int iIdUsuario { get; set; }
        public int iEstadoReporte { get; set; }
        public int iReporteNotificado { get; set; }
        public string sMensajeReporte { get; set; }
        public string sMensaje { get; set; }
        public int iCantidadReportes { get; set; }
        public string sCodigoReporte { get; set; }
        public string sUsuarioReporte { get; set; }
        public string sEmpresReporte { get; set; }
    }
}