using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class RegistroBean
    {
        public int iIdRegistro { get; set; }
        public int iIdEmpresa { get; set; }
        public DateTime dFechaRegistro { get; set; }
        public string sMensaje { get; set; }
    }
}