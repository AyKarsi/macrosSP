using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Macros.Common
{
    public class ProxyBasePage : System.Web.UI.Page
    {
        public static void Page_Load(object sender, EventArgs e)
        {

            MacrosController.MarcosServerUri = new Uri("http://wega.mi-m.de");

            System.Net.ServicePointManager.Expect100Continue = false;
            string entity = HttpContext.Current.Request.QueryString["entity"];
            string id = HttpContext.Current.Request.QueryString["id"];

            if (entity == null && id == null)
                return;

            entity = entity.ToLower();

            switch (entity)
            {
                case "folder":
                    MacrosController.GetFiles(id);
                    break;
                case "foldertree":
                    MacrosController.GetFolderTree(id);
                    break;
                case "getfileattr":
                    MacrosController.GetFileAttributes(id);
                    break;
                case "editfileattr":
                    MacrosController.EditFileAttributes(id);
                    break;
                    break;
                case "eb.exe":
                    MacrosController.EbexeForward(HttpContext.Current.Request.QueryString);
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
