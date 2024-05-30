import { IsoCountries } from "../../src";

export class CountryUtils {
  public static SIGNIFICANT_COUNTRY_MATCH = 6;
  public static SIGNIFICANT_CODE_MATCH = 3;

  public static getCountryInfo(country: string): any | null {
    if (!country) {
      return null;
    }

    const countryCodeMapByCountry = IsoCountries.allCountries.map(
      (country) => country.name,
    );
    const countryMapByCode = IsoCountries.allCountries.map(
      (country) => country.alpha2,
    );
    const countryMapByNumericCode = IsoCountries.allCountries.map(
      (country) => country.numeric,
    );

    let index: number | undefined;

    if ((index = countryCodeMapByCountry.indexOf(country)) !== -1) {
      return IsoCountries.allCountries[index];
    } else {
      if ((index = countryCodeMapByCountry.indexOf(country)) !== -1) {
        return IsoCountries.allCountries[index];
      } else {
        if ((index = countryMapByNumericCode.indexOf(country)) !== -1) {
          return IsoCountries.allCountries[index];
        } else {
          const fuzzyCountryMatch = CountryUtils.fuzzyMatch(
            countryCodeMapByCountry,
            country,
            CountryUtils.SIGNIFICANT_COUNTRY_MATCH,
          );
          if (fuzzyCountryMatch !== null) {
            return IsoCountries.allCountries[fuzzyCountryMatch];
          } else {
            if (country.length > 3) {
              return null;
            }

            const fuzzyCodeMatch = CountryUtils.fuzzyMatch(
              countryMapByCode,
              country,
              CountryUtils.SIGNIFICANT_CODE_MATCH,
            );
            if (fuzzyCodeMatch !== null) {
              return IsoCountries.allCountries[fuzzyCodeMatch];
            }

            return null;
          }
        }
      }
    }
  }

  static getCountryCodeByCountry(country: string): string | null {
    if (!country) {
      return null;
    }

    const countryCodeMapByCountry = IsoCountries.allCountries.map(
      (country) => country.name,
    );
    const countryMapByCode = IsoCountries.allCountries.map(
      (country) => country.alpha2,
    );
    const countryMapByNumericCode = IsoCountries.allCountries.map(
      (country) => country.numeric,
    );

    const index = countryCodeMapByCountry.findIndex((name) => name === country);
    if (index !== -1) {
      return IsoCountries.allCountries[index].alpha2;
    }

    const index2 = countryCodeMapByCountry.findIndex(
      (name) => name === country,
    );
    if (index2 !== -1) {
      return country;
    }

    const index3 = countryMapByNumericCode.findIndex(
      (code) => code === country,
    );
    if (index3 !== -1) {
      return IsoCountries.allCountries[index3].alpha2;
    }

    const fuzzyCountryMatch = this.fuzzyMatch(
      countryCodeMapByCountry,
      country,
      this.SIGNIFICANT_COUNTRY_MATCH,
    );
    if (fuzzyCountryMatch !== null) {
      return IsoCountries.allCountries[fuzzyCountryMatch].alpha2;
    }

    if (country.length > 3) {
      return null;
    }

    const fuzzyCodeMatch = this.fuzzyMatch(
      countryMapByCode,
      country,
      this.SIGNIFICANT_CODE_MATCH,
    );
    if (fuzzyCodeMatch !== null) {
      return IsoCountries.allCountries[fuzzyCodeMatch].alpha2;
    }

    return null;
  }

  static fuzzyMatch(
    dict: string[],
    query: string,
    significantMatch: number,
  ): number | null {
    let rkey: number | null = null;
    let matches: { [key: number]: string } = {};
    let highScore: number = -1;

    dict.forEach((value, key) => {
      const score = this.fuzzyScore(value, query);
      if (score > significantMatch && score > highScore) {
        matches = {};
        highScore = score;
        rkey = key;
        matches[rkey] = value;
      } else if (score === highScore) {
        matches[key] = value;
      }
    });

    if (Object.keys(matches).length > 1) {
      return null;
    }

    return rkey;
  }

  static fuzzyScore(term: string, query: string): number {
    if (!term || !query) {
      throw new Error("Strings must not be null");
    }

    const termLowerCase: string = term.toLowerCase();
    const queryLowerCase: string = query.toLowerCase();
    let score: number = 0;
    let termIndex: number = 0;
    let previousMatchingCharacterIndex: number = Number.MIN_SAFE_INTEGER;

    for (
      let queryIndex: number = 0;
      queryIndex < queryLowerCase.length;
      queryIndex++
    ) {
      const queryChar: string = queryLowerCase[queryIndex];
      let termCharacterMatchFound: boolean = false;
      for (
        ;
        termIndex < termLowerCase.length && !termCharacterMatchFound;
        termIndex++
      ) {
        const termChar: string = termLowerCase[termIndex];
        if (queryChar === termChar) {
          score++;
          if (previousMatchingCharacterIndex + 1 === termIndex) {
            score += 2;
          }
          previousMatchingCharacterIndex = termIndex;
          termCharacterMatchFound = true;
        }
      }
    }

    return score;
  }
  public static getNumericCodeByCountry(country: string): string | null {
    const countryInfo = CountryUtils.getCountryInfo(country);
    return countryInfo && countryInfo.numeric ? countryInfo.numeric : null;
  }
}
