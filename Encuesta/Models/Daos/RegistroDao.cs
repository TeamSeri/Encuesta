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
        public RegistroBean sp_RegistroEncuestas_Insert_RegistroEncuestas(int empresa, DateTime fecha, int resultado, string tipo, int registro, int centro)
        {
            RegistroBean regBean = new RegistroBean();
            try
            {
                this.Conectar();
                int realizadas = 0;
                SqlCommand cmd = new SqlCommand("sp_RegistroEncuestas_Insert_RegistroEncuestas", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@FechaRegistro", fecha));
                cmd.Parameters.Add(new SqlParameter("@Resultado", resultado));
                cmd.Parameters.Add(new SqlParameter("@TipoEncuesta", tipo));
                cmd.Parameters.Add(new SqlParameter("@IdRegistroEncuestas", registro));
                cmd.Parameters.Add(new SqlParameter("@Centro", centro));
                if (cmd.ExecuteNonQuery() > 0) 
                {
                    cmd.Dispose(); cmd.Parameters.Clear();
                    SqlCommand dre = new SqlCommand("sp_Datos_Empresas_Retrieve_Empresa", this.conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    int estado = 1;
                    dre.Parameters.Add(new SqlParameter("@iIdEmpresa", empresa));
                    dre.Parameters.Add(new SqlParameter("@sCodigoEmpresa",""));
                    dre.Parameters.Add(new SqlParameter("@iActivo", estado));
                    dre.Parameters.Add(new SqlParameter("@Centro", centro));
                    SqlDataReader dataDre = dre.ExecuteReader();
                    if (dataDre.Read())
                    {
                        int restantes = Convert.ToInt32(dataDre["AplicacionesRestantes"]);
                        dre.Dispose(); dre.Parameters.Clear(); dataDre.Close();
                        SqlCommand sel = new SqlCommand("sp_Datos_RegistroEncuestas_Dato", this.conexion)
                        {
                            CommandType = CommandType.StoredProcedure
                        };
                        sel.Parameters.Add(new SqlParameter("@Centro", centro));
                        SqlDataReader dataSel = sel.ExecuteReader();
                        if (dataSel.Read())
                        {
                            realizadas = Convert.ToInt32(dataSel["Cantidad"]);
                            int rest = restantes - realizadas;
                            sel.Dispose(); sel.Parameters.Clear(); dataSel.Close();
                            SqlCommand upd = new SqlCommand("sp_Update_RealizadasEmpresas_Retrieve_RealizadasEmpresa", this.conexion)
                            {
                                CommandType = CommandType.StoredProcedure
                            };
                            upd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                            upd.Parameters.Add(new SqlParameter("@Realizadas", realizadas));
                            upd.Parameters.Add(new SqlParameter("@Restantes", rest));
                            upd.Parameters.Add(new SqlParameter("@Activo", estado));
                            upd.Parameters.Add(new SqlParameter("@IdRegistro", registro));
                            upd.Parameters.Add(new SqlParameter("@Centro", centro));
                            if (upd.ExecuteNonQuery() > 0)
                            {
                                regBean.sMensaje = "success";
                            }
                            else
                            {
                                regBean.sMensaje = "error update";
                            }
                            upd.Dispose(); upd.Parameters.Clear();
                        }
                        else
                        {
                            regBean.sMensaje = "error select";
                        }
                    } 
                    else
                    {
                        regBean.sMensaje = "error restantes";
                    }
                } else
                {
                    regBean.sMensaje = "error";
                }
                conexion.Close();
            }
            catch (Exception exc)
            {
                regBean.sMensaje = exc.ToString();
            }
            return regBean;
        }

        public RegistroCategoriasBean sp_Insert_Categorias_Data_Categoria(string nombre, int valor, int empresa, int registro, int centro)
        {
            RegistroCategoriasBean catBean = new RegistroCategoriasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Insert_Categorias_Data_Categoria", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Nombre",nombre));
                cmd.Parameters.Add(new SqlParameter("@Valor", valor));
                cmd.Parameters.Add(new SqlParameter("@Empresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@Registro", registro));
                cmd.Parameters.Add(new SqlParameter("@Centro", centro));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    catBean.sMensaje = "success";
                } else
                {
                    catBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); conexion.Close();
            }
            catch (Exception exc)
            {
                Console.Write(exc);
            }
            return catBean;
        }
        public RegistroCategoriasBean sp_Insert_Dominios_Data_Dominio(string nombre, int valor, int empresa, int registro, int centro)
        {
            RegistroCategoriasBean catBean = new RegistroCategoriasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Insert_Dominios_Data_Dominio", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Nombre", nombre));
                cmd.Parameters.Add(new SqlParameter("@Valor", valor));
                cmd.Parameters.Add(new SqlParameter("@Empresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@Registro", registro));
                cmd.Parameters.Add(new SqlParameter("@Centro", centro));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    catBean.sMensaje = "success";
                }
                else
                {
                    catBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); conexion.Close();
            }
            catch (Exception exc)
            {
                Console.Write(exc);
            }
            return catBean;
        }

        public RegistroCategoriasBean sp_Datos_Categorias_Categoria(int registro, string categoria)
        {
            RegistroCategoriasBean catBean = new RegistroCategoriasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Categorias_Categoria", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdRegistro",registro));
                cmd.Parameters.Add(new SqlParameter("@Categoria", categoria));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    catBean.sMensaje = "success";
                    catBean.iSumaValores = Convert.ToInt32(data["TotalC"].ToString());
                } else
                {
                    catBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); conexion.Close(); data.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return catBean;
        }
        public RegistroCategoriasBean sp_Datos_Dominios_Dominio(int registro, string dominio)
        {
            RegistroCategoriasBean catBean = new RegistroCategoriasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Dominios_Dominio", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdRegistro", registro));
                cmd.Parameters.Add(new SqlParameter("@Dominio", dominio));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    catBean.sMensaje = "success";
                    catBean.iSumaValores = Convert.ToInt32(data["TotalC"].ToString());
                }
                else
                {
                    catBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); data.Close(); conexion.Close();                
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return catBean;
        }

        public RegistroCategoriasBean sp_ResultadoGeneral_RegistrosEncuestas(int registro, string tipo)
        {

            RegistroCategoriasBean catBean = new RegistroCategoriasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_ResultadoGeneral_RegistrosEncuestas", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Registro", registro));
                cmd.Parameters.Add(new SqlParameter("@Encuesta", tipo));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    catBean.iSumaValores = Convert.ToInt32(data["Total"].ToString());
                    catBean.sMensaje = "success";
                } else
                {
                    catBean.sMensaje = "error";
                }
                cmd.Dispose(); cmd.Parameters.Clear(); data.Close(); conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }
            return catBean;

        }

    }
}