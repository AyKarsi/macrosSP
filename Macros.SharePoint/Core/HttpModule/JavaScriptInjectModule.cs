using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;

using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

using System.Diagnostics;
using Microsoft.SharePoint.Utilities;

namespace Macros.SharePoint.Core.HttpModule
{
 public class JavaScriptInjectModule : IHttpModule
    {        
        List<String> OOTBPageUrls = new List<string>();

        public void Dispose()
        {            
        }

        public void Init(HttpApplication context)
        {                        
            context.PreRequestHandlerExecute += new EventHandler(context_PreRequestHandlerExecute);
        }

        void context_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            HttpContext currentContext = HttpContext.Current;

            Page pg = currentContext.CurrentHandler as Page;

            if (pg != null)
            {                
                pg.LoadComplete += new EventHandler(PageLoadCompleted);                
            }            
        }

        private bool isCurrentRequestContainsOOTBUrl(string OOTBPageUrl, string webUrl)
        {                        
            OOTBPageUrls.Clear();
            OOTBPageUrls.Add(String.Format("{0}/lists/audit/newform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/audit/editform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/issue/newform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/issue/dispform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/issue/editform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/compliance%20tasks/newform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/compliance%20tasks/dispform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/compliance%20tasks/editform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/compliance%20documents/forms/editform.aspx", webUrl));           
            OOTBPageUrls.Add(String.Format("{0}/_layouts/upload.aspx", webUrl));
           

            //For Self Assessments
            OOTBPageUrls.Add(String.Format("{0}/lists/assessment%20issues/newform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/assessment%20issues/editform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/issue%20task/newform.aspx", webUrl));
            OOTBPageUrls.Add(String.Format("{0}/lists/issue%20task/editform.aspx", webUrl));

            foreach (String url in OOTBPageUrls)
            {
                if (url.Contains(OOTBPageUrl))
                {
                    return true;                    
                }
            }
            return false;            
        }

        void PageLoadCompleted(object sender, EventArgs e)
        {
            string webUrl = String.Empty;

            try
            {
                Page page = sender as Page;

                if (page != null)
                {
                    string currentRequestUrl = HttpContext.Current.Request.Url.AbsolutePath.ToString().Trim().ToLower();
                    
                    webUrl = SPContext.Current.Web.Url.ToLower();                    

                    //if (isCurrentRequestContainsOOTBUrl(currentRequestUrl, webUrl))
                    //{                        
                        Control ctrl = page.Master.FindControl("PlaceHolderMain");

                        if (ctrl != null)
                        {
                            ScriptLink script = new ScriptLink();
                            script.ID = "sptlnkJavaScript";
                            script.Defer = true;
                            script.Localizable = true;
                            script.Name = "/_layouts/macros.core/extjs/ext-all-dev.js";
                            ctrl.Controls.Add(script);

                            //script = new ScriptLink();
                            //script.ID = "sptlnkJavaScript2";
                            //script.Defer = true;
                            //script.Localizable = true;
                            //script.Name = "https://s3-eu-west-1.amazonaws.com/macros-sp-dev/MacrosSP/macros.all.js";
                            //ctrl.Controls.Add(script);      


                        }
                    //}
                }
            }
            catch (SPException)
            {                
            }
            catch (Exception)
            {                
            }           
        }
    }
}
