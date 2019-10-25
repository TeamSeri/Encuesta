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
        private int empresa { get; set; }
        public ActionResult Index()
        {
            EmpresasBean empBean = new EmpresasBean();
            EmpresasDao empDao = new EmpresasDao();
            EncuestaP objEnc = new EncuestaP();

            objEnc.iIdEmpresa = Convert.ToInt32(Request.Form["nom_empresa"]);
            objEnc.sCodigoEmpresa = Request.Form["codigo"].ToString();
            int empre = objEnc.iIdEmpresa;
            string codigo = objEnc.sCodigoEmpresa;
            int estado = 1;
            empBean = empDao.sp_Datos_Empresas_Retrieve_Empresa(empre, codigo, estado);
            objEnc.iIdRegistroEmpresas = empBean.iIdRegistroEmpresas;
            objEnc.iEmpleados = empBean.iEmpleados;
            objEnc.iAplicacionesReq = empBean.iAplicacionesReq;
            objEnc.iIdEmpresa = empBean.iIdEmpresa;
            objEnc.iAplicacionesRes = empBean.iAplicacionesRestantes;
            objEnc.sTipoEncuesta = empBean.sTipoEncuesta;
            objEnc.sCodigoEmpresa = empBean.sCodigoEmpresa;
            if (Convert.ToString(objEnc.iIdEmpresa) != "0")
            {
                empresa = objEnc.iIdEmpresa;
                objEnc.sEstado = empBean.sMensaje;
            }
            else
            {
                objEnc.sEstado = "error";
            }
            return View(objEnc);
        }

        public ActionResult Opcional()
        {
            EncuestasBean tBean = new EncuestasBean();
            EncuestasBean encBean = new EncuestasBean();
            EncuestasDao encDao = new EncuestasDao();

            int empresa = Convert.ToInt32(Request.Form["nom_empresa"]);
            string puesto = Request.Form["puesto"].ToString();
            string codigo = Request.Form["codigo"].ToString();

            encBean = encDao.sp_Datos_EncuestasOpcional_Dato(empresa, codigo, puesto);
            if (encBean.sMensaje == "success")
            {
                tBean.iIdRegistroOpc = encBean.iIdRegistroOpc;
                tBean.iIdEmpresaOpc = empresa;
                tBean.sPuestoEmOpc = puesto;
                tBean.sCodigoAcOpc = codigo;
                tBean.sMensaje = "success";
            } 
            else
            {
                tBean.sMensaje = "error";
            }


            return View(tBean);
        }

        public static string Encrypt(string empresa)
        {
            string result = string.Empty;
            byte[] encrypted = System.Text.Encoding.Unicode.GetBytes(empresa.ToString());
            result = Convert.ToBase64String(encrypted);
            return result;
        }

        public static string Decrypt(string empresa)
        {
            string result = string.Empty;
            byte[] decrypted = Convert.FromBase64String(empresa.ToString());
            result = System.Text.Encoding.Unicode.GetString(decrypted);
            return result;
        }

        [HttpPost]
        public JsonResult DatosEmpresa(int empresa, string codigo)
        {
            EmpresasBean empBe = new EmpresasBean();
            EmpresasDao empDa = new EmpresasDao();
            int estado = 1;
            empBe = empDa.sp_Datos_Empresas_Retrieve_Empresa(empresa, codigo, estado);
            return Json(empBe);
        }

        [HttpPost]
        public JsonResult DatosEncuestaOpc(int empresa, string codigo, string puesto)
        {
            EncuestasBean encBean = new EncuestasBean();
            EncuestasDao encDao = new EncuestasDao();
            encBean = encDao.sp_Datos_EncuestasOpcional_Dato(empresa, codigo, puesto);
            var data = new { mensaje = encBean.sMensaje };
            return Json(data);
        }

        [HttpPost]
        public JsonResult DatosEmpresas()
        {
            List<EmpresasBean> empBean = new List<EmpresasBean>();
            EmpresasDao empDao = new EmpresasDao();
            empBean = empDao.sp_Empresas_Retrieve_Empresas();
            return Json(empBean);
        }

        [HttpPost]
        public JsonResult Preguntas()
        {
            List<PreguntasBean> preBean = new List<PreguntasBean>();
            PreguntasDao preDao = new PreguntasDao();
            preBean = preDao.sp_Preguntas_Retrieve_Preguntas();
            return Json(preBean);
        }

        [HttpPost]
        public ActionResult Encuesta1()
        {
            List<EncuestasBean> encBean = new List<EncuestasBean>();
            EncuestasDao enc2Dao = new EncuestasDao();
            encBean = enc2Dao.sp_Encuesta1_Retrieve_Encuesta1();
            return Json(encBean);
        }

        [HttpPost]
        public JsonResult Encuesta2()
        {
            List<EncuestasBean> encBean = new List<EncuestasBean>();
            EncuestasDao enc2Dao = new EncuestasDao();
            encBean = enc2Dao.sp_Encuesta2_Retrieve_Encuesta2();
            return Json(encBean);
        }

        [HttpPost]
        public ActionResult GuardarEncuesta1(FormCollection form)
        {
            int resultado = 0, formLenght = form.Count, resultadoC1 = 0, resultadoC2 = 0, resultadoC3 = 0, resultadoC4 = 0, resultadoC5 = 0, empresa = Convert.ToInt32(form["empresa"]);
            string tipo = form["tipo"].ToString(), codigo = form["codigo"].ToString();
            int registro = Convert.ToInt32(form["registro"]);
            int resp1 = Convert.ToInt32(form["resp1"]), resp2 = Convert.ToInt32(form["resp2"]),
                resp3 = Convert.ToInt32(form["resp3"]), resp4 = Convert.ToInt32(form["resp4"]),
                resp5 = Convert.ToInt32(form["resp5"]), resp6 = Convert.ToInt32(form["resp6"]),
                resp7 = Convert.ToInt32(form["resp7"]), resp8 = Convert.ToInt32(form["resp8"]),
                resp9 = Convert.ToInt32(form["resp9"]), resp10 = Convert.ToInt32(form["resp10"]),
                resp11 = Convert.ToInt32(form["resp11"]), resp12 = Convert.ToInt32(form["resp12"]),
                resp13 = Convert.ToInt32(form["resp13"]), resp14 = Convert.ToInt32(form["resp14"]),
                resp15 = Convert.ToInt32(form["resp15"]), resp16 = Convert.ToInt32(form["resp16"]),
                resp17 = Convert.ToInt32(form["resp17"]), resp18 = Convert.ToInt32(form["resp18"]),
                resp19 = Convert.ToInt32(form["resp19"]), resp20 = Convert.ToInt32(form["resp20"]),
                resp21 = Convert.ToInt32(form["resp21"]), resp22 = Convert.ToInt32(form["resp22"]),
                resp23 = Convert.ToInt32(form["resp23"]), resp24 = Convert.ToInt32(form["resp24"]),
                resp25 = Convert.ToInt32(form["resp25"]), resp26 = Convert.ToInt32(form["resp26"]),
                resp27 = Convert.ToInt32(form["resp27"]), resp28 = Convert.ToInt32(form["resp28"]),
                resp29 = Convert.ToInt32(form["resp29"]), resp30 = Convert.ToInt32(form["resp30"]),
                resp31 = Convert.ToInt32(form["resp31"]), resp32 = Convert.ToInt32(form["resp32"]),
                resp33 = Convert.ToInt32(form["resp33"]), resp34 = Convert.ToInt32(form["resp34"]),
                resp35 = Convert.ToInt32(form["resp35"]), resp36 = Convert.ToInt32(form["resp36"]),
                resp37 = Convert.ToInt32(form["resp37"]), resp38 = Convert.ToInt32(form["resp38"]),
                resp39 = Convert.ToInt32(form["resp39"]), resp40 = Convert.ToInt32(form["resp40"]),
                resp41 = Convert.ToInt32(form["resp41"]), resp42 = Convert.ToInt32(form["resp42"]),
                resp43 = Convert.ToInt32(form["resp43"]), resp44 = Convert.ToInt32(form["resp44"]),
                resp45 = Convert.ToInt32(form["resp45"]), resp46 = Convert.ToInt32(form["resp46"]), 
                resp47 = Convert.ToInt32(form["resp47"]), resp48 = Convert.ToInt32(form["resp48"]),
                resp49 = Convert.ToInt32(form["resp49"]), resp50 = Convert.ToInt32(form["resp50"]),
                resp51 = Convert.ToInt32(form["resp51"]), resp52 = Convert.ToInt32(form["resp52"]),
                resp53 = Convert.ToInt32(form["resp53"]), resp54 = Convert.ToInt32(form["resp54"]),
                resp55 = Convert.ToInt32(form["resp55"]), resp56 = Convert.ToInt32(form["resp56"]), 
                resp57 = Convert.ToInt32(form["resp57"]), resp58 = Convert.ToInt32(form["resp58"]),
                resp59 = Convert.ToInt32(form["resp59"]), resp60 = Convert.ToInt32(form["resp60"]),
                resp61 = Convert.ToInt32(form["resp61"]), resp62 = Convert.ToInt32(form["resp62"]),
                resp63 = Convert.ToInt32(form["resp63"]), resp64 = Convert.ToInt32(form["resp64"]),
                resp65 = Convert.ToInt32(form["resp65"]), resp66 = Convert.ToInt32(form["resp66"]),
                resp67 = Convert.ToInt32(form["resp67"]), resp68 = Convert.ToInt32(form["resp68"]), 
                resp69 = Convert.ToInt32(form["resp69"]), resp70 = Convert.ToInt32(form["resp70"]),
                resp71 = Convert.ToInt32(form["resp71"]), resp72 = Convert.ToInt32(form["resp72"]);

            resultado = resp1 + resp2 + resp3 + resp4 + resp5 + resp6 + resp7 + resp8 + resp9 + resp10 + resp11 + resp12 + resp13 + resp14 + resp15 + resp16 + resp17 + resp18 + resp19 + resp20 + resp21 + resp22 + resp23 + resp24 + resp25 + resp26 + resp27 + resp28 + resp29 + resp30 + resp31 + resp32 + resp33 + resp34 + resp35 + resp36 + resp37 + resp38 + resp39 + resp40 + resp41 + resp42 + resp43 + resp44 + resp45 + resp46 + resp47 + resp48 + resp49 + resp50 + resp51 + resp52 + resp53 + resp54 + resp55 + resp56 + resp57 + resp58 + resp59 + resp60 + resp61 + resp62 + resp63 + resp64 + resp65 + resp66 + resp67 + resp68 + resp69 + resp70 + resp71 + resp72;

            //Categorias
            string nombreC1 = "Ambiente de trabajo";
            resultadoC1 = resp1 + resp2 + resp3 + resp4 + resp5;
            string nombreC2 = "Factores propios de la actividad";
            resultadoC2 = resp6 + resp12 + resp7 + resp8 + resp9 + resp10 + resp11 + resp65 + resp66 + resp67 + resp68 + resp13 + resp14 + resp15 + resp16 + resp25 + resp26 + resp27 + resp28 + resp23 + resp24 + resp29 + resp30 + resp35 + resp36;
            string nombreC3 = "Organización del tiempo de trabajo";
            resultadoC3 = resp17 + resp18 + resp19 + resp20 + resp21 + resp22;
            string nombreC4 = "Liderazgo y relaciones en el trabajo";
            resultadoC4 = resp31 + resp32 + resp33 + resp34 + resp37 + resp38 + resp39 + resp40 + resp41 + resp42 + resp43 + resp44 + resp45 + resp46 + resp69 + resp70 + resp71 + resp72 + resp57 + resp58 + resp59 + resp60 + resp61 + resp62 + resp63 + resp64;
            string nombreC5 = "Entorno organizacional";
            resultadoC5 = resp47 + resp48 + resp49 + resp50 + resp51 + resp52 + resp55 + resp56 + resp53 + resp54;

            //Dominios
            //El dominio 1 Condiciones en el ambiente de trabajo es igual a la categoria ambiente de trabajo
            string nombreD2 = "Carga de trabajo";
            int resultadoD2 = resp6 + resp12 + resp7 + resp8 + resp9 + resp10 + resp11 + resp65 + resp66 + resp67 + resp68 + resp13 + resp14 + resp15 + resp16;
            string nombreD3 = "Falta de control sobre el trabajo";
            int resultadoD3 = resp25 + resp26 + resp27 + resp28 + resp23 + resp24 + resp29 + resp30 + resp35 + resp36;
            string nombreD4 = "Jornada de trabajo";
            int resultadoD4 = resp17 + resp18;
            string nombreD5 = "Interferencia en la relacion trabajo-familia";
            int resultadoD5 = resp19 + resp20 + resp21 + resp22;
            string nombreD6 = "Liderazgo";
            int resultadoD6 = resp31 + resp32 + resp33 + resp34 + resp37 + resp38 + resp39 + resp40 + resp41;
            string nombreD7 = "Relacion en el trabajo";
            int resultadoD7 = resp42 + resp43 + resp44 + resp45 + resp46 + resp69 + resp70 + resp71 + resp72;
            string nombreD8 = "Violencia";
            int resultadoD8 = resp57 + resp58 + resp59 + resp60 + resp61 + resp62 + resp63 + resp64;
            string nombreD9 = "Reconocimiento del desempeño";
            int resultadoD9 = resp47 + resp48 + resp49 + resp50 + resp51 + resp52;
            string nombreD10 = "Insuficiente sentido de pertenencia e inestabilidad";
            int resultadoD10 = resp55 + resp56 + resp53 + resp54;

            RegistroDao regDao = new RegistroDao();
            RegistroCategoriasBean catBean = new RegistroCategoriasBean();

            catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC1, resultadoC1, empresa, registro);
            if (catBean.sMensaje == "success")
            {
                catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC2, resultadoC2, empresa, registro);
                if (catBean.sMensaje == "success")
                {
                    catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC3, resultadoC3, empresa, registro);
                    if (catBean.sMensaje == "success")
                    {
                        catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC4, resultadoC4, empresa, registro);
                        if (catBean.sMensaje == "success")
                        {
                            catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC5, resultadoC5, empresa, registro);
                        }
                    }
                }
            }

            if (catBean.sMensaje == "success")
            {
                RegistroCategoriasBean domBean = new RegistroCategoriasBean();
                domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD2, resultadoD2, empresa, registro);
                if(domBean.sMensaje == "success")
                {
                    domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD3, resultadoD3, empresa, registro);
                    if(domBean.sMensaje == "success")
                    {
                        domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD4, resultadoD4, empresa, registro);
                        if(domBean.sMensaje == "success")
                        {
                            domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD5, resultadoD5, empresa, registro);
                            if (domBean.sMensaje == "success")
                            {
                                domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD6, resultadoD6, empresa, registro);
                                if (domBean.sMensaje == "success")
                                {
                                    domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD7, resultadoD7, empresa, registro);
                                    if (domBean.sMensaje == "success")
                                    {
                                        domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD8, resultadoD8, empresa, registro);
                                        if (domBean.sMensaje == "success")
                                        {
                                            domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD9, resultadoD9, empresa, registro);
                                            if (domBean.sMensaje == "success")
                                            {
                                                domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD10, resultadoD10, empresa, registro);
                                            }
                                        }
                                    }
                                }
                            }
                         }
                    }
                }
            }

            RegistroBean regBean = new RegistroBean();
            DateTime fecha = DateTime.Now;
            regBean = regDao.sp_RegistroEncuestas_Insert_RegistroEncuestas(empresa, fecha, resultado, tipo, registro);
            return View(regBean);
        }

        [HttpPost]
        public ActionResult GuardarEncuesta2(FormCollection form)
        {
            int resultado = 0,
                formLength = form.Count, resultadoC1 = 0, resultadoC2 = 0, resultadoC3 = 0, resultadoC4 = 0,
                empresa = Convert.ToInt32(form["empresa"]);
            string tipo = form["tipo"].ToString(),
                codigo = form["codigo"].ToString();
            int registro = Convert.ToInt32(form["registro"]);
            int resp1 = Convert.ToInt32(form["resp1"]), resp2 = Convert.ToInt32(form["resp2"]),
                resp3 = Convert.ToInt32(form["resp3"]), resp4 = Convert.ToInt32(form["resp4"]),
                resp5 = Convert.ToInt32(form["resp5"]), resp6 = Convert.ToInt32(form["resp6"]),
                resp7 = Convert.ToInt32(form["resp7"]), resp8 = Convert.ToInt32(form["resp8"]),
                resp9 = Convert.ToInt32(form["resp9"]), resp10 = Convert.ToInt32(form["resp10"]),
                resp11 = Convert.ToInt32(form["resp11"]), resp12 = Convert.ToInt32(form["resp12"]),
                resp13 = Convert.ToInt32(form["resp13"]), resp14 = Convert.ToInt32(form["resp14"]),
                resp15 = Convert.ToInt32(form["resp15"]), resp16 = Convert.ToInt32(form["resp16"]),
                resp17 = Convert.ToInt32(form["resp17"]), resp18 = Convert.ToInt32(form["resp18"]),
                resp19 = Convert.ToInt32(form["resp19"]), resp20 = Convert.ToInt32(form["resp20"]),
                resp21 = Convert.ToInt32(form["resp21"]), resp22 = Convert.ToInt32(form["resp22"]),
                resp23 = Convert.ToInt32(form["resp23"]), resp24 = Convert.ToInt32(form["resp24"]),
                resp25 = Convert.ToInt32(form["resp25"]), resp26 = Convert.ToInt32(form["resp26"]),
                resp27 = Convert.ToInt32(form["resp27"]), resp28 = Convert.ToInt32(form["resp28"]),
                resp29 = Convert.ToInt32(form["resp29"]), resp30 = Convert.ToInt32(form["resp30"]),
                resp31 = Convert.ToInt32(form["resp31"]), resp32 = Convert.ToInt32(form["resp32"]),
                resp33 = Convert.ToInt32(form["resp33"]), resp34 = Convert.ToInt32(form["resp34"]),
                resp35 = Convert.ToInt32(form["resp35"]), resp36 = Convert.ToInt32(form["resp36"]),
                resp37 = Convert.ToInt32(form["resp37"]), resp38 = Convert.ToInt32(form["resp38"]),
                resp39 = Convert.ToInt32(form["resp39"]), resp40 = Convert.ToInt32(form["resp40"]),
                resp41 = Convert.ToInt32(form["resp41"]), resp42 = Convert.ToInt32(form["resp42"]),
                resp43 = Convert.ToInt32(form["resp43"]), resp44 = Convert.ToInt32(form["resp44"]),
                resp45 = Convert.ToInt32(form["resp45"]), resp46 = Convert.ToInt32(form["resp46"]);

            resultado = resp1 + resp2 + resp3 + resp4 + resp5 + resp6 + resp7 + resp8 + resp9 + resp10 + resp11 + resp12 + resp13 + resp14 + resp15 + resp16 + resp17 + resp18 + resp19 + resp20 + resp21 + resp22 + resp23 + resp24 + resp25 + resp26 + resp27 + resp28 + resp29 + resp30 + resp31 + resp32 + resp33 + resp34 + resp35 + resp36 + resp37 + resp38 + resp39 + resp40 + resp41 + resp42 + resp43 + resp44 + resp45 + resp46;
             
            //Categorias
            string nombreC1 = "Ambiente de trabajo";
            resultadoC1 = resp1 + resp2 + resp3;
            string nombreC2 = "Factores propios de la actividad";
            resultadoC2 = resp4 + resp9 + resp5 + resp6 + resp7 + resp8 + resp41 + resp42 + resp43 + resp10 + resp11 + resp12 + resp13 + resp20 + resp21 + resp22 + resp18 + resp19 + resp26 + resp27;
            string nombreC3 = "Organización del tiempo de trabajo";
            resultadoC3 = resp15 + resp14 + resp16 + resp17;
            string nombreC4 = "Liderazgo y relaciones en el trabajo";
            resultadoC4 = resp23 + resp24 + resp25 + resp28 + resp29 + resp30 + resp31 + resp32 + resp44 + resp45 + resp46 + resp33 + resp34 + resp35 + resp36 + resp37 + resp38 + resp39 + resp40;

            //Dominios
            //El dominio 1 condiciones en el ambiente de trabajo contiene los mismos valores que la categoria 1 ambiente de trabajo
            string nombreD2 = "Carga de trabajo";
            int resultadoD2 = resp4 + resp9 + resp5 + resp6 + resp7 + resp8 + resp41 + resp42 + resp43 + resp10 + resp11 + resp12 + resp13;
            string nombreD3 = "Falta de control sobre el trabajo";
            int resultadoD3 = resp20 + resp21 + resp22 + resp18 + resp19 + resp26 + resp27;
            string nombreD4 = "Jornada de trabajo";
            int resultadoD4 = resp14 + resp15;
            string nombreD5 = "Interferencia en la relacion trabajo-familia";
            int resultadoD5 = resp16 + resp17;
            string nombreD6 = "Liderazgo";
            int resultadoD6 = resp23 + resp24 + resp25 + resp28 + resp29;
            string nombreD7 = "Relacion en el trabajo";
            int resultadoD7 = resp30 + resp31 + resp32 + resp44 + resp45 + resp46;
            string nombreD8 = "Violencia";
            int resultadoD8 = resp33 + resp34 + resp35 + resp36 + resp37 + resp38 + resp39 + resp40;

            RegistroDao regDao = new RegistroDao();

            RegistroCategoriasBean catBean = new RegistroCategoriasBean();
            catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC1, resultadoC1, empresa, registro);

            if (catBean.sMensaje == "success")
            {
                catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC2, resultadoC2, empresa, registro);
                if (catBean.sMensaje == "success")
                {
                    catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC3, resultadoC3, empresa, registro);
                    if (catBean.sMensaje == "success")
                    {
                        catBean = regDao.sp_Insert_Categorias_Data_Categoria(nombreC4, resultadoC4, empresa, registro);
                    }
                }
            }

            if (catBean.sMensaje == "success")
            {
                RegistroCategoriasBean domBean = new RegistroCategoriasBean();
                domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD2, resultadoD2, empresa, registro);
                if (domBean.sMensaje == "success")
                {
                    domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD3, resultadoD3, empresa, registro);
                    if (domBean.sMensaje == "success")
                    {
                        domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD4, resultadoD4, empresa, registro);
                        if (domBean.sMensaje == "success")
                        {
                            domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD5, resultadoD5, empresa, registro);
                            if (domBean.sMensaje == "success")
                            {
                                domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD6, resultadoD6, empresa, registro);
                                if (domBean.sMensaje == "success")
                                {
                                    domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD7, resultadoD7, empresa, registro);
                                    if (domBean.sMensaje == "success")
                                    {
                                        domBean = regDao.sp_Insert_Dominios_Data_Dominio(nombreD8, resultadoD8, empresa, registro);
                                    }
                                }
                            }
                        }
                    }
                }

            }

            RegistroBean regBean = new RegistroBean();
            DateTime fecha = DateTime.Now;
            regBean = regDao.sp_RegistroEncuestas_Insert_RegistroEncuestas(empresa, fecha, resultado, tipo, registro);
            return View(regBean);
        }

        [HttpPost]
        public ActionResult GuardarEncuestaOpc(FormCollection form)
        {
            int registro = Convert.ToInt32(form["registro"]), empresa = Convert.ToInt32(form["empresa"]), tipo = 0;
            string codigo = form["codigo"].ToString(), puesto = form["puesto"].ToString(), diagnostico = "",
                diagnostico1 = "", diagnostico2 = "", diagnostico3 = "";
            int resp1 = Convert.ToInt32(form["resp1"]), resp2 = Convert.ToInt32(form["resp2"]),
                resp3 = Convert.ToInt32(form["resp3"]), resp4 = Convert.ToInt32(form["resp4"]),
                resp5 = Convert.ToInt32(form["resp5"]), resp6 = Convert.ToInt32(form["resp6"]),
                resp7 = Convert.ToInt32(form["resp7"]), resp8 = Convert.ToInt32(form["resp8"]),
                resp9 = Convert.ToInt32(form["resp9"]), resp10 = Convert.ToInt32(form["resp10"]),
                resp11 = Convert.ToInt32(form["resp11"]), resp12 = Convert.ToInt32(form["resp12"]),
                resp13 = Convert.ToInt32(form["resp13"]), resp14 = Convert.ToInt32(form["resp14"]),
                resp15 = Convert.ToInt32(form["resp15"]), resp16 = Convert.ToInt32(form["resp16"]),
                resp17 = Convert.ToInt32(form["resp17"]), resp18 = Convert.ToInt32(form["resp18"]),
                resp19 = Convert.ToInt32(form["resp19"]);

            if (resp7 == 1 || resp8 == 1) {
                diagnostico1 = "Si";
            } else {
                diagnostico1 = "No";
            }

            if (resp9 == 1 || resp10 == 1 || resp11 == 1 || resp12 == 1 || resp13 == 1 || resp14 == 1 || resp15 == 1) {
                diagnostico2 = "Si"; 
            } else {
                diagnostico2 = "No";
            }

            if (resp16 == 1 || resp17 == 1 || resp18 == 1 || resp19 == 1) {
                diagnostico3 = "Si";
            } else {
                diagnostico3 = "No";
            }

            if (resp1 == 0 && resp2 == 0 && resp3 == 0 && resp4 == 0 && resp5 == 0 && resp6 == 0)
            {
                tipo = 0;
                diagnostico = "No requiere valoración clínica";
            } else if (resp8 == 1 || resp9 == 1 || resp10 == 1 || resp11 == 1 || resp12 == 1 || resp13 == 1 || resp14 == 1 || resp15 == 1 || resp16 == 1 || resp17 == 1 || resp18 == 1 || resp19 == 1)
            {
                tipo = 1;
                diagnostico = "Requiere atención clínica";
            } else
            {
                tipo = 0;
                diagnostico = "No requiere valoración clínica";
            }

            EncuestasBean encBean = new EncuestasBean();
            EncuestaOpcDao encOpcDao = new EncuestaOpcDao();
            DateTime fecha = DateTime.Now;
            encBean = encOpcDao.sp_Insert_Datos_DetalleEncuestaOpcional(registro, empresa, fecha, diagnostico, tipo, puesto, codigo, diagnostico1, diagnostico2, diagnostico3);

            return View(encBean);
        }

        [HttpPost]
        public JsonResult EncuestaOpc()
        {
            List<EncuestasBean> encBean = new List<EncuestasBean>();
            EncuestaOpcDao encOpcDao = new EncuestaOpcDao();
            encBean = encOpcDao.sp_EncuestaOpc_Retrieve_EncuestaOpc();
            return Json(encBean);
        }

        public ActionResult GuardarE1()
        {
            return View();
        }

    }
}