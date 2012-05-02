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
    public partial class RibbonFolder : RibbonControl
    {
        public override TabDefinition GetTabDefinition()
        {
            return new TabDefinition()
            {
                Id = "MacrosFolder",
                Title = "Folder",
                Groups = new GroupDefinition[]
            {
                new GroupDefinition()
                {
                    Id = "FolderActions",
                    Title = "Folder Actions",
                    Template = GroupTemplateLibrary.SimpleTemplate,
                    Controls = new ControlDefinition[]
                    {
                        new ButtonDefinition()
                                {
                                    Id = "ShowFolder",
                                    Title = "Anzeigen",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:macros.openSearch();"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "SearchFolder",
                                    Title = "Im Ordner suchen",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:macros.openSearch();"
                                },
                         new ButtonDefinition()
                                {
                                    Id = "CreateFolder",
                                    Title = "Unterodner anlegen",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:macros.openSearch();"
                                }
                    }
                    
                }
            }
            };
        }
    }
}
