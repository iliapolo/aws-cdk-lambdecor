"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequest = exports.invokeFunction = exports.startExecution = void 0;
/* istanbul ignore file */
const https = require("https");
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");
const FRAMEWORK_HANDLER_TIMEOUT = 900000; // 15 minutes
// In order to honor the overall maximum timeout set for the target process,
// the default 2 minutes from AWS SDK has to be overriden:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#httpOptions-property
const awsSdkConfig = {
    httpOptions: { timeout: FRAMEWORK_HANDLER_TIMEOUT },
};
async function defaultHttpRequest(options, responseBody) {
    return new Promise((resolve, reject) => {
        try {
            const request = https.request(options, resolve);
            request.on('error', reject);
            request.write(responseBody);
            request.end();
        }
        catch (e) {
            reject(e);
        }
    });
}
let sfn;
let lambda;
async function defaultStartExecution(req) {
    if (!sfn) {
        sfn = new AWS.StepFunctions(awsSdkConfig);
    }
    return await sfn.startExecution(req).promise();
}
async function defaultInvokeFunction(req) {
    if (!lambda) {
        lambda = new AWS.Lambda(awsSdkConfig);
    }
    return await lambda.invoke(req).promise();
}
exports.startExecution = defaultStartExecution;
exports.invokeFunction = defaultInvokeFunction;
exports.httpRequest = defaultHttpRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0Ym91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvdXRib3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLDZEQUE2RDtBQUM3RCwrQkFBK0I7QUFJL0IsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsQ0FBQyxhQUFhO0FBRXZELDRFQUE0RTtBQUM1RSwwREFBMEQ7QUFDMUQsMkZBQTJGO0FBQzNGLE1BQU0sWUFBWSxHQUF5QjtJQUN6QyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUU7Q0FDcEQsQ0FBQztBQUVGLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxPQUE2QixFQUFFLFlBQW9CO0lBQ25GLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNYO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBSSxHQUFzQixDQUFDO0FBQzNCLElBQUksTUFBa0IsQ0FBQztBQUV2QixLQUFLLFVBQVUscUJBQXFCLENBQUMsR0FBMEM7SUFDN0UsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDM0M7SUFFRCxPQUFPLE1BQU0sR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqRCxDQUFDO0FBRUQsS0FBSyxVQUFVLHFCQUFxQixDQUFDLEdBQWlDO0lBQ3BFLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDNUMsQ0FBQztBQUVVLFFBQUEsY0FBYyxHQUFHLHFCQUFxQixDQUFDO0FBQ3ZDLFFBQUEsY0FBYyxHQUFHLHFCQUFxQixDQUFDO0FBQ3ZDLFFBQUEsV0FBVyxHQUFHLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmltcG9ydCAqIGFzIGh0dHBzIGZyb20gJ2h0dHBzJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25PcHRpb25zIH0gZnJvbSAnYXdzLXNkay9saWIvY29uZmlnJztcblxuY29uc3QgRlJBTUVXT1JLX0hBTkRMRVJfVElNRU9VVCA9IDkwMDAwMDsgLy8gMTUgbWludXRlc1xuXG4vLyBJbiBvcmRlciB0byBob25vciB0aGUgb3ZlcmFsbCBtYXhpbXVtIHRpbWVvdXQgc2V0IGZvciB0aGUgdGFyZ2V0IHByb2Nlc3MsXG4vLyB0aGUgZGVmYXVsdCAyIG1pbnV0ZXMgZnJvbSBBV1MgU0RLIGhhcyB0byBiZSBvdmVycmlkZW46XG4vLyBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQVdTSmF2YVNjcmlwdFNESy9sYXRlc3QvQVdTL0NvbmZpZy5odG1sI2h0dHBPcHRpb25zLXByb3BlcnR5XG5jb25zdCBhd3NTZGtDb25maWc6IENvbmZpZ3VyYXRpb25PcHRpb25zID0ge1xuICBodHRwT3B0aW9uczogeyB0aW1lb3V0OiBGUkFNRVdPUktfSEFORExFUl9USU1FT1VUIH0sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBkZWZhdWx0SHR0cFJlcXVlc3Qob3B0aW9uczogaHR0cHMuUmVxdWVzdE9wdGlvbnMsIHJlc3BvbnNlQm9keTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdGlvbnMsIHJlc29sdmUpO1xuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgcmVxdWVzdC53cml0ZShyZXNwb25zZUJvZHkpO1xuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3QoZSk7XG4gICAgfVxuICB9KTtcbn1cblxubGV0IHNmbjogQVdTLlN0ZXBGdW5jdGlvbnM7XG5sZXQgbGFtYmRhOiBBV1MuTGFtYmRhO1xuXG5hc3luYyBmdW5jdGlvbiBkZWZhdWx0U3RhcnRFeGVjdXRpb24ocmVxOiBBV1MuU3RlcEZ1bmN0aW9ucy5TdGFydEV4ZWN1dGlvbklucHV0KTogUHJvbWlzZTxBV1MuU3RlcEZ1bmN0aW9ucy5TdGFydEV4ZWN1dGlvbk91dHB1dD4ge1xuICBpZiAoIXNmbikge1xuICAgIHNmbiA9IG5ldyBBV1MuU3RlcEZ1bmN0aW9ucyhhd3NTZGtDb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IHNmbi5zdGFydEV4ZWN1dGlvbihyZXEpLnByb21pc2UoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdEludm9rZUZ1bmN0aW9uKHJlcTogQVdTLkxhbWJkYS5JbnZvY2F0aW9uUmVxdWVzdCk6IFByb21pc2U8QVdTLkxhbWJkYS5JbnZvY2F0aW9uUmVzcG9uc2U+IHtcbiAgaWYgKCFsYW1iZGEpIHtcbiAgICBsYW1iZGEgPSBuZXcgQVdTLkxhbWJkYShhd3NTZGtDb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IGxhbWJkYS5pbnZva2UocmVxKS5wcm9taXNlKCk7XG59XG5cbmV4cG9ydCBsZXQgc3RhcnRFeGVjdXRpb24gPSBkZWZhdWx0U3RhcnRFeGVjdXRpb247XG5leHBvcnQgbGV0IGludm9rZUZ1bmN0aW9uID0gZGVmYXVsdEludm9rZUZ1bmN0aW9uO1xuZXhwb3J0IGxldCBodHRwUmVxdWVzdCA9IGRlZmF1bHRIdHRwUmVxdWVzdDtcbiJdfQ==