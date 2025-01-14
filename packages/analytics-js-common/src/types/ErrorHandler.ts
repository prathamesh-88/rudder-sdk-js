import { IPluginEngine } from './PluginEngine';
import { ILogger } from './Logger';
import { IExternalSrcLoader } from '../services/ExternalSrcLoader/types';

export type SDKError = unknown;

export interface IErrorHandler {
  logger?: ILogger;
  pluginEngine?: IPluginEngine;
  init(externalSrcLoader: IExternalSrcLoader): void;
  onError(
    error: SDKError,
    context?: string,
    customMessage?: string,
    shouldAlwaysThrow?: boolean,
  ): void;
  leaveBreadcrumb(breadcrumb: string): void;
  notifyError(error: Error): void;
}
