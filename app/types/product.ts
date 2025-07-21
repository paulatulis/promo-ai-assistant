// https://www.sagemember.com/sm.dll/ConnectAPIDoc?UID=26616&ModuleID=105

export interface ProductDetail {
  prodEId: number;
  prName: string;

  category?: string;
  suppId?: number;
  lineName?: string;
  catPage?: number;
  catYear?: number;
  itemNum?: string;
  spc?: string;
  description?: string;
  dimensions?: string;
  keywords?: string;
  colors?: string;
  themes?: string;
  pics?: Picture[];
  qty?: number[];
  prc?: number[];
  priceCode?: string;
  catPrc?: number[];
  catPriceCode?: string;
  net?: number[];
  currency?: string;
  priceAdjustMsg?: string;
  piecesPerUnit?: number[];
  options?: Option[];
  madeInCountry?: string;
  assembledInCountry?: string;
  decoratedInCountry?: string;
  recyclable?: boolean;
  newProduct?: boolean;
  envFriendly?: boolean;
  audienceWarning?: boolean;
  food?: boolean;
  clothing?: boolean;
  productCompliance?: string;
  warningLbl?: string;
  productComplianceMemo?: string;
  verified?: boolean;
  imprintArea?: string;
  imprintLoc?: string;
  secondImprintArea?: string;
  secondImprintLoc?: string;
  decorationMethod?: string;
  decorationNotOffered?: boolean;
  setupChg?: number;
  setupChgCode?: string;
  repeatSetupChg?: number;
  repeatSetupChgCode?: string;
  screenChg?: number;
  screenChgCode?: string;
  plateChg?: number;
  plateChgCode?: string;
  dieChg?: number;
  dieChgCode?: string;
  toolingChg?: number;
  toolingChgCode?: string;
  addClrChg?: number;
  addClrChgCode?: string;
  addClrRunChg?: number[];
  addClrRunChgCode?: string;
  priceIncludes?: string;
  package?: string;
  weightPerCarton?: number;
  unitsPerCarton?: number;
  cartonL?: number;
  cartonW?: number;
  cartonH?: number;
  prodTime?: number;
  shipPointCountry?: string;
  shipPointZip?: number;
  onHand?: number;
  skus?: SKU[];
  inventoryLastUpdated?: string;
  comment?: string;
  expDate?: string;
  discontinued?: boolean;
  active?: boolean;
  supplier?: Supplier;
}

// Sub-types

export interface Picture {
  endex?: number;
  url?: string;
  caption?: string;
  hasLogo?: boolean;
}

export interface Option {
  name?: string;
  pricingIsTotal?: boolean;
  values?: OptionValue[];
  priceCode?: string;
}

export interface OptionValue {
  value?: string;
  prc?: number[];
  net?: number[];
}

export interface SKU {
  attributes?: SKUAttribute[];
  onHand?: number;
  onOrder?: number;
  onOrderExpectedDate?: string;
  refreshLeadDays?: number;
  warehouseId?: number;
  warehouseCountry?: string;
  warehouseZip?: string;
  memo?: string;
  unlimited?: boolean;
}

export interface SKUAttribute {
  typeId?: number;
  name?: string;
  value?: string;
}

export interface Supplier {
  suppId?: number;
  coName?: string;
  lineName?: string;
  contactName?: string;
  mAddr?: string;
  mCity?: string;
  mState?: string;
  mZip?: number;
  mCountry?: string;
  sAddr?: string;
  sCity?: string;
  sState?: string;
  sZip?: number;
  sCountry?: string;
  tel?: string;
  tollFreeTel?: string;
  fax?: string;
  tollFreeFax?: string;
  email?: string;
  salesEmail?: string;
  orderEmail?: string;
  sampleOrderEmail?: string;
  customerServiceEmail?: string;
  web?: string;
  unionShop?: boolean;
  esg?: string;
  artContactName?: string;
  artContactEmail?: string;
  catYear?: number;
  catExpOn?: string;
  catCurrency?: string;
  comment?: string;
  prefGroupIds?: string;
  prefGroups?: string;
  persCsRep?: string;
  persCsRepPhn?: string;
  persCsRepEmail?: string;
  persCustNum?: string;
  persSuppNote?: string;
  generalInfo?: GeneralInfo;
}

export interface GeneralInfo {
  artInfo?: string;
  copyChangeInfo?: string;
  imprintMethods?: string;
  imprintColors?: string;
  proofInfo?: string;
  pmsCharge?: number;
  pmsChargeCode?: string;
  copyChangeCharge?: number;
  copyChangeChargeCode?: string;
  artChargeHr?: number;
  artChargeHrCode?: string;
  artChargeJob?: number;
  artChargeJobCode?: string;
  proofCharge?: number;
  proofChargeCode?: string;
  specSampleCharge?: number;
  specSampleChargeCode?: string;
  orderChangeInfo?: string;
  orderCancelInfo?: string;
  lessMinInfo?: string;
  overrunInfo?: string;
  shipInfo?: string;
  termsInfo?: string;
  warrantyInfo?: string;
  returnsInfo?: string;
  coOpInfo?: string;
  otherInfo?: string;
}
