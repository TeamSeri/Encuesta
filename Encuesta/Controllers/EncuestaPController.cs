﻿using System;
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
            int empre = objEnc.iIdEmpresa;

            if (Convert.ToInt32(Request.Form["num_empleados"]) > 0)
            {
                objEnc.iEmpleados = Convert.ToInt32(Request.Form["num_empleados"]);
                objEnc.iAplicacionesReq = Convert.ToInt32(Request.Form["num_aplicaciones"]);
                objEnc.iAplicacionesRes = Convert.ToInt32(Request.Form["num_aplicaciones"]);
                int emple = objEnc.iEmpleados;
                int appre = objEnc.iAplicacionesReq;
                int apres = objEnc.iAplicacionesReq;
                empBean = empDao.sp_Empresas_Update_Retrieve_Empresa(empre, emple, appre, apres);
            } else
            {
                empBean = empDao.sp_Datos_Empresas_Retrieve_Empresa(empre);
                objEnc.iEmpleados = empBean.iEmpleados;
                objEnc.iAplicacionesReq = empBean.iAplicacionesReq;
                objEnc.iIdEmpresa = empBean.iIdEmpresa;
                objEnc.iAplicacionesRes = empBean.iAplicacionesRestantes;
            }

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

        [HttpPost]
        public JsonResult Preguntas()
        {
            List<PreguntasBean> preBean = new List<PreguntasBean>();
            PreguntasDao preDao = new PreguntasDao();
            preBean = preDao.sp_Preguntas_Retrieve_Preguntas();
            return Json(preBean);
        }

        public ActionResult GuardarE1()
        {
            return View();
        }

    }
}