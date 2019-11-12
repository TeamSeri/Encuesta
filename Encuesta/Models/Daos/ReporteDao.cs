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
    public class ReporteDao : Conexion
    {

        public ReporteBean sp_Insert_Reporta_Problema(int keyreport, string msjreport, string code)
        {
            ReporteBean repBean = new ReporteBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Insert_Reporta_Problema", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdUsuario", keyreport));
                cmd.Parameters.Add(new SqlParameter("@ContenidoReporte", msjreport));
                cmd.Parameters.Add(new SqlParameter("@CodigoReporte", code));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    repBean.sMensaje = "success";
                } 
                else
                {
                    repBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return repBean;
        }

        public List<ReporteBean> sp_Notifica_Reportes_Resueltos(int clvuser, string tipo)
        {
            List<ReporteBean> listRepBean = new List<ReporteBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Notifica_Reportes_Resueltos", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdUsuario", clvuser));
                cmd.Parameters.Add(new SqlParameter("@Tipo", tipo));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    if (tipo == "AllAdminAll")
                    {
                        while (data.Read())
                        {
                            ReporteBean repBeanl = new ReporteBean();
                            repBeanl.iIdReporte = Convert.ToInt32(data["IdReporte"]);
                            repBeanl.sCodigoReporte = data["CodigoReporte"].ToString();
                            repBeanl.sContenidoReporte = data["ContenidoReporte"].ToString();
                            repBeanl.iEstadoReporte = Convert.ToInt32(data["EstadoReporte"]);
                            repBeanl.sMensajeReporte = data["MensajeReporte"].ToString();
                            repBeanl.sMensaje = "success";
                            repBeanl.sUsuarioReporte = data["Usuario"].ToString();
                            repBeanl.sEmpresReporte = data["Nombre"].ToString();
                            listRepBean.Add(repBeanl);
                        }
                    }
                    else
                    {
                        while (data.Read())
                        {
                            ReporteBean repBeanl = new ReporteBean();
                            repBeanl.iIdReporte = Convert.ToInt32(data["IdReporte"]);
                            repBeanl.sCodigoReporte = data["CodigoReporte"].ToString();
                            repBeanl.sContenidoReporte = data["ContenidoReporte"].ToString();
                            repBeanl.iEstadoReporte = Convert.ToInt32(data["EstadoReporte"]);
                            repBeanl.sMensajeReporte = data["MensajeReporte"].ToString();
                            repBeanl.sMensaje = "success";
                            listRepBean.Add(repBeanl);
                        }
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

            return listRepBean;
        }

        public ReporteBean sp_Notifica_Confirma_Vista(int clvrep)
        {
            ReporteBean repBean = new ReporteBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Notifica_Confirma_Vista", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdReporte", clvrep));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    repBean.sMensaje = "success";
                } else
                {
                    repBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
                throw;
            }

            return repBean;
        }

        public ReporteBean sp_Actualizar_ReporteProblema_Notifica(int clvreport, int estado, string msjreport)
        {
            ReporteBean repBean = new ReporteBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Actualizar_ReporteProblema_Notifica", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdReporte", clvreport));
                cmd.Parameters.Add(new SqlParameter("@Estado", estado));
                cmd.Parameters.Add(new SqlParameter("@Mensaje", msjreport));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    repBean.sMensaje = "success";
                } 
                else
                {
                    repBean.sMensaje = "error";
                }
                cmd.Dispose();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return repBean;
        }

    }
}