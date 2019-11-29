using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Encuesta.Models.Utilerias;
using Encuesta.Models.Beans;
using System.Data.SqlClient;
using System.Data;

namespace Encuesta.Models.Daos
{
    public class BuzonDao : Conexion
    {

        public BuzonBean sp_Insert_Buzon_Retrieve_Buzon(int company, string boss, string description, string location, string dateevent){

            BuzonBean buzonBean = new BuzonBean();

            try {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Insert_Buzon_Retrieve_Buzon", this.conexion) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@ctrlIdEmpresa", company));
                cmd.Parameters.Add(new SqlParameter("@ctrlJefeArea", boss));
                cmd.Parameters.Add(new SqlParameter("@ctrlDescripcion", description));
                cmd.Parameters.Add(new SqlParameter("@ctrlLugar", location));
                cmd.Parameters.Add(new SqlParameter("@ctrlFecha", dateevent));
                if (cmd.ExecuteNonQuery() > 0) {
                    buzonBean.sMensaje = "success";
                } else {
                    buzonBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); conexion.Close();
            } catch (Exception exc) {
                buzonBean.sMensaje = exc.ToString();
                Console.WriteLine(exc);
            }

            return buzonBean;
        }

        public List<BuzonBean> sp_Datos_Buzon_Retrieve_Datos(int company) {
            List<BuzonBean> listaBuzonBean = new List<BuzonBean>();

            try {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Buzon_Retrieve_Datos", this.conexion) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@ctrlEmpresa", company));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows) {
                    while (data.Read()) {
                        BuzonBean buzonBean = new BuzonBean();
                        buzonBean.iIdBuzon = Convert.ToInt32(data["IdBuzon"].ToString());
                        buzonBean.iIdEmpresa = Convert.ToInt32(data["IdEmpresa"].ToString());
                        buzonBean.sJefeArea = data["JefeArea"].ToString();
                        buzonBean.sFecha = data["Fecha"].ToString();
                        buzonBean.sEmpresa = data["Nombre"].ToString();
                        listaBuzonBean.Add(buzonBean);
                    }
                }
                cmd.Dispose(); cmd.Parameters.Clear(); data.Close(); conexion.Close();
            }
            catch (Exception exc) {
                Console.WriteLine(exc);
            }

            return listaBuzonBean;
        }

        public BuzonBean sp_Datos_Buzon_Dato(int buzon) {
            BuzonBean buzonBean = new BuzonBean();
            try {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Buzon_Dato", this.conexion) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@ctrlBuzon", buzon));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read()) {
                    buzonBean.sMensaje = "success";
                    buzonBean.iIdBuzon = Convert.ToInt32(data["IdBuzon"].ToString());
                    buzonBean.sJefeArea = data["JefeArea"].ToString();
                    buzonBean.sDescripcion = data["Descripcion"].ToString();
                    buzonBean.sLugar = data["Lugar"].ToString();
                    buzonBean.sFecha = data["Fecha"].ToString();
                    buzonBean.iEstadoBuzon = Convert.ToInt32(data["EstadoBuzon"].ToString());
                    buzonBean.iIdEmpresa = Convert.ToInt32(data["IdEmpresa"].ToString());
                    buzonBean.sEmpresa = data["Nombre"].ToString();
                } else {
                    buzonBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); data.Close(); conexion.Close();
            } catch (Exception exc) {
                Console.WriteLine(exc);
            }
            return buzonBean;
        }

    }
}