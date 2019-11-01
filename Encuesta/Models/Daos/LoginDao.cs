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
    public class LoginDao : Conexion
    {
        public LoginBean sp_Datos_Usuarios_Retrieve_Usuario(string user, string pass)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Usuarios_Retrieve_Usuario", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@sUsuario", user));
                cmd.Parameters.Add(new SqlParameter("@sContrasena", pass));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    logBean.iIdUsuario = Convert.ToInt32(data["IdUsuario"]);
                    logBean.sUsuario = data["Usuario"].ToString();
                    logBean.iEstado = Convert.ToInt32(data["Estado"]);
                    logBean.iTipoUsuario = Convert.ToInt32(data["TipoUsuario"]);
                    logBean.iSpAdmin = Convert.ToInt32(data["SpAdmin"]);
                    logBean.sMensaje = "success";
                }
                else
                {
                    logBean.sMensaje = "error";
                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return logBean;
        }

        public List<LoginBean> sp_Datos_Usuarios(int tipo)
        {
            List<LoginBean> listUsersBean = new List<LoginBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Usuarios", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@TipoUsuario",tipo));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    LoginBean logBean = new LoginBean();
                    logBean.iIdUsuario = Convert.ToInt32(data["IdUsuario"]);
                    listUsersBean.Add(logBean);
                }
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return listUsersBean;
        }

    }
}