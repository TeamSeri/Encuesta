using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class EmpresasBean
    {
        public int iIdEmpresa { get; set; }
        public string sNombre { get; set; }
        public int iEmpleados { get; set; }
        public int iAplicacionesReq { get; set; }
        public int iAplicacionesRestantes { get; set; }
        public string sMensaje { get; set; }
    }
}