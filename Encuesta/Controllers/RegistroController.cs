using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Encuesta.Models.Beans;
using Encuesta.Models.Daos;

namespace Encuesta.Controllers
{
    public class RegistroController : Controller
    {
        // GET: Registro
        public ActionResult Index()
        {
            RegistroBean regBean = new RegistroBean();
            RegistroDao regDao = new RegistroDao();
            //Variables del formulario
            int empresa = Convert.ToInt32(Request.Form["empresa"]);
            DateTime fecha = DateTime.Now;
            //regBean = regDao.sp_RegistroEncuestas_Insert_RegistroEncuestas(empresa, fecha);
            return View(regBean);
        }
    }
}