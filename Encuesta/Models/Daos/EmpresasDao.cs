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
    }
}