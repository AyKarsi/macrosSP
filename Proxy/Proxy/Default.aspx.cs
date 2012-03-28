using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Proxy
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            System.Net.ServicePointManager.Expect100Continue = false;
            string entity = Request.QueryString["entity"];
            string id = Request.QueryString["id"];

            if (entity == null && id== null)
                return;

            switch (entity)
            {
                case "folder":
                    MacrosController.GetFiles(id);
                    break;
                    
                default:
                    break;
            }


            var schmarrn= "";

        }


        
    }


}
