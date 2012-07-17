using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using HtmlAgilityPack;


namespace Macros.Common
{
    public class MacrosController
    {
        public static string ServerUrl = "http://wega.mi-m.de";
        public static Uri MarcosServerUri = new Uri(ServerUrl);

        //private static CookieCollection _cookies = new CookieCollection();
        public static CookieCollection Login()
        {


            var cookieJar = new CookieContainer();
            var request = (HttpWebRequest)WebRequest.Create(MarcosServerUri.ToString()+"edms/exe/eb.exe?cfgs=../cfgs/Login.cfg&p=u2");
            request.Method = "POST";
            request.CookieContainer = cookieJar;
            request.ContentType = "application/x-www-form-urlencoded";

            // encode the post data
            string postData = "eblanguage=1&UserName=grombach&password=grombach123&button0=Anmelden&button0command=";
            var encoding = new ASCIIEncoding();
            byte[] data = encoding.GetBytes(postData);
            
            // write the post data
            request.ContentLength = data.Length;
            Stream requestStream = request.GetRequestStream();
            requestStream.Write(data, 0, data.Length);
            requestStream.Close();

            using (var loginResponse = (HttpWebResponse)request.GetResponse())
            {
                var cookies =  cookieJar.GetCookies(request.RequestUri);
                return cookies;
            }
        }


        public static void GetUrl(string remoteUrl,bool rebaseBody = false)
        {

            var cookies = Login();
            var request = (HttpWebRequest)WebRequest.Create(remoteUrl);
            request.CookieContainer = new CookieContainer();

            foreach (Cookie c in cookies)
                request.CookieContainer.Add(c);

            HttpWebResponse webResponse;
            try
            {
                webResponse = (HttpWebResponse)request.GetResponse();
            }
            catch (System.Net.WebException we)
            {
                //remote url not found, send 404 to client 
                HttpContext.Current.Response.StatusCode = 404;
                HttpContext.Current.Response.StatusDescription = "Not Found";
                HttpContext.Current.Response.Write("<h2>Page not found</h2>");
                HttpContext.Current.Response.End();
                return;
            }

            Stream receiveStream = webResponse.GetResponseStream();

            if ((webResponse.ContentType.ToLower().IndexOf("html") >= 0)
              || (webResponse.ContentType.ToLower().IndexOf("javascript") >= 0))
            {
                //this response is HTML Content, so we must Parse it
                StreamReader readStream = new StreamReader(receiveStream, Encoding.ASCII);
                Uri test = new Uri(remoteUrl);
                //string content = ParseHtmlResponse(readStream.ReadToEnd(), HttpContext.Current.Request.ApplicationPath);
                //var updatedContent = ExtractLinks(content,rebaseBody);
                var updatedContent = ExtractLinks(readStream.ReadToEnd(), rebaseBody);
                HttpContext.Current.Response.Write(updatedContent);
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

        }


        /// <summary>
        /// method for extracting all URL's from the data being
        /// passed to the method. The data being passed will be all
        /// the data from a provided string
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ExtractLinks(string str, bool rebaseBody)
        {


            //sstr = str.Replace(@"<input type=""hidden"" name=""message"" value>", @"<input type=""hidden"" name=""message"" value/>" )
            ;
            

            HtmlDocument doc = new HtmlDocument();
            /* doc.OptionAutoCloseOnEnd = false;
            doc.OptionCheckSyntax = false;
            doc.OptionFixNestedTags = true;
            doc.OptionExtractErrorSourceText = true;
            doc.OptionWriteEmptyNodes = true;*/

            
            String matchpattern = @"\<input (?<attr>.*)\>";
            String replacementpattern = @"<input ${attr} />";
            str = Regex.Replace(str, matchpattern, replacementpattern, RegexOptions.Multiline);

            str=str.Replace("eb.exe?", "default.aspx?entity=eb.exe&");

            doc.LoadHtml(str);




            foreach (HtmlNode script in doc.DocumentNode.SelectNodes("//script"))
            {
                HtmlAttribute att = script.Attributes["src"];
                if (att != null)
                    att.Value = ServerUrl+"/edms/exe/" + att.Value;
            }

            var links = doc.DocumentNode.SelectNodes("//link");
            if (links != null)
            {
<<<<<<< HEAD
                foreach (HtmlNode script in links) 
                {
                    HtmlAttribute att = script.Attributes["href"];
                    if (att != null)
                        att.Value = "http://wega.mi-m.de/edms/exe/" + att.Value;
                }
=======
                HtmlAttribute att = script.Attributes["href"];
                if (att != null)
                    att.Value = ServerUrl+"/edms/exe/" + att.Value;
>>>>>>> 5d4bc6e5326353be4922f7162e84138973b78914
            }

            var imgNodes = doc.DocumentNode.SelectNodes("//img");
            if (imgNodes != null)
            {
                foreach (var script in doc.DocumentNode.SelectNodes("//img"))
                {
                    if (script.Attributes == null)
                        continue;
                    HtmlAttribute att = script.Attributes["src"];

                    if (att != null)
                        att.Value = ServerUrl + "/edms/exe/" + att.Value;
                }
            }

<<<<<<< HEAD
            //var formNodes = doc.DocumentNode.SelectNodes("//form");
            //if (formNodes != null)
            //{
            //    foreach (HtmlNode form in doc.DocumentNode.SelectNodes("//form"))
            //    {
            //        HtmlAttribute att = form.Attributes["action"];
            //        if (att != null)
            //            att.Value = "http://wega.mi-m.de/edms/exe/" + att.Value;
=======
            var formNodes = doc.DocumentNode.SelectNodes("//form");
            if (formNodes != null)
            {
                foreach (HtmlNode form in doc.DocumentNode.SelectNodes("//form"))
                {
                    HtmlAttribute att = form.Attributes["action"];
                    if (att != null)
                        att.Value = ServerUrl + "/edms/exe/" + att.Value;
>>>>>>> 5d4bc6e5326353be4922f7162e84138973b78914

            //        var idAttr = form.Attributes["id"];
            //        if (idAttr == null)
            //        {
            //            var nameAttr = form.Attributes["name"];
            //            form.Attributes.Add("id", nameAttr.Value);
            //        }

            //        //// query could be wrong
            //        ////var messageNodes = form.SelectNodes("//[message]");
            //        //var newMessageNode = new HtmlNode(HtmlNodeType.Element, doc, -1);
            //        //newMessageNode.InnerHtml = "<input type='hidden' name='message' value>";
            //        //form.AppendChild(newMessageNode);

            //        //var newtreecodeNode = new HtmlNode(HtmlNodeType.Element, doc, -1);
            //        //newtreecodeNode.InnerHtml = "<input type='hidden' name='treecode' value>";
            //        //form.AppendChild(newtreecodeNode);




            //    }
            //}
            //string html = "";

            //// remove body
            HtmlDocument newDoc;
            newDoc = doc;
 
            

            using (var memoryStream = new MemoryStream())
            {
                newDoc.Save(memoryStream);
                memoryStream.Position = 0;
                using (TextReader reader = new StreamReader(memoryStream, Encoding.ASCII))
                {
                    string text = Encoding.UTF8.GetString(memoryStream.GetBuffer(),0, (int)memoryStream.Length);
                    return text;
                }
                            
            }

            


        }




        public static void GetFiles(string folderId)
        {

            string remoteUrl = MarcosServerUri.ToString()+"edms/exe/eb.exe?cfgs=../cfgs/dmsfolders.cfg&p=list&MaskName=lhitsxml&folderid={0}";
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

        public static void GetHtml(string url)
        {


            string remoteUrl = MarcosServerUri.ToString() + "edms/" + url;
            GetUrl(remoteUrl);


        }


        public static void GetFileAttributes(string fileId)
        {
            string remoteUrl = MarcosServerUri.ToString() + "edms/exe/eb.exe?cfgs=../cfgs/docops.cfg&p=form&MaskName=fviewattr&fileid={0}&docclass=1&attrclass=3";
            remoteUrl = string.Format(remoteUrl, fileId);
            GetUrl(remoteUrl);
        }

        public static void EditFileAttributes(string fileId)
        {
            string remoteUrl = MarcosServerUri.ToString() +
                               "edms/exe/eb.exe?cfgs=../cfgs/docops.cfg&p=form&MaskName=freattr&fileid={0}&adddata=&docclass=1&attrclass=3";
            remoteUrl = string.Format(remoteUrl, fileId);
            GetUrl(remoteUrl,true);
        }

        public static void EbexeForward(NameValueCollection queryString)
        {

            string remoteUrl = MarcosServerUri.ToString() +
                               "edms/exe/eb.exe?" + queryString.ToString();

            GetUrl(remoteUrl, true);




        }
    }
}