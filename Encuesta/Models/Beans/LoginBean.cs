using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class LoginBean
    {
        public int iIdUsuario { get; set; }
        public string sUsuario { get; set; }
        public string sContrasena { get; set; }
        public int iEstado { get; set; }
        public string sMensaje { get; set; }
    }
}