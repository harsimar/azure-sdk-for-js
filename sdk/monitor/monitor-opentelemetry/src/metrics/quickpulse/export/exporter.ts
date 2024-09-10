// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { context, diag } from "@opentelemetry/api";
import {
  AggregationTemporality,
  InstrumentType,
  PushMetricExporter,
  ResourceMetrics,
} from "@opentelemetry/sdk-metrics";
import { ExportResult, ExportResultCode, suppressTracing } from "@opentelemetry/core";
import { QuickpulseExporterOptions } from "../types";
import { QuickpulseSender } from "./sender";
import {
  DocumentIngress,
  MonitoringDataPoint,
  PublishOptionalParams,
  PublishResponse,
  CollectionConfigurationError,
} from "../../../generated";
import { getTransmissionTime, resourceMetricsToQuickpulseDataPoint } from "../utils";

/**
 * Quickpulse Metric Exporter.
 */
export class QuickpulseMetricExporter implements PushMetricExporter {
  private sender: QuickpulseSender;
  private postCallback: (response: PublishResponse | undefined) => void;
  private getDocumentsFn: () => DocumentIngress[];
  // Monitoring data point with common properties
  private baseMonitoringDataPoint: MonitoringDataPoint;
  private etag: string;
  private getErrorsFn: () => CollectionConfigurationError[];
  private getDerivedMetricValuesFn: () => Map<string, number>;

  /**
   * Initializes a new instance of the AzureMonitorMetricExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: QuickpulseExporterOptions) {
    this.sender = new QuickpulseSender({
      endpointUrl: options.endpointUrl,
      instrumentationKey: options.instrumentationKey,
      credential: options.credential,
      credentialScopes: options.credentialScopes,
    });
    this.postCallback = options.postCallback;
    this.getDocumentsFn = options.getDocumentsFn;
    this.baseMonitoringDataPoint = options.baseMonitoringDataPoint;
    this.getErrorsFn = options.getErrorsFn;
    this.etag = "";
    this.getDerivedMetricValuesFn = options.getDerivedMetricValuesFn;
    diag.debug("QuickpulseMetricExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry resource metrics.
   * @param metrics - Resource metrics to export.
   * @param resultCallback - Result callback.
   */
  async export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void,
  ): Promise<void> {
    diag.info(`Exporting Live metrics(s). Converting to envelopes...`);
    const optionalParams: PublishOptionalParams = {
      monitoringDataPoints: resourceMetricsToQuickpulseDataPoint(
        metrics,
        this.baseMonitoringDataPoint,
        this.getDocumentsFn(),
        this.getErrorsFn(),
        this.getDerivedMetricValuesFn(),
      ),
      transmissionTime: getTransmissionTime(),
      configurationEtag: this.etag,
    };
    // Supress tracing until OpenTelemetry Metrics SDK support it
    await context.with(suppressTracing(context.active()), async () => {
      try {
        this.postCallback(await this.sender.publish(optionalParams));
        resultCallback({ code: ExportResultCode.SUCCESS });
      } catch (error) {
        this.postCallback(undefined);
        resultCallback({ code: ExportResultCode.FAILED });
      }
    });
  }

  /**
   * Shutdown Exporter.
   */
  public async shutdown(): Promise<void> {
    diag.info("QuickpulseMetricExporter shutting down");
    return Promise.resolve();
  }

  /**
   * Select aggregation temporality
   */
  public selectAggregationTemporality(instrumentType: InstrumentType): AggregationTemporality {
    if (
      instrumentType === InstrumentType.UP_DOWN_COUNTER ||
      instrumentType === InstrumentType.OBSERVABLE_UP_DOWN_COUNTER
    ) {
      return AggregationTemporality.CUMULATIVE;
    }
    return AggregationTemporality.DELTA;
  }

  /**
   * Force flush
   */
  public async forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Get Sender
   */
  public getSender(): QuickpulseSender {
    return this.sender;
  }

  public setEtag(etag: string): void {
    this.etag = etag;
  }
}
