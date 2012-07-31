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
                                    Id = "doctemplate",
                                    Title = "doctemplate",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','doctemplate');"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "projectdata",
                                    Title = "projectdata",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','projectdata');"
                                },                     
                    
                         new ButtonDefinition()
                                {
                                    Id = "display",
                                    Title = "display",
                                    Image = ImageLibrary.GetStandardImage(4,13),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','display');"
                                },                                         
                         new ButtonDefinition()
                                {
                                    Id = "displayarchived",
                                    Title = "displayarchived",
                                    Image = ImageLibrary.GetStandardImage(4,13),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','displayarchived');"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "checkout",
                                    Title = "checkout",
                                    Image = ImageLibrary.GetStandardImage(5,13),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','checkout');"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "checkoutback",
                                    Title = "checkoutback",
                                    Image = ImageLibrary.GetStandardImage(6,13),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','checkoutback');"
                                },                     
                    
                         new ButtonDefinition()
                                {
                                    Id = "checkin",
                                    Title = "checkin",
                                    Image = ImageLibrary.GetStandardImage(7,12),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','checkin');"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "reattr",
                                    Title = "reattr",
                                    Image = ImageLibrary.GetStandardImage(3,4),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','reattr');"
                                },                                         
                         new ButtonDefinition()
                                {
                                    Id = "move",
                                    Title = "move",
                                    Image = ImageLibrary.GetStandardImage(0,2),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','move');"
                                },                     
                         new ButtonDefinition()
                                {
                                    Id = "delete",
                                    Title = "delete",
                                    Image = ImageLibrary.GetStandardImage(4,4),
                                    CommandJavaScript = "javascript:SpRibbonBinding.callRibbonAction('file','delete');"
                                },                                         
                    }
                    
                }
            }
            };
        }
    }
}
