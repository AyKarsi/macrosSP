using System;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using System.Web;
using Macros.Common;

namespace Proxy.Layouts.Macros.Proxy
{
    public partial class Proxy : LayoutsPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            System.Net.ServicePointManager.Expect100Continue = false;
            string entity = Request.QueryString["entity"];
            string id = Request.QueryString["id"];

            if (entity == null && id == null)
                HttpContext.Current.Response.End();

            switch (entity)
            {
                case "folder":
                    MacrosController.GetFiles(id);
                    break;

                default:
                    break;
            }


            var schmarrn = "rertret";

        }
    }
}
