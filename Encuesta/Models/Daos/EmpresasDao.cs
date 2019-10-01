using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Encuesta.Models.Utilerias;
using Encuesta.Models.Beans;

namespace Encuesta.Models.Daos
{
    public class EmpresasDao : Conexion
    {
        public List<EmpresasBean> sp_Empresas_Retrieve_Empresas()
        {
            List<EmpresasBean> listEmp = new List<EmpresasBean>();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Empresas_Retrieve_Empresas", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        EmpresasBean empBean = new EmpresasBean();
                        empBean.iIdEmpresa = Convert.ToInt32(data["IdEmpresa"].ToString());
                        empBean.sNombre = data["Nombre"].ToString();
                        if (data["Empleados"].ToString() == "")
                        {
                            empBean.iEmpleados = 0;
                        }
                        else
                        {
                            empBean.iEmpleados = Convert.ToInt32(data["Empleados"].ToString());
                        }
                        listEmp.Add(empBean);
                    }
                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return listEmp;
        }
        public EmpresasBean sp_Datos_Empresas_Retrieve_Empresa(int empresa)
        {
            EmpresasBean empBe = new EmpresasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Empresas_Retrieve_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@iIdEmpresa", empresa));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    empBe.iIdEmpresa = int.Parse(data["IdEmpresa"].ToString());
                    empBe.sNombre = data["Nombre"].ToString();
                    empBe.iEmpleados = int.Parse(data["Empleados"].ToString());
                    empBe.iAplicacionesReq = int.Parse(data["AplicacionesRequeridas"].ToString());
                    empBe.iAplicacionesRestantes = int.Parse(data["AplicacionesRestantes"].ToString());
                    empBe.sMensaje = "success";

                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {

                Console.WriteLine(exc);
            }
            return empBe;
        }
        public EmpresasBean sp_Empresas_Update_Retrieve_Empresa(int empresa, int empleados, int applicaciones, int restantes)
        {
            EmpresasBean empBean = new EmpresasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Empresas_Update_Retrieve_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@CantidadEmpleados", empleados));
                cmd.Parameters.Add(new SqlParameter("@AplicacionesRequeridas", applicaciones));
                cmd.Parameters.Add(new SqlParameter("@AplicacionesRestantes", restantes));
                //SqlDataReader data = cmd.ExecuteReader();
                if (cmd.ExecuteNonQuery() > 0)
                {
                    empBean.sMensaje = "success";
                }
                else
                {
                    empBean.sMensaje = "error";
                }
                cmd.Dispose();
                cmd.Parameters.Clear();
                //data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.Write(exc);
                throw;
            }
            return empBean;
        }
    }
}