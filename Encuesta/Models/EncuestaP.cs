using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models
{
    public class EncuestaP
    {
        public int iIdEmpresa { get; set; }
        public int iEmpleados { get; set; }
        public int iAplicacionesReq { get; set; }
        public int iAplicacionesRes { get; set; }
        public string sEstado { get; set; }
    }
}