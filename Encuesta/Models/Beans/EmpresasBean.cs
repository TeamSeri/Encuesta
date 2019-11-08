using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class EmpresasBean
    {
        public int iIdEmpresa { get; set; }
        public int iIdRegistroEmpresas { get; set; }
        public string sNombre { get; set; }
        public int iEmpleados { get; set; }
        public int iAplicacionesReq { get; set; }
        public int iAplicacionesRestantes { get; set; }
        public int iAplicacionesRealizadas { get; set; }
        public string sTipoEncuesta { get; set; }
        public string sCodigoEmpresa { get; set; }
        public string sFechaAnio { get; set; }
        public string sMes { get; set; }
        public int iActivo { get; set; }
        public string sMensaje { get; set; }
        public int iIdCentroTrabajo { get; set; }
        public string sCentroTrabajo { get; set; }
        public string sUbicacionCentro { get; set; }
    }
}