using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Encuesta.Models.Beans;
using Encuesta.Models.Daos;

namespace Encuesta.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ValidarLogin(string user, string pass)
        {
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            logBean = logDao.sp_Datos_Usuarios_Retrieve_Usuario(user, pass);
            Session["keyUser"] = logBean.iIdUsuario;
            Session["nameUser"] = logBean.sUsuario;
            Session["typeUser"] = logBean.iTipoUsuario;
            return Json(logBean);
        }

        public ActionResult Logout()
        {
            Session.Remove("keyUser");
            Session.Remove("nameUser");
            Session.Remove("typeUser");
            return Redirect("/Home/Index");
        }

        public ActionResult Encuesta3()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

    }
}