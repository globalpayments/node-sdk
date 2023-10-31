import {
  CData as cData,
  Element as element,
  SubElement as subElement,
  ElementTree,
} from "@azz/elementtree";

import {
  Customer,
  GenerationUtils,
  GpEcomConfig,
  StringUtils,
} from "../../../../src";

export abstract class GpEcomRequestBuilder {
  public buildSupplementaryData(
    supplementaryData: Record<string, string | string[]>,
    request: element,
  ) {
    const supplementaryDataElem = subElement(request, "supplementaryData");

    for (const key of Object.keys(supplementaryData)) {
      const item = subElement(supplementaryDataElem, "item", { type: key });

      const items: string[] = !Array.isArray(supplementaryData[key])
        ? (<string>supplementaryData[key]).split(" ")
        : <string[]>supplementaryData[key];

      items.map((itemSplitted, index) => {
        subElement(item, "field" + index).append(cData(itemSplitted));
      });
    }
  }

  protected buildEnvelope(transaction: element): string {
    return new ElementTree(transaction).write();
  }

  protected numberFormat(amount: number | string) {
    const f = parseFloat(amount.toString()) * 100;
    return parseFloat(f.toFixed(2)).toString();
  }

  protected generateHash(
    config: GpEcomConfig,
    timestamp: string,
    orderId: string,
    amount: string,
    currency: string,
    paymentData: string,
    verify = false,
  ): string {
    const data = [timestamp, config.merchantId, orderId];

    if (false === verify) {
      data.push(amount);
      data.push(currency);
    }

    data.push(paymentData);

    return GenerationUtils.generateHash(data.join("."), config.sharedSecret);
  }

  protected buildCustomer(customer: Customer) {
    const payer = element("payer", {
      ref: customer.key || StringUtils.uuid(),
      type: "Retail",
    });
    subElement(payer, "title").append(cData(customer.title));
    subElement(payer, "firstname").append(cData(customer.firstName));
    subElement(payer, "surname").append(cData(customer.lastName));
    subElement(payer, "company").append(cData(customer.company));

    if (customer.address) {
      const address = subElement(payer, "address");
      subElement(address, "line1").append(
        cData(customer.address.streetAddress1),
      );
      subElement(address, "line2").append(
        cData(customer.address.streetAddress2),
      );
      subElement(address, "line3").append(
        cData(customer.address.streetAddress3),
      );
      subElement(address, "city").append(cData(customer.address.city));
      subElement(address, "county").append(cData(customer.address.province));
      subElement(address, "postcode").append(
        cData(customer.address.postalCode),
      );
      if (customer.address.country) {
        subElement(address, "country", { code: "GB" }).append(
          cData(customer.address.country),
        );
      }
    }

    const phone = subElement(payer, "phonenumbers");
    subElement(phone, "home").append(cData(customer.homePhone));
    subElement(phone, "work").append(cData(customer.workPhone));
    subElement(phone, "fax").append(cData(customer.fax));
    subElement(phone, "mobile").append(cData(customer.mobilePhone));

    subElement(payer, "email").append(cData(customer.email));

    return payer;
  }
}
