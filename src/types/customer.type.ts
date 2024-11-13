import {YesNo} from "./index";

export type CustomerProductPreferences = {
  "strength_mild"?: YesNo,
  "strength_med"?: YesNo,
  "strength_bold"?: YesNo,
  "blonde"?: YesNo,
  "caffinated"?: YesNo,
  "decaf"?: YesNo,
  "flavored"?: YesNo,
  "single_origin"?: YesNo,
  "origin_blend"?: YesNo
}

export type CustomerPayment = {
  payment_id: string
  payment_method: string
  nickname: string
  territory: string
  territory_name: string
}
