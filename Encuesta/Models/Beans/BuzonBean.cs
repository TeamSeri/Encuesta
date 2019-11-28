using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class BuzonBean
    {
        public int iIdBuzon { get; set; }
        public int iIdEmpresa { get; set; }
        public string sEmpresa { get; set; }
        public string sJefeArea { get; set; }
        public string sDescripcion { get; set; }
        public string sLugar { get; set; }
        public string sFecha { get; set; }
        public int iEstadoBuzon { get; set; }
        public string sMensaje { get; set; }
    }
}