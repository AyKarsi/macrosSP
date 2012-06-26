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
    public partial class RibbonFile : RibbonControl
    {
        public override TabDefinition GetTabDefinition()
        {
            return new TabDefinition()
            {
                Id = "MacrosFile",
                Title = "File",
                Groups = new GroupDefinition[]
            {
                new GroupDefinition()
                {
                    Id = "FileActions",
                    Title = "File Actions",
                    Template = GroupTemplateLibrary.SimpleTemplate,
                    Controls = new ControlDefinition[]
                    {
                        new ButtonDefinition()
                                {
                                    Id = "OpenFile",
                                    Title = "Öffnen",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:SpRibbonBinding.fileOpen();"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "EditAttributes",
                                    Title = "Reattributieren",
                                    Image = ImageLibrary.GetStandardImage(8,12),
                                    CommandJavaScript = "javascript:SpRibbonBinding.fileEditAttributes();"
                                },
                         new ButtonDefinition()
                                {
                                    Id = "ViewAttributes",
                                    Title = "Attribute ansehen",
                                    Image = ImageLibrary.GetStandardImage(9,12),
                                    CommandJavaScript = "javascript:SpRibbonBinding.fileViewAttributes();"
                                }
                    }
                    
                }
            }
            };
        }
    }
}
