using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Macros.Common;

namespace Proxy
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            MacrosController.MarcosServerUri = new Uri("http://wega.mi-m.de");

            System.Net.ServicePointManager.Expect100Continue = false;
            string entity = Request.QueryString["entity"];
            string id = Request.QueryString["id"];

            if (entity == null && id== null)
                return;

            entity = entity.ToLower();

            switch (entity) 
            {
                case "folder":
                    MacrosController.GetFiles(id);
                    break;
                case "getfileattr":
                    MacrosController.GetFileAttributes(id);
                    break;
                case "editfileattr":
                    MacrosController.EditFileAttributes(id);
                    break;
                break;
                case "gethtml":
                    MacrosController.GetHtml(id);
                    break;
                default:
                    break;
            }


            var schmarrn= "rertret";

        }


        
    }


}
