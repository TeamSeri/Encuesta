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
    public class EmpresasDao : Conexion
    {
        public List<EmpresasBean> sp_Empresas_Retrieve_Empresas()
        {
            List<EmpresasBean> listEmp = new List<EmpresasBean>();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Empresas_Retrieve_Empresas", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        EmpresasBean empBean = new EmpresasBean();
                        empBean.iIdEmpresa = Convert.ToInt32(data["IdEmpresa"].ToString());
                        empBean.sNombre = data["Nombre"].ToString();
                        listEmp.Add(empBean);
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
            return listEmp;
        }

        public List<EmpresasBean> sp_Datos_TRegistrosEmpresas_Empresa(int empresa)
        {
            List<EmpresasBean> listEmpBean = new List<EmpresasBean>();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_TRegistrosEmpresas_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    while (data.Read())
                    {
                        EmpresasBean empBean = new EmpresasBean();
                        empBean.iIdRegistroEmpresas = Convert.ToInt32(data["IdRegistroEmpresas"].ToString());
                        empBean.iIdEmpresa = Convert.ToInt32(data["IdEmpresa"].ToString());
                        empBean.sNombre = data["Nombre"].ToString();
                        empBean.iEmpleados = Convert.ToInt32(data["Empleados"].ToString());
                        empBean.iAplicacionesReq = Convert.ToInt32(data["AplicacionesRequeridas"].ToString());
                        empBean.iAplicacionesRestantes = Convert.ToInt32(data["AplicacionesRestantes"].ToString());
                        empBean.iAplicacionesRealizadas = Convert.ToInt32(data["AplicacionesRealizadas"].ToString());
                        empBean.sCodigoEmpresa = data["CodigoEmpresa"].ToString();
                        empBean.sTipoEncuesta = data["TipoEncuesta"].ToString();
                        empBean.sFechaAnio = data["FechaAnio"].ToString();
                        empBean.iActivo = Convert.ToInt32(data["Activo"].ToString());
                        empBean.sMes = data["Mes"].ToString();
                        listEmpBean.Add(empBean);
                    }
                }
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
            }

            return listEmpBean;
        }

        public EmpresasBean sp_Datos_RegistroEmpresas_Retrieve_RegistroEmpresa(int registro)
        {
            EmpresasBean empBean = new EmpresasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_RegistroEmpresas_Retrieve_RegistroEmpresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdRegistro", registro));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    empBean.iIdEmpresa = Convert.ToInt32(data["IdEmpresa"].ToString());
                    empBean.sNombre = data["Nombre"].ToString();
                    empBean.iEmpleados = Convert.ToInt32(data["Empleados"].ToString());
                    empBean.iAplicacionesReq = Convert.ToInt32(data["AplicacionesRequeridas"].ToString());
                    empBean.iAplicacionesRestantes = Convert.ToInt32(data["AplicacionesRestantes"].ToString());
                    empBean.iAplicacionesRealizadas = Convert.ToInt32(data["AplicacionesRealizadas"].ToString());
                    empBean.sCodigoEmpresa = data["CodigoEmpresa"].ToString();
                    empBean.sTipoEncuesta = data["TipoEncuesta"].ToString();
                    empBean.sFechaAnio = data["FechaAnio"].ToString();
                    empBean.iActivo = Convert.ToInt32(data["Activo"].ToString());
                    empBean.sMes = data["Mes"].ToString();
                    empBean.sMensaje = "success";
                } else
                {
                    empBean.sMensaje = "error";
                }
            }
            catch (Exception exc)
            {
                Console.Write(exc);
            }

            return empBean;
        }

        public EmpresasBean sp_Datos_Empresa(int empresa)
        {
            EmpresasBean empBean = new EmpresasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    empBean.iIdEmpresa = int.Parse(data["IdEmpresa"].ToString());
                    empBean.sNombre = data["Nombre"].ToString();
                    empBean.sMensaje = "success";
                } else
                {
                    empBean.sMensaje = "error";
                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
            return empBean;
        }

        public EmpresasBean sp_Datos_Empresas_Retrieve_Empresa(int empresa, string codigo, int estado)
        {
            EmpresasBean empBe = new EmpresasBean();
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Datos_Empresas_Retrieve_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@iIdEmpresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@sCodigoEmpresa", codigo));
                cmd.Parameters.Add(new SqlParameter("@iActivo", estado));
                SqlDataReader data = cmd.ExecuteReader();
                if (data.Read())
                {
                    empBe.iIdEmpresa = int.Parse(data["IdEmpresa"].ToString());
                    empBe.iIdRegistroEmpresas = Convert.ToInt32(data["IdRegistroEmpresas"].ToString());
                    empBe.sNombre = data["Nombre"].ToString();
                    empBe.iEmpleados = int.Parse(data["Empleados"].ToString());
                    empBe.iAplicacionesReq = int.Parse(data["AplicacionesRequeridas"].ToString());
                    empBe.iAplicacionesRestantes = int.Parse(data["AplicacionesRestantes"].ToString());
                    empBe.sTipoEncuesta = data["TipoEncuesta"].ToString();
                    empBe.sCodigoEmpresa = data["TipoEncuesta"].ToString();
                    empBe.iAplicacionesRealizadas = Convert.ToInt32(data["AplicacionesRealizadas"].ToString());
                    empBe.sMensaje = "success";
                } else
                {
                    empBe.sMensaje = "error";
                }
                cmd.Dispose();
                data.Close();
                conexion.Close();
            }
            catch (Exception exc)
            {

                Console.WriteLine(exc);
            }
            return empBe;
        }
        public EmpresasBean sp_Empresas_Update_Retrieve_Empresa(int empresa, int empleados, int applicaciones, int restantes)
        {
            EmpresasBean empBean = new EmpresasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Empresas_Update_Retrieve_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdEmpresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@CantidadEmpleados", empleados));
                cmd.Parameters.Add(new SqlParameter("@AplicacionesRequeridas", applicaciones));
                cmd.Parameters.Add(new SqlParameter("@AplicacionesRestantes", restantes));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    empBean.sMensaje = "success";
                }
                else
                {
                    empBean.sMensaje = "error";
                }
                cmd.Dispose();
                cmd.Parameters.Clear();
                conexion.Close();
            }
            catch (Exception exc)
            {
                Console.Write(exc);
            }
            return empBean;
        }
        public EmpresasBean sp_Insert_Empresa_Retrieve_Empresa(string empresa)
        {
            EmpresasBean empBean = new EmpresasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Validar_Empresa_Retrieve_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Empresa", empresa));
                SqlDataReader data = cmd.ExecuteReader();
                if (!data.Read())
                {
                    data.Close();
                    SqlCommand ins = new SqlCommand("sp_Insert_Empresa_Retrieve_Empresa", this.conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    ins.Parameters.Add(new SqlParameter("@Empresa", empresa));
                    if (ins.ExecuteNonQuery() > 0)
                    {
                        SqlCommand dat = new SqlCommand("sp_Validar_Empresa_Retrieve_Empresa", this.conexion)
                        {
                            CommandType = CommandType.StoredProcedure
                        };
                        dat.Parameters.Add(new SqlParameter("@Empresa", empresa));
                        SqlDataReader dt = dat.ExecuteReader();
                        if (dt.Read())
                        {
                            empBean.iIdEmpresa = Convert.ToInt32(dt["IdEmpresa"].ToString());
                            empBean.sMensaje = "success";
                        } else
                        {
                            empBean.sMensaje = "error";
                        }
                        dat.Dispose();
                        dat.Parameters.Clear();
                        dt.Close();
                    }
                    else
                    {
                        empBean.sMensaje = "errorins";
                    }
                    ins.Dispose();
                    ins.Parameters.Clear();
                }
                else
                {
                    empBean.sMensaje = "erroremp";
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
            return empBean;
        }
        public EmpresasBean sp_Validar_Registro_Empresa(int empresa, int estado, int empleados, int requeridas, string tipo, string codigo, string mes, string anio)
        {
            EmpresasBean empBean = new EmpresasBean();
            int realizadas = 0;
            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Validar_Registro_Empresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Empresa", empresa));
                cmd.Parameters.Add(new SqlParameter("@Estado", estado));
                SqlDataReader data = cmd.ExecuteReader();
                if (!data.HasRows)
                {
                    data.Close();
                    SqlCommand ins = new SqlCommand("sp_Insert_RegistrosEmpresa_Retrieve_RegistrosEmpresa", this.conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    ins.Parameters.Add(new SqlParameter("@Empresa", empresa));
                    ins.Parameters.Add(new SqlParameter("@Empleados", empleados));
                    ins.Parameters.Add(new SqlParameter("@Requeridas", requeridas));
                    ins.Parameters.Add(new SqlParameter("@Restantes", requeridas));
                    ins.Parameters.Add(new SqlParameter("@Realizadas", realizadas));
                    ins.Parameters.Add(new SqlParameter("@Codigo", codigo));
                    ins.Parameters.Add(new SqlParameter("@Tipo", tipo));
                    ins.Parameters.Add(new SqlParameter("@Anio", anio));
                    ins.Parameters.Add(new SqlParameter("@Estado", estado));
                    ins.Parameters.Add(new SqlParameter("@Mes", mes));
                    if (ins.ExecuteNonQuery() == 1)
                    {
                        empBean.sMensaje = "success";
                    } else
                    {
                        empBean.sMensaje = "errorins";
                    }
                } else
                {
                    empBean.sMensaje = "errorval";
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

            return empBean;
        } 

        public EmpresasBean sp_Desactiva_RegistroEmpresa(int clvreg)
        {
            EmpresasBean empBean = new EmpresasBean();

            try
            {
                this.Conectar();
                SqlCommand cmd = new SqlCommand("sp_Desactiva_RegistroEmpresa", this.conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@IdRegistro", clvreg));
                if (cmd.ExecuteNonQuery() > 0)
                {
                    empBean.sMensaje = "success";
                } 
                else
                {
                    empBean.sMensaje = "error";
                }
                cmd.Dispose();
                cmd.Parameters.Clear();
                conexion.Close();
            }
            catch (Exception exc) 
            {
                Console.WriteLine(exc);
            }

            return empBean;
        }

    }

}