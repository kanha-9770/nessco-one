import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sheets } from "@/lib/googlesheet";
import { VisitData } from "@/hooks/useTrackUserSource";
import axios from "axios";

const SPREADSHEET_ID =
  process.env.SPREADSHEET_ID || "12jgmYS5nV1YlwusAGMA6hN6F-6CHOHdtqeIeU6T-ziI";
const RANGE = "Sheet1!A1";
const ZOHO_API_URL =
  process.env.ZOHO_API_URL ||
  "https://www.zohoapis.com/crm/v2/functions/website_form/actions/execute";
const ZOHO_API_KEY =
  process.env.ZOHO_API_KEY ||
  "1003.54049d87e2be729c5864458c7468a3e9.32e930cd0544f7d0098b658853f82a78";
const ZOHO_OAUTH_TOKEN = process.env.ZOHO_OAUTH_TOKEN || "YOUR_NEW_OAUTH_TOKEN";

interface SubmissionData {
  fullname: string;
  email: string;
  mobilenumber: string;
  message: string;
  formId: string;
  visitData: VisitData;
}

export async function POST(request: Request) {
  try {
    const data: SubmissionData = await request.json();
    const {
      fullname,
      email,
      mobilenumber,
      message,
      formId,
      visitData,
    } = data;
    console.log("Received data:", data);

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("serviceformDB");
    const collection = db.collection("formSubmissions");
    const mongoResult = await collection.insertOne({
      fullname,
      email,
      mobilenumber,
      message,
      formId,
      visitData,
      submittedAt: new Date(),
    });
    console.log("MongoDB result:", mongoResult);

    // Prepare data for Google Sheets
    const sheetData = [
      fullname,
      email,
      mobilenumber,
      message,
      formId,
      new Date().toISOString(),
      visitData.IP_Address,
      visitData.Country,
      visitData.City,
      visitData.Web_Region,
      visitData.Latitude,
      visitData.Longitude,
      visitData.Zip_Code,
      visitData.Language,
      visitData.Os_Name,
      visitData.Device_Type,
      visitData.Browser_Name,
      visitData.Current_Page,
      visitData.Visitor_First_Page,
      visitData.Landing_page,
      visitData.Visit_Count,
      visitData.Lead_Source,
      visitData.Referrer,
      visitData.Ad_Medium,
      visitData.Ad_CampaignName,
      visitData.Ad_Campaign,
      visitData.Ad_AdGroup,
      visitData.Ad_Adcopy,
      visitData.Ad_Keyword,
      visitData.Ad_Matchtype,
      visitData.Ad_Device,
      visitData.Ad_Gclid,
      visitData.Ad_Source,
    ];

    // Append data to Google Sheets
    const sheetsResult = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [sheetData],
      },
    });
    console.log("Google Sheets result:", sheetsResult.data);

    // Submit data to Zoho CRM
    // const zohoData = {
    //   fullname,
    //   email,
    //   mobilenumber,
    //   message,
    //   formId,
    //   ...visitData,
    // };

    // const zohoResponse = await axios.post(
    //   `${ZOHO_API_URL}?auth_type=apikey&zapikey=${ZOHO_API_KEY}`,
    //   zohoData,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${ZOHO_OAUTH_TOKEN}`,
    //     },
    //   }
    // );

    // console.log("Zoho CRM result:", zohoResponse.data);

    // if (zohoResponse.status !== 200) {
    //   throw new Error("Zoho CRM submission failed");
    // }

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        mongoId: mongoResult.insertedId,
        sheetsResult: sheetsResult.data,
        // zohoResult: zohoResponse.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Error submitting form", error: (error as Error).message },
      { status: 500 }
    );
  }
}
