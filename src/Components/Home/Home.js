import { useEffect, useState } from "react";
import { API_KEY, CLIENT_ID, DISCOVERY_DOC, SCOPES } from "../Sheets";

export const Home = () => {
  const [gapiSuccess, setIsGapiSuccess] = useState(false);
  const [gisSuccess, setGisSuccess] = useState(false);

  const onLoadGapi = () => {
    if (window.gapi) {
      window.gapi.load("client", async () => {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        window.gapiInited = true;
        handleAuthClick();
      });
    }
  };

  const gisLoaded = () => {
    if (window.google) {
      window["tokenClient"] = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
      });
      window.gisInited = true;
      handleAuthClick();
    }
  };

  const handleAuthClick = () => {
    if (window.tokenClient) {
      window.tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }
        // document.getElementById('signout_button').style.visibility = 'visible';
        // document.getElementById('authorize_button').innerText = 'Refresh';
        //   await fetchRecords();
      };

      if (
        window.gapi &&
        window.gapi.client &&
        window.gapi.client.getToken() === null
      ) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        window.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        window.tokenClient.requestAccessToken({ prompt: "" });
      }

      if (window.gapiInited) setIsGapiSuccess(true);
      if (window.gisInited) setGisSuccess(true);
    }
  };

  useEffect(() => {
    connectToSpreadSheet();
  }, []);

  const connectToSpreadSheet = () => {
    onLoadGapi();
    gisLoaded();
  };

  return (
    <div>
      <div className="auth">Auth Status:</div>
      {gapiSuccess && gisSuccess ? (
        <div className="">"Connected successfully!"</div>
      ) : (
        <button onClick={connectToSpreadSheet}>Reload</button>
      )}
    </div>
  );
};

export default Home;