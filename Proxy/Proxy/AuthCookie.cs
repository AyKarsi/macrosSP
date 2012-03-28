using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Proxy
{
    public class AuthCookie
    {


        public List<Cookie> Cookies = new List<Cookie>();


        public void Parse(string cookieInfo)
        {
            //cookieInfo = "ebsid=5F078439246A09B778755ED643907585B21399C130E9A89D8F4EFCE442C2DAA0308B8B2A18C9B168; path=/edms/exe;,starturl=cfgs=../cfgs/Login.cfg&p=u2; path=/edms/exe;,UserName=grombach; path=/edms/exe;,UserNr=43; path=/edms/exe;,ebsid=5F078439246A09B778755ED6439075...
            string[] vals = cookieInfo.Split(',');
            foreach (string v in vals)
            {
                CookieCopy c = new CookieCopy();
                c.Parse(v);
                this.Cookies.Add(c.GetRealCookie());
            }
        }
    }

    public class CookieCopy
    {
        public string Name;
        public string Value;
        public string Path;

        public void Parse(string inputVal)
        {

            Name = inputVal.Substring(0, inputVal.IndexOf("="));
            inputVal = inputVal.Substring(inputVal.IndexOf("=") + 1);
            Value = inputVal.Substring(0, inputVal.IndexOf(";"));
            inputVal = inputVal.Substring(inputVal.IndexOf(";") + 1);
            Path = inputVal.Substring(inputVal.IndexOf("path=") + 5);
            Path = Path.Replace(";", "");

        }

        public Cookie GetRealCookie()
        {
            return new Cookie(Name, Value, Path, "wega.mi-m.de");

        }


    }

}