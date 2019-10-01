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
    public class PreguntasDao : Conexion
    {
        public List<PreguntasBean> sp_Preguntas_Retrieve_Preguntas ()
        {
            List<PreguntasBean> listPre = new List<PreguntasBean>();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Preguntas_Retrieve_Preguntas", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        PreguntasBean preBean = new PreguntasBean();
                        preBean.iIdPregunta = Convert.ToInt32(data["IdPregunta"].ToString());
                        preBean.iNumeroPregunta = Convert.ToInt32(data["NumeroPregunta"].ToString());
                        preBean.sContenidoPregunta = data["ContenidoPregunta"].ToString();
                        preBean.sTipo = data["Tipo"].ToString();
                        listPre.Add(preBean);
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
            return listPre;
        }
    }
}