using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Encuesta.Models.Beans;
using Encuesta.Models.Daos;

namespace Encuesta.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            List<EmpresasBean> empBean = new List<EmpresasBean>();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Empresas_Retrieve_Empresas();
            return View(empBean);
        }

        public ActionResult Detalles(int empresa)
        {
            EmpresasBean empBe = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBe = empDao.sp_Datos_Empresa(empresa);
            return View(empBe);
        }

        [HttpPost]
        public JsonResult DetallesRegistros(int empresa)
        {
            List<EmpresasBean> empBe = new List<EmpresasBean>();
            EmpresasDao empDao = new EmpresasDao();
            empBe = empDao.sp_Datos_TRegistrosEmpresas_Empresa(empresa);
            return Json(empBe);
        }

        public ActionResult DetallesRegistrosEncuesta(int registro, int empresa, string tipo)
        {
            RegistroBean regBean = new RegistroBean();
            regBean.iIdRegistro = registro;
            regBean.iIdEmpresa = empresa;
            regBean.sTipoEncuesta = tipo;
            return View(regBean);
        }
        
        [HttpPost]
        public JsonResult DetallesRegistroEmpresa(int registro)
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Datos_RegistroEmpresas_Retrieve_RegistroEmpresa(registro);
            return Json(empBean);
        }

        [HttpPost]
        public JsonResult DatosGraficas1(int registro)
        {
            RegistroCategoriasBean regCatBean = new RegistroCategoriasBean();
            RegistroDao regDao = new RegistroDao();
            //Categorias
            string categoria1 = "Ambiente de trabajo", categoria2 = "Factores propios de la actividad",
                categoria3 = "Organización del tiempo de trabajo", categoria4 = "Liderazgo y relaciones en el trabajo",
                categoria5 = "Entorno organizacional";
            //Dominios
            string dominio2 = "Carga de trabajo", dominio3 = "Falta de control sobre el trabajo", dominio4 = "Jornada de trabajo",
                dominio5 = "Interferencia en la relacion trabajo-familia", dominio6 = "Liderazgo",
                dominio7 = "Relacion en el trabajo", dominio8 = "Violencia", dominio9 = "Reconocimiento del desempeño",
                dominio10 = "Insuficiente sentido de pertenencia e inestabilidad";
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria1);
            string resCategoria1 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria2);
            string resCategoria2 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria3);
            string resCategoria3 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria4);
            string resCategoria4 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria5);
            string resCategoria5 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio2);
            string resDominio2 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio3);
            string resDominio3 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio4);
            string resDominio4 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio5);
            string resDominio5 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio6);
            string resDominio6 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio7);
            string resDominio7 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio8);
            string resDominio8 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio9);
            string resDominio9 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio10);
            string resDominio10 = regCatBean.iSumaValores.ToString();
            string mensaje = "correcto";
            if (resCategoria1 == "0" || resDominio3 == "0" || resDominio4 == "0" || resDominio5 == "0" || resDominio6 == "0" || resDominio7 == "0" || resDominio8 == "0")
            {
                mensaje = "falso";
            }

            //Realizadas
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Datos_RegistroEmpresas_Retrieve_RegistroEmpresa(registro);

            var data = new { message = "success", categoria1 = resCategoria1, categoria2 = resCategoria2, categoria3 = resCategoria3, categoria4 = resCategoria4, categoria5 = resCategoria5, dominio2 = resDominio2, dominio3 = resDominio3, dominio4 = resDominio4, dominio5 = resDominio5, dominio6 = resDominio6, dominio7 = resDominio7, dominio8 = resDominio8, dominio9 = resDominio9, dominio10 = resDominio10, realizadas = empBean.iAplicacionesRealizadas, res = mensaje };
            return Json(data);
        }

        [HttpPost]
        public JsonResult DatosGraficas2(int registro)
        {
            RegistroCategoriasBean regCatBean = new RegistroCategoriasBean();
            RegistroDao regDao = new RegistroDao();
            //Categorias
            string categoria1 = "Ambiente de trabajo", categoria2 = "Factores propios de la actividad",
                categoria3 = "Organización del tiempo de trabajo",
                categoria4 = "Liderazgo y relaciones en el trabajo";
            //Dominios
            string dominio2 = "Carga de trabajo" , dominio3 = "Falta de control sobre el trabajo", dominio4 = "Jornada de trabajo", 
                dominio5 = "Interferencia en la relacion trabajo-familia", dominio6 = "Liderazgo", 
                dominio7 = "Relacion en el trabajo", dominio8 = "Violencia";
            //Consulta categorias
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria1);
            string resCategoria1 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria2);
            string resCategoria2 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria3);
            string resCategoria3 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Categorias_Categoria(registro, categoria4);
            string resCategoria4 = regCatBean.iSumaValores.ToString();
            //Consulta dominios
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio2);
            string resDominio2 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio3);
            string resDominio3 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio4);
            string resDominio4 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio5);
            string resDominio5 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio6);
            string resDominio6 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio7);
            string resDominio7 = regCatBean.iSumaValores.ToString();
            regCatBean = regDao.sp_Datos_Dominios_Dominio(registro, dominio8);
            string resDominio8 = regCatBean.iSumaValores.ToString();
            string mensaje = "correcto";
            if (resCategoria1 == "0" || resDominio3 == "0" || resDominio4 == "0" || resDominio5 == "0" || resDominio6 == "0" || resDominio7 == "0" ||resDominio8 == "0")
            {
                mensaje = "falso";
            }

            //Realizadas
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Datos_RegistroEmpresas_Retrieve_RegistroEmpresa(registro);

            var data = new { categoria1 = resCategoria1, categoria2 = resCategoria2, categoria3 = resCategoria3, 
                categoria4 = resCategoria4, dominio2 = resDominio2,  dominio3 = resDominio3, dominio4 = resDominio4,
                dominio5 = resDominio5, dominio6 = resDominio6, dominio7 = resDominio7, dominio8 = resDominio8, realizadas = empBean.iAplicacionesRealizadas, res = mensaje
            };
            return Json(data); 
        }
        
        [HttpPost]
        public JsonResult DatosGraficaGeneral(int registro, string tipo)
        {
            RegistroCategoriasBean regCatBean = new RegistroCategoriasBean();
            RegistroDao regDao = new RegistroDao();
            regCatBean = regDao.sp_ResultadoGeneral_RegistrosEncuestas(registro, tipo);
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Datos_RegistroEmpresas_Retrieve_RegistroEmpresa(registro);
            int resultado = 0;
            if (regCatBean.sMensaje == "success") {
                resultado = regCatBean.iSumaValores;
            }
            var data = new { mensaje = regCatBean.sMensaje, result = resultado, realizadas = empBean.iAplicacionesRealizadas };
            return Json(data);
        }

        public ActionResult RegistroEmpresa()
        {
            return View();
        }

        [HttpPost]
        public JsonResult EmpresaRegistro(string empresa)
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Insert_Empresa_Retrieve_Empresa(empresa);
            var data = new { mensaje = empBean.sMensaje, empresa = empBean.iIdEmpresa };
            return Json(data);
        }

        [HttpPost]
        public JsonResult RegDetallesEmpresa(int empresa, int empleados, int requeridas, string tipo, string codigo, string mes, string anio, int centro)
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            int estado = 1;
            empBean = empDao.sp_Validar_Registro_Empresa(empresa, estado, empleados, requeridas, tipo, codigo, mes, anio, centro);
            var data = new { mensaje = empBean.sMensaje };
            return Json(data);
        }

        public ActionResult DetallesRegistroEncuestaOpc(int registro)
        {
            EncuestasBean encBean = new EncuestasBean();
            encBean.iIdDetalle = registro;
            return View(encBean);
        }

        [HttpPost]
        public JsonResult DatosEncuestaOpcional(int registro)
        {
            EncuestasBean encBean = new EncuestasBean();
            EncuestaOpcDao encDao = new EncuestaOpcDao();
            encBean = encDao.sp_DatosDetalle_RegistroEncuestaOpcional(registro);
            if (encBean.sMensaje == "success")
            {
                var data = new { mensaje = encBean.sMensaje, fechacon = encBean.sFechaRegistroOpcDetalle, diagnostico = encBean.sDiagnosticoOpcDetalle, tipo = encBean.iTipoDetalle, empleado = encBean.sNombreEmpleadoOpc, puesto = encBean.sPuestoEmOpc, codigo = encBean.sCodigoAcOpc, estado = encBean.iEstadoEncOpc, fechareg = encBean.sFechaEncOpc, empresa = encBean.sEmpresa, diagnostico1 = encBean.sDiagnosticoOpc1, diagnostico2 = encBean.sDiagnosticoOpc2, diagnostico3 = encBean.sDiagnosticoOpc3};
                return Json(data);
            }
            else
            {
               var data = new { mensaje = encBean.sMensaje };
                return Json(data);
            }
        }

        [HttpPost]
        public JsonResult DetallesEncuestaOpc(int type, int key)
        {
            List<EncuestasBean> encBean = new List<EncuestasBean>();
            EncuestasDao encDao = new EncuestasDao();
            if (type != 1)
            {
                EmpresasBean empBean = new EmpresasBean();
                EmpresasDao empDao = new EmpresasDao();
                empBean = empDao.sp_DatosEmpresa_UsuarioSession(type, key);
                if (empBean.sMensaje == "success")
                {
                    encBean = encDao.sp_DatosEncuestaOpcional_DatosPorEmpresa(empBean.iIdEmpresa);
                    return Json(encBean);
                } 
                else
                {
                    var data = new { mensaje = "error" };
                    return Json(data);
                }
            }
            encBean = encDao.sp_Datos_EncuestaOpcional_Datos();
            return Json(encBean);
        }

        [HttpPost]
        public JsonResult RegEncuestaOpcional(int empresa, string empleado, string puesto, string codigo)
        {
            EncuestasBean encBean = new EncuestasBean();
            EncuestasDao encDao = new EncuestasDao();
            int estado = 0;
            encBean = encDao.sp_Insert_EncuestaOpcional_Datos(empresa, empleado, puesto, codigo, estado);
            var data = new { mensaje = encBean.sMensaje };
            return Json(data);
        }

        [HttpPost]
        public JsonResult DesactivaRegistro(int clvreg)
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Desactiva_RegistroEmpresa(clvreg);
            string resp = empBean.sMensaje;
            var data = new { estado = resp };
            return Json(data);
        }

        public ActionResult EncuestaEspecial()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GraficaEncuestaOpcional()
        {
            EncuestasBean encBean = new EncuestasBean();
            EncuestasDao encDao = new EncuestasDao();
            int satencion = 1, natencion = 0, rsiatencion = 0, rnoatencion = 0;
            encBean = encDao.sp_Datos_EncuestaOpcional_Grafica(satencion);
            string resultado = "";
            if (encBean.sMensaje == "success") {
                resultado = "success";
                rsiatencion = encBean.iTotalTipoOpc;
                encBean = encDao.sp_Datos_EncuestaOpcional_Grafica(natencion);
                if (encBean.sMensaje == "success") {
                    resultado = "success";
                    rnoatencion = encBean.iTotalTipoOpc;
                } else {
                    resultado = "error";
                }
            }  else {
                resultado = "error";
            }
            var data = new { siatencion = rsiatencion, noatencion = rnoatencion, estado = resultado };
            return Json(data);
        }

        [HttpPost]
        public JsonResult GraficaEncuestaOpcionalPorEmpresa(int key)
        {
            EncuestasBean encBean = new EncuestasBean();
            EncuestasDao encDao = new EncuestasDao();
            int satencion = 1, natencion = 0, rsiatencion = 0, rnoatencion = 0;
            encBean = encDao.sp_Datos_EncuestaOpcional_GraficaPorEmpresa(satencion, key);
            string resultado = "";
            if (encBean.sMensaje == "success")
            {
                resultado = "success";
                rsiatencion = encBean.iTotalTipoOpc;
                encBean = encDao.sp_Datos_EncuestaOpcional_GraficaPorEmpresa(natencion, key);
                if (encBean.sMensaje == "success")
                {
                    resultado = "success";
                    rnoatencion = encBean.iTotalTipoOpc;
                }
                else
                {
                    resultado = "error";
                }
            }
            else
            {
                resultado = "error";
            }
            var data = new { siatencion = rsiatencion, noatencion = rnoatencion, estado = resultado };
            return Json(data);
        }

        public ActionResult Usuarios()
        {
            return View();
        }

        [HttpPost]
        public JsonResult EmpresasRestantes()
        {
            List<EmpresasBean> empBean = new List<EmpresasBean>();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_EmpresaSinUser();
            return Json(empBean);
        }

        [HttpPost]
        public JsonResult UsuariosRestantes()
        {
            List<LoginBean> logBean = new List<LoginBean>();
            LoginDao logDao = new LoginDao();
            logBean = logDao.sp_UsersSinEmpresa();
            return Json(logBean);
        }

        [HttpPost]
        public JsonResult ListadoUsuarios(int tipo, int user)
        {
            List<LoginBean> logBean = new List<LoginBean>();
            LoginDao logDao = new LoginDao();
            logBean = logDao.sp_Datos_Usuarios(tipo, user);
            return Json(logBean);
        }

        [HttpPost]
        public JsonResult BloquearUsuario(int keyuser, int status, string passblock)
        {
            int user = Convert.ToInt32(Session["keyUser"]);
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            string result = "";
            logBean = logDao.sp_ValidaUsuario_EnSesion(passblock, user);
            if (logBean.sMensaje == "success")
            {
                logBean = logDao.sp_BloquearActivar_Usuarios(keyuser, status);
                if (logBean.sMensaje == "success") 
                { 
                    result = "correct"; 
                } else { 
                    result = "incorrect"; 
                }
            } else { 
                result = "errorpass"; 
            }
            var resp = new { resp = result };
            return Json(resp);
        }

        [HttpPost]
        public JsonResult DesbloquearUsuario(int keyuser, int status, string passactive)
        {
            int user = Convert.ToInt32(Session["keyUser"]);
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            string result = "";
            logBean = logDao.sp_ValidaUsuario_EnSesion(passactive, user);
            if (logBean.sMensaje == "success")
            {
                logBean = logDao.sp_BloquearActivar_Usuarios(keyuser, status);
                if (logBean.sMensaje == "success")
                {
                    result = "correct"; 
                } else { 
                    result = "incorrect"; 
                }
            }
            else { 
                result = "errorpass"; 
            }
            var resp = new { resp = result };
            return Json(resp);
        }

        [HttpPost]
        public JsonResult RegistrarUsuario(string user, string pass, int typeuser, int typeadmin)
        {
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            string result = "";
            logBean = logDao.sp_ValidaUsuario(user);
            if (logBean.sMensaje == "notexists")
            {
                logBean = logDao.sp_RegistroUsuario(user, pass, typeuser, typeadmin);
                if (logBean.sMensaje == "success")
                {
                    result = "goodinsert";
                } else {
                    result = "errorinsert";
                }
            } else {
                result = "existsuser";
            }
            var data = new { resp = result };
            return Json(data);
        }

        [HttpPost]
        public JsonResult RegistrarUsuarioEmpresa(int user, int empresa) 
        {
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            logBean = logDao.sp_RegistrarUsuarioEmpresa(user, empresa);
            string result = "";
            if (logBean.sMensaje == "success")
            {
                result = "correct";
            } else
            {
                result = "incorrect";
            }
            var data = new { resp = result };
            return Json(data);
        }

        [HttpPost]
        public JsonResult CambiarContraseña(int user, string pass)
        {
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            string result = "";
            logBean = logDao.sp_CambiarContraseñaUsuarios(user, pass);
            if (logBean.sMensaje == "success") {
                result = "correct";
            } else {
                result = "incorrect";
            }
            var data = new { resp = result };
            return Json(data);
        }
        
        [HttpPost]
        public JsonResult CentroDeTrabajo(int clvemp, string centro, string ubicacion)
        {
            LoginBean logBean = new LoginBean();
            LoginDao logDao = new LoginDao();
            string result = "";
            logBean = logDao.sp_RegistraCentroTrabajo(clvemp, centro, ubicacion);
            if (logBean.sMensaje == "success") {
                result = "correct";
            } else {
                result = "incorrect";
            }
            var data = new { resp = result };
            return Json(data);
        }

        [HttpPost]
        public JsonResult RegistrosCentros(int empresa)
        {
            List<EmpresasBean> empBe = new List<EmpresasBean>();
            EmpresasDao empDao = new EmpresasDao();
            empBe = empDao.sp_Datos_TRegistrosCentrosTrabajo_Empresa(empresa);
            return Json(empBe);
        }

        public ActionResult CentroTrabajo(int registro, int empresa)
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Datos_Centro_Trabajo(registro);
            return View(empBean);
        }

    }
}