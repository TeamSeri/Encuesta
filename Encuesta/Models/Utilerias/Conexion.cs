using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Encuesta.Models.Utilerias
{
    public class Conexion
    {
        static readonly string Server = "MCarranza";
        //static readonly string Server = "201.149.34.185,15002";
        static readonly string Db = "encuesta";
        static readonly string User = "sa";
        static readonly string Pass = "123456";
        //static readonly string User = "sa";
        //static readonly string Pass = "S3R2017.t3";

        protected SqlConnection conexion { get; set; }

        protected SqlConnection Conectar()
        {
            try
            {
                conexion = new SqlConnection("Data Source=" + Server + ";Initial Catalog=" + Db + ";User ID=" + User + ";Password=" + Pass + ";Integrated Security=False;");
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