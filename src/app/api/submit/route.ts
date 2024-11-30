import { NextResponse } from "next/server";
import { sheets } from "@/lib/googlesheet";
import { VisitData } from "@/hooks/useTrackUserSource";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "12jgmYS5nV1YlwusAGMA6hN6F-6CHOHdtqeIeU6T-ziI";
const RANGE = "Sheet1!A1";

interface EnquiryItem {
  id: string;
  name: string;
  image: string;
}

interface SubmissionData {
  fullname: string;
  email: string;
  mobilenumber: string;
  message: string;
  formId: string;
  visitData: VisitData;
  cartItems: EnquiryItem[];
}

export async function POST(request: Request) {
  try {
    const data: SubmissionData = await request.json();
    const { fullname, email, mobilenumber, message, formId, visitData, cartItems } = data;
    console.log("Received data:", data);

    // Prepare data for Google Sheets
    const sheetData: (string | number)[] = [
      fullname,
      email,
      mobilenumber,
      message,
      formId,
      new Date().toISOString(),
      // Include all cart item details
      ...cartItems.flatMap(item => [item.id, item.name, item.image]),
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

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        sheetsResult: sheetsResult.data,
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

