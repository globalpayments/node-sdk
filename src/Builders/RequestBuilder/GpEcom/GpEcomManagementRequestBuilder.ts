import {
  CData as cData,
  Element as element,
  SubElement as subElement,
} from "@azz/elementtree";

import { 
  AlternativePaymentType,
  BaseBuilder,
  BuilderError,
  GenerationUtils,
  GpEcomMapping,
  IPaymentMethod,
  IRequestBuilder, 
  ManagementBuilder,
  Request, 
  Transaction,
  TransactionReference,
  TransactionType,
} from  "../../../../src";
import { GpEcomRequestBuilder } from "./GpEcomRequestBuilder";
import { GpEcomConfig } from "src/ServiceConfigs";


export class GpEcomManagementRequestBuilder extends GpEcomRequestBuilder implements IRequestBuilder {
    /**
     * @param $builder
     * @return bool
     */
    public canProcess(builder: BaseBuilder<Transaction>): boolean {
        if (builder instanceof ManagementBuilder) {
            return true;
        }

        return false;
    }

    public buildRequest(builder: ManagementBuilder, config: GpEcomConfig): Request {

      const timestamp = builder.timestamp || GenerationUtils.generateTimestamp();
      const orderId = builder.orderId || GenerationUtils.generateTimestamp();
      const transactionType = GpEcomMapping.mapManageRequestType(builder);

      const request = element("request", {
        timestamp,
        type: transactionType,
      });
      
      if (config.merchantId) {
        subElement(request, "merchantid").append(cData(config.merchantId));
      }
      
      if (config.accountId !== null) {
        subElement(request, "account").append(cData(config.accountId));
      }

      if (builder.alternativePaymentType === null) {
        subElement(request, "channel").append(cData(config.channel) || "");
      }
      
      if (builder.amount) {
        const amountAttrs = builder.currency
        ? { currency: builder.currency }
        : {};
        subElement(request, "amount", amountAttrs).append(
          cData(this.numberFormat(builder.amount)),
          );
        } else if (builder.transactionType === TransactionType.Capture) {
          throw new BuilderError("Amount cannot be null for capture");
      }
      
      subElement(request, "orderid").append(cData(orderId));
      const ref = (builder.paymentMethod as IPaymentMethod) as TransactionReference;
      subElement(request, "pasref").append(cData(ref.transactionId));
      
      if (builder.transactionType === TransactionType.Refund) {
        if (builder.authorizationCode) {
          subElement(request, "authcode").append(
            cData(builder.authorizationCode) || "",
          );
        }
        subElement(request, "refundhash").append(
          cData(GenerationUtils.generateHash(config.rebatePassword) || ""),
        );
      }
      
      // reason code
      if (builder.reasonCode) {
        subElement(request, "reasoncode").append(
          cData(builder.reasonCode.toString()),
        );
      }

      if (builder.alternativePaymentType !== null) {
        subElement(request, "paymentmethod").append(
          cData(builder.alternativePaymentType|| "") ,
        );
        
        if (builder.transactionType == TransactionType.Confirm) {
          let paymentMethodDetails = subElement(request, "paymentmethoddetails");
          const apmResponse = builder.paymentMethod.alternativePaymentResponse;
          if (builder.alternativePaymentType == AlternativePaymentType.Paypal && apmResponse) {
            subElement(paymentMethodDetails, "Token").append(cData(apmResponse.sessionToken));  
            subElement(paymentMethodDetails,"PayerID").append(cData(apmResponse.providerReference)) ;  
          }
        }
    }
  
      if (builder.description) {
        const comments = subElement(request, "comments");
        subElement(comments, "comment", { id: 1 }).append(
          cData(builder.description),
        );
      }

      subElement(request, "sha1hash").append(
        cData(
          this.generateHash(
            config,
            timestamp,
            orderId,
            builder.amount ? this.numberFormat(builder.amount) : "",
            builder.currency,
            "",
          ),
        ),
      );

      return new Request(config.serviceUrl, 'POST', this.buildEnvelope(request));
    }

    public buildRequestFromJson(jsonRequest: string, config: GpEcomConfig): void {
        jsonRequest
        config
        // do nothing currently
      }
}