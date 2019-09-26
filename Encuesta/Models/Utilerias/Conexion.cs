using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Utilerias
{
    public class Conexion
    {
        static readonly string Server = "Localhost";
        static readonly string Db = "encuesta";
        static readonly string User = "";
        static readonly string Pass = "";

        protected SqlConnection conexion { get; set; }

        protected SqlConnection Conectar()
        {
            try
            {
                conexion = new SqlConnection("Data Source=" + Server + "; Initial Catalog=" + Db + "; User ID=" + User + ";Password" + Pass + ";Integrated Security=True");
                conexion.Open();
                return conexion;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

    }
}