using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Macros.Common
{
    public partial class ProxyBasePage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            MacrosController.MarcosServerUri = new Uri("http://wega.mi-m.de");

            System.Net.ServicePointManager.Expect100Continue = false;
            string entity = Request.QueryString["entity"];
            string id = Request.QueryString["id"];

            if (entity == null && id == null)
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


            var schmarrn = "rertret";

        }



    }
}
