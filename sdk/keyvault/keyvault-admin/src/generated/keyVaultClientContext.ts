/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import { ApiVersion75, KeyVaultClientOptionalParams } from "./models/index.js";

export class KeyVaultClientContext extends coreClient.ServiceClient {
  apiVersion: ApiVersion75;

  /**
   * Initializes a new instance of the KeyVaultClientContext class.
   * @param apiVersion Api Version
   * @param options The parameter options
   */
  constructor(
    apiVersion: ApiVersion75,
    options?: KeyVaultClientOptionalParams
  ) {
    if (apiVersion === undefined) {
      throw new Error("'apiVersion' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: KeyVaultClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-keyvault-admin/4.6.0`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri: options.endpoint || "{vaultBaseUrl}"
    };
    super(optionsWithDefaults);
    // Parameter assignments
    this.apiVersion = apiVersion;
  }
}
