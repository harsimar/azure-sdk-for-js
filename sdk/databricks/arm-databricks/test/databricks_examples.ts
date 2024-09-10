/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  Recorder,
  RecorderStartOptions,
  delay,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureDatabricksManagementClient } from "../src/azureDatabricksManagementClient";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id"
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Databricks test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: AzureDatabricksManagementClient;
  let location: string;
  let resourceGroup: string;
  let resourceGroup2: string;
  let workSpaceName: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new AzureDatabricksManagementClient(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "eastus";
    resourceGroup = "myjstest";
    resourceGroup2 = "myjstest2";
    workSpaceName = "myworkspacexx";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("workspaces create test", async function () {
    const res = await client.workspaces.beginCreateOrUpdateAndWait(resourceGroup, workSpaceName, {
      managedResourceGroupId: "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroup2,
      location: "westus",
      sku: {
        name: "Standard"
      }
    }, testPollingOptions);
    assert.equal(res.name, workSpaceName);
  });

  it("workspaces get test", async function () {
    const res = await client.workspaces.get(resourceGroup, workSpaceName);
    assert.equal(res.name, workSpaceName);
  });

  it("workspaces list test", async function () {
    const resArray = new Array();
    for await (let item of client.operations.list()) {
      resArray.push(item);
    }
  });

  it("workspaces update test", async function () {
    const res = await client.workspaces.beginUpdateAndWait(resourceGroup, workSpaceName, { tags: { mytag1: "value1" } }, testPollingOptions);
    assert.equal(res.type, "Microsoft.Databricks/workspaces");
  });

  it("workspaces delete test", async function () {
    const res = await client.workspaces.beginDeleteAndWait(resourceGroup, workSpaceName, testPollingOptions);
  });
});
