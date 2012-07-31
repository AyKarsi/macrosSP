using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using FluentRibbon;
using FluentRibbon.Definitions;
using FluentRibbon.Libraries;
using FluentRibbon.Definitions.Controls;

namespace Macros.SharePoint.Ribbon.ControlTemplates.Ribbon
{
    public partial class UCDelegate : RibbonControl
    {
        public override TabDefinition GetTabDefinition()
        {
            return new TabDefinition()
            {
                Id = "MacrosMain",
                Title = "Macros DMS",
                Groups = new GroupDefinition[]
            {
                new GroupDefinition()
                {
                    Id = "Search",
                    Title = "Search",
                    Template = GroupTemplateLibrary.SimpleTemplate,
                    Controls = new ControlDefinition[]
                    {
                        new ButtonDefinition()
                                {
                                    Id = "SearchButton",
                                    Title = "Search Documents",
                                    Image = ImageLibrary.GetStandardImage(7,12)
                                    ,
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('start','search');"
                                },                     
                    }
                    
                }
            }
            };
        }
    }

}
