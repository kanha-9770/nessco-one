// FooterLayout.tsx (Server-Side Fetching in Next.js App Router)
import FooterNew from "./FooterNews";

// Revalidate every 60 seconds (or any time period you prefer)
export const revalidate = 60;

// Function to fetch footer data
async function fetchFooterData() {
  try {
    const response = await fetch(
      "https://jsondatafromhostingertosheet.nesscoindustries.com/en/footer.json",
      { cache: "no-store" } // Ensures fresh data fetch
    );
    const data = await response.json();
    return data.Footer[0].footerContent; // Return the relevant footer content
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    return null; // Handle the error and return null in case of failure
  }
}

// FooterLayout component with SSR
export default async function FooterLayout() {
  const footerData = await fetchFooterData();

  // Handle case where data fetching fails
  if (!footerData) {
    return <div>Failed to load footer data.</div>;
  }

  return (
    <div>
      {/* Pass the fetched footerData to the Footer component */}
      <FooterNew footerData={footerData} />
    </div>
  );
}