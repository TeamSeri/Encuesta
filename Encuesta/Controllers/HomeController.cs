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
        public ActionResult Index() { return View();  }

        public ActionResult Login() { return View(); }

        [HttpPost]
        public JsonResult ValidarLogin(string user, string pass) {
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            logBean = logDao.sp_Datos_Usuarios_Retrieve_Usuario(user, pass);
            Session["keyUser"] = logBean.iIdUsuario;
            Session["nameUser"] = logBean.sUsuario;
            Session["typeUser"] = logBean.iTipoUsuario;
            if (logBean.iTipoUsuario != 1) {
                EmpresasBean empBean = new EmpresasBean();
                EmpresasDao empDao = new EmpresasDao();
                empBean = empDao.sp_DatosEmpresa_UsuarioSession(logBean.iTipoUsuario, logBean.iIdUsuario);
                if (empBean.sMensaje == "success") {
                    Session["keyEmpresa"] = empBean.iIdEmpresa;
                    Session["nameEmpresa"] = empBean.sNombre;
                }
            }
            return Json(logBean);
        }

        public ActionResult Logout() {
            if (Convert.ToInt32(Session["typeUser"]) != 1) {
                Session.Remove("nameEmpresa");
                Session.Remove("keyEmpresa");
            }
            Session.Remove("keyUser");
            Session.Remove("nameUser");
            Session.Remove("typeUser");
            return Redirect("/Home/Index");
        }

        public ActionResult Encuesta3() { return View(); }

        public ActionResult Buzon() { return View(); }

        [HttpPost]
        public JsonResult LoadCompanys() {

            List<EmpresasBean> listaEmpresasBean = new List<EmpresasBean>();
            EmpresasDao empresasDao = new EmpresasDao();
            listaEmpresasBean = empresasDao.sp_Empresas_Retrieve_Empresas();
            return Json(listaEmpresasBean);

        }

        [HttpPost]
        public JsonResult RegisterMailBox(int company, string boss, string description, string location, string dateevent) {
            BuzonBean buzonBean = new BuzonBean();
            BuzonDao buzonDao = new BuzonDao();
            buzonBean = buzonDao.sp_Insert_Buzon_Retrieve_Buzon(company, boss, description, location, dateevent);
            var data = new { result = buzonBean.sMensaje };
            return Json(data);
        }


    }
}