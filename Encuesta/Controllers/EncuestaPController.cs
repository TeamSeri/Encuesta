using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Encuesta.Models;
using Encuesta.Models.Beans;
using Encuesta.Models.Daos;

namespace Encuesta.Controllers
{
    public class EncuestaPController : Controller
    {
        // GET: Encuesta
        public ActionResult Index()
        {
            EncuestaP objEnc = new EncuestaP();
            objEnc.iIdEmpresa = Convert.ToInt32(Request.Form["nom_empresa"]);
            objEnc.iEmpleados = Convert.ToInt32(Request.Form["num_empleados"]);
            return View(objEnc);
        }

        [HttpPost]
        public JsonResult DatosEmpresa(int empresa)
        {
            EmpresasBean empBe = new EmpresasBean();
            EmpresasDao empDa = new EmpresasDao();
            empBe = empDa.sp_Datos_Empresas_Retrieve_Empresa(empresa);
            return Json(empBe);
        }

        [HttpPost]
        public JsonResult DatosEmpresas()
        {
            List<EmpresasBean> empBean = new List<EmpresasBean>();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Empresas_Retrieve_Empresas();
            return Json(empBean);
        }
    }
}