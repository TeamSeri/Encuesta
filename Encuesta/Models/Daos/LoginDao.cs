using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Encuesta.Models.Utilerias;
using Encuesta.Models.Beans;
using System.Security.Cryptography;
using System.Text;

namespace Encuesta.Models.Daos
{
    public class LoginDao : Conexion
    {
        public static string SHA512(string str)
        {
            SHA512 sha512 = SHA512Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha512.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
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
                string encrypt = SHA512(pass);
                cmd.Parameters.Add(new SqlParameter("@sUsuario", user));
                cmd.Parameters.Add(new SqlParameter("@sContrasena", encrypt));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    logBean.iIdUsuario = Convert.ToInt32(data["IdUsuario"]);
                    logBean.sUsuario = data["Usuario"].ToString();
                    logBean.iEstado = Convert.ToInt32(data["Estado"]);
                    logBean.iTipoUsuario = Convert.ToInt32(data["TipoUsuario"]);
                    logBean.iSpAdmin = (String.IsNullOrEmpty(data["SpAdmin"].ToString())) ? 0 : Convert.ToInt32(data["SpAdmin"]);
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
                logBean.sMensaje = exc.ToString();
                //Console.WriteLine(exc);
            }
            return logBean;
        }

        public List<LoginBean> sp_Datos_Usuarios(int tipo, int user)
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
                cmd.Parameters.Add(new SqlParameter("@IdUsuario", user));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        LoginBean logBean = new LoginBean();
                        logBean.iIdUsuario = Convert.ToInt32(data["IdUsuario"]);
                        logBean.sUsuario = data["Usuario"].ToString();
                        logBean.iEstado = Convert.ToInt32(data["Estado"]);
                        logBean.sEmpresa = data["Nombre"].ToString();
                        listUsersBean.Add(logBean);
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

            return listUsersBean;
        }

        public LoginBean sp_ValidaUsuario_EnSesion(string pass, int user)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_ValidaUsuario_EnSesion", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                string encrypt = SHA512(pass);
                cmd.Parameters.Add(new SqlParameter("@IdUsuario",user));
                cmd.Parameters.Add(new SqlParameter("@Password", encrypt));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
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

        public LoginBean sp_BloquearActivar_Usuarios(int keyuser, int status)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_BloquearActivar_Usuarios", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Estado",status));
                cmd.Parameters.Add(new SqlParameter("@IdUsuario", keyuser));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    logBean.sMensaje = "success";
                } 
                else
                {
                    logBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return logBean;
        }

        public List<LoginBean> sp_UsersSinEmpresa()
        {
            List<LoginBean> listLogBean = new List<LoginBean>();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_UsersSinEmpresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        LoginBean logBean = new LoginBean();
                        logBean.iIdUsuario = Convert.ToInt32(data["IdUsuario"].ToString());
                        logBean.sUsuario = data["Usuario"].ToString();
                        listLogBean.Add(logBean);
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
            return listLogBean;
        }

        public LoginBean sp_ValidaUsuario(string user)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_ValidaUsuario", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Usuario", user));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    logBean.sMensaje = "exists";
                } 
                else
                {
                    logBean.sMensaje = "notexists";
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

        public LoginBean sp_RegistroUsuario(string user, string pass, int typeuser, int typeadmin)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_RegistroUsuario", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                string encrypt = SHA512(pass);
                cmd.Parameters.Add(new SqlParameter("@Usuario", user));
                cmd.Parameters.Add(new SqlParameter("@Password", encrypt));
                cmd.Parameters.Add(new SqlParameter("@TipoUser", typeuser));
                cmd.Parameters.Add(new SqlParameter("@TipoAdmin", typeadmin));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    logBean.sMensaje = "success";
                }
                else
                {
                    logBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return logBean;
        }

        public LoginBean sp_RegistrarUsuarioEmpresa(int user, int empresa)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_RegistrarUsuarioEmpresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdUsuario", user));
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    logBean.sMensaje = "success";
                } else
                {
                    logBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return logBean;
        }

        public LoginBean sp_CambiarContrasenaUsuarios(int user, string pass)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_CambiarContraseñaUsuarios", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                string encrypt = SHA512(pass);
                cmd.Parameters.Add(new SqlParameter("@IdUsuario", user));
                cmd.Parameters.Add(new SqlParameter("@Password", encrypt));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    logBean.sMensaje = "success";
                } 
                else
                {
                    logBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return logBean;
        }

        public LoginBean sp_RegistraCentroTrabajo(int clvemp, string centro, string ubicacion)
        {
            LoginBean logBean = new LoginBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_RegistraCentroTrabajo", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", clvemp));
                cmd.Parameters.Add(new SqlParameter("@Centro", centro));
                cmd.Parameters.Add(new SqlParameter("@Ubicacion", ubicacion));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    logBean.sMensaje = "success";
                }
                else
                {
                    logBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return logBean;
        }

    }
}