export const CLIENT_ID =
  "167594417715-19cdpbu0721cu1cs9n29kq7kljv4mi8n.apps.googleusercontent.com";
export const API_KEY = "AIzaSyDiYDC9JmbM9Cr9EeWwddfSlhc597uVoys";
export const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";
export const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
export const SPREAD_SHEET_ID = "1LecGFpEschV3QLSQBWyk_iTegN-81M6EV3sbd-lt71A";

export const fetchExpenses = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch first 10 files
      let response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREAD_SHEET_ID,
        range: "Expenses",
      });
      resolve(response);
    } catch (err) {
      console.log("Error while fetching records: ", err);
      reject(err);
    }
  });
};

export const updateRecords = (_values) => {
  return new Promise((resolve, reject) => {
    let values = [[..._values]];
    //   values = _values;
    const body = {
      values: values,
    };
    try {
      window.gapi.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: SPREAD_SHEET_ID,
          range: "Expenses",
          valueInputOption: "USER_ENTERED",
          resource: body,
        })
        .then((response) => {
          const result = response.result;
          resolve(response);
        });
    } catch (err) {
      document.getElementById("content").innerText = err.message;
      reject(err);
    }
  });
};
