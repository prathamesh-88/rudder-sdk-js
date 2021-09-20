/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */

import get from "get-value";
import logger from "../../utils/logUtil";
import {
  SentryScriptLoader,
  identifierPayloadBuilder,
  convertObjectToArray,
} from "./utils";
import { getDefinedTraits, isObject } from "../../utils/utils";

class Sentry {
  constructor(config) {
    this.name = "Sentry";
    this.dsn = config.dsn;
    this.debugMode = config.debugMode;
    this.environment = config.environment;
    this.ignoreErrors = config.ignoreErrors;
    this.includePathsArray = config.includePaths;
    this.logger = config.Logger;
    this.allowUrls = config.allowUrls;
    this.denyUrls = config.denyUrls;
    this.release = config.release;
    this.serverName = config.serverName;
  }

  init() {
    logger.debug("===in init Sentry===");
    if (!this.dsn) {
      logger.debug("DSN is a mandatory field");
      return;
    }
    SentryScriptLoader(
      "Sentry",
      `https://browser.sentry-cdn.com/6.12.0/bundle.min.js`
    );

    const formattedAllowUrls = convertObjectToArray(this.allowUrls);
    const formattedDenyUrls = convertObjectToArray(this.denyUrls);
    const formattedIgnoreErrors = convertObjectToArray(this.ignoreErrors);

    window.Sentry = {
      dsn: this.dsn,
      debug: this.debugMode,
      environment: this.environment,
      release: this.release,
      serverName: this.serverName,
      allowUrls: formattedAllowUrls,
      denyUrls: formattedDenyUrls,
      ignoreErrors: formattedIgnoreErrors,
      integrations: [],
    };

    let includePaths = [];

    if (this.includePathsArray.length > 0) {
      includePaths = this.includePathsArray.map(function (path) {
        let regex;
        try {
          regex = new RegExp(path);
        } catch (e) {
          // ignored
        }
        return regex;
      });
    }

    if (includePaths.length > 0) {
      this.integrations.push(
        new window.Sentry.Integrations.RewriteFrames({
          // eslint-disable-next-line object-shorthand
          iteratee: function (frame) {
            // eslint-disable-next-line consistent-return
            includePaths.forEach((i) => {
              try {
                if (frame.filename.match(includePaths[i])) {
                  // eslint-disable-next-line no-param-reassign
                  frame.in_app = true;
                  return frame;
                }
              } catch (e) {
                // ignored
              }
            });
            // eslint-disable-next-line no-param-reassign
            frame.in_app = false;
            return frame;
          },
        })
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isLoaded() {
    logger.debug("===in Sentry isLoaded===");
    return !!(
      window.Sentry &&
      isObject(window.Sentry) &&
      window.Sentry.setUser &&
      window.Sentry.Integrations.RewriteFrames
    );
  }

  // eslint-disable-next-line class-methods-use-this
  isReady() {
    logger.debug("===in Sentry isReady===");
    return !!(
      window.Sentry &&
      isObject(window.Sentry) &&
      window.Sentry.setUser &&
      window.Sentry.Integrations.RewriteFrames
    );
  }

  identify(rudderElement) {
    const { traits } = rudderElement.message;
    const { userId, email, name } = getDefinedTraits(rudderElement.message); // userId sent as id and username sent as name
    const ipAddress =
      get(rudderElement.message, "traits.ip_address") ||
      get(rudderElement.message, "context.traits.ip_address");

    if (!userId && !email && !name && !ipAddress) {
      // if no user identification property is present the event will be dropped
      logger.debug(
        "Any one of userId, email, name and ip_address is mandatory"
      );
      return;
    }
    const userIdentifierPayload = identifierPayloadBuilder(
      userId,
      email,
      name,
      ipAddress
    );
    const finalPayload = {
      ...userIdentifierPayload,
      ...traits,
    };
    if (this.logger) {
      window.Sentry.setTag("logger", logger);
    }
    window.Sentry.setUser(finalPayload);
  }
}
export default Sentry;
