const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Define your Google Drive folder ID
const FOLDER_ID = "1DXxSJW_Pfe_AJYtS8S9sI8FmPI_kIEt5";

const OAuth2Data = require("../credentials3.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];
const REFRESH_TOKEN =
  "1//04Vy7QpNbzixCCgYIARAAGAQSNwF-L9IrOftbmH03hSNBGBM7llZ_tVi01xYzFwYe4Q5bXKB7T4wggH9ebV4pr1zl_jkNwDsq0ig";

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: OAuth2Client,
});
module.exports = {
  fetchFile: async () => {
    try {
      const drive = google.drive({ version: "v3", auth: OAuth2Client });
      const res = await drive.files.list({
        pageSize: 10,
        q: `'${FOLDER_ID}' in parents`,
        fields: "nextPageToken, files(id, name)",
      });
      const files = res.data.files;
      if (files.length === 0) {
        console.log("No files found.");
        return [];
      }
      let filearr = [];
      // console.log("Files:");
      files.map((file) => {
        //console.log(`${file.name} (${file.id})`);
        filearr.push(file.name);
      });
      //console.log(filearr);
      return filearr;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
