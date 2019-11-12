using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class EncuestasBean
    {
        public int iIdPregunta { get; set; }
        public int iNumeroPregunta { get; set; }
        public string sContenidoPregunta { get; set; }
        public string sTipo { get; set; }
        public string sIdentificador { get; set; }
        public string sMensaje { get; set; } 
        public int iIdRegistroOpc { get; set; }
        public int iIdEmpresaOpc { get; set; }
        public string sEmpresa { get; set; }
        public string sNombreEmpleadoOpc { get; set; }
        public string sPuestoEmOpc { get; set; }
        public string sCodigoAcOpc { get; set; }
        public int iEstadoEncOpc { get; set; }
        public string sFechaEncOpc { get; set; }
        public int iIdDetalle { get; set; }
        public string sFechaRegistroOpcDetalle { get; set; }
        public string sDiagnosticoOpcDetalle { get; set; }
        public int iTipoDetalle { get; set; }
        public int iTotalTipoOpc { get; set; }
        public string sDiagnosticoOpc1 { get; set; }
        public string sDiagnosticoOpc2 { get; set; }
        public string sDiagnosticoOpc3 { get; set; }
        public string sCentroTrabajo { get; set; }
    }
}