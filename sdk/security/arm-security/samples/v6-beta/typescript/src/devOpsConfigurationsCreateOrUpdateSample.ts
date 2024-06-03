/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DevOpsConfiguration, SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a DevOps Configuration.
 *
 * @summary Creates or updates a DevOps Configuration.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-09-01-preview/examples/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsOnboardCurrentAndFuture_example.json
 */
async function createOrUpdateDevOpsConfigurationsOnboardCurrentAndFuture() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] ||
    "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg";
  const securityConnectorName = "mySecurityConnectorName";
  const devOpsConfiguration: DevOpsConfiguration = {
    properties: {
      authorization: { code: "00000000000000000000" },
      autoDiscovery: "Enabled",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    securityConnectorName,
    devOpsConfiguration,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a DevOps Configuration.
 *
 * @summary Creates or updates a DevOps Configuration.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-09-01-preview/examples/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsOnboardCurrentOnly_example.json
 */
async function createOrUpdateDevOpsConfigurationsOnboardCurrentOnly() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] ||
    "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg";
  const securityConnectorName = "mySecurityConnectorName";
  const devOpsConfiguration: DevOpsConfiguration = {
    properties: {
      authorization: { code: "00000000000000000000" },
      autoDiscovery: "Disabled",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    securityConnectorName,
    devOpsConfiguration,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a DevOps Configuration.
 *
 * @summary Creates or updates a DevOps Configuration.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-09-01-preview/examples/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsOnboardSelected_example.json
 */
async function createOrUpdateDevOpsConfigurationsOnboardSelected() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] ||
    "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg";
  const securityConnectorName = "mySecurityConnectorName";
  const devOpsConfiguration: DevOpsConfiguration = {
    properties: {
      authorization: { code: "00000000000000000000" },
      autoDiscovery: "Disabled",
      topLevelInventoryList: ["org1", "org2"],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    securityConnectorName,
    devOpsConfiguration,
  );
  console.log(result);
}

async function main() {
  createOrUpdateDevOpsConfigurationsOnboardCurrentAndFuture();
  createOrUpdateDevOpsConfigurationsOnboardCurrentOnly();
  createOrUpdateDevOpsConfigurationsOnboardSelected();
}

main().catch(console.error);
