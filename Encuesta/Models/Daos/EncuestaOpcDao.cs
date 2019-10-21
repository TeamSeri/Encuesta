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
    public class EncuestaOpcDao : Conexion
    {
        public List<EncuestasBean> sp_EncuestaOpc_Retrieve_EncuestaOpc()
        {
            List<EncuestasBean> listEncBean = new List<EncuestasBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_EncuestaOpc_Retrieve_EncuestaOpc", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if(data.HasRows)
                {
                    while(data.Read())
                    {
                        EncuestasBean encBean = new EncuestasBean();
                        encBean.iIdPregunta = Convert.ToInt32(data["IdPregunta"].ToString());
                        encBean.iNumeroPregunta = Convert.ToInt32(data["NumeroPregunta"].ToString());
                        encBean.sContenidoPregunta = data["ContenidoPregunta"].ToString();
                        encBean.sTipo = data["Tipo"].ToString();
                        encBean.sIdentificador = data["Identificador"].ToString();
                        listEncBean.Add(encBean);
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
            return listEncBean;
        }

        public EncuestasBean sp_Insert_Datos_DetalleEncuestaOpcional(int registro, int empresa, DateTime fecha, string diagnostico, int tipo, string puesto, string codigo)
        {
            EncuestasBean encBean = new EncuestasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Insert_Datos_DetalleEncuestaOpcional", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Registro", registro));
                cmd.Parameters.Add(new SqlParameter("@Empresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@Fecha",fecha));
                cmd.Parameters.Add(new SqlParameter("@Diagnostico", diagnostico));
                cmd.Parameters.Add(new SqlParameter("@Tipo", tipo));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    cmd.Dispose();
                    SqlCommand dre = new SqlCommand("sp_Update_EncuestaOpc_Estado_EncuestaOpc", this.conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    dre.Parameters.Add(new SqlParameter("@Registro", registro));
                    dre.Parameters.Add(new SqlParameter("@Empresa", empresa));
                    dre.Parameters.Add(new SqlParameter("@Puesto", puesto));
                    dre.Parameters.Add(new SqlParameter("@Codigo", codigo));
                    if (dre.ExecuteNonQuery() > 0)
                    {
                        encBean.sMensaje = "success";
                    } 
                    else
                    {
                        encBean.sMensaje = "errorupd";
                    }
                }
                else
                {
                    encBean.sMensaje = "errorins";
                }
            }
            catch (Exception exc)
            {
                encBean.sMensaje = exc.ToString();
            }

            return encBean;
        }

        public EncuestasBean sp_DatosDetalle_RegistroEncuestaOpcional(int registro)
        {
            EncuestasBean encBean = new EncuestasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_DatosDetalle_RegistroEncuestaOpcional", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Registro", registro));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read()) {
                    encBean.sFechaRegistroOpcDetalle = data["FechaRegistro"].ToString();
                    encBean.sDiagnosticoOpcDetalle = data["Diagnostico"].ToString();
                    encBean.iTipoDetalle = Convert.ToInt32(data["tipo"].ToString());
                    encBean.sNombreEmpleadoOpc = data["NombreEmpleado"].ToString();
                    encBean.sPuestoEmOpc = data["PuestoEm"].ToString();
                    encBean.sCodigoAcOpc = data["CodigoAc"].ToString();
                    encBean.iEstadoEncOpc = Convert.ToInt32(data["EstadoEn"].ToString());
                    encBean.sFechaEncOpc = data["FechaEnc"].ToString();
                    encBean.sEmpresa = data["Nombre"].ToString();
                    encBean.sMensaje = "success";
                } else
                {
                    encBean.sMensaje = "error";
                }
                cmd.Dispose();
                cmd.Parameters.Clear();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return encBean;
        }

    }
}