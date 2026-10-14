// WHAT THIS FILE DOES: joins the two settings files into one object called `site`.
//  - business.json  = details the CLIENT can edit in the CMS (name, phone, hours...)
//  - developer.json = technical values only YOU should touch (web address, GA4 ID, form key...)
// Every page and component imports `site` from here.
import business from "../content/business.json";
import developer from "../content/developer.json";

const site = { ...business, ...developer };

export default site;
