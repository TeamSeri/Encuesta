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
    public class RegistroDao : Conexion
    {
        public RegistroBean sp_RegistroEncuestas_Insert_RegistroEncuestas(int empresa, DateTime fecha)
        {
            RegistroBean regBean = new RegistroBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_RegistroEncuestas_Insert_RegistroEncuestas", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@FechaRegistro", fecha));
                //SqlDataReader data = cmd.ExecuteReader();
                if (cmd.ExecuteNonQuery() > 0)
                {
                    regBean.sMensaje = "success";
                } else
                {
                    regBean.sMensaje = "error";
                }
                cmd.Dispose();
                //data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                regBean.sMensaje = exc.ToString();
            }
            return regBean;
        }
    }
}