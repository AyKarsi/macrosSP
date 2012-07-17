using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace Proxy
{
    public class MacrosController
    {

        public static AuthCookie Login()
        {

            string postData = "eblanguage=1&UserName=grombach&password=grombach123&button0=Anmelden&button0command=";
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] data = encoding.GetBytes(postData);

            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create("http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/Login.cfg&p=u2");
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            Stream requestStream = request.GetRequestStream();
            requestStream.Write(data, 0, data.Length);
            requestStream.Close();

            HttpWebResponse loginResponse = (HttpWebResponse)request.GetResponse();
            string cookieData = loginResponse.Headers["Set-Cookie"];

            AuthCookie auth = new AuthCookie();
            auth.Parse(cookieData);
            return auth;
        }


        public static HttpWebResponse GetUrl(string remoteUrl)
        {

            AuthCookie auth = Login();

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(remoteUrl);
            request.CookieContainer = new CookieContainer();
            foreach (Cookie c in auth.Cookies)
                request.CookieContainer.Add(c);

            HttpWebResponse webResponse;
            try
            {
                webResponse = (HttpWebResponse) request.GetResponse();
            }
            catch (System.Net.WebException we)
            {
                //remote url not found, send 404 to client 
                HttpContext.Current.Response.StatusCode = 404;
                HttpContext.Current.Response.StatusDescription = "Not Found";
                HttpContext.Current.Response.Write("<h2>Page not found</h2>");
                HttpContext.Current.Response.End();
                return null;
            }


            Stream receiveStream = webResponse.GetResponseStream();

            if ((webResponse.ContentType.ToLower().IndexOf("html") >= 0)
              || (webResponse.ContentType.ToLower().IndexOf("javascript") >= 0))
            {
                //this response is HTML Content, so we must Parse it
                StreamReader readStream = new StreamReader(receiveStream, Encoding.Default);
                Uri test = new Uri(remoteUrl);
                string content = ParseHtmlResponse(readStream.ReadToEnd(), HttpContext.Current.Request.ApplicationPath);
                HttpContext.Current.Response.Write(content);
                webResponse.Close();
                HttpContext.Current.Response.End();
            }
            else
            {
                //the response is not HTML -> XML
                byte[] buff = new byte[1024];
                int bytes = 0;
                while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
                {
                    //Write the stream directly to the client 
                    HttpContext.Current.Response.OutputStream.Write(buff, 0, bytes);
                }

                HttpContext.Current.Response.ContentType = "text/xml";
                HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;

                webResponse.Close();
                HttpContext.Current.Response.End();
            }

            return webResponse;
        }


        public static void GetFiles(string folderId)
        {

            string remoteUrl = "http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/dmsfolders.cfg&p=list&MaskName=lhitsxml&folderid={0}";
            remoteUrl = String.Format(remoteUrl, folderId);
            GetUrl(remoteUrl);


        }


        /// <summary>
        /// Parse HTML response for update links and images sources
        /// </summary>
        /// <param name="html">HTML response</param>
        /// <param name="appPath">Path of application for replacement</param>
        /// <returns>HTML updated</returns>
        public static string ParseHtmlResponse(string html, string appPath)
        {
            html = html.Replace("\"/", "\"" + appPath + "/");
            html = html.Replace("'/", "'" + appPath + "/");
            html = html.Replace("=/", "=" + appPath + "/");

            return html;
        }


    }
}