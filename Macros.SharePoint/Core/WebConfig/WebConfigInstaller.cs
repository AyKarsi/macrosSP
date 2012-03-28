using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using Microsoft.SharePoint.Administration;
using System.Collections.ObjectModel;

namespace Macros.SharePoint.Core.WebConfig
{
    /// <summary>
    /// Installer class provides the functionality of deployment and undeployment
    /// into web.config and GAC.
    /// </summary>
    public class WebConfigInstaller
    {
        #region Enums

        /// <summary>
        /// Deployment type.
        /// </summary>
        public enum DeploymentType
        {
            /// <summary>
            /// Deploy.
            /// </summary>
            Deploy,

            /// <summary>
            /// Undeploy.
            /// </summary>
            UnDeploy
        }

        #endregion // Enums

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="Installer"/> class.
        /// </summary>
        public WebConfigInstaller()
        {
        }

        #endregion // Constructors

        #region Proeprties

        /// <summary>
        /// Gets or sets the web application id.
        /// </summary>
        /// <value>The web application id.</value>
        public Guid WebApplicationId { get; set; }

        /// <summary>
        /// Gets or sets the nodes collection.
        /// </summary>
        /// <value>The nodes.</value>
        public XmlNodeList Nodes { get; set; }

        #endregion // Proeprties

        #region Methods

        /// <summary>
        /// Makes required changes for web.config based on deployment type.
        /// </summary>
        /// <param name="deploymentType">Type of the deployment.</param>
        public void Deploy(DeploymentType deploymentType, Guid featureID)
        {
            this.ModifyWebConfig(deploymentType, featureID);
        }

        /// <summary>
        /// Modifies the web config.
        /// </summary>
        /// <param name="deploymentType">Type of the deployment.</param>
        private void ModifyWebConfig(DeploymentType deploymentType, Guid featureID)
        {
            Collection<SPWebConfigModification> webConfigModifications = this.CreateWebConfigModifications(featureID);

            SPWebApplication webApplication = SPWebService.ContentService.WebApplications[this.WebApplicationId];

            foreach (SPWebConfigModification webConfigModification in webConfigModifications)
            {
                if (deploymentType == DeploymentType.Deploy)
                {
                    webApplication.WebConfigModifications.Add(webConfigModification);
                }
                else
                {
                    webApplication.WebConfigModifications.Remove(webConfigModification);
                }
            }

            // Applyes all modification to web.config.
            webApplication.WebService.ApplyWebConfigModifications();
            webApplication.Update();
        }

        /// <summary>
        /// Creates collection of the web config modifications, based on
        /// information from XML file.
        /// </summary>
        /// <returns><see cref="Collection"/> of <see cref="SPWebConfigModification"/></returns>
        private Collection<SPWebConfigModification> CreateWebConfigModifications(Guid featureID)
        {
            Collection<SPWebConfigModification> webConfigModifications = new Collection<SPWebConfigModification>();

            foreach (XmlNode node in this.Nodes)
            {
                // Throws out comments.
                if (node.NodeType == XmlNodeType.Comment)
                    continue;

                SPWebConfigModification webConfigModification = new SPWebConfigModification();

                //Use feature id of web.config modification feature as owner
                webConfigModification.Owner = featureID.ToString();

                webConfigModification.Name = node.Attributes["Name"].Value;
                webConfigModification.Path = node.Attributes["Path"].Value;
                webConfigModification.Sequence = 0;
                webConfigModification.Type = SPWebConfigModification.SPWebConfigModificationType.EnsureChildNode;
                webConfigModification.Value = node.InnerXml;

                webConfigModifications.Add(webConfigModification);
            }

            return webConfigModifications;
        }

        #endregion // Methods
    }
}
