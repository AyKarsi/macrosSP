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


            string remoteUrl = Request.QueryString["url"];

            if (remoteUrl == null)
                return;

            AuthData auth = login();
        
            //http%3A%2F%2Fwega.mi-m.de%2Fedms%2Fexe%2Feb.exe%3Fcfgs%3D..%2Fcfgs%2Fdmsfolders.cfg%26p%3Dlist%26MaskName%3Dlhitsxml%26folderid%3D10

        //only one site accepted
            //create the web request to get the remote stream

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(remoteUrl);


            Uri uri = new Uri(" http://wega.mi-m.de");

            request.Headers.Add("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64; rv:11.0) Gecko/20100101 Firefox/11.0");
            request.CookieContainer.Add(uri, auth.username);
            request.CookieContainer.Add(uri,  auth.usernr);
            request.CookieContainer.Add(uri,  auth.ebsid);

            HttpWebResponse response;
            try
            {
                response = (HttpWebResponse)request.GetResponse();
            }
            catch (System.Net.WebException we)
            {
                //remote url not found, send 404 to client 
                Response.StatusCode = 404;
                Response.StatusDescription = "Not Found";
                Response.Write("<h2>Page not found</h2>");
                Response.End();
                return;
            }
            
            
            Stream receiveStream = response.GetResponseStream();

            if ((response.ContentType.ToLower().IndexOf("html") >= 0)
              || (response.ContentType.ToLower().IndexOf("javascript") >= 0))
            {
                //this response is HTML Content, so we must parse it
                StreamReader readStream = new StreamReader(receiveStream, Encoding.Default);
                Uri test = new Uri(remoteUrl);
                string content;
                content = ParseHtmlResponse(readStream.ReadToEnd(),
                Request.ApplicationPath);
                //write the updated HTML to the client
                Response.Write(content);
                //close streamsreadStream.Close();
                response.Close();
                Response.End();
            }
            else
            {
                //the response is not HTML 
                byte[] buff = new byte[1024];
                int bytes = 0;
                while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
                {
                    //Write the stream directly to the client 
                    Response.OutputStream.Write(buff, 0, bytes);
                }
                //close streams
                response.Close();
                Response.End();
            }
        }

        /// <summary>
        /// Parse HTML response for update links and images sources
        /// </summary>
        /// <param name="html">HTML response</param>
        /// <param name="appPath">Path of application for replacement</param>
        /// <returns>HTML updated</returns>
        public string ParseHtmlResponse(string html, string appPath)
        {
              html = html.Replace("\"/", "\"" + appPath + "/");
              html = html.Replace("'/", "'" + appPath + "/");
              html = html.Replace("=/", "=" + appPath + "/");

              return html;
        }

        private AuthData login()
        {

            string postData = "eblanguage=1&UserName=grombach&password=grombach123&button0=Anmelden&button0command=";
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] data = encoding.GetBytes(postData);

            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create("http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/login.cfg&p=u2");

            //Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

            //request.Headers.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
            //request.Headers.Add("Accept-Encoding: ", "gzip, deflate");

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            Stream requestStream = request.GetRequestStream();
            requestStream.Write(data,0, data.Length);
            requestStream.Close();
            

            HttpWebResponse loginResponse = (HttpWebResponse)request.GetResponse();

            string cookieData = loginResponse.Headers["Set-Cookie"];

            AuthData auth = new AuthData();
            auth.parse(cookieData);
            return auth;
        }
    }

    public class AuthData
    {

        public void parse(string cookieInfo)
        {
            //cookieInfo = "ebsid=5F078439246A09B778755ED643907585B21399C130E9A89D8F4EFCE442C2DAA0308B8B2A18C9B168; path=/edms/exe;,starturl=cfgs=../cfgs/login.cfg&p=u2; path=/edms/exe;,UserName=grombach; path=/edms/exe;,UserNr=43; path=/edms/exe;,ebsid=5F078439246A09B778755ED6439075...
            string[] vals = cookieInfo.Split(',');
            string ebs = vals.First(x => x.StartsWith("ebsid="));
            if (ebs != null)
                ebsid = ebs.Substring(ebs.IndexOf("=") + 1);
            string un = vals.First(x => x.StartsWith("UserName="));
            if (un != null)
                username = un.Substring(un.IndexOf("=") + 1);

            string unum = vals.First(x => x.StartsWith("UserNr="));
            if (unum != null)
                usernr = unum.Substring(unum.IndexOf("=") + 1);

            if (ebsid.IndexOf(";") > 0)
                ebsid = ebsid.Substring(0, ebsid.IndexOf(";"));


            if (username.IndexOf(";") > 0)
                username = username.Substring(0, username.IndexOf(";"));

            if (usernr.IndexOf(";") > 0)
                usernr = usernr.Substring(0, usernr.IndexOf(";"));

        }

        public string ebsid { get; set; }
        public string username { get; set; }
        public string usernr { get; set; }

    }

}
