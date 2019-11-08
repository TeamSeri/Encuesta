using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Encuesta.Models.Beans;
using Encuesta.Models.Utilerias;

namespace Encuesta.Models.Daos
{
    public class EncuestasDao : Conexion
    {
        public List<EncuestasBean> sp_Encuesta1_Retrieve_Encuesta1()
        {
            List<EncuestasBean> listEncBean = new List<EncuestasBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Encuesta1_Retrieve_Encuesta1", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
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
        public List<EncuestasBean> sp_Encuesta2_Retrieve_Encuesta2()
        {
            List<EncuestasBean> listEncBean = new List<EncuestasBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Encuesta2_Retrieve_Encuesta2", this.conexion)
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

        public EncuestasBean sp_Insert_EncuestaOpcional_Datos(int empresa, string empleado, string puesto, string codigo, int estado)
        {
            EncuestasBean encBean = new EncuestasBean();

            try
            {
                DateTime fecha = DateTime.Now;
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Insert_EncuestaOpcional_Datos", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@Empleado", empleado));
                cmd.Parameters.Add(new SqlParameter("@Puesto", puesto));
                cmd.Parameters.Add(new SqlParameter("@Codigo", codigo));
                cmd.Parameters.Add(new SqlParameter("@Estado", estado));
                cmd.Parameters.Add(new SqlParameter("@Fecha", fecha));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    encBean.sMensaje = "success";
                } else
                {
                    encBean.sMensaje = "error";
                }
                cmd.Dispose();
                cmd.Parameters.Clear();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return encBean;
        }

        public List<EncuestasBean> sp_DatosEncuestaOpcional_DatosPorEmpresa(int key)
        {
            List<EncuestasBean> listEncBean = new List<EncuestasBean>();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_DatosEncuestaOpcional_DatosPorEmpresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", key));
                SqlDataReader data = cmd.ExecuteReader();
                if(data.HasRows)
                {
                    while (data.Read())
                    {
                        EncuestasBean encBean = new EncuestasBean();
                        encBean.iIdRegistroOpc = Convert.ToInt32(data["IdRegistroEOp"].ToString());
                        encBean.iIdEmpresaOpc = Convert.ToInt32(data["IdEmpresa"].ToString());
                        encBean.sNombreEmpleadoOpc = data["NombreEmpleado"].ToString();
                        encBean.sPuestoEmOpc = data["PuestoEm"].ToString();
                        encBean.sCodigoAcOpc = data["CodigoAc"].ToString();
                        encBean.iEstadoEncOpc = Convert.ToInt32(data["EstadoEn"].ToString());
                        encBean.sFechaEncOpc = data["FechaEnc"].ToString();
                        encBean.sEmpresa = data["Nombre"].ToString();
                        encBean.sDiagnosticoOpcDetalle = data["Diagnostico"].ToString();
                        encBean.sDiagnosticoOpc1 = data["Diagnostico1"].ToString();
                        encBean.sDiagnosticoOpc2 = data["Diagnostico2"].ToString();
                        encBean.sDiagnosticoOpc3 = data["Diagnostico3"].ToString();
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

        public List<EncuestasBean> sp_Datos_EncuestaOpcional_Datos()
        {
            List<EncuestasBean> listEncBean = new List<EncuestasBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_EncuestaOpcional_Datos", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        EncuestasBean encBean = new EncuestasBean();
                        encBean.iIdRegistroOpc = Convert.ToInt32(data["IdRegistroEOp"].ToString());
                        encBean.iIdEmpresaOpc = Convert.ToInt32(data["IdEmpresa"].ToString());
                        encBean.sNombreEmpleadoOpc = data["NombreEmpleado"].ToString();
                        encBean.sPuestoEmOpc = data["PuestoEm"].ToString();
                        encBean.sCodigoAcOpc = data["CodigoAc"].ToString();
                        encBean.iEstadoEncOpc = Convert.ToInt32(data["EstadoEn"].ToString());
                        encBean.sFechaEncOpc = data["FechaEnc"].ToString();
                        encBean.sEmpresa = data["Nombre"].ToString();
                        encBean.sDiagnosticoOpcDetalle = data["Diagnostico"].ToString();
                        encBean.sDiagnosticoOpc1 = data["Diagnostico1"].ToString();
                        encBean.sDiagnosticoOpc2 = data["Diagnostico2"].ToString();
                        encBean.sDiagnosticoOpc3 = data["Diagnostico3"].ToString();
                        listEncBean.Add(encBean);
                    }
                }
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return listEncBean;
        }

        public EncuestasBean sp_Datos_EncuestasOpcional_Dato(int empresa, string codigo, string puesto)
        {

            EncuestasBean encBean = new EncuestasBean();

            try
            {
                int estado = 0;
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_EncuestasOpcional_Dato", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Empresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@Codigo", codigo));
                cmd.Parameters.Add(new SqlParameter("@Puesto", puesto));
                cmd.Parameters.Add(new SqlParameter("@Estado", estado));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    encBean.iIdRegistroOpc = Convert.ToInt32(data["IdRegistroEOp"].ToString());
                    encBean.sMensaje = "success";
                }
                else
                {
                    encBean.sMensaje = "error";
                }
                cmd.Dispose();
                cmd.Parameters.Clear();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return encBean;

        }

        public EncuestasBean sp_Datos_EncuestaOpcional_Grafica(int tipo)
        {
            EncuestasBean encBean = new EncuestasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_EncuestaOpcional_Grafica", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Tipo", tipo));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    encBean.iTotalTipoOpc = Convert.ToInt32(data["Cantidad"].ToString());
                    encBean.sMensaje = "success";
                } 
                else
                {
                    encBean.sMensaje = "error";
                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.Write(exc);
            }

            return encBean;
        }

        public EncuestasBean sp_Datos_EncuestaOpcional_GraficaPorEmpresa(int tipo, int keyEmpresa)
        {
            EncuestasBean encBean = new EncuestasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_EncuestaOpcional_GraficaPorEmpresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Tipo", tipo));
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", keyEmpresa));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    encBean.iTotalTipoOpc = Convert.ToInt32(data["Cantidad"].ToString());
                    encBean.sMensaje = "success";
                }
                else
                {
                    encBean.sMensaje = "error";
                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.Write(exc);
            }

            return encBean;
        }

    }
}