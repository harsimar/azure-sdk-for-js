// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { PartitionKeyDefinitionVersion } from "./PartitionKeyDefinitionVersion";
import { PartitionKeyKind } from "./PartitionKeyKind";

export interface PartitionKeyDefinition {
  /**
   * An array of paths for which data within the collection can be partitioned. Paths must not contain a wildcard or
   * a trailing slash. For example, the JSON property “AccountNumber” is specified as “/AccountNumber”. The array must
   * contain only a single value.
   */
  paths: string[];
  /**
   * An optional field, if not specified the default value is 1. To use the large partition key set the version to 2.
   * To learn about large partition keys, see [how to create containers with large partition key](https://docs.microsoft.com/en-us/azure/cosmos-db/large-partition-keys) article.
   */
  version?: PartitionKeyDefinitionVersion;
  systemKey?: boolean;
  /**
   * What kind of partition key is being defined (default: "Hash")
   */
  kind?: PartitionKeyKind;
}
