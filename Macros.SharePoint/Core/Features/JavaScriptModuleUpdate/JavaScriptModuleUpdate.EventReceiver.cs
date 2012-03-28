using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Security;
using Microsoft.SharePoint.Administration;
using System.Xml;
using Microsoft.SharePoint.Utilities;
using Macros.SharePoint.Core.WebConfig;
using System.Diagnostics;
using System.Collections.ObjectModel;

namespace Macros.SharePoint.Core.Features.Feature1
{
    /// <summary>
    /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
    /// </summary>
    /// <remarks>
    /// The GUID attached to this class may be used during packaging and should not be modified.
    /// </remarks>

    [Guid("46f4cb80-4d24-4aaa-8000-d43434daa0cb")]
    public class JavaScriptModuleUpdateEventReceiver : SPFeatureReceiver
    {
        [SharePointPermission(SecurityAction.LinkDemand, ObjectModel = true)]
        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
            try
            {
                SPWebApplication webApp = properties.Feature.Parent as SPWebApplication;

                XmlDocument configSettingFile = new XmlDocument();

                string templateFolderPath = string.Empty;

                string webConfigsettingFilePath = SPUtility.GetGenericSetupPath(@"template\layouts\macros.core\WebConfigSettings.xml");

                configSettingFile.Load(webConfigsettingFilePath);

                XmlNodeList nodeList = configSettingFile.SelectNodes("WebConfigDeployments/Deployment");

                WebConfigInstaller configInstaller = new WebConfigInstaller()
                {
                    WebApplicationId = webApp.Id,
                    Nodes = nodeList
                };

                configInstaller.Deploy(WebConfigInstaller.DeploymentType.Deploy, properties.Feature.DefinitionId);
            }
            catch (Exception ex)
            {
                if (!EventLog.SourceExists("MacrosSP"))
                {
                    EventLog.CreateEventSource("MacrosSP", "Application");
                }
                EventLog.WriteEntry("MacrosSP", "JavaScript Inject Module Activation : " + ex.Message + ex.StackTrace, EventLogEntryType.Error, 2000);
            }
        }

        [SharePointPermission(SecurityAction.LinkDemand, ObjectModel = true)]
        public override void FeatureDeactivating(SPFeatureReceiverProperties properties)
        {
            SPWebConfigModification configToRemove = null;
            try
            {
                SPWebApplication webApp = properties.Feature.Parent as SPWebApplication;

                Collection<SPWebConfigModification> webConfigModifications = webApp.WebConfigModifications;

                int count = webConfigModifications.Count;

                for (int i = count - 1; i >= 0; i--)
                {
                    SPWebConfigModification webConfig = webConfigModifications[i];

                    if (webConfig.Owner == properties.Definition.Id.ToString())
                    {
                        configToRemove = webConfig;
                    }
                }

                webConfigModifications.Remove(configToRemove);

                webApp.Update();
                webApp.Farm.Services.GetValue<SPWebService>().ApplyWebConfigModifications();
            }

            catch (Exception ex)
            {
                if (!EventLog.SourceExists("MacrosSP"))
                {
                    EventLog.CreateEventSource("MacrosSP", "Application");
                }
                EventLog.WriteEntry("MacrosSP", "JavaScript Inject Module Deactivation : " + ex.Message + ex.StackTrace, EventLogEntryType.Error, 2000);
            }
        }
    }
}
