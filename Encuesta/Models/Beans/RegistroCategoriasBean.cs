using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Beans
{
    public class RegistroCategoriasBean
    {
        public int iIdCategoria { get; set; }
        public string sNombreCategoria { get; set; }
        public int iValor { get; set; }
        public int iIdEmpresa { get; set; }
        public int iIdRegistroEmpresa { get; set; }
        public int iSumaValores { get; set; }
        public string sMensaje { get; set; }
    }
}